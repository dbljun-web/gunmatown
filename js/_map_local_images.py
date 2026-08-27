# -*- coding: utf-8 -*-
"""Map local images/*.jpg to shop-card-data.js and set SEO-friendly alts."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JS = ROOT / "js"
DATA = JS / "shop-card-data.js"
IMG_DIR = ROOT / "images"


def compact(s: str) -> str:
    return re.sub(r"[^가-힣A-Za-z0-9]+", "", (s or "").lower())


def load_data() -> list[dict]:
    text = DATA.read_text(encoding="utf-8")
    start = text.index("[")
    end = text.rindex("]") + 1
    return json.loads(text[start:end])


def save_data(shops: list[dict]) -> None:
    DATA.write_text(
        "window.shopCardData = " + json.dumps(shops, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )


def list_local_images() -> list[Path]:
    files = []
    for p in IMG_DIR.iterdir():
        if not p.is_file():
            continue
        if p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
            continue
        files.append(p)
    return files


def score_match(shop: dict, filename: str) -> int:
    stem = Path(filename).stem
    stem_c = compact(stem)
    name = str(shop.get("name") or "")
    name_c = compact(name)
    if not name_c or not stem_c:
        return 0

    score = 0
    if name_c in stem_c:
        score += 100 + len(name_c)
    elif stem_c in name_c and len(stem_c) >= 3:
        score += 60 + len(stem_c)
    else:
        # token overlap from underscore-separated filename
        tokens = [compact(t) for t in re.split(r"[_\-]+", stem) if compact(t)]
        hits = [t for t in tokens if t and t in name_c]
        if hits:
            score += 20 * len(hits) + sum(len(t) for t in hits)

    dong = compact(str(shop.get("dong") or ""))
    district = compact(str(shop.get("district") or ""))
    region = compact(str(shop.get("region") or "").split(",")[0])
    if dong and dong in stem_c:
        score += 15
    if district and district in stem_c:
        score += 10
    if region and region in stem_c:
        score += 5

    # avoid weak matches on very short names
    if score and len(name_c) <= 2 and name_c not in stem_c:
        return 0
    return score


def seo_alt(shop: dict) -> str:
    region = str(shop.get("region") or "").split(",")[0].strip()
    district = str(shop.get("district") or "").strip()
    dong = str(shop.get("dong") or "").strip()
    name = str(shop.get("name") or "").strip()
    parts = [p for p in [region, district, dong, name] if p]
    base = " ".join(parts) if parts else name
    kind = "출장마사지" if shop.get("type") == "출장마사지" else "마사지"
    return f"{base} {kind} 업체 사진".strip()


def main() -> None:
    shops = load_data()
    files = list_local_images()
    unused = {f.name: f for f in files}
    assigned: dict[int, list[str]] = {s["id"]: [] for s in shops}

    # greedy best match per file
    candidates = []
    for f in files:
        best = None
        best_score = 0
        for shop in shops:
            sc = score_match(shop, f.name)
            if sc > best_score:
                best_score = sc
                best = shop
        if best and best_score >= 60:
            candidates.append((best_score, best["id"], f))

    candidates.sort(key=lambda x: (-x[0], x[2].name))
    for score, shop_id, f in candidates:
        if f.name not in unused:
            continue
        assigned[shop_id].append(f"images/{f.name}")
        unused.pop(f.name, None)

    # second pass: unmatched shops try looser threshold
    unmatched_shops = [s for s in shops if not assigned[s["id"]]]
    for shop in unmatched_shops:
        best_f = None
        best_score = 0
        for name, f in list(unused.items()):
            sc = score_match(shop, name)
            if sc > best_score:
                best_score = sc
                best_f = f
        if best_f and best_score >= 40:
            assigned[shop["id"]].append(f"images/{best_f.name}")
            unused.pop(best_f.name, None)

    mapped = 0
    multi = 0
    for shop in shops:
        imgs = assigned.get(shop["id"]) or []
        if not imgs:
            continue
        mapped += 1
        if len(imgs) > 1:
            multi += 1
        shop["image"] = imgs[0]
        shop["images"] = imgs
        shop["alt"] = seo_alt(shop)
        # keep galleryAlts aligned
        shop["imageAlts"] = [
            f"{shop['alt']} {i + 1}" if i else shop["alt"] for i in range(len(imgs))
        ]

    save_data(shops)

    sample = next((s for s in shops if str(s.get("sourceId")) == "70"), None)
    report = ROOT / "_img_map_report.txt"
    lines = [
        f"mapped={mapped}/{len(shops)} multi={multi} unused={len(unused)}",
        f"sample70={sample and sample.get('name')} image={sample and sample.get('image')} alt={sample and sample.get('alt')}",
        "UNUSED:",
        *[f.name for f in sorted(unused.values(), key=lambda p: p.name)[:80]],
    ]
    report.write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines[:5]))


if __name__ == "__main__":
    main()
