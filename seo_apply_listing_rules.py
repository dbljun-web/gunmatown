#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Apply listing-page SEO rules: Korean keyword titles, real shop lists, real hrefs."""
from __future__ import annotations

import html as html_lib
import json
import re
import sys
from pathlib import Path

from seo_static_source import (
    FILTER_KEYWORDS,
    FILTER_LABEL,
    REGION_MAP,
    extract_from_filename,
    load_district_map_via_node,
    load_shops,
    matches_filter,
)

ROOT = Path(__file__).parent.absolute()
SITE = "https://gunmatown.com"

SKIP_NAMES = {
    "notice.html",
    "event.html",
    "detail.html",
    "hamburger-menu-component.html",
}
SKIP_PREFIX = ("company-", "blog-")

CARD_OPEN_RE = re.compile(
    r'<(div|a)\s+class="massage-card"[^>]*>', re.IGNORECASE
)


def loc_short(name: str | None) -> str:
    if not name:
        return ""
    s = name.replace(" ", "")
    for suffix in ("특별자치시", "특별시", "광역시", "자치구", "구", "군"):
        if s.endswith(suffix) and len(s) > len(suffix):
            s = s[: -len(suffix)]
            break
    if s.endswith("시") and len(s) > 1 and s not in {"서시"}:
        # 수원시 → 수원, 제주시 → 제주. Keep 표시 names like 동탄 already without 시.
        if s not in REGION_MAP.values():
            s = s[:-1]
    return s


def build_keyword(filename: str, region: str | None, district_label: str | None, dong_name: str | None, filter_type: str | None) -> str:
    svc = FILTER_LABEL.get(filter_type, "마사지")
    if filename == "index.html":
        return "마사지사이트"
    loc = ""
    if dong_name:
        loc = dong_name.replace(" ", "")
    elif district_label:
        loc = loc_short(district_label)
    elif region:
        loc = region
    if not loc:
        return svc
    return f"{loc}{svc}"


def shop_in_location(shop: dict, region: str | None, district_label: str | None, dong_name: str | None) -> bool:
    shop_region = str(shop.get("region") or "").strip()
    shop_district = str(shop.get("district") or "").strip()
    shop_dong = str(shop.get("dong") or "").strip()
    address = f"{shop.get('address') or ''} {shop.get('detailAddress') or ''}"
    name = str(shop.get("name") or "")
    shop_type = shop.get("type") or ""
    services = shop.get("services") or []
    if isinstance(services, str):
        services = [services]
    is_outcall = "출장" in str(shop_type) or any("출장" in str(s) for s in services)

    if region:
        if is_outcall and "," in shop_region:
            if region not in [x.strip() for x in shop_region.split(",")]:
                return False
        elif shop_region != region:
            if region not in shop_region and region not in address:
                return False
        elif address and not is_outcall and region not in address.replace(" ", ""):
            # region field can be wrong (예: 서울로 표시된 송탄 업소)
            if district_label:
                pass
            else:
                return False

    if district_label:
        d_short = loc_short(district_label)
        hay = f"{shop_district} {shop_dong} {address}".replace(" ", "")
        if not d_short or d_short not in hay:
            return False

    if dong_name:
        token = dong_name.replace(" ", "")
        hay = f"{shop_dong} {address} {name}".replace(" ", "")
        if token not in hay:
            return False

    return True


def dedupe_shops(shops: list[dict]) -> list[dict]:
    seen = set()
    out = []
    for shop in shops:
        addr = re.sub(r"\s+", "", str(shop.get("address") or "")).lower()
        phone = re.sub(r"\s+", "", str(shop.get("phone") or ""))
        key = (addr, phone) if (addr or phone) else ("id", shop.get("id"))
        if key in seen:
            continue
        seen.add(key)
        out.append(shop)
    return out


def neighborhood_phrase(shops: list[dict], dong_name: str | None) -> str | None:
    if dong_name:
        return None
    seen: list[str] = []
    for shop in shops:
        d = str(shop.get("dong") or "").strip()
        if not d or d.endswith("역"):
            continue
        short = d[:-1] if d.endswith("동") and len(d) > 1 else d
        if short and short not in seen:
            seen.append(short)
        if len(seen) >= 3:
            break
    return "·".join(seen) if seen else None


def make_description(keyword: str, n: int, neighborhoods: str | None) -> str:
    first = f"{keyword} BEST 샵 실시간 순위."
    if n <= 0:
        return f"{first} 검증 업소 가격·후기 비교."
    if neighborhoods:
        return f"{first} {neighborhoods} 검증 업소 {n}곳 가격·후기 비교."
    return f"{first} 검증 업소 {n}곳 가격·후기 비교."


