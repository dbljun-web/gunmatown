async function applyShopOverridesToCardData(options = {}) {
  if (!Array.isArray(window.shopCardData)) return window.shopCardData || [];
  if (typeof fetchShopOverrides !== "function") return window.shopCardData;
  // file:// 로컬 열기에서는 CORS로 API 호출 불가 → 원본 데이터만 사용
  if (typeof location !== "undefined" && location.protocol === "file:") {
    return window.shopCardData;
  }

  const timeoutMs =
    options.timeoutMs != null ? Number(options.timeoutMs) : 15000;
  const CACHE_KEY = "twon-shop-overrides-cache-v1";

  function mergePayload(payload) {
    if (!payload || typeof payload !== "object") return;
    const deleted = new Set((payload.deletedIds || []).map(String));
    const map = new Map();
    (payload.items || []).forEach((item) => {
      if (!item || item.deleted) return;
      map.set(String(item.shopId), item.data || {});
    });

    window.shopCardData = window.shopCardData
      .filter((shop) => !deleted.has(String(shop.id)))
      .map((shop) => {
        const patch = map.get(String(shop.id));
        return patch ? { ...shop, ...patch, id: shop.id } : shop;
      });

    map.forEach((data, id) => {
      if (window.shopCardData.some((s) => String(s.id) === id)) return;
      if (data && data.id != null) {
        window.shopCardData.push({ ...data, id: data.id });
      }
    });
  }

  function syncRuntimeShopLists() {
    if (!Array.isArray(window.shopCardData)) return;
    const next =
      typeof sortShops === "function"
        ? sortShops(window.shopCardData)
        : window.shopCardData.slice();
    window.massageShops = next;
    // script.js 의 let massageShops 와 동일 바인딩(고전 스크립트 전역 렉시컬)
    try {
      if (typeof massageShops !== "undefined") massageShops = next;
    } catch {
      /* ignore */
    }
  }

  function refreshVisibleList() {
    if (typeof displayMassageShops !== "function") return;
    const listEl = document.getElementById("massageList");
    if (!listEl) return;
    // 목록이 아직 안 그려졌으면 initializeApp 쪽이 이어서 그림
    if (
      !listEl.querySelector(".massage-card") &&
      !listEl.classList.contains("sorted")
    ) {
      return;
    }
    // 지역/세부지역/테마 페이지는 displayFilteredResults 가 필터 상태를 반영
    if (typeof displayFilteredResults === "function") {
      displayFilteredResults();
      return;
    }
    if (typeof performLocationSearch === "function") {
      performLocationSearch();
      return;
    }
    displayMassageShops(window.massageShops || window.shopCardData || []);
  }

  // 이전 성공 캐시로 즉시 반영 (느린 API여도 greeting/price가 카드에 보이게)
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      mergePayload(JSON.parse(cached));
      syncRuntimeShopLists();
    }
  } catch {
    /* ignore */
  }

  try {
    const payload = await Promise.race([
      fetchShopOverrides(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("shop overrides timeout")),
          timeoutMs
        )
      ),
    ]);
    mergePayload(payload);
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota */
    }
    syncRuntimeShopLists();
    refreshVisibleList();
  } catch (err) {
    console.warn("shop overrides load failed", err);
  }
  return window.shopCardData;
}

window.applyShopOverridesToCardData = applyShopOverridesToCardData;
