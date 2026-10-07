#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""업체별 후기 10개 생성 → js/shop-reviews.js"""
from __future__ import annotations

import json
import random
import re
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CARD = ROOT / "js" / "shop-card-data.js"
OUT = ROOT / "js" / "shop-reviews.js"

SURNAMES = list("김이박최정강조윤장임한오서신권황안송전홍유고문양손배백허남심")
NICKS = [
    "직장인", "야근러", "퇴근후", "주말이용", "단골될듯", "첫방문", "재방문러",
    "어깨결림", "허리아파", "여행중", "출장중", "동네주민", "회사근처", "익명",
    "후기남김", "마사지좋아", "힐링필요", "스트레스", "거북목", "운동후",
]
SKIP_STAFF = ("전문", "관리사", "힐링", "전원", "한국인", "정성")


def load_shops() -> list[dict]:
    text = CARD.read_text(encoding="utf-8")
    text = text.replace("window.shopCardData =", "", 1).strip()
    if text.endswith(";"):
        text = text[:-1]
    return json.loads(text)


def first_line(text: str) -> str:
    for raw in (text or "").splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith("★") or line.startswith("8월") or "예약" in line:
            continue
        if line.startswith("【") or "영업시간" in line:
            continue
        return re.sub(r"\s+", " ", line)[:42]
    return ""


def station_from_image(shop: dict) -> str:
    for src in [shop.get("image") or ""] + list(shop.get("images") or []):
        for part in str(src).replace("\\", "/").split("/")[-1].split("_"):
            if part.endswith("역"):
                return part
    return ""


def course_bits(shop: dict) -> list[tuple[str, str, str]]:
    bits = []
    for block in shop.get("courses") or []:
        for item in block.get("items") or []:
            name = (item.get("name") or "").strip()
            dur = (item.get("duration") or "").strip()
            price = (item.get("price") or "").strip()
            if name or dur or price:
                bits.append((name, dur, price))
    return bits


def staff_name(shop: dict) -> str:
    raw = (shop.get("staffInfo") or "").strip()
    if not raw or any(k in raw for k in SKIP_STAFF):
        return ""
    token = re.split(r"[\s,|/]+", raw)[0]
    return token if 2 <= len(token) <= 6 else ""


def facts(shop: dict) -> dict:
    services = [s for s in (shop.get("services") or []) if s]
    courses = course_bits(shop)
    landmark = first_line(shop.get("directions") or "")
    parking = any("주차" in (shop.get(k) or "") for k in ("directions", "description", "detailContent"))
    outcall = shop.get("type") == "출장마사지"
    dong = (shop.get("dong") or "").strip()
    district = (shop.get("district") or "").strip()
    region = (shop.get("region") or "").strip()
    area = " ".join(p for p in (region, district, dong) if p)
    return {
        "id": shop.get("id"),
        "name": (shop.get("name") or "이 샵").strip(),
        "region": region,
        "district": district,
        "dong": dong,
        "area": area,
        "address": (shop.get("address") or "").strip(),
        "services": services,
        "svc": services[0] if services else "마사지",
        "svc2": services[1] if len(services) > 1 else (services[0] if services else "아로마"),
        "price": (shop.get("price") or "").replace("~", "").strip() or "회원가",
        "hours": re.sub(r"\s+", " ", (shop.get("operatingHours") or "").strip()),
        "landmark": landmark or station_from_image(shop),
        "station": station_from_image(shop),
        "parking": parking,
        "outcall": outcall,
        "course": courses[0] if courses else ("", "", shop.get("price") or ""),
        "course2": courses[1] if len(courses) > 1 else None,
        "staff": staff_name(shop),
        "rating": float(shop.get("rating") or 4.6),
    }


def pick_svc(f: dict, rng: random.Random, n: int) -> str:
    pool = f["services"] or ["마사지"]
    return pool[n % len(pool)]


def reviewer_name(shop_id: int, i: int, f: dict, rng: random.Random) -> str:
    kind = (shop_id * 11 + i * 7) % 8
    sur = SURNAMES[(shop_id + i * 3) % len(SURNAMES)]
    loc = f["dong"] or f["district"] or f["region"]
    if loc and ("," in loc or len(loc) > 8 or "전지역" in loc):
        loc = ""
    if kind == 0:
        return f"{sur}○○"
    if kind == 1:
        return f"{sur}씨"
    if kind == 2:
        return NICKS[(shop_id + i) % len(NICKS)]
    if kind == 3:
        return f"{loc}손님" if loc else f"{sur}○○"
    if kind == 4:
        return NICKS[(shop_id + i * 2) % len(NICKS)]
    if kind == 5:
        return f"익명{shop_id % 90 + 10}"
    if kind == 6:
        return f"{sur}단골"
    return f"{sur}**"


def review_date(shop_id: int, i: int) -> str:
    last = date(2026, 10, 6)
    offset = (shop_id * 13 + i * 29 + 5) % 340
    d = last - timedelta(days=offset)
    return f"{d.year}.{d.month:02d}.{d.day:02d}"


