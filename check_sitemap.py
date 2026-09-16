#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""sitemap.xml에 포함된 HTML 파일 확인"""
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
SITEMAP_FILE = ROOT / "sitemap.xml"
SKIP = {"shop-edit.html", "login.html"}

tree = ET.parse(SITEMAP_FILE)
urls = tree.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
sitemap_files = set()
for url in urls:
    if not url.text:
        continue
    path = url.text.replace("https://gunmatown.com/", "").split("?")[0]
    if path in ("", "/"):
        sitemap_files.add("index.html")
    elif path.endswith(".html"):
        sitemap_files.add(path)

html_files = {f.name for f in ROOT.glob("*.html")} - SKIP
print(f"sitemap.xml URL 수: {len(urls)}")
print(f"사이트 HTML 파일 수(관리자 제외): {len(html_files)}")

missing = html_files - sitemap_files
if missing:
    print(f"[경고] sitemap에 없는 파일 {len(missing)}개")
    for name in sorted(missing)[:20]:
        print(f"  - {name}")
else:
    print("[완료] 공개 HTML이 sitemap에 포함되어 있습니다.")
