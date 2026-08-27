#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""바나나 홈케어 company HTML 파일 생성 스크립트"""

import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.absolute()
PUBLIC_DIR = SCRIPT_DIR / 'public'
TEMPLATE_FILE = PUBLIC_DIR / 'company-jeju-massage-yeppuni.html'
OUTPUT_FILE = PUBLIC_DIR / 'company-seoul-banana-homecare.html'

def create_banana_company_html():
    """바나나 홈케어 company HTML 파일 생성"""
    
    # 템플릿 파일 읽기
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 주요 정보 교체
    replacements = [
        # Title
        (r'제주도출장마사지 이쁘니출장 - 제주도 전지역 출장마사지 상세정보', 
         '서울 경기 인천 출장마사지 바나나 홈케어 - 서울·경기·인천 전지역 출장마사지 상세정보'),
        
        # Meta description
        (r'노형·연동·중문·서귀포혁신도시까지 제주 제주시 시내 중심.*?큐레이션합니다\.',
         '서울·경기·인천 전지역 출장마사지 바나나 홈케어 상세정보. 70,000원~부터, 24시간 운영. 전화예약 0507-1859-6725. 전원 20대 혼혈 실력파 여 관리사.'),
        
        # Meta keywords
        (r'제주 마사지천국.*?제주 서귀포시 중문동 마사지',
         '서울 출장마사지, 경기 출장마사지, 인천 출장마사지, 바나나 홈케어, 타이마사지, 건마, 아로마, 스웨디시, 홈케어'),
        
        # OG tags
        (r'제주도출장마사지 이쁘니출장 - 제주도 전지역 출장마사지 상세정보 \| 마사지천국',
         '서울 경기 인천 출장마사지 바나나 홈케어 - 서울·경기·인천 전지역 출장마사지 상세정보 | 마사지천국'),
        (r'제주도출장마사지 이쁘니출장 제주시 상세정보\. 110,000원~부터.*?일본 여성 관리사\.',
         '서울·경기·인천 전지역 출장마사지 바나나 홈케어 상세정보. 70,000원~부터, 24시간 운영. 전화예약 0507-1859-6725. 전원 20대 혼혈 실력파 여 관리사.'),
        (r'https://msg1000\.com/images/제주출장마사지_이쁘니출장\.jpg',
         'https://msg1000.com/images/바나나홈케어.jpg'),
        (r'https://msg1000\.com/jeju-massage-yeppuni\.html',
         'https://msg1000.com/company-seoul-banana-homecare.html'),
        
        # Canonical
        (r'https://msg1000\.com/jeju-massage-yeppuni\.html',
         'https://msg1000.com/company-seoul-banana-homecare.html'),
        
        # JSON-LD
        (r'"name": "제주 이쁘니출장"',
         '"name": "바나나 홈케어"'),
        (r'"url": "https://msg1000\.com/company-jeju-massage-yeppuni\.html"',
         '"url": "https://msg1000.com/company-seoul-banana-homecare.html"'),
        (r'"description": "제주도 전지역 출장마사지.*?24시간 서비스합니다\."',
         '"description": "서울·경기·인천 전지역 출장마사지 최고의 서비스를 보장하는 바나나 홈케어입니다. 전원 20대 긍정 마인드를 갖춘 실력파 관리사들이 감미로운 손길로 감성힐링을 제공합니다."'),
        (r'"telephone": "0507-1859-6960"',
         '"telephone": "0507-1859-6725"'),
        (r'"streetAddress": "제주도 전지역"',
         '"streetAddress": "서울 경기 인천 전지역"'),
        (r'"addressLocality": "제주시"',
         '"addressLocality": "서울"'),
        (r'"addressRegion": "제주특별자치도"',
         '"addressRegion": "서울특별시"'),
        (r'"ratingValue": "5"',
         '"ratingValue": "4.9"'),
        (r'"reviewCount": 3',
         '"reviewCount": 28'),
        (r'"url": "https://msg1000\.com/images/제주출장마사지_이쁘니출장\.jpg"',
         '"url": "https://msg1000.com/images/바나나홈케어.jpg"'),
        (r'"alt": "제주도 전지역 출장마사지 이쁘니출장.*?"',
         '"alt": "서울 경기 인천 전지역 출장마사지 바나나 홈케어 - 20대 힐링관리, 타이마사지, 건마, 아로마, 스웨디시"'),
        (r'"priceRange": "₩110000-₩210000"',
         '"priceRange": "₩70000-₩160000"'),
        
        # Image src
        (r'src="images/제주출장마사지_이쁘니출장\.jpg"',
         'src="images/바나나홈케어.jpg"'),
        (r'alt="제주도 전지역 출장마사지 이쁘니출장.*?110,000원~"',
         'alt="서울 경기 인천 전지역 출장마사지 바나나 홈케어 - 20대 힐링관리, 타이마사지, 건마, 아로마, 스웨디시, 70,000원~"'),
        
        # Shop name
        (r'<h1 class="shop-name">제주 이쁘니출장</h1>',
         '<h1 class="shop-name">바나나 홈케어</h1>'),
        (r'<span class="shop-district">제주</span>',
         '<span class="shop-district">서울·경기·인천 전지역</span>'),
        
        # Rating
        (r'<div class="stars" aria-label="평점 4\.8점">★★★★★</div>',
         '<div class="stars" aria-label="평점 4.9점">★★★★★</div>'),
        (r'<span class="rating-text">4\.8 \(16개 리뷰\)</span>',
         '<span class="rating-text">4.9 (28개 리뷰)</span>'),
        
        # Description
        (r'제주도 전지역 출장마사지 최고의 서비스를 보장하는 이쁘니 출장입니다\.\s*제주도 놀러오신 분들.*?24시간 서비스합니다\.',
         '서울·경기·인천 전지역 출장마사지 최고의 서비스를 보장하는 바나나 홈케어입니다. 전원 20대 긍정 마인드를 갖춘 실력파 관리사들이 감미로운 손길로 감성힐링을 제공합니다. 타이마사지, 건마, 아로마, 오일 테라피, 스웨디시 등 다양한 프로그램으로 최상의 힐링을 선사합니다.'),
        
        # Address
        (r'<span>제주도 전지역</span>',
         '<span>서울 경기 인천 전지역</span>'),
        (r'<span>제주시 30분 이내 신속방문</span>',
         '<span>홈케어 - 원하는 장소에서 받을 수 있어요</span>'),
        
        # Phone
        (r'href="tel:0507-1859-6960">0507-1859-6960</a>',
         'href="tel:0507-1859-6725">0507-1859-6725</a>'),
        
        # Price
        (r'<span class="info-value">110,000원~</span>',
         '<span class="info-value">70,000원~</span>'),
        
        # Courses - 타이.건마 테라피
        (r'<h3 class="course-category-title">힐링 테라피</h3>',
         '<h3 class="course-category-title">타이.건마 테라피</h3>'),
        (r'<span class="course-price">110,000원</span>',
         '<span class="course-price">70,000원</span>', 1),  # 첫 번째만
        (r'<span class="course-price">130,000원</span>',
         '<span class="course-price">80,000원</span>', 1),  # 첫 번째만
        (r'<span class="course-price">160,000원</span>',
         '<span class="course-price">100,000원</span>', 1),  # 첫 번째만
        (r'<div class="course-duration">80분</div>',
         '<div class="course-duration">90분</div>', 1),  # 첫 번째만
        (r'<div class="course-duration">100분</div>',
         '<div class="course-duration">120분</div>', 1),  # 첫 번째만
        (r'<div class="course-description">힐링 테라피</div>',
         '<div class="course-description">타이.건마 테라피</div>'),
        
        # Staff info
        (r'<p class="staff-main-title">전원 한국인&일본 여 쌤들</p>',
         '<p class="staff-main-title">전원 20대 혼혈 실력파 여 쌤들</p>'),
        (r'<p class="staff-subtitle">❤ 20대 & 힐링샵 ❤</p>',
         '<p class="staff-subtitle">❤ 20대 & 실력파 ❤</p>'),
        (r'<p class="staff-certification">【 상기종목 테라피 수료 】</p>',
         '<p class="staff-certification">【 상기 종목 테라피 과정 수료 】</p>'),
        
        # Reviews
        (r'<span class="rating-number">4\.8</span>',
         '<span class="rating-number">4.9</span>'),
        (r'<span class="review-count">총 16개 리뷰</span>',
         '<span class="review-count">총 28개 리뷰</span>'),
        
        # JavaScript shopData
        (r"name: '제주도출장마사지 이쁘니출장'",
         "name: '서울 경기 인천 출장마사지 바나나 홈케어'"),
        (r"phone: '0507-1859-6960'",
         "phone: '0507-1859-6725'"),
        (r"address: '제주도 전지역'",
         "address: '서울 경기 인천 전지역'"),
        
        # Footer link
        (r'>제주예쁘니마사지정보</a>',
         '>바나나홈케어마사지정보</a>'),
    ]
    
    # 교체 수행
    for item in replacements:
        if isinstance(item, tuple) and len(item) == 3:
            pattern, replacement, count = item
            content = re.sub(pattern, replacement, content, count=count, flags=re.DOTALL)
        elif isinstance(item, tuple) and len(item) == 2:
            pattern, replacement = item
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        else:
            pattern, replacement = item
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # 코스 섹션 전체 교체 (더 정확하게)
    courses_section_pattern = r'(<section class="courses-section">.*?</section>)'
    new_courses_section = '''    <!-- 코스 섹션 -->
    <section class="courses-section">
      <div class="courses-container">
        <h2 class="section-title">코스별 가격</h2>
        <div class="courses-list">
          <article class="course-category">
            <h3 class="course-category-title">타이.건마 테라피</h3>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">A코스</span>
                <div class="course-duration">60분</div>
                <span class="course-price">70,000원</span>
              </div>
              <div class="course-description">타이.건마 테라피</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">B코스</span>
                <div class="course-duration">90분</div>
                <span class="course-price">80,000원</span>
              </div>
              <div class="course-description">타이.건마 테라피</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">C코스</span>
                <div class="course-duration">120분</div>
                <span class="course-price">100,000원</span>
              </div>
              <div class="course-description">타이.건마 테라피</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">D코스</span>
                <div class="course-duration">150분</div>
                <span class="course-price">140,000원</span>
              </div>
              <div class="course-description">타이.건마 테라피</div>
            </div>
          </article>
          <article class="course-category">
            <h3 class="course-category-title">아로마.오일 테라피</h3>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">A코스</span>
                <div class="course-duration">60분</div>
                <span class="course-price">80,000원</span>
              </div>
              <div class="course-description">아로마.오일 테라피</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">B코스</span>
                <div class="course-duration">90분</div>
                <span class="course-price">90,000원</span>
              </div>
              <div class="course-description">아로마.오일 테라피</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">C코스</span>
                <div class="course-duration">120분</div>
                <span class="course-price">110,000원</span>
              </div>
              <div class="course-description">아로마.오일 테라피</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">D코스</span>
                <div class="course-duration">150분</div>
                <span class="course-price">140,000원</span>
              </div>
              <div class="course-description">아로마.오일 테라피</div>
            </div>
          </article>
          <article class="course-category">
            <h3 class="course-category-title">스웨디시 감성 아로마</h3>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">A코스</span>
                <div class="course-duration">60분</div>
                <span class="course-price">90,000원</span>
              </div>
              <div class="course-description">스웨디시 감성 아로마</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">B코스</span>
                <div class="course-duration">90분</div>
                <span class="course-price">110,000원</span>
              </div>
              <div class="course-description">스웨디시 감성 아로마</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">C코스</span>
                <div class="course-duration">120분</div>
                <span class="course-price">130,000원</span>
              </div>
              <div class="course-description">스웨디시 감성 아로마</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">D코스</span>
                <div class="course-duration">150분</div>
                <span class="course-price">160,000원</span>
              </div>
              <div class="course-description">스웨디시 감성 아로마</div>
            </div>
          </article>
          <article class="course-category">
            <h3 class="course-category-title">VIP 코스</h3>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">A코스</span>
                <div class="course-duration">60분</div>
                <span class="course-price">110,000원</span>
              </div>
              <div class="course-description">VIP 코스</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">B코스</span>
                <div class="course-duration">90분</div>
                <span class="course-price">130,000원</span>
              </div>
              <div class="course-description">VIP 코스</div>
            </div>
            <div class="course-item">
              <div class="course-header">
                <span class="course-name">C코스</span>
                <div class="course-duration">120분</div>
                <span class="course-price">160,000원</span>
              </div>
              <div class="course-description">VIP 코스</div>
            </div>
          </article>
        </div>
      </div>
    </section>'''
    
    content = re.sub(courses_section_pattern, new_courses_section, content, flags=re.DOTALL)
    
    # 리뷰 섹션 교체
    reviews_list_pattern = r'(<div class="reviews-list">.*?</div>\s*</div>\s*</section>)'
    new_reviews_section = '''        <div class="reviews-list">
          <article
            class="review-item"
            itemscope
            itemtype="https://schema.org/Review"
          >
            <div class="review-header">
              <span class="reviewer-name" itemprop="author">고객님</span>
              <time
                class="review-date"
                datetime="2025-11-25"
                itemprop="datePublished"
                >2025-11-25</time
              >
            </div>
            <div
              class="review-rating"
              itemprop="reviewRating"
              itemscope
              itemtype="https://schema.org/Rating"
            >
              <meta itemprop="ratingValue" content="5" />
              <meta itemprop="bestRating" content="5" />
              ★★★★★
            </div>
            <div class="review-text" itemprop="reviewBody">
              서울 집에서 출장마사지 받았는데 정말 만족스러웠어요. 바나나 홈케어 관리사분이 친절하게 와주셔서 편안하게 타이마사지 받을 수 있었습니다. 20대 관리사분들이라 분위기도 좋고 실력도 좋아서 다음에도 또 부를 예정이에요. 홈케어라 원하는 장소에서 받을 수 있어서 너무 편했어요.
            </div>
          </article>
        </div>
      </div>
    </section>'''
    
    content = re.sub(reviews_list_pattern, new_reviews_section, content, flags=re.DOTALL)
    
    # JSON-LD 리뷰 교체
    jsonld_review_pattern = r'("review": \[.*?\])'
    new_jsonld_reviews = '''"review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "고객님"
      },
      "datePublished": "2025-11-25",
      "reviewBody": "서울 집에서 출장마사지 받았는데 정말 만족스러웠어요. 바나나 홈케어 관리사분이 친절하게 와주셔서 편안하게 타이마사지 받을 수 있었습니다. 20대 관리사분들이라 분위기도 좋고 실력도 좋아서 다음에도 또 부를 예정이에요. 홈케어라 원하는 장소에서 받을 수 있어서 너무 편했어요."
    }
  ]'''
    
    content = re.sub(jsonld_review_pattern, new_jsonld_reviews, content, flags=re.DOTALL)
    
    # 국기 이미지 제거 (한국만 표시)
    flag_section_pattern = r'(<div class="shop-flag">.*?</div>)'
    new_flag_section = '''          <div class="shop-flag">
            <img
              loading="lazy"
              src="https://xn--z69au6wh5golr.com/wp-content/uploads/2025/05/한국.jpg"
              alt="한국 국기"
              class="flag-image"
              onerror="this.onerror=null; this.innerHTML='🇰🇷'; this.style.fontSize='20px'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.style.height='100%'; this.style.background='#f0f0f0'; this.style.borderRadius='4px';"
            />
          </div>'''
    
    content = re.sub(flag_section_pattern, new_flag_section, content, flags=re.DOTALL)
    
    # 파일 저장
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Success: {OUTPUT_FILE.name} file created!')

if __name__ == '__main__':
    create_banana_company_html()

