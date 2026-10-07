#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""업체별 정적 상세 HTML 생성. 원본보기·봇 수집용 본문을 넣습니다."""
from __future__ import annotations

import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CARD = ROOT / "js" / "shop-card-data.js"
REVIEWS = ROOT / "js" / "shop-reviews.js"
DETAIL = ROOT / "detail.html"
OUT_DIR = ROOT / "shop"
BASE_URL = "https://gunmatown.com"

REGION_KW = {
    "서울": "서울마사지",
    "부산": "부산마사지",
    "대구": "대구마사지",
    "인천": "인천마사지",
    "광주": "광주마사지",
    "대전": "대전마사지",
    "울산": "울산마사지",
    "세종": "세종마사지",
    "경기": "경기마사지",
    "강원": "강원마사지",
    "충북": "충북마사지",
    "충남": "충남마사지",
    "전북": "전북마사지",
    "경북": "경북마사지",
    "전남": "전남마사지",
    "경남": "경남마사지",
    "제주": "제주도마사지",
}


def load_js_assign(path: Path, prefix: str):
    text = path.read_text(encoding="utf-8")
    text = text.replace(prefix, "", 1).strip()
    if text.endswith(";"):
        text = text[:-1]
    return json.loads(text)


def esc(s) -> str:
    return escape(str(s or ""), quote=True)


def is_outcall(shop: dict) -> bool:
    t = str(shop.get("type") or "")
    return t == "출장마사지" or t == "outcall" or "출장" in t


def display_name(shop: dict) -> str:
    name = str(shop.get("name") or "").strip()
    if is_outcall(shop):
        return name
    dong = str(shop.get("dong") or "").strip()
    if dong and name and dong not in name:
        return f"{dong} {name}"
    return name


def area_label(shop: dict) -> str:
    district = str(shop.get("district") or "").strip()
    dong = str(shop.get("dong") or "").strip()
    if district and dong and dong not in district:
        return f"{district} {dong}"
    return district or dong


def intro_text(shop: dict) -> str:
    text = str(shop.get("description") or "").strip()
    if not text:
        text = str(shop.get("detailContent") or "").split("【")[0].strip()
    return text.split("【")[0].strip()


def direction_lines(shop: dict) -> list[str]:
    raw = str(shop.get("directions") or "").strip()
    if not raw:
        detail = str(shop.get("detailContent") or "")
        m = re.search(r"【\s*오시는\s*길\s*】\s*([\s\S]*?)(?=【\s*영업시간\s*】|$)", detail)
        raw = (m.group(1) if m else "").strip()
    lines = [ln.strip() for ln in raw.splitlines() if ln.strip()]
    skip = re.compile(r"부재시|예약제|입실\s*후\s*선불|예약자동취소|100%\s*예약제")
    kept = [ln for ln in lines if not skip.search(ln) and not ln.startswith("★")]
    if not kept:
        addr = str(shop.get("address") or "").strip()
        if addr:
            kept = [addr]
    return kept[:8]


def course_html(shop: dict) -> str:
    blocks = shop.get("courses") or []
    rows = []
    for block in blocks:
        title = str(block.get("category") or block.get("name") or "").strip()
        items = block.get("items") or block.get("courses") or []
        if title and items and not re.match(r"^[(\[【]", title):
            rows.append(f'<div class="course-section-label">{esc(title)}</div>')
        for item in items:
            name = item.get("name") or "-"
            dur = item.get("duration") or "-"
            price = item.get("price") or "-"
            rows.append(
                '<div class="course-item-block"><div class="course-table-row">'
                f'<span class="course-col-name">{esc(name)}</span>'
                f'<span class="course-col-time">{esc(dur)}</span>'
                f'<span class="course-col-price">{esc(price)}</span>'
                "</div></div>"
            )
    if not rows:
        price = shop.get("price") or ""
        if price:
            rows.append(
                '<div class="course-item-block"><div class="course-table-row">'
                f'<span class="course-col-name">{esc(shop.get("name") or "기본")}</span>'
                '<span class="course-col-time">-</span>'
                f'<span class="course-col-price">{esc(price)}</span>'
                "</div></div>"
            )
        else:
            return '<p class="courses-empty">등록된 코스 정보가 없습니다.</p>'
    return '<div class="course-table">' + "".join(rows) + "</div>"


def reviews_html(reviews: list) -> str:
    if not reviews:
        return "<p>등록된 후기가 없습니다.</p>"
    parts = []
    for rev in reviews:
        rating = int(rev.get("rating") or 5)
        stars = "★" * rating + "☆" * (5 - rating)
        parts.append(
            '<div class="review-item">'
            '<div class="review-header">'
            f'<span class="reviewer-name">{esc(rev.get("name"))}</span>'
            f'<span class="review-date">{esc(rev.get("date"))}</span>'
            "</div>"
            f'<div class="review-rating">{stars}</div>'
            f'<div class="review-text">{esc(rev.get("comment"))}</div>'
            "</div>"
        )
    return "".join(parts)


