# -*- coding: utf-8 -*-
"""Build shop-card-data.js from premium(힐링샵) + usu(우수) with accurate detail fields."""
from __future__ import annotations

import json
import random
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "shop-card-data.js"

REGION_MAP = [
    ("서울특별시", "서울"),
    ("부산광역시", "부산"),
    ("대구광역시", "대구"),
    ("인천광역시", "인천"),
    ("광주광역시", "광주"),
    ("대전광역시", "대전"),
    ("울산광역시", "울산"),
    ("세종특별자치시", "세종"),
    ("제주특별자치도", "제주"),
    ("전북특별자치도", "전북"),
    ("강원특별자치도", "강원"),
    ("강원도", "강원"),
    ("경기도", "경기"),
    ("충청북도", "충북"),
    ("충청남도", "충남"),
    ("전라북도", "전북"),
    ("전라남도", "전남"),
    ("경상북도", "경북"),
    ("경상남도", "경남"),
    ("서울", "서울"),
    ("부산", "부산"),
    ("대구", "대구"),
    ("인천", "인천"),
    ("광주", "광주"),
    ("대전", "대전"),
    ("울산", "울산"),
    ("세종", "세종"),
    ("제주", "제주"),
    ("경기", "경기"),
    ("강원", "강원"),
    ("충북", "충북"),
    ("충남", "충남"),
    ("전북", "전북"),
    ("전남", "전남"),
    ("경북", "경북"),
    ("경남", "경남"),
]

SHOP_REGION_NAMES = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
]

CITY_TO_REGION = {
    "강릉": "강원",
    "동해": "강원",
    "양양": "강원",
    "평창": "강원",
    "속초": "강원",
    "춘천": "강원",
    "원주": "강원",
    "청주": "충북",
    "충주": "충북",
    "제천": "충북",
    "진천": "충북",
    "음성": "충북",
    "증평": "충북",
    "오창": "충북",
    "오송": "충북",
    "천안": "충남",
    "아산": "충남",
    "전주": "전북",
    "군산": "전북",
    "익산": "전북",
    "나주": "전남",
    "순천": "전남",
    "여수": "전남",
    "목포": "전남",
    "담양": "전남",
    "포항": "경북",
    "경주": "경북",
    "구미": "경북",
    "경산": "경북",
    "창원": "경남",
    "김해": "경남",
    "진주": "경남",
    "양산": "경남",
    "수원": "경기",
    "용인": "경기",
    "성남": "경기",
    "고양": "경기",
    "부천": "경기",
    "안양": "경기",
    "화성": "경기",
    "광교": "경기",
    "제주도": "제주",
    "제주시": "제주",
    "서귀포": "제주",
    "조치원": "세종",
}

NOISE_LINE_RE = re.compile(
    r"(건마시티|gunmacity|안내사항|금일\s*출근부|업체위치|수위,\s*컨셉|"
    r"과음,발신자|예약불가|유튜브|페이스북|인스타그램|트위터|"
    r"정보 제공 대행자|클릭\s*시\s*바로가기)",
    re.I,
)
PHONE_RE = re.compile(r"0\d{1,4}[-.\s]?\d{3,4}[-.\s]?\d{4}")
SPACED_TITLE_RE = re.compile(r"^(?:[가-힣A-Za-z0-9]\s+){2,}[가-힣A-Za-z0-9]\s*$")


def clean_line(s: str) -> str:
    t = (s or "").replace("\ufeff", "").strip()
    t = re.sub(r"\s+", " ", t)
    return t


def compact_key(s: str) -> str:
    return re.sub(r"\s+", "", s or "")


def is_section_header(t: str) -> str | None:
    key = compact_key(t)
    if key in ("프로그램", "프로그렘"):
        return "program"
    if key in ("관리사님", "관리사"):
        return "staff"
    if key in ("영업시간",):
        return "hours"
    if key in ("오시는길", "방문지역", "홈케어", "출장지역"):
        return "way"
    return None


def is_noise_line(t: str) -> bool:
    if not t:
        return True
    if NOISE_LINE_RE.search(t):
        return True
    if t.endswith("-->"):
        return True
    if t.count(",") >= 6 and "마사지" in t:
        return True
    if PHONE_RE.fullmatch(compact_key(t).replace("-", "")):
        return True
    if SPACED_TITLE_RE.match(t) and len(compact_key(t)) <= 20:
        return True
    return False


