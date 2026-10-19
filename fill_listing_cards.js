#!/usr/bin/env node
/**
 * 지역 목록 HTML의 #massageList에 업체 카드를 심어 원본보기·봇 수집용으로 만듭니다.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SKIP = new Set([
  'login.html',
  'shop-edit.html',
  'nearby.html',
  'detail.html',
  'reviews.html',
]);
const FILTERS = [
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
const THEMES = {
  swedish: ['스웨디시', '스웨덴'],
  thai: ['타이마사지', '타이', 'thai'],
  aroma: ['아로마', '아로마마사지'],
  waxing: ['왁싱', 'waxing'],
  chinese: ['중국마사지', '중국'],
  foot: ['발마사지', '족욕'],
  spa: ['스파', 'SPA'],
};
const MAX_CARDS = 24;

function loadDistrictMap() {
  const text = fs.readFileSync(path.join(ROOT, 'js', 'script.js'), 'utf8');
  const start = text.indexOf('window.districtMap = ');
  const i = text.indexOf('{', start);
  let depth = 0;
  for (let j = i; j < text.length; j++) {
    const ch = text[j];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return Function('return ' + text.slice(i, j + 1))();
      }
    }
  }
  throw new Error('districtMap 파싱 실패');
}

function loadShops() {
  let text = fs.readFileSync(path.join(ROOT, 'js', 'shop-card-data.js'), 'utf8');
  text = text.replace('window.shopCardData =', '').trim();
  if (text.endsWith(';')) text = text.slice(0, -1);
  return JSON.parse(text);
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isOutcall(shop) {
  const t = String(shop.type || '');
  return t === '출장마사지' || t.toLowerCase() === 'outcall' || t.includes('출장');
}

function isMassage(shop) {
  return !isOutcall(shop);
}

function normDistrict(name) {
  return String(name || '')
    .trim()
    .replace(/(특별자치시|특별시|광역시)$/u, '')
    .replace(/(특별자치구|자치구)$/u, '')
    .replace(/(구|군|시)$/u, '');
}

function shopRegions(shop) {
  return String(shop.region || '')
    .split(/[,·/|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function matchesRegion(shop, region) {
  if (!region) return true;
  if (shopRegions(shop).includes(region)) return true;
  const blob = [shop.address, shop.directions, shop.description].join(' ');
  return blob.includes(region);
}

function matchesDistrict(shop, district) {
  if (!district) return true;
  if (isOutcall(shop)) return true;
  const a = normDistrict(shop.district);
  const b = normDistrict(district);
  return a && b && a === b;
}

function matchesDong(shop, dong) {
  if (!dong) return false;
  if (String(shop.dong || '').trim() === dong) return true;
  return String(shop.address || '').includes(dong);
}

function matchesTheme(shop, keywords) {
  const parts = [];
  if (shop.type) parts.push(String(shop.type));
  if (Array.isArray(shop.services)) parts.push(shop.services.join(' '));
  const text = parts.join(' ');
  return keywords.some((k) => text.includes(k));
}

function parseFilename(name, districtMap) {
  const info = { region: '', district: '', dong: '', filter: '' };
  const parts = name.replace(/\.html$/i, '').split('-');
  if (!districtMap[parts[0]]) return info;
  const regionData = districtMap[parts[0]];
  info.region = regionData.regionName;
  if (parts[1] && regionData.districts[parts[1]]) {
    const d = regionData.districts[parts[1]];
    info.district = typeof d === 'string' ? d : d.districtsname || '';
    let dongParts = [];
    for (let i = 2; i < parts.length; i++) {
      if (FILTERS.includes(parts[i])) {
        info.filter = parts[i];
        break;
      }
      dongParts.push(parts[i]);
    }
    if (dongParts.length && typeof d === 'object' && d.dongStations) {
      const key = dongParts.join('-');
      info.dong = d.dongStations[key] || '';
    }
  } else if (FILTERS.includes(parts[1])) {
    info.filter = parts[1];
  }
  if (!info.filter) {
    const last = parts[parts.length - 1];
    if (FILTERS.includes(last)) info.filter = last;
  }
  return info;
}

function pickShops(shops, info) {
  let pool = shops.slice();
  if (info.filter === 'outcall') pool = pool.filter(isOutcall);
  else if (info.filter === 'massage') pool = pool.filter(isMassage);
  else if (THEMES[info.filter]) {
    pool = pool.filter((s) => matchesTheme(s, THEMES[info.filter]));
  } else {
    pool = pool.filter(isMassage);
  }

  if (info.region) {
    const regional = pool.filter((s) => matchesRegion(s, info.region));
    if (regional.length) pool = regional;
  }

  const dongHits = info.dong ? pool.filter((s) => matchesDong(s, info.dong)) : [];
  const distHits = info.district
    ? pool.filter((s) => matchesDistrict(s, info.district) && !dongHits.includes(s))
    : [];
  const rest = pool.filter((s) => !dongHits.includes(s) && !distHits.includes(s));
  const ordered = [...dongHits, ...distHits, ...rest];
  if (ordered.length) return ordered.slice(0, MAX_CARDS);
  return shops.filter(isMassage).slice(0, Math.min(12, MAX_CARDS));
}

function displayName(shop) {
  const name = String(shop.name || '').trim();
  if (isOutcall(shop)) return name;
  const dong = String(shop.dong || '').trim();
  if (dong && name && !name.includes(dong)) return `${dong} ${name}`;
  return name;
}

function greeting(shop) {
  const custom = String(shop.greeting || '').trim();
  if (custom) return custom;
  const desc = String(shop.description || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(' ');
  return desc.slice(0, 160);
}

function locationInfo(shop) {
  if (isOutcall(shop)) return shop.region || '출장마사지';
  if (shop.district && shop.dong) return `${shop.district} ${shop.dong}`;
  return shop.district || shop.dong || '';
}

function addressLine(shop) {
  const parts = [];
  if (shop.address) parts.push(shop.address);
  if (shop.phone) parts.push(shop.phone);
  return parts.join(' | ');
}

function cardHtml(shop) {
  const name = displayName(shop);
  const type = isOutcall(shop) ? '출장마사지' : '마사지';
  const img = shop.image || 'images/강남_강남역_강남클라스.jpg';
  const alt = shop.alt || `${name} 업체 사진`;
  const badge = shop.showHealingShop === false ? '' : '<div class="shop-type shop-type-healing">힐링샵</div>';
  const outBadge = isOutcall(shop) ? '<div class="shop-type shop-type-outcall">출장샵</div>' : '';
  const addr = addressLine(shop);
  return `<a class="massage-card" data-type="${esc(type)}" data-region="${esc(shop.region || '')}" href="shop/${shop.id}.html" style="cursor: pointer; text-decoration: none; color: inherit;">
            <div class="card-image">
                <img src="${esc(img)}" alt="${esc(alt)}" class="shop-image" width="300" height="200" loading="lazy">
                <div class="image-overlay">${badge}${outBadge}</div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <div class="shop-name-container">
                        <div class="shop-name">${esc(name)}</div>
                        <div class="shop-location-info"><span class="shop-district">${esc(locationInfo(shop))}</span></div>
                    </div>
                </div>
                <div class="card-info"><div class="info-item greeting"><span>${esc(greeting(shop))}</span></div></div>
                <div class="card-footer" style="display:flex;align-items:center;gap:12px;">
                    <div class="price-container" style="display:flex;align-items:center;gap:8px;overflow:hidden;width:100%;">
                        <div class="price" style="flex-shrink:0;"><span class="price-label">최저가</span> ${esc(shop.price || '')}</div>
                        ${addr ? `<div class="shop-address-info" style="font-size:12px;color:#666;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;">${esc(addr)}</div>` : ''}
                    </div>
                </div>
            </div>
        </a>`;
}

function jsonLdItems(shops, title, desc) {
  const items = shops.map((shop, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://gunmatown.com/shop/${shop.id}.html`,
    name: displayName(shop),
  }));
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: title,
      description: desc,
      numberOfItems: items.length,
      itemListElement: items,
    },
    null,
    2
  );
}

function replaceInnerById(html, id, inner) {
  const token = `id="${id}"`;
  const idx = html.indexOf(token);
  if (idx < 0) return null;
  const open = html.lastIndexOf('<', idx);
  const tagEnd = html.indexOf('>', idx);
  if (open < 0 || tagEnd < 0) return null;
  let depth = 1;
  let i = tagEnd + 1;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<', i);
    if (nextOpen < 0) break;
    if (html.startsWith('</', nextOpen)) {
      depth--;
      if (depth === 0) {
        return html.slice(0, tagEnd + 1) + '\n' + inner + '\n      ' + html.slice(nextOpen);
      }
      i = html.indexOf('>', nextOpen) + 1;
    } else if (html.startsWith('<!--', nextOpen)) {
      i = html.indexOf('-->', nextOpen) + 3;
    } else {
      const selfClose = html.indexOf('>', nextOpen);
      const snippet = html.slice(nextOpen, selfClose + 1);
      if (!snippet.endsWith('/>')) depth++;
      i = selfClose + 1;
    }
  }
  return null;
}

function replaceJsonLd(html, shops, title, desc) {
  return html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${jsonLdItems(shops, title, desc)}\n    </script>`
  );
}

function titleFromHtml(html) {
  const m = html.match(/<h1[^>]*id="resultsTitle"[^>]*>([^<]*)<\/h1>/);
  return (m && m[1].trim()) || '마사지 추천 BEST 샵';
}

function descFromHtml(html) {
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  return (m && m[1]) || '';
}

function main() {
  const districtMap = loadDistrictMap();
  const shops = loadShops();
  const files = fs
    .readdirSync(ROOT)
    .filter((n) => n.endsWith('.html') && !SKIP.has(n));
  let filled = 0;
  let skipped = 0;
  for (const name of files) {
    const file = path.join(ROOT, name);
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('id="massageList"')) {
      skipped++;
      continue;
    }
    const info = parseFilename(name, districtMap);
    const picked = pickShops(shops, info);
    const cards = picked.map(cardHtml).join('\n');
    const next = replaceInnerById(html, 'massageList', cards);
    if (!next) {
      skipped++;
      continue;
    }
    html = replaceJsonLd(next, picked, titleFromHtml(next), descFromHtml(next));
    fs.writeFileSync(file, html);
    filled++;
  }
  console.log(`[완료] 카드 삽입 ${filled}개, 건너뜀 ${skipped}개`);
}

main();
