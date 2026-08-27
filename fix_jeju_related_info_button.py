#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
제주도 HTML 파일들의 관련정보 버튼 위치를 수정하는 스크립트
seoul-yongsan-yongsan-station-outcall.html과 동일한 구조로 수정
"""

import sys
import re
from pathlib import Path

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 스크립트 파일의 디렉토리 경로
SCRIPT_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = SCRIPT_DIR / 'public'

# 경로 확인
if not PUBLIC_DIR.exists():
    alt_public = Path('public')
    if alt_public.exists():
        PUBLIC_DIR = alt_public.resolve()
    else:
        print(f"ERROR: public 디렉터리를 찾을 수 없습니다. {PUBLIC_DIR}")
        sys.exit(1)

def fix_related_info_button(html_content: str) -> tuple:
    """관련정보 버튼을 올바른 위치로 수정"""
    # filter-container 찾기
    container_match = re.search(r'(<div class="filter-container">.*?)(</div>\s*</section>)', html_content, re.DOTALL)
    if not container_match:
        return html_content, False
    
    container_content = container_match.group(1)
    original_container = container_content
    
    # 1. 잘못된 패턴 찾기: type-filter-dropdown 안에 관련정보 버튼이 있는 경우
    # type-dropdown-menu의 닫는 </div> 다음에 관련정보 버튼, 그 다음에 type-filter-dropdown의 닫는 </div>
    wrong_pattern = r'(<div class="type-filter-dropdown">.*?<div class="type-dropdown-menu"[^>]*>.*?</div>\s*)(<button[^>]*id="relatedInfoBtn"[^>]*>.*?</button>\s*)(</div>\s*)'
    
    wrong_match = re.search(wrong_pattern, container_content, re.DOTALL)
    if wrong_match:
        # 잘못된 위치의 관련정보 버튼을 제거하고, type-filter-dropdown의 닫는 태그 다음에 추가
        # 1. type-filter-dropdown 닫기 (버튼 제거)
        fixed_dropdown = wrong_match.group(1) + wrong_match.group(3)
        # 2. type-filter-dropdown의 닫는 태그 다음에 관련정보 버튼 추가
        replacement = fixed_dropdown + '        <button class="filter-btn" id="relatedInfoBtn" style="cursor: pointer;">\n          관련정보\n        </button>'
        new_container = container_content.replace(wrong_match.group(0), replacement)
        html_content = html_content.replace(container_match.group(1), new_container)
        return html_content, True
    
    # 2. 이미 올바른 위치에 있는지 확인
    # type-filter-dropdown의 닫는 </div> 다음에 관련정보 버튼이 있는 경우
    correct_pattern = r'(<div class="type-filter-dropdown">.*?</div>\s*</div>\s*)(<button[^>]*id="relatedInfoBtn"[^>]*>.*?</button>)'
    correct_match = re.search(correct_pattern, container_content, re.DOTALL)
    if correct_match:
        # 이미 올바른 위치에 있음
        return html_content, False
    
    # 3. 관련정보 버튼이 다른 위치에 있는 경우 (type-filter-dropdown 밖이지만 다른 곳)
    # 모든 관련정보 버튼 제거
    button_pattern = r'<button[^>]*id="relatedInfoBtn"[^>]*>.*?</button>\s*'
    container_content = re.sub(button_pattern, '', container_content, flags=re.DOTALL)
    
    # 4. type-filter-dropdown의 닫는 태그 다음에 관련정보 버튼 추가
    dropdown_pattern = r'(<div class="type-filter-dropdown">.*?</div>\s*</div>\s*)'
    dropdown_match = re.search(dropdown_pattern, container_content, re.DOTALL)
    if dropdown_match:
        replacement = dropdown_match.group(1) + '        <button class="filter-btn" id="relatedInfoBtn" style="cursor: pointer;">\n          관련정보\n        </button>'
        new_container = container_content.replace(dropdown_match.group(0), replacement)
        html_content = html_content.replace(container_match.group(1), new_container)
        return html_content, True
    
    return html_content, False

def update_file(file_path: Path) -> bool:
    """HTML 파일의 관련정보 버튼 위치 수정"""
    try:
        content = file_path.read_text(encoding='utf-8')
        original_content = content
        
        # 관련정보 버튼 위치 수정
        content, modified = fix_related_info_button(content)
        
        if modified and content != original_content:
            file_path.write_text(content, encoding='utf-8')
            return True
        elif not modified:
            return False
        else:
            return False
        
    except Exception as e:
        print(f"  ❌ 오류: {e}")
        return False

def main():
    """메인 함수"""
    print(f"Public 디렉터리: {PUBLIC_DIR}\n")
    
    # 제주도 HTML 파일만 찾기
    jeju_files = [f for f in PUBLIC_DIR.glob('jeju*.html') if not f.name.startswith('company-')]
    
    print(f"총 {len(jeju_files)}개 제주도 파일 처리 시작...\n")
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    
    for file_path in sorted(jeju_files):
        print(f"처리 중: {file_path.name}", end=' ... ')
        try:
            result = update_file(file_path)
            if result:
                updated_count += 1
                print("✅ 완료")
            else:
                skipped_count += 1
                print("⚠️ 스킵")
        except Exception as e:
            error_count += 1
            print(f"❌ 오류: {e}")
    
    print(f"\n[완료] 총 {len(jeju_files)}개 파일 중:")
    print(f"  ✅ 업데이트: {updated_count}개")
    print(f"  ⚠️ 스킵: {skipped_count}개")
    print(f"  ❌ 오류: {error_count}개")

if __name__ == '__main__':
    main()
