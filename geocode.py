# -*- coding: utf-8 -*-
"""업체 주소 → 위도/경도 변환 (카카오 로컬 REST API).

사용:
  set KAKAO_REST_KEY=여기에_REST_키
  python geocode.py

옵션:
  python geocode.py --input shops.json --output shops.json
  python geocode.py --force          # 이미 있는 좌표도 다시 변환
  python geocode.py --limit 20       # 앞에서 n개만 (테스트)

키 발급: https://developers.kakao.com
  1) 앱 생성 → 앱 키에서 REST API 키 복사 (JavaScript 키 아님)
  2) 환경변수 KAKAO_REST_KEY 에 넣거나 --key 로 전달
  3) 플랫폼에 Web 도메인 등록은 JS 키용. REST 키는 서버(이 스크립트)에서만 씀.

결과:
  shops.json            지도 nearby.html 이 그대로 fetch
  geocode-failed.json   변환 실패한 주소 목록
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CARD_DATA = ROOT / "js" / "shop-card-data.js"
DEFAULT_OUT = ROOT / "shops.json"
FAILED_OUT = ROOT / "geocode-failed.json"

ADDRESS_API = "https://dapi.kakao.com/v2/local/search/address.json"
KEYWORD_API = "https://dapi.kakao.com/v2/local/search/keyword.json"

# 카카오 로컬 검색 초당 약 10건. 여유 두고 8건/초.
MIN_INTERVAL_SEC = 0.13

VAGUE_RE = re.compile(
    r"(전지역|출장|홈케어|홈타이|원하는 장소|연락|예약시|상세위치)",
    re.I,
)


def load_card_data() -> list[dict]:
    text = CARD_DATA.read_text(encoding="utf-8")
    text = re.sub(r"^window\.shopCardData\s*=\s*", "", text, count=1)
    text = text.strip()
    if text.endswith(";"):
        text = text[:-1]
    return json.loads(text)


def slim_shop(raw: dict) -> dict:
    return {
        "id": raw.get("id"),
        "name": raw.get("name") or "",
        "address": (raw.get("address") or "").strip(),
        "detailAddress": (raw.get("detailAddress") or "").strip(),
        "phone": raw.get("phone") or "",
        "price": raw.get("price") or "",
        "operatingHours": raw.get("operatingHours") or "",
        "country": raw.get("country") or "",
        "type": raw.get("type") or "",
        "region": raw.get("region") or "",
        "district": raw.get("district") or "",
        "dong": raw.get("dong") or "",
        "services": raw.get("services") or [],
        "image": raw.get("image") or "",
        "lat": raw.get("lat"),
        "lng": raw.get("lng"),
    }


def load_shops(path: Path) -> list[dict]:
    if path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(data, dict) and "shops" in data:
            return data["shops"]
        if isinstance(data, list):
            return data
    cards = load_card_data()
    return [slim_shop(s) for s in cards]


def has_coords(shop: dict) -> bool:
    try:
        lat = float(shop.get("lat"))
        lng = float(shop.get("lng"))
    except (TypeError, ValueError):
        return False
    return -90 <= lat <= 90 and -180 <= lng <= 180


def query_candidates(shop: dict) -> list[str]:
    addr = (shop.get("address") or "").strip()
    extra = (shop.get("detailAddress") or "").strip()
    parts = [
        shop.get("region") or "",
        shop.get("district") or "",
        shop.get("dong") or "",
    ]
    loc = " ".join(p for p in parts if p).strip()
    name = (shop.get("name") or "").strip()
    out = []
    for q in (addr, extra, loc, f"{loc} {name}".strip()):
        q = re.sub(r"\s+", " ", q).strip()
        if not q:
            continue
        if q not in out:
            out.append(q)
    return out


def http_get(url: str, rest_key: str) -> dict:
    req = urllib.request.Request(
        url,
        headers={"Authorization": f"KakaoAK {rest_key}"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as res:
            return json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as err:
        body = err.read().decode("utf-8", errors="replace")
        if err.code == 429:
            raise RuntimeError("RATE_LIMIT") from err
        if err.code in (401, 403):
            raise RuntimeError(f"AUTH {err.code}: {body[:400]}") from err
        raise RuntimeError(f"HTTP {err.code}: {body[:240]}") from err


def search_address(query: str, rest_key: str) -> tuple[float, float] | None:
    qs = urllib.parse.urlencode({"query": query})
    data = http_get(f"{ADDRESS_API}?{qs}", rest_key)
    docs = data.get("documents") or []
    if not docs:
        return None
    doc = docs[0]
    road = doc.get("road_address") or {}
    jibun = doc.get("address") or {}
    y = road.get("y") or jibun.get("y") or doc.get("y")
    x = road.get("x") or jibun.get("x") or doc.get("x")
    if y is None or x is None:
        return None
    return float(y), float(x)


def search_keyword(query: str, rest_key: str) -> tuple[float, float] | None:
    qs = urllib.parse.urlencode({"query": query, "size": 1})
    data = http_get(f"{KEYWORD_API}?{qs}", rest_key)
    docs = data.get("documents") or []
    if not docs:
        return None
    doc = docs[0]
    y, x = doc.get("y"), doc.get("x")
    if y is None or x is None:
        return None
    return float(y), float(x)


def geocode_one(shop: dict, rest_key: str, sleeper: list[float]) -> tuple[float, float] | None:
    wait = MIN_INTERVAL_SEC - (time.monotonic() - sleeper[0])
    if wait > 0:
        time.sleep(wait)

    last_err = None
    for query in query_candidates(shop):
        vague = bool(VAGUE_RE.search(query)) and not re.search(
            r"\d", query
        )
        tries = [("keyword", search_keyword)] if vague else [
            ("address", search_address),
            ("keyword", search_keyword),
        ]
        for kind, fn in tries:
            for attempt in range(4):
                try:
                    hit = fn(query, rest_key)
                    sleeper[0] = time.monotonic()
                    if hit:
                        return hit
                    break
                except RuntimeError as err:
                    last_err = err
                    sleeper[0] = time.monotonic()
                    if str(err) == "RATE_LIMIT":
                        time.sleep(1.2 * (attempt + 1))
                        continue
                    break
    if last_err:
        shop["_error"] = str(last_err)
    return None


def save_shops(path: Path, shops: list[dict]) -> None:
    payload = {
        "shops": shops,
        "metadata": {
            "total": len(shops),
            "geocoded": sum(1 for s in shops if has_coords(s)),
            "updatedAt": time.strftime("%Y-%m-%dT%H:%M:%S"),
        },
    }
    path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="카카오 로컬 API로 업체 주소 좌표 변환")
    parser.add_argument("--key", default=os.environ.get("KAKAO_REST_KEY", ""))
    parser.add_argument("--input", default=str(DEFAULT_OUT))
    parser.add_argument("--output", default=str(DEFAULT_OUT))
    parser.add_argument("--failed", default=str(FAILED_OUT))
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--from-cards", action="store_true", help="shop-card-data.js에서 다시 추출")
    args = parser.parse_args()

    out_path = Path(args.output)
    in_path = Path(args.input)

    if args.from_cards or not in_path.exists():
        shops = [slim_shop(s) for s in load_card_data()]
        if in_path.exists() and in_path != CARD_DATA:
            old_by_id = {str(s.get("id")): s for s in load_shops(in_path)}
            for shop in shops:
                prev = old_by_id.get(str(shop.get("id")))
                if prev and has_coords(prev) and not args.force:
                    shop["lat"] = prev["lat"]
                    shop["lng"] = prev["lng"]
        print(f"shop-card-data.js에서 {len(shops)}개 추출")
    else:
        shops = load_shops(in_path)
        print(f"{in_path.name}에서 {len(shops)}개 로드")

    if args.limit > 0:
        shops = shops[: args.limit]

    save_shops(out_path, shops)

    rest_key = (args.key or "").strip()
    if not rest_key or rest_key == "YOUR_KAKAO_REST_KEY":
        print("KAKAO_REST_KEY 가 없어 좌표 변환은 건너뜁니다.")
        print("PowerShell:")
        print('  $env:KAKAO_REST_KEY = "REST키"')
        print("  python geocode.py")
        print("또는:")
        print("  python geocode.py --key REST키")
        print(f"업체 JSON만 저장: {out_path}")
        return 0

    sleeper = [0.0]
    failed = []
    done = 0
    skipped = 0
    total = len(shops)

    for i, shop in enumerate(shops, 1):
        if has_coords(shop) and not args.force:
            skipped += 1
            continue
        hit = geocode_one(shop, rest_key, sleeper)
        if hit:
            shop["lat"], shop["lng"] = hit
            shop.pop("_error", None)
            done += 1
        else:
            shop["lat"] = None
            shop["lng"] = None
            err = shop.pop("_error", "no_result")
            failed.append(
                {
                    "id": shop.get("id"),
                    "name": shop.get("name"),
                    "address": shop.get("address"),
                    "queries": query_candidates(shop),
                    "error": err,
                }
            )
            if str(err).startswith("AUTH "):
                print("카카오가 키/권한을 거부했습니다. 343곳을 계속 돌리지 않고 중단합니다.")
                print(err)
                print("카카오 개발자 센터 → 앱 → 카카오맵 → 사용 설정을 ON 으로 바꾼 뒤 다시 실행하세요.")
                Path(args.failed).write_text(
                    json.dumps(failed, ensure_ascii=False, indent=2), encoding="utf-8"
                )
                save_shops(out_path, shops)
                return 1
        if i % 20 == 0 or i == total:
            print(f"[{i}/{total}] 성공 {done} / 건너뜀 {skipped} / 실패 {len(failed)}")
            save_shops(out_path, shops)

    save_shops(out_path, shops)
    Path(args.failed).write_text(
        json.dumps(failed, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(
        f"완료: 변환 {done}, 기존좌표 유지 {skipped}, 실패 {len(failed)}\n"
        f"  → {out_path}\n"
        f"  → {args.failed}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
