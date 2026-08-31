const ADMIN_STORAGE_KEY = "gunmatown-admin-mode";

function getAuthUserSafe() {
  try {
    return typeof getCachedAuthUser === "function" ? getCachedAuthUser() : null;
  } catch {
    return null;
  }
}

function isLoggedInUser() {
  const user = getAuthUserSafe();
  return !!(user && user.status !== "banned");
}

function isAdminMode() {
  const cached = getAuthUserSafe();
  return !!(cached && cached.role === "admin" && cached.status !== "banned");
}

function setAdminMode(enabled) {
  try {
    if (enabled) localStorage.setItem(ADMIN_STORAGE_KEY, "1");
    else localStorage.removeItem(ADMIN_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function setAuthElementVisible(el, visible) {
  if (!el) return;
  el.hidden = !visible;
  // .side-menu-item { display:flex } 가 [hidden]을 덮어쓰므로 인라인으로 강제
  if (el.classList.contains("side-menu-item")) {
    el.style.display = visible ? "flex" : "none";
  } else {
    el.style.display = visible ? "" : "none";
  }
}

function applyAdminVisibility() {
  const admin = isAdminMode();
  document.body.classList.toggle("is-admin", admin);
  document.querySelectorAll("[data-admin-only]").forEach((el) => {
    setAuthElementVisible(el, admin);
  });
}

function applyMemberVisibility() {
  const loggedIn = isLoggedInUser();
  document.body.classList.toggle("is-member", loggedIn);
  document.querySelectorAll("[data-member-only]").forEach((el) => {
    setAuthElementVisible(el, loggedIn);
  });
  document.querySelectorAll("[data-guest-only]").forEach((el) => {
    setAuthElementVisible(el, !loggedIn);
  });
  const nameEls = document.querySelectorAll("[data-auth-name]");
  const user = getAuthUserSafe();
  nameEls.forEach((el) => {
    el.textContent = user ? user.nickname || user.username : "";
  });
}

function applyAuthVisibility() {
  applyAdminVisibility();
  applyMemberVisibility();
}

async function initAuthUi() {
  if (typeof fetchCurrentUser === "function") {
    await fetchCurrentUser();
  }
  applyAuthVisibility();
}

document.addEventListener("DOMContentLoaded", () => {
  initAuthUi();
});

window.isAdminMode = isAdminMode;
window.isLoggedInUser = isLoggedInUser;
window.setAdminMode = setAdminMode;
window.applyAuthVisibility = applyAuthVisibility;
window.initAuthUi = initAuthUi;
