const AUTH_API_BASE = (() => {
  try {
    return (
      (typeof localStorage !== "undefined" &&
        localStorage.getItem("gunmatown-api-base")) ||
      "https://gunmatown-api.pages.dev"
    );
  } catch {
    return "https://gunmatown-api.pages.dev";
  }
})();
const AUTH_TOKEN_KEY = "gunmatown-auth-token";
const AUTH_USER_KEY = "gunmatown-auth-user";

function getAuthToken() {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

function setAuthSession(token, user) {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } catch {
    /* file:// 등에서 저장 불가 */
  }
}

function clearAuthSession() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch {
    /* ignore */
  }
}

function getCachedAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function authApi(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const hasBody = options.body != null && options.body !== "";
  if (hasBody && !headers["content-type"] && !headers["Content-Type"]) {
    headers["content-type"] = "application/json";
  }
  const token = getAuthToken();
  if (token) headers.authorization = `Bearer ${token}`;

  const res = await fetch(`${AUTH_API_BASE}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error((data && data.error) || "요청에 실패했습니다.");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function signupUser({ username, password, nickname }) {
  const data = await authApi("/api/signup", {
    method: "POST",
    body: JSON.stringify({ username, password, nickname }),
  });
  setAuthSession(data.token, data.user);
  return data.user;
}

async function loginUser({ username, password }) {
  const data = await authApi("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  setAuthSession(data.token, data.user);
  return data.user;
}

async function logoutUser() {
  try {
    await authApi("/api/logout", { method: "POST", body: "{}" });
  } catch {
    /* ignore */
  }
  clearAuthSession();
}

async function fetchCurrentUser() {
  const token = getAuthToken();
  if (!token) {
    clearAuthSession();
    return null;
  }
  try {
    const data = await authApi("/api/me");
    setAuthSession(token, data.user);
    return data.user;
  } catch (err) {
    if (err.status === 401 || err.status === 403) clearAuthSession();
    return null;
  }
}

async function fetchShopOverrides() {
  const data = await authApi("/api/shops");
  return data;
}

async function fetchShopOverride(shopId) {
  const data = await authApi(`/api/shops/${encodeURIComponent(shopId)}`);
  return data.item;
}

async function saveShopOverride(shopId, shopData) {
  const data = await authApi(`/api/shops/${encodeURIComponent(shopId)}`, {
    method: "PUT",
    body: JSON.stringify({ data: shopData }),
  });
  return data.item;
}

async function deleteShopOverride(shopId) {
  await authApi(`/api/shops/${encodeURIComponent(shopId)}`, {
    method: "DELETE",
  });
}

async function uploadShopImage(file) {
  const token = getAuthToken();
  const form = new FormData();
  form.append("file", file, file.name || "upload.jpg");

  const headers = {};
  if (token) headers.authorization = `Bearer ${token}`;

  const res = await fetch(`${AUTH_API_BASE}/api/upload`, {
    method: "POST",
    headers,
    body: form,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const err = new Error((data && data.error) || "업로드에 실패했습니다.");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

window.AUTH_API_BASE = AUTH_API_BASE;
window.getAuthToken = getAuthToken;
window.setAuthSession = setAuthSession;
window.clearAuthSession = clearAuthSession;
window.getCachedAuthUser = getCachedAuthUser;
window.signupUser = signupUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.fetchCurrentUser = fetchCurrentUser;
window.fetchShopOverrides = fetchShopOverrides;
window.fetchShopOverride = fetchShopOverride;
window.saveShopOverride = saveShopOverride;
window.deleteShopOverride = deleteShopOverride;
window.uploadShopImage = uploadShopImage;
