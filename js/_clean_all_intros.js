const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'shop-card-data.js');
let text = fs.readFileSync(file, 'utf8');
const start = text.indexOf('[');
const end = text.lastIndexOf(']') + 1;
const data = JSON.parse(text.slice(start, end));

function cleanIntro(shop, raw) {
  let body = String(raw || '').trim();
  if (!body) return '';
  body = body.split('【')[0].trim();
  body = body.split(/\n?\s*안내사항\s*\n?/)[0].trim();
  body = body.split(/\n?\s*건마시티 URL/)[0].trim();

  const shopName = String(shop.name || '').trim();
  const shopNameCompact = shopName.replace(/\s+/g, '');
  const phoneCompact = String(shop.phone || '').replace(/\D/g, '');
  const address = String(shop.address || '').trim();
  const isOutcall = shop.type === '출장마사지' || shop.type === 'outcall';

  const isSentence = (t) =>
    /[다요임죠까]$/.test(t) ||
    /드립니다|하세요|바랍니다|입니다|됩니다|거예요|해요/.test(t);

  const isSpacedBrand = (line) => {
    const compact = line.replace(/\s+/g, '');
    if (!compact || compact.length > 20) return false;
    if (!/^(?:[가-힣A-Za-z0-9]\s+){1,}[가-힣A-Za-z0-9]$/.test(line.trim())) {
      return false;
    }
    if (!shopNameCompact) return compact.length <= 8;
    return (
      compact === shopNameCompact ||
      shopNameCompact.includes(compact) ||
      compact.includes(shopNameCompact)
    );
  };

  const isPhoneLine = (line) => {
    const digits = line.replace(/\D/g, '');
    if (!digits || digits.length < 9) return false;
    const normalized = digits
      .replace(/^0+(?=0?5\d{8,})/, '0')
      .replace(/^00/, '0');
    const check = normalized.length <= 12 ? normalized : digits.slice(-11);
    if (check.length < 9 || check.length > 12) return false;
    if (phoneCompact) {
      const a = check.replace(/^0+/, '');
      const b = phoneCompact.replace(/^0+/, '');
      if (
        check === phoneCompact ||
        a === b ||
        check.endsWith(b) ||
        digits.endsWith(b)
      ) {
        return true;
      }
    }
    return /^0?\d{8,11}$/.test(check);
  };

  const isLocationLine = (line) => {
    const t = line.trim();
    if (!t) return false;
    if (isSentence(t)) return false;
    if (address && t === address) return true;
    if (
      !isOutcall &&
      address &&
      t.length >= 6 &&
      (address.includes(t) || t.includes(address))
    ) {
      return true;
    }
    if (/^\(.*주차.*\)$/.test(t)) return true;
    if (/^\([^)]*(로|길|번지|동)[^)]*\)$/.test(t)) return true;
    if (
      /로드샵|골목|인근\.\.|부근\.\./.test(t) &&
      t.length <= 40 &&
      !isSentence(t)
    ) {
      return true;
    }
    const compact = t.replace(/\s+/g, '');
    if (
      /상세주소|정확한\s*위치|위치는\s*연락|주소\s*문의|위치\s*문의/.test(t) &&
      t.length <= 40
    ) {
      return true;
    }
    if (
      /^(주차가능|주차불가|주차문의|무료주차|유료주차|주차가능합니다)$/.test(
        compact
      ) ||
      (/주차/.test(compact) &&
        compact.length <= 12 &&
        !/(가능합니다|드립니다)/.test(t))
    ) {
      return true;
    }
    if (/^(무\s*료\s*주\s*차|주차\s*문의|주차권)/.test(t) && t.length <= 30) {
      return true;
    }
    if (/(도보|출구)\s*\d*\s*분?|거리$/.test(t) && t.length <= 40) return true;
    if (
      /(서울특별시|부산광역시|대구광역시|인천광역시|광주광역시|대전광역시|울산광역시|세종특별자치시|제주특별자치도|서울시|부산시|대구시|인천시|광주시|대전시|울산시)/.test(
        t
      )
    ) {
      return true;
    }
    if (
      /(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주).*(구|군|시|동|읍|면|로|길|번지)/.test(
        t
      ) &&
      t.length <= 50
    ) {
      return true;
    }
    if (/^[가-힣]+(구|동)\s+[가-힣0-9\-]+/.test(t) && t.length <= 40) {
      return true;
    }
    if (!isOutcall && /전\s*지역|인근$|부근$/.test(t) && t.length <= 30) {
      return true;
    }
    return false;
  };

  const isNameLine = (line) => {
    const t = line.trim();
    if (!t) return false;
    const compact = t.replace(/\s+/g, '');
    if (shopNameCompact && compact === shopNameCompact) return true;
    if (isSpacedBrand(t)) return true;
    if (
      shopNameCompact &&
      compact.length >= 2 &&
      compact.length <= 6 &&
      shopNameCompact.includes(compact) &&
      !isSentence(t) &&
      t.length <= 12 &&
      !/(마사지|서비스|관리|힐링|최고의|고객)/.test(t)
    ) {
      return true;
    }
    return false;
  };

  const lines = body.split(/\n/);
  const kept = [];
  for (const rawLine of lines) {
    const line = String(rawLine || '').trim();
    if (!line) {
      if (kept.length && kept[kept.length - 1] !== '') kept.push('');
      continue;
    }
    if (isPhoneLine(line) || isNameLine(line) || isLocationLine(line)) continue;
    if (/건마시티\s*회원/.test(line)) continue;
    if (
      (line.match(/,/g) || []).length >= 3 &&
      /마사지|홈타이|출장|건마/.test(line)
    ) {
      continue;
    }
    kept.push(line);
  }
  while (kept.length && kept[0] === '') kept.shift();
  while (kept.length && kept[kept.length - 1] === '') kept.pop();
  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

let changed = 0;
data.forEach((shop) => {
  const before = String(shop.description || '');
  const after = cleanIntro(shop, before);
  if (after !== before) {
    shop.description = after;
    changed += 1;
  }
  if (shop.detailContent) {
    const parts = String(shop.detailContent).split('【');
    const intro = cleanIntro(shop, parts[0]);
    const rest = parts
      .slice(1)
      .map((p) => '【' + p)
      .join('');
    const next = [intro, rest].filter(Boolean).join('\n\n');
    if (next !== shop.detailContent) shop.detailContent = next;
  }
});

fs.writeFileSync(
  file,
  'window.shopCardData = ' + JSON.stringify(data, null, 2) + ';\n',
  'utf8'
);

console.log('cleaned descriptions:', changed, '/', data.length);
['샤넬', '강남 클라스', '러시아출장', '루미', '포시즌'].forEach((key) => {
  const s = data.find((x) => String(x.name).includes(key));
  if (!s) return;
  console.log('\n==', s.name, '==');
  console.log(s.description);
});
