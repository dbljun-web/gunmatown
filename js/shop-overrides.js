async function applyShopOverridesToCardData() {
  if (!Array.isArray(window.shopCardData)) return window.shopCardData || [];
  if (typeof fetchShopOverrides !== "function") return window.shopCardData;

  try {
    const payload = await fetchShopOverrides();
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

    // 신규 추가 오버라이드(원본에 없는 id)
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
