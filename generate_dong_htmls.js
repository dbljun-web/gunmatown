#!/usr/bin/env node
/**
 * 모든 동/역에 대한 HTML 파일을 생성하는 스크립트
 * - 지역 + 세부지역 + 동,역.html (타입 없음)
 * - 지역 + 세부지역 + 동,역 + 타입.html (각 타입별)
 */

const fs = require('fs');
const path = require('path');

// 타입 목록
const TYPES = [
  'massage',
  'outcall',
  'swedish',
  'thai',
  'aroma',
  'waxing',
  'chinese',
  'foot',
  'spa',
];

// 타입별 한글명
const TYPE_NAMES = {
  massage: '마사지',
  outcall: '출장마사지',
  swedish: '스웨디시',
  thai: '타이마사지',
  aroma: '아로마마사지',
  waxing: '왁싱',
  chinese: '중국마사지',
  foot: '발마사지',
  spa: '스파',
};

// 타입별 title suffix (동/역 페이지용)
const TYPE_TITLE_SUFFIX = {
  massage: '안마·힐링 1위샵',
  outcall: '출장·방문 1위샵',
  swedish: '스웨디시·힐링 1위샵',
  thai: '타이·태국 1위샵',
  aroma: '아로마·힐링 1위샵',
  waxing: '왁싱·제모 1위샵',
  chinese: '중국·지압 1위샵',
  foot: '발·족욕 1위샵',
  spa: '스파·힐링 1위샵',
};

// script.js에서 districtMap 로드
function loadDistrictMap() {
  const scriptPath = path.join(__dirname, 'public', 'script.js');
  const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

  // window.districtMap을 추출하기 위해 eval 사용 (안전한 컨텍스트)
  // 실제로는 더 안전한 방법을 사용해야 하지만, 여기서는 간단하게
  const districtMapMatch = scriptContent.match(
    /window\.districtMap\s*=\s*(\{[\s\S]*?\});/
  );

  if (!districtMapMatch) {
    throw new Error('districtMap을 찾을 수 없습니다.');
  }

  // districtMap 객체 평가
  const districtMapStr = districtMapMatch[1];
  // 안전하게 평가하기 위해 Function 생성자 사용
  const districtMap = new Function('return ' + districtMapStr)();

  return districtMap;
}

// HTML 템플릿 읽기
function readTemplate() {
  const templatePath = path.join(
    __dirname,
    'public',
    'seoul-gangnam-massage.html'
  );
  return fs.readFileSync(templatePath, 'utf-8');
}

