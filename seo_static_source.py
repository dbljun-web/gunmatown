#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Embed location-specific footer labels + shop cards into HTML source (SEO)."""
from __future__ import annotations

import html as html_lib
import json
import re
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

FILTER_LABEL = {
    None: "마사지",
    "all": "마사지",
    "massage": "마사지",
    "outcall": "출장마사지",
    "swedish": "스웨디시",
    "thai": "타이마사지",
    "aroma": "아로마마사지",
    "waxing": "왁싱",
    "chinese": "중국마사지",
    "foot": "발마사지",
    "spa": "스파",
}

SERVICE_WORDS = set(FILTER_LABEL.values()) | {"마사지사이트"}


def load_shops():
    text = (ROOT / "js" / "shop-card-data.js").read_text(encoding="utf-8")
    return json.loads(text[text.find("[") : text.rfind("]") + 1])


def load_district_map_via_node():
    """Extract district/dong Korean names via node (JS object)."""
    script = ROOT / "_extract_district_map.js"
    script.write_text(
        r"""
const fs = require('fs');
const src = fs.readFileSync('js/script.js', 'utf8');
const m = src.match(/window\.districtMap\s*=\s*/);
if (!m) { console.log(JSON.stringify({district:{}, dong:{}})); process.exit(0); }
let i = m.index + m[0].length;
while (src[i] && /\s/.test(src[i])) i++;
if (src[i] !== '{') { console.log(JSON.stringify({district:{}, dong:{}})); process.exit(0); }
let depth = 0, start = i;
for (; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') {
    depth--;
    if (depth === 0) { i++; break; }
  }
}
const obj = eval('(' + src.slice(start, i) + ')');
const district = {};
const dong = {};
for (const [rk, rv] of Object.entries(obj || {})) {
  const districts = (rv && rv.districts) || {};
  for (const [dk, dv] of Object.entries(districts)) {
    if (!dv || typeof dv !== 'object') continue;
    if (dv.districtsname) district[`${rk}|${dk}`] = dv.districtsname;
    const ds = dv.dongStations || {};
    for (const [dongk, name] of Object.entries(ds)) {
      dong[`${rk}|${dk}|${dongk}`] = name;
    }
  }
}
console.log(JSON.stringify({ district, dong }));
""",
        encoding="utf-8",
    )
    import subprocess

    out = subprocess.check_output(
        ["node", str(script)],
        cwd=str(ROOT),
        encoding="utf-8",
        errors="replace",
    )
    data = json.loads(out)
    return {
        "district": {tuple(k.split("|")): v for k, v in data["district"].items()},
        "dong": {tuple(k.split("|")): v for k, v in data["dong"].items()},
    }


def extract_from_filename(filename: str):
    name = filename.replace(".html", "")
    parts = name.split("-")
    region = district_key = dong_key = filter_type = region_key = None
    if parts and parts[0] in REGION_MAP:
        region_key = parts[0]
        region = REGION_MAP[region_key]
        if len(parts) >= 2:
            if parts[1] in FILTER_KEYWORDS:
                filter_type = parts[1]
            else:
                district_key = parts[1]
                dong_parts = []
                for i in range(2, len(parts)):
                    if parts[i] in FILTER_KEYWORDS:
                        filter_type = parts[i]
                        break
                    dong_parts.append(parts[i])
                if dong_parts:
                    dong_key = "-".join(dong_parts)
    elif parts and parts[0] in FILTER_KEYWORDS:
        filter_type = parts[0]
    return region, district_key, dong_key, filter_type, region_key


def label_from_h1(content: str, filter_type):
    m = re.search(r'<h1 id="resultsTitle">\s*([^<]+?)\s*</h1>', content)
    if not m:
        return None
    title = m.group(1)
    title = re.sub(r"\s*추천\s*BEST\s*샵\s*$", "", title).strip()
    title = re.sub(r"\s*BEST\s*샵\s*$", "", title).strip()
    parts = title.split()
    if not parts:
        return None
    svc = FILTER_LABEL.get(filter_type, "마사지")
    if parts[-1] in SERVICE_WORDS:
        loc = " ".join(parts[:-1]).strip()
        svc = parts[-1]
    else:
        loc = title
    if not loc:
        return f"{svc}정보"
    return f"{loc}{svc}정보"


