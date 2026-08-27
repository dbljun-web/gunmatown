#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
제주도 HTML 파일들의 관련정보 버튼 위치를 일괄 수정
잘못된 패턴: </div> (type-dropdown-menu) + 관련정보 버튼 + </div> (type-filter-dropdown)
올바른 패턴: </div> (type-dropdown-menu) + </div> (type-filter-dropdown) + 관련정보 버튼
"""

import sys
import re
from pathlib import Path

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

SCRIPT_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = SCRIPT_DIR / 'public'

if not PUBLIC_DIR.exists():
    alt_public = Path('public')
    if alt_public.exists():
        PUBLIC_DIR = alt_public.resolve()
    else:
        print(f"ERROR: public 디렉터리를 찾을 수 없습니다.")
        sys.exit(1)

def fix_jeju_file(file_path: Path) -> bool:
    """제주도 파일의 관련정보 버튼 위치 수정"""
    try:
        content = file_path.read_text(encoding='utf-8')
        original = content
        
        # 잘못된 패턴 찾기: type-dropdown-menu의 닫는 </div> 다음에 관련정보 버튼, 그 다음에 type-filter-dropdown의 닫는 </div>
        # 정확한 패턴: type-filter-dropdown 안에서 type-dropdown-menu 다음에 관련정보 버튼이 있는 경우
        wrong_pattern = r'(<div class="type-filter-dropdown">.*?<div class="type-dropdown-menu"[^>]*>.*?</div>\s*)(<button[^>]*id="relatedInfoBtn"[^>]*>.*?</button>\s*)(</div>\s*)'
        
        match = re.search(wrong_pattern, content, re.DOTALL)
        if match:
            # 관련정보 버튼을 type-filter-dropdown 밖으로 이동
            # 1. type-filter-dropdown 닫기 (버튼 제거)
            fixed = match.group(1) + match.group(3)
            # 2. type-filter-dropdown의 닫는 태그 다음에 관련정보 버튼 추가
            replacement = fixed + '        <button class="filter-btn" id="relatedInfoBtn" style="cursor: pointer;">\n          관련정보\n        </button>'
            content = content.replace(match.group(0), replacement)
            
            if content != original:
                file_path.write_text(content, encoding='utf-8')
                return True
        
        # 이미 올바른 위치에 있는지 확인
        correct_pattern = r'(<div class="type-filter-dropdown">.*?</div>\s*</div>\s*)(<button[^>]*id="relatedInfoBtn"[^>]*>.*?</button>)'
        if re.search(correct_pattern, content, re.DOTALL):
            return False  # 이미 올바른 위치
        
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
            if fix_jeju_file(file_path):
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
