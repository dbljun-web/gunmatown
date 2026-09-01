#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fill relatedInfoModal from location JSON using a fixed sentence skeleton."""
from __future__ import annotations

import html as html_lib
import re
import sys
from pathlib import Path

from seo_apply_listing_rules import (
    SKIP_NAMES,
    SKIP_PREFIX,
    build_keyword,
    extract_list_inner,
    loc_short,
    parse_card_id,
    parse_card_text,
    shop_in_location,
    split_cards,
)
from seo_static_source import (
    FILTER_LABEL,
    extract_from_filename,
    load_district_map_via_node,
    load_shops,
    matches_filter,
)

ROOT = Path(__file__).parent.absolute()

SERVICE_SLOTS = [
    ("swedish", "스웨디시", "query"),
    ("thai", "타이마사지", "query"),
    ("spa", "스파", "query"),
    ("outcall", "출장마사지", "file"),
]


def strip_dong(name: str) -> str:
    name = name.replace(" ", "")
    if name.endswith("동") and len(name) > 1 and not name.endswith("역"):
        return name[:-1]
    return name


def location_base(region_key, district_key, dong_key) -> str:
    parts = [p for p in (region_key, district_key, dong_key) if p]
    return "-".join(parts) if parts else ""


def map_places(maps, region_key, district_key):
    dongs, stations = [], []
    seen_d, seen_s = set(), set()
    for (rk, dk, _dongk), name in maps["dong"].items():
        if region_key and rk != region_key:
            continue
        if district_key and dk != district_key:
            continue
        name = str(name).replace(" ", "")
        if not name:
            continue
        if name.endswith("역"):
            if name not in seen_s:
                seen_s.add(name)
                stations.append(name)
        else:
            short = strip_dong(name)
            if short and short not in seen_d:
                seen_d.add(short)
                dongs.append(short)
    return dongs, stations


def dong_token(raw: str) -> str:
    raw = (raw or "").strip().replace(" ", "")
    if not raw or raw.endswith("역"):
        return ""
    m = re.search(r"([가-힣]+동)", raw)
    if m:
        return strip_dong(m.group(1))
    if raw.endswith("면") or raw.endswith("읍") or raw.endswith("리"):
        return raw
    return ""


def dongs_from_cards(content: str, shops_by_id: dict) -> list[str]:
    span = extract_list_inner(content)
    if not span:
        return []
    _s, _e, inner = span
    out, seen = [], set()
    for card in split_cards(inner):
        sid = parse_card_id(card)
        shop = shops_by_id.get(sid) if sid is not None else None
        token = ""
        if shop:
            token = dong_token(str(shop.get("dong") or ""))
        if not token:
            text = parse_card_text(card)
            token = dong_token(text.get("district") or "") or dong_token(
                text.get("address") or ""
            )
        if token and token not in seen:
            seen.add(token)
            out.append(token)
        if len(out) >= 3:
            break
    return out


def pick_dongs(from_shops, from_map, page_dong_name) -> list[str]:
    out, seen = [], set()

    def add(item):
        if not item or item in seen:
            return
        seen.add(item)
        out.append(item)

    if page_dong_name and not page_dong_name.endswith("역"):
        add(strip_dong(page_dong_name))
    for item in from_shops:
        add(item)
        if len(out) >= 3:
            return out
    if out:
        return out
    for item in from_map:
        add(item)
        if len(out) >= 3:
            return out
    return out


def pick_stations(gugun, dongs, from_map, page_dong_name) -> list[str]:
    allowed = set(from_map)
    out = []

    def add(name):
        if name in allowed and name not in out:
            out.append(name)

    if page_dong_name and page_dong_name.endswith("역"):
        add(page_dong_name.replace(" ", ""))
    add(f"{gugun}역")
    if len(dongs) >= 2:
        add(f"{dongs[1]}역")
    elif dongs:
        add(f"{dongs[0]}역")
    return out[:2]


