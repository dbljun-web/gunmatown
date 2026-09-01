#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Copy shop images to location-matching filenames and update data/HTML."""
from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "js" / "shop-card-data.js"
IMG = ROOT / "images"

PLACE_RE = re.compile(
    r"^(?P<place>.+?)(?:마사지|출장마사지|건마|홈타이|스웨디시)(?:_|$)"
)
REGIONS = {
    "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
    "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
}


def compact(s: str) -> str:
    return re.sub(r"\s+", "", s or "")


def loc_short(name: str) -> str:
    s = compact(name)
    for suffix in ("특별자치시", "특별시", "광역시", "자치구", "구", "군", "시"):
        if s.endswith(suffix) and len(s) > len(suffix):
            s = s[: -len(suffix)]
            break
    return s


def display_places(shop: dict) -> list[str]:
    region = compact(str(shop.get("region") or "").split(",")[0])
    district = compact(str(shop.get("district") or ""))
    dong = compact(str(shop.get("dong") or ""))
    out = []
    for p in (region, loc_short(district), district, dong, loc_short(dong)):
        if p and p not in out:
            out.append(p)
    return out


def filename_place(stem: str) -> str:
    m = PLACE_RE.match(stem)
    if m:
        place = compact(m.group("place"))
        if place and place not in {"1인샵", "출장", "한국", "일본", "중국", "태국"}:
            return place
    first = compact(stem.split("_", 1)[0])
    if first in REGIONS:
        return first
    if first.endswith(("시", "구", "군", "동", "역", "읍", "면")) and len(first) >= 2:
        return first
    return ""


def target_stem(shop: dict) -> str:
    parts = []
    region = compact(str(shop.get("region") or "").split(",")[0])
    district = loc_short(str(shop.get("district") or ""))
    dong = compact(str(shop.get("dong") or ""))
    name = compact(str(shop.get("name") or ""))
    for p in (region, district, dong, name):
        if p and p not in parts:
            parts.append(p)
    return "_".join(parts) if parts else name or "shop"


def seo_alt(shop: dict) -> str:
    region = str(shop.get("region") or "").split(",")[0].strip()
    district = str(shop.get("district") or "").strip()
    dong = str(shop.get("dong") or "").strip()
    name = str(shop.get("name") or "").strip()
    parts = [p for p in (region, district, dong, name) if p]
    kind = "출장마사지" if shop.get("type") == "출장마사지" else "마사지"
    return f"{' '.join(parts)} {kind} 업체 사진".strip()


def load_shops():
    text = DATA.read_text(encoding="utf-8")
    return json.loads(text[text.index("[") : text.rindex("]") + 1]), text


def is_mismatch(shop: dict, rel: str) -> bool:
    if not rel.startswith("images/"):
        return False
    stem = Path(rel).stem
    place = filename_place(stem)
    if not place or len(place) < 2:
        return False
    shown = display_places(shop)
    shown_blob = "".join(shown)
    if place in shown_blob or any(place in p or p in place for p in shown if len(p) >= 2):
        return False
    # filename starts with a different area than displayed region/dong
    return True


def main() -> None:
    if sys.platform == "win32":
        import io

        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

    dry = "--dry" in sys.argv
    shops, _raw = load_shops()
    used_names: set[str] = set()
    for p in IMG.iterdir():
        if p.is_file():
            used_names.add(p.name)

    changes = []
    for shop in shops:
        rels = []
        img = str(shop.get("image") or "")
        if img:
            rels.append(("image", img))
        for i, u in enumerate(shop.get("images") or []):
            rels.append((f"images[{i}]", str(u)))

        seen = set()
        for key, rel in rels:
            if rel in seen:
                continue
            seen.add(rel)
            if not is_mismatch(shop, rel):
                continue
            src = ROOT / rel.replace("/", "\\")
            if not src.exists():
                src = IMG / Path(rel).name
            if not src.exists():
                print(f"MISSING file id={shop.get('id')} {rel}")
                continue
            ext = src.suffix.lower() or ".jpg"
            stem = target_stem(shop)
            dest_name = f"{stem}{ext}"
            n = 2
            while dest_name in used_names and dest_name != src.name:
                dest_name = f"{stem}_{shop.get('id')}{ext}" if n == 2 else f"{stem}_{shop.get('id')}_{n}{ext}"
                n += 1
            dest = IMG / dest_name
            if dest.resolve() != src.resolve():
                if not dry:
                    shutil.copy2(src, dest)
                used_names.add(dest_name)
            new_rel = f"images/{dest_name}"
            changes.append((shop.get("id"), shop.get("name"), rel, new_rel, filename_place(Path(rel).stem)))
            if shop.get("image") == rel:
                shop["image"] = new_rel
            shop["images"] = [new_rel if x == rel else x for x in (shop.get("images") or [])]
            shop["alt"] = seo_alt(shop)
            if shop.get("imageAlts"):
                shop["imageAlts"] = [seo_alt(shop) if i == 0 else a for i, a in enumerate(shop["imageAlts"])]

    if dry:
        print(f"DRY shops={len({c[0] for c in changes})} changes={len(changes)}")
        for row in changes:
            print(f"id={row[0]} {row[1]} | {row[4]} -> {row[3]}")
        return

    DATA.write_text(
        "window.shopCardData = " + json.dumps(shops, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )

    still_used = set()
    for shop in shops:
        still_used.add(str(shop.get("image") or ""))
        for u in shop.get("images") or []:
            still_used.add(str(u))
    old_to_new = {}
    for _id, _name, old, new, _place in changes:
        if old not in still_used:
            old_to_new.setdefault(old, new)
    html_hits = 0
    for html in ROOT.glob("*.html"):
        text = html.read_text(encoding="utf-8")
        orig = text
        for old, new in old_to_new.items():
            text = text.replace(old, new)
        if text != orig:
            html.write_text(text, encoding="utf-8")
            html_hits += 1

    print(f"shops_changed={len({c[0] for c in changes})} files_copied={len(changes)} html={html_hits}")
    for row in changes[:40]:
        print(f"id={row[0]} {row[1]} | {row[4]} -> {row[3]}")
    if len(changes) > 40:
        print(f"... {len(changes) - 40} more")


if __name__ == "__main__":
    main()