def filter_url(region_key, district_key, dong_key, filt: str) -> str:
    parts = [p for p in (region_key, district_key, dong_key) if p]
    if filt in (None, "", "all"):
        return "-".join(parts) + ".html" if parts else "index.html"
    if filt in ("massage", "outcall"):
        return "-".join(parts + [filt]) + ".html" if parts else f"{filt}.html"
    base = "-".join(parts) if parts else "index"
    return f"{base}.html?filter={filt}"


def extract_list_inner(content: str) -> tuple[int, int, str] | None:
    start_m = re.search(r'<div[^>]*id=["\']massageList["\'][^>]*>', content)
    if not start_m:
        return None
    start = start_m.end()
    section = content[start:]
    depth = 1
    i = 0
    while i < len(section):
        if section.startswith("<div", i):
            gt = section.find(">", i)
            i = gt + 1 if gt >= 0 else i + 4
            depth += 1
            continue
        if section.startswith("</div>", i):
            depth -= 1
            if depth == 0:
                return start, start + i, section[:i]
            i += 6
            continue
        i += 1
    return None


def split_cards(inner: str) -> list[str]:
    cards = []
    for m in CARD_OPEN_RE.finditer(inner):
        tag = m.group(1).lower()
        start = m.start()
        i = m.end()
        if tag == "a":
            close = inner.find("</a>", i)
            if close < 0:
                continue
            cards.append(inner[start : close + 4])
            continue
        depth = 1
        while i < len(inner):
            if inner.startswith("<div", i):
                gt = inner.find(">", i)
                i = gt + 1 if gt >= 0 else i + 4
                depth += 1
                continue
            if inner.startswith("</div>", i):
                depth -= 1
                if depth == 0:
                    cards.append(inner[start : i + 6])
                    break
                i += 6
                continue
            i += 1
    return cards


def parse_card_id(card: str) -> int | None:
    m = re.search(r"goToDetail\((\d+)\)", card)
    if m:
        return int(m.group(1))
    m = re.search(r'detail\.html\?id=(\d+)', card)
    if m:
        return int(m.group(1))
    return None


def parse_card_text(card: str) -> dict:
    name_m = re.search(r'<div class="shop-name">([^<]*)</div>', card)
    dist_m = re.search(r'<span class="shop-district">([^<]*)</span>', card)
    addr_m = re.search(r'<div class="shop-address-info"[^>]*>([^<]*)</div>', card)
    img_m = re.search(r'<img[^>]+src="([^"]+)"', card)
    addr = html_lib.unescape(addr_m.group(1).strip()) if addr_m else ""
    phone = ""
    if "|" in addr:
        left, right = addr.rsplit("|", 1)
        addr, phone = left.strip(), right.strip()
    return {
        "name": html_lib.unescape(name_m.group(1).strip()) if name_m else "",
        "district": html_lib.unescape(dist_m.group(1).strip()) if dist_m else "",
        "address": addr,
        "phone": phone,
        "image": html_lib.unescape(img_m.group(1)) if img_m else "",
    }


def card_matches_location(card: str, shop: dict | None, region, district_label, dong_name) -> bool:
    if shop:
        return shop_in_location(shop, region, district_label, dong_name)
    text = parse_card_text(card)
    fake = {
        "region": "",
        "district": text["district"],
        "dong": text["district"],
        "address": text["address"],
        "detailAddress": "",
        "name": text["name"],
        "type": "마사지",
        "services": [],
    }
    if region and region in (text["district"] + text["address"]):
        fake["region"] = region
    return shop_in_location(fake, region, district_label, dong_name)


def natural_alt(keyword: str, shop: dict) -> str:
    dong = str(shop.get("dong") or "").strip()
    name = str(shop.get("name") or "").strip()
    parts = [keyword]
    if dong and dong not in keyword:
        parts.append(dong)
    if name:
        parts.append(name)
    return html_lib.escape(" ".join(parts) + " 업체 사진")