def service_list(base: str, filter_type) -> list[dict]:
    slots = list(SERVICE_SLOTS)
    if filter_type == "outcall":
        slots[3] = ("massage", "마사지", "file")
    out = []
    for key, name, kind in slots:
        if kind == "query":
            url = f"{base}.html?filter={key}" if base else f"index.html?filter={key}"
        elif key == "outcall":
            url = f"{base}-outcall.html" if base else "outcall.html"
        else:
            url = f"{base}-massage.html" if base else "massage.html"
        out.append({"name": name, "url": url})
    return out[:4]


def shops_from_cards(content: str, shops_by_id: dict) -> list[dict]:
    span = extract_list_inner(content)
    if not span:
        return []
    _s, _e, inner = span
    out, seen = [], set()
    for card in split_cards(inner):
        sid = parse_card_id(card)
        shop = shops_by_id.get(sid) if sid is not None else None
        text = parse_card_text(card)
        greet_m = re.search(
            r'<div class="info-item greeting"><span>(.*?)</span></div>',
            card,
            re.DOTALL,
        )
        card_greet = html_lib.unescape(greet_m.group(1)).strip() if greet_m else ""
        card_greet = re.sub(r"\s+", " ", card_greet)
        name = (shop or {}).get("name") or text.get("name") or ""
        dong = str((shop or {}).get("dong") or "").strip()
        if not dong:
            dong = text.get("district") or ""
        addr = str((shop or {}).get("address") or text.get("address") or "")
        phone = str((shop or {}).get("phone") or text.get("phone") or "")
        key = (re.sub(r"\s+", "", addr).lower(), re.sub(r"\s+", "", phone))
        if key in seen and (addr or phone):
            continue
        seen.add(key if (addr or phone) else ("id", sid, name))
        raw = ""
        if shop:
            raw = str(shop.get("greeting") or shop.get("description") or "").strip()
            raw = re.sub(r"\s+", " ", raw)
        if not raw:
            raw = card_greet
        out.append(
            {
                "id": sid,
                "name": name,
                "dong": dong,
                "blurb": raw[:140] if raw else "",
            }
        )
    return out


def join_dot(items: list[str]) -> str:
    return "·".join(items)


def svc_anchor(gugun: str, item: dict) -> str:
    url = html_lib.escape(item["url"], quote=True)
    name = html_lib.escape(item["name"])
    return f'<a href="{url}">{gugun} {name}</a>'


def build_html(data: dict) -> str:
    gugun = html_lib.escape(data["gugun"])
    keyword = html_lib.escape(data["keyword"])
    dongs = data["dongs"]
    stations = data["stations"]
    services = list(data["services"] or [])
    hub = data.get("hub") or ""
    dongs_s = html_lib.escape(join_dot(dongs))
    stations_s = html_lib.escape(join_dot(stations))
    dong1 = html_lib.escape(dongs[0]) if dongs else gugun
    dong2 = html_lib.escape(dongs[1]) if len(dongs) > 1 else ""
    dong_span = f"{dong1}·{dong2}" if dong2 else dong1
    while len(services) < 4 and services:
        services.append(services[-1])
    svc = [svc_anchor(gugun, s) for s in services[:4]]
    while len(svc) < 4:
        svc.append(gugun)
    if stations_s and dongs_s:
        p1_geo = f"{gugun} 지역은 {dongs_s} 일대와 {stations_s} 기준으로 {keyword} 정보를 안내합니다."
    elif dongs_s:
        p1_geo = f"{gugun} 지역은 {dongs_s} 일대 기준으로 {keyword} 정보를 안내합니다."
    else:
        p1_geo = f"{gugun} 지역은 {keyword} 정보를 안내합니다."
    p1 = f"{p1_geo} 같은 지역 서비스는 {svc[0]}, {svc[1]} 페이지에서 볼 수 있습니다."
    p2 = f"{dong_span} 구간에서 {svc[2]}, {svc[3]}로 이동할 수 있습니다."
    if hub:
        p2 += f' 전체 목록은 <a href="{html_lib.escape(hub, quote=True)}">{gugun} 전체</a>에서 확인합니다.'
    return (
        f'<div class="info-section"><h3>📍 {gugun} 마사지 지역 안내</h3>'
        f"<p>{p1}</p><p>{p2}</p></div>"
    )