def directions_html(lines: list[str]) -> str:
    items = []
    for line in lines:
        items.append(
            f'<li class="directions-item"><span class="directions-item-text">{esc(line)}</span></li>'
        )
    return "".join(items)


def json_ld(shop: dict, reviews: list, title: str, desc: str, url: str, images: list[str]) -> str:
    imgs = [f"{BASE_URL}/{p.lstrip('/')}" for p in images if p]
    data = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": shop.get("name"),
        "description": desc,
        "url": url,
        "image": imgs[0] if len(imgs) == 1 else imgs,
        "telephone": shop.get("phone") or None,
        "priceRange": shop.get("price") or None,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": shop.get("address") or "",
            "addressLocality": shop.get("dong") or shop.get("district") or "",
            "addressRegion": shop.get("region") or "",
            "addressCountry": "KR",
        },
    }
    if shop.get("operatingHours"):
        data["openingHours"] = shop["operatingHours"]
    if shop.get("rating"):
        data["aggregateRating"] = {
            "@type": "AggregateRating",
            "ratingValue": str(shop.get("rating")),
            "reviewCount": str(shop.get("reviewCount") or len(reviews) or 1),
        }
    if reviews:
        data["review"] = [
            {
                "@type": "Review",
                "author": {"@type": "Person", "name": r.get("name") or "손님"},
                "datePublished": str(r.get("date") or "").replace(".", "-"),
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": str(r.get("rating") or 5),
                    "bestRating": "5",
                },
                "reviewBody": r.get("comment") or "",
            }
            for r in reviews
        ]
    return json.dumps(data, ensure_ascii=False, indent=2)


def replace_once(html: str, old: str, new: str) -> str:
    if old not in html:
        raise SystemExit(f"템플릿 조각을 찾지 못함: {old[:80]}")
    return html.replace(old, new, 1)