def build_footer_label(filename, content, region, district_label, dong_name, filter_type):
    if filename == "index.html":
        return "마사지사이트정보"
    from_h1 = label_from_h1(content, filter_type)
    if from_h1 and not re.search(r"[a-zA-Z]{3,}", from_h1):
        return from_h1
    svc = FILTER_LABEL.get(filter_type, "마사지")
    if dong_name and district_label:
        return f"{district_label} {dong_name}{svc}정보"
    if region and district_label:
        return f"{region} {district_label}{svc}정보"
    if district_label:
        return f"{district_label} {svc}정보"
    if region:
        return f"{region} {svc}정보"
    return from_h1 or f"{svc}정보"


def replace_footer(content: str, text: str):
    # Handles </a> and split </a\n>
    pat = re.compile(
        r'(<a href="#" class="footer-link" onclick="openDetailsModal\(event\)"\s*>)\s*([^<]*?)\s*(</a\s*>)',
        re.DOTALL,
    )
    new_c, n = pat.subn(rf"\1{text}\3", content, count=1)
    return new_c, n > 0


def matches_filter(shop, filter_type):
    if not filter_type or filter_type == "all":
        return True
    shop_type = shop.get("type", "")
    services = shop.get("services") or []
    if isinstance(services, str):
        services = [services]
    blob = " ".join([shop_type] + [str(s) for s in services] + [shop.get("name", "")])
    is_outcall = "출장" in str(shop_type) or any("출장" in str(s) for s in services)
    if filter_type == "massage":
        return not is_outcall
    if filter_type == "outcall":
        return is_outcall
    keys = {
        "swedish": ["스웨디시"],
        "thai": ["타이", "태국"],
        "aroma": ["아로마"],
        "waxing": ["왁싱"],
        "chinese": ["중국", "경락", "지압"],
        "foot": ["발", "족욕", "풋"],
        "spa": ["스파", "SPA", "스크럽"],
    }.get(filter_type, [])
    return any(k in blob for k in keys)


def filter_shops(shops, region, district_label, dong_name, filter_type):
    out = []
    for shop in shops:
        shop_region = str(shop.get("region", "")).strip()
        shop_district = str(shop.get("district", "")).strip()
        shop_type = shop.get("type", "")
        services = shop.get("services") or []
        if isinstance(services, str):
            services = [services]
        is_outcall = "출장" in str(shop_type) or any("출장" in str(s) for s in services)

        if region:
            if is_outcall and "," in shop_region:
                if region not in [x.strip() for x in shop_region.split(",")]:
                    continue
            elif shop_region != region:
                continue
        if district_label:
            if is_outcall and ("," in shop_region or shop_region == "제주"):
                pass
            else:
                d_short = district_label.replace("구", "").replace("시", "")
                s_short = shop_district.replace("구", "").replace("시", "")
                if (
                    district_label not in shop_district
                    and shop_district not in district_label
                    and d_short != s_short
                    and d_short not in shop_district
                ):
                    continue
        if dong_name:
            hay = f"{shop.get('address','')} {shop.get('detailAddress','')} {shop.get('dong','')} {shop.get('name','')}"
            if dong_name not in hay:
                continue
        if not matches_filter(shop, filter_type):
            continue
        out.append(shop)
    if not out and dong_name:
        return filter_shops(shops, region, district_label, None, filter_type)
    return out


def create_card(shop):
    name = html_lib.escape(str(shop.get("name") or ""))
    alt = html_lib.escape(str(shop.get("alt") or name))
    image = html_lib.escape(str(shop.get("image") or ""))
    price = html_lib.escape(str(shop.get("price") or ""))
    greeting_raw = str(shop.get("greeting") or shop.get("description") or "")
    greeting = html_lib.escape(greeting_raw[:160].replace("\n", " "))
    shop_type = html_lib.escape(str(shop.get("type") or "마사지"))
    region = html_lib.escape(str(shop.get("region") or ""))
    district = shop.get("district") or ""
    dong = shop.get("dong") or ""
    location = html_lib.escape(f"{district} {dong}".strip() or region)
    phone = shop.get("phone") or ""
    address = shop.get("address") or ""
    detail = shop.get("detailAddress") or ""
    addr_line = html_lib.escape(" | ".join([p for p in [detail, address, phone] if p]))
    sid = shop.get("id")
    onclick = f"goToDetail({sid})" if sid is not None else ""
    type_label = shop.get("typeLabel") or ("힐링샵" if shop.get("showHealingShop") else "")
    type_html = (
        f'<div class="shop-type shop-type-healing">{html_lib.escape(str(type_label))}</div>'
        if type_label
        else ""
    )
    return f'''        <div class="massage-card" data-type="{shop_type}" data-region="{region}" onclick="{onclick}" style="cursor: pointer;">
            <div class="card-image">
                <img src="{image}" alt="{alt}" class="shop-image" width="300" height="200" loading="lazy">
                <div class="image-overlay">{type_html}</div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <div class="shop-name-container">
                        <div class="shop-name">{name}</div>
                        <div class="shop-location-info"><span class="shop-district">{location}</span></div>
                    </div>
                </div>
                <div class="card-info"><div class="info-item greeting"><span>{greeting}</span></div></div>
                <div class="card-footer" style="display:flex;align-items:center;gap:12px;">
                    <div class="price-container" style="display:flex;align-items:center;gap:8px;overflow:hidden;width:100%;">
                        <div class="price" style="flex-shrink:0;"><span class="price-label">최저가</span> {price}</div>
                        <div class="shop-address-info" style="font-size:12px;color:#666;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;">{addr_line}</div>
                    </div>
                </div>
            </div>
        </div>'''


