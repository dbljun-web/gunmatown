#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
모든 HTML 파일의 관련정보 버튼 위치를 수정하는 스크립트
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
    # 1. 기존 관련정보 버튼 모두 제거 (어디에 있든, 줄바꿈 포함)
    # 여러 줄에 걸친 버튼도 제거
    button_pattern = r'<button[^>]*id="relatedInfoBtn"[^>]*>.*?</button>\s*'
    html_content = re.sub(button_pattern, '', html_content, flags=re.DOTALL)
    
    # 2. filter-container 안에서 type-filter-dropdown 찾기
    container_match = re.search(r'(<div class="filter-container">.*?)(</div>\s*</section>)', html_content, re.DOTALL)
    if not container_match:
        return html_content, False
    
    container_content = container_match.group(1)
    original_container = container_content
    
    # 3. type-filter-dropdown의 닫는 태그 찾기
    # 정확한 구조: type-dropdown-menu의 닫는 </div> 다음에 type-filter-dropdown의 닫는 </div>
    dropdown_pattern = r'(<div class="type-filter-dropdown">.*?</div>\s*</div>\s*)'
    dropdown_match = re.search(dropdown_pattern, container_content, re.DOTALL)
    
    if dropdown_match:
        # type-filter-dropdown의 닫는 태그 다음에 관련정보 버튼 추가
        # 들여쓰기는 8칸 (filter-container 안의 요소들)
        replacement = dropdown_match.group(1) + '        <button class="filter-btn" id="relatedInfoBtn" style="cursor: pointer;">\n          관련정보\n        </button>'
        new_container = container_content.replace(dropdown_match.group(0), replacement)
        html_content = html_content.replace(container_match.group(1), new_container)
        return html_content, True
    else:
        # type-filter-dropdown이 없는 경우, filter-container의 마지막 요소 다음에 추가
        # 마지막 </a> 또는 </button> 다음에 추가
        lines = container_content.rstrip().split('\n')
        insert_index = len(lines)
        
        # 마지막 요소 찾기 (닫는 태그가 아닌 실제 요소)
        for i in range(len(lines) - 1, -1, -1):
            line = lines[i].strip()
            if line and (line.endswith('</a>') or (line.endswith('</button>') and 'typeFilterBtn' not in lines[i])):
                insert_index = i + 1
                break
        
        # 관련정보 버튼 추가
        indent = ' ' * 8  # filter-container 안의 요소들은 8칸 들여쓰기
        button_html = f'{indent}<button class="filter-btn" id="relatedInfoBtn" style="cursor: pointer;">\n{indent}          관련정보\n{indent}        </button>'
        lines.insert(insert_index, button_html)
        new_container = '\n'.join(lines)
        html_content = html_content.replace(container_match.group(1), new_container)
        return html_content, True

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
            # type-filter-dropdown을 찾지 못한 경우
            return False
        else:
            # 변경사항 없음
            return False
        
    except Exception as e:
        print(f"  ❌ 오류: {e}")
        return False

def main():
    """메인 함수"""
    print(f"Public 디렉터리: {PUBLIC_DIR}\n")
    
    # 모든 HTML 파일 찾기 (company-로 시작하는 파일 제외)
    html_files = [f for f in PUBLIC_DIR.glob('*.html') if not f.name.startswith('company-')]
    
    print(f"총 {len(html_files)}개 파일 처리 시작...\n")
    
    updated_count = 0
    skipped_count = 0
    error_count = 0
    no_dropdown_count = 0
    
    for file_path in sorted(html_files):
        print(f"처리 중: {file_path.name}", end=' ... ')
        try:
            result = update_file(file_path)
            if result:
                updated_count += 1
                print("✅ 완료")
            else:
                # type-filter-dropdown이 없는 파일인지 확인
                content = file_path.read_text(encoding='utf-8')
                if 'type-filter-dropdown' not in content:
                    no_dropdown_count += 1
                    print("⚠️ type-filter-dropdown 없음")
                else:
                    skipped_count += 1
                    print("⚠️ 스킵 (이미 올바른 위치)")
        except Exception as e:
            error_count += 1
            print(f"❌ 오류: {e}")
    
    print(f"\n[완료] 총 {len(html_files)}개 파일 중:")
    print(f"  ✅ 업데이트: {updated_count}개")
    print(f"  ⚠️ 스킵: {skipped_count}개")
    print(f"  ⚠️ type-filter-dropdown 없음: {no_dropdown_count}개")
    print(f"  ❌ 오류: {error_count}개")

if __name__ == '__main__':
    main()
