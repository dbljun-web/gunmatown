const SESSION_DAYS = 30;
const PBKDF2_ITERATIONS = 100000;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function parseOrigins(env) {
  return String(env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = parseOrigins(env);
  const headers = {
    "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
  if (!origin || allowed.includes(origin) || allowed.includes("*")) {
    headers["access-control-allow-origin"] = origin || "*";
  }
  return headers;
}

function withCors(response, request, env) {
  const headers = new Headers(response.headers);
  const cors = corsHeaders(request, env);
  for (const [k, v] of Object.entries(cors)) headers.set(k, v);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function bytesToHex(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  const clean = String(hex || "");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function hashPassword(password, saltHex) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: hexToBytes(saltHex),
      iterations: PBKDF2_ITERATIONS,
    },
    keyMaterial,
    256
  );
  return bytesToHex(new Uint8Array(bits));
}

function randomHex(byteLength = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return bytesToHex(bytes);
}

function publicUser(row) {
  return {
    id: row.id,
    username: row.username,
    nickname: row.nickname,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
  };
}

function getBearerToken(request) {
  const auth = request.headers.get("Authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : "";
}

async function getUserByToken(env, token) {
  if (!token) return null;
  const row = await env.DB.prepare(
    `SELECT u.* FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token = ? AND s.expires_at > datetime('now')
     LIMIT 1`
  )
    .bind(token)
    .first();
  return row || null;
}

async function createSession(env, userId) {
  const token = randomHex(32);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);
  await env.DB.prepare(
    `INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)`
  )
    .bind(token, userId, expiresAt)
    .run();
  return token;
}

async function ensureAdmin(env) {
  const existing = await env.DB.prepare(
    `SELECT id FROM users WHERE role = 'admin' LIMIT 1`
  ).first();
  if (existing) return;

  const username = String(env.ADMIN_USERNAME || "admin").trim().toLowerCase();
  const password = String(env.ADMIN_BOOTSTRAP_PASSWORD || "admin1218");
  const nickname = String(env.ADMIN_NICKNAME || "관리자");
  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);

  await env.DB.prepare(
    `INSERT INTO users (username, nickname, password_salt, password_hash, role, status)
     VALUES (?, ?, ?, ?, 'admin', 'active')`
  )
    .bind(username, nickname, salt, hash)
    .run();
}

function validateUsername(username) {
  return /^[a-zA-Z0-9_]{4,20}$/.test(username);
}

function validatePassword(password) {
  return typeof password === "string" && password.length >= 6 && password.length <= 72;
}

function validateNickname(nickname) {
  return typeof nickname === "string" && nickname.trim().length >= 2 && nickname.trim().length <= 20;
}

async function handleSignup(request, env) {
  const body = await readJson(request);
  if (!body) return json({ error: "잘못된 요청입니다." }, 400);

  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  const nickname = String(body.nickname || "").trim();

  if (!validateUsername(username)) {
    return json({ error: "아이디는 영문/숫자/밑줄 4~20자여야 합니다." }, 400);
  }
  if (!validatePassword(password)) {
    return json({ error: "비밀번호는 6~72자여야 합니다." }, 400);
  }
  if (!validateNickname(nickname)) {
    return json({ error: "닉네임은 2~20자여야 합니다." }, 400);
  }

  const exists = await env.DB.prepare(
    `SELECT id FROM users WHERE username = ? COLLATE NOCASE LIMIT 1`
  )
    .bind(username)
    .first();
  if (exists) return json({ error: "이미 사용 중인 아이디입니다." }, 409);

  const salt = randomHex(16);
  const hash = await hashPassword(password, salt);
  const result = await env.DB.prepare(
    `INSERT INTO users (username, nickname, password_salt, password_hash, role, status)
     VALUES (?, ?, ?, ?, 'member', 'active')`
  )
    .bind(username.toLowerCase(), nickname, salt, hash)
    .run();

  const userId = result.meta.last_row_id;
  const token = await createSession(env, userId);
  const user = await env.DB.prepare(`SELECT * FROM users WHERE id = ?`)
    .bind(userId)
    .first();

  return json({ token, user: publicUser(user) }, 201);
}