// HTML 파일 생성
function generateHTML(
  regionKey,
  regionName,
  districtKey,
  districtName,
  dongKey,
  dongName,
  filterType = null
) {
  const template = readTemplate();

  // 파일명 생성
  let filename;
  let titleSuffix;

  if (filterType) {
    filename = `${regionKey}-${districtKey}-${dongKey}-${filterType}.html`;
    titleSuffix = TYPE_NAMES[filterType] || filterType;
  } else {
    filename = `${regionKey}-${districtKey}-${dongKey}.html`;
    titleSuffix = '마사지';
  }

  // 제목 및 메타 태그 생성 (지역 제거, 상세지역 + 동/역만 표시)
  // title suffix 결정 (타입별로 다른 suffix 사용)
  let titleSuffixText = '안마·힐링 1위샵';
  if (filterType && TYPE_TITLE_SUFFIX[filterType]) {
    titleSuffixText = TYPE_TITLE_SUFFIX[filterType];
  }

  const pageTitle = `${districtName} ${dongName} ${titleSuffix} 추천 BEST 샵｜${titleSuffixText} 가격·후기`;
  const metaDescription = `${districtName} ${dongName} ${titleSuffix} BEST 샵 실시간 순위★ 시내·역세권 안마, 힐링마사지, 전신마사지 가격 비교. 검증된 1위 샵만 골라서 0507 전화로 바로 예약 가능. 실제 후기 100+ 확인하세요!`;
  const canonicalUrl = `https://msg1000.com/${filename}`;
  const resultsTitle = `${districtName} ${dongName} ${titleSuffix} 추천 BEST 샵`;

  let html = template;

  // 제목 교체
  html = html.replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`);

  // 메타 description 교체
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"/,
    `<meta name="description" content="${metaDescription}"`
  );

  // canonical URL 교체
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonicalUrl}"`
  );

  // Open Graph 태그 교체
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${pageTitle}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${metaDescription}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // Twitter Card 태그 교체
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${pageTitle}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${metaDescription}"`
  );

  // resultsTitle 교체
  html = html.replace(
    /<h1 id="resultsTitle">[^<]*<\/h1>/,
    `<h1 id="resultsTitle">${resultsTitle}</h1>`
  );

  // 지역/세부지역 설정 스크립트 교체
  html = html.replace(
    /currentRegion = '[^']*'/,
    `currentRegion = '${regionName}'`
  );
  html = html.replace(
    /regionSelect\.value = '[^']*'/,
    `regionSelect.value = '${regionName}'`
  );
  html = html.replace(
    /districtSelect\.value = '[^']*'/,
    `districtSelect.value = '${districtName}'`
  );
  html = html.replace(
    /currentDistrict = '[^']*'/,
    `currentDistrict = '${districtName}'`
  );

  // 동/역 선택 설정 스크립트 추가 (districtSelect 설정 후)
  const dongStationScript = `
          // 동/역 옵션 업데이트
          if (typeof updateDongStationOptions === 'function') {
            updateDongStationOptions('${regionName}', '${districtName}');
          }
          // 동/역 선택값 설정 (약간의 지연 후)
          setTimeout(() => {
            const dongStationSelect = document.getElementById('dongStationSelect');
            if (dongStationSelect) {
              dongStationSelect.value = '${dongKey}';
              dongStationSelect.disabled = false;
              dongStationSelect.style.opacity = '1';
            }
          }, 200);
  `;

  // districtSelect.style.opacity = '1' 다음에 동/역 설정 코드 추가
  html = html.replace(
    /(districtSelect\.style\.opacity = '1';)/,
    `$1${dongStationScript}`
  );

  // currentFilter 설정 및 필터 버튼 활성화
  if (filterType) {
    // 필터 버튼 활성화 스크립트 교체
    const filterBtnScript = `// ${filterType} 필터 버튼을 활성화
        const ${filterType}FilterBtn = document.querySelector('[data-filter="${filterType}"]');
        if (${filterType}FilterBtn) {
          document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.classList.remove('active');
          });
          ${filterType}FilterBtn.classList.add('active');

          if (typeof currentFilter !== 'undefined') {
            currentFilter = '${filterType}';
          }
          window.currentFilter = '${filterType}';`;

    // 마사지 필터 버튼 활성화 부분을 교체
    html = html.replace(
      /\/\/ 마사지 필터 버튼을 기본으로 활성화[\s\S]*?const massageFilterBtn = document\.querySelector\('\[data-filter="massage"\]'[\s\S]*?\);[\s\S]*?if \(massageFilterBtn\) \{[\s\S]*?document\.querySelectorAll\('\.filter-btn'\)\.forEach\(\(btn\) => \{[\s\S]*?btn\.classList\.remove\('active'\);[\s\S]*?\}\);[\s\S]*?massageFilterBtn\.classList\.add\('active'\);[\s\S]*?\}[\s\S]*?if \(typeof currentFilter !== 'undefined'\) \{[\s\S]*?currentFilter = 'massage';[\s\S]*?\}[\s\S]*?window\.currentFilter = 'massage';/,
      filterBtnScript
    );
  } else {
    // 타입이 없으면 'all' 필터 버튼 활성화
    const allFilterBtnScript = `// 전체 필터 버튼을 활성화
        const allFilterBtn = document.querySelector('[data-filter="all"]');
        if (allFilterBtn) {
          document.querySelectorAll('.filter-btn').forEach((btn) => {
            btn.classList.remove('active');
          });
          allFilterBtn.classList.add('active');

          if (typeof currentFilter !== 'undefined') {
            currentFilter = 'all';
          }
          window.currentFilter = 'all';`;

    html = html.replace(
      /\/\/ 마사지 필터 버튼을 기본으로 활성화[\s\S]*?const massageFilterBtn = document\.querySelector\('\[data-filter="massage"\]'[\s\S]*?\);[\s\S]*?if \(massageFilterBtn\) \{[\s\S]*?document\.querySelectorAll\('\.filter-btn'\)\.forEach\(\(btn\) => \{[\s\S]*?btn\.classList\.remove\('active'\);[\s\S]*?\}\);[\s\S]*?massageFilterBtn\.classList\.add\('active'\);[\s\S]*?\}[\s\S]*?if \(typeof currentFilter !== 'undefined'\) \{[\s\S]*?currentFilter = 'massage';[\s\S]*?\}[\s\S]*?window\.currentFilter = 'massage';/,
      allFilterBtnScript
    );
  }

  // placeholder 텍스트 교체
  html = html.replace(
    /placeholder="서울 강남 지역 또는 키워드를 입력하세요"/,
    `placeholder="${regionName} ${districtName} ${dongName} 지역 또는 키워드를 입력하세요"`
  );

  // footer 링크 교체 (동/역 HTML은 세부지역 + 동/역 형식)
  html = html.replace(
    /서울 강남마사지정보/,
    `${districtName} ${dongName}${titleSuffix}정보`
  );

  // 파일 저장
  const outputPath = path.join(__dirname, 'public', filename);
  fs.writeFileSync(outputPath, html, 'utf-8');

  return filename;
}