def card_to_anchor(card: str, shop_id: int | None, keyword: str, shop: dict | None) -> str:
    href = f"detail.html?id={shop_id}" if shop_id is not None else "#"
    data_type = "마사지"
    data_region = ""
    tm = re.search(r'data-type="([^"]*)"', card)
    rm = re.search(r'data-region="([^"]*)"', card)
    if tm:
        data_type = tm.group(1)
    if rm:
        data_region = rm.group(1)
    if shop:
        data_type = str(shop.get("type") or data_type)
        data_region = str(shop.get("region") or data_region)
    inner_m = re.match(r"^<(?:div|a)[^>]*>(.*)</(?:div|a)>\s*$", card, re.DOTALL)
    inner = inner_m.group(1) if inner_m else card
    if shop:
        alt = natural_alt(keyword, shop)
        inner = re.sub(
            r'(<img\b[^>]*\balt=")[^"]*"',
            lambda m: m.group(1) + alt + '"',
            inner,
            count=1,
        )
    return (
        f'<a class="massage-card" data-type="{html_lib.escape(data_type)}" '
        f'data-region="{html_lib.escape(data_region)}" href="{href}" '
        f'style="cursor: pointer; text-decoration: none; color: inherit;">'
        f"{inner}</a>"
    )


def create_card(shop: dict, keyword: str) -> str:
    name = html_lib.escape(str(shop.get("name") or ""))
    alt = natural_alt(keyword, shop)
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
    addr_line = html_lib.escape(" | ".join([p for p in [address, phone] if p]))
    sid = shop.get("id")
    href = f"detail.html?id={sid}" if sid is not None else "#"
    type_label = shop.get("typeLabel") or ("힐링샵" if shop.get("showHealingShop") else "")
    type_html = (
        f'<div class="shop-type shop-type-healing">{html_lib.escape(str(type_label))}</div>'
        if type_label
        else ""
    )
    return f'''        <a class="massage-card" data-type="{shop_type}" data-region="{region}" href="{href}" style="cursor: pointer; text-decoration: none; color: inherit;">
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
        </a>'''


def set_meta(content: str, attr: str, value: str, prop: bool = False) -> str:
    key = "property" if prop else "name"
    esc = html_lib.escape(value, quote=True)

    def repl(m):
        return f"{m.group(1)}{esc}{m.group(3)}"

    pat = re.compile(
        rf'(<meta\b[^>]*?{key}="{re.escape(attr)}"[^>]*?content=")([^"]*)(")',
        re.IGNORECASE | re.DOTALL,
    )
    new_c, n = pat.subn(repl, content, count=1)
    return new_c if n else content


def replace_jsonld(content: str, payload: dict) -> str:
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    pat = re.compile(
        r'<script type="application/ld\+json">\s*\{.*?\}\s*</script>',
        re.DOTALL,
    )
    repl = f'<script type="application/ld+json">\n{body}\n    </script>'
    new_c, n = pat.subn(lambda _m: repl, content, count=1)
    if n:
        return new_c
    # insert before </head>
    return content.replace("</head>", f"    {repl}\n</head>", 1)


def shop_heading(shop: dict) -> str:
    dong = str(shop.get("dong") or "").strip()
    name = str(shop.get("name") or "").strip()
    return f"{dong} {name}".strip() if dong else name


def shop_blurb(shop: dict) -> str:
    raw = str(shop.get("greeting") or shop.get("description") or "").strip()
    raw = re.sub(r"\s+", " ", raw)
    if raw:
        return raw[:140]
    return f"{shop.get('name') or '이 업체'}에서 서비스를 제공합니다."


def build_related_modal(keyword: str, shops: list[dict]) -> str:
    kw = html_lib.escape(keyword)
    blocks = []
    for shop in shops:
        heading = html_lib.escape(shop_heading(shop))
        blurb = html_lib.escape(shop_blurb(shop))
        blocks.append(f"            <h4>{heading}</h4>\n            <p>\n              {blurb}\n            </p>\n")
    shops_html = "\n".join(blocks) if blocks else "            <p>등록된 업소 정보를 준비 중입니다.</p>\n"
    return f'''          <h2 id="relatedInfoModalTitle">{kw} 관련정보</h2>
          <button class="modal-close" onclick="closeModal('relatedInfoModal')" aria-label="닫기">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="info-section">
            <h3>📍 업체별 서비스 안내</h3>
{shops_html}
          </div>

          <div class="info-section">
            <h3>⭐ 이용 후기</h3>
            <p>
              {kw}를 이용한 고객들은 접근성과 관리 품질을 자주 언급합니다.
            </p>
            <p>
              시설 청결과 예약 응대에 대한 평가가 많고, 원하는 코스를 비교한 뒤 방문하는 경우가 많습니다.
            </p>
          </div>

          <div class="info-section">
            <h3>🗺️ 주변 지역</h3>
            <p>
              지하철과 버스 접근이 좋아 일정 사이에 방문하기 쉽습니다.
            </p>
          </div>
        </div>'''


