#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Update detailsModal filter links to current region/district/dong (SEO source)."""
from __future__ import annotations

import html as html_lib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.absolute()

REGION_MAP = {
    "seoul": "서울",
    "busan": "부산",
    "daegu": "대구",
    "incheon": "인천",
    "gwangju": "광주",
    "daejeon": "대전",
    "ulsan": "울산",
    "sejong": "세종",
    "gyeonggi": "경기",
    "gangwon": "강원",
    "chungbuk": "충북",
    "chungnam": "충남",
    "jeonbuk": "전북",
    "jeonnam": "전남",
    "gyeongbuk": "경북",
    "gyeongnam": "경남",
    "jeju": "제주",
}

FILTER_KEYWORDS = [
    "massage",
    "outcall",
    "swedish",
    "thai",
    "aroma",
    "waxing",
    "chinese",
    "foot",
    "spa",
]

ALL_FILTERS = [
    ("massage", "마사지"),
    ("outcall", "출장마사지"),
    ("swedish", "스웨디시"),
    ("thai", "타이마사지"),
    ("aroma", "아로마마사지"),
    ("waxing", "왁싱"),
    ("chinese", "중국마사지"),
    ("foot", "발마사지"),
    ("spa", "스파"),
]

THEME_DYNAMIC = {"swedish", "thai", "aroma", "waxing", "chinese", "foot", "spa"}


def load_maps():
    script = ROOT / "_extract_district_map.js"
    script.write_text(
        r"""
const fs = require('fs');
const src = fs.readFileSync('js/script.js', 'utf8');
const m = src.match(/window\.districtMap\s*=\s*/);
let i = m.index + m[0].length;
while (/\s/.test(src[i])) i++;
let depth = 0, start = i;
for (; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { i++; break; } }
}
const obj = eval('(' + src.slice(start, i) + ')');
const district = {}, dong = {};
for (const [rk, rv] of Object.entries(obj || {})) {
  for (const [dk, dv] of Object.entries((rv && rv.districts) || {})) {
    if (!dv || typeof dv !== 'object') continue;
    if (dv.districtsname) district[`${rk}|${dk}`] = dv.districtsname;
    for (const [dongk, name] of Object.entries(dv.dongStations || {})) {
      dong[`${rk}|${dk}|${dongk}`] = name;
    }
  }
}
console.log(JSON.stringify({ district, dong }));
""",
        encoding="utf-8",
    )
    out = subprocess.check_output(
        ["node", str(script)], cwd=str(ROOT), encoding="utf-8", errors="replace"
    )
    script.unlink(missing_ok=True)
    data = json.loads(out)
    return {
        "district": {tuple(k.split("|")): v for k, v in data["district"].items()},
        "dong": {tuple(k.split("|")): v for k, v in data["dong"].items()},
    }


def parse_filename(name: str):
    stem = name.replace(".html", "")
    parts = stem.split("-")
    region_key = district_key = dong_key = filter_type = None
    if parts and parts[0] in REGION_MAP:
        region_key = parts[0]
        if len(parts) >= 2:
            if parts[1] in FILTER_KEYWORDS:
                filter_type = parts[1]
            else:
                district_key = parts[1]
                dong_parts = []
                for p in parts[2:]:
                    if p in FILTER_KEYWORDS:
                        filter_type = p
                        break
                    dong_parts.append(p)
                if dong_parts:
                    dong_key = "-".join(dong_parts)
    elif parts and parts[0] in FILTER_KEYWORDS:
        filter_type = parts[0]
    return region_key, district_key, dong_key, filter_type


def build_url(region_key, district_key, dong_key, filter_key):
    if region_key and district_key and dong_key:
        base = f"{region_key}-{district_key}-{dong_key}"
        if filter_key in ("massage", "outcall"):
            return f"{base}-{filter_key}.html"
        if filter_key in THEME_DYNAMIC:
            return f"{base}.html?filter={filter_key}"
        return f"{base}.html"
    if region_key and district_key:
        base = f"{region_key}-{district_key}"
        if filter_key in ("massage", "outcall"):
            return f"{base}-{filter_key}.html"
        if filter_key in THEME_DYNAMIC:
            # district theme pages often exist as -swedish.html
            themed = ROOT / f"{base}-{filter_key}.html"
            if themed.exists():
                return f"{base}-{filter_key}.html"
            return f"{base}.html?filter={filter_key}"
        return f"{base}.html"
    if region_key:
        if filter_key in ("massage", "outcall") or filter_key in THEME_DYNAMIC:
            return f"{region_key}-{filter_key}.html"
        return f"{region_key}.html"
    if filter_key in ("massage", "outcall") or filter_key in THEME_DYNAMIC:
        return f"{filter_key}.html"
    return "index.html"


