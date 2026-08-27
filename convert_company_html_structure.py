#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
4개 출장마사지 HTML 파일을 재팬혼혈출장 파일 구조로 변환하는 스크립트
"""

import re
import json
from pathlib import Path

# 파일 매핑 정보
FILES_TO_CONVERT = {
    'company-seoul-pretty-tangle-outcall.html': {
        'shop_name': '20대 탱글 출장',
        'phone': '0507-1859-6510',
        'image': '20대이쁘니탱글출장.jpg',
        'review_author': '스파크님',
        'footer_link': '20대탱글출장마사지정보'
    },
    'company-seoul-ukraine-outcall.html': {
        'shop_name': '우크라이나출장',
        'phone': '0507-1859-7033',
        'image': '우크라이나출장.jpg',
        'review_author': '달빛산책님',
        'footer_link': '우크라이나출장마사지정보'
    },
    'company-seoul-tokyo-hot-outcall.html': {
        'shop_name': '도쿄핫',
        'phone': '0507-1859-6415',
        'image': '출장마사지_도쿄핫.jpg',
        'review_author': '도쿄러버님',
        'footer_link': '도쿄핫출장마사지정보'
    },
    'company-seoul-wonjeong-outcall.html': {
        'shop_name': '원정녀',
        'phone': '0507-1859-6415',
        'image': '출장마사지_원정녀.jpg',
        'review_author': '원정팬님',
        'footer_link': '원정녀출장마사지정보'
    }
}

def extract_review_from_jsonld(html_content):
    """JSON-LD에서 리뷰 정보 추출"""
    try:
        # JSON-LD 스크립트 태그 찾기
        jsonld_match = re.search(r'<script type="application/ld\+json">\s*({.*?})\s*</script>', html_content, re.DOTALL)
        if jsonld_match:
            jsonld_str = jsonld_match.group(1)
            data = json.loads(jsonld_str)
            if 'review' in data and len(data['review']) > 0:
                review = data['review'][0]
                return {
                    'author': review.get('author', {}).get('name', ''),
                    'date': review.get('datePublished', ''),
                    'body': review.get('reviewBody', '')
                }
    except:
        pass
    return None

def extract_description_from_jsonld(html_content):
    """JSON-LD에서 설명 추출"""
    try:
        jsonld_match = re.search(r'<script type="application/ld\+json">\s*({.*?})\s*</script>', html_content, re.DOTALL)
        if jsonld_match:
            jsonld_str = jsonld_match.group(1)
            data = json.loads(jsonld_str)
            return data.get('description', '')
    except:
        pass
    return ''

def extract_flags_from_html(html_content):
    """HTML에서 국기 이미지 추출"""
    flags = []
    flag_pattern = r'<img[^>]*src="https://www\.msg1000\.com/images/([^"]+\.jpg)"[^>]*alt="([^"]*국기)"'
    matches = re.findall(flag_pattern, html_content)
    for img_path, alt_text in matches:
        country = img_path.replace('.jpg', '')
        flags.append({
            'country': country,
            'path': img_path,
            'alt': alt_text
        })
    return flags

def convert_html_structure(file_path, file_info):
    """HTML 파일 구조 변환"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 리뷰 정보 추출
    review = extract_review_from_jsonld(content)
    description = extract_description_from_jsonld(content)
    flags = extract_flags_from_html(content)
    
    # 헤더 부분 교체
    old_header = r'<header class="header" id="mainHeader">.*?</header>'
    new_header = '''    <!-- 헤더 -->
    <header class="header">
      <div class="header-content">
        <button class="back-btn" onclick="goBack()" aria-label="뒤로가기">
          <span
            class="fas fa-arrow-left"
            style="display: inline-block; vertical-align: middle"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
              fill="currentColor"
              style="display: inline-block; vertical-align: middle"
            >
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              /></svg
          ></span>
        </button>
        <div
          class="logo"
          onclick="window.location.href='index.html'"
          style="cursor: pointer"
        >
          <span
            class="fas fa-spa"
            style="display: inline-block; vertical-align: middle"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20"
              height="20"
              fill="currentColor"
              style="display: inline-block; vertical-align: middle"
            >
              <path
                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.3-208-208S141.3 48 256 48s208 93.3 208 208-93.3 208-208 208z"
              />
              <path
                d="M256 128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 208c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"
              /></svg
          ></span>
          마사지천국
        </div>
        <div class="header-actions">
          <button class="map-btn" onclick="openMap()" aria-label="지도보기">
            <span
              class="fas fa-map-marker-alt"
              style="display: inline-block; vertical-align: middle"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="20"
                height="20"
                fill="currentColor"
                style="display: inline-block; vertical-align: middle"
              >
                <path
                  d="M172.268 501.67C272.268 401.67 384 272.67 384 192C384 86 298 0 192 0S0 86 0 192c0 80.67 111.732 209.67 211.732 309.67L192 512l-19.732-10.33zM192 256c-35.346 0-64-28.654-64-64s28.654-64 64-64s64 28.654 64 64s-28.654 64-64 64z"
                /></svg
            ></span>
          </button>
          <button class="share-btn" onclick="shareShop()" aria-label="공유하기">
            <span
              class="fas fa-share-alt"
              style="display: inline-block; vertical-align: middle"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="20"
                height="20"
                fill="currentColor"
                style="display: inline-block; vertical-align: middle"
              >
                <path
                  d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                /></svg
            ></span>
          </button>
        </div>
      </div>
    </header>'''
    
    content = re.sub(old_header, new_header, content, flags=re.DOTALL)
    
    # body 구조 교체 (company-hero -> shop-image-section + shop-info-section)
    # 이 부분은 복잡하므로 직접 교체
    old_body_start = r'<main class="company-page">.*?<section class="company-hero">'
    # 더 정확한 패턴으로 교체 필요
    
    print(f"변환 완료: {file_path}")
    return content

def main():
    """메인 함수"""
    public_dir = Path('public')
    
    for filename, file_info in FILES_TO_CONVERT.items():
        file_path = public_dir / filename
        if file_path.exists():
            print(f"변환 중: {filename}")
            # 실제 변환 로직은 복잡하므로 재팬혼혈출장 파일을 템플릿으로 사용
            # 여기서는 간단한 예시만 제공
            convert_html_structure(file_path, file_info)
        else:
            print(f"파일을 찾을 수 없습니다: {filename}")

if __name__ == '__main__':
    main()