def rating_for(f: dict, i: int) -> int:
    base = 5 if f["rating"] >= 4.6 else 4
    if i in (3, 8):
        return 4
    if i == 6 and f["rating"] < 4.5:
        return 3
    return base


def course_text(f: dict, which: int = 0) -> str:
    c = f["course"] if which == 0 else (f["course2"] or f["course"])
    name, dur, price = c
    parts = [p for p in (name, dur, price) if p]
    return " ".join(parts)


def comment_bank(f: dict, i: int, rng: random.Random) -> list[str]:
    name, area, dong, dist = f["name"], f["area"], f["dong"], f["district"]
    svc, svc2 = pick_svc(f, rng, i), pick_svc(f, rng, i + 3)
    price, hours, land = f["price"], f["hours"], f["landmark"]
    station = f["station"]
    course = course_text(f)
    loc = land or station or (f"{dong} " if dong else "") + (dist or area)
    loc = loc.strip()
    if f["outcall"]:
        return outcall_bank(name, area, dong, dist, svc, svc2, price, hours, loc, course, i)
    return shop_bank(
        name, area, dong, dist, svc, svc2, price, hours, loc, station, course, f["staff"], f["parking"], i
    )


def make_comment(f: dict, i: int, rng: random.Random, slot: int) -> str:
    bank = comment_bank(f, i, rng)
    return clean(bank[slot % len(bank)])


def clean(text: str) -> str:
    text = re.sub(r"\s{2,}", " ", text).strip()
    text = re.sub(r"\s+([,.!?~])", r"\1", text)
    return text[:220]


def near_phrase(near: str) -> str:
    near = (near or "").strip()
    if not near:
        return "위치가"
    if near.endswith(("거리", "근처", "쪽", "앞", "역", "층", "동")):
        return f"{near}라"
    return f"{near} 근처라"


def other_svc(svc: str, svc2: str) -> str:
    if svc2 and svc2 != svc:
        return svc2
    return "다른 코스"


def shop_bank(name, area, dong, dist, svc, svc2, price, hours, loc, station, course, staff, parking, i):
    near = loc or station or dong or dist
    park = "주차 되고 " if parking else ""
    park2 = "주차 가능해서 차 갖고 가기 편함. " if parking else ""
    who = f"{staff} 관리사님 " if staff else "관리사님 "
    night = hours if hours else "영업시간"
    a = dong or dist or area
    alt = other_svc(svc, svc2)
    return [
        f"{name} {svc} 괜찮았어요",
        f"{a} {name} 재방문할 듯. {svc} 손에 힘 균일함",
        f"{near_phrase(near)} 찾기 쉽고 {park}{svc} 받고 어깨 좀 살았음",
        f"{name}에서 {course or svc} 함. 가격 {price}대면 납득",
        f"회사 끝나고 {name} {svc2}. {night}라 급하게도 됨",
        f"{a} 마사지 몇 군데 다니다 {name}이 제일 깔끔. {svc} 추천",
        f"{who}세게 해달라니까 바로 맞춰줌. {name} {svc} 재예약함",
        f"{station or near} 근처 {name}. 예약 문자 답 빠르고 입실 대기 없음",
        f"{park2}{name} {svc} {svc2} 둘 다 받아봤는데 아로마 쪽이 더 맞음",
        f"첫 방문인데 {name} 시설 깨끗하고 {course or price} 구성이 단순해서 고르기 쉬움. {a}에서 단골 될 듯",
        f"{name} 짧음. 근데 시원함",
        f"{a} {svc} 찾다가 옴. 보통임 그냥 무난",
        f"야근하고 {name} 들름. {svc} 받고 버스에서 졸았음",
        f"{near} {name} 위치 설명 정확함. {who}말수 적고 일만 함 그게 좋음",
        f"{name} {price} {svc}. 이 동네 시세 대비 세지 않음",
        f"주말에 {name} 90분? 아니 {course or svc} 예약. 밀리지 않아서 시간 딱 맞음",
        f"{a} {name} {svc} 말고 {alt}로 바꿈. 이게 더 나음",
        f"친구 소개로 {name}. {park}내부 조용하고 음악 크지 않음",
        f"{name} 두 번째. 첫날은 약했는데 오늘은 세게 해달라고 하니까 {svc} 제대로",
        f"{a} 살아서 가까움. {name} {svc2} 받고 목 결림 하루는 감",
        f"사진이랑 실물이 비슷함. {name} {near}".strip(" ."),
        f"{night}에 {name} 감. 늦은 시간도 응대 됨",
        f"{svc}만 받음. {name} 다른 코스는 다음에",
        f"예약제라 그런지 대기 없이 {name} 들어감. {a} {svc} 찾는 중이면 여기",
        f"{name} 리뷰 남기려니 쓸 말 없음. 그냥 좋았음. {svc} {price}",
        f"허리 디스크 있는데 {name}에서 세게만 안 하고 {svc} 조절해줌. {loc} 근처",
        f"{a} {name} 간판 작아서 헤맴. 들어가니 {svc}는 괜찮음",
        f"커플은 아니고 혼자 {name}. {svc2} 후 개운해서 걸어 나옴",
        f"{course} 이 구성이 {name}에서 제일 무난해 보임. 받아서 후회 없음",
        f"{name} {svc} 강함. 약하게 해달라 하면 됨. {a} 출장 아니고 샵이라 좋음",
    ]