def build_label(region_name, district_label, dong_name, filter_name, is_base):
    if is_base:
        return filter_name
    if dong_name and district_label:
        return f"{district_label} {dong_name} {filter_name}"
    if region_name and district_label:
        return f"{region_name} {district_label} {filter_name}"
    if region_name:
        return f"{region_name} {filter_name}"
    return filter_name


def make_links_html(region_key, district_key, dong_key, current_filter, maps):
    region_name = REGION_MAP.get(region_key or "", "")
    district_label = (
        maps["district"].get((region_key, district_key)) if region_key and district_key else None
    )
    dong_name = (
        maps["dong"].get((region_key, district_key, dong_key))
        if region_key and district_key and dong_key
        else None
    )
    is_base = not region_key

    filters = ALL_FILTERS
    if current_filter and current_filter != "all":
        filters = [f for f in ALL_FILTERS if f[0] != current_filter]

    parts = ['<div style="display: flex; flex-direction: column; gap: 12px;">']
    for key, name in filters:
        url = build_url(region_key, district_key, dong_key, key)
        label = build_label(region_name, district_label, dong_name, name, is_base)
        parts.append(
            f'''        <a href="{html_lib.escape(url)}" style="display: block; padding: 12px; background: #f8f9fa; border-radius: 8px; text-decoration: none; color: #333; transition: background 0.2s;">
            {html_lib.escape(label)}
        </a>'''
        )
    parts.append("</div>")
    return "\n".join(parts)


def replace_filter_container(content: str, links_html: str):
    # Replace inner HTML of .filter-links-container inside detailsModal
    modal_m = re.search(r'<div[^>]*id=["\']detailsModal["\'][^>]*>', content)
    if not modal_m:
        return content, False

    # Find filter-links-container after detailsModal start
    start_search = modal_m.start()
    cont_m = re.search(
        r'(<div class="filter-links-container"[^>]*>)',
        content[start_search:],
    )
    if not cont_m:
        return content, False
    cont_open_start = start_search + cont_m.start()
    cont_open_end = start_search + cont_m.end()

    # Match closing of this container div
    section = content[cont_open_end:]
    depth = 1
    i = 0
    close_at = -1
    while i < len(section):
        if section.startswith("<div", i):
            gt = section.find(">", i)
            i = gt + 1 if gt >= 0 else i + 4
            depth += 1
            continue
        if section.startswith("</div>", i):
            depth -= 1
            if depth == 0:
                close_at = i
                break
            i += 6
            continue
        i += 1
    if close_at < 0:
        return content, False

    new_content = (
        content[:cont_open_end]
        + "\n              "
        + links_html
        + "\n            "
        + content[cont_open_end + close_at :]
    )
    return new_content, True


def process_file(path: Path, maps):
    name = path.name
    if name.startswith("company-") or name in {"notice.html", "event.html"}:
        return False, "skip"

    region_key, district_key, dong_key, filter_type = parse_filename(name)
    links = make_links_html(region_key, district_key, dong_key, filter_type, maps)
    content = path.read_text(encoding="utf-8")
    new_content, ok = replace_filter_container(content, links)
    if not ok:
        return False, "no-container"
    if new_content == content:
        return False, "unchanged"
    path.write_text(new_content, encoding="utf-8")
    sample = ""
    if dong_key:
        sample = f"{district_key}/{dong_key}"
    return True, sample or (region_key or "base")


def main():
    print("loading maps...", flush=True)
    maps = load_maps()
    print(f"districts={len(maps['district'])} dongs={len(maps['dong'])}", flush=True)

    # smoke
    sample = ROOT / "seoul-gangnam-nonhyeon-dong-outcall.html"
    process_file(sample, maps)
    t = sample.read_text(encoding="utf-8")
    assert "논현동 스웨디시" in t or "논현동 마사지" in t, "smoke label missing"
    assert "nonhyeon-dong.html?filter=swedish" in t, "smoke theme url missing"
    assert "nonhyeon-dong-massage.html" in t, "smoke massage url missing"
    print("SMOKE OK", flush=True)

    ok = skip = fail = 0
    for f in sorted(ROOT.glob("*.html")):
        try:
            changed, msg = process_file(f, maps)
            if changed:
                ok += 1
                if ok <= 5 or ok % 2000 == 0:
                    print(f"[{ok}] {f.name} {msg}", flush=True)
            else:
                skip += 1
        except Exception as e:
            fail += 1
            print(f"ERR {f.name}: {e}", flush=True)
    print(f"DONE changed={ok} skip={skip} fail={fail}", flush=True)


if __name__ == "__main__":
    main()
