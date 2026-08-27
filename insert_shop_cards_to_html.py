#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
shop-card-data.js의 업체 카드 데이터를 사용하여
모든 지역/세부지역/타입필터 HTML 파일의 본문에 정적으로 업체 카드를 삽입하는 스크립트
"""
import sys
import re
import json
import html
import random
from pathlib import Path
import os

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 스크립트 파일의 디렉토리 경로 (스크립트 위치 기준)
SCRIPT_DIR = Path(__file__).parent.absolute()

# shop-card-data.js 파일 읽기 (add_jsonld_to_html.py의 함수 재사용)
def read_shop_card_data():
    """shop-card-data.js에서 업체 데이터 추출"""
    shop_data_file = SCRIPT_DIR / 'public' / 'shop-card-data.js'
    if not shop_data_file.exists():
        print(f"ERROR: {shop_data_file} 파일을 찾을 수 없습니다.")
        return []
    
    content = shop_data_file.read_text(encoding='utf-8')
    
    # window.shopCardData = [...] 부분 추출
    match = re.search(r'window\.shopCardData\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        print("ERROR: shopCardData를 찾을 수 없습니다.")
        return []
    
    shops_str = match.group(1)
    shops = []
    
    # 중괄호로 객체 구분
    brace_count = 0
    start_idx = -1
    
    i = 0
    while i < len(shops_str):
        if shops_str[i] == '{':
            if brace_count == 0:
                start_idx = i
            brace_count += 1
        elif shops_str[i] == '}':
            brace_count -= 1
            if brace_count == 0 and start_idx >= 0:
                obj_str = shops_str[start_idx:i+1]
                shop = {}
                
                # image 필드 추출
                image_pattern = r'image\s*:\s*\'([^\']+)\''
                image_match = re.search(image_pattern, obj_str)
                if image_match:
                    shop['image'] = image_match.group(1)
                
                # alt 필드 추출
                alt_pattern = r'alt\s*:\s*\'([^\']+)\''
                alt_match = re.search(alt_pattern, obj_str)
                if alt_match:
                    shop['alt'] = alt_match.group(1)
                
                # reviews 필드 추출
                reviews_match = re.search(r'reviews\s*:\s*\[(.*?)\]', obj_str, re.DOTALL)
                if reviews_match:
                    reviews_content = reviews_match.group(1)
                    reviews = []
                    review_blocks = re.finditer(r'\{\s*(.*?)\s*\}', reviews_content, re.DOTALL)
                    for review_block in review_blocks:
                        review_obj_str = review_block.group(1)
                        author_match = re.search(r'author\s*:\s*\'([^\']+)\'', review_obj_str)
                        rating_match = re.search(r'rating\s*:\s*([\d.]+)', review_obj_str)
                        date_match = re.search(r'date\s*:\s*\'([^\']+)\'', review_obj_str)
                        review_match = re.search(r'review\s*:\s*\'([^\']+)\'', review_obj_str)
                        
                        if author_match and rating_match and date_match and review_match:
                            try:
                                rating = float(rating_match.group(1)) if '.' in rating_match.group(1) else int(rating_match.group(1))
                            except:
                                rating = 0
                            reviews.append({
                                'author': author_match.group(1),
                                'rating': rating,
                                'date': date_match.group(1),
                                'review': review_match.group(1)
                            })
                    if reviews:
                        shop['reviews'] = reviews
                
                # 나머지 필드 추출
                field_pattern = r'(\w+)\s*:\s*'
                field_matches = list(re.finditer(field_pattern, obj_str))
                
                for idx, field_match in enumerate(field_matches):
                    key = field_match.group(1)
                    if key in ['image', 'alt', 'reviews']:
                        continue
                    
                    field_start = field_match.end()
                    if idx + 1 < len(field_matches):
                        potential_end = field_matches[idx + 1].start()
                        next_field_pattern = r',\s*\n\s*' + re.escape(field_matches[idx + 1].group(1)) + r'\s*:'
                        next_match = re.search(next_field_pattern, obj_str[field_start:])
                        if next_match:
                            field_end = field_start + next_match.start()
                        else:
                            field_end = potential_end
                    else:
                        field_end = len(obj_str) - 1
                    
                    value_str = obj_str[field_start:field_end].strip()
                    value = None
                    
                    if value_str.strip().startswith('['):
                        bracket_count = 0
                        arr_end = -1
                        for j, char in enumerate(value_str):
                            if char == '[':
                                bracket_count += 1
                            elif char == ']':
                                bracket_count -= 1
                                if bracket_count == 0:
                                    arr_end = j + 1
                                    break
                        if arr_end > 0:
                            arr_content = value_str[:arr_end]
                            arr_items = re.findall(r"'([^']*)'", arr_content)
                            value = arr_items
                    elif value_str.startswith("'") and value_str.endswith("'"):
                        value = value_str[1:-1]
                    elif value_str.startswith('"') and value_str.endswith('"'):
                        value = value_str[1:-1]
                    elif value_str.startswith("'") and not value_str.endswith("'"):
                        quote_start = value_str.find("'")
                        quote_end = value_str.rfind("'")
                        if quote_end > quote_start:
                            value = value_str[quote_start+1:quote_end]
                        else:
                            value = value_str.strip().strip("'").strip(',')
                    elif "'" in value_str and value_str.count("'") >= 2:
                        first_quote = value_str.find("'")
                        last_quote = value_str.rfind("'")
                        if last_quote > first_quote:
                            value = value_str[first_quote+1:last_quote]
                    elif value_str.replace('.', '').replace('-', '').isdigit():
                        value = float(value_str) if '.' in value_str else int(value_str)
                    elif value_str == 'true':
                        value = True
                    elif value_str == 'false':
                        value = False
                    else:
                        value = value_str.strip().rstrip(',').strip()
                        if (value.startswith("'") and value.endswith("'")) or (value.startswith('"') and value.endswith('"')):
                            value = value[1:-1]
                    
                    if value is not None:
                        shop[key] = value
                
                if shop:
                    shops.append(shop)
                
                start_idx = -1
        i += 1
    
    return shops

# 지역 매핑 (add_jsonld_to_html.py와 동일)
REGION_MAP = {
    'jeju': '제주',
    'seoul': '서울',
    'busan': '부산',
    'incheon': '인천',
    'daegu': '대구',
    'gwangju': '광주',
    'daejeon': '대전',
    'ulsan': '울산',
    'sejong': '세종',
    'gyeonggi': '경기',
    'gangwon': '강원',
    'chungbuk': '충북',
    'chungnam': '충남',
    'jeonbuk': '전북',
    'jeonnam': '전남',
    'gyeongbuk': '경북',
    'gyeongnam': '경남',
}

# 세부지역 매핑 (add_jsonld_to_html.py와 동일)
DISTRICT_MAP = {
    'jeju': {
        'si': '제주시',
        'seogwipo': '서귀포',
    },
    'ulsan': {
        'junggu': '중구',
        'namgu': '남구',
        'donggu': '동구',
        'bukgu': '북구',
        'ulju': '울주',
    },
    'seoul': {
        'gangnam': '강남',
        'gangdong': '강동',
        'gangbuk': '강북',
        'gangseo': '강서',
        'gwanak': '관악',
        'gwangjin': '광진',
        'guro': '구로',
        'geumcheon': '금천',
        'nowon': '노원',
        'dobong': '도봉',
        'dongdaemun': '동대문',
        'dongjak': '동작',
        'mapo': '마포',
        'seodaemun': '서대문',
        'seocho': '서초',
        'seongdong': '성동',
        'seongbuk': '성북',
        'songpa': '송파',
        'yangcheon': '양천',
        'yeongdeungpo': '영등포',
        'yongsan': '용산',
        'eunpyeong': '은평',
        'jongno': '종로',
        'junggu': '중구',
        'jungnang': '중랑',
    },
    'busan': {
        'junggu': '중구',
        'seogu': '서구',
        'donggu': '동구',
        'yeongdo': '영도',
        'busanjin': '부산진',
        'dongnae': '동래',
        'namgu': '남구',
        'bukgu': '북구',
        'haeundae': '해운대',
        'saha': '사하',
        'geumjeong': '금정',
        'gangseo': '강서',
        'yeonje': '연제',
        'suyeong': '수영',
        'sasang': '사상',
        'gijang': '기장',
    },
    'daegu': {
        'junggu': '중구',
        'donggu': '동구',
        'seogu': '서구',
        'namgu': '남구',
        'bukgu': '북구',
        'suseong': '수성구',
        'dalseo': '달서구',
        'dalsung': '달성군',
    },
    'incheon': {
        'junggu': '중구',
        'donggu': '동구',
        'michuhol': '미추홀',
        'yeonsu': '연수',
        'namdong': '남동',
        'bupyeong': '부평',
        'gyeyang': '계양',
        'seogu': '서구',
        'ganghwa': '강화',
        'ongjin': '옹진',
    },
    'gwangju': {
        'donggu': '동구',
        'seogu': '서구',
        'namgu': '남구',
        'bukgu': '북구',
        'gwangsan': '광산',
    },
    'daejeon': {
        'donggu': '동구',
        'junggu': '중구',
        'seogu': '서구',
        'yuseong': '유성',
        'daedeok': '대덕',
    },
    'sejong': {
        'sejong': '세종특별자치시',
    },
    'gyeonggi': {
        'suwon': '수원',
        'seongnam': '성남',
        'uijeongbu': '의정부',
        'anyang': '안양',
        'bucheon': '부천',
        'gwangmyeong': '광명',
        'pyeongtaek': '평택',
        'gwacheon': '과천',
        'osan': '오산',
        'siheung': '시흥',
        'gunpo': '군포',
        'uiwang': '의왕',
        'hanam': '하남',
        'yongin': '용인',
        'paju': '파주',
        'icheon': '이천',
        'anseong': '안성',
        'gimpo': '김포',
        'hwaseong': '화성',
        'gwangju': '광주',
        'yeoju': '여주',
        'yangpyeong': '양평',
        'goyang': '고양',
        'dongducheon': '동두천',
        'gapyeong': '가평',
        'yeoncheon': '연천',
    },
    'gangwon': {
        'chuncheon': '춘천',
        'wonju': '원주',
        'gangneung': '강릉',
        'donghae': '동해',
        'taebaek': '태백',
        'sokcho': '속초',
        'samcheok': '삼척',
        'hongcheon': '홍천',
        'hoengseong': '횡성',
        'yeongwol': '영월',
        'pyeongchang': '평창',
        'jeongseon': '정선',
        'cheorwon': '철원',
        'hwacheon': '화천',
        'yanggu': '양구',
        'inje': '인제',
        'goseong': '고성',
        'yangyang': '양양',
    },
    'chungbuk': {
        'cheongju': '청주',
        'chungju': '충주',
        'jecheon': '제천',
        'boeun': '보은',
        'okcheon': '옥천',
        'yeongdong': '영동',
        'jeungpyeong': '증평',
        'jincheon': '진천',
        'goesan': '괴산',
        'eumseong': '음성',
        'danyang': '단양',
    },
    'chungnam': {
        'cheonan': '천안',
        'gongju': '공주',
        'boryeong': '보령',
        'asan': '아산',
        'seosan': '서산',
        'nonsan': '논산',
        'gyeryong': '계룡',
        'dangjin': '당진',
        'geumsan': '금산',
        'buyeo': '부여',
        'seocheon': '서천',
        'cheongyang': '청양',
        'hongseong': '홍성',
        'yesan': '예산',
        'taean': '태안',
    },
    'jeonbuk': {
        'jeonju': '전주',
        'gunsan': '군산',
        'iksan': '익산',
        'jeongeup': '정읍',
        'namwon': '남원',
        'gimje': '김제',
        'wanju': '완주',
        'jinan': '진안',
        'muju': '무주',
        'jangsu': '장수',
        'imsil': '임실',
        'sunchang': '순창',
        'gochang': '고창',
        'buan': '부안',
    },
    'jeonnam': {
        'mokpo': '목포',
        'yeosu': '여수',
        'suncheon': '순천',
        'naju': '나주',
        'gwangyang': '광양',
        'damyang': '담양',
        'gokseong': '곡성',
        'gurye': '구례',
        'goheung': '고흥',
        'boseong': '보성',
        'hwasun': '화순',
        'jangheung': '장흥',
        'gangjin': '강진',
        'haenam': '해남',
        'yeongam': '영암',
        'muan': '무안',
        'hampyeong': '함평',
        'yeonggwang': '영광',
        'jangseong': '장성',
        'wando': '완도',
        'jindo': '진도',
        'sinan': '신안',
    },
    'gyeongbuk': {
        'pohang': '포항',
        'gyeongju': '경주',
        'gimcheon': '김천',
        'andong': '안동',
        'gumi': '구미',
        'yeongju': '영주',
        'yeongcheon': '영천',
        'sangju': '상주',
        'mungyeong': '문경',
        'gyeongsan': '경산',
        'gunwi': '군위',
        'uiseong': '의성',
        'cheongsong': '청송',
        'yeongyang': '영양',
        'yeongdeok': '영덕',
        'cheongdo': '청도',
        'goryeong': '고령',
        'seongju': '성주',
        'chilgok': '칠곡',
        'yecheon': '예천',
        'bonghwa': '봉화',
        'uljin': '울진',
        'ulleung': '울릉',
    },
    'gyeongnam': {
        'changwon': '창원',
        'jinju': '진주',
        'tongyeong': '통영',
        'sacheon': '사천',
        'gimhae': '김해',
        'miryang': '밀양',
        'geoje': '거제',
        'yangsan': '양산',
        'uiryeong': '의령',
        'haman': '함안',
        'changnyeong': '창녕',
        'goseong': '고성',
        'namhae': '남해',
        'hadong': '하동',
        'sancheong': '산청',
        'hamyang': '함양',
        'geochang': '거창',
        'hapcheon': '합천',
    },
}

# 필터 키워드
FILTER_KEYWORDS = ['massage', 'outcall', 'swedish', 'thai', 'aroma', 'waxing', 'chinese', 'foot', 'spa']

# script.js에서 districtMap 읽어서 동/역 키를 한글 이름으로 변환
def get_dong_station_name(region_key, district_key, dong_station_key):
    """동/역 키를 한글 이름으로 변환"""
    script_file = SCRIPT_DIR / 'public' / 'script.js'
    if not script_file.exists():
        return None
    
    content = script_file.read_text(encoding='utf-8')
    
    # window.districtMap = { 시작 위치 찾기
    start_pattern = r'window\.districtMap\s*=\s*\{'
    match = re.search(start_pattern, content)
    if not match:
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
        return None
    
    district_map_str = content[start_pos:end_pos]
    
    # 라인별로 파싱하여 동/역 이름 찾기
    lines = district_map_str.split('\n')
    current_region = None
    current_district = None
    in_dong_stations = False
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # 지역 키 찾기
        region_match = re.search(r'(\w+):\s*\{', line)
        if region_match and 'regionName' in lines[i+1:i+10]:
            current_region = region_match.group(1)
            if current_region == region_key:
                i += 1
                continue
            else:
                current_region = None
                i += 1
                continue
        
        # 세부지역 키 찾기
        if current_region == region_key:
            district_match = re.search(r'(\w+):\s*\{', line)
            if district_match and 'districtsname' in lines[i+1:i+10]:
                current_district = district_match.group(1)
                if current_district == district_key:
                    i += 1
                    continue
                else:
                    current_district = None
                    i += 1
                    continue
            
            # dongStations 시작
            if current_district == district_key and 'dongStations:' in line:
                in_dong_stations = True
                i += 1
                while i < len(lines):
                    dong_line = lines[i].strip()
                    
                    # 동/역 항목 (예: 'sujin-dong': '수진동',)
                    dong_match = re.search(r"['\"]([\w-]+)['\"]:\s*['\"]([^'\"]+)['\"]", dong_line)
                    if dong_match:
                        dong_key = dong_match.group(1)
                        dong_name = dong_match.group(2)
                        if dong_key == dong_station_key:
                            return dong_name
                    elif '},' in dong_line or (dong_line == '}' and i < len(lines) - 1):
                        # dongStations 끝
                        break
                    i += 1
                continue
        
        i += 1
    
    return None

# 파일명에서 지역, 세부지역, 동/역, 필터 추출
def extract_region_and_filter(filename):
    """파일명에서 지역, 세부지역, 동/역, 필터 추출"""
    name = filename.replace('.html', '')
    parts = name.split('-')
    
    region = None
    district = None
    dong_station_key = None  # 동/역 키 (예: 'sujin-dong')
    filter_type = None
    
    if parts[0] in REGION_MAP:
        region = REGION_MAP[parts[0]]
        region_key = parts[0]
        
        if len(parts) >= 2:
            if parts[1] in FILTER_KEYWORDS:
                filter_type = parts[1]
            else:
                if region_key in DISTRICT_MAP and parts[1] in DISTRICT_MAP[region_key]:
                    district = DISTRICT_MAP[region_key][parts[1]]
                    district_key = parts[1]
                else:
                    district = parts[1]
                    district_key = parts[1]
                
                # 동/역 정보 추출 (parts[2]부터 필터 키워드 이전까지)
                if len(parts) >= 3:
                    dong_parts = []
                    filter_index = -1
                    
                    for i in range(2, len(parts)):
                        if parts[i] in FILTER_KEYWORDS:
                            filter_index = i
                            filter_type = parts[i]
                            break
                        else:
                            dong_parts.append(parts[i])
                    
                    if dong_parts:
                        dong_station_key = '-'.join(dong_parts)
    else:
        if parts[0] in FILTER_KEYWORDS:
            filter_type = parts[0]
    
    return region, district, dong_station_key, filter_type

# 필터 키워드 매핑 (add_jsonld_to_html.py와 동일)
FILTER_KEYWORDS_MAP = {
    'massage': ['마사지', '스웨디시', '아로마', '로미로미', '슈얼'],
    'outcall': ['출장마사지'],
    'swedish': ['스웨디시'],
    'thai': ['타이', '태국'],
    'aroma': ['아로마'],
    'waxing': ['왁싱'],
    'chinese': ['중국', '지압', '경락'],
    'foot': ['발', '족욕', '풋'],
    'spa': ['스파', 'SPA', '스크럽', 'VIP케어'],
}

# 필터 매칭 함수
def matches_filter(shop, filter_type):
    """업체가 필터 조건에 맞는지 확인 (add_jsonld_to_html.py와 동일)"""
    if not filter_type or filter_type == 'all':
        return True
    
    # 출장마사지인지 먼저 확인
    shop_type = shop.get('type', '')
    services = shop.get('services', [])
    if isinstance(services, str):
        services = [services]
    
    is_outcall = (shop_type == '출장마사지' or any('출장마사지' in str(s) for s in services))
    
    # 필터 타입별 처리
    if filter_type == 'massage':
        # 마사지 필터: 출장마사지는 제외
        if is_outcall:
            return False
        
        # 마사지 키워드 확인
        keywords = FILTER_KEYWORDS_MAP.get('massage', [])
        for service in services:
            service_lower = str(service).lower()
            for keyword in keywords:
                if keyword.lower() in service_lower and '출장' not in service_lower:
                    return True
        
        # type 필드 확인 (출장마사지 제외)
        if shop_type and '출장' not in shop_type:
            shop_type_lower = str(shop_type).lower()
            for keyword in keywords:
                if keyword.lower() in shop_type_lower:
                    return True
        
        return False
    
    elif filter_type == 'outcall':
        # 출장마사지 필터: 출장마사지만 포함
        return is_outcall
    
    else:
        # 기타 필터 (swedish, thai, aroma 등)
        keywords = FILTER_KEYWORDS_MAP.get(filter_type, [])
        if not keywords:
            return True
        
        # services에 키워드가 포함되어 있는지 확인
        for service in services:
            service_lower = str(service).lower()
            for keyword in keywords:
                if keyword.lower() in service_lower:
                    return True
        
        # type 필드 확인
        if shop_type:
            shop_type_lower = str(shop_type).lower()
            for keyword in keywords:
                if keyword.lower() in shop_type_lower:
                    return True
        
        return False

# 주소에서 동 이름 추출
def extract_dong_from_address(address, detail_address):
    """주소에서 동 이름 추출 (JavaScript의 extractDongFromAddress 함수와 동일)"""
    if not address:
        return ''
    
    dong_patterns = [
        re.compile(r'([가-힣]+동)'),
        re.compile(r'([가-힣]+리)'),
        re.compile(r'([가-힣]+가)'),
    ]
    
    # 먼저 주소에서 찾기
    for pattern in dong_patterns:
        match = pattern.search(address)
        if match:
            return match.group(1)
    
    # 주소에서 못 찾으면 detailAddress에서 찾기
    if detail_address:
        for pattern in dong_patterns:
            match = pattern.search(detail_address)
            if match:
                return match.group(1)
    
    return ''

# 주소에서 지역 정보 추출 (구/시 + 동)
def extract_location_info(address, detail_address):
    """주소에서 지역 정보 추출 (JavaScript의 extractLocationInfo 함수와 동일)"""
    if not address:
        return ''
    
    # 구/시 패턴
    gu_pattern = re.compile(r'([가-힣]+구)')
    si_pattern = re.compile(r'([가-힣]+시)')
    
    location = ''
    
    # 구가 있는 경우
    gu_match = gu_pattern.search(address)
    if gu_match:
        location = gu_match.group(1)
    
    # 시가 있는 경우 (구가 없는 경우)
    si_match = si_pattern.search(address)
    if not location and si_match:
        location = si_match.group(1)
    
    # 동 정보 추가
    dong_name = extract_dong_from_address(address, detail_address)
    if dong_name:
        location = f'{location} {dong_name}'.strip() if location else dong_name
    
    return location

# 업체명에서 동 추출하여 새로운 이름 생성
def create_shop_display_name(shop):
    """업체 표시 이름 생성 (JavaScript의 createShopDisplayName 함수와 동일)"""
    shop_type = shop.get('type', '')
    
    # 출장마사지의 경우
    if shop_type == '출장마사지':
        region = shop.get('region', '')
        shop_name = shop.get('name', '')
        
        # 업체명에서 지역 부분 제거
        if '제주시' in shop_name:
            shop_name = shop_name.replace('제주시', '').strip()
        if '제주도' in shop_name:
            shop_name = shop_name.replace('제주도', '').strip()
        if region and region in shop_name:
            shop_name = shop_name.replace(region, '').strip()
        
        # region 부분 제거하고 업체명만 반환
        return shop_name
    
    # 일반 업체의 경우
    shop_name = shop.get('name', '')
    # shop.dong 필드가 있으면 우선 사용
    dong_name = shop.get('dong', '')
    
    # shop.dong이 없으면 주소에서 추출
    if not dong_name:
        dong_name = extract_dong_from_address(shop.get('address', ''), shop.get('detailAddress', ''))
    
    if dong_name and dong_name not in shop_name:
        # 기존 업체명에서 "제주마사지", "제주도마사지" 등을 제거
        simple_name = shop_name.replace('제주도마사지', '').replace('제주마사지', '').strip()
        return f'{dong_name} {simple_name}'.strip()
    
    return shop_name

# 업체 정렬 함수 (showHealingShop 기준으로 정렬하고 각 그룹 내에서 랜덤화)
def sort_shops(shops, dong_station_name=None):
    """showHealingShop: true인 항목을 상단에, false인 항목을 하단에 배치하고 각 그룹 내에서 랜덤 정렬
    동/역 이름이 있으면 해당 동/역이 포함된 카드를 각 그룹의 최상단에 배치"""
    # showHealingShop 값에 따라 그룹 분리
    healing_shops = [shop for shop in shops if shop.get('showHealingShop') is True]
    non_healing_shops = [shop for shop in shops if shop.get('showHealingShop') is not True]
    
    # 동/역 이름이 있는 경우 각 그룹 내에서 동/역 포함 카드를 최상단에 배치
    if dong_station_name:
        # healing_shops 그룹 처리
        healing_with_dong = []
        healing_without_dong = []
        for shop in healing_shops:
            shop_address = shop.get('address', '')
            shop_detail_address = shop.get('detailAddress', '')
            # 주소에서 동 이름 추출
            shop_dong = extract_dong_from_address(shop_address, shop_detail_address)
            # 동 이름이 정확히 일치하거나 주소에 포함되어 있는지 확인
            if shop_dong == dong_station_name or dong_station_name in shop_dong or dong_station_name in f"{shop_address} {shop_detail_address}":
                healing_with_dong.append(shop)
            else:
                healing_without_dong.append(shop)
        # 동/역 포함 카드를 먼저, 나머지는 랜덤 정렬
        random.shuffle(healing_with_dong)
        random.shuffle(healing_without_dong)
        healing_shops = healing_with_dong + healing_without_dong
        
        # non_healing_shops 그룹 처리
        non_healing_with_dong = []
        non_healing_without_dong = []
        for shop in non_healing_shops:
            shop_address = shop.get('address', '')
            shop_detail_address = shop.get('detailAddress', '')
            # 주소에서 동 이름 추출
            shop_dong = extract_dong_from_address(shop_address, shop_detail_address)
            # 동 이름이 정확히 일치하거나 주소에 포함되어 있는지 확인
            if shop_dong == dong_station_name or dong_station_name in shop_dong or dong_station_name in f"{shop_address} {shop_detail_address}":
                non_healing_with_dong.append(shop)
            else:
                non_healing_without_dong.append(shop)
        # 동/역 포함 카드를 먼저, 나머지는 랜덤 정렬
        random.shuffle(non_healing_with_dong)
        random.shuffle(non_healing_without_dong)
        non_healing_shops = non_healing_with_dong + non_healing_without_dong
    else:
        # 동/역 이름이 없으면 기존처럼 랜덤 정렬
        random.shuffle(healing_shops)
        random.shuffle(non_healing_shops)
    
    # true 그룹을 상단에, false 그룹을 하단에 배치
    return healing_shops + non_healing_shops

# 업체 카드 HTML 생성
def create_shop_card_html(shop):
    """업체 카드 HTML 생성 (JavaScript의 createShopCard 함수를 Python으로 변환)"""
    # 표시 이름 생성
    display_name = create_shop_display_name(shop)
    
    # 위치 정보 추출
    address = shop.get('address', '')
    detail_address = shop.get('detailAddress', '')
    shop_type = shop.get('type', '')
    
    if shop_type == '출장마사지':
        location_info = detail_address.split()[0] if detail_address else shop.get('region', '출장마사지')
    else:
        # shop.district와 shop.dong 필드가 있으면 우선 사용
        district = shop.get('district', '')
        dong = shop.get('dong', '')
        if district and dong:
            location_info = f'{district} {dong}'
        elif district:
            location_info = district
        else:
            location_info = extract_location_info(address, detail_address)
    
    # 타입 이름 (힐링샵 여부)
    show_healing_shop = shop.get('showHealingShop', True)
    type_name = '힐링샵' if show_healing_shop else ''
    
    # 지역 정보
    shop_region = shop.get('region', '')
    
    # 국가별 국기 이미지
    country = shop.get('country', 'korea')
    country_flags = []
    if 'korea' in country:
        country_flags.append('<img src="https://www.msg1000.com/images/한국.jpg" alt="한국 국기" class="flag-image" onerror="this.onerror=null; this.innerHTML=\'🇰🇷\'; this.style.fontSize=\'16px\'; this.style.display=\'flex\'; this.style.alignItems=\'center\'; this.style.justifyContent=\'center\'; this.style.height=\'100%\'; this.style.background=\'#f0f0f0\'; this.style.borderRadius=\'3px\';">')
    if 'Thailand' in country:
        country_flags.append('<img src="https://www.msg1000.com/images/태국.jpg" alt="태국 국기" class="flag-image" onerror="this.onerror=null; this.innerHTML=\'🇹🇭\'; this.style.fontSize=\'16px\'; this.style.display=\'flex\'; this.style.alignItems=\'center\'; this.style.justifyContent=\'center\'; this.style.height=\'100%\'; this.style.background=\'#f0f0f0\'; this.style.borderRadius=\'3px\';">')
    if 'japan' in country:
        country_flags.append('<img src="https://www.msg1000.com/images/일본.jpg" alt="일본 국기" class="flag-image" onerror="this.onerror=null; this.innerHTML=\'🇯🇵\'; this.style.fontSize=\'16px\'; this.style.display=\'flex\'; this.style.alignItems=\'center\'; this.style.justifyContent=\'center\'; this.style.height=\'100%\'; this.style.background=\'#f0f0f0\'; this.style.borderRadius=\'3px\';">')
    if 'china' in country:
        country_flags.append('<img src="https://www.msg1000.com/images/중국.jpg" alt="중국 국기" class="flag-image" onerror="this.onerror=null; this.innerHTML=\'🇨🇳\'; this.style.fontSize=\'16px\'; this.style.display=\'flex\'; this.style.alignItems=\'center\'; this.style.justifyContent=\'center\'; this.style.height=\'100%\'; this.style.background=\'#f0f0f0\'; this.style.borderRadius=\'3px\';">')
    if 'Russia' in country:
        country_flags.append('<img src="https://www.msg1000.com/images/러시아.jpg" alt="러시아 국기" class="flag-image" onerror="this.onerror=null; this.innerHTML=\'🇷🇺\'; this.style.fontSize=\'16px\'; this.style.display=\'flex\'; this.style.alignItems=\'center\'; this.style.justifyContent=\'center\'; this.style.height=\'100%\'; this.style.background=\'#f0f0f0\'; this.style.borderRadius=\'3px\';">')
    
    flags_html = '\n                                '.join(country_flags)
    
    # 인사말
    greeting = shop.get('greeting', '')
    
    # 가격
    price = shop.get('price', '')
    
    # 이미지
    image = shop.get('image', '')
    alt = shop.get('alt', display_name)
    
    # 업체 URL 생성 (상대 경로 사용)
    file_name = shop.get('file', '')
    # file 필드가 있으면 상대 경로로 사용, 없으면 빈 문자열
    shop_url = file_name if file_name else ''
    
    # 주소, 상세주소, 전화번호를 한 줄로 합치기
    address = shop.get('address', '')
    detail_address = shop.get('detailAddress', '')
    phone = shop.get('phone', '')
    
    address_parts = []
    if detail_address:
        address_parts.append(detail_address)
    if address:
        address_parts.append(address)
    if phone:
        address_parts.append(phone)
    
    address_line = ' | '.join(address_parts) if address_parts else ''
    
    # HTML 생성
    # 카드 클릭 시 업체 URL로 이동 (<a> 태그로 감싸서 확실하게)
    # 주소/전화번호 HTML (항상 표시)
    address_html = ''
    if address_line:
        address_html = f'''<div class="shop-address-info" style="font-size: 12px; color: #666; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0;">
                        {html.escape(address_line)}
                    </div>'''
    
    # URL이 있으면 <a> 태그로 감싸고, 없으면 onclick 사용
    if shop_url:
        # <a> 태그로 감싸서 확실하게 링크 작동
        card_html = f'''        <a href="{html.escape(shop_url)}" style="text-decoration: none; color: inherit; display: block;">
            <div class="massage-card" data-type="{html.escape(shop_type or '마사지')}" data-region="{html.escape(shop_region)}" data-show-healing-shop="{str(show_healing_shop).lower()}" style="cursor: pointer;">
            <div class="card-image">
                <img src="{html.escape(image)}" alt="{html.escape(alt)}" class="shop-image" 
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaXoOazleWKoOi9vTwvdGV4dD48L3N2Zz4='; this.style.display='block';"
                     loading="lazy">
                <div class="image-overlay">
                    {f'<div class="shop-type">{html.escape(type_name)}</div>' if type_name else ''}
                </div>
            </div>
            
            <div class="card-content">
                <div class="card-header">
                    <div class="shop-name-container">
                        <div class="shop-name">{html.escape(display_name)}</div>
                        <div class="shop-location-info">
                            <span class="shop-district">{html.escape(location_info)}</span>
                            <div class="location-flag">
                                {flags_html}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card-info">
                    <div class="info-item greeting">
                        <span>{html.escape(greeting)}</span>
                    </div>
                </div>
                
                <div class="card-footer" style="display: flex; justify-content: flex-start; align-items: center; gap: 12px; flex-wrap: nowrap; overflow: hidden;">
                    <div class="price-container" style="display: flex; align-items: center; gap: 8px; overflow: hidden; width: 100%; flex: 1; min-width: 0;">
                        <div class="price" style="flex-shrink: 0; white-space: nowrap;"><span class="price-label">최저가</span> {html.escape(price)}</div>
                    {address_html}
                    </div>
                </div>
            </div>
            </div>
        </a>
'''
    else:
        # URL이 없으면 onclick 사용
        onclick_handler = f"goToDetail({shop.get('id', 0)})"
        card_html = f'''        <div class="massage-card" data-type="{html.escape(shop_type or '마사지')}" data-region="{html.escape(shop_region)}" data-show-healing-shop="{str(show_healing_shop).lower()}" onclick="{onclick_handler}" style="cursor: pointer;">
            <div class="card-image">
                <img src="{html.escape(image)}" alt="{html.escape(alt)}" class="shop-image" 
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuaXoOazleWKoOi9vTwvdGV4dD48L3N2Zz4='; this.style.display='block';"
                     loading="lazy">
                <div class="image-overlay">
                    {f'<div class="shop-type">{html.escape(type_name)}</div>' if type_name else ''}
                </div>
            </div>
            
            <div class="card-content">
                <div class="card-header">
                    <div class="shop-name-container">
                        <div class="shop-name">{html.escape(display_name)}</div>
                        <div class="shop-location-info">
                            <span class="shop-district">{html.escape(location_info)}</span>
                            <div class="location-flag">
                                {flags_html}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card-info">
                    <div class="info-item greeting">
                        <span>{html.escape(greeting)}</span>
                    </div>
                </div>
                
                <div class="card-footer" style="display: flex; justify-content: flex-start; align-items: center; gap: 12px; flex-wrap: nowrap; overflow: hidden;">
                    <div class="price-container" style="display: flex; align-items: center; gap: 8px; overflow: hidden; width: 100%; flex: 1; min-width: 0;">
                        <div class="price" style="flex-shrink: 0; white-space: nowrap;"><span class="price-label">최저가</span> {html.escape(price)}</div>
                    {address_html}
                    </div>
                </div>
            </div>
        </div>
'''
    
    return card_html

# 정적 header HTML 생성
def create_static_header_html():
    """정적 header HTML 생성"""
    header_html = '''    <header class="header" id="mainHeader" role="banner">
      <div class="header-content">
        <div
          class="logo"
          onclick="window.location.href='index.html'"
          style="cursor: pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28" height="28" fill="#ffd700" style="display:inline-block;vertical-align:middle;"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208z"/><path d="M256 128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 208c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/></svg>
          마사지천국
        </div>
        <div style="display: flex; align-items: center; gap: 15px">
          <div id="userInfoSection" style="display: none">
            <span
              id="userName"
              style="color: white; font-weight: 600; margin-right: 10px"
            ></span>
            <button
              onclick="logout()"
              type="button"
              aria-label="로그아웃"
              style="
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid white;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"/></svg> 로그아웃
            </button>
          </div>
          <!-- 검색 아이콘 버튼 -->
          <button
            class="header-search-btn"
            id="header-search-btn"
            type="button"
            aria-label="검색 창 열기"
            style="
              background: rgba(255, 255, 255, 0.2);
              color: white;
              border: 1px solid white;
              padding: 8px 12px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s;
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor" style="display:inline-block;vertical-align:middle;"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
          </button>
          <!-- 햄버거 메뉴 버튼 -->
          <button
            class="hamburger-btn"
            onclick="toggleSideMenu()"
            type="button"
            id="hamburgerToggleBtn"
            aria-label="전체 메뉴 열기"
            aria-controls="sideMenu"
            aria-expanded="false"
            style="margin-left: 10px"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor" style="display:inline-block;vertical-align:middle;"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
          </button>
        </div>
      </div>
    </header>'''
    return header_html

# header-container를 정적 HTML로 교체
def insert_static_header(content):
    """header-container를 정적 header HTML로 교체"""
    # 이미 정적 header가 있는지 확인 (<header class="header" id="mainHeader">)
    if re.search(r'<header\s+class=["\']header["\'][^>]*id=["\']mainHeader["\']', content, re.IGNORECASE):
        # 이미 정적 header가 있으면 건너뛰기
        return content
    
    header_html = create_static_header_html()
    
    # header-container 패턴 찾기 (여러 형식 지원)
    # 주석이 포함된 경우도 처리
    header_patterns = [
        r'<!--\s*헤더\s*-->[\s\n]*<div\s+id=["\']header-container["\'][^>]*>\s*</div>',  # 주석 + 빈 div (줄바꿈 포함)
        r'<div\s+id=["\']header-container["\'][^>]*>\s*</div>',  # 빈 div
        r'<div\s+id=["\']header-container["\'][^>]*>.*?</div>',   # 내용이 있는 div
    ]
    
    for pattern in header_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            content = re.sub(pattern, header_html, content, flags=re.DOTALL | re.IGNORECASE, count=1)
            print(f"  ✅ 정적 header 삽입 완료")
            return content
    
    # 패턴을 찾지 못한 경우 - 더 넓은 범위로 시도
    # 주석과 div가 별도 줄에 있는 경우
    wide_pattern = r'<!--\s*헤더\s*-->.*?<div\s+id=["\']header-container["\'][^>]*>\s*</div>'
    match = re.search(wide_pattern, content, re.DOTALL | re.IGNORECASE)
    if match:
        content = re.sub(wide_pattern, header_html, content, flags=re.DOTALL | re.IGNORECASE, count=1)
        print(f"  ✅ 정적 header 삽입 완료 (넓은 패턴)")
        return content
    
    # 패턴을 찾지 못한 경우
    print(f"  ⚠️ header-container를 찾을 수 없습니다.")
    return content

# HTML 파일에 업체 카드 삽입
def insert_shop_cards_to_html(html_file, shops):
    """HTML 파일의 본문에 업체 카드 삽입"""
    filename = html_file.name
    content = html_file.read_text(encoding='utf-8')
    
    # company- 파일은 건너뛰기 (업체 상세 페이지)
    if filename.startswith('company-'):
        return False
    
    # 동/역 파일도 처리하도록 변경 (massage-card 삽입)
    # if (filename.endswith('-dong-massage.html') or 
    #     filename.endswith('-station-massage.html') or 
    #     filename.endswith('-dong.html') or 
    #     filename.endswith('-station.html')):
    #     return False
    
    # 정적 header 삽입
    content = insert_static_header(content)
    
    # ========== 기존 중복 요소 완전 제거 ==========
    # 0. 모든 중첩된 주석 시작 제거 (/* /* /* 패턴)
    while True:
        old_content = content
        # 중첩된 주석 시작 패턴 제거
        content = re.sub(
            r'/\*\s*/\*',
            '/*',
            content
        )
        # 연속된 주석 시작 제거
        content = re.sub(
            r'/\*\s*/\*\s*/\*',
            '/*',
            content
        )
        # 여러 개의 주석 시작 제거
        while re.search(r'/\*\s*/\*', content):
            content = re.sub(r'/\*\s*/\*', '/*', content)
        if old_content == content:
            break
    
    # 1. sortStaticCards 스크립트 중복 제거 (모든 패턴, 연속된 스크립트 포함)
    # 더 정확한 패턴으로 여러 줄에 걸친 스크립트도 제거
    # 먼저 모든 sortStaticCards 관련 내용을 찾아서 제거
    while True:
        old_content = content
        # sortStaticCards가 포함된 모든 스크립트 블록 찾기 (더 넓은 범위)
        # <script> 태그로 감싸진 경우
        content = re.sub(
            r'<script>[^<]*?sortStaticCards[^<]*?</script>',
            '',
            content,
            flags=re.DOTALL
        )
        # 스크립트 태그 없이 함수만 있는 경우 (더 정확한 패턴)
        # sortStaticCards가 포함된 함수 전체 찾기
        content = re.sub(
            r'\(function\(\)\s*\{[^}]*sortStaticCards[^}]*\}\)\(\);\s*',
            '',
            content,
            flags=re.DOTALL
        )
        # 여러 줄에 걸친 경우
        content = re.sub(
            r'\(function\(\)\s*\{[\s\S]*?sortStaticCards[\s\S]*?\}\)\(\);\s*',
            '',
            content,
            flags=re.DOTALL
        )
        # 연속된 </script><script> 패턴 제거
        content = re.sub(
            r'</script>\s*<script>',
            '',
            content,
            flags=re.DOTALL
        )
        if old_content == content:
            break
    
    # 2. 상세정보 모달 주석 중복 제거
    while True:
        old_content = content
        content = re.sub(
            r'<!--\s*상세정보\s*모달\s*-->',
            '',
            content,
            flags=re.IGNORECASE
        )
        content = content.replace('<!-- 상세정보 모달 -->', '').replace('<!--상세정보 모달-->', '')
        if old_content == content:
            break
    
    # 3. 주석 처리된 동적 생성 비활성화 코드 중복 제거 (여러 줄 주석 포함)
    while True:
        old_content = content
        # 여러 줄에 걸친 주석 패턴 (더 정확한 패턴)
        content = re.sub(
            r'/\*\s*//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화[\s\S]*?\*/',
            '',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        # 단순한 주석 패턴도 제거
        content = re.sub(
            r'/\*\s*//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화\s*\*/',
            '',
            content,
            flags=re.IGNORECASE
        )
        # 주석 시작만 있고 끝이 없는 경우도 처리
        content = re.sub(
            r'/\*\s*//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화[^*\n]*',
            '',
            content,
            flags=re.IGNORECASE
        )
        # 중첩된 주석 시작 제거
        content = re.sub(
            r'/\*\s*/\*',
            '/*',
            content
        )
        if old_content == content:
            break
    
    # 4. massageList 체크 코드 중복 제거 (여러 줄 포함)
    while True:
        old_content = content
        # 여러 줄에 걸친 코드 블록 제거
        content = re.sub(
            r'//\s*massageList에\s*정적\s*HTML이\s*있으면\s*동적\s*생성\s*방지[^}]*\}',
            '',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        if old_content == content:
            break
    
    # 5. 빈 주석 및 중첩 주석 제거
    while True:
        old_content = content
        # 중첩된 주석 시작 제거 (/* /* /* 패턴)
        content = re.sub(
            r'/\*\s*/\*',
            '/*',
            content
        )
        # 연속된 주석 시작 제거
        while re.search(r'/\*\s*/\*', content):
            content = re.sub(r'/\*\s*/\*', '/*', content)
        # 빈 주석 패턴 제거 (공백만 있는 주석)
        content = re.sub(
            r'\s*\*/\s*',
            '',
            content,
            flags=re.MULTILINE
        )
        # 연속된 빈 주석 제거
        content = re.sub(
            r'\*/\s*\*/',
            '',
            content
        )
        # 주석 시작만 있고 끝이 없는 경우 제거
        content = re.sub(
            r'/\*\s*/\s*$',
            '',
            content,
            flags=re.MULTILINE
        )
        if old_content == content:
            break
    
    # 파일명에서 지역, 세부지역, 동/역, 필터 추출
    region, district, dong_station_key, filter_type = extract_region_and_filter(filename)
    
    # 동/역 키가 있으면 한글 이름으로 변환
    dong_station_name = None
    if dong_station_key and region and district:
        # region_key와 district_key 찾기
        region_key = None
        district_key = None
        for key, value in REGION_MAP.items():
            if value == region:
                region_key = key
                break
        if region_key and region_key in DISTRICT_MAP:
            for key, value in DISTRICT_MAP[region_key].items():
                if value == district:
                    district_key = key
                    break
        
        if region_key and district_key:
            dong_station_name = get_dong_station_name(region_key, district_key, dong_station_key)
    
    print(f"\n처리 중: {filename}")
    print(f"  지역: {region}, 구: {district}, 동/역 키: {dong_station_key}, 동/역 이름: {dong_station_name}, 필터: {filter_type}")
    
    # 조건에 맞는 업체 필터링
    matching_shops = []
    for shop in shops:
        shop_region = shop.get('region', '')
        shop_district = shop.get('district', '')
        shop_type = shop.get('type', '')
        services = shop.get('services', [])
        if isinstance(services, str):
            services = [services]
        is_outcall = (shop_type == '출장마사지' or '출장마사지' in services)
        
        # 지역 매칭
        if region:
            shop_region_str = str(shop_region).strip()
            region_str = str(region).strip()
            
            # 출장마사지이고 region에 쉼표가 있으면 여러 지역 지원
            if is_outcall and ',' in shop_region_str:
                # 쉼표로 구분된 지역 목록
                shop_regions = [r.strip() for r in shop_region_str.split(',')]
                # 현재 페이지의 지역이 shop_regions에 포함되어 있는지 확인
                if region_str not in shop_regions:
                    continue
            else:
                # 일반적인 경우: 정확히 일치해야 함
                if shop_region_str != region_str:
                    continue
        
        # 구 매칭 (is_outcall은 이미 위에서 정의됨)
        if district:
            # 출장마사지이고 region에 쉼표가 있으면 여러 지역 지원 (district 체크 건너뛰기)
            if is_outcall and ',' in str(shop_region):
                pass  # 여러 지역을 지원하는 출장마사지는 district 체크 건너뛰기
            elif is_outcall and str(shop_region) == '제주':
                pass  # 제주 출장마사지는 모든 세부지역에 매칭
            else:
                if shop_district != district:
                    continue
        
        # 동/역 매칭 (동/역 키가 있는 경우에만 정확히 일치해야 함)
        if dong_station_key and dong_station_name:
            # 업체 주소에서 동/역 추출
            shop_address = shop.get('address', '')
            shop_detail_address = shop.get('detailAddress', '')
            
            # 주소 전체 텍스트
            address_text = f"{shop_address} {shop_detail_address}".strip()
            
            # 동/역 이름이 주소에 정확히 포함되어 있는지 확인
            # 예: dong_station_name = '수진동'이면 주소에 '수진동'이 포함되어야 함
            if dong_station_name not in address_text:
                # 주소에 동/역 이름이 없으면 제외
                continue
        
        # 필터 매칭
        if not matches_filter(shop, filter_type):
            continue
        
        matching_shops.append(shop)
    
    print(f"  매칭된 업체 수: {len(matching_shops)}")
    
    # header가 삽입되었는지 확인
    header_inserted = '<header class="header" id="mainHeader"' in content
    
    if not matching_shops:
        print(f"  ⚠️ 매칭된 업체가 없습니다.")
        # header가 삽입되었으면 파일 저장
        if header_inserted:
            html_file.write_text(content, encoding='utf-8')
            print(f"  ✅ header만 업데이트 완료")
            return True
        return False
    
    # showHealingShop 기준으로 정렬 및 랜덤화
    # 동/역 이름이 있으면 해당 동/역이 포함된 카드를 각 그룹의 최상단에 배치
    sorted_shops = sort_shops(matching_shops, dong_station_name)
    
    # 업체 카드 HTML 생성
    cards_html = '\n'.join([create_shop_card_html(shop) for shop in sorted_shops])
    
    # massageList 내부의 기존 massage-card 요소들만 찾아서 교체 (HTML 구조 유지)
    inserted = False
    
    # massageList 시작 태그 찾기
    massage_list_start_pattern = r'<div[^>]*id=["\']massageList["\'][^>]*>'
    massage_list_match = re.search(massage_list_start_pattern, content)
    
    if massage_list_match:
        start_pos = massage_list_match.start()
        start_tag_end = massage_list_match.end()
        start_tag = massage_list_match.group(0)
        
        # </main> 태그를 먼저 찾기
        main_end_pos = content.find('</main>', start_tag_end)
        if main_end_pos < 0:
            main_end_pos = len(content)
        
        # massageList 시작 태그부터 </main> 이전까지의 섹션
        section = content[start_tag_end:main_end_pos]
        
        # 이 섹션에서 마지막 </div> 찾기 (massageList의 닫는 태그)
        # 여러 개의 </div>가 있을 수 있으므로, massage-list 클래스를 가진 div의 닫는 태그를 찾거나
        # 아니면 가장 가까운 </div>를 찾기
        last_close_div = section.rfind('</div>')
        
        if last_close_div >= 0:
            end_pos = start_tag_end + last_close_div + 6  # </div> 길이 6
            
            # massageList 전체를 새로 생성 (기존 내용 완전 삭제)
            # 인라인 스크립트 추가: 렌더링 전 즉시 랜덤 정렬
            # 삽입 전 마지막 중복 체크 - 해당 섹션의 모든 스크립트 제거
            section_before = content[start_pos:end_pos]
            # 모든 sortStaticCards 스크립트 제거
            while True:
                old_section = section_before
                section_before = re.sub(
                    r'<script>\s*\(function\(\)\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*sortStaticCards[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\)\(\);\s*</script>',
                    '',
                    section_before,
                    flags=re.DOTALL
                )
                section_before = re.sub(
                    r'\(function\(\)\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*sortStaticCards[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\)\(\);\s*',
                    '',
                    section_before,
                    flags=re.DOTALL
                )
                section_before = re.sub(
                    r'</script>\s*<script>',
                    '',
                    section_before,
                    flags=re.DOTALL
                )
                if old_section == section_before:
                    break
            content = content[:start_pos] + section_before + content[end_pos:]
            end_pos = start_pos + len(section_before)
            
            inline_script = '''<script>
(function() {
  if (typeof sortStaticCards === 'function') {
    sortStaticCards();
  } else {
    // sortStaticCards 함수가 아직 로드되지 않았으면 DOMContentLoaded 대기
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof sortStaticCards === 'function') {
        sortStaticCards();
      }
    });
  }
})();
</script>'''
            new_massage_list = f'{start_tag}\n{cards_html}\n        </div>{inline_script}'
            
            # massageList 전체 교체
            content = content[:start_pos] + new_massage_list + content[end_pos:]
            inserted = True
            print(f"  ✅ massageList 전체 교체 후 새 카드 {len(matching_shops)}개 등록")
        else:
            # </div>를 찾지 못한 경우, </main> 이전에 직접 삽입
            inline_script = '''<script>
(function() {
  if (typeof sortStaticCards === 'function') {
    sortStaticCards();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof sortStaticCards === 'function') {
        sortStaticCards();
      }
    });
  }
})();
</script>'''
            new_massage_list = f'{start_tag}\n{cards_html}\n        </div>{inline_script}'
            content = content[:start_pos] + new_massage_list + '\n    ' + content[main_end_pos:]
            inserted = True
            print(f"  ✅ massageList 재생성 후 새 카드 {len(matching_shops)}개 등록")
    
    # massageList가 비어있는 경우 (빈 태그)
    if not inserted:
        pattern2 = r'<div[^>]*id=["\']massageList["\'][^>]*\s*/>'
        if re.search(pattern2, content):
            inline_script = '''<script>
(function() {
  if (typeof sortStaticCards === 'function') {
    sortStaticCards();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof sortStaticCards === 'function') {
        sortStaticCards();
      }
    });
  }
})();
</script>'''
            content = re.sub(
                pattern2,
                f'<div id="massageList">\n{cards_html}\n        </div>{inline_script}',
                content,
                count=1
            )
            inserted = True
            print(f"  ✅ 빈 massageList 태그에 카드 삽입")
        
        pattern3 = r'(<div[^>]*id=["\']massageList["\'][^>]*></div>)'
        if re.search(pattern3, content):
            inline_script = '''<script>
(function() {
  if (typeof sortStaticCards === 'function') {
    sortStaticCards();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof sortStaticCards === 'function') {
        sortStaticCards();
      }
    });
  }
})();
</script>'''
            content = re.sub(
                pattern3,
                f'<div id="massageList">\n{cards_html}\n        </div>{inline_script}',
                content,
                count=1
            )
            inserted = True
            print(f"  ✅ 빈 massageList 컨테이너에 카드 삽입")
    
    # massageList가 없는 경우, body 안에 새로 생성
    if not inserted:
        # body 태그 찾기
        body_match = re.search(r'(<body[^>]*>)', content)
        if body_match:
            body_end = body_match.end()
            
            # body 다음에 바로 massageList 삽입 (기존 스크립트는 이미 함수 시작 부분에서 제거됨)
            inline_script = '''<script>
(function() {
  if (typeof sortStaticCards === 'function') {
    sortStaticCards();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof sortStaticCards === 'function') {
        sortStaticCards();
      }
    });
  }
})();
</script>'''
            cards_section = f'\n    <div id="massageList">\n{cards_html}\n    </div>{inline_script}'
            content = content[:body_end] + cards_section + content[body_end:]
            inserted = True
            print(f"  ✅ body 태그 다음에 massageList 컨테이너 생성 및 카드 삽입")
    
    # resultsCount 요소 제거
    content = re.sub(
        r'<span[^>]*id=["\']resultsCount["\'][^>]*class=["\']results-count["\'][^>]*>.*?</span>',
        '',
        content,
        flags=re.DOTALL
    )
    # id만 있는 경우도 처리
    content = re.sub(
        r'<span[^>]*id=["\']resultsCount["\'][^>]*>.*?</span>',
        '',
        content,
        flags=re.DOTALL
    )
    # class만 있는 경우도 처리
    content = re.sub(
        r'<span[^>]*class=["\']results-count["\'][^>]*>.*?</span>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # footer-link 텍스트 업데이트 및 필터 링크 삽입 (카드 삽입 여부와 관계없이)
    content = update_footer_link(content, region, district, filter_type, filename)
    
    # JavaScript의 동적 카드 생성 코드 비활성화 (정적 HTML 사용)
    content = disable_dynamic_card_generation(content)
    
    # ========== 최종 중복 제거 (파일 저장 전) ==========
    # 0. 중첩된 주석 시작 최종 제거
    while True:
        old_content = content
        # 중첩된 주석 시작 패턴 제거
        content = re.sub(
            r'/\*\s*/\*',
            '/*',
            content
        )
        # 여러 개의 주석 시작 제거
        while re.search(r'/\*\s*/\*', content):
            content = re.sub(r'/\*\s*/\*', '/*', content)
        if old_content == content:
            break
    
    # 1. sortStaticCards 스크립트 중복 최종 제거 (모든 패턴)
    while True:
        old_content = content
        # sortStaticCards가 포함된 모든 스크립트 블록 찾기
        # <script> 태그로 감싸진 경우
        content = re.sub(
            r'<script>[^<]*?sortStaticCards[^<]*?</script>',
            '',
            content,
            flags=re.DOTALL
        )
        # 스크립트 태그 없이 함수만 있는 경우 (더 넓은 범위)
        content = re.sub(
            r'\(function\(\)\s*\{[\s\S]*?sortStaticCards[\s\S]*?\}\)\(\);\s*',
            '',
            content,
            flags=re.DOTALL
        )
        # 연속된 </script><script> 제거
        content = re.sub(
            r'</script>\s*<script>',
            '',
            content,
            flags=re.DOTALL
        )
        if old_content == content:
            break
    
    # 2. 주석 중복 최종 제거
    while True:
        old_content = content
        # 주석 처리된 동적 생성 비활성화 코드 (모든 패턴)
        content = re.sub(
            r'/\*\s*//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화[\s\S]*?\*/',
            '',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        # 중첩된 주석 시작 제거
        content = re.sub(
            r'/\*\s*/\*',
            '/*',
            content
        )
        # 여러 개의 주석 시작 제거
        while re.search(r'/\*\s*/\*', content):
            content = re.sub(r'/\*\s*/\*', '/*', content)
        # 빈 주석 제거
        content = re.sub(
            r'\s*\*/\s*\*/',
            '',
            content
        )
        content = re.sub(
            r'\n\s*\*/\s*\n',
            '\n',
            content
        )
        # 주석 시작만 있고 끝이 없는 경우
        content = re.sub(
            r'/\*\s*//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화[^*\n]*',
            '',
            content,
            flags=re.IGNORECASE
        )
        if old_content == content:
            break
    
    # 3. 상세정보 모달 주석 중복 최종 제거
    while True:
        old_content = content
        content = re.sub(
            r'<!--\s*상세정보\s*모달\s*-->',
            '',
            content,
            flags=re.IGNORECASE
        )
        content = content.replace('<!-- 상세정보 모달 -->', '').replace('<!--상세정보 모달-->', '')
        if old_content == content:
            break
    
    # ========== 연속된 빈 줄 정리 (최종) ==========
    # 3개 이상의 연속된 빈 줄을 2개로 제한
    while True:
        old_content = content
        # 3개 이상의 연속된 빈 줄을 2개로 제한
        content = re.sub(
            r'\n\s*\n\s*\n\s*\n+',
            '\n\n',
            content
        )
        # 주석 제거 후 남은 빈 줄 정리
        content = re.sub(
            r'/\*\s*/\s*\n\s*\n+',
            '',
            content
        )
        # 주석 처리된 코드 제거 후 남은 빈 줄 정리
        content = re.sub(
            r'//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화\s*\n\s*\n+',
            '',
            content,
            flags=re.IGNORECASE
        )
        # detailsModal 제거 후 남은 빈 줄 정리 (</div> 다음에 많은 빈 줄)
        content = re.sub(
            r'</div>\s*\n\s*\n\s*\n\s*\n+',
            '</div>\n\n',
            content
        )
        # aboutModal 앞의 빈 줄 정리
        content = re.sub(
            r'\n\s*\n\s*\n\s*\n+\s*<div\s+id=["\']aboutModal["\']',
            '\n\n    <div id="aboutModal"',
            content,
            flags=re.IGNORECASE
        )
        # hamburger-menu-container 앞의 빈 줄 정리
        content = re.sub(
            r'\n\s*\n\s*\n\s*\n+\s*<div\s+id=["\']hamburger-menu-container["\']',
            '\n\n    <div id="hamburger-menu-container"',
            content,
            flags=re.IGNORECASE
        )
        if old_content == content:
            break
    
    if inserted:
        html_file.write_text(content, encoding='utf-8')
        print(f"  ✅ 업체 카드 {len(matching_shops)}개 삽입 완료")
        return True
    else:
        html_file.write_text(content, encoding='utf-8')
        print(f"  ⚠️ 삽입 위치를 찾을 수 없습니다. (footer-link만 업데이트됨)")
        return False

# JavaScript의 동적 카드 생성 코드 비활성화
def disable_dynamic_card_generation(content):
    """JavaScript의 displayMassageShops 호출을 주석 처리하여 정적 HTML만 사용하도록 함"""
    # ========== 기존 중복 완전 제거 ==========
    # 1. 주석 처리된 동적 생성 비활성화 코드 중복 제거 (모든 패턴)
    while True:
        old_content = content
        # 여러 줄에 걸친 주석 패턴
        content = re.sub(
            r'/\*\s*//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화[^*]*\*/',
            '',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        # 단순한 주석 패턴도 제거
        content = re.sub(
            r'/\*\s*//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화\s*\*/',
            '',
            content,
            flags=re.IGNORECASE
        )
        if old_content == content:
            break
    
    # 2. massageList 체크 코드 중복 제거 (모든 패턴)
    while True:
        old_content = content
        # 여러 줄에 걸친 코드 블록 제거
        content = re.sub(
            r'//\s*massageList에\s*정적\s*HTML이\s*있으면\s*동적\s*생성\s*방지[^}]*\}',
            '',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        if old_content == content:
            break
    
    # 3. 빈 주석 제거 ( */ 만 남은 경우)
    while True:
        old_content = content
        # 빈 주석 패턴 제거 (공백만 있는 주석)
        content = re.sub(
            r'\s*\*/\s*',
            '',
            content,
            flags=re.MULTILINE
        )
        # 연속된 빈 주석 제거
        content = re.sub(
            r'\*/\s*\*/',
            '',
            content
        )
        if old_content == content:
            break
    
    # displayMassageShops 호출 부분 주석 처리 (여러 패턴 시도)
    
    # 패턴 1: if (typeof displayMassageShops === 'function') { displayMassageShops(shops); }
    content = re.sub(
        r'if\s*\(typeof\s+displayMassageShops\s*===\s*[\'"]function[\'"]\s*\)\s*\{[^}]*displayMassageShops\([^)]+\)[^}]*\}',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.MULTILINE | re.DOTALL
    )
    
    # 패턴 2: displayMassageShops(shops); 단독 호출
    content = re.sub(
        r'displayMassageShops\([^)]+\);',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.MULTILINE
    )
    
    # 패턴 3: massageList.innerHTML = ... (동적 카드 생성 방지)
    content = re.sub(
        r'massageList\.innerHTML\s*=\s*[^;]+;',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.MULTILINE | re.DOTALL
    )
    
    # 패턴 4: displayFilteredResults() 호출 주석 처리 및 정적 HTML 체크 추가
    # 이미 주석 처리되지 않은 경우만 처리
    if 'displayFilteredResults()' in content and '/* displayFilteredResults()' not in content:
        # 패턴: 들여쓰기 + if (typeof displayFilteredResults === 'function') { displayFilteredResults(); }
        pattern = r'(\s+)(if\s*\(typeof\s+displayFilteredResults\s*===\s*[\'"]function[\'"]\s*\)\s*\{[^}]*displayFilteredResults\(\)[^}]*\})'
        def replace_func(match):
            indent = match.group(1)
            original = match.group(2)
            return f'{indent}/* {original} */'
        content = re.sub(pattern, replace_func, content, flags=re.MULTILINE | re.DOTALL)
    
    # 주석 처리된 코드와 그 아래 빈 줄 제거
    # "// 정적 HTML이 이미 있으므로 동적 생성 비활성화" 주석과 그 아래 빈 줄 제거
    while True:
        old_content = content
        # 주석과 그 아래 빈 줄 제거
        content = re.sub(
            r'//\s*정적\s*HTML이\s*이미\s*있으므로\s*동적\s*생성\s*비활성화\s*\n\s*\n*',
            '',
            content,
            flags=re.IGNORECASE
        )
        # massageList 체크 코드와 그 아래 빈 줄 제거
        content = re.sub(
            r'//\s*massageList에\s*정적\s*HTML이\s*있으면\s*동적\s*생성\s*방지[^}]*\}\s*\n\s*\n*',
            '',
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        if old_content == content:
            break
    
    # resultsTitle.textContent, resultsTitle.innerHTML 주석 처리 (이미 있지만 확실하게)
    content = re.sub(
        r'resultsTitle\.(textContent|innerHTML)\s*=\s*[^;]+;',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.MULTILINE
    )
    
    # updateResultsTitle(), updateResultsTitleByTheme() 호출 주석 처리
    content = re.sub(
        r'(updateResultsTitle|updateResultsTitleByTheme)\([^)]*\);',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.MULTILINE
    )
    
    # sortStaticCards() 함수 호출 제거 (정적 정렬 방지)
    # 패턴 1: if (typeof sortStaticCards === 'function') { sortStaticCards(); }
    content = re.sub(
        r'if\s*\(typeof\s+sortStaticCards\s*===\s*[\'"]function[\'"]\s*\)\s*\{[^}]*sortStaticCards\(\)[^}]*\}',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.MULTILINE | re.DOTALL
    )
    
    # 패턴 2: sortStaticCards(); 단독 호출
    content = re.sub(
        r'sortStaticCards\(\);',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.MULTILINE
    )
    
    # 패턴 3: (function() { ... sortStaticCards() ... })() 즉시 실행 함수 제거
    content = re.sub(
        r'\(function\(\)\s*\{[^{}]*sortStaticCards[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\)\(\);',
        lambda m: f'/* {m.group(0)} */',
        content,
        flags=re.DOTALL
    )
    
    return content

# 필터 링크 URL 생성
def generate_filter_link_url(filter_key, region, district, region_map_key=None):
    """필터 링크 URL 생성 (JavaScript의 generateFilterLinkUrl 함수와 동일)"""
    # region_map_key가 없으면 역방향 매핑으로 찾기
    if not region_map_key and region:
        for key, value in REGION_MAP.items():
            if value == region:
                region_map_key = key
                break
    
    # 지역과 세부지역이 모두 있는 경우
    if region_map_key and district:
        # district 키 찾기
        district_key = None
        if region_map_key in DISTRICT_MAP:
            for key, value in DISTRICT_MAP[region_map_key].items():
                if value == district:
                    district_key = key
                    break
        
        if district_key:
            # 테마 필터인 경우
            if filter_key in ['swedish', 'thai', 'aroma', 'chinese', 'foot', 'waxing', 'spa']:
                return f'{region_map_key}-{district_key}-{filter_key}.html'
            elif filter_key == 'massage':
                return f'{region_map_key}-{district_key}-massage.html'
            elif filter_key == 'outcall':
                return f'{region_map_key}-{district_key}-outcall.html'
    
    # 지역만 있는 경우
    if region_map_key:
        # 테마 필터인 경우
        if filter_key in ['swedish', 'thai', 'aroma', 'chinese', 'foot', 'waxing', 'spa']:
            return f'{region_map_key}-{filter_key}.html'
        elif filter_key == 'massage':
            return f'{region_map_key}-massage.html'
        elif filter_key == 'outcall':
            return f'{region_map_key}-outcall.html'
    
    # 지역 정보가 없는 경우 (index.html 등)
    if filter_key == 'massage':
        return 'massage.html'
    elif filter_key == 'outcall':
        return 'outcall.html'
    elif filter_key in ['swedish', 'thai', 'aroma', 'chinese', 'foot', 'waxing', 'spa']:
        return f'{filter_key}.html'
    
    return '#'

# footer-link 텍스트 생성 및 필터 링크 삽입
def update_footer_link(content, region, district, filter_type, filename=''):
    """footer-link 텍스트 업데이트 및 상세정보 모달 링크 삽입"""
    # footer-link 텍스트 생성
    theme_names = {
        'swedish': '스웨디시',
        'thai': '타이마사지',
        'aroma': '아로마마사지',
        'waxing': '왁싱',
        'chinese': '중국마사지',
        'foot': '발마사지',
        'spa': '스파',
    }
    
    filter_name = theme_names.get(filter_type, '')
    if not filter_name:
        if filter_type == 'massage':
            filter_name = '마사지'
        elif filter_type == 'outcall':
            filter_name = '출장마사지'
        else:
            filter_name = '마사지사이트'
    
    # footer-link 텍스트 결정
    footer_link_text = '상세정보'
    if region and district:
        footer_link_text = f'{region} {district}{filter_name}정보'
    elif region:
        footer_link_text = f'{region} {filter_name}정보'
    elif filter_name != '마사지사이트':
        footer_link_text = f'{filter_name}정보'
    
    # footer-link 텍스트 업데이트
    footer_link_pattern = r'(<a[^>]*class=["\']footer-link["\'][^>]*onclick=["\']openDetailsModal\(event\)["\'][^>]*>)(.*?)(</a>)'
    footer_link_match = re.search(footer_link_pattern, content, re.DOTALL)
    if footer_link_match:
        new_text = html.escape(footer_link_text)
        content = re.sub(
            footer_link_pattern,
            r'\1' + new_text + r'\3',
            content,
            count=1
        )
        print(f"  ✅ footer-link 텍스트 업데이트: {footer_link_text}")
    
    # detailsModal에 필터 링크 삽입
    # 모든 필터 정의
    all_filters = [
        {'key': 'massage', 'name': '마사지'},
        {'key': 'outcall', 'name': '출장마사지'},
        {'key': 'swedish', 'name': '스웨디시'},
        {'key': 'thai', 'name': '타이마사지'},
        {'key': 'aroma', 'name': '아로마마사지'},
        {'key': 'waxing', 'name': '왁싱'},
        {'key': 'chinese', 'name': '중국마사지'},
        {'key': 'foot', 'name': '발마사지'},
        {'key': 'spa', 'name': '스파'},
    ]
    
    # 현재 필터를 제외한 나머지 필터들
    if filter_type and filter_type != 'all':
        filters_to_show = [f for f in all_filters if f['key'] != filter_type]
    else:
        filters_to_show = all_filters
    
    # region_map_key 찾기
    region_map_key = None
    if region:
        for key, value in REGION_MAP.items():
            if value == region:
                region_map_key = key
                break
    
    # 필터 링크 HTML 생성
    filter_links_html = '<div style="display: flex; flex-direction: column; gap: 12px;">'
    for filter_item in filters_to_show:
        url = generate_filter_link_url(filter_item['key'], region, district, region_map_key)
        
        # 표시 이름 결정
        display_name = filter_item['name']
        # 기본 페이지 목록
        base_pages = ['index.html', 'massage.html', 'outcall.html', 'swedish.html', 'thai.html', 
                     'aroma.html', 'waxing.html', 'chinese.html', 'foot.html', 'spa.html']
        is_base_page = filename in base_pages if filename else False
        
        if region and not is_base_page:
            if district:
                display_name = f'{region} {district} {filter_item["name"]}'
            else:
                display_name = f'{region} {filter_item["name"]}'
        
        filter_links_html += f'''
        <a href="{html.escape(url)}" style="display: block; padding: 12px; background: #f8f9fa; border-radius: 8px; text-decoration: none; color: #333; transition: background 0.2s;">
            {html.escape(display_name)}
        </a>'''
    
    filter_links_html += '</div>'
    
    # detailsModal 찾기 및 업데이트
    # 기존 detailsModal 전체 제거 (재귀적으로 중첩된 div 처리)
    # 모든 detailsModal 제거 (중복 방지)
    while True:
        details_modal_start_pattern = r'<div[^>]*id=["\']detailsModal["\']'
        details_modal_match_start = re.search(details_modal_start_pattern, content)
        if not details_modal_match_start:
            break
        
        start_pos = details_modal_match_start.start()
        # </div>를 찾아서 닫기 (중첩된 div 처리)
        remaining = content[start_pos:]
        div_count = 0
        i = 0
        end_pos = -1
        
        while i < len(remaining):
            # <div 시작 태그 찾기
            if i + 4 <= len(remaining) and remaining[i:i+4] == '<div':
                tag_end = remaining.find('>', i)
                if tag_end > i:
                    # self-closing이 아닌 경우
                    if remaining[tag_end-1] != '/':
                        div_count += 1
                    i = tag_end + 1
                else:
                    i += 1
            # </div> 닫는 태그 찾기
            elif i + 6 <= len(remaining) and remaining[i:i+6] == '</div>':
                div_count -= 1
                if div_count == 0:
                    end_pos = start_pos + i + 6
                    break
                i += 6
            else:
                i += 1
        
        if end_pos > start_pos:
            # 기존 detailsModal 완전히 제거
            content = content[:start_pos] + content[end_pos:]
            # detailsModal 제거 후 연속된 빈 줄 정리
            content = re.sub(
                r'\n\s*\n\s*\n\s*\n+',
                '\n\n',
                content
            )
            print(f"  ✅ 기존 detailsModal 완전히 제거됨")
        else:
            break
    
    # detailsModal이 이미 있는지 확인 (중복 방지)
    details_modal_exists = re.search(r'<div[^>]*id=["\']detailsModal["\']', content)
    
    if not details_modal_exists:
        # detailsModal이 없으면 footer 다음에 추가
        footer_pattern = r'(</footer>)'
        footer_match = re.search(footer_pattern, content)
        if footer_match:
            details_modal_html = f'''
    <!-- 상세정보 모달 -->
    <div id="detailsModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>서비스 필터 전체 보기</h2>
          <button class="modal-close" onclick="closeModal('detailsModal')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="terms-section">
            <h3>서비스 필터 전체 보기</h3>
            <div class="filter-links-container" style="margin-top: 20px;">
              {filter_links_html}
            </div>
          </div>
        </div>
      </div>
    </div>'''
            content = re.sub(footer_pattern, r'\1' + details_modal_html, content, count=1)
            print(f"  ✅ detailsModal 생성 및 필터 링크 {len(filters_to_show)}개 삽입 완료")
    else:
        # detailsModal이 있으면 내용만 업데이트
        details_modal_pattern = r'(<div[^>]*id=["\']detailsModal["\'][^>]*>.*?<div[^>]*class=["\']modal-body["\'][^>]*>)(.*?)(</div>\s*</div>\s*</div>)'
        details_modal_match = re.search(details_modal_pattern, content, re.DOTALL)
        if details_modal_match:
            new_modal_body = f'''
        <div class="terms-section">
          <h3>서비스 필터 전체 보기</h3>
          <div class="filter-links-container" style="margin-top: 20px;">
            {filter_links_html}
          </div>
        </div>'''
            content = re.sub(
                details_modal_pattern,
                r'\1' + new_modal_body + r'\3',
                content,
                count=1,
                flags=re.DOTALL
            )
            print(f"  ✅ detailsModal 기존 내용 제거 후 필터 링크 {len(filters_to_show)}개 삽입 완료")
    
    return content

# 메인 함수
def main():
    print("=" * 60)
    print("HTML 파일에 업체 카드 삽입 스크립트")
    print("=" * 60)
    
    # shop-card-data.js 읽기
    print("\n1. shop-card-data.js 읽는 중...")
    shops = read_shop_card_data()
    print(f"   ✅ {len(shops)}개 업체 데이터 로드 완료")
    
    if not shops:
        print("   ⚠️ 업체 데이터가 없습니다. 스크립트를 종료합니다.")
        return
    
    # public 디렉토리의 모든 HTML 파일 찾기
    print("\n2. HTML 파일 검색 중...")
    public_dir = SCRIPT_DIR / 'public'
    if not public_dir.exists():
        print(f"   ⚠️ {public_dir} 디렉토리를 찾을 수 없습니다.")
        return
    
    html_files = list(public_dir.glob('*.html'))
    print(f"   ✅ {len(html_files)}개 HTML 파일 발견")
    
    # 제외할 파일 목록
    exclude_files = {'notice.html', 'event.html'}
    
    # 각 HTML 파일 처리
    print("\n3. HTML 파일 처리 중...")
    processed_count = 0
    skipped_count = 0
    
    for html_file in html_files:
        # notice.html과 event.html은 제외
        if html_file.name in exclude_files:
            print(f"   ⏭️ {html_file.name}: 공지사항/이벤트 페이지로 건너뜀")
            skipped_count += 1
            continue
        
        if insert_shop_cards_to_html(html_file, shops):
            processed_count += 1
        else:
            skipped_count += 1
    
    print("\n" + "=" * 60)
    print(f"처리 완료: {processed_count}개 파일 수정, {skipped_count}개 파일 건너뜀")
    print("=" * 60)

if __name__ == '__main__':
    main()