// 메인 함수
function main() {
  console.log('districtMap 로드 중...');
  const districtMap = loadDistrictMap();

  console.log(`파싱 완료: ${Object.keys(districtMap).length}개 지역`);

  let totalFiles = 0;

  for (const [regionKey, regionData] of Object.entries(districtMap)) {
    const regionName = regionData.regionName || regionKey;
    const districts = regionData.districts || {};

    if (!districts || Object.keys(districts).length === 0) {
      console.log(`경고: ${regionKey}에 세부지역이 없습니다.`);
      continue;
    }

    for (const [districtKey, districtData] of Object.entries(districts)) {
      const districtName =
        typeof districtData === 'string'
          ? districtData
          : districtData.districtsname || districtKey;

      const dongStations =
        typeof districtData === 'object' && districtData.dongStations
          ? districtData.dongStations
          : {};

      if (!dongStations || Object.keys(dongStations).length === 0) {
        console.log(`경고: ${regionKey}-${districtKey}에 동/역이 없습니다.`);
        continue;
      }

      for (const [dongKey, dongName] of Object.entries(dongStations)) {
        // 타입 없이 생성 (all)
        const filename1 = generateHTML(
          regionKey,
          regionName,
          districtKey,
          districtName,
          dongKey,
          dongName,
          null
        );
        totalFiles++;
        if (totalFiles % 100 === 0) {
          console.log(`진행 중... ${totalFiles}개 파일 생성됨`);
        }

        // 각 타입별로 생성
        for (const filterType of TYPES) {
          const filename2 = generateHTML(
            regionKey,
            regionName,
            districtKey,
            districtName,
            dongKey,
            dongName,
            filterType
          );
          totalFiles++;
          if (totalFiles % 100 === 0) {
            console.log(`진행 중... ${totalFiles}개 파일 생성됨`);
          }
        }
      }
    }
  }

  console.log(`\n총 ${totalFiles}개 파일 생성 완료!`);
}

// 실행
try {
  main();
} catch (error) {
  console.error('오류 발생:', error);
  process.exit(1);
}