def extract_sections(content: str) -> dict[str, list[str]]:
    raw_lines = [(x or "").rstrip() for x in (content or "").splitlines()]
    sections: dict[str, list[str]] = {
        "intro": [],
        "program": [],
        "staff": [],
        "hours": [],
        "way": [],
    }
    mode = "intro"
    started_intro = False

    for raw in raw_lines:
        t = clean_line(raw)
        if not t:
            if mode == "intro" and started_intro and sections["intro"]:
                sections["intro"].append("")
            continue

        header = is_section_header(t)
        if header:
            mode = header
            continue

        if mode != "intro" and is_noise_line(t):
            continue
        if mode == "intro":
            if is_noise_line(t) and not started_intro:
                continue
            if is_noise_line(t) and started_intro:
                # stop intro at footer noise
                if "건마시티" in t or "안내사항" in t or t.endswith("-->"):
                    mode = "other"
                    continue
            started_intro = True
            sections["intro"].append(t)
            continue

        if mode in sections:
            sections[mode].append(t)

    return sections


def format_man_price(num_text: str) -> str:
    t = num_text.replace(" ", "").replace(",", "")
    if "~" in t or "-" in t:
        parts = re.split(r"[~-]", t)
        rendered = []
        for p in parts:
            p = p.strip()
            if not p:
                continue
            rendered.append(format_man_price(p))
        return "~".join(rendered)

    m = re.match(r"^(\d+(?:\.\d+)?)만?원?$", t)
    if not m:
        return f"{num_text}원" if "원" not in num_text else num_text
    val = float(m.group(1))
    won = int(val * 10000) if val < 1000 else int(val)
    return f"{won:,}원"


def parse_course_line(line: str) -> dict | None:
    t = clean_line(line)
    t = t.lstrip("❤♥★☆●◆▷▶-· ").strip()
    if not t or "할인은" in t or "현금가" in t or "천연" in t:
        return None

    # A코스 / A 코스 / A 060분 / 고급 / 다리전체 등
    patterns = [
        # A코스 60분 ➜ 12만
        re.compile(
            r"^([A-Za-z]?)\s*코스?\s*([0-9]{2,3})\s*분\s*[➜→>:~-]+\s*([0-9]+(?:\.[0-9]+)?\s*만?원?|[0-9,]+원?)$"
        ),
        # A 60분 ➜ 8만
        re.compile(
            r"^([A-Za-z])\s*([0-9]{2,3})\s*분\s*[➜→>:~-]+\s*([0-9]+(?:\.[0-9]+)?\s*만?원?|[0-9,]+원?)$"
        ),
        # 고급 브라질리언 / 다리전체 ➜ 12만  (이름 + 가격, 시간 없음)
        re.compile(
            r"^(.+?)\s*[➜→>:~-]+\s*([0-9]+(?:\.[0-9]+)?\s*만?원?|[0-9,]+원?|[0-9]+(?:\.[0-9]+)?~\s*[0-9]+(?:\.[0-9]+)?\s*만?)$"
        ),
        # A코스 ➜ 09만 (시간 없음)
        re.compile(
            r"^([A-Za-z])\s*코스?\s*[➜→>:~-]+\s*([0-9]+(?:\.[0-9]+)?\s*만?원?|[0-9,]+원?)$"
        ),
    ]

    for i, pat in enumerate(patterns):
        m = pat.match(t)
        if not m:
            continue
        if i == 0:
            letter, mins, price = m.groups()
            name = f"{letter}코스" if letter else "코스"
            return {
                "name": name,
                "duration": f"{int(mins)}분",
                "price": format_man_price(price),
                "description": t,
            }
        if i == 1:
            letter, mins, price = m.groups()
            return {
                "name": f"{letter}코스",
                "duration": f"{int(mins)}분",
                "price": format_man_price(price),
                "description": t,
            }
        if i == 2:
            name, price = m.groups()
            name = clean_line(name)
            name = re.sub(r"\s*[➜→].*$", "", name).strip()
            if len(name) > 40:
                return None
            if any(x in name for x in ("할인", "현금", "회원", "건마시티")):
                return None
            duration = ""
            dm = re.search(r"([0-9]{2,3})\s*분", name)
            if dm:
                duration = f"{int(dm.group(1))}분"
                name = re.sub(r"\s*[0-9]{2,3}\s*분", "", name).strip() or name
            return {
                "name": name or "코스",
                "duration": duration,
                "price": format_man_price(price),
                "description": t,
            }
        if i == 3:
            letter, price = m.groups()
            return {
                "name": f"{letter}코스",
                "duration": "",
                "price": format_man_price(price),
                "description": t,
            }
    return None


