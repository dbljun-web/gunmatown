#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""busan-aroma.html 정확한 값 확인"""

import re
import html
from pathlib import Path

file_path = Path("busan-aroma.html")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# title 추출
title_match = re.search(r"<title>(.*?)</title>", content, flags=re.IGNORECASE | re.DOTALL)
title = title_match.group(1).strip() if title_match else None

# og:title 추출
og_match = re.search(r'<meta\s+property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']', content, re.I)
og_title = og_match.group(1).strip() if og_match else None

print("=" * 80)
print("원본 값 (파일에서 직접 추출):")
print(f"title: '{title}'")
print(f"og:title: '{og_title}'")
print("=" * 80)

# HTML 엔티티 디코딩
title_decoded = html.unescape(title) if title else ""
og_title_decoded = html.unescape(og_title) if og_title else ""

print("\n디코딩된 값:")
print(f"title: '{title_decoded}'")
print(f"og:title: '{og_title_decoded}'")
print("=" * 80)

# 비교
print(f"\n동일 여부: {title_decoded == og_title_decoded}")
print(f"title 길이: {len(title_decoded)}")
print(f"og:title 길이: {len(og_title_decoded)}")

# 바이트 단위 비교
print("\n바이트 단위 비교:")
print(f"title bytes: {title_decoded.encode('utf-8')}")
print(f"og:title bytes: {og_title_decoded.encode('utf-8')}")

# 실제로 다른 부분 찾기
if title_decoded != og_title_decoded:
    print("\n다른 부분:")
    min_len = min(len(title_decoded), len(og_title_decoded))
    for i in range(min_len):
        if title_decoded[i] != og_title_decoded[i]:
            print(f"  위치 {i}: title='{title_decoded[i]}' vs og:title='{og_title_decoded[i]}'")
            break
