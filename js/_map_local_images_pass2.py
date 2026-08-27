# -*- coding: utf-8 -*-
"""Improve local image mapping coverage for remaining shops."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "js" / "shop-card-data.js"
IMG_DIR = ROOT / "images"
SKIP_NAMES = {
    "한국.jpg",
    "일본.jpg",
    "중국.jpg",
    "태국.jpg",
    "러시아.jpg",
    "우크라이나국기.png",
}


def compact(s: str) -> str:
    return re.sub(r"[^가-힣A-Za-z0-9]+", "", (s or "").lower())


def load_data():
    text = DATA.read_text(encoding="utf-8")
    return json.loads(text[text.index("[") : text.rindex("]") + 1])


def save_data(shops):
    DATA.write_text(
        "window.shopCardData = " + json.dumps(shops, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )


def seo_alt(shop: dict) -> str:
    region = str(shop.get("region") or "").split(",")[0].strip()
    district = str(shop.get("district") or "").strip()
    dong = str(shop.get("dong") or "").strip()
    name = str(shop.get("name") or "").strip()
    parts = [p for p in [region, district, dong, name] if p]
    base = " ".join(parts) if parts else name
    kind = "출장마사지" if shop.get("type") == "출장마사지" else "마사지"
    return f"{base} {kind} 업체 사진".strip()


def tokens(stem: str) -> list[str]:
    return [compact(t) for t in re.split(r"[_\-\s]+", stem) if len(compact(t)) >= 2]


def score(shop, filename: str) -> int:
    stem = Path(filename).stem
    stem_c = compact(stem)
    name = str(shop.get("name") or "")
    name_c = compact(name)
    if not name_c or not stem_c:
        return 0
    sc = 0
    if name_c in stem_c:
        sc += 120 + len(name_c)
    # partial name without spaces/shop words
    name_core = re.sub(r"(마사지|스웨디시|테라피|홈타이|출장|1인샵)", "", name_c)
    if len(name_core) >= 2 and name_core in stem_c:
        sc += 80 + len(name_core)

    for t in tokens(stem):
        if t in name_c:
            sc += 25 + len(t)
        if name_core and t in name_core:
            sc += 15

    for key, w in (
        ("dong", 20),
        ("district", 12),
    ):
        val = compact(str(shop.get(key) or ""))
        if val and val in stem_c:
            sc += w

    region = compact(str(shop.get("region") or "").split(",")[0])
    if region and region in stem_c:
        sc += 8

    # title-ish aliases from filename last token vs name
    last = tokens(stem)[-1] if tokens(stem) else ""
    if last and (last in name_c or name_c in last):
        sc += 40

    return sc


def main():
    shops = load_data()
    used = set()
    for s in shops:
        for u in s.get("images") or []:
            if str(u).startswith("images/"):
                used.add(Path(u).name)
        if str(s.get("image") or "").startswith("images/"):
            used.add(Path(s["image"]).name)

    files = [
        p
        for p in IMG_DIR.iterdir()
        if p.is_file()
        and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp", ".gif"}
        and p.name not in SKIP_NAMES
        and p.name not in used
    ]

    unmatched = [s for s in shops if not str(s.get("image") or "").startswith("images/")]
    newly = 0
    for shop in unmatched:
        best = None
        best_sc = 0
        for f in files:
            sc = score(shop, f.name)
            if sc > best_sc:
                best_sc = sc
                best = f
        if best and best_sc >= 50:
            path = f"images/{best.name}"
            shop["image"] = path
            shop["images"] = [path]
            shop["alt"] = seo_alt(shop)
            shop["imageAlts"] = [shop["alt"]]
            files = [f for f in files if f.name != best.name]
            newly += 1

    # ensure all mapped shops have SEO alt / imageAlts
    for shop in shops:
        if str(shop.get("image") or "").startswith("images/"):
            shop["alt"] = seo_alt(shop)
            imgs = shop.get("images") or [shop["image"]]
            shop["images"] = imgs
            shop["imageAlts"] = [
                f"{shop['alt']} {i + 1}" if i else shop["alt"] for i in range(len(imgs))
            ]

    save_data(shops)
    still = sum(1 for s in shops if not str(s.get("image") or "").startswith("images/"))
    local = sum(1 for s in shops if str(s.get("image") or "").startswith("images/"))
    print(f"local={local} still_remote={still} newly={newly} leftover_files={len(files)}")
    (ROOT / "_img_leftover.txt").write_text(
        "\n".join(f.name for f in files), encoding="utf-8"
    )
    (ROOT / "_unmapped_shops.txt").write_text(
        "\n".join(
            f"{s['id']}|{s['name']}|{s.get('region')}|{s.get('district')}|{s.get('dong')}"
            for s in shops
            if not str(s.get("image") or "").startswith("images/")
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