def outcall_bank(name, area, dong, dist, svc, svc2, price, hours, loc, course, i):
    a = dong or dist or area
    where = loc or a
    return [
        f"{name} 출장 {svc} 시간 맞춰 오심",
        f"{a} 호텔에서 {name} 부름. 연락 빠르고 {svc} 무난함",
        f"집 근처 {name} 홈케어. {price}대 {svc}면 이동비 감안해도 됨",
        f"{name} {course or svc}. 출장인데 준비물 빠짐없이 옴",
        f"야근 후 {name} 출장 요청. {hours}라 늦은 시간도 됨",
        f"{a} 출장마사지 몇 번 쓰다 {name}이 제일 답 빠름. {svc2} 받았음",
        f"{where}에서 {name} {svc}. 초인벨 시간 정확히 지킴",
        f"출장 처음인데 {name} 설명 간단해서 예약 편함. {svc} 세기 조절됨",
        f"{name} 두 번째 출장. 첫날보다 {svc} 손 더 익은 느낌",
        f"{a} {name} 홈케어. 샵 가기 싫을 때 이거면 됨. {price}",
        f"{name} 출장 짧고 굵음. {svc}",
        f"호텔 출장 {name}. 복장 단정하고 {svc2}만 하고 감",
        f"{name} 문자 예약. {course or price} 확인하고 옴. 추가요금 없었음",
        f"{a} 사는 사람인데 {name} 출장 거리 됨. {svc} 받고 바로 잠",
        f"출장샵 {name} {svc}. 말 많이 안 해서 편했음",
        f"{name} {hours} 가능해서 새벽에 부름. {a} {svc}",
        f"회사 근처 숙소에서 {name}. {svc} 후 몸이 좀 풀림",
        f"{name} 출장 재호출함. {where} {svc2}",
        f"가격표대로 {name} {price}. 출장인데 바가지 없었음",
        f"{a} {name} 홈케어 {svc}. 다음엔 시간 더 길게",
        f"{name} 연락처 저장함. 출장 {svc} 쓸 만함",
        f"급하게 {name} 부름. 한 시간 안 걸려 도착. {svc}",
        f"{name} 출장 후기. 시설이 없으니 손만 보면 됨. 손은 괜찮음",
        f"{course} 출장으로 받음. {name} {a}",
        f"{name} {svc} {svc2} 중 {svc}가 더 맞음. 출장 기준",
        f"주말 {a} {name} 출장. 예약 밀려서 한 시간 늦춤. 오고 나니 {svc}는 좋았음",
        f"{name} 짧게 씀. 출장 잘 옴",
        f"초인종부터 안내 잘해줌. {name} {svc} {price}",
        f"{a}에서 출장 가능한 {name}. {svc} 힘 조절 되고 시간 안 줄임",
        f"{name} 홈케어 세 번째. 이제 단골. {svc} {where}",
    ]


def generate() -> dict:
    shops = load_shops()
    used: set[str] = set()
    used_names: set[str] = set()
    data: dict[str, list] = {}

    for shop in shops:
        f = facts(shop)
        sid = str(f["id"])
        shop_rng = random.Random(int(f["id"]) * 1009 + 3)
        slots = list(range(30))
        shop_rng.shuffle(slots)
        reviews = []
        shop_names: set[str] = set()
        for i in range(10):
            rng = random.Random(int(f["id"]) * 1009 + i * 17 + 3)
            comment = make_comment(f, i, rng, slots[i])
            n = 0
            while comment in used and n < 30:
                n += 1
                comment = make_comment(f, i + n, random.Random(int(f["id"]) * 1009 + i * 17 + n), slots[(i + n) % 30])
                if comment in used:
                    comment = f"{comment} {f['dong'] or f['district']}".strip()
            if comment in used:
                comment = f"{f['name']} {f['dong']} {pick_svc(f, rng, i + 9)} {i + 1}번째 방문. 그때그때 다름"
            used.add(comment)

            rname = reviewer_name(int(f["id"]), i, f, rng)
            tries = 0
            while rname in shop_names and tries < 20:
                rname = f"{SURNAMES[(int(f['id']) + i + tries + 8) % len(SURNAMES)]}○○"
                tries += 1
            shop_names.add(rname)
            used_names.add(f"{sid}:{rname}")

            reviews.append(
                {
                    "name": rname,
                    "rating": rating_for(f, i),
                    "date": review_date(int(f["id"]), i),
                    "comment": comment,
                }
            )
        data[sid] = reviews
    return data


def main() -> None:
    data = generate()
    OUT.write_text(
        "window.shopReviews = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    comments = [r["comment"] for rows in data.values() for r in rows]
    print(f"[완료] 업체 {len(data)}곳, 후기 {len(comments)}개 → {OUT}")
    print(f"고유 후기 {len(set(comments))} / {len(comments)}")


if __name__ == "__main__":
    main()
