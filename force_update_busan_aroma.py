#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""busan-aroma.html 강제 업데이트"""

import re
from pathlib import Path

file_path = Path("busan-aroma.html")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# og:title 추출
og_match = re.search(r'<meta\s+property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']', content, re.I)
og_title = og_match.group(1).strip() if og_match else None

print(f"현재 og:title: '{og_title}'")

# 사용자가 원하는 og:title 값
desired_og_title = "부산 아로마마사지 추천 BEST 샵｜아로마·힐링 1위샵 가격·후기"

# og:title 업데이트
if og_title != desired_og_title:
    content = re.sub(
        r'<meta\s+property=["\']og:title["\'][^>]*content=["\'][^"\']+["\'][^>]*>',
        f'<meta property="og:title" content="{desired_og_title}" />',
        content,
        flags=re.IGNORECASE
    )
    print(f"og:title 업데이트: '{og_title}' -> '{desired_og_title}'")
else:
    print("og:title은 이미 원하는 값입니다.")

# title을 og:title과 동일하게 업데이트
content = re.sub(
    r"<title>.*?</title>",
    f"<title>{desired_og_title}</title>",
    content,
    flags=re.IGNORECASE | re.DOTALL,
)

# 파일 저장
with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"title 업데이트 완료: '{desired_og_title}'")
print("완료!")
