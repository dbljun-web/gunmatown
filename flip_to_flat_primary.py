#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
public/*.html 안의 원본 콘텐츠를 루트로 복원하면서
- 리다이렉트 껍데기(.html)를 전부 덮어쓰고
- CSS/JS 경로
- canonical / og:url
을 '파일형 URL' 기준으로 다시 잡아주는 스크립트.
"""

import re
from pathlib import Path
import shutil


# 경로 설정
script_path = Path(__file__).resolve()
BASE_DIR = script_path.parent          # 예: .../kissbang-main
PUBLIC_DIR = BASE_DIR / "public"


print(f"BASE_DIR : {BASE_DIR}")
print(f"PUBLIC_DIR: {PUBLIC_DIR} (exists: {PUBLIC_DIR.exists()})")
print()

if not PUBLIC_DIR.exists():
    print(f"오류: {PUBLIC_DIR} 폴더를 찾을 수 없습니다.")
    raise SystemExit(1)


# --- 지역 / 상세지역 / 타입 한글 매핑 (타이틀/OG용) ---
REGION_NAME_MAP = {
    # 광역시/도
    "seoul": "서울",
    "busan": "부산",
    "incheon": "인천",
    "daegu": "대구",
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

# 서울 구 한글 매핑 (상세지역 우선 노출용)
SEOUL_DISTRICT_MAP = {
    "gangnam": "강남",
    "gangdong": "강동",
    "gangbuk": "강북",
    "gangseo": "강서",
    "gwanak": "관악",
    "gwangjin": "광진",
    "guro": "구로",
    "geumcheon": "금천",
    "nowon": "노원",
    "dobong": "도봉",
    "dongdaemun": "동대문",
    "dongjak": "동작",
    "mapo": "마포",
    "seodaemun": "서대문",
    "seocho": "서초",
    "seongdong": "성동",
    "seongbuk": "성북",
    "songpa": "송파",
    "yangcheon": "양천",
    "yeongdeungpo": "영등포",
    "yongsan": "용산",
    "eunpyeong": "은평",
    "jongno": "종로",
    "jung": "중구",
    "jungnang": "중랑",
}

# 부산 구/군
BUSAN_DISTRICT_MAP = {
    "junggu": "중구",
    "seogu": "서구",
    "donggu": "동구",
    "yeongdo": "영도구",
    "busanjin": "부산진구",
    "dongnae": "동래구",
    "namgu": "남구",
    "bukgu": "북구",
    "haeundae": "해운대구",
    "saha": "사하구",
    "geumjeong": "금정구",
    "gangseo": "강서구",
    "yeonje": "연제구",
    "suyeong": "수영구",
    "sasang": "사상구",
    "gijang": "기장군",
}

# 대구 구/군
DAEGU_DISTRICT_MAP = {
    "junggu": "중구",
    "donggu": "동구",
    "seogu": "서구",
    "namgu": "남구",
    "bukgu": "북구",
    "suseong": "수성구",
    "dalseo": "달서구",
    "dalseong": "달성군",
}

# 인천 구/군
INCHEON_DISTRICT_MAP = {
    "junggu": "중구",
    "donggu": "동구",
    "michuhol": "미추홀구",
    "yeonsu": "연수구",
    "namdong": "남동구",
    "bupyeong": "부평구",
    "gyeyang": "계양구",
    "seogu": "서구",
    "ganghwa": "강화군",
    "ongjin": "옹진군",
}

# 광주 구
GWANGJU_DISTRICT_MAP = {
    "donggu": "동구",
    "seogu": "서구",
    "namgu": "남구",
    "bukgu": "북구",
    "gwangsan": "광산구",
}

# 대전 구
DAEJEON_DISTRICT_MAP = {
    "donggu": "동구",
    "junggu": "중구",
    "seogu": "서구",
    "yuseong": "유성구",
    "daedeok": "대덕구",
}

# 울산 구/군
ULSAN_DISTRICT_MAP = {
    "junggu": "중구",
    "namgu": "남구",
    "donggu": "동구",
    "bukgu": "북구",
    "ulju": "울주군",
}

# 제주 시
JEJU_DISTRICT_MAP = {
    "jeju-si": "제주시",
    "jeju-seogwipo": "서귀포시",
    "seogwipo-si": "서귀포시",
}

# 지역별 세부지역(구/시/군) 매핑 모음
DISTRICT_NAME_MAP_BY_REGION = {
    "seoul": SEOUL_DISTRICT_MAP,
    "busan": BUSAN_DISTRICT_MAP,
    "daegu": DAEGU_DISTRICT_MAP,
    "incheon": INCHEON_DISTRICT_MAP,
    "gwangju": GWANGJU_DISTRICT_MAP,
    "daejeon": DAEJEON_DISTRICT_MAP,
    "ulsan": ULSAN_DISTRICT_MAP,
    "jeju": JEJU_DISTRICT_MAP,
}

TYPE_NAME_MAP = {
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


def build_seo_title_from_filename(filename: str) -> str:
    """
    파일명(예: seoul-gangnam-massage.html)을 기반으로
    SEO 친화적인 타이틀을 생성합니다.

    규칙(파일명 예시 기준):
    - seoul-massage.html                              -> 서울 마사지 BEST 샵 | 지금 가장 핫 업체
    - ulsan-outcall.html                              -> 울산 출장마사지 BEST 샵 | 지금 가장 핫 업체
    - busan-bukgu-massage.html                        -> 부산 북구 마사지 BEST 샵 | 지금 가장 핫 업체
    - seoul-gangnam-swedish.html                      -> 서울 강남 스웨디시 BEST 샵 | 지금 가장 핫 업체
    - gyeongbuk-pohang-yeonil-eup-massage.html        -> 경북 pohang yeonil eup 마사지 BEST 샵 | 지금 가장 핫 업체
      (가능한 한 지역 + 세부지역(구/군/시) + 동/역 정보를 모두 포함)
    """
    name = filename.replace(".html", "")
    parts = name.split("-")

    if not parts:
        return "BEST 샵 | 지금 가장 핫 업체"

    # 타입(마지막) 판별
    type_slug = None
    if parts[-1] in TYPE_NAME_MAP:
        type_slug = parts[-1]
        location_parts = parts[:-1]
    else:
        location_parts = parts

    region_slug = location_parts[0] if location_parts else ""
    district_slug = location_parts[1] if len(location_parts) >= 2 else ""
    dong_slug = "-".join(location_parts[2:]) if len(location_parts) >= 3 else ""

    region_name = REGION_NAME_MAP.get(region_slug, region_slug or "").strip()

    # 세부지역(구/군/시) 이름 찾기
    district_name = ""
    if district_slug:
        region_district_map = DISTRICT_NAME_MAP_BY_REGION.get(region_slug, {})
        district_name = region_district_map.get(district_slug, district_slug)

    # 동/역 이름은 일단 슬러그를 공백 기준으로만 보기 좋게
    dong_name = ""
    if dong_slug:
        dong_name = dong_slug.replace("-", " ")

    # 지역 + 세부지역 + 동/역을 모두 포함하는 영역 이름 구성
    area_parts = []
    if region_name:
        area_parts.append(region_name)
    if district_name:
        area_parts.append(district_name)
    if dong_name:
        area_parts.append(dong_name)

    area_name = " ".join(area_parts).strip() or region_name or "지역"

    type_name = TYPE_NAME_MAP.get(type_slug or "", "마사지")

    return f"{area_name} {type_name} BEST 샵 | 지금 가장 핫 업체"


def update_html_for_flat(content: str, filename: str) -> str:
    """
    - style.css / ./style.css  -> css/style.css
    - 각종 JS 파일             -> js/파일명
    - base href                -> "./"
    - canonical / og:url       -> https://msg1000.com/filename
    """
    # CSS 경로 수정 (따옴표 중복 제거 포함)
    content = re.sub(
        r'href=["\']css/style\.css""',
        r'href="css/style.css"',
        content,
    )
    content = re.sub(
        r'href=["\']style\.css([^"\']*)',
        r'href="css/style.css\1"',
        content,
    )
    content = re.sub(
        r'href=["\']\./style\.css([^"\']*)',
        r'href="css/style.css\1"',
        content,
    )

    # JS 파일들 경로 수정
    js_files = [
        'script.js',
        'detail.js',
        'common-components.js',
        'common-components.min.js',
        'shop-card-data.js',
        'shop-manager.js',
        'generate-pages.js',
    ]
    for js in js_files:
        # src="script.js"
        content = re.sub(
            rf'src=["\']{re.escape(js)}([^"\']*)',
            rf'src="js/{js}\1"',
            content,
        )
        # src="./script.js"
        content = re.sub(
            rf'src=["\']\./{re.escape(js)}([^"\']*)',
            rf'src="js/{js}\1"',
            content,
        )

    # base href 수정 (있으면 교체)
    if re.search(r'<base href=["\'][^"\']*["\']', content):
        content = re.sub(
            r'<base href=["\'][^"\']*["\']',
            '<base href="./"',
            content,
        )

    # canonical / og:url 을 파일형 URL 기준으로 수정
    new_url = f"https://msg1000.com/{filename}"

    # canonical
    if re.search(r'<link rel="canonical" href="https://(www\.)?msg1000\.com/[^"]*"', content):
        content = re.sub(
            r'<link rel="canonical" href="https://(www\.)?msg1000\.com/[^"]*"',
            f'<link rel="canonical" href="{new_url}"',
            content,
        )

    # og:url
    if re.search(r'<meta property="og:url" content="https://(www\.)?msg1000\.com/[^"]*"', content):
        content = re.sub(
            r'<meta property="og:url" content="https://(www\.)?msg1000\.com/[^"]*"',
            f'<meta property="og:url" content="{new_url}"',
            content,
        )

    # JSON-LD 구조화된 데이터에서 non-www로 통일
    # https://www.msg1000.com -> https://msg1000.com
    content = re.sub(
        r'https://www\.msg1000\.com',
        'https://msg1000.com',
        content,
    )

    # --- SEO 타이틀 / OG 타이틀 / 트위터 타이틀 통일 ---
    seo_title = build_seo_title_from_filename(filename)

    # <title>...</title> - title 태그를 seo_title로 통일
    content = re.sub(
        r"<title>.*?</title>",
        f"<title>{seo_title}</title>",
        content,
        flags=re.IGNORECASE | re.DOTALL,
    )

    # og:title – 기존 태그 전체를 새 태그로 교체 (모든 형식 매칭: property="og:title" 또는 property='og:title')
    # content 속성의 값이 무엇이든 상관없이 전체 태그를 교체하여 title과 동일하게 만듦
    content = re.sub(
        r'<meta\s+property=["\']og:title["\'][^>]*>',
        f'<meta property="og:title" content="{seo_title}" />',
        content,
        flags=re.IGNORECASE,
    )

    # og:title이 없으면 추가 (title과 동일한 값으로)
    if not re.search(r'<meta\s+property=["\']og:title["\']', content, flags=re.IGNORECASE):
        # </head> 태그 앞에 추가
        if re.search(r'</head>', content, flags=re.IGNORECASE):
            content = re.sub(
                r'(</head>)',
                f'    <meta property="og:title" content="{seo_title}" />\n\\1',
                content,
                flags=re.IGNORECASE,
            )

    # twitter:title – 기존 태그 전체를 새 태그로 교체
    content = re.sub(
        r'<meta\s+name=["\']twitter:title["\'][^>]*>',
        f'<meta name="twitter:title" content="{seo_title}" />',
        content,
        flags=re.IGNORECASE,
    )

    return content


def flip_to_flat_primary():
    html_files = list(PUBLIC_DIR.glob("*.html"))

    # index/admin 등은 제외 (원래처럼 root index.html, admin.html은 따로 관리)
    exclude = {"index.html", "admin.html"}
    html_files = [f for f in html_files if f.name not in exclude]

    print(f"처리할 public HTML 파일: {len(html_files)}개\n")

    copied = 0
    skipped = 0
    errors = 0

    for src in html_files:
        try:
            filename = src.name
            dst = BASE_DIR / filename

            # 원본 내용 읽기
            with open(src, "r", encoding="utf-8") as f:
                content = f.read()

            # CSS/JS/ canonical/og:url 업데이트
            new_content = update_html_for_flat(content, filename)

            # 백업 (기존 dst가 있을 경우)
            if dst.exists():
                backup = BASE_DIR / f"{filename}.backup_flat_before"
                if not backup.exists():
                    shutil.copy2(dst, backup)

            # 새 내용으로 루트에 쓰기
            with open(dst, "w", encoding="utf-8") as f:
                f.write(new_content)

            copied += 1
            if copied % 500 == 0:
                print(f"  {copied}개 복원 완료...")

        except Exception as e:
            errors += 1
            print(f"  오류: {src.name} - {e}")

    print("\n📊 처리 결과:")
    print(f"  ✅ 루트로 복원(덮어쓰기): {copied}개")
    print(f"  ⏭️  건너뜀: {skipped}개")
    print(f"  ❌ 오류: {errors}개")
    print("\n✅ 작업 완료! 이제 파일형 URL이 대표 콘텐츠를 가지게 됩니다.")


if __name__ == "__main__":
    flip_to_flat_primary()

