const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'shop-card-data.js');
const text = fs.readFileSync(file, 'utf8');
const start = text.indexOf('[');
const end = text.lastIndexOf(']') + 1;
const data = JSON.parse(text.slice(start, end));

function cleanDisplayAddress(address, shop) {
  let body = String(address || '').trim();
  if (!body) return '';

  const isOutcall =
    shop && (shop.type === '출장마사지' || shop.type === 'outcall');

  // 출장 서비스권역은 유지
  if (
    isOutcall &&
    /(전\s*지역|전지역|,|\.|·)/.test(body) &&
    !/\d{1,4}-\d{1,4}/.test(body)
  ) {
    return body;
  }

  body = body
    .replace(
      /\s+[가-힣A-Za-z0-9]+역\s*\d*\s*번?\s*출구(?:\s*도보\s*\d+\s*분)?.*$/u,
      ''
    )
    .replace(/\s+[가-힣A-Za-z0-9]+역\s*(부근|인근|근처).*$/u, '')
    .replace(/\s+[가-힣A-Za-z0-9]+역\s*$/u, '')
    .replace(/\s*도보\s*\d+\s*분.*$/u, '')
    .replace(/\s*\([^)]*(출구|도보|주차|문의|부근|인근)[^)]*\)\s*$/u, '')
    .replace(/\s*(상세\s*주소\s*문의|주소\s*문의|위치\s*문의).*$/u, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return body || String(address || '').trim();
}

let changed = 0;
data.forEach((shop) => {
  const beforeA = String(shop.address || '');
  const beforeD = String(shop.detailAddress || '');
  const afterA = cleanDisplayAddress(beforeA, shop);
  const afterD = cleanDisplayAddress(beforeD, shop);

  if (afterA !== beforeA) {
    shop.address = afterA;
    changed += 1;
  }
  if (afterD && afterD !== beforeD) {
    shop.detailAddress = afterD;
    changed += 1;
  }
  // 출장이 아닌데 detailAddress가 address와 같으면 중복 제거
  if (
    shop.detailAddress &&
    shop.address &&
    shop.detailAddress === shop.address &&
    shop.type !== '출장마사지'
  ) {
    shop.detailAddress = '';
  }
});

fs.writeFileSync(
  file,
  'window.shopCardData = ' + JSON.stringify(data, null, 2) + ';\n',
  'utf8'
);

const samples = data.filter((s) =>
  /문정동|동소문로|신사동|서초동 1328/.test(String(s.address || ''))
);
console.log('changed fields:', changed);
samples.slice(0, 8).forEach((s) =>
  console.log(s.id, s.name, '|', s.address)
);
