#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
정적 HTML 파일의 massage-card에 data-show-healing-shop 속성 추가
"""
import sys
import re
from pathlib import Path

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).parent.absolute()

def add_data_show_healing_shop(content):
    """massage-card에 data-show-healing-shop 속성 추가"""
    modified = False
    
    # shop-type에 "힐링샵"이 있는지 확인하는 패턴
    # <div class="massage-card" ...> 다음에 <div class="shop-type">힐링샵</div>가 있으면 true
    def replace_card(match):
        card_start = match.group(0)
        # 이미 data-show-healing-shop 속성이 있으면 건너뛰기
        if 'data-show-healing-shop' in card_start:
            return card_start
        
        # shop-type 요소에서 "힐링샵" 확인
        card_full = match.group(0)
        # massage-card div의 전체 내용을 찾기 위해 더 넓은 범위 검색
        # shop-type이 "힐링샵"을 포함하는지 확인
        if re.search(r'<div[^>]*class=["\']shop-type["\'][^>]*>.*?힐링샵', card_full, re.DOTALL | re.IGNORECASE):
            show_healing_shop = 'true'
        else:
            show_healing_shop = 'false'
        
        # data-show-healing-shop 속성 추가
        if 'data-type=' in card_start:
            # data-type 뒤에 추가
            new_card = re.sub(
                r'(data-type=["\'][^"\']*["\'])',
                rf'\1 data-show-healing-shop="{show_healing_shop}"',
                card_start
            )
        else:
            # data-type이 없으면 class 뒤에 추가
            new_card = re.sub(
                r'(class=["\'][^"\']*massage-card[^"\']*["\'])',
                rf'\1 data-show-healing-shop="{show_healing_shop}"',
                card_start
            )
        
        return new_card
    
    # massage-card div 찾기 (여러 줄에 걸쳐 있을 수 있음)
    pattern = r'<div[^>]*class=["\'][^"\']*massage-card[^"\']*["\'][^>]*>'
    
    def process_card_tag(match):
        tag = match.group(0)
        if 'data-show-healing-shop' in tag:
            return tag
        
        # 이 태그 다음에 오는 내용에서 shop-type 확인
        # 하지만 여기서는 전체 파일을 다시 검색해야 함
        return tag
    
    # 더 정확한 방법: massage-card div와 그 다음 shop-type을 함께 찾기
    # 패턴: <div class="massage-card"...> ... <div class="shop-type">힐링샵</div>
    def replace_with_healing_check(match):
        full_match = match.group(0)
        if 'data-show-healing-shop' in full_match:
            return full_match
        
        # shop-type에서 "힐링샵" 확인
        has_healing = '힐링샵' in full_match
        show_healing_shop = 'true' if has_healing else 'false'
        
        # massage-card div 태그에 속성 추가
        if 'data-type=' in full_match:
            result = re.sub(
                r'(<div[^>]*class=["\'][^"\']*massage-card[^"\']*["\'][^>]*data-type=["\'][^"\']*["\'])',
                rf'\1 data-show-healing-shop="{show_healing_shop}"',
                full_match,
                count=1
            )
        else:
            result = re.sub(
                r'(<div[^>]*class=["\'][^"\']*massage-card[^"\']*["\'][^>]*)(>)',
                rf'\1 data-show-healing-shop="{show_healing_shop}"\2',
                full_match,
                count=1
            )
        
        return result
    
    # massage-card div 태그 찾기 (한 줄 또는 여러 줄)
    # 더 간단한 방법: massage-card div 태그만 찾아서 수정
    def add_attribute_to_card(match):
        tag = match.group(0)
        if 'data-show-healing-shop' in tag:
            return tag
        
        # 이 태그 다음 500자 내에서 shop-type 확인
        start_pos = match.start()
        end_pos = min(start_pos + 500, len(content))
        following_text = content[start_pos:end_pos]
        
        has_healing = 'shop-type' in following_text and '힐링샵' in following_text
        show_healing_shop = 'true' if has_healing else 'false'
        
        # 속성 추가
        if 'data-type=' in tag:
            new_tag = re.sub(
                r'(data-type=["\'][^"\']*["\'])',
                rf'\1 data-show-healing-shop="{show_healing_shop}"',
                tag
            )
        else:
            new_tag = re.sub(
                r'(class=["\'][^"\']*massage-card[^"\']*["\'])',
                rf'\1 data-show-healing-shop="{show_healing_shop}"',
                tag
            )
        
        return new_tag
    
    # massage-card div 태그 찾기 및 수정
    def process_match(match):
        tag = match.group(0)
        if 'data-show-healing-shop' in tag:
            return tag
        
        # 전체 파일에서 이 태그 다음 부분 확인
        pos = match.start()
        # 다음 1000자 확인
        check_text = content[pos:pos+1000]
        
        # shop-type에 "힐링샵"이 있는지 확인
        has_healing = bool(re.search(r'<div[^>]*class=["\']shop-type["\'][^>]*>.*?힐링샵', check_text, re.DOTALL | re.IGNORECASE))
        show_healing_shop = 'true' if has_healing else 'false'
        
        # 속성 추가
        if 'data-type=' in tag:
            new_tag = re.sub(
                r'(data-type=["\'][^"\']*["\'])',
                rf'\1 data-show-healing-shop="{show_healing_shop}"',
                tag
            )
        else:
            # class 속성 뒤에 추가
            new_tag = re.sub(
                r'(class=["\'][^"\']*massage-card[^"\']*["\'])',
                rf'\1 data-show-healing-shop="{show_healing_shop}"',
                tag
            )
        
        return new_tag
    
    # massage-card div 태그 패턴
    pattern = r'<div[^>]*class=["\'][^"\']*massage-card[^"\']*["\'][^>]*>'
    
    new_content = re.sub(pattern, process_match, content)
    
    if new_content != content:
        modified = True
    
    return new_content, modified

def process_html_file(html_file):
    """HTML 파일 처리"""
    try:
        content = html_file.read_text(encoding='utf-8')
        new_content, modified = add_data_show_healing_shop(content)
        
        if modified:
            html_file.write_text(new_content, encoding='utf-8')
            return True
        return False
    except Exception as e:
        print(f"  ❌ 오류 발생: {html_file.name} 처리 중 오류: {e}")
        return False

def main():
    print("=" * 60)
    print("massage-card에 data-show-healing-shop 속성 추가 스크립트")
    print("=" * 60)
    
    public_dir = SCRIPT_DIR / 'public'
    if not public_dir.exists():
        print(f"ERROR: {public_dir} 디렉토리를 찾을 수 없습니다.")
        return
    
    html_files = list(public_dir.glob('*.html'))
    print(f"\n총 {len(html_files)}개 HTML 파일 발견")
    
    modified_count = 0
    
    for html_file in sorted(html_files):
        if process_html_file(html_file):
            modified_count += 1
            print(f"  ✅ {html_file.name}: 수정 완료")
    
    print(f"\n완료: {modified_count}개 파일 수정됨")

if __name__ == '__main__':
    main()

