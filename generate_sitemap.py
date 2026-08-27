#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate sitemap.xml for all static HTML files under public/."""

from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
import xml.etree.ElementTree as ET
import re

BASE_URL = "https://msg1000.com"
SCRIPT_DIR = Path(__file__).parent.absolute()
PUBLIC_DIR = SCRIPT_DIR / "public"
OUTPUT_FILE = PUBLIC_DIR / "sitemap.xml"
ROBOTS_TXT = PUBLIC_DIR / "robots.txt"

# robots.txt에서 Disallow된 경로 목록 추출
def get_disallowed_paths() -> set[str]:
    """robots.txt에서 Disallow된 경로를 읽어서 반환"""
    disallowed = set()
    
    if not ROBOTS_TXT.exists():
        print(f"[경고] robots.txt 파일을 찾을 수 없습니다: {ROBOTS_TXT}")
        return disallowed
    
    try:
        with open(ROBOTS_TXT, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Disallow: /path 패턴 찾기 (주석 처리된 것 제외)
        lines = content.split('\n')
        for line in lines:
            line = line.strip()
            # 주석 제거
            if '#' in line:
                line = line[:line.index('#')].strip()
            
            # Disallow: 패턴 찾기
            if line.startswith('Disallow:'):
                # Disallow: 뒤의 경로 추출
                path = line[9:].strip()  # "Disallow:" 제거
                
                # 경로 정규화 (앞의 / 제거)
                if path.startswith('/'):
                    path = path[1:]
                
                # .html이 없고 경로가 있으면 .html 추가 (JS, JSON 등은 제외)
                if path and not path.endswith(('.html', '.js', '.json', '.md')):
                    if path.endswith('/'):
                        path = path[:-1]
                    if path:
                        path = path + '.html'
                
                # HTML 파일만 추가
                if path and path.endswith('.html'):
                    disallowed.add(path)
        
        if disallowed:
            print(f"[정보] robots.txt에서 차단된 파일: {', '.join(sorted(disallowed))}")
                
    except Exception as e:
        print(f"[경고] robots.txt 읽기 오류: {e}")
    
    return disallowed


def build_url_entry(urlset: ET.Element, loc: str, lastmod: datetime, *, priority: float, changefreq: str) -> None:
    url = ET.SubElement(urlset, "url")
    ET.SubElement(url, "loc").text = loc
    ET.SubElement(url, "lastmod").text = lastmod.strftime("%Y-%m-%d")
    ET.SubElement(url, "changefreq").text = changefreq
    ET.SubElement(url, "priority").text = f"{priority:.1f}"


def compute_priority(filename: str) -> float:
    if filename == "index.html":
        return 1.0
    if "-" not in filename:
        return 0.9
    return 0.7


def canonical_url_for(path: Path) -> str:
    if path.name == "index.html":
        return BASE_URL
    return f"{BASE_URL}/{path.name}"


def is_file_valid(html_file: Path) -> bool:
    """파일이 유효한지 확인 (빈 파일이 아니고 최소한의 내용이 있는지)"""
    try:
        # 파일 크기 확인 (최소 1KB 이상)
        if html_file.stat().st_size < 1024:
            return False
        
        # 파일 내용 확인 (최소한 <html> 태그가 있는지)
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read(5000)  # 처음 5KB만 읽기
            if '<html' not in content.lower() and '<!doctype' not in content.lower():
                return False
        
        return True
    except Exception:
        return False


def iter_html_files() -> list[Path]:
    """유효한 HTML 파일 목록 반환 (robots.txt에서 차단된 파일 제외)"""
    disallowed = get_disallowed_paths()
    
    files = sorted(PUBLIC_DIR.glob("*.html"))
    files.sort(key=lambda path: (path.name != "index.html", path.name))
    
    # 필터링: robots.txt에서 차단된 파일과 유효하지 않은 파일 제외
    valid_files = []
    excluded_count = 0
    invalid_count = 0
    
    for html_file in files:
        # robots.txt에서 차단된 파일 제외
        if html_file.name in disallowed:
            excluded_count += 1
            continue
        
        # 유효하지 않은 파일 제외
        if not is_file_valid(html_file):
            invalid_count += 1
            continue
        
        valid_files.append(html_file)
    
    if excluded_count > 0:
        print(f"[정보] robots.txt에서 차단된 파일 {excluded_count}개 제외됨")
    if invalid_count > 0:
        print(f"[경고] 유효하지 않은 파일 {invalid_count}개 제외됨")
    
    return valid_files


def generate_sitemap() -> ET.ElementTree:
    urlset = ET.Element("urlset", attrib={"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"})

    html_files = iter_html_files()
    
    for html_file in html_files:
        stat = html_file.stat()
        last_modified = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc)
        loc = canonical_url_for(html_file)
        priority = compute_priority(html_file.name)
        changefreq = "daily" if html_file.name == "index.html" else "weekly"
        build_url_entry(urlset, loc, last_modified, priority=priority, changefreq=changefreq)

    return ET.ElementTree(urlset)


def indent(element: ET.Element, level: int = 0) -> None:
    indent_str = "\n" + "  " * level
    if len(element):
        if not element.text or not element.text.strip():
            element.text = indent_str + "  "
        for child in element:
            indent(child, level + 1)
            if not child.tail or not child.tail.strip():
                child.tail = indent_str + "  "
        if not element[-1].tail or not element[-1].tail.strip():
            element[-1].tail = indent_str
    else:
        if level and (not element.tail or not element.tail.strip()):
            element.tail = indent_str


def write_sitemap(tree: ET.ElementTree) -> None:
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    indent(tree.getroot())
    
    # XML 선언과 네임스페이스를 올바르게 포함하여 작성
    # ElementTree의 write 메서드는 기본 네임스페이스를 올바르게 처리합니다
    tree.write(OUTPUT_FILE, encoding="utf-8", xml_declaration=True)


def main() -> None:
    if not PUBLIC_DIR.exists():
        raise FileNotFoundError("public directory not found")

    print("sitemap.xml 생성 중...")
    print(f"   - robots.txt에서 차단된 파일 자동 제외")
    print(f"   - 유효하지 않은 파일 자동 제외")
    
    tree = generate_sitemap()
    write_sitemap(tree)
    
    html_files = iter_html_files()
    print(f"[완료] sitemap.xml 생성 완료: {len(html_files)}개 URL 포함")
    print(f"   저장 위치: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