async function handleLogin(request, env) {
  const body = await readJson(request);
  if (!body) return json({ error: "잘못된 요청입니다." }, 400);

  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  if (!username || !password) {
    return json({ error: "아이디와 비밀번호를 입력해 주세요." }, 400);
  }

  const user = await env.DB.prepare(
    `SELECT * FROM users WHERE username = ? COLLATE NOCASE LIMIT 1`
  )
    .bind(username)
    .first();

  if (!user) return json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, 401);

  const hash = await hashPassword(password, user.password_salt);
  if (hash !== user.password_hash) {
    return json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, 401);
  }
  if (user.status === "banned") {
    return json({ error: "정지된 계정입니다. 관리자에게 문의해 주세요." }, 403);
  }

  const token = await createSession(env, user.id);
  return json({ token, user: publicUser(user) });
}

async function handleLogout(request, env) {
  const token = getBearerToken(request);
  if (token) {
    await env.DB.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
  }
  return json({ ok: true });
}

async function handleMe(request, env) {
  const user = await getUserByToken(env, getBearerToken(request));
  if (!user) return json({ error: "로그인이 필요합니다." }, 401);
  if (user.status === "banned") return json({ error: "정지된 계정입니다." }, 403);
  return json({ user: publicUser(user) });
}

async function requireMember(request, env) {
  const user = await getUserByToken(env, getBearerToken(request));
  if (!user) return { error: json({ error: "로그인이 필요합니다." }, 401) };
  if (user.status === "banned") return { error: json({ error: "정지된 계정입니다." }, 403) };
  return { user };
}

async function requireAdmin(request, env) {
  const auth = await requireMember(request, env);
  if (auth.error) return auth;
  if (auth.user.role !== "admin") {
    return { error: json({ error: "관리자만 접근할 수 있습니다." }, 403) };
  }
  return auth;
}

function publicShopOverride(row) {
  let data = {};
  try {
    data = JSON.parse(row.data_json || "{}");
  } catch {
    data = {};
  }
  return {
    shopId: row.shop_id,
    deleted: !!row.deleted,
    data,
    updatedAt: row.updated_at,
  };
}

async function handleShopsList(env) {
  const { results } = await env.DB.prepare(
    `SELECT shop_id, data_json, deleted, updated_at FROM shop_overrides`
  ).all();
  const items = (results || []).map(publicShopOverride);
  return json({
    items,
    deletedIds: items.filter((i) => i.deleted).map((i) => i.shopId),
  });
}

async function handleShopGet(env, shopId) {
  const row = await env.DB.prepare(
    `SELECT shop_id, data_json, deleted, updated_at FROM shop_overrides WHERE shop_id = ?`
  )
    .bind(shopId)
    .first();
  if (!row) return json({ item: null });
  return json({ item: publicShopOverride(row) });
}

async function handleShopUpsert(request, env, shopId) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;

  const body = await readJson(request);
  if (!body || typeof body !== "object") {
    return json({ error: "잘못된 요청입니다." }, 400);
  }

  const data = body.data && typeof body.data === "object" ? body.data : body;
  if (data.id == null) data.id = isNaN(Number(shopId)) ? shopId : Number(shopId);

  await env.DB.prepare(
    `INSERT INTO shop_overrides (shop_id, data_json, deleted, updated_at, updated_by)
     VALUES (?, ?, 0, datetime('now'), ?)
     ON CONFLICT(shop_id) DO UPDATE SET
       data_json = excluded.data_json,
       deleted = 0,
       updated_at = datetime('now'),
       updated_by = excluded.updated_by`
  )
    .bind(String(shopId), JSON.stringify(data), auth.user.id)
    .run();

  return handleShopGet(env, String(shopId));
}

async function handleShopDelete(request, env, shopId) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;

  const existing = await env.DB.prepare(
    `SELECT shop_id FROM shop_overrides WHERE shop_id = ?`
  )
    .bind(String(shopId))
    .first();

  if (existing) {
    await env.DB.prepare(
      `UPDATE shop_overrides
       SET deleted = 1, updated_at = datetime('now'), updated_by = ?
       WHERE shop_id = ?`
    )
      .bind(auth.user.id, String(shopId))
      .run();
  } else {
    await env.DB.prepare(
      `INSERT INTO shop_overrides (shop_id, data_json, deleted, updated_at, updated_by)
       VALUES (?, '{}', 1, datetime('now'), ?)`
    )
      .bind(String(shopId), auth.user.id)
      .run();
  }

  return json({ ok: true, shopId: String(shopId), deleted: true });
}

