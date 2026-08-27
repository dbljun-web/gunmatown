// 페이지 자동 생성 스크립트
// Node.js 환경에서 실행: node generate-pages.js

const fs = require('fs');
const path = require('path');

// script.js의 지역 데이터
const regions = {
  서울: {
    emoji: '🏙️',
    districts: [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
  },
  부산: {
    emoji: '🌊',
    districts: [
      '중구',
      '서구',
      '동구',
      '영도구',
      '부산진구',
      '동래구',
      '남구',
      '북구',
      '해운대구',
      '사하구',
      '금정구',
      '강서구',
      '연제구',
      '수영구',
      '사상구',
      '기장군',
    ],
  },
  대구: {
    emoji: '🏛️',
    districts: [
      '중구',
      '동구',
      '서구',
      '남구',
      '북구',
      '수성구',
      '달서구',
      '달성군',
    ],
  },
  인천: {
    emoji: '🛫',
    districts: [
      '중구',
      '동구',
      '미추홀구',
      '연수구',
      '남동구',
      '부평구',
      '계양구',
      '서구',
      '강화군',
      '옹진군',
    ],
  },
  광주: {
    emoji: '🌿',
    districts: ['동구', '서구', '남구', '북구', '광산구'],
  },
  대전: {
    emoji: '🔬',
    districts: ['동구', '중구', '서구', '유성구', '대덕구'],
  },
  울산: {
    emoji: '🏭',
    districts: ['중구', '남구', '동구', '북구', '울주군'],
  },
  세종: {
    emoji: '🏛️',
    districts: ['세종특별자치시'],
  },
  경기: {
    emoji: '🏘️',
    districts: [
      '수원시',
      '성남시',
      '의정부시',
      '안양시',
      '부천시',
      '광명시',
      '평택시',
      '과천시',
      '오산시',
      '시흥시',
      '군포시',
      '의왕시',
      '하남시',
      '용인시',
      '파주시',
      '이천시',
      '안성시',
      '김포시',
      '화성시',
      '광주시',
      '여주시',
      '양평군',
      '고양시',
      '동두천시',
      '가평군',
      '연천군',
    ],
  },
  강원: {
    emoji: '⛰️',
    districts: [
      '춘천시',
      '원주시',
      '강릉시',
      '동해시',
      '태백시',
      '속초시',
      '삼척시',
    ],
  },
  충북: {
    emoji: '🗻',
    districts: ['청주시', '충주시', '제천시'],
  },
  충남: {
    emoji: '🌾',
    districts: [
      '천안시',
      '공주시',
      '보령시',
      '아산시',
      '서산시',
      '논산시',
      '계룡시',
      '당진시',
    ],
  },
  전북: {
    emoji: '🍚',
    districts: ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시'],
  },
  전남: {
    emoji: '🌊',
    districts: ['목포시', '여수시', '순천시', '나주시', '광양시'],
  },
  경북: {
    emoji: '🏔️',
    districts: [
      '포항시',
      '경주시',
      '김천시',
      '안동시',
      '구미시',
      '영주시',
      '영천시',
      '상주시',
      '문경시',
      '경산시',
    ],
  },
  경남: {
    emoji: '🌳',
    districts: [
      '창원시',
      '진주시',
      '통영시',
      '사천시',
      '김해시',
      '밀양시',
      '거제시',
      '양산시',
    ],
  },
  제주: {
    emoji: '🏝️',
    districts: ['제주시', '서귀포시'],
  },
};

// 한글 → 영어 변환 (URL용)
const regionToEng = {
  서울: 'seoul',
  부산: 'busan',
  대구: 'daegu',
  인천: 'incheon',
  광주: 'gwangju',
  대전: 'daejeon',
  울산: 'ulsan',
  세종: 'sejong',
  경기: 'gyeonggi',
  강원: 'gangwon',
  충북: 'chungbuk',
  충남: 'chungnam',
  전북: 'jeonbuk',
  전남: 'jeonnam',
  경북: 'gyeongbuk',
  경남: 'gyeongnam',
  제주: 'jeju',
};

const districtToEng = {
  // 서울
  강남구: 'gangnam',
  강동구: 'gangdong',
  강북구: 'gangbuk',
  강서구: 'gangseo',
  관악구: 'gwanak',
  광진구: 'gwangjin',
  구로구: 'guro',
  금천구: 'geumcheon',
  노원구: 'nowon',
  도봉구: 'dobong',
  동대문구: 'dongdaemun',
  동작구: 'dongjak',
  마포구: 'mapo',
  서대문구: 'seodaemun',
  서초구: 'seocho',
  성동구: 'seongdong',
  성북구: 'seongbuk',
  송파구: 'songpa',
  양천구: 'yangcheon',
  영등포구: 'yeongdeungpo',
  용산구: 'yongsan',
  은평구: 'eunpyeong',
  종로구: 'jongno',
  중구: 'jung',
  중랑구: 'jungnang',
  // 부산
  해운대구: 'haeundae',
  부산진구: 'busanjin',
  동래구: 'dongnae',
  남구: 'nam',
  북구: 'buk',
  사하구: 'saha',
  금정구: 'geumjeong',
  영도구: 'yeongdo',
  동구: 'dong',
  서구: 'seo',
  연제구: 'yeonje',
  수영구: 'suyeong',
  사상구: 'sasang',
  기장군: 'gijang',
  // 일반
  제주시: 'si',
  서귀포시: 'seogwipo',
  세종특별자치시: 'city',
};

// 지역 메인 페이지 HTML 생성
function generateRegionPage(regionKor, regionData) {
  const regionEng = regionToEng[regionKor];
  const emoji = regionData.emoji;
  const districts = regionData.districts;

  const districtLinks = districts
    .slice(0, 6)
    .map((district) => {
      const districtEng =
        districtToEng[district] || district.replace(/[가-힣]/g, '');
      return `
                <a href="${regionEng}-${districtEng}-massage.html" class="district-card" style="background: white; padding: 20px; border-radius: 12px; text-align: center; text-decoration: none; color: #333; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h3 style="font-size: 1rem; font-weight: 600;">${district}</h3>
                </a>`;
    })
    .join('\n');

  const moreDistricts =
    districts.length > 6
      ? `<p style="text-align: center; margin-top: 20px; color: #666;">외 ${
          districts.length - 6
        }개 자치구/군</p>`
      : '';

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="./">
    <title>${regionKor}마사지 추천 - ${regionKor} 마사지 업체 모음 | 마사지천국</title>
    
    <meta name="description" content="${regionKor}마사지 추천 업체 정보. ${regionKor} 전 지역 마사지샵 가격, 위치, 리뷰 정보. ${regionKor} 최고의 마사지를 마사지천국에서 찾아보세요.">
    <meta name="keywords" content="${regionKor}마사지, ${regionKor}건마, ${regionKor}스웨디시, ${regionKor}1인샵, ${regionKor}아로마, 마사지천국">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="https://msg1000.com/${regionEng}-massage.html">
    
    <meta property="og:type" content="website">
    <meta property="og:title" content="${regionKor}마사지 추천 - ${regionKor} 마사지 업체 모음 | 마사지천국">
    <meta property="og:url" content="https://msg1000.com/${regionEng}-massage.html">
    <meta property="og:site_name" content="마사지천국">
    
    <link rel="stylesheet" href="style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <!-- 헤더 -->
    <header class="header">
        <div class="header-content">
            <h1 class="logo" onclick="window.location.href='index.html'" style="cursor: pointer;">
                <i class="fas fa-spa"></i>
                마사지천국
            </h1>
            <div class="search-toggle" id="searchToggle">
                <i class="fas fa-search"></i>
            </div>
        </div>
    </header>

    <!-- 검색 섹션 -->
    <section class="search-section">
        <div class="search-container">
            <div class="search-box main-search">
                <i class="fas fa-search"></i>
                <input type="text" id="mainSearchInput" class="search-input" placeholder="지역, 지하철역, 업체명으로 검색하세요">
                <button id="mainSearchBtn" class="search-btn-small">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            
            <div class="location-search">
                <div class="search-box">
                    <i class="fas fa-map-marker-alt"></i>
                    <select id="regionSelect" class="search-select">
                        <option value="">지역을 선택하세요</option>
                    </select>
                </div>
                <div class="search-box">
                    <i class="fas fa-building"></i>
                    <select id="districtSelect" class="search-select">
                        <option value="">구를 선택하세요</option>
                    </select>
                </div>
                <button id="searchBtn" class="search-btn">
                    <i class="fas fa-search"></i>
                    검색
                </button>
            </div>
        </div>
    </section>

    <section class="filter-section">
        <div class="filter-container">
            <button class="filter-btn active" data-filter="all">전체</button>
            <button class="filter-btn" data-filter="massage">마사지</button>
            <button class="filter-btn" data-filter="outcall">출장마사지</button>
            <button class="filter-btn" data-filter="waxing">왁싱</button>
        </div>
    </section>

    <!-- 국가별 마사지 필터 -->
    <section class="country-filter-section" id="massageCountryFilterSection" style="display: none;">
        <div class="country-filter-container">
            <h3 class="country-filter-title">국가별 마사지</h3>
            <div class="country-boxes">
                <div class="country-box active" data-country="overall">
                    <span class="country-name">전체</span>
                </div>
                <div class="country-box" data-country="korea">
                    <img src="https://www.msg1000.com/images/한국.jpg" alt="한국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">한국</span>
                </div>
                <div class="country-box" data-country="thai">
                    <img src="https://www.msg1000.com/images/태국.jpg" alt="태국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">태국</span>
                </div>
                <div class="country-box" data-country="china">
                    <img src="https://www.msg1000.com/images/중국.jpg" alt="중국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">중국</span>
                </div>
                <div class="country-box" data-country="russia">
                    <img src="https://www.msg1000.com/images/러시아.jpg" alt="러시아" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">러시아</span>
                </div>
                <div class="country-box" data-country="japan">
                    <img src="https://www.msg1000.com/images/일본.jpg" alt="일본" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">일본</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 국가별 출장마사지 필터 -->
    <section class="country-filter-section" id="outcallCountryFilterSection" style="display: none;">
        <div class="country-filter-container">
            <h3 class="country-filter-title">국가별 출장마사지</h3>
            <div class="country-boxes">
                <div class="country-box active" data-country="overall">
                    <span class="country-name">전체</span>
                </div>
                <div class="country-box" data-country="korea">
                    <img src="https://www.msg1000.com/images/한국.jpg" alt="한국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">한국</span>
                </div>
                <div class="country-box" data-country="thai">
                    <img src="https://www.msg1000.com/images/태국.jpg" alt="태국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">태국</span>
                </div>
                <div class="country-box" data-country="china">
                    <img src="https://www.msg1000.com/images/중국.jpg" alt="중국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">중국</span>
                </div>
                <div class="country-box" data-country="russia">
                    <img src="https://www.msg1000.com/images/러시아.jpg" alt="러시아" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">러시아</span>
                </div>
                <div class="country-box" data-country="japan">
                    <img src="https://www.msg1000.com/images/일본.jpg" alt="일본" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">일본</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 업체 목록 -->
    <main class="main-content">
        <div class="results-header">
            <h2 id="resultsTitle">${regionKor}마사지 전체 업체</h2>
            <span id="resultsCount" class="results-count">총 0개</span>
        </div>
        
        <div id="massageList" class="massage-list">
            <!-- 업체 카드들이 여기에 동적으로 생성됩니다 -->
        </div>
    </main>

    <!-- 푸터 -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-links">
                <div class="footer-link-row">
                    <a href="#" class="footer-link" onclick="openDetailsModal(event)">${region}마사지정보</a>
                </div>
                <div class="footer-divider-line"></div>
                <div class="footer-link-row">
                    <a href="#" class="footer-link" onclick="openAboutModal(event)">회사소개</a>
                    <span class="footer-divider">|</span>
                    <a href="#" class="footer-link" onclick="openTermsModal(event)">이용약관</a>
                </div>
            </div>
            <div class="footer-info">
                <p>상호명 : 마사지천국</p>
                <p>고객센터 : <a href="tel:0507-1859-6384" class="footer-phone">0507-1859-6384</a> <a href="tel:0507-1859-6384" class="footer-contact-btn">[ 입점 문의 ]</a></p>
            </div>
            <div class="footer-copyright">
                <p>&copy; 2024 마사지천국. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- 회사소개 모달 -->
    <div id="aboutModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>회사소개 (About Us)</h2>
                <button class="modal-close" onclick="closeModal('aboutModal')">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>마사지천국</strong>는 전국 어디서든 믿을 수 있는 마사지 정보를 쉽고 빠르게 찾을 수 있도록 만들어진 <strong>전국 마사지 플랫폼</strong>입니다.</p>
                
                <p>저희는 단순히 업체 정보를 나열하는 것이 아니라, <strong>이용자 중심의 편리한 검색 시스템</strong>과 <strong>투명한 정보 제공</strong>을 통해 고객과 업소 모두가 만족할 수 있는 건강한 플랫폼 생태계를 만들고자 합니다.</p>
            </div>
        </div>
    </div>

    <!-- 이용약관 모달 -->
    <div id="termsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>이용약관 (Terms of Service)</h2>
                <button class="modal-close" onclick="closeModal('termsModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="terms-section">
                    <h3>제 1 조 (목적)</h3>
                    <p>이 약관은 "마사지천국"(이하 "회사"라 함)가 제공하는 마사지 관련 정보 플랫폼 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        // 페이지 로드 시 ${regionKor} 지역 자동 선택
        document.addEventListener('DOMContentLoaded', function() {
            // 지역 선택을 "${regionKor}"로 설정
            const regionSelect = document.getElementById('regionSelect');
            if (regionSelect) {
                regionSelect.value = '${regionKor}';
                
                // 구 옵션 업데이트
                if (typeof updateDistrictOptions === 'function') {
                    updateDistrictOptions('${regionKor}');
                }
                
                // 전역 변수 설정
                if (typeof currentRegion !== 'undefined') {
                    currentRegion = '${regionKor}';
                }
            }
            
            // displayFilteredResults()를 사용하여 필터 로직 적용
            if (typeof displayFilteredResults === 'function') {
                displayFilteredResults();
            } else {
                // 폴백: ${regionKor} 지역 업체만 필터링하여 표시
                const shops = massageShops.filter(shop => shop.region === '${regionKor}');
                displayMassageShops(shops);
                updateResultsHeader('${regionKor}마사지 전체 업체', shops.length);
            }
        });
    </script>
</body>
</html>`;
}

// 구/시 페이지 HTML 생성
function generateDistrictPage(regionKor, districtKor) {
  const regionEng = regionToEng[regionKor];
  const districtEng =
    districtToEng[districtKor] || districtKor.replace(/[가-힣]/g, '');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="./">
    <title>${districtKor}마사지 추천 - ${regionKor} ${districtKor} 마사지 업체 모음 | 마사지천국</title>
    
    <meta name="description" content="${districtKor}마사지 추천 업체 정보. ${regionKor} ${districtKor} 마사지샵 가격, 위치, 리뷰 정보. ${districtKor} 최고의 마사지를 마사지천국에서 찾아보세요.">
    <meta name="keywords" content="${districtKor}마사지, ${districtKor}건마, ${districtKor}스웨디시, ${districtKor}1인샵, ${regionKor}마사지, 마사지천국">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="https://msg1000.com/${regionEng}-${districtEng}-massage.html">
    
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
</head>
<body>
    <!-- 헤더 -->
    <header class="header">
        <div class="header-content">
            <h1 class="logo" onclick="window.location.href='index.html'" style="cursor: pointer;">
                <i class="fas fa-spa"></i>
                마사지천국
            </h1>
            <div class="search-toggle" id="searchToggle">
                <i class="fas fa-search"></i>
            </div>
        </div>
    </header>

    <!-- 검색 섹션 -->
    <section class="search-section">
        <div class="search-container">
            <div class="search-box main-search">
                <i class="fas fa-search"></i>
                <input type="text" id="mainSearchInput" class="search-input" placeholder="지역, 지하철역, 업체명으로 검색하세요">
                <button id="mainSearchBtn" class="search-btn-small">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            
            <div class="location-search">
                <div class="search-box">
                    <i class="fas fa-map-marker-alt"></i>
                    <select id="regionSelect" class="search-select">
                        <option value="">지역을 선택하세요</option>
                    </select>
                </div>
                <div class="search-box">
                    <i class="fas fa-building"></i>
                    <select id="districtSelect" class="search-select">
                        <option value="">구를 선택하세요</option>
                    </select>
                </div>
                <button id="searchBtn" class="search-btn">
                    <i class="fas fa-search"></i>
                    검색
                </button>
            </div>
        </div>
    </section>

    <section class="filter-section">
        <div class="filter-container">
            <button class="filter-btn active" data-filter="all">전체</button>
            <button class="filter-btn" data-filter="massage">마사지</button>
            <button class="filter-btn" data-filter="outcall">출장마사지</button>
            <button class="filter-btn" data-filter="waxing">왁싱</button>
        </div>
    </section>

    <!-- 국가별 마사지 필터 -->
    <section class="country-filter-section" id="massageCountryFilterSection" style="display: none;">
        <div class="country-filter-container">
            <h3 class="country-filter-title">국가별 마사지</h3>
            <div class="country-boxes">
                <div class="country-box active" data-country="overall">
                    <span class="country-name">전체</span>
                </div>
                <div class="country-box" data-country="korea">
                    <img src="https://www.msg1000.com/images/한국.jpg" alt="한국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">한국</span>
                </div>
                <div class="country-box" data-country="thai">
                    <img src="https://www.msg1000.com/images/태국.jpg" alt="태국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">태국</span>
                </div>
                <div class="country-box" data-country="china">
                    <img src="https://www.msg1000.com/images/중국.jpg" alt="중국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">중국</span>
                </div>
                <div class="country-box" data-country="russia">
                    <img src="https://www.msg1000.com/images/러시아.jpg" alt="러시아" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">러시아</span>
                </div>
                <div class="country-box" data-country="japan">
                    <img src="https://www.msg1000.com/images/일본.jpg" alt="일본" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">일본</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 국가별 출장마사지 필터 -->
    <section class="country-filter-section" id="outcallCountryFilterSection" style="display: none;">
        <div class="country-filter-container">
            <h3 class="country-filter-title">국가별 출장마사지</h3>
            <div class="country-boxes">
                <div class="country-box active" data-country="overall">
                    <span class="country-name">전체</span>
                </div>
                <div class="country-box" data-country="korea">
                    <img src="https://www.msg1000.com/images/한국.jpg" alt="한국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">한국</span>
                </div>
                <div class="country-box" data-country="thai">
                    <img src="https://www.msg1000.com/images/태국.jpg" alt="태국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">태국</span>
                </div>
                <div class="country-box" data-country="china">
                    <img src="https://www.msg1000.com/images/중국.jpg" alt="중국" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">중국</span>
                </div>
                <div class="country-box" data-country="russia">
                    <img src="https://www.msg1000.com/images/러시아.jpg" alt="러시아" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">러시아</span>
                </div>
                <div class="country-box" data-country="japan">
                    <img src="https://www.msg1000.com/images/일본.jpg" alt="일본" class="country-flag" 
                         onerror="this.onerror=null; this.style.display='none';" loading="lazy">
                    <span class="country-name">일본</span>
                </div>
            </div>
        </div>
    </section>

    <!-- 업체 목록 -->
    <main class="main-content">
        <div class="results-header">
            <h2 id="resultsTitle">${districtKor}마사지 전체 업체</h2>
            <span id="resultsCount" class="results-count">총 0개</span>
        </div>
        
        <div id="massageList" class="massage-list">
            <!-- 업체 카드들이 여기에 동적으로 생성됩니다 -->
        </div>
    </main>

    <!-- 푸터 -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-links">
                <div class="footer-link-row">
                    <a href="#" class="footer-link" onclick="openDetailsModal(event)">${region}마사지정보</a>
                </div>
                <div class="footer-divider-line"></div>
                <div class="footer-link-row">
                    <a href="#" class="footer-link" onclick="openAboutModal(event)">회사소개</a>
                    <span class="footer-divider">|</span>
                    <a href="#" class="footer-link" onclick="openTermsModal(event)">이용약관</a>
                </div>
            </div>
            <div class="footer-info">
                <p>상호명 : 마사지천국</p>
                <p>고객센터 : <a href="tel:0507-1859-6384" class="footer-phone">0507-1859-6384</a> <a href="tel:0507-1859-6384" class="footer-contact-btn">[ 입점 문의 ]</a></p>
            </div>
            <div class="footer-copyright">
                <p>&copy; 2024 마사지천국. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- 회사소개 모달 -->
    <div id="aboutModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>회사소개 (About Us)</h2>
                <button class="modal-close" onclick="closeModal('aboutModal')">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>마사지천국</strong>는 전국 어디서든 믿을 수 있는 마사지 정보를 쉽고 빠르게 찾을 수 있도록 만들어진 <strong>전국 마사지 플랫폼</strong>입니다.</p>
                
                <p>저희는 단순히 업체 정보를 나열하는 것이 아니라, <strong>이용자 중심의 편리한 검색 시스템</strong>과 <strong>투명한 정보 제공</strong>을 통해 고객과 업소 모두가 만족할 수 있는 건강한 플랫폼 생태계를 만들고자 합니다.</p>
            </div>
        </div>
    </div>

    <!-- 이용약관 모달 -->
    <div id="termsModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>이용약관 (Terms of Service)</h2>
                <button class="modal-close" onclick="closeModal('termsModal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="terms-section">
                    <h3>제 1 조 (목적)</h3>
                    <p>이 약관은 "마사지천국"(이하 "회사"라 함)가 제공하는 마사지 관련 정보 플랫폼 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        // 아이콘 보존 함수
        function ensureIconsVisible() {
            const searchBoxes = document.querySelectorAll('.search-box');
            searchBoxes.forEach(box => {
                const icon = box.querySelector('i');
                if (icon) {
                    icon.style.display = 'inline-block';
                    icon.style.visibility = 'visible';
                    icon.style.opacity = '1';
                    icon.style.position = 'relative';
                    icon.style.zIndex = '10';
                }
            });
        }
        
        // 페이지 로드 시 ${districtKor} 지역 자동 선택
        document.addEventListener('DOMContentLoaded', function() {
            // 아이콘 즉시 표시
            ensureIconsVisible();
            
            // 지역 선택을 "${regionKor}"로 설정
            const regionSelect = document.getElementById('regionSelect');
            const districtSelect = document.getElementById('districtSelect');
            
            if (regionSelect) {
                regionSelect.value = '${regionKor}';
                
                // 구 옵션 업데이트
                if (typeof updateDistrictOptions === 'function') {
                    updateDistrictOptions('${regionKor}');
                }
                
                // 전역 변수 설정
                if (typeof currentRegion !== 'undefined') {
                    currentRegion = '${regionKor}';
                }
                
                // 아이콘 다시 표시
                setTimeout(() => ensureIconsVisible(), 50);
            }
            
            // 구 선택을 "${districtKor}"로 설정
            setTimeout(function() {
                if (districtSelect) {
                    districtSelect.value = '${districtKor}';
                    if (typeof currentDistrict !== 'undefined') {
                        currentDistrict = '${districtKor}';
                    }
                }
                
                // 아이콘 다시 표시
                ensureIconsVisible();
                
                // displayFilteredResults()를 사용하여 필터 로직 적용
                if (typeof displayFilteredResults === 'function') {
                    displayFilteredResults();
                } else {
                    // 폴백: ${districtKor} 업체만 필터링하여 표시
                    const shops = massageShops.filter(shop => shop.region === '${regionKor}' && shop.district === '${districtKor}');
                    displayMassageShops(shops);
                    updateResultsHeader('${districtKor}마사지 전체 업체', shops.length);
                }
                
                // 최종 아이콘 체크
                setTimeout(() => ensureIconsVisible(), 200);
            }, 100);
        });
        
        // 페이지 상호작용 시 아이콘 유지
        document.addEventListener('click', function() {
            setTimeout(() => ensureIconsVisible(), 10);
        });
    </script>
</body>
</html>`;
}

// 모든 페이지 생성 실행
function generateAllPages() {
  let totalPages = 0;

  // 지역 메인 페이지 생성
  Object.keys(regions).forEach((regionKor) => {
    const regionEng = regionToEng[regionKor];
    const filename = `${regionEng}-massage.html`;
    const html = generateRegionPage(regionKor, regions[regionKor]);
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ 생성: ${filename}`);
    totalPages++;
  });

  // 구/시 페이지 생성
  Object.keys(regions).forEach((regionKor) => {
    const regionEng = regionToEng[regionKor];
    regions[regionKor].districts.forEach((districtKor) => {
      const districtEng =
        districtToEng[districtKor] || districtKor.replace(/[가-힣]/g, '');
      const filename = `${regionEng}-${districtEng}-massage.html`;
      const html = generateDistrictPage(regionKor, districtKor);
      fs.writeFileSync(filename, html, 'utf8');
      console.log(`✅ 생성: ${filename}`);
      totalPages++;
    });
  });

  console.log(`\n🎉 총 ${totalPages}개 페이지 생성 완료!`);
}

// 실행
console.log('🚀 페이지 생성 시작...\n');
generateAllPages();
