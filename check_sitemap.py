#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sitemap.xml에 포함된 HTML 파일 확인"""
from pathlib import Path
import xml.etree.ElementTree as ET

SCRIPT_DIR = Path(__file__).parent.absolute()
PUBLIC_DIR = SCRIPT_DIR / "public"
SITEMAP_FILE = PUBLIC_DIR / "sitemap.xml"

# sitemap.xml에서 HTML URL 추출
tree = ET.parse(SITEMAP_FILE)
urls = tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
sitemap_files = set()
for url in urls:
    if url.text:
        # https://msg1000.com/file.html -> file.html
        filename = url.text.split('/')[-1]
        if filename.endswith('.html'):
            sitemap_files.add(filename)

# public 디렉토리의 HTML 파일 목록
public_html_files = {f.name for f in PUBLIC_DIR.glob('*.html')}

print(f"sitemap.xml에 포함된 HTML 파일 수: {len(sitemap_files)}")
print(f"public 디렉토리의 HTML 파일 수: {len(public_html_files)}")
print()

# 포함되지 않은 파일 확인
missing_files = public_html_files - sitemap_files
if missing_files:
    print(f"[경고] sitemap.xml에 포함되지 않은 파일 ({len(missing_files)}개):")
    for f in sorted(missing_files)[:20]:  # 처음 20개만 표시
        print(f"  - {f}")
    if len(missing_files) > 20:
        print(f"  ... 외 {len(missing_files) - 20}개")
else:
    print("[완료] 모든 HTML 파일이 sitemap.xml에 포함되어 있습니다!")

# sitemap에만 있는 파일 (존재하지 않는 파일)
extra_files = sitemap_files - public_html_files
if extra_files:
    print(f"\n[경고] sitemap.xml에는 있지만 실제로 존재하지 않는 파일 ({len(extra_files)}개):")
    for f in sorted(extra_files)[:20]:
        print(f"  - {f}")
    if len(extra_files) > 20:
        print(f"  ... 외 {len(extra_files) - 20}개")

