#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
shop-card-data.js의 모든 업체에 dong 필드 추가 스크립트
주소에서 동/역 정보를 추출하여 district 다음에 dong 필드를 추가합니다.
"""
import sys
import re
from pathlib import Path

# Windows에서 UTF-8 출력 설정
if sys.platform == 'win32':
    try:
        import os
        import io
        os.environ['PYTHONIOENCODING'] = 'utf-8'
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    except:
        pass

SCRIPT_DIR = Path(__file__).parent.absolute()
SHOP_CARD_DATA_FILE = SCRIPT_DIR / 'public' / 'shop-card-data.js'

def extract_dong_from_address(address, detail_address):
    """주소에서 동 이름 추출"""
    if not address:
        return ''
    
    # 동 패턴: 한글 + 동, 리, 가
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

def add_dong_fields_to_shops():
    """shop-card-data.js 파일을 읽어서 모든 업체에 dong 필드 추가"""
    print("=" * 60)
    print("shop-card-data.js에 dong 필드 추가 스크립트")
    print("=" * 60)
    
    if not SHOP_CARD_DATA_FILE.exists():
        print(f"❌ 파일을 찾을 수 없습니다: {SHOP_CARD_DATA_FILE}")
        return
    
    # 파일 읽기
    print(f"\n1. {SHOP_CARD_DATA_FILE.name} 파일 읽는 중...")
    content = SHOP_CARD_DATA_FILE.read_text(encoding='utf-8')
    print(f"   ✅ 파일 읽기 완료 ({len(content)} 문자)")
    
    # window.shopCardData = [ 부분 찾기
    start_pattern = r'window\.shopCardData\s*=\s*\['
    start_match = re.search(start_pattern, content)
    if not start_match:
        print("   ❌ window.shopCardData를 찾을 수 없습니다.")
        return
    
    # 각 업체 객체 찾기 (정규식으로)
    # 패턴: { ... id: 숫자, ... district: '...', ... address: '...', ... }
    shop_pattern = r'(\{\s*id:\s*\d+[^}]*?district:\s*[\'"]([^\'"]+)[\'"][^}]*?address:\s*[\'"]([^\'"]+)[\'"][^}]*?)(detailAddress:\s*[\'"]([^\'"]*?)[\'"])?'
    
    # 더 정확한 패턴: 업체 객체 전체를 찾기
    # { 부터 }, 까지 (중첩된 객체 고려)
    shops = []
    brace_count = 0
    current_shop_start = None
    current_shop_content = ''
    
    # window.shopCardData = [ 이후부터 시작
    search_start = start_match.end()
    
    i = search_start
    while i < len(content):
        if content[i] == '{':
            if brace_count == 0:
                current_shop_start = i
                current_shop_content = '{'
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0 and current_shop_start is not None:
                current_shop_content += '}'
                shops.append((current_shop_start, i + 1, current_shop_content))
                current_shop_start = None
                current_shop_content = ''
        elif current_shop_start is not None:
            current_shop_content += content[i]
        i += 1
    
    print(f"\n2. 업체 객체 {len(shops)}개 발견")
    
    # 각 업체에 dong 필드 추가
    modified_count = 0
    added_count = 0
    skipped_count = 0
    
    # 역순으로 처리 (뒤에서부터 수정하여 인덱스 변경 방지)
    for shop_start, shop_end, shop_content in reversed(shops):
        # 이미 dong 필드가 있는지 확인
        if re.search(r'\bdong:\s*[\'"]', shop_content):
            skipped_count += 1
            continue
        
        # district와 address 추출
        district_match = re.search(r'\bdistrict:\s*[\'"]([^\'"]+)[\'"]', shop_content)
        address_match = re.search(r'\baddress:\s*[\'"]([^\'"]+)[\'"]', shop_content)
        detail_address_match = re.search(r'\bdetailAddress:\s*[\'"]([^\'"]*?)[\'"]', shop_content)
        
        if not district_match or not address_match:
            skipped_count += 1
            continue
        
        district = district_match.group(1)
        address = address_match.group(1)
        detail_address = detail_address_match.group(1) if detail_address_match else ''
        
        # 동 이름 추출
        dong = extract_dong_from_address(address, detail_address)
        
        if not dong:
            skipped_count += 1
            continue
        
        # district 다음에 dong 필드 추가
        # district: '...', 다음에 dong: '...', 추가
        district_pattern = r'(\bdistrict:\s*[\'"]' + re.escape(district) + r'[\'"])'
        replacement = r'\1,\n    dong: \'' + dong + '\','
        
        new_shop_content = re.sub(district_pattern, replacement, shop_content, count=1)
        
        if new_shop_content != shop_content:
            # 원본 파일에서 교체
            content = content[:shop_start] + new_shop_content + content[shop_end:]
            added_count += 1
            print(f"   ✅ [{added_count}] dong 필드 추가: {dong} (주소: {address[:40]}...)")
        else:
            modified_count += 1
    
    # 파일 저장
    if added_count > 0:
        print(f"\n3. 파일 저장 중...")
        SHOP_CARD_DATA_FILE.write_text(content, encoding='utf-8')
        print(f"   ✅ 파일 저장 완료")
    
    print(f"\n{'=' * 60}")
    print(f"최종 결과:")
    print(f"  - dong 필드 추가: {added_count}개")
    print(f"  - 이미 있음/추출 실패: {skipped_count}개")
    print(f"{'=' * 60}")

if __name__ == '__main__':
    add_dong_fields_to_shops()