FILTER_CARDS = [
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

FILTER_CARD_STYLE = (
    'style="display: block; padding: 12px 16px; background-color: #f5f5f5; '
    'border-radius: 8px; text-decoration: none; color: #333; font-weight: 500; '
    'transition: all 0.3s ease;" '
    """onmouseover="this.style.backgroundColor='#e0e0e0'; this.style.color='#007bff';" """
    """onmouseout="this.style.backgroundColor='#f5f5f5'; this.style.color='#333';" """
)


def loc_label(district_label: str | None) -> str:
    area = loc_short(district_label)
    if len(area) < 2:
        return (district_label or "").replace(" ", "")
    return area


def filter_card_url(region_key, district_key, dong_key, filter_key) -> str:
    parts = [p for p in (region_key, district_key, dong_key) if p]
    base = "-".join(parts)
    if filter_key in ("massage", "outcall"):
        if base:
            return f"{base}-{filter_key}.html"
        return f"{filter_key}.html"
    if base:
        return f"{base}.html?filter={filter_key}"
    return f"index.html?filter={filter_key}"


def filter_card_label(region, district_label, dong_name, filter_name) -> str:
    area = loc_label(district_label)
    dong = (dong_name or "").replace(" ", "")
    if dong and area:
        return f"{area} {dong} {filter_name}"
    if region and area:
        return f"{region} {area} {filter_name}"
    if region:
        return f"{region} {filter_name}"
    return filter_name


def details_filter_html(region, district_label, dong_name, region_key, district_key, dong_key) -> str:
    cards = []
    for key, fname in FILTER_CARDS:
        url = html_lib.escape(filter_card_url(region_key, district_key, dong_key, key), quote=True)
        label = html_lib.escape(filter_card_label(region, district_label, dong_name, fname))
        cards.append(f'        <a href="{url}" {FILTER_CARD_STYLE}>\n          {label}\n        </a>')
    inner = "\n      \n".join(cards)
    return (
        '<div style="display: flex; flex-direction: column; gap: 12px;">\n'
        f"{inner}\n"
        "      </div>"
    )


def replace_details_filters(content: str, links_html: str) -> tuple[str, bool]:
    modal_m = re.search(r'<div[^>]*id=["\']detailsModal["\'][^>]*>', content)
    if not modal_m:
        return content, False
    start_search = modal_m.start()
    cont_m = re.search(
        r'(<div class="filter-links-container"[^>]*>)',
        content[start_search:],
    )
    if not cont_m:
        return content, False
    cont_open_end = start_search + cont_m.end()
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


def footer_info_label(filename, region, district_label, dong_name, filter_type, keyword):
    if filename == "index.html":
        return "마사지사이트정보"
    svc = FILTER_LABEL.get(filter_type, "마사지")
    area = loc_short(district_label)
    if len(area) < 2:
        area = (district_label or "").replace(" ", "")
    dong = (dong_name or "").replace(" ", "")
    if dong and area:
        return f"{area} {dong}{svc}정보"
    if region and area:
        return f"{region} {area}{svc}정보"
    if area:
        return f"{area}{svc}정보"
    if region:
        return f"{region}{svc}정보"
    return f"{keyword}정보"


def footer_row_html(href: str, label: str) -> str:
    return (
        '<div class="footer-link-row">\n'
        f'            <a href="{html_lib.escape(href, quote=True)}" class="footer-link" '
        f'onclick="openDetailsModal(event)">{html_lib.escape(label)}</a>\n'
        "          </div>"
    )


def replace_footer_keywords(content: str, row_html: str) -> tuple[str, bool]:
    m = re.search(
        r'(<div class="footer-links">\s*)(<div class="footer-link-row">.*?</div>)',
        content,
        re.DOTALL,
    )
    if not m:
        return content, False
    return content[: m.start(2)] + row_html + content[m.end(2) :], True


def replace_modal_body(content: str, inner_html: str) -> tuple[str, bool]:
    idx = content.find('id="relatedInfoModal"')
    if idx < 0:
        return content, False
    body_start = content.find('<div class="modal-body">', idx)
    if body_start < 0:
        return content, False
    i = body_start + len('<div class="modal-body">')
    depth = 1
    while i < len(content):
        if content.startswith("<div", i):
            gt = content.find(">", i)
            i = gt + 1 if gt >= 0 else i + 4
            depth += 1
            continue
        if content.startswith("</div>", i):
            depth -= 1
            if depth == 0:
                new_block = (
                    '<div class="modal-body">\n          '
                    + inner_html
                    + "\n        </div>"
                )
                return content[:body_start] + new_block + content[i + 6 :], True
            i += 6
            continue
        i += 1
    return content, False


def page_shops(all_shops, region, district_label, dong_name, filter_type):
    out = []
    for shop in all_shops:
        if region or district_label or dong_name:
            if not shop_in_location(shop, region, district_label, dong_name):
                continue
        if filter_type and not matches_filter(shop, filter_type):
            continue
        out.append(shop)
    return out


def process_file(path: Path, maps, shops_by_id) -> tuple[bool, str]:
    name = path.name
    if name in SKIP_NAMES or name.startswith(SKIP_PREFIX):
        return False, "skip"
    content = path.read_text(encoding="utf-8")
    if 'id="relatedInfoModal"' not in content:
        return False, "no-modal"

    region, district_key, dong_key, filter_type, region_key = extract_from_filename(name)
    district_label = None
    dong_name = None
    if region_key and district_key:
        district_label = maps["district"].get((region_key, district_key))
        if dong_key:
            dong_name = maps["dong"].get((region_key, district_key, dong_key))

    keyword = build_keyword(name, region, district_label, dong_name, filter_type)
    svc_label = FILTER_LABEL.get(filter_type, "마사지")
    gugun = keyword[: -len(svc_label)] if keyword.endswith(svc_label) and len(keyword) > len(svc_label) else loc_short(district_label) or region or keyword
    area = loc_short(district_label) or gugun or region or ""

    map_dongs, map_stations = map_places(maps, region_key, district_key)
    dongs = pick_dongs(dongs_from_cards(content, shops_by_id), map_dongs, dong_name or "")
    stations = pick_stations(gugun or area, dongs, map_stations, dong_name or "")
    base = location_base(region_key, district_key, dong_key)
    district_base = location_base(region_key, district_key, None)
    hub = f"{base}.html" if base else ""
    if hub and not (ROOT / hub).exists():
        parent_hub = f"{district_base}.html" if district_base else ""
        if parent_hub and (ROOT / parent_hub).exists():
            hub = parent_hub
    services = service_list(base, filter_type)
    html = build_html(
        {
            "gugun": gugun or area,
            "dongs": dongs,
            "stations": stations,
            "keyword": keyword,
            "hub": hub,
            "services": services,
            "shops": shops_from_cards(content, shops_by_id),
        }
    )
    content, ok = replace_modal_body(content, html)
    if not ok:
        return False, "replace-fail"
    footer_label = footer_info_label(name, region, district_label, dong_name, filter_type, keyword)
    content, footer_ok = replace_footer_keywords(content, footer_row_html(name, footer_label))
    details_html = details_filter_html(
        region, district_label, dong_name, region_key, district_key, dong_key
    )
    content, details_ok = replace_details_filters(content, details_html)
    path.write_text(content, encoding="utf-8")
    return True, f"kw={keyword} footer={footer_label} ok={footer_ok} details={details_ok}"


def main():
    if sys.platform == "win32":
        import io

        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

    only = [a for a in sys.argv[1:] if a.endswith(".html")]
    print("loading...", flush=True)
    shops = load_shops()
    shops_by_id = {s.get("id"): s for s in shops if s.get("id") is not None}
    maps = load_district_map_via_node()
    files = [ROOT / f for f in only] if only else sorted(ROOT.glob("*.html"))
    ok = skip = fail = 0
    for f in files:
        if not f.exists():
            fail += 1
            print(f"ERR {f.name}: missing", flush=True)
            continue
        try:
            changed, msg = process_file(f, maps, shops_by_id)
            if changed:
                ok += 1
                if ok <= 15 or ok % 1000 == 0:
                    print(f"[{ok}] {f.name}: {msg}", flush=True)
            else:
                skip += 1
        except Exception as e:
            fail += 1
            print(f"ERR {f.name}: {e}", flush=True)
    print(f"DONE changed={ok} skip={skip} fail={fail}", flush=True)


if __name__ == "__main__":
    main()
