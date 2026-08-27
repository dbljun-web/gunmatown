#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
company- 접두사 파일들의 실제 위치를 찾아 리다이렉트 경로 수정
"""

import os
from pathlib import Path

# 경로 설정
script_path = Path(__file__).resolve()
BASE_DIR = script_path.parent

print(f"BASE_DIR: {BASE_DIR}\n")

# company- 파일들의 실제 위치 찾기
company_files = list(BASE_DIR.glob("company-*.html"))

print(f"찾은 company- 파일: {len(company_files)}개\n")

for company_file in company_files[:10]:  # 처음 10개만 확인
    print(f"파일: {company_file.name}")

    # 파일명에서 company- 제거하고 실제 경로 찾기
    name_without_company = company_file.name.replace('company-', '')
    name_without_ext = name_without_company.replace('.html', '')

    # 여러 가능한 경로 확인
    possible_paths = [
        f"/{name_without_ext}/",
        f"/seoul/{name_without_ext}/",
    ]

    print(f"  가능한 경로: {possible_paths}")
    print()