async function handleUpload(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;

  if (!env.SHOP_IMAGES) {
    return json(
      {
        error:
          "이미지 저장소(R2)가 아직 연결되지 않았습니다. 이미지 URL을 직접 입력해 주세요.",
        code: "R2_MISSING",
      },
      503
    );
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return json({ error: "multipart/form-data 로 업로드해 주세요." }, 400);
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!file || typeof file === "string" || !file.size) {
    return json({ error: "파일이 없습니다." }, 400);
  }

  const maxBytes = 4.5 * 1024 * 1024;
  if (file.size > maxBytes) {
    return json({ error: "이미지는 4.5MB 이하만 업로드할 수 있습니다." }, 400);
  }

  const type = String(file.type || "application/octet-stream");
  if (!/^image\/(jpeg|jpg|png|webp|gif)$/i.test(type)) {
    return json({ error: "jpg/png/webp/gif 만 지원합니다." }, 400);
  }

  const ext =
    type.includes("png")
      ? "png"
      : type.includes("webp")
        ? "webp"
        : type.includes("gif")
          ? "gif"
          : "jpg";
  const key = `shops/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const bytes = await file.arrayBuffer();
  await env.SHOP_IMAGES.put(key, bytes, {
    httpMetadata: { contentType: type },
    customMetadata: {
      uploadedBy: String(auth.user.id),
      originalName: String(file.name || "").slice(0, 120),
    },
  });

  const url = new URL(request.url);
  const publicUrl = `${url.origin}/api/files/${encodeURIComponent(key)}`;
  return json({ ok: true, key, url: publicUrl, contentType: type, size: file.size });
}

async function handleFileGet(env, key) {
  if (!env.SHOP_IMAGES) return json({ error: "Not found" }, 404);
  const decoded = decodeURIComponent(key);
  if (!decoded || decoded.includes("..")) return json({ error: "Invalid key" }, 400);
  const obj = await env.SHOP_IMAGES.get(decoded);
  if (!obj) return json({ error: "Not found" }, 404);
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(obj.body, { headers });
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return withCors(new Response(null, { status: 204 }), request, env);
    }

    try {
      await ensureAdmin(env);
      const url = new URL(request.url);
      let path = url.pathname;
      if (path.startsWith("/api/api/")) path = path.replace("/api/api/", "/api/");

      let response;

      if (request.method === "POST" && path === "/api/signup") {
        response = await handleSignup(request, env);
      } else if (request.method === "POST" && path === "/api/login") {
        response = await handleLogin(request, env);
      } else if (request.method === "POST" && path === "/api/logout") {
        response = await handleLogout(request, env);
      } else if (request.method === "GET" && path === "/api/me") {
        response = await handleMe(request, env);
      } else if (request.method === "GET" && path === "/api/shops") {
        response = await handleShopsList(env);
      } else if (request.method === "GET" && /^\/api\/shops\/[^/]+$/.test(path)) {
        response = await handleShopGet(env, decodeURIComponent(path.split("/").pop()));
      } else if (
        (request.method === "PUT" || request.method === "PATCH") &&
        /^\/api\/shops\/[^/]+$/.test(path)
      ) {
        response = await handleShopUpsert(
          request,
          env,
          decodeURIComponent(path.split("/").pop())
        );
      } else if (request.method === "DELETE" && /^\/api\/shops\/[^/]+$/.test(path)) {
        response = await handleShopDelete(
          request,
          env,
          decodeURIComponent(path.split("/").pop())
        );
      } else if (request.method === "POST" && path === "/api/upload") {
        response = await handleUpload(request, env);
      } else if (request.method === "GET" && path.startsWith("/api/files/")) {
        const key = path.slice("/api/files/".length);
        response = await handleFileGet(env, key);
      } else if (request.method === "GET" && path === "/api/health") {
        response = json({
          ok: true,
          service: "twon-api",
          r2: !!env.SHOP_IMAGES,
        });
      } else {
        response = json({ error: "Not found" }, 404);
      }

      return withCors(response, request, env);
    } catch (err) {
      console.error(err);
      return withCors(json({ error: "서버 오류가 발생했습니다." }, 500), request, env);
    }
  },
};
