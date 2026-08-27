#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
동/역 HTML 파일 중에서 지역이 앞에 포함되지 않은 파일들을 삭제하는 스크립트
"""

import sys
from pathlib import Path

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 스크립트 파일의 디렉토리 경로
SCRIPT_DIR = Path(__file__).parent.absolute()

# 17개 지역 목록
VALID_REGIONS = [
    'jeju', 'seoul', 'busan', 'incheon', 'daegu', 'gwangju', 'daejeon', 
    'ulsan', 'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 
    'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam'
]

# 필터 키워드 (동/역과 구분하기 위해)
FILTER_KEYWORDS = ['massage', 'outcall', 'swedish', 'thai', 'aroma', 'waxing', 'chinese', 'foot', 'spa']

def is_valid_dong_html(filename):
    """동/역 HTML 파일이 유효한지 확인 (지역이 앞에 있는지)"""
    name = filename.replace('.html', '')
    parts = name.split('-')
    
    # 첫 번째 부분이 유효한 지역인지 확인
    if len(parts) > 0 and parts[0] in VALID_REGIONS:
        return True
    
    return False

def main():
    print("=" * 60)
    print("동/역 HTML 파일 검증 및 삭제 스크립트")
    print("=" * 60)
    
    # public 디렉토리의 모든 HTML 파일 찾기
    public_dir = SCRIPT_DIR / 'public'
    if not public_dir.exists():
        print(f"⚠️ {public_dir} 디렉토리를 찾을 수 없습니다.")
        return
    
    html_files = list(public_dir.glob('*.html'))
    print(f"\n총 {len(html_files)}개 HTML 파일 발견")
    
    # 제외할 파일 목록 (메인 페이지 등)
    exclude_files = {
        'index.html', 'notice.html', 'event.html',
        'massage.html', 'outcall.html', 'swedish.html', 'thai.html',
        'aroma.html', 'waxing.html', 'chinese.html', 'foot.html', 'spa.html'
    }
    
    # 삭제할 파일 목록
    files_to_delete = []
    valid_files = []
    
    for html_file in html_files:
        filename = html_file.name
        
        # 제외 파일은 건너뛰기
        if filename in exclude_files:
            continue
        
        # 파일명에 하이픈이 2개 이상 있는 경우 (동/역 HTML일 가능성)
        # 예: seoul-gangnam-yeoksam-dong-swedish.html
        # 예: gangnam-gangnam-gangnam-station-swedish.html (잘못된 형식)
        if filename.count('-') >= 2:
            if not is_valid_dong_html(filename):
                files_to_delete.append(html_file)
            else:
                valid_files.append(html_file)
    
    print(f"\n유효한 동/역 HTML 파일: {len(valid_files)}개")
    print(f"삭제할 파일: {len(files_to_delete)}개")
    
    if files_to_delete:
        print("\n삭제할 파일 목록:")
        for file in files_to_delete:
            print(f"  - {file.name}")
        
        # 삭제 확인
        print(f"\n위 {len(files_to_delete)}개 파일을 삭제하시겠습니까? (y/n): ", end='')
        # 자동으로 삭제 (사용자 확인 없이)
        confirm = 'y'
        
        if confirm.lower() == 'y':
            deleted_count = 0
            for file in files_to_delete:
                try:
                    file.unlink()
                    deleted_count += 1
                    print(f"  ✅ 삭제: {file.name}")
                except Exception as e:
                    print(f"  ❌ 삭제 실패: {file.name} - {e}")
            
            print(f"\n총 {deleted_count}개 파일 삭제 완료")
        else:
            print("삭제를 취소했습니다.")
    else:
        print("\n삭제할 파일이 없습니다.")
    
    print("\n" + "=" * 60)

if __name__ == '__main__':
    main()

