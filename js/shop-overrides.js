async function applyShopOverridesToCardData() {
  if (!Array.isArray(window.shopCardData)) return window.shopCardData || [];
  if (typeof fetchShopOverrides !== "function") return window.shopCardData;
  // file:// 로컬 열기에서는 CORS로 API 호출 불가 → 원본 데이터만 사용
  if (typeof location !== "undefined" && location.protocol === "file:") {
    return window.shopCardData;
  }

  try {
    const payload = await Promise.race([
      fetchShopOverrides(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("shop overrides timeout")), 2500)
      ),
    ]);
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
      if (data && data.id != null) window.shopCardData.push({ ...data, id: data.id });
    });
  } catch (err) {
    console.warn("shop overrides load failed", err);
  }
  return window.shopCardData;
}

window.applyShopOverridesToCardData = applyShopOverridesToCardData;
