#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
스파 테마 필터를 모든 HTML 파일에 추가하는 스크립트
"""

import os
import re
from pathlib import Path

def add_spa_filter_to_html(file_path):
    """HTML 파일에 스파 필터를 추가"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 발마사지 필터 다음에 스파 필터 추가
        # pattern: </div> (발마사지 필터 끝) 다음에 스파 필터 추가
        pattern = r'(<div class="theme-box" data-theme="foot">\s*<span class="theme-name">발마사지</span>\s*</div>\s*)</div>'
        
        replacement = r'''\1<div class="theme-box" data-theme="spa">
            <i class="fas fa-hot-tub"></i>
            <span class="theme-name">스파</span>
          </div>
        </div>'''
        
        if re.search(pattern, content):
            new_content = re.sub(pattern, replacement, content)
            
            # 변경사항이 있는 경우에만 저장
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                return True
        else:
            # 다른 패턴 시도 (아이콘 없는 경우)
            pattern2 = r'(<div class="theme-box" data-theme="foot">\s*<span class="theme-name">발마사지</span>\s*</div>\s*)</div>'
            replacement2 = r'''\1<div class="theme-box" data-theme="spa">
            <span class="theme-name">스파</span>
          </div>
        </div>'''
            
            if re.search(pattern2, content):
                new_content = re.sub(pattern2, replacement2, content)
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    return True
        
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """메인 함수"""
    public_dir = Path('public')
    html_files = list(public_dir.glob('*.html'))
    
    # company-로 시작하는 파일과 index.html은 제외
    html_files = [f for f in html_files if not f.name.startswith('company-') and f.name != 'index.html']
    
    updated_count = 0
    skipped_count = 0
    
    for html_file in html_files:
        if add_spa_filter_to_html(html_file):
            updated_count += 1
            print(f"Updated: {html_file.name}")
        else:
            skipped_count += 1
            print(f"Skipped: {html_file.name}")
    
    print(f"\nTotal files processed: {len(html_files)}")
    print(f"Updated: {updated_count}")
    print(f"Skipped: {skipped_count}")

if __name__ == '__main__':
    main()

