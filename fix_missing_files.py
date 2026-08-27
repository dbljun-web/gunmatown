#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
기본 템플릿 파일을 실제 내용으로 교체하는 스크립트
public/ 폴더의 파일이 아직 변환되지 않은 경우 처리
"""

import os
import shutil
import re
from pathlib import Path

# 경로 설정
script_path = Path(__file__).resolve()
BASE_DIR = script_path.parent
PUBLIC_DIR = BASE_DIR / "public"

print(f"📂 BASE_DIR: {BASE_DIR}")
print(f"📂 PUBLIC_DIR: {PUBLIC_DIR} (exists: {PUBLIC_DIR.exists()})")
print()

if not PUBLIC_DIR.exists():
    print(f"❌ 오류: {PUBLIC_DIR} 폴더를 찾을 수 없습니다.")
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

def update_html_paths(file_path, depth, new_url_path):
    """HTML 파일의 경로를 새로운 구조에 맞게 수정"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    prefix = '../' * depth if depth > 0 else ''

    # CSS 경로 수정
    content = re.sub(r'href=["\']style\.css([^"\']*)', rf'href="{prefix}css/style.css\1', content)
    content = re.sub(r'href=["\']\./style\.css([^"\']*)', rf'href="{prefix}css/style.css\1', content)

    # JS 경로 수정
    js_files = ['script.js', 'detail.js', 'common-components.js', 'common-components.min.js',
                'shop-card-data.js', 'shop-manager.js', 'generate-pages.js']

    for js_file in js_files:
        content = re.sub(f'src=["\']{re.escape(js_file)}([^"\']*)', rf'src="{prefix}js/{js_file}\1', content)
        content = re.sub(f'src=["\']\\./{re.escape(js_file)}([^"\']*)', rf'src="{prefix}js/{js_file}\1', content)

    # base href 수정
    if depth == 0:
        base_href = './'
    else:
        base_href = '../' * depth
    content = re.sub(r'<base href=["\'][^"\']*["\']', f'<base href="{base_href}"', content)

    # canonical URL 수정
    new_canonical = f'https://msg1000.com/{new_url_path}'
    content = re.sub(r'<link rel="canonical" href="https://msg1000\.com/[^"]*"',
                     f'<link rel="canonical" href="{new_canonical}"', content)

    # og:url 수정
    content = re.sub(r'<meta property="og:url" content="https://msg1000\.com/[^"]*"',
                     f'<meta property="og:url" content="{new_canonical}"', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def is_template_file(file_path):
    """기본 템플릿 파일인지 확인"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # 기본 템플릿 파일은 "내용 추가 예정"이라는 주석이 있음
            if '내용 추가 예정' in content and len(content) < 500:
                return True
    except:
        pass
    return False

def fix_missing_files():
    """기본 템플릿 파일을 실제 내용으로 교체"""
    print("🔧 기본 템플릿 파일 교체 시작\n")

    html_files = list(PUBLIC_DIR.glob("*.html"))
    exclude_files = ['index.html', 'admin.html']
    html_files = [f for f in html_files if f.name not in exclude_files]

    print(f"📋 확인할 HTML 파일: {len(html_files)}개\n")

    replaced_count = 0
    skipped_count = 0

    for html_file in html_files:
        try:
            parsed = parse_filename(html_file.name)

            if not parsed:
                skipped_count += 1
                continue

            # 폴더 경로 생성
            folder_parts = [parsed['region']] + parsed['path_parts']
            target_dir = BASE_DIR / Path(*folder_parts)
            target_file = target_dir / "index.html"

            # 타겟 파일이 존재하고 기본 템플릿인 경우 교체
            if target_file.exists() and is_template_file(target_file):
                # 파일 복사
                shutil.copy2(html_file, target_file)

                # 경로 수정
                depth = len(folder_parts)
                new_url_path = '/'.join(folder_parts) + '/'
                update_html_paths(target_file, depth, new_url_path)

                replaced_count += 1
                if replaced_count % 100 == 0:
                    print(f"  ✅ {replaced_count}개 교체 완료...")

        except Exception as e:
            print(f"  ❌ {html_file.name} - 오류: {e}")

    print(f"\n📊 처리 결과:")
    print(f"  ✅ 템플릿 교체: {replaced_count}개")
    print(f"  ⏭️  건너뜀: {skipped_count}개")

    print(f"\n✅ 작업 완료!")

if __name__ == "__main__":
    fix_missing_files()