def inject_cards(content: str, cards_html: str):
    start_m = re.search(r'<div[^>]*id=["\']massageList["\'][^>]*>', content)
    if not start_m:
        return content, False
    start_tag_end = start_m.end()
    main_end = content.find("</main>", start_tag_end)
    if main_end < 0:
        main_end = len(content)
    section = content[start_tag_end:main_end]
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
        close_at = section.find("</div>")
        if close_at < 0:
            return content, False
    new_inner = "\n" + cards_html + "\n      "
    return content[:start_tag_end] + new_inner + content[start_tag_end + close_at :], True


def process_file(path: Path, shops, maps):
    name = path.name
    if name in {"notice.html", "event.html"} or name.startswith("company-"):
        return False, "skip"

    content = path.read_text(encoding="utf-8")
    region, district_key, dong_key, filter_type, region_key = extract_from_filename(name)

    district_label = None
    dong_name = None
    if region_key and district_key:
        district_label = maps["district"].get((region_key, district_key))
        if dong_key:
            dong_name = maps["dong"].get((region_key, district_key, dong_key))

    label = build_footer_label(
        name, content, region, district_label, dong_name, filter_type
    )
    content, footer_ok = replace_footer(content, label)

    if name == "index.html":
        page_shops = shops[:80]
    else:
        page_shops = filter_shops(shops, region, district_label, dong_name, filter_type)
        if not page_shops and region:
            page_shops = filter_shops(shops, region, None, None, filter_type)[:40]

    cards_ok = False
    if page_shops:
        page_shops = sorted(
            page_shops,
            key=lambda s: (0 if s.get("showHealingShop") else 1, s.get("name") or ""),
        )[:60]
        cards_html = "\n".join(create_card(s) for s in page_shops)
        content, cards_ok = inject_cards(content, cards_html)

    if footer_ok or cards_ok:
        path.write_text(content, encoding="utf-8")
        return True, f"footer={footer_ok} cards={cards_ok} n={len(page_shops)} label={label}"
    return False, "nochange"


def main():
    print("loading shops...", flush=True)
    shops = load_shops()
    print(f"shops={len(shops)}", flush=True)
    print("loading district map via node...", flush=True)
    maps = load_district_map_via_node()
    print(
        f"districts={len(maps['district'])} dongs={len(maps['dong'])}",
        flush=True,
    )

    # smoke test one file first
    sample = ROOT / "seoul-gangnam-nonhyeon-dong-massage.html"
    changed, msg = process_file(sample, shops, maps)
    print(f"SMOKE {sample.name}: {changed} {msg}", flush=True)
    snippet = sample.read_text(encoding="utf-8")
    fm = re.search(
        r'openDetailsModal\(event\)"\s*>\s*([^<]+)\s*</a', snippet
    )
    print(f"SMOKE footer text: {fm.group(1) if fm else 'MISSING'}", flush=True)
    print(f"SMOKE cards: {snippet.count('massage-card')}", flush=True)
    # verify footer neighbors intact
    if "회사소개" not in snippet or "이용약관" not in snippet:
        print("SMOKE FAILED: footer structure broken", flush=True)
        sys.exit(1)

    html_files = sorted(ROOT.glob("*.html"))
    print(f"html={len(html_files)}", flush=True)
    ok = skip = fail = 0
    for f in html_files:
        try:
            changed, msg = process_file(f, shops, maps)
            if changed:
                ok += 1
                if ok <= 8 or ok % 1000 == 0:
                    print(f"[{ok}] {f.name}: {msg}", flush=True)
            else:
                skip += 1
        except Exception as e:
            fail += 1
            print(f"ERR {f.name}: {e}", flush=True)
    print(f"DONE changed={ok} skip={skip} fail={fail}", flush=True)


if __name__ == "__main__":
    main()