def replace_related_modal(content: str, inner: str) -> str:
    m = re.search(
        r'<h2 id="relatedInfoModalTitle">.*?</div>\s*</div>\s*(?=\s*</div>\s*</div>)',
        content,
        re.DOTALL,
    )
    if not m:
        # fallback: from title h2 through first modal-body close
        m = re.search(
            r'<h2 id="relatedInfoModalTitle">.*?</div>\s*</div>',
            content,
            re.DOTALL,
        )
    if not m:
        return content
    # The relatedInfoModal structure is header + body. Replace from h2 through modal-body's closing div.
    start = content.find('<h2 id="relatedInfoModalTitle">')
    if start < 0:
        return content
    body_start = content.find('<div class="modal-body">', start)
    if body_start < 0:
        return content
    # find matching close of modal-body
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
                end = i + 6
                return content[:start] + inner + content[end:]
            i += 6
            continue
        i += 1
    return content


def og_image_url(shop: dict | None) -> str | None:
    if not shop:
        return None
    image = str(shop.get("image") or "").replace("\\", "/").lstrip("/")
    if not image or "placeholder" in image:
        return None
    if image.startswith("http"):
        return image
    return f"{SITE}/{image}"


def process_file(path: Path, shops_by_id: dict, all_shops: list, maps: dict) -> tuple[bool, str]:
    name = path.name
    if name in SKIP_NAMES or name.startswith(SKIP_PREFIX):
        return False, "skip"
    content = path.read_text(encoding="utf-8")
    if 'id="massageList"' not in content:
        return False, "not-listing"

    region, district_key, dong_key, filter_type, region_key = extract_from_filename(name)
    district_label = None
    dong_name = None
    if region_key and district_key:
        district_label = maps["district"].get((region_key, district_key))
        if dong_key:
            dong_name = maps["dong"].get((region_key, district_key, dong_key))

    keyword = build_keyword(name, region, district_label, dong_name, filter_type)
    title = f"{keyword} 추천 BEST 샵 | 건마타운"
    h1 = f"{keyword} 추천 BEST 샵"

    list_span = extract_list_inner(content)
    kept_shops: list[dict] = []
    kept_cards: list[str] = []
    if list_span:
        start, end, inner = list_span
        seen_keys = set()
        for card in split_cards(inner):
            sid = parse_card_id(card)
            shop = shops_by_id.get(sid) if sid is not None else None
            if not card_matches_location(card, shop, region, district_label, dong_name):
                continue
            if shop and filter_type and not matches_filter(shop, filter_type):
                continue
            text = parse_card_text(card)
            if not shop:
                shop = {
                    "id": sid,
                    "name": text["name"],
                    "district": text["district"],
                    "dong": "",
                    "address": text["address"],
                    "phone": text["phone"],
                    "image": text["image"],
                    "type": "마사지",
                }
            addr = re.sub(r"\s+", "", str(shop.get("address") or "")).lower()
            phone = re.sub(r"\s+", "", str(shop.get("phone") or ""))
            dkey = (addr, phone) if (addr or phone) else ("id", shop.get("id"))
            if dkey in seen_keys:
                continue
            seen_keys.add(dkey)
            kept_shops.append(shop)
            kept_cards.append(card_to_anchor(card, sid, keyword, shop))

        if not kept_shops:
            candidates = []
            for shop in all_shops:
                if region or district_label or dong_name:
                    if not shop_in_location(shop, region, district_label, dong_name):
                        continue
                if filter_type and not matches_filter(shop, filter_type):
                    continue
                candidates.append(shop)
            candidates = dedupe_shops(candidates)
            candidates = sorted(
                candidates,
                key=lambda s: (0 if s.get("showHealingShop") else 1, s.get("name") or ""),
            )[:60]
            kept_shops = candidates
            kept_cards = [create_card(s, keyword) for s in kept_shops]

        cards_html = "\n".join(kept_cards)
        content = content[:start] + "\n" + cards_html + "\n      " + content[end:]

    n = len(kept_shops)
    desc = make_description(keyword, n, neighborhood_phrase(kept_shops, dong_name))
    def title_repl(_m):
        return f"<title>{html_lib.escape(title)}</title>"

    content = re.sub(r"<title>.*?</title>", title_repl, content, count=1, flags=re.DOTALL)

    def h1_repl(_m):
        return f'<h1 id="resultsTitle">{html_lib.escape(h1)}</h1>'

    content = re.sub(
        r'<h1 id="resultsTitle">.*?</h1>',
        h1_repl,
        content,
        count=1,
        flags=re.DOTALL,
    )
    content = set_meta(content, "description", desc)
    content = set_meta(content, "og:title", title, prop=True)
    content = set_meta(content, "og:description", desc, prop=True)
    content = set_meta(content, "twitter:title", title)
    content = set_meta(content, "twitter:description", desc)
    img = og_image_url(kept_shops[0] if kept_shops else None)
    if img:
        content = set_meta(content, "og:image", img, prop=True)
        content = set_meta(content, "twitter:image", img)
    else:
        fallback = f"{SITE}/images/강남_논현동_학동역_5월스파.jpg"
        content = re.sub(
            r'(content=")https://via\.placeholder\.com[^"]*(")',
            lambda m: m.group(1) + fallback + m.group(2),
            content,
            count=2,
        )

    content = re.sub(
        r'\s*<h2 class="visually-hidden"[^>]*>.*?</h2>',
        "",
        content,
        count=1,
        flags=re.DOTALL,
    )

    items = []
    for i, shop in enumerate(kept_shops, 1):
        sid = shop.get("id")
        url = f"{SITE}/detail.html?id={sid}" if sid is not None else f"{SITE}/{name}"
        items.append(
            {
                "@type": "ListItem",
                "position": i,
                "url": url,
                "name": str(shop.get("name") or ""),
            }
        )
    content = replace_jsonld(
        content,
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": h1,
            "description": desc,
            "numberOfItems": n,
            "itemListElement": items,
        },
    )

    url_all = filter_url(region_key, district_key, dong_key, "all")
    url_massage = filter_url(region_key, district_key, dong_key, "massage")
    url_outcall = filter_url(region_key, district_key, dong_key, "outcall")

    def filt_repl(m):
        filt = m.group(1)
        rest = re.sub(r'\s*href="[^"]*"', "", m.group(2))
        href = {"all": url_all, "massage": url_massage, "outcall": url_outcall}.get(filt, "")
        return f'<a class="filter-btn" data-filter="{filt}" href="{href}"{rest}>'

    content = re.sub(
        r'<a class="filter-btn" data-filter="(all|massage|outcall)"([^>]*)>',
        filt_repl,
        content,
    )

    def theme_repl(m):
        dtype = m.group(1)
        text = m.group(2)
        href = filter_url(region_key, district_key, dong_key, dtype)
        return (
            f'<a class="type-dropdown-item" data-type="{dtype}" href="{href}" '
            f'style="display:block;text-decoration:none;">{text}</a>'
        )

    content = re.sub(
        r'<(?:div|a) class="type-dropdown-item" data-type="([^"]+)"[^>]*>([^<]+)</(?:div|a)>',
        theme_repl,
        content,
    )

    footer_label = f"{keyword}정보"

    def footer_repl(m):
        return (
            f'<a href="{name}" class="footer-link" onclick="openDetailsModal(event)"'
            f"\n              >{footer_label}{m.group(1)}"
        )

    content = re.sub(
        r'<a href="[^"]*" class="footer-link" onclick="openDetailsModal\(event\)"\s*>\s*[^<]*\s*(</a\s*>)',
        footer_repl,
        content,
        count=1,
    )

    content = replace_related_modal(content, build_related_modal(keyword, kept_shops))
    if content.endswith("/html>"):
        content = content[: -len("/html>")]
    content = re.sub(r"</html>\s*/html>\s*$", "</html>\n", content)

    path.write_text(content, encoding="utf-8")
    return True, f"n={n} kw={keyword}"


def main():
    if sys.platform == "win32":
        import io

        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

    only = [a for a in sys.argv[1:] if a.endswith(".html")]
    print("loading shops...", flush=True)
    shops = load_shops()
    shops_by_id = {s.get("id"): s for s in shops if s.get("id") is not None}
    print(f"shops={len(shops)}", flush=True)
    print("loading district map...", flush=True)
    maps = load_district_map_via_node()
    print(f"districts={len(maps['district'])} dongs={len(maps['dong'])}", flush=True)

    if only:
        files = [ROOT / f for f in only]
    else:
        files = sorted(ROOT.glob("*.html"))

    ok = skip = fail = 0
    for f in files:
        try:
            changed, msg = process_file(f, shops_by_id, shops, maps)
            if changed:
                ok += 1
                if ok <= 20 or ok % 500 == 0:
                    print(f"[{ok}] {f.name}: {msg}", flush=True)
            else:
                skip += 1
        except Exception as e:
            fail += 1
            print(f"ERR {f.name}: {e}", flush=True)
    print(f"DONE changed={ok} skip={skip} fail={fail}", flush=True)


if __name__ == "__main__":
    main()