def parse_courses(program_lines: list[str]) -> list[dict]:
    courses: list[dict] = []
    current = {"category": "코스", "items": []}

    def flush():
        nonlocal current
        if current["items"]:
            courses.append(current)
        current = {"category": "코스", "items": []}

    for line in program_lines:
        t = clean_line(line)
        if not t:
            continue
        item = parse_course_line(t)
        if item:
            current["items"].append(item)
            continue

        # category / note lines
        if t.startswith("└") or t.startswith("┌") or "할인은" in t:
            if current["items"]:
                # attach as decorative note category after items
                flush()
                courses.append({"category": t, "items": []})
            continue

        # treat non-item as category title
        if current["items"]:
            flush()
            current = {"category": t, "items": []}
        else:
            current["category"] = t

    flush()
    # drop empty decorative-only at end without items already handled
    return [c for c in courses if c.get("items")]


def parse_staff(staff_lines: list[str]) -> str:
    names: list[str] = []
    seen = set()
    skip = {
        "전원",
        "한국인",
        "힐링샵",
        "상기종목",
        "테라피",
        "과정수료",
        "코스수료",
        "여쌤들",
        "여",
        "쌤들",
        "쌤",
        "관리사",
        "관리사님",
        "힐러님",
        "수료",
        "실력파",
        "태국",
    }
    for line in staff_lines:
        for m in re.finditer(
            r"[♥❤]\s*([가-힣A-Za-z]{2,8})(?:\s*(?:관리사님|힐러님|쌤))?",
            line,
        ):
            name = m.group(1)
            if name in skip or name in seen:
                continue
            seen.add(name)
            names.append(name)
        # spaced names without heart
        for token in re.findall(r"[가-힣A-Za-z]{2,8}", line):
            if token in skip or token in seen:
                continue
            if any(x in token for x in ("관리", "힐링", "테라", "수료", "전원")):
                continue
            # only if line looks like name list
            if "관리사" in line or "힐러" in line or "쌤" in line or "❤" in line or "♥" in line:
                seen.add(token)
                names.append(token)

    if names:
        return " ".join(names)
    joined = " ".join(staff_lines).strip()
    return joined[:120] if joined else "전문 관리사들이 정성스럽게 서비스합니다."


def parse_region(address: str) -> str:
    text = address or ""
    for src, dst in REGION_MAP:
        if src in text:
            return dst
    return "서울"


def parse_district_dong(address: str) -> tuple[str, str]:
    text = address or ""
    district = ""
    dong = ""
    m = re.search(r"([가-힣]+[구시군])", text)
    if m:
        district = m.group(1)
    m2 = re.search(r"([가-힣]+(?:동|읍|면|리|가))", text)
    if m2:
        dong = m2.group(1)
    return district, dong


def detect_outcall(title: str, address: str, content: str) -> bool:
    blob = f"{title} {address} {content[:300]}"
    if "출장" in blob or "홈타이" in blob or "홈케어" in blob:
        # shop pages that are clearly storefront with 출장 mention in SEO spam
        if re.search(r"출장마사지|홈타이|홈케어", title) and (
            "전지역" in address or "전 지역" in address or "," in address
        ):
            return True
        if "출장" in title or "홈타이" in title:
            return True
    return False


def detect_services(content: str, is_outcall: bool) -> list[str]:
    services = []
    mapping = [
        ("출장마사지", ["출장"]),
        ("스웨디시", ["스웨디시"]),
        ("아로마", ["아로마"]),
        ("타이마사지", ["타이"]),
        ("로미로미", ["로미로미"]),
        ("슈얼마사지", ["슈얼", "센슈얼"]),
        ("왁싱", ["왁싱"]),
        ("스파", ["스파"]),
        ("중국마사지", ["중국"]),
        ("경락", ["경락"]),
        ("발마사지", ["발마사지", "풋"]),
    ]
    text = content or ""
    for label, keys in mapping:
        if any(k in text for k in keys):
            services.append(label)
    if is_outcall and "출장마사지" not in services:
        services.insert(0, "출장마사지")
    if not services:
        services = ["마사지"]
    return services[:8]