def build_page(template: str, shop: dict, reviews: list) -> str:
    sid = shop["id"]
    name = display_name(shop)
    region_kw = REGION_KW.get(str(shop.get("region") or ""), f"{shop.get('region') or ''}마사지")
    district = str(shop.get("district") or "")
    dong = str(shop.get("dong") or "")
    services = [s for s in (shop.get("services") or []) if s]
    svc_txt = ", ".join(services[:6])
    title = f"{name} | {district} {dong} {region_kw} | 건마타운".replace("  ", " ").strip()
    desc = (
        f"{name} {region_kw}. {svc_txt}. {shop.get('price') or ''}부터. "
        f"{shop.get('operatingHours') or ''}. {shop.get('address') or ''}. "
        f"전화 {shop.get('phone') or ''}. 건마타운"
    )
    desc = re.sub(r"\s+", " ", desc).strip()
    keywords = ", ".join(
        p
        for p in [
            region_kw,
            f"{district}마사지" if district else "",
            f"{dong}마사지" if dong else "",
            shop.get("name"),
            *services[:5],
            "마사지",
            "건마타운",
        ]
        if p
    )
    url = f"{BASE_URL}/shop/{sid}.html"
    images = []
    for src in list(shop.get("images") or []) + [shop.get("image")]:
        s = str(src or "").strip()
        if s and s not in images:
            images.append(s)
    img = images[0] if images else "images/강남_강남역_강남클라스.jpg"
    alt = shop.get("alt") or f"{area_label(shop)} {shop.get('name')} 마사지 업체 사진"
    abs_img = f"{BASE_URL}/{img.lstrip('/')}"
    type_text = shop.get("typeLabel") or ("힐링샵" if shop.get("showHealingShop") else "")
    intro = intro_text(shop)
    dirs = direction_lines(shop)
    landmark = dirs[0] if dirs else ""
    address_html = (
        '<img class="info-icon" src="images/icons/map.svg" alt="지도" width="20" height="20" />'
        '<div class="info-item-text">'
        f'<div class="address-container"><span>{esc(shop.get("address") or "주소 정보 없음")}</span></div>'
    )
    if landmark and landmark != shop.get("address"):
        address_html += f'<div class="address-container"><span>{esc(landmark)}</span></div>'
    address_html += "</div>"

    html = template
    html = replace_once(
        html,
        '    <meta name="viewport"',
        '    <base href="../" />\n    <link rel="canonical" href="'
        + esc(url)
        + '" />\n    <meta name="viewport"',
    )
    html = replace_once(
        html,
        "<title id=\"pageTitle\">업체 상세 - 마사지사이트</title>",
        f'<title id="pageTitle">{esc(title)}</title>',
    )
    html = replace_once(
        html,
        'content="마사지 업체 상세 정보, 가격, 코스, 리뷰를 확인하세요."',
        f'content="{esc(desc)}"',
    )
    html = replace_once(
        html,
        'content="마사지, 출장마사지, 업체상세"',
        f'content="{esc(keywords)}"',
    )
    html = replace_once(
        html,
        'content="업체 상세 - 마사지사이트"',
        f'content="{esc(title)}"',
    )
    html = replace_once(
        html,
        'content="마사지 업체 상세 정보"',
        f'content="{esc(desc)}"',
    )
    html = html.replace('content=""', f'content="{esc(abs_img)}"', 2)
    html = replace_once(
        html,
        '<script type="application/ld+json" id="shopJsonLd"></script>',
        '<script type="application/ld+json" id="shopJsonLd">\n'
        + json_ld(shop, reviews, title, desc, url, images)
        + "\n    </script>",
    )
    html = replace_once(
        html,
        '<img id="shopImage" class="shop-image" alt="업체 이미지" />',
        f'<img id="shopImage" class="shop-image" src="{esc(img)}" alt="{esc(alt)}" />',
    )
    if type_text:
        html = replace_once(
            html,
            '<div id="shopType" class="shop-type shop-type-healing"></div>',
            f'<div id="shopType" class="shop-type shop-type-healing">{esc(type_text)}</div>',
        )
    if is_outcall(shop):
        html = html.replace(
            '<div id="shopTypeOutcall" class="shop-type shop-type-outcall" hidden>출장샵</div>',
            '<div id="shopTypeOutcall" class="shop-type shop-type-outcall">출장샵</div>',
            1,
        )
    html = replace_once(
        html,
        '<h1 id="shopName" class="shop-name"></h1>',
        f'<h1 id="shopName" class="shop-name">{esc(name)}</h1>',
    )
    html = replace_once(
        html,
        '<span id="shopDistrict" class="shop-district"></span>',
        f'<span id="shopDistrict" class="shop-district">{esc(area_label(shop))}</span>',
    )
    html = replace_once(
        html,
        '<div class="info-item info-item--icon" id="shopAddress"></div>',
        f'<div class="info-item info-item--icon" id="shopAddress">{address_html}</div>',
    )
    html = replace_once(
        html,
        '<span id="shopPhone"></span>',
        f'<span id="shopPhone">{esc(shop.get("phone") or "")}</span>',
    )
    html = replace_once(
        html,
        '<span id="shopHours"></span>',
        f'<span id="shopHours">{esc(shop.get("operatingHours") or "")}</span>',
    )
    html = replace_once(
        html,
        '<div id="coursesList" class="courses-table-wrap"></div>',
        f'<div id="coursesList" class="courses-table-wrap">{course_html(shop)}</div>',
    )
    if dirs:
        html = html.replace(
            'id="sectionLocation" class="directions-section detail-section" style="display: none"',
            'id="sectionLocation" class="directions-section detail-section"',
            1,
        )
        html = replace_once(
            html,
            '<ul id="shopDirections" class="directions-list"></ul>',
            f'<ul id="shopDirections" class="directions-list">{directions_html(dirs)}</ul>',
        )
    html = replace_once(
        html,
        '<p id="shopDescription" class="detail-description"></p>',
        f'<p id="shopDescription" class="detail-description">{esc(intro)}</p>',
    )
    html = replace_once(
        html,
        '<div id="reviewsList" class="reviews-list"></div>',
        f'<div id="reviewsList" class="reviews-list">{reviews_html(reviews)}</div>',
    )
    noscript = (
        "<noscript><article>"
        f"<h1>{esc(name)}</h1>"
        f"<p>{esc(desc)}</p>"
        f"<p>주소 {esc(shop.get('address'))}</p>"
        f"<p>전화 {esc(shop.get('phone'))}</p>"
        f"<p>영업 {esc(shop.get('operatingHours'))}</p>"
        f"<p>{esc(intro)}</p>"
        "</article></noscript>\n            "
    )
    html = replace_once(html, '<div class="detail-body">', noscript + '<div class="detail-body">')
    return html


def main() -> None:
    shops = load_js_assign(CARD, "window.shopCardData =")
    review_map = load_js_assign(REVIEWS, "window.shopReviews =")
    template = DETAIL.read_text(encoding="utf-8")
    template = re.sub(
        r'\s*<script id="legacyDetailRedirect">[\s\S]*?</script>',
        "",
        template,
        count=1,
    )
    OUT_DIR.mkdir(exist_ok=True)
    for old in OUT_DIR.glob("*.html"):
        old.unlink()
    for shop in shops:
        sid = str(shop["id"])
        reviews = review_map.get(sid) or review_map.get(shop["id"]) or []
        (OUT_DIR / f"{sid}.html").write_text(build_page(template, shop, reviews), encoding="utf-8")
    print(f"[완료] {len(shops)}개 → {OUT_DIR}")


if __name__ == "__main__":
    main()
