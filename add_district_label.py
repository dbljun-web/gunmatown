#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
모든 HTML 파일의 districtSelect 옆에 "동,역 선택" 텍스트 추가
"""
import sys
import re
from pathlib import Path

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 스크립트 파일의 디렉토리 경로
SCRIPT_DIR = Path(__file__).parent.absolute()
PUBLIC_DIR = SCRIPT_DIR / 'public'

def add_district_label(html_file):
    """HTML 파일의 districtSelect 옆에 "동,역 선택" 텍스트 추가"""
    try:
        content = html_file.read_text(encoding='utf-8')
        original_content = content
        
        # districtSelect가 있는 search-box 찾기
        # 패턴: <div class="search-box"> ... <select id="districtSelect" ...> ... </select> ... </div>
        pattern = r'(<div[^>]*class=["\'][^"\']*search-box[^"\']*["\'][^>]*>.*?<select[^>]*id=["\']districtSelect["\'][^>]*>.*?</select>)'
        
        def replace_with_label(match):
            select_tag = match.group(1)
            # 이미 label이 있는지 확인
            if 'district-label' in select_tag or '동,역 선택' in select_tag:
                return select_tag
            # </select> 뒤에 label 추가
            return select_tag.replace('</select>', '</select>\n            <span class="district-label">동,역 선택</span>')
        
        content = re.sub(pattern, replace_with_label, content, flags=re.DOTALL)
        
        # 더 정확한 패턴으로 재시도 (search-box 내부의 districtSelect)
        if content == original_content:
            # 패턴: <div class="search-box"> ... <select id="districtSelect"> ... </select> </div>
            pattern2 = r'(<div[^>]*class=["\'][^"\']*search-box[^"\']*["\'][^>]*>\s*<select[^>]*id=["\']districtSelect["\'][^>]*>.*?</select>\s*)</div>'
            
            def replace_with_label2(match):
                select_part = match.group(1)
                # 이미 label이 있는지 확인
                if 'district-label' in select_part:
                    return select_part + '</div>'
                # </select> 뒤에 label 추가
                return select_part.replace('</select>', '</select>\n            <span class="district-label">동,역 선택</span>') + '</div>'
            
            content = re.sub(pattern2, replace_with_label2, content, flags=re.DOTALL)
        
        # 더 간단한 패턴으로 재시도
        if content == original_content:
            # districtSelect의 </select> 바로 뒤에 추가
            pattern3 = r'(<select[^>]*id=["\']districtSelect["\'][^>]*>.*?</select>)'
            
            def replace_with_label3(match):
                select_tag = match.group(1)
                # 이미 label이 있는지 확인
                if 'district-label' in select_tag or '동,역 선택' in content[content.find(select_tag):content.find(select_tag)+len(select_tag)+50]:
                    return select_tag
                # </select> 뒤에 label 추가
                return select_tag + '\n            <span class="district-label">동,역 선택</span>'
            
            content = re.sub(pattern3, replace_with_label3, content, flags=re.DOTALL)
        
        if content != original_content:
            html_file.write_text(content, encoding='utf-8')
            return True
        return False
        
    except Exception as e:
        print(f"  ❌ 오류: {e}")
        return False

def main():
    print("=" * 60)
    print("HTML 파일에 '동,역 선택' 라벨 추가 스크립트")
    print("=" * 60)
    
    if not PUBLIC_DIR.exists():
        print(f"❌ {PUBLIC_DIR} 디렉토리를 찾을 수 없습니다.")
        return
    
    # 모든 HTML 파일 찾기
    html_files = list(PUBLIC_DIR.glob('*.html'))
    print(f"\n✅ {len(html_files)}개 HTML 파일 발견")
    
    # 제외할 파일 목록
    exclude_files = {'notice.html', 'event.html'}
    
    updated_count = 0
    skipped_count = 0
    
    for html_file in html_files:
        if html_file.name in exclude_files:
            skipped_count += 1
            continue
        
        if add_district_label(html_file):
            updated_count += 1
            if updated_count % 100 == 0:
                print(f"  진행 중... {updated_count}개 파일 업데이트됨")
        else:
            skipped_count += 1
    
    print("\n" + "=" * 60)
    print(f"처리 완료: {updated_count}개 파일 업데이트, {skipped_count}개 파일 건너뜀")
    print("=" * 60)

if __name__ == '__main__':
    main()