def detect_country(content: str, title: str) -> str:
    blob = f"{title} {content}"
    flags = []
    checks = [
        ("korea", ["한국", "국내"]),
        ("japan", ["일본", "재팬", "도쿄", "훗카이도"]),
        ("Thailand", ["태국", "타이", "홈타이"]),
        ("china", ["중국"]),
        ("russia", ["러시아"]),
        ("ukraine", ["우크라이나"]),
    ]
    for key, words in checks:
        if any(w in blob for w in words):
            flags.append(key)
    if not flags:
        flags = ["korea"]
    return ",".join(dict.fromkeys(flags))


def parse_name(title: str) -> str:
    parts = [p.strip() for p in (title or "").split("|") if p.strip()]
    if len(parts) >= 2:
        return parts[1]
    return parts[0] if parts else "업체"


def intro_text(lines: list[str], address: str, name: str = "", phone: str = "") -> str:
    name_compact = compact_key(name)
    phone_digits = re.sub(r"\D", "", phone or "")

    def is_phone_line(t: str) -> bool:
        digits = re.sub(r"\D", "", t)
        if not digits or len(digits) < 9 or len(digits) > 12:
            return False
        if not re.fullmatch(r"[\d\s\-().+]+", t):
            return False
        if phone_digits and digits == phone_digits:
            return True
        return bool(re.fullmatch(r"0\d{8,11}", digits))

    def is_name_line(t: str) -> bool:
        compact = compact_key(t)
        if not compact:
            return False
        if name_compact and compact == name_compact:
            return True
        if SPACED_TITLE_RE.match(t) and len(compact) <= 20:
            if not name_compact:
                return True
            return name_compact in compact or compact in name_compact
        return False

    def is_location_line(t: str) -> bool:
        if address and (t == address or t in address or address in t):
            return True
        # 문장형 소개는 유지
        if re.search(r"(입니다|드립니다|하세요|바랍니다|[다요임죠까])$", t):
            return False
        if re.fullmatch(r"\(.*주차.*\)", t):
            return True
        if re.search(r"무\s*료\s*주\s*차|주차\s*문의|주차권", t) and len(t) <= 30:
            return True
        if re.search(r"(도보|출구)\s*\d*\s*분?|거리$", t) and len(t) <= 40:
            return True
        if re.search(
            r"(서울특별시|부산광역시|대구광역시|인천광역시|광주광역시|대전광역시|울산광역시|세종특별자치시|제주특별자치도|서울시|부산시)",
            t,
        ):
            return True
        if (
            re.search(
                r"(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주).*(구|군|시|동|읍|면|로|길|번지)",
                t,
            )
            and len(t) <= 50
        ):
            return True
        return False

    kept: list[str] = []
    for t in lines:
        if not t:
            if kept and kept[-1] != "":
                kept.append("")
            continue
        if is_phone_line(t) or is_name_line(t) or is_location_line(t):
            continue
        if "건마시티 회원" in t:
            continue
        kept.append(t)

    while kept and kept[-1] == "":
        kept.pop()
    while kept and kept[0] == "":
        kept.pop(0)
    return "\n".join(kept).strip()


def outcall_regions(address: str, content: str, fallback: str) -> str:
    text = f"{address}\n{content}"
    found: list[str] = []

    def add(r: str):
        if r and r not in found:
            found.append(r)

    for r in SHOP_REGION_NAMES:
        if r in text:
            add(r)
    for city, region in CITY_TO_REGION.items():
        if city in text:
            add(region)
    if not found and fallback:
        add(fallback)
    return ",".join(found)


def clean_display_address(address: str, is_outcall: bool = False) -> str:
    text = (address or "").strip()
    if not text:
        return ""
    if (
        is_outcall
        and re.search(r"(전\s*지역|전지역|,|\.|·)", text)
        and not re.search(r"\d{1,4}-\d{1,4}", text)
    ):
        return text
    text = re.sub(
        r"\s+[가-힣A-Za-z0-9]+역\s*\d*\s*번?\s*출구(?:\s*도보\s*\d+\s*분)?.*$",
        "",
        text,
    )
    text = re.sub(r"\s+[가-힣A-Za-z0-9]+역\s*(부근|인근|근처).*$", "", text)
    text = re.sub(r"\s+[가-힣A-Za-z0-9]+역\s*$", "", text)
    text = re.sub(r"\s*도보\s*\d+\s*분.*$", "", text)
    text = re.sub(
        r"\s*\([^)]*(출구|도보|주차|문의|부근|인근)[^)]*\)\s*$", "", text
    )
    text = re.sub(r"\s*(상세\s*주소\s*문의|주소\s*문의|위치\s*문의).*$", "", text)
    text = re.sub(r"\s{2,}", " ", text).strip()
    return text or (address or "").strip()


