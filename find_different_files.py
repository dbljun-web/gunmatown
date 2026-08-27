#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""title과 og:title이 다른 파일 찾기"""

import re
import html
from pathlib import Path

BASE_DIR = Path(__file__).parent
html_files = list(BASE_DIR.glob("*.html"))
exclude = {"index.html", "admin.html"}
html_files = [f for f in html_files if f.name not in exclude]

print(f"총 {len(html_files)}개 파일 확인 중...\n")

different_count = 0
same_count = 0
no_og_count = 0

for html_file in html_files[:100]:  # 처음 100개만 확인
    try:
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()

        # title 추출
        title_match = re.search(r"<title>(.*?)</title>", content, flags=re.IGNORECASE | re.DOTALL)
        title = title_match.group(1).strip() if title_match else None

        # og:title 추출
        og_match = re.search(r'<meta\s+property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']', content, re.I)
        og_title = og_match.group(1).strip() if og_match else None

        if not og_title:
            no_og_count += 1
            continue

        # HTML 엔티티 디코딩
        title_decoded = html.unescape(title).strip() if title else ""
        og_title_decoded = html.unescape(og_title).strip()

        # 비교
        if title_decoded != og_title_decoded:
            different_count += 1
            print(f"[다름] {html_file.name}:")
            print(f"  title: '{title_decoded[:60]}...'")
            print(f"  og:title: '{og_title_decoded[:60]}...'")
            print()
        else:
            same_count += 1

    except Exception as e:
        print(f"[오류] {html_file.name}: {e}")

print(f"\n결과:")
print(f"  동일: {same_count}개")
print(f"  다름: {different_count}개")
print(f"  og:title 없음: {no_og_count}개")
