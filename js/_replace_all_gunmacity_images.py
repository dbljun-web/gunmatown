# -*- coding: utf-8 -*-
"""Replace every gunmacity.com image URL in shop-card-data.js with local images/."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "js" / "shop-card-data.js"
IMG = ROOT / "images"
SKIP = {
    "한국.jpg",
    "일본.jpg",
    "중국.jpg",
    "태국.jpg",
    "러시아.jpg",
    "우크라이나국기.png",
}


def compact(s: str) -> str:
    return re.sub(r"[^가-힣A-Za-z0-9]+", "", (s or "").lower())


def seo_alt(shop: dict) -> str:
    region = str(shop.get("region") or "").split(",")[0].strip()
    district = str(shop.get("district") or "").strip()
    dong = str(shop.get("dong") or "").strip()
    name = str(shop.get("name") or "").strip()
    parts = [p for p in [region, district, dong, name] if p]
    kind = "출장마사지" if shop.get("type") == "출장마사지" else "마사지"
    return f"{' '.join(parts)} {kind} 업체 사진".strip()


def score(shop: dict, filename: str) -> int:
    stem = Path(filename).stem
    stem_c = compact(stem)
    name_c = compact(str(shop.get("name") or ""))
    if not name_c or not stem_c:
        return 0
    sc = 0
    if name_c in stem_c:
        sc += 120 + len(name_c)
    core = re.sub(r"(마사지|스웨디시|테라피|홈타이|출장|1인샵|스파)", "", name_c)
    if len(core) >= 2 and core in stem_c:
        sc += 70 + len(core)
    for t in re.split(r"[_\-\s]+", stem):
        tc = compact(t)
        if len(tc) >= 2 and (tc in name_c or name_c in tc):
            sc += 25 + len(tc)
    for key, w in (("dong", 20), ("district", 12)):
        val = compact(str(shop.get(key) or ""))
        if val and val in stem_c:
            sc += w
    region = compact(str(shop.get("region") or "").split(",")[0])
    if region and region in stem_c:
        sc += 8
    last = compact(stem.split("_")[-1])
    if last and (last in name_c or name_c in last):
        sc += 35
    return sc


def is_remote(url: str) -> bool:
    return "gunmacity.com" in str(url or "")


def main() -> None:
    text = DATA.read_text(encoding="utf-8")
    shops = json.loads(text[text.index("[") : text.rindex("]") + 1])

    used: set[str] = set()
    for s in shops:
        for u in [s.get("image"), *(s.get("images") or [])]:
            if str(u).startswith("images/"):
                used.add(Path(str(u)).name)

    pool = [
        p
        for p in IMG.iterdir()
        if p.is_file()
        and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif"}
        and p.name not in SKIP
        and p.name not in used
    ]

    remote_shops = [s for s in shops if is_remote(s.get("image"))]
    assigned = 0

    # 1) best-match leftover files to remote shops
    for shop in list(remote_shops):
        best = None
        best_sc = 0
        for f in pool:
            sc = score(shop, f.name)
            if sc > best_sc:
                best_sc = sc
                best = f
        if best and best_sc >= 30:
            path = f"images/{best.name}"
            shop["image"] = path
            shop["images"] = [path]
            shop["alt"] = seo_alt(shop)
            shop["imageAlts"] = [shop["alt"]]
            pool = [p for p in pool if p.name != best.name]
            used.add(best.name)
            remote_shops.remove(shop)
            assigned += 1

    # 2) remaining remote shops: assign any leftover files one-by-one
    for shop, f in zip(list(remote_shops), list(pool)):
        path = f"images/{f.name}"
        shop["image"] = path
        shop["images"] = [path]
        shop["alt"] = seo_alt(shop)
        shop["imageAlts"] = [shop["alt"]]
        used.add(f.name)
        pool = [p for p in pool if p.name != f.name]
        remote_shops.remove(shop)
        assigned += 1

    # 3) still remote: reuse existing local images (prefer same region)
    local_by_region: dict[str, list[str]] = {}
    all_local: list[str] = []
    for s in shops:
        img = str(s.get("image") or "")
        if img.startswith("images/"):
            all_local.append(img)
            reg = str(s.get("region") or "").split(",")[0]
            local_by_region.setdefault(reg, []).append(img)

    fallback = all_local[0] if all_local else "images/강남_강남역_강남클라스.jpg"
    for i, shop in enumerate(list(remote_shops)):
        reg = str(shop.get("region") or "").split(",")[0]
        cands = local_by_region.get(reg) or all_local
        path = cands[i % len(cands)] if cands else fallback
        shop["image"] = path
        shop["images"] = [path]
        shop["alt"] = seo_alt(shop)
        shop["imageAlts"] = [shop["alt"]]
        assigned += 1
        remote_shops.remove(shop)

    # 4) scrub any leftover gunmacity URLs in images arrays / content fields
    scrubbed = 0
    for shop in shops:
        changed = False
        if is_remote(shop.get("image")):
            shop["image"] = fallback
            changed = True
        imgs = shop.get("images")
        if isinstance(imgs, list):
            cleaned = []
            for u in imgs:
                if is_remote(u):
                    scrubbed += 1
                    continue
                if u and u not in cleaned:
                    cleaned.append(u)
            if not cleaned:
                cleaned = [shop.get("image") or fallback]
            if cleaned != imgs:
                shop["images"] = cleaned
                changed = True
        # strip remote urls from text blobs
        for key in ("description", "detailContent", "directions", "greeting"):
            val = shop.get(key)
            if isinstance(val, str) and "gunmacity.com" in val:
                shop[key] = re.sub(
                    r"https?://(?:www\.)?gunmacity\.com/\S+",
                    "",
                    val,
                )
                shop[key] = re.sub(r"\n{3,}", "\n\n", shop[key]).strip()
                scrubbed += 1
                changed = True
        if changed and not shop.get("alt"):
            shop["alt"] = seo_alt(shop)

    DATA.write_text(
        "window.shopCardData = " + json.dumps(shops, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )

    left = sum(1 for s in shops if "gunmacity.com" in json.dumps(s, ensure_ascii=False))
    remote_img = sum(1 for s in shops if is_remote(s.get("image")))
    local_img = sum(1 for s in shops if str(s.get("image") or "").startswith("images/"))
    print(
        f"assigned={assigned} local_img={local_img}/{len(shops)} "
        f"remote_img={remote_img} shops_still_mention_gunmacity={left} scrubbed={scrubbed}"
    )


if __name__ == "__main__":
    main()
