#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
원본 파일명으로 리다이렉트 HTML 파일 생성
예: seoul.html → seoul/index.html로 리다이렉트
"""

import os
import re
from pathlib import Path

# 경로 설정
script_path = Path(__file__).resolve()
BASE_DIR = script_path.parent
PUBLIC_DIR = BASE_DIR / "public"

print(f"BASE_DIR: {BASE_DIR}")
print(f"PUBLIC_DIR: {PUBLIC_DIR} (exists: {PUBLIC_DIR.exists()})")
print()

if not PUBLIC_DIR.exists():
    print(f"오류: {PUBLIC_DIR} 폴더를 찾을 수 없습니다.")
    exit(1)

# 지역 매핑
REGION_MAP = {
    'seoul': 'seoul',
    'busan': 'busan',
    'daegu': 'daegu',
    'incheon': 'incheon',
    'gyeonggi': 'gyeonggi',
    'daejeon': 'daejeon',
    'gwangju': 'gwangju',
    'ulsan': 'ulsan',
    'jeju': 'jeju',
    'gangwon': 'gangwon',
    'chungbuk': 'chungbuk',
    'chungnam': 'chungnam',
    'jeonbuk': 'jeonbuk',
    'jeonnam': 'jeonnam',
    'gyeongbuk': 'gyeongbuk',
    'gyeongnam': 'gyeongnam',
    'sejong': 'sejong',
}

def parse_filename(filename):
    """파일명을 파싱하여 지역/구/동 구조로 변환"""
    name = filename.replace('.html', '')

    if name in ['index', 'admin', 'aroma']:
        return None

    # company- 접두사 제거
    if name.startswith('company-'):
        name = name.replace('company-', '', 1)

    parts = name.split('-')

    # 단일 지역명 처리 (예: seoul.html -> seoul/)
    if len(parts) == 1:
        region = parts[0]
        if region in REGION_MAP:
            return {
                'region': REGION_MAP[region],
                'path_parts': [],
                'original_name': name
            }
        return None

    if len(parts) < 2:
        return None

    region = parts[0]
    if region not in REGION_MAP:
        return None

    region_folder = REGION_MAP[region]
    rest = parts[1:]

    # 서비스 타입 제거
    service_types = ['aroma', 'massage', 'thai', 'swedish', 'foot', 'outcall', 'spa', 'chinese', 'waxing']
    if rest and rest[-1] in service_types:
        rest = rest[:-1]

    return {
        'region': region_folder,
        'path_parts': rest,
        'original_name': name
    }

def create_redirect_html(original_filename, target_path):
    """리다이렉트 HTML 파일 생성"""
    redirect_html = f'''<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url={target_path}">
    <link rel="canonical" href="https://msg1000.com{target_path}">
    <script>
        window.location.href = "{target_path}";
    </script>
</head>
<body>
    <p>리다이렉트 중... <a href="{target_path}">여기를 클릭하세요</a></p>
</body>
</html>'''
    return redirect_html

def create_redirects():
    """원본 파일명으로 리다이렉트 파일 생성"""
    print("리다이렉트 파일 생성 시작\n")

    html_files = list(PUBLIC_DIR.glob("*.html"))
    exclude_files = ['index.html', 'admin.html']
    html_files = [f for f in html_files if f.name not in exclude_files]

    print(f"처리할 HTML 파일: {len(html_files)}개\n")

    created_count = 0
    skipped_count = 0
    error_count = 0

    for html_file in html_files:
        try:
            parsed = parse_filename(html_file.name)

            if not parsed:
                skipped_count += 1
                continue

            # 폴더 경로 생성
            folder_parts = [parsed['region']] + parsed['path_parts']
            target_path = '/' + '/'.join(folder_parts) + '/'

            # 루트에 원본 파일명으로 리다이렉트 파일 생성
            redirect_file = BASE_DIR / html_file.name

            # 이미 존재하는 경우 확인 (실제 내용이 있는 파일이면 건너뛰기)
            if redirect_file.exists():
                try:
                    with open(redirect_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # 실제 내용이 있는 파일이면 건너뛰기 (리다이렉트가 아님)
                        if len(content) > 1000 and '<meta http-equiv="refresh"' not in content:
                            skipped_count += 1
                            continue
                except:
                    pass

            # 리다이렉트 HTML 생성
            redirect_html = create_redirect_html(html_file.name, target_path)

            with open(redirect_file, 'w', encoding='utf-8') as f:
                f.write(redirect_html)

            created_count += 1
            if created_count % 100 == 0:
                print(f"  {created_count}개 생성 완료...")

        except Exception as e:
            error_count += 1
            print(f"  오류: {html_file.name} - {e}")

    print(f"\n처리 결과:")
    print(f"  리다이렉트 생성: {created_count}개")
    print(f"  건너뜀: {skipped_count}개")
    print(f"  오류: {error_count}개")

    print(f"\n작업 완료!")
    print(f"루트에 리다이렉트 파일들이 생성되었습니다.")

if __name__ == "__main__":
    create_redirects()
