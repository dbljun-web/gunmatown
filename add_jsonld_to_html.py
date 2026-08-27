#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
각 HTML 파일에 해당 필터에 맞는 업체들의 JSON-LD를 정적으로 추가하는 스크립트
"""
import sys
import re
import json
from pathlib import Path

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 스크립트 파일의 디렉토리 경로 (스크립트 위치 기준)
SCRIPT_DIR = Path(__file__).parent.absolute()

# shop-card-data.js 파일 읽기
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
    
    # 중괄호로 객체 구분 (더 정교한 파싱)
    # { 로 시작해서 } 로 끝나는 객체 찾기
    brace_count = 0
    start_idx = -1
    current_obj = []
    
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
                
                # image와 alt 필드를 먼저 명시적으로 추출
                # image: '...' 패턴 찾기 (작은따옴표 안의 내용, URL 포함)
                # image: 다음에 작은따옴표로 시작해서 작은따옴표로 끝나는 부분 찾기
                image_pattern = r'image\s*:\s*\'([^\']+)\''
                image_match = re.search(image_pattern, obj_str)
                if image_match:
                    shop['image'] = image_match.group(1)
                
                # alt: '...' 패턴 찾기
                alt_pattern = r'alt\s*:\s*\'([^\']+)\''
                alt_match = re.search(alt_pattern, obj_str)
                if alt_match:
                    shop['alt'] = alt_match.group(1)
                
                # reviews 필드를 먼저 정규식으로 추출 (객체 배열)
                # reviews: [...] 패턴 찾기 (중첩된 객체 배열)
                reviews_match = re.search(r'reviews\s*:\s*\[(.*?)\]', obj_str, re.DOTALL)
                if reviews_match:
                    reviews_content = reviews_match.group(1)
                    reviews = []
                    # 각 review 객체 추출 (여러 줄 처리, 순서 유연하게)
                    # { author: '...', rating: ..., date: '...', review: '...' } 패턴
                    # 필드 순서가 바뀔 수 있으므로 각 필드를 개별적으로 찾기
                    review_blocks = re.finditer(r'\{\s*(.*?)\s*\}', reviews_content, re.DOTALL)
                    for review_block in review_blocks:
                        review_obj_str = review_block.group(1)
                        # author 필드 추출
                        author_match = re.search(r'author\s*:\s*\'([^\']+)\'', review_obj_str)
                        # rating 필드 추출
                        rating_match = re.search(r'rating\s*:\s*([\d.]+)', review_obj_str)
                        # date 필드 추출
                        date_match = re.search(r'date\s*:\s*\'([^\']+)\'', review_obj_str)
                        # review 필드 추출
                        review_match = re.search(r'review\s*:\s*\'([^\']+)\'', review_obj_str)
                        
                        if author_match and rating_match and date_match and review_match:
                            author = author_match.group(1)
                            rating_str = rating_match.group(1)
                            date = date_match.group(1)
                            review_text = review_match.group(1)
                            
                            # rating 파싱
                            try:
                                rating = float(rating_str) if '.' in rating_str else int(rating_str)
                            except:
                                rating = 0
                            
                            reviews.append({
                                'author': author,
                                'rating': rating,
                                'date': date,
                                'review': review_text
                            })
                    if reviews:
                        shop['reviews'] = reviews
                
                # 각 필드 추출 (더 정교하게)
                # key: value 패턴 (value는 여러 줄 가능)
                # 필드 구분: 쉼표로 끝나거나 다음 필드명으로 시작
                field_pattern = r'(\w+)\s*:\s*'
                field_matches = list(re.finditer(field_pattern, obj_str))
                
                for idx, field_match in enumerate(field_matches):
                    key = field_match.group(1)
                    
                    # 이미 추출한 필드는 건너뛰기
                    if key in ['image', 'alt', 'reviews']:
                        continue
                    
                    field_start = field_match.end()
                    
                    # 다음 필드의 시작 위치 찾기 (더 정교하게)
                    if idx + 1 < len(field_matches):
                        # 다음 필드 전까지의 텍스트
                        potential_end = field_matches[idx + 1].start()
                        # 하지만 여러 줄 문자열이나 배열이 있을 수 있으므로
                        # 실제로 다음 필드명이 나오는 위치를 찾아야 함
                        # 쉼표 다음에 공백/줄바꿈 후 필드명이 나오는 패턴 찾기
                        next_field_pattern = r',\s*\n\s*' + re.escape(field_matches[idx + 1].group(1)) + r'\s*:'
                        next_match = re.search(next_field_pattern, obj_str[field_start:])
                        if next_match:
                            field_end = field_start + next_match.start()
                        else:
                            field_end = potential_end
                    else:
                        # 마지막 필드인 경우
                        field_end = len(obj_str) - 1
                    
                    value_str = obj_str[field_start:field_end].strip()
                    
                    # 값 파싱
                    value = None
                    
                    # 배열인 경우
                    if value_str.strip().startswith('['):
                        # 배열 끝 찾기
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
                    
                    # 문자열인 경우 (작은따옴표)
                    elif value_str.startswith("'") and value_str.endswith("'"):
                        value = value_str[1:-1]
                    # 문자열인 경우 (큰따옴표)
                    elif value_str.startswith('"') and value_str.endswith('"'):
                        value = value_str[1:-1]
                    # 여러 줄 문자열인 경우
                    elif value_str.startswith("'") and not value_str.endswith("'"):
                        # 여러 줄 문자열 추출 (개선된 버전)
                        # 첫 번째 작은따옴표부터 마지막 작은따옴표까지 찾기
                        quote_start = value_str.find("'")
                        quote_end = value_str.rfind("'")
                        if quote_end > quote_start:
                            # 작은따옴표 안의 내용 추출
                            value = value_str[quote_start+1:quote_end]
                        else:
                            # 닫는 따옴표가 없으면 전체를 문자열로 처리
                            value = value_str.strip().strip("'").strip(',')
                    # URL이나 긴 문자열인 경우 (작은따옴표로 시작하고 끝나지만 중간에 줄바꿈이 있을 수 있음)
                    elif "'" in value_str and value_str.count("'") >= 2:
                        # 첫 번째와 마지막 작은따옴표 사이의 내용 추출
                        first_quote = value_str.find("'")
                        last_quote = value_str.rfind("'")
                        if last_quote > first_quote:
                            value = value_str[first_quote+1:last_quote]
                        else:
                            value = value_str.strip().strip("'").strip(',')
                    # 작은따옴표로 시작하지만 끝나지 않은 경우 (다음 필드까지 포함된 경우)
                    elif value_str.startswith("'") and not value_str.endswith("'"):
                        # 원본 obj_str에서 실제 값의 끝을 찾기
                        # 현재 필드의 시작부터 다음 필드명이 나오는 위치까지 검색
                        if idx + 1 < len(field_matches):
                            next_field_name = field_matches[idx + 1].group(1)
                            # 현재 위치부터 다음 필드명 전까지에서 마지막 작은따옴표 찾기
                            search_end = field_matches[idx + 1].start()
                            search_text = obj_str[field_start:search_end]
                            last_quote_in_range = search_text.rfind("'")
                            if last_quote_in_range > 0:
                                value = search_text[:last_quote_in_range].strip().strip("'")
                            else:
                                value = value_str.strip().strip("'").strip(',')
                        else:
                            value = value_str.strip().strip("'").strip(',')
                    
                    # 숫자인 경우
                    elif value_str.replace('.', '').replace('-', '').isdigit():
                        value = float(value_str) if '.' in value_str else int(value_str)
                    # boolean인 경우
                    elif value_str == 'true':
                        value = True
                    elif value_str == 'false':
                        value = False
                    # 그 외
                    else:
                        value = value_str.strip().rstrip(',').strip()
                        # 따옴표 제거
                        if (value.startswith("'") and value.endswith("'")) or (value.startswith('"') and value.endswith('"')):
                            value = value[1:-1]
                    
                    if value is not None:
                        shop[key] = value
                
                if shop:
                    shops.append(shop)
                
                start_idx = -1
        i += 1
    
    return shops

# 지역 매핑 (script.js의 districtMap과 동일)
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

# 상세지역 매핑 (script.js의 districtMap.districts와 동일)
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

# 필터 키워드 매핑
FILTER_KEYWORDS = {
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

def matches_filter(shop, filter_type):
    """업체가 필터에 맞는지 확인"""
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
        keywords = FILTER_KEYWORDS.get('massage', [])
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
        keywords = FILTER_KEYWORDS.get(filter_type, [])
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

def format_review_author_name(author_name, region, district):
    """리뷰 작성자 이름에 지역과 상세지역 추가"""
    if not author_name:
        return ''
    
    # 지역과 상세지역이 모두 있으면: "지역 상세지역 author"
    if region and district:
        return f'{region} {district} {author_name}'
    # 지역만 있으면: "지역 author"
    elif region:
        return f'{region} {author_name}'
    # 둘 다 없으면: "author"
    else:
        return author_name

def parse_price_range(price_str):
    """가격 문자열을 파싱하여 priceRange 형식으로 변환 (최저가 + 10만원)"""
    if not price_str:
        return None
    
    # 콤마 제거 후 숫자만 추출
    import re
    # 콤마와 단위 제거
    price_clean = price_str.replace(',', '').replace('원', '').replace('~', '').strip()
    # 연속된 숫자만 추출
    numbers = re.findall(r'\d+', price_clean)
    if not numbers:
        return None
    
    # 가장 긴 숫자를 최저가로 사용 (예: "120,000원~" -> 120000)
    # 숫자 길이로 정렬하여 가장 긴 숫자 선택
    if len(numbers) > 1:
        # 숫자 길이가 가장 긴 것을 선택
        min_price = max([int(n) for n in numbers], key=lambda x: len(str(x)))
    else:
        min_price = int(numbers[0])
    
    max_price = min_price + 100000  # 최저가 + 10만원
    
    return f"₩{min_price}-₩{max_price}"

def parse_operating_hours(operating_hours_str):
    """운영 시간 문자열을 파싱하여 구조화된 형식으로 변환"""
    if not operating_hours_str:
        return None
    
    opens = ""
    closes = ""
    
    # 24시간 체크
    if '24시간' in operating_hours_str or '24시' in operating_hours_str:
        opens = "00:00"
        closes = "23:59"
    elif '~' in operating_hours_str:
        parts = operating_hours_str.split('~')
        if len(parts) >= 2:
            open_str = parts[0].strip()
            close_str = parts[1].strip()
            
            # "오전 10시", "새벽 6시" 형식 파싱
            # 오전/오후 시간 변환
            def parse_time(time_str):
                # 괄호 제거
                time_str = re.sub(r'\([^)]*\)', '', time_str).strip()
                
                # 숫자 추출
                hour_match = re.search(r'(\d+)', time_str)
                if not hour_match:
                    return None
                
                hour = int(hour_match.group(1))
                
                # 오전/오후/새벽 처리
                if '새벽' in time_str or '오전' in time_str:
                    if hour == 12:
                        hour = 0
                elif '오후' in time_str:
                    if hour < 12:
                        hour += 12
                    elif hour == 12:
                        hour = 12
                elif '정오' in time_str or '정오' in time_str:
                    hour = 12
                
                return f"{hour:02d}:00"
            
            opens = parse_time(open_str) or "10:00"
            closes = parse_time(close_str) or "22:00"
    
    if opens and closes:
        return {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday", "Tuesday", "Wednesday", "Thursday", 
                "Friday", "Saturday", "Sunday"
            ],
            "opens": opens,
            "closes": closes
        }
    
    return None

def parse_address(address_str):
    """주소를 파싱하여 streetAddress와 addressRegion 분리"""
    if not address_str:
        return None, None, None
    
    # 주소 파싱 (예: "제주특별자치도 제주시 연동 261-18")
    # 특별자치도, 광역시, 시 등 제거
    region = None
    district = None
    street = None
    
    # 지역 추출
    if '제주' in address_str:
        region = '제주특별자치도'
    elif '서울' in address_str:
        region = '서울특별시'
    elif '부산' in address_str:
        region = '부산광역시'
    elif '인천' in address_str:
        region = '인천광역시'
    elif '대구' in address_str:
        region = '대구광역시'
    elif '광주' in address_str:
        region = '광주광역시'
    elif '대전' in address_str:
        region = '대전광역시'
    elif '울산' in address_str:
        region = '울산광역시'
    elif '세종' in address_str:
        region = '세종특별자치시'
    elif '경기' in address_str:
        region = '경기도'
    elif '강원' in address_str:
        region = '강원도'
    elif '충북' in address_str:
        region = '충청북도'
    elif '충남' in address_str:
        region = '충청남도'
    elif '전북' in address_str:
        region = '전라북도'
    elif '전남' in address_str:
        region = '전라남도'
    elif '경북' in address_str:
        region = '경상북도'
    elif '경남' in address_str:
        region = '경상남도'
    
    # 구/시 추출 (주소에서)
    district_match = re.search(r'([가-힣]+구|[가-힣]+시)', address_str)
    if district_match:
        district = district_match.group(1)
    
    # 상세 주소 (동, 번지 등)
    # "연동 261-18" 형식 추출
    street_match = re.search(r'([가-힣]+동?|[가-힣]+리?)\s*(\d+[-\d]*)', address_str)
    if street_match:
        street = f"{street_match.group(1)} {street_match.group(2)}"
    else:
        # 번지만 추출
        num_match = re.search(r'(\d+[-\d]*)', address_str)
        if num_match:
            street = num_match.group(1)
    
    return street, district, region

def get_amenity_features(shop):
    """업체 정보를 바탕으로 amenityFeature 생성"""
    features = []
    
    detail_address = shop.get('detailAddress', '')
    description = shop.get('description', '')
    combined_text = (detail_address + ' ' + description).lower()
    
    # 주차 관련
    if '주차' in combined_text or 'parking' in combined_text:
        features.append({
            "@type": "LocationFeatureSpecification",
            "name": "주차 가능"
        })
    
    # 프라이빗 관련
    if '프라이빗' in combined_text or '1인' in combined_text:
        features.append({
            "@type": "LocationFeatureSpecification",
            "name": "프라이빗 1인실"
        })
    
    # 샤워실 관련
    if '샤워' in combined_text or 'shower' in combined_text:
        features.append({
            "@type": "LocationFeatureSpecification",
            "name": "샤워실 완비"
        })
    
    return features if features else None

def create_service_name(service):
    """서비스 이름을 더 상세하게 변환"""
    service_map = {
        '스웨디시': '스웨디시 마사지',
        '왁싱': '왁싱',
        '아로마': '아로마 마사지',
        '로미로미': '로미로미',
        '슈얼마사지': '슈얼 마사지',
        '타이': '타이 마사지',
        '발': '발마사지',
        '족욕': '족욕',
        '출장마사지': '출장마사지',
        '스파': '스파',
        '중국': '중국 마사지',
        '지압': '지압 마사지',
    }
    
    # 매핑 확인
    for key, value in service_map.items():
        if key in service:
            return value
    
    # 매핑 없으면 원래 이름 + 마사지 (이미 마사지가 포함되지 않은 경우)
    if '마사지' not in service:
        return f"{service} 마사지"
    
    return service

def create_jsonld(shop, page_region=None, page_district=None):
    """업체 데이터로부터 상세한 JSON-LD 생성
    
    Args:
        shop: 업체 데이터
        page_region: 현재 페이지의 지역 (review author name에 사용)
        page_district: 현재 페이지의 상세지역 (review author name에 사용)
    """
    # 기본 정보
    name = shop.get('name', '')
    description = shop.get('description', '')
    
    # URL 생성 (file 필드 사용)
    file_name = shop.get('file', '')
    if file_name:
        url = f"https://msg1000.com/{file_name}"
    else:
        # file이 없으면 id로 생성
        shop_id = shop.get('id', 0)
        url = f"https://msg1000.com/company-shop-{shop_id}.html"
    
    # 이미지 배열 (기본 이미지 + 추가 이미지)
    main_image = shop.get('image', '')
    alt_text = shop.get('alt', '')
    image_list = []
    if main_image:
        # 상대 경로인 경우 절대 URL로 변환
        if main_image.startswith('images/') or main_image.startswith('./images/'):
            main_image = f"https://msg1000.com/{main_image.lstrip('./')}"
        
        # 기본 이미지 URL 정규화
        # w=400&h=250 -> w=1200&h=630 (OG 이미지 크기)
        # w=800&h=600 -> w=1200&h=630
        base_url = main_image
        if 'w=400&h=250' in base_url:
            base_url = base_url.replace('w=400&h=250', 'w=1200&h=630')
        elif 'w=800&h=600' in base_url:
            base_url = base_url.replace('w=800&h=600', 'w=1200&h=630')
        elif 'fit=crop' in base_url and 'w=' not in base_url:
            # 크기 파라미터가 없으면 추가
            if '?' in base_url:
                base_url += '&w=1200&h=630&fit=crop'
            else:
                base_url += '?w=1200&h=630&fit=crop'
        
        # ImageObject 형식으로 추가 (alt 텍스트 포함)
        image_obj = {
            "@type": "ImageObject",
            "url": base_url
        }
        if alt_text:
            # alt 필드로 추가
            image_obj["alt"] = alt_text
        image_list.append(image_obj)
        
        # 두 번째 이미지 (다른 각도 또는 추가 이미지)
        if 'unsplash.com' in main_image:
            # 같은 카테고리에서 다른 이미지 ID 사용
            second_image = main_image
            # photo ID 변경
            if 'photo-1571896349842-33c89424de2d' in second_image:
                second_image = second_image.replace('photo-1571896349842-33c89424de2d', 'photo-1600334089648-b0d9d3028eb2')
            # 크기 조정
            if 'w=400&h=250' in second_image:
                second_image = second_image.replace('w=400&h=250', 'w=800&h=600')
            elif 'w=800&h=600' not in second_image and 'w=' in second_image:
                # 기존 크기 파라미터를 800x600으로 변경
                second_image = re.sub(r'w=\d+&h=\d+', 'w=800&h=600', second_image)
            elif 'fit=crop' in second_image and 'w=' not in second_image:
                if '?' in second_image:
                    second_image += '&w=800&h=600&fit=crop'
                else:
                    second_image += '?w=800&h=600&fit=crop'
            
            # 두 번째 이미지도 ImageObject로 추가 (alt 텍스트는 첫 번째 이미지와 동일)
            second_image_obj = {
                "@type": "ImageObject",
                "url": second_image
            }
            if alt_text:
                # alt 필드로 추가
                second_image_obj["alt"] = alt_text
            image_list.append(second_image_obj)
    
    # 전화번호 (하이픈 유지)
    phone = shop.get('phone', '')
    
    # 주소 파싱
    address_str = shop.get('address', '')
    street, district, region = parse_address(address_str)
    
    # 지역 정보 (shop 데이터에서 가져오기)
    if not region:
        shop_region = shop.get('region', '')
        if shop_region == '제주':
            region = '제주특별자치도'
        elif shop_region == '서울':
            region = '서울특별시'
        # 기타 지역도 매핑 가능
    
    if not district:
        district = shop.get('district', '')
    
    if not street and address_str:
        # streetAddress를 간단하게 (전체 주소에서 지역 부분 제거)
        street = address_str
        # 지역명 제거 (제주특별자치도, 서울특별시 등)
        if region:
            street = street.replace(region, '').strip()
        # 구/시 제거 (제주시, 서울시 등)
        if district:
            street = street.replace(district, '').strip()
        # 앞뒤 공백 제거 및 콤마 정리
        street = street.strip().strip(',').strip()
    
    # 가격 범위 파싱
    price_str = shop.get('price', '')
    price_range = parse_price_range(price_str)
    
    # 운영 시간 파싱
    operating_hours = shop.get('operatingHours', '')
    opening_hours_spec = parse_operating_hours(operating_hours)
    
    # 평점 정보
    rating = shop.get('rating', 0)
    
    # 리뷰 정보 확인 (reviewCount는 실제 reviews 배열의 길이를 사용)
    reviews = shop.get('reviews', [])
    if reviews and isinstance(reviews, list) and len(reviews) > 0:
        # reviews 배열이 있으면 그 길이를 reviewCount로 사용
        review_count = len(reviews)
    else:
        # reviews 배열이 없으면 기존 reviewCount 값 사용 (fallback)
        review_count = shop.get('reviewCount', 0)
    
    # 서비스 목록
    services = shop.get('services', [])
    if isinstance(services, str):
        services = [services]
    
    # amenityFeature
    amenities = get_amenity_features(shop)
    
    # JSON-LD 생성
    jsonld = {
        "@context": "https://schema.org",
        "@type": "HealthAndBeautyBusiness",
        "name": name,
        "url": url,
        "description": description,
        "telephone": phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": street if street else (address_str if address_str else ''),
            "addressLocality": district,
            "addressRegion": region if region else (shop.get('region', '') if shop.get('region', '') else ''),
            "addressCountry": "KR"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": str(rating),
            "bestRating": "5",
            "reviewCount": int(review_count) if review_count else 0
        }
    }
    
    # 이미지 추가
    if image_list:
        jsonld["image"] = image_list
    
    # 가격 범위 추가
    if price_range:
        jsonld["priceRange"] = price_range
        jsonld["currenciesAccepted"] = "KRW"
    
    # 운영 시간 추가
    if opening_hours_spec:
        jsonld["openingHoursSpecification"] = [opening_hours_spec]
    
    # 편의시설 추가
    if amenities:
        jsonld["amenityFeature"] = amenities
    
    # 서비스 목록 추가
    if services:
        jsonld["hasOfferCatalog"] = {
            "@type": "OfferCatalog",
            "name": "주요 서비스",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": create_service_name(service)
                    }
                }
                for service in services
            ]
        }
    
    # 리뷰 추가 (위에서 이미 가져온 reviews 변수 재사용)
    if reviews and isinstance(reviews, list):
        # 현재 페이지의 지역 정보 사용
        # page_region/page_district가 None이면 빈 문자열로 처리 (지역 정보 없음)
        review_region = page_region if page_region is not None else ''
        review_district = page_district if page_district is not None else ''
        
        # itemReviewed 객체 생성 (리뷰가 평가하는 항목)
        item_reviewed = {
            "@type": "HealthAndBeautyBusiness",
            "name": name,
            "url": url
        }
        
        jsonld["review"] = [
            {
                "@type": "Review",
                "itemReviewed": item_reviewed,
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": str(int(review.get('rating', 0)))
                },
                "author": {
                    "@type": "Person",
                    "name": format_review_author_name(review.get('author', ''), review_region, review_district)
                },
                "datePublished": review.get('date', ''),
                "reviewBody": review.get('review', '')
            }
            for review in reviews
        ]
    
    return jsonld

def generate_massage_list_jsonld(shops, region, district, filter_type):
    """massageList ItemList JSON-LD 생성 (업체 목록)"""
    massage_list_elements = []
    position = 1
    
    for shop in shops:
        # 각 업체의 JSON-LD 생성
        shop_jsonld = create_jsonld(shop, page_region=region, page_district=district)
        
        # ItemList의 itemListElement로 추가
        massage_list_elements.append({
            "@type": "ListItem",
            "position": position,
            "item": shop_jsonld
        })
        position += 1
    
    # massageList 이름 생성
    massage_list_name = "massageList"
    
    massage_list_jsonld = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": massage_list_name,
        "description": f"마사지 업체 목록 - 총 {len(shops)}개 업체",
        "numberOfItems": len(shops),
        "itemListElement": massage_list_elements
    }
    
    return massage_list_jsonld

def generate_itemlist_jsonld(filename, region, district, filter_type):
    """ItemList JSON-LD 생성 (footer-link 모달 링크 목록)"""
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
    filters_to_show = [f for f in all_filters if f['key'] != filter_type]
    
    # 파일명에서 region_key와 district_key 추출
    name = filename.replace('.html', '')
    parts = name.split('-')
    region_key = None
    district_key = None
    
    if parts[0] in REGION_MAP:
        region_key = parts[0]
        if len(parts) >= 2 and parts[1] not in FILTER_KEYWORDS:
            district_key = parts[1]
    
    # 기본 페이지 목록 (지역/세부지역 정보 없음)
    base_pages = ['index.html', 'massage.html', 'outcall.html', 'swedish.html', 
                  'thai.html', 'aroma.html', 'waxing.html', 'chinese.html', 'foot.html', 'spa.html']
    is_base_page = filename in base_pages
    
    # ItemList 요소 생성
    item_list_elements = []
    position = 1
    
    for filter_item in filters_to_show:
        # URL 생성
        if is_base_page or not region_key:
            # 기본 페이지인 경우
            if filter_item['key'] == 'massage':
                url = 'https://www.msg1000.com/massage.html'
            elif filter_item['key'] == 'outcall':
                url = 'https://www.msg1000.com/outcall.html'
            else:
                url = f'https://www.msg1000.com/{filter_item["key"]}.html'
            display_name = filter_item['name']
        elif district_key and region_key:
            # 지역과 상세지역이 모두 있는 경우
            url = f'https://www.msg1000.com/{region_key}-{district_key}-{filter_item["key"]}.html'
            display_name = f'{region} {district} {filter_item["name"]}'
        elif region_key:
            # 지역만 있는 경우
            url = f'https://www.msg1000.com/{region_key}-{filter_item["key"]}.html'
            display_name = f'{region} {filter_item["name"]}'
        else:
            # 기본
            if filter_item['key'] == 'massage':
                url = 'https://www.msg1000.com/massage.html'
            elif filter_item['key'] == 'outcall':
                url = 'https://www.msg1000.com/outcall.html'
            else:
                url = f'https://www.msg1000.com/{filter_item["key"]}.html'
            display_name = filter_item['name']
        
        item_list_elements.append({
            "@type": "ListItem",
            "position": position,
            "url": url,
            "name": display_name
        })
        position += 1
    
    # ItemList 이름과 설명 생성
    if district and region:
        list_name = f'{region} {district} 마사지·출장안마 서비스 전체보기'
        list_description = f'{region} {district} 지역에서 이용 가능한 출장마사지, 스웨디시, 타이마사지, 아로마, 발마사지 등 모든 마사지·안마 서비스'
    elif region:
        list_name = f'{region} 마사지·출장안마 서비스 전체보기'
        list_description = f'{region} 지역에서 이용 가능한 출장마사지, 스웨디시, 타이마사지, 아로마, 발마사지 등 모든 마사지·안마 서비스'
    else:
        list_name = '마사지·출장안마 서비스 전체보기'
        list_description = '출장마사지, 스웨디시, 타이마사지, 아로마, 발마사지 등 모든 마사지·안마 서비스'
    
    jsonld = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": list_name,
        "description": list_description,
        "numberOfItems": len(item_list_elements),
        "itemListElement": item_list_elements
    }
    
    return jsonld

def extract_region_and_filter(filename):
    """파일명에서 지역과 필터 추출"""
    # .html 제거
    name = filename.replace('.html', '')
    parts = name.split('-')
    
    region = None
    district = None
    filter_type = None
    region_key = None
    
    # 첫 번째 부분이 지역인지 확인
    if parts[0] in REGION_MAP:
        region = REGION_MAP[parts[0]]
        region_key = parts[0]
        
        # 두 번째 부분이 구인지 필터인지 확인
        if len(parts) >= 2:
            # 필터 키워드인지 확인
            if parts[1] in FILTER_KEYWORDS:
                filter_type = parts[1]
            else:
                # 구로 간주 - DISTRICT_MAP에서 한글 이름으로 변환
                district_key = parts[1]
                if region_key in DISTRICT_MAP and district_key in DISTRICT_MAP[region_key]:
                    district = DISTRICT_MAP[region_key][district_key]
                else:
                    # 매핑에 없으면 그대로 사용 (fallback)
                    district = district_key
                
                # 세 번째 부분이 필터인지 확인
                if len(parts) >= 3 and parts[2] in FILTER_KEYWORDS:
                    filter_type = parts[2]
        else:
            # 지역만 있는 경우
            pass
    else:
        # 기본 필터 페이지 (예: waxing.html, massage.html)
        if parts[0] in FILTER_KEYWORDS:
            filter_type = parts[0]
    
    return region, district, filter_type

def add_jsonld_to_html(html_file, shops):
    """HTML 파일에 JSON-LD 추가"""
    content = html_file.read_text(encoding='utf-8')
    
    # 파일명에서 지역과 필터 추출
    filename = html_file.name
    
    # company- 파일인 경우: 파일명으로 해당 업체 찾기
    if filename.startswith('company-'):
        matching_shops = []
        for shop in shops:
            shop_file = shop.get('file', '')
            if shop_file == filename:
                matching_shops.append(shop)
                break
        
        if matching_shops:
            print(f"\n처리 중: {filename} (company- 파일)")
            print(f"  매칭된 업체: {matching_shops[0].get('name', '')}")
            # company- 파일은 단일 업체 JSON-LD만 생성
            jsonld = create_jsonld(matching_shops[0], page_region=None, page_district=None)
            jsonld_str = json.dumps(jsonld, ensure_ascii=False, indent=2)
            script_tag = f'\n    <script type="application/ld+json">\n{jsonld_str}\n    </script>'
            
            # 기존 JSON-LD 제거
            jsonld_pattern = r'\s*<script[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>\s*'
            content = re.sub(jsonld_pattern, '', content, flags=re.DOTALL)
            content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
            
            # </head> 태그 앞에 JSON-LD 추가
            head_end_pattern = r'(</head>)'
            if re.search(head_end_pattern, content):
                content = re.sub(head_end_pattern, script_tag + r'\n    \1', content, count=1)
            else:
                body_pattern = r'(<body[^>]*>)'
                if re.search(body_pattern, content):
                    content = re.sub(body_pattern, script_tag + r'\n    \1', content, count=1)
            
            html_file.write_text(content, encoding='utf-8')
            print(f"  ✅ JSON-LD 추가 완료 (company- 파일)")
            return True
        else:
            print(f"\n처리 중: {filename} (company- 파일, 매칭된 업체 없음)")
            return False
    
    region, district, filter_type = extract_region_and_filter(filename)
    
    print(f"\n처리 중: {filename}")
    print(f"  지역: {region}, 구: {district}, 필터: {filter_type}")
    
    # 해당하는 업체 필터링
    matching_shops = []
    for shop in shops:
        shop_region = shop.get('region', '')
        shop_district = shop.get('district', '')
        
        # 지역 매칭
        if region and shop_region != region:
            continue
        
        # 구 매칭 (구가 지정된 경우)
        # 출장마사지인 경우: 제주 지역이면 모든 상세지역에 매칭
        shop_type = shop.get('type', '')
        services = shop.get('services', [])
        if isinstance(services, str):
            services = [services]
        is_outcall = (shop_type == '출장마사지' or '출장마사지' in services)
        
        if district:
            if is_outcall and shop_region == '제주':
                # 제주 출장마사지는 모든 상세지역에 매칭
                # 제주시, 서귀포 모두 매칭 (district 체크 스킵)
                pass  # 모든 상세지역에 매칭되도록 통과
            else:
                # 일반 업체는 district가 정확히 일치해야 함
                if shop_district != district:
                    continue
        
        # 필터 매칭
        if not matches_filter(shop, filter_type):
            continue
        
        matching_shops.append(shop)
    
    print(f"  매칭된 업체 수: {len(matching_shops)}")
    
    # 기존 모든 JSON-LD 스크립트 태그 제거 (중복 방지)
    # 모든 application/ld+json 스크립트 태그를 제거 (타입에 관계없이)
    # 앞뒤의 빈 줄도 함께 제거
    jsonld_pattern = r'\s*<script[^>]*type=["\']application/ld\+json["\'][^>]*>.*?</script>\s*'
    content = re.sub(jsonld_pattern, '', content, flags=re.DOTALL)
    
    # 연속된 빈 줄 정리 (3개 이상의 빈 줄을 2개로)
    content = re.sub(r'\n\s*\n\s*\n+', '\n\n', content)
    print(f"  기존 JSON-LD 스크립트 태그 제거 완료")
    
    # ItemList JSON-LD는 항상 추가 (업체가 없어도)
    # 업체가 없으면 ItemList만 추가
    if not matching_shops:
        print(f"  ⚠️ 매칭된 업체가 없습니다. ItemList JSON-LD만 추가합니다.")
        
        # ItemList JSON-LD 생성 및 추가
        itemlist_jsonld = generate_itemlist_jsonld(filename, region, district, filter_type)
        itemlist_jsonld_str = json.dumps(itemlist_jsonld, ensure_ascii=False, indent=2)
        itemlist_script = f'\n    <script type="application/ld+json">\n{itemlist_jsonld_str}\n    </script>'
        
        # </head> 태그 앞에 JSON-LD 추가
        head_end_pattern = r'(</head>)'
        if re.search(head_end_pattern, content):
            content = re.sub(
                head_end_pattern,
                itemlist_script + r'\n    \1',
                content,
                count=1
            )
        else:
            body_pattern = r'(<body[^>]*>)'
            if re.search(body_pattern, content):
                content = re.sub(
                    body_pattern,
                    itemlist_script + r'\n    \1',
                    content,
                    count=1
                )
        
        html_file.write_text(content, encoding='utf-8')
        print(f"  ✅ ItemList JSON-LD 추가 완료")
        return True
    
    # massageList 컨테이너 생성 (ItemList 형식)
    # 각 업체를 massage-card 형식으로 ItemList에 포함
    massage_list_jsonld = generate_massage_list_jsonld(matching_shops, region, district, filter_type)
    
    jsonld_scripts = []
    massage_list_str = json.dumps(massage_list_jsonld, ensure_ascii=False, indent=2)
    massage_list_script = f'\n    <script type="application/ld+json">\n{massage_list_str}\n    </script>'
    jsonld_scripts.append(massage_list_script)
    
    # ItemList JSON-LD 생성 (footer-link 모달 링크 목록)
    itemlist_jsonld = generate_itemlist_jsonld(filename, region, district, filter_type)
    itemlist_jsonld_str = json.dumps(itemlist_jsonld, ensure_ascii=False, indent=2)
    itemlist_script = f'\n    <script type="application/ld+json">\n{itemlist_jsonld_str}\n    </script>'
    jsonld_scripts.append(itemlist_script)
    
    # </head> 태그 앞에 JSON-LD 추가
    jsonld_block = ''.join(jsonld_scripts) + '\n'
    
    # </head> 태그 찾기
    head_end_pattern = r'(</head>)'
    if re.search(head_end_pattern, content):
        content = re.sub(head_end_pattern, jsonld_block + r'\1', content, count=1)
    else:
        # </head>가 없으면 </body> 앞에 추가
        body_end_pattern = r'(</body>)'
        if re.search(body_end_pattern, content):
            content = re.sub(body_end_pattern, jsonld_block + r'\1', content, count=1)
        else:
            print(f"  ⚠️ </head> 또는 </body> 태그를 찾을 수 없습니다.")
            return False
    
    # 파일 저장
    html_file.write_text(content, encoding='utf-8')
    print(f"  ✅ JSON-LD 추가 완료 ({len(matching_shops)}개 업체 + ItemList)")
    return True

def main():
    """메인 함수"""
    public_dir = SCRIPT_DIR / 'public'
    if not public_dir.exists():
        print("ERROR: public 디렉토리를 찾을 수 없습니다.")
        return
    
    # shop-card-data.js 읽기
    print("shop-card-data.js 읽는 중...")
    shops = read_shop_card_data()
    print(f"총 {len(shops)}개 업체 데이터 로드됨")
    
    if not shops:
        print("ERROR: 업체 데이터를 로드할 수 없습니다.")
        return
    
    # HTML 파일 목록
    html_files = list(public_dir.glob('*.html'))
    
    # 제외할 파일
    excluded = {
        'index.html', 'detail.html', 'admin.html', 'event.html',
        'favorites.html', 'freeboard.html', 'notice.html',
        'partnership.html', 'reviews.html', 'users-management.html',
        'theme-filter-dropdown.html', 'login.html', 'signup.html'
    }
    
    # company- 접두사 파일도 포함 (개별 업체 상세 페이지)
    html_files = [f for f in html_files if f.name not in excluded]
    
    print(f"\n총 {len(html_files)}개 HTML 파일 처리 시작...")
    
    success_count = 0
    for html_file in sorted(html_files):
        try:
            if add_jsonld_to_html(html_file, shops):
                success_count += 1
        except Exception as e:
            print(f"  ❌ 오류 발생: {e}")
    
    print(f"\n완료: {success_count}/{len(html_files)}개 파일에 JSON-LD 추가됨")

if __name__ == '__main__':
    main()

