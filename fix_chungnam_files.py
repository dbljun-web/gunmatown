#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
충남 HTML 파일들의 잘못된 지역 정보를 일괄 수정하는 스크립트
"""

import os
import re
from pathlib import Path

# 수정할 파일 경로
PUBLIC_DIR = Path("public")

# 잘못된 지역 정보 패턴
WRONG_PATTERNS = [
    (r'충남특별자치시', '충남'),
    (r'수성구', '충남'),
    (r'행정동', '행정구간'),
    (r'대구역', '천안역'),
    (r'동촌유원지', '계룡산국립공원'),
    (r'이시아폴리스', '천안호수공원'),
    (r'충남국제공항', '천안아산역'),
    (r'신암동', '불당동'),
    (r'방촌동', '신부동'),
    (r'해안동, 공산동, 불로동', '대천동'),
    (r'지저동, 동호동, 신평동', '쌍용동'),
    (r'용계동, 미대동, 내동', '백석동'),
    (r'신용동, 검사동, 방천동', '두정동'),
]

def fix_file(file_path):
    """단일 파일의 잘못된 지역 정보를 수정"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 패턴별로 수정
        for pattern, replacement in WRONG_PATTERNS:
            content = re.sub(pattern, replacement, content)
        
        # 변경사항이 있으면 파일 저장
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """메인 함수"""
    chungnam_files = list(PUBLIC_DIR.glob("chungnam*.html"))
    
    print(f"Found {len(chungnam_files)} chungnam files")
    
    fixed_count = 0
    for file_path in chungnam_files:
        if fix_file(file_path):
            fixed_count += 1
            print(f"Fixed: {file_path.name}")
    
    print(f"\nTotal fixed: {fixed_count} files")

if __name__ == "__main__":
    main()

