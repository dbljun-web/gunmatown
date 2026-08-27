#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
루트의 모든 HTML 파일에서 www.msg1000.com을 msg1000.com으로 변경
- JSON-LD 구조화된 데이터
- CSS 경로 따옴표 중복 제거
"""

import re
from pathlib import Path

# 경로 설정
script_path = Path(__file__).resolve()
BASE_DIR = script_path.parent

print(f"BASE_DIR: {BASE_DIR}")
print()

def fix_www_urls(content: str) -> str:
    """www.msg1000.com을 msg1000.com으로 변경 (non-www로 통일)"""
    # JSON-LD 및 모든 곳에서 www 제거 (non-www로 통일)
    content = re.sub(
        r'https://www\.msg1000\.com',
        'https://msg1000.com',
        content,
    )

    # CSS 경로 따옴표 중복 제거
    content = re.sub(
        r'href=["\']css/style\.css""',
        r'href="css/style.css"',
        content,
    )

    return content

def fix_all_html_files():
    html_files = list(BASE_DIR.glob("*.html"))

    # 제외할 파일들
    exclude = {"index.html", "admin.html"}
    html_files = [f for f in html_files if f.name not in exclude]

    print(f"처리할 HTML 파일: {len(html_files)}개\n")

    fixed = 0
    errors = 0

    for html_file in html_files:
        try:
            # 파일 읽기
            with open(html_file, "r", encoding="utf-8") as f:
                content = f.read()

            # 수정 전 내용 저장
            original_content = content

            # www URL 수정
            new_content = fix_www_urls(content)

            # 변경사항이 있으면 저장
            if new_content != original_content:
                with open(html_file, "w", encoding="utf-8") as f:
                    f.write(new_content)
                fixed += 1
                if fixed % 100 == 0:
                    print(f"  {fixed}개 파일 수정 완료...")

        except Exception as e:
            errors += 1
            print(f"  오류: {html_file.name} - {e}")

    print("\n처리 결과:")
    print(f"  수정된 파일: {fixed}개")
    print(f"  오류: {errors}개")
    print("\n작업 완료!")

if __name__ == "__main__":
    fix_all_html_files()
