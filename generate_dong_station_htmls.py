#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
모든 동/역에 대한 HTML 파일을 생성하는 스크립트
- 지역 + 세부지역 + 동,역.html (타입 없음)
- 지역 + 세부지역 + 동,역 + 타입.html (각 타입별)
"""

import os
import re
import json
from pathlib import Path

# 타입 목록
TYPES = ['massage', 'outcall', 'swedish', 'thai', 'aroma', 'waxing', 'chinese', 'foot', 'spa']

# 타입별 한글명
TYPE_NAMES = {
    'massage': '마사지',
    'outcall': '출장마사지',
    'swedish': '스웨디시',
    'thai': '타이마사지',
    'aroma': '아로마마사지',
    'waxing': '왁싱',
    'chinese': '중국마사지',
    'foot': '발마사지',
    'spa': '스파',
}

# script.js에서 districtMap 추출
def extract_district_map(script_path):
    """script.js 파일에서 districtMap 데이터를 추출"""
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # window.districtMap = { ... } 부분 찾기
    # 간단한 파싱 (실제로는 더 정교한 파싱이 필요할 수 있음)
    # 여기서는 JavaScript 객체를 Python dict로 변환하는 간단한 방법 사용
    
    # districtMap 시작 위치 찾기
    start_idx = content.find('window.districtMap = {')
    if start_idx == -1:
        print("districtMap을 찾을 수 없습니다.")
        return None
    
    # 중괄호 매칭으로 districtMap 끝 찾기
    brace_count = 0
    start_found = False
    end_idx = start_idx
    
    for i in range(start_idx, len(content)):
        if content[i] == '{':
            brace_count += 1
            start_found = True
        elif content[i] == '}':
            brace_count -= 1
            if start_found and brace_count == 0:
                end_idx = i + 1
                break
    
    district_map_str = content[start_idx:end_idx]
    
    # JavaScript 객체를 Python dict로 변환하기 위해
    # 간단한 정규식 기반 파싱 사용
    # 실제로는 더 정교한 파서가 필요할 수 있음
    
    return district_map_str

# script.js를 직접 읽어서 districtMap 구조 파싱
def parse_district_map_from_js(script_path):
    """script.js에서 districtMap을 파싱하여 구조 추출"""
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    district_map = {}
    
    # window.districtMap = { 시작 위치 찾기
    start_pattern = r'window\.districtMap\s*=\s*\{'
    match = re.search(start_pattern, content)
    if not match:
        print("districtMap을 찾을 수 없습니다.")
        return None
    
    start_pos = match.end() - 1  # '{' 위치
    
    # 중괄호 매칭으로 districtMap 끝 찾기
    brace_count = 0
    i = start_pos
    while i < len(content):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_pos = i + 1
                break
        i += 1
    else:
        print("districtMap의 끝을 찾을 수 없습니다.")
        return None
    
    district_map_str = content[start_pos:end_pos]
    
    # 지역별로 파싱
    # 지역 패턴: region_key: { regionName: '...', districts: { ... } }
    region_pattern = r'(\w+):\s*\{[^}]*regionName:\s*[\'"]([^\'"]+)[\'"][^}]*districts:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}'
    
    # 더 간단한 방법: 라인별로 파싱
    lines = district_map_str.split('\n')
    current_region = None
    current_district = None
    in_dong_stations = False
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # 빈 줄이나 주석 건너뛰기
        if not line or line.startswith('//'):
            i += 1
            continue
        
        # 지역 시작 (예: jeju: {)
        region_match = re.match(r'(\w+):\s*\{', line)
        if region_match and region_match.group(1) not in ['window', 'districtMap']:
            current_region = region_match.group(1)
            district_map[current_region] = {
                'regionName': '',
                'districts': {}
            }
            # regionName 찾기
            i += 1
            while i < len(lines) and 'districts:' not in lines[i]:
                name_match = re.search(r"regionName:\s*['\"]([^'\"]+)['\"]", lines[i])
                if name_match:
                    district_map[current_region]['regionName'] = name_match.group(1)
                i += 1
            continue
        
        # 세부지역 시작 (예: gangnam: {)
        if current_region and re.match(r'(\w+):\s*\{', line):
            district_match = re.match(r'(\w+):\s*\{', line)
            if district_match and district_match.group(1) != 'districts':
                current_district = district_match.group(1)
                district_map[current_region]['districts'][current_district] = {
                    'districtsname': '',
                    'dongStations': {}
                }
                # districtsname 찾기
                i += 1
                while i < len(lines) and 'dongStations:' not in lines[i]:
                    name_match = re.search(r"districtsname:\s*['\"]([^'\"]+)['\"]", lines[i])
                    if name_match:
                        district_map[current_region]['districts'][current_district]['districtsname'] = name_match.group(1)
                    if '},' in lines[i] or (lines[i].strip() == '}' and i < len(lines) - 1 and lines[i+1].strip().startswith('}')):
                        break
                    i += 1
                continue
        
        # dongStations 시작
        if current_region and current_district and 'dongStations:' in line:
            in_dong_stations = True
            i += 1
            while i < len(lines):
                dong_line = lines[i].strip()
                
                # 동/역 항목 (예: 'yeoksam-dong': '역삼동',)
                # 더 유연한 패턴: 작은따옴표나 큰따옴표 모두 지원, 하이픈 포함 키
                dong_match = re.search(r"['\"]([\w-]+)['\"]:\s*['\"]([^'\"]+)['\"]", dong_line)
                if dong_match:
                    dong_key = dong_match.group(1)
                    dong_name = dong_match.group(2)
                    district_map[current_region]['districts'][current_district]['dongStations'][dong_key] = dong_name
                elif '},' in dong_line or (dong_line == '}' and i < len(lines) - 1):
                    # dongStations 끝
                    in_dong_stations = False
                    break
                i += 1
            continue
        
        i += 1
    
    return district_map

# HTML 템플릿 읽기
def read_html_template(template_path):
    """기존 HTML 파일을 템플릿으로 읽기"""
    with open(template_path, 'r', encoding='utf-8') as f:
        return f.read()

# HTML 파일 생성
def generate_html_file(output_path, region_key, region_name, district_key, district_name, dong_key, dong_name, filter_type=None):
    """HTML 파일 생성"""
    
    # 템플릿 파일 경로
    template_path = Path(__file__).parent / 'public' / 'seoul-gangnam-massage.html'
    
    if not template_path.exists():
        print(f"템플릿 파일을 찾을 수 없습니다: {template_path}")
        return False
    
    # 템플릿 읽기
    template = read_html_template(template_path)
    
    # 파일명 생성
    if filter_type:
        filename = f"{region_key}-{district_key}-{dong_key}-{filter_type}.html"
        title_suffix = TYPE_NAMES.get(filter_type, filter_type)
    else:
        filename = f"{region_key}-{district_key}-{dong_key}.html"
        title_suffix = "마사지"
    
    # 제목 및 메타 태그 생성
    page_title = f"{region_name} {district_name} {dong_name} {title_suffix} 추천 BEST 샵｜안마·힐링 1위샵 가격·후기"
    meta_description = f"{region_name} {district_name} {dong_name} {title_suffix} BEST 샵 실시간 순위★ 시내·역세권 안마, 힐링마사지, 전신마사지 가격 비교. 검증된 1위 샵만 골라서 0507 전화로 바로 예약 가능. 실제 후기 100+ 확인하세요!"
    
    # 템플릿 내용 교체
    html_content = template
    
    # 제목 교체
    html_content = re.sub(
        r'<title>.*?</title>',
        f'<title>{page_title}</title>',
        html_content
    )
    
    # 메타 description 교체
    html_content = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*"',
        f'<meta name="description" content="{meta_description}"',
        html_content
    )
    
    # canonical URL 교체
    canonical_url = f"https://msg1000.com/{filename}"
    html_content = re.sub(
        r'<link rel="canonical" href="[^"]*"',
        f'<link rel="canonical" href="{canonical_url}"',
        html_content
    )
    
    # Open Graph 태그 교체
    html_content = re.sub(
        r'<meta property="og:title" content="[^"]*"',
        f'<meta property="og:title" content="{page_title}"',
        html_content
    )
    html_content = re.sub(
        r'<meta property="og:description" content="[^"]*"',
        f'<meta property="og:description" content="{meta_description}"',
        html_content
    )
    html_content = re.sub(
        r'<meta property="og:url" content="[^"]*"',
        f'<meta property="og:url" content="{canonical_url}"',
        html_content
    )
    
    # Twitter Card 태그 교체
    html_content = re.sub(
        r'<meta name="twitter:title" content="[^"]*"',
        f'<meta name="twitter:title" content="{page_title}"',
        html_content
    )
    html_content = re.sub(
        r'<meta name="twitter:description" content="[^"]*"',
        f'<meta name="twitter:description" content="{meta_description}"',
        html_content
    )
    
    # resultsTitle 교체
    results_title = f"{region_name} {district_name} {dong_name} {title_suffix} 추천 BEST 샵"
    html_content = re.sub(
        r'<h1 id="resultsTitle">[^<]*</h1>',
        f'<h1 id="resultsTitle">{results_title}</h1>',
        html_content
    )
    
    # 지역/세부지역 설정 스크립트 교체
    # currentRegion 설정
    html_content = re.sub(
        r"currentRegion = '[^']*'",
        f"currentRegion = '{region_name}'",
        html_content
    )
    
    # regionSelect value 설정
    html_content = re.sub(
        r"regionSelect\.value = '[^']*'",
        f"regionSelect.value = '{region_name}'",
        html_content
    )
    
    # districtSelect value 설정
    html_content = re.sub(
        r"districtSelect\.value = '[^']*'",
        f"districtSelect.value = '{district_name}'",
        html_content
    )
    
    # currentDistrict 설정
    html_content = re.sub(
        r"currentDistrict = '[^']*'",
        f"currentDistrict = '{district_name}'",
        html_content
    )
    
    # currentFilter 설정 (필터 타입이 있는 경우)
    if filter_type:
        html_content = re.sub(
            r"currentFilter = '[^']*'",
            f"currentFilter = '{filter_type}'",
            html_content
        )
        html_content = re.sub(
            r"window\.currentFilter = '[^']*'",
            f"window.currentFilter = '{filter_type}'",
            html_content
        )
    
    # placeholder 텍스트 교체
    html_content = re.sub(
        r'placeholder="서울 강남 지역 또는 키워드를 입력하세요"',
        f'placeholder="{region_name} {district_name} {dong_name} 지역 또는 키워드를 입력하세요"',
        html_content
    )
    
    # footer 링크 교체
    html_content = re.sub(
        r'서울 강남마사지정보',
        f'{region_name} {district_name}{title_suffix}정보',
        html_content
    )
    
    # 파일 저장
    output_file = Path(__file__).parent / 'public' / filename
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return True

def main():
    """메인 함수"""
    script_path = Path(__file__).parent / 'public' / 'script.js'
    
    if not script_path.exists():
        print(f"script.js 파일을 찾을 수 없습니다: {script_path}")
        return
    
    print("districtMap 파싱 중...")
    district_map = parse_district_map_from_js(script_path)
    
    if not district_map:
        print("districtMap을 파싱할 수 없습니다.")
        return
    
    print(f"파싱 완료: {len(district_map)}개 지역")
    
    # 디버깅: 파싱 결과 확인
    for region_key, region_data in district_map.items():
        print(f"  지역: {region_key}, 이름: {region_data.get('regionName', 'N/A')}, 세부지역 수: {len(region_data.get('districts', {}))}")
        for district_key, district_data in region_data.get('districts', {}).items():
            dong_count = len(district_data.get('dongStations', {}))
            print(f"    세부지역: {district_key}, 동/역 수: {dong_count}")
    
    # 모든 동/역에 대해 HTML 파일 생성
    total_files = 0
    
    for region_key, region_data in district_map.items():
        region_name = region_data.get('regionName', region_key)
        districts = region_data.get('districts', {})
        
        if not districts:
            print(f"경고: {region_key}에 세부지역이 없습니다.")
            continue
        
        for district_key, district_data in districts.items():
            district_name = district_data.get('districtsname', district_key)
            dong_stations = district_data.get('dongStations', {})
            
            if not dong_stations:
                print(f"경고: {region_key}-{district_key}에 동/역이 없습니다.")
                continue
            
            for dong_key, dong_name in dong_stations.items():
                # 타입 없이 생성 (all)
                output_path = Path(__file__).parent / 'public' / f"{region_key}-{district_key}-{dong_key}.html"
                if generate_html_file(output_path, region_key, region_name, district_key, district_name, dong_key, dong_name, None):
                    total_files += 1
                    if total_files % 100 == 0:
                        print(f"진행 중... {total_files}개 파일 생성됨")
                
                # 각 타입별로 생성
                for filter_type in TYPES:
                    output_path = Path(__file__).parent / 'public' / f"{region_key}-{district_key}-{dong_key}-{filter_type}.html"
                    if generate_html_file(output_path, region_key, region_name, district_key, district_name, dong_key, dong_name, filter_type):
                        total_files += 1
                        if total_files % 100 == 0:
                            print(f"진행 중... {total_files}개 파일 생성됨")
    
    print(f"\n총 {total_files}개 파일 생성 완료!")

if __name__ == '__main__':
    main()