def build_shop(raw: dict, seq: int, healing: bool) -> dict:
    fields = raw.get("fields") or {}
    title = raw.get("title") or ""
    content = raw.get("content") or ""
    address = fields.get("업체주소") or ""
    phone = fields.get("예약번호") or ""
    price_label = fields.get("회원가격") or ""
    member = fields.get("회원가") or ""
    original = fields.get("기존가") or ""
    hours = fields.get("영업시간") or ""

    sections = extract_sections(content)
    courses = parse_courses(sections["program"])
    staff = parse_staff(sections["staff"])
    directions = "\n".join(sections["way"]).strip()
    if not hours and sections["hours"]:
        hours = sections["hours"][0]

    name = parse_name(title)
    is_outcall = detect_outcall(title, address, content)
    address = clean_display_address(address, is_outcall)
    region = parse_region(address)
    if is_outcall:
        region = outcall_regions(
            address, "\n".join(sections["way"]) + "\n" + address, region
        )
    district, dong = parse_district_dong(address)
    if is_outcall:
        district, dong = "", ""

    description = intro_text(sections["intro"], address, name, phone)
    if not description:
        # fallback: first meaningful paragraphs before program
        description = name

    detail_parts = [description]
    if directions:
        detail_parts.append("【 오시는 길 】\n" + directions)
    if hours:
        detail_parts.append("【 영업시간 】\n" + hours)
    detail_content = "\n\n".join(p for p in detail_parts if p)

    images = raw.get("images") or []
    image = images[0] if images else ""

    member_num = re.sub(r"[^0-9]", "", member)
    price = f"{int(member_num):,}원~" if member_num else (member or "문의")

    return {
        "id": seq,
        "sourceId": str(raw.get("id") or seq),
        "name": name,
        "country": detect_country(content, title),
        "region": region,
        "district": district,
        "dong": dong,
        "address": address,
        "detailAddress": address if is_outcall else "",
        "phone": phone,
        "rating": round(random.uniform(4.6, 4.9), 1),
        "reviewCount": random.randint(40, 220),
        "price": price,
        "originalPrice": original,
        "memberPrice": member,
        "priceLabel": price_label or (f"기존가 : {original} 회원가 : {member}" if original and member else member),
        "description": description,
        "detailContent": detail_content,
        "directions": directions,
        "image": image,
        "images": images,
        "alt": f"{region.split(',')[0]} {name} 마사지샵",
        "services": detect_services(content, is_outcall),
        "operatingHours": hours or "상담 후 안내",
        "courses": courses,
        "staffInfo": staff,
        "type": "출장마사지" if is_outcall else "마사지",
        "typeLabel": "힐링샵" if healing else "",
        "showHealingShop": healing,
        "greeting": "",
        "file": f"detail.html?id={seq}",
        "reviews": [],
    }


def main() -> None:
    premium = json.loads((ROOT / "premium_full.json").read_text(encoding="utf-8"))
    usu = json.loads((ROOT / "usu_full.json").read_text(encoding="utf-8"))

    shops: list[dict] = []
    seq = 1
    for raw in premium:
        shops.append(build_shop(raw, seq, True))
        seq += 1
    for raw in usu:
        shops.append(build_shop(raw, seq, False))
        seq += 1

    OUT.write_text(
        "window.shopCardData = " + json.dumps(shops, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )

    # Source JSON still has gunmacity.com image URLs — remap to local images/
    from _replace_all_gunmacity_images import main as remap_local_images

    remap_local_images()

    with_courses = sum(1 for s in shops if s["courses"])
    print(f"wrote {len(shops)} shops, with courses {with_courses}")
    sample = next(s for s in shops if "루미" in s["name"])
    print("루미 desc:\n", sample["description"][:300])
    print("루미 courses", len(sample["courses"]), "priceLabel", sample["priceLabel"])
    print("루미 region", sample["region"])


if __name__ == "__main__":
    main()
