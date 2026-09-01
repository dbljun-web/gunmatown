// 상세 페이지 JavaScript

// script.js 미로드 시 최소 헬퍼
if (typeof createShopDisplayName !== 'function') {
  function createShopDisplayName(shop) {
    if (!shop) return '';
    if (shop.type === '출장마사지' || shop.type === 'outcall') {
      return (shop.name || '').trim();
    }
    if (shop.dong && shop.name && !String(shop.name).includes(shop.dong)) {
      return `${shop.dong} ${shop.name}`;
    }
    return shop.name || '';
  }
}
if (typeof getTypeName !== 'function') {
  function getTypeName(typeOrShop) {
    if (!typeOrShop) return '';
    if (typeof typeOrShop === 'object') {
      if (typeOrShop.showHealingShop === false) return '';
      if (typeOrShop.typeLabel) return typeOrShop.typeLabel;
      return typeOrShop.showHealingShop ? '힐링샵' : '';
    }
    return typeOrShop === '힐링샵' ? '힐링샵' : '';
  }
}

// 성인 인증 관련 함수 제거됨

// detail 단독 로드 시 국기 헬퍼 (script.js 미포함 대비)
function renderDetailCountryFlagsHtml(country) {
  const FLAG_BASE_PATH = 'images/national flag';
  const map = {
    korea: { src: `${FLAG_BASE_PATH}/한국.jpg`, alt: '한국 국기' },
    japan: { src: `${FLAG_BASE_PATH}/일본.jpg`, alt: '일본 국기' },
    thailand: { src: `${FLAG_BASE_PATH}/태국.jpg`, alt: '태국 국기' },
    china: { src: `${FLAG_BASE_PATH}/중국.jpg`, alt: '중국 국기' },
    russia: { src: `${FLAG_BASE_PATH}/러시아.jpg`, alt: '러시아 국기' },
    ukraine: {
      src: `${FLAG_BASE_PATH}/우크라이나국기.png`,
      alt: '우크라이나 국기',
    },
  };
  const keys = [];
  const add = (k) => {
    if (!keys.includes(k)) keys.push(k);
  };
  if (!country) {
    add('korea');
  } else {
    String(country)
      .toLowerCase()
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((part) => {
        if (part.includes('korea') || part.includes('한국')) add('korea');
        else if (part.includes('japan') || part.includes('일본')) add('japan');
        else if (
          part.includes('thailand') ||
          part.includes('thai') ||
          part.includes('태국')
        )
          add('thailand');
        else if (part.includes('china') || part.includes('중국')) add('china');
        else if (part.includes('russia') || part.includes('러시아'))
          add('russia');
        else if (part.includes('ukraine') || part.includes('우크라이나'))
          add('ukraine');
      });
  }
  if (keys.length === 0) add('korea');
  if (!keys.includes('korea')) keys.unshift('korea');
  return keys
    .map((key) => {
      const flag = map[key];
      if (!flag) return '';
      return `<img src="${flag.src}" alt="${flag.alt}" class="flag-image" loading="lazy" onerror="this.style.display='none'">`;
    })
    .join('');
}

// 로딩 상태 관리
let isPageLoaded = false;

// URL에서 업체 ID 가져오기
function getShopIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// 업체 데이터 가져오기
function getShopData(shopId) {
  if (window.shopCardData) {
    return window.shopCardData.find((shop) => String(shop.id) === String(shopId));
  }
  if (typeof massageShops !== 'undefined' && massageShops) {
    return massageShops.find((shop) => String(shop.id) === String(shopId));
  }
  return null;
}

// 상세 페이지 데이터 로드 (중복 방지)
async function loadShopDetail() {
  // 이미 로드된 경우 중복 실행 방지
  if (isPageLoaded) {
    console.log('페이지가 이미 로드되었습니다.');
    return;
  }

  const shopId = getShopIdFromUrl();
  if (!shopId) {
    alert('잘못된 접근입니다.');
    goBack();
    return;
  }

  if (typeof applyShopOverridesToCardData === 'function') {
    await applyShopOverridesToCardData();
  }

  const shop = getShopData(shopId);
  if (!shop) {
    alert('업체 정보를 찾을 수 없습니다.');
    goBack();
    return;
  }

  // 로딩 상태 설정
  isPageLoaded = true;

  // 모든 정보를 즉시 로드 (성능 최적화)
  displayShopInfo(shop);
  displayStaffInfo(shop);
  displayShopCourses(shop);
  displayShopDirections(shop);
  displayNearbyShops(shop);
  displayShopReviews(shop);
  updateSEOMetaTags(shop);
  setupDetailTabs();
  setupDetailAdminActions(shop);
  if (typeof initAuthUi === 'function') initAuthUi();
  console.log('업체 상세 페이지 로드 완료');
}

function setupDetailAdminActions(shop) {
  const editBtn = document.getElementById('adminEditBtn');
  const deleteBtn = document.getElementById('adminDeleteBtn');
  if (editBtn) {
    editBtn.onclick = () => {
      location.href = `shop-edit.html?id=${encodeURIComponent(shop.id)}`;
    };
  }
  if (deleteBtn) {
    deleteBtn.onclick = async () => {
      if (!isAdminMode || !isAdminMode()) {
        alert('관리자만 삭제할 수 있습니다.');
        return;
      }
      if (!confirm('이 업체를 삭제(비공개)할까요?')) return;
      try {
        await deleteShopOverride(shop.id);
        alert('삭제되었습니다.');
        location.href = 'index.html';
      } catch (err) {
        alert(err.message || '삭제 실패');
      }
    };
  }
}

// 업체 정보 표시 (최적화됨)
function displayShopInfo(shop) {
  // DOM 요소들을 한 번에 가져오기 (성능 최적화)
  const elements = {
    shopName: document.getElementById('shopName'),
    shopDescription: document.getElementById('shopDescription'),
    shopAddress: document.getElementById('shopAddress'),
    shopPhone: document.getElementById('shopPhone'),
    shopHours: document.getElementById('shopHours'),
    shopImage: document.getElementById('shopImage'),
    shopType: document.getElementById('shopType'),
    shopStars: document.getElementById('shopStars'),
    shopRatingText: document.getElementById('shopRatingText'),
    overallRating: document.getElementById('overallRating'),
    overallStars: document.getElementById('overallStars'),
    totalReviews: document.getElementById('totalReviews'),
    shopCountryFlags: document.getElementById('shopCountryFlags'),
    shopDistrict: document.getElementById('shopDistrict'),
  };

  // 모든 정보를 즉시 표시 (성능 최적화)

  // shop name 표시 (이미 동이 포함된 경우 중복 추가 방지)
  elements.shopName.textContent = createShopDisplayName(shop);

  // 지역 정보 표시 (구/시 + 동 구분)
  if (elements.shopDistrict) {
    elements.shopDistrict.textContent = formatShopAreaLabel(shop);
  }

  // 소개: 원본 소개문 최대한 유지 (지역명 때문에 뒷부분 잘리지 않게)
  const descText = getShopIntroText(shop);
  if (elements.shopDescription) {
    elements.shopDescription.style.whiteSpace = 'pre-line';
    elements.shopDescription.textContent = descText;
  }

  // 한마디 (라벨 없이 내용만, 노출 시에만)
  const oneLinerEl = document.getElementById('shopOneLiner');
  if (oneLinerEl) {
    const oneLiner = String(shop.detailContent || '').trim();
    const showOneLiner = shop.showOneLiner === true && !!oneLiner;
    if (showOneLiner) {
      oneLinerEl.hidden = false;
      oneLinerEl.style.whiteSpace = 'pre-line';
      oneLinerEl.textContent = oneLiner;
    } else {
      oneLinerEl.hidden = true;
      oneLinerEl.textContent = '';
    }
  }
  // 전화번호 표시 (shop.phone이 없으면 빈 문자열)
  if (elements.shopPhone) {
    elements.shopPhone.textContent = shop.phone || '';
  }

  // 운영시간 표시 (operatingHours가 있으면 사용, 없으면 기본값)
  if (elements.shopHours) {
    elements.shopHours.textContent =
      shop.operatingHours || '09:00 - 22:00 (연중무휴)';
  }

  // 타입 배지 (힐링샵 + 출장마사지면 출장샵)
  if (elements.shopType) {
    const typeText =
      typeof getTypeName === 'function' ? getTypeName(shop) : shop.typeLabel || '';
    elements.shopType.textContent = typeText || '';
    elements.shopType.style.display = typeText ? '' : 'none';
  }
  const outcallBadge = document.getElementById('shopTypeOutcall');
  if (outcallBadge) {
    const isOutcall =
      typeof isOutcallType === 'function'
        ? isOutcallType(shop)
        : shop.type === '출장마사지' || shop.type === 'outcall';
    outcallBadge.hidden = !isOutcall;
    outcallBadge.style.display = isOutcall ? '' : 'none';
  }

  // 평점 (요소 있을 때만)
  const stars =
    '★'.repeat(Math.floor(shop.rating)) +
    '☆'.repeat(5 - Math.floor(shop.rating));
  if (elements.shopStars) elements.shopStars.textContent = stars;
  if (elements.shopRatingText) {
    elements.shopRatingText.textContent = `${shop.rating} (${shop.reviewCount}개 리뷰)`;
  }
  if (elements.overallRating) elements.overallRating.textContent = shop.rating;
  if (elements.overallStars) elements.overallStars.textContent = stars;
  if (elements.totalReviews) {
    elements.totalReviews.textContent = `총 ${shop.reviewCount}개 리뷰`;
  }

  // 주소 설정
  setupAddressSection(elements.shopAddress, shop);

  // 국기 표시 (images/national flag)
  if (elements.shopCountryFlags) {
    const flagsHtml =
      typeof window.renderCountryFlagsHtml === 'function'
        ? window.renderCountryFlagsHtml(shop.country)
        : renderDetailCountryFlagsHtml(shop.country);
    elements.shopCountryFlags.innerHTML = flagsHtml;
    elements.shopCountryFlags.classList.add('location-flag');
  }

  // 이미지 로드 (로컬 images 갤러리 + SEO alt)
  setupShopImages(shop, elements.shopImage);
}

function getShopImageList(shop) {
  const list = [];
  const push = (src) => {
    const u = String(src || '').trim();
    if (!u) return;
    if (!list.includes(u)) list.push(u);
  };
  if (Array.isArray(shop.images)) shop.images.forEach(push);
  push(shop.image);
  return list;
}

function setupShopImages(shop, mainImg) {
  if (!mainImg) return;
  const images = getShopImageList(shop);
  const alts = Array.isArray(shop.imageAlts) ? shop.imageAlts : [];
  const fallbackAlt =
    shop.alt ||
    `${shop.name || '업체'} ${shop.type === '출장마사지' ? '출장마사지' : '마사지'} 업체 사진`;

  const localFallback = 'images/강남_강남역_강남클라스.jpg';
  const gallery = images.length
    ? images.map((src, i) => ({
        src,
        alt: alts[i] || (i === 0 ? fallbackAlt : `${fallbackAlt} ${i + 1}`),
      }))
    : [{ src: localFallback, alt: fallbackAlt }];

  let index = 0;
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');
  const counter = document.getElementById('galleryCounter');
  const thumbs = document.getElementById('shopImageThumbs');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxList = document.getElementById('galleryLightboxList');
  const lightboxTitle = document.getElementById('galleryLightboxTitle');

  // 썸네일 그리드는 사용하지 않음
  if (thumbs) {
    thumbs.hidden = true;
    thumbs.style.display = 'none';
    thumbs.innerHTML = '';
    thumbs.setAttribute('aria-hidden', 'true');
  }

  const show = (i) => {
    index = ((i % gallery.length) + gallery.length) % gallery.length;
    const item = gallery[index];
    mainImg.src = item.src;
    mainImg.alt = item.alt;
    mainImg.loading = index === 0 ? 'eager' : 'lazy';
    mainImg.decoding = 'async';
    mainImg.width = 860;
    mainImg.height = 480;
    if (counter) {
      if (gallery.length > 1) {
        counter.hidden = false;
        counter.textContent = `${index + 1} / ${gallery.length}`;
      } else {
        counter.hidden = true;
      }
    }
  };

  const multi = gallery.length > 1;
  if (prevBtn) {
    prevBtn.hidden = !multi;
    prevBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(index - 1);
    };
  }
  if (nextBtn) {
    nextBtn.hidden = !multi;
    nextBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(index + 1);
    };
  }

  let lightboxHistoryPushed = false;

  const syncLightboxViewport = () => {
    if (!lightbox || lightbox.hidden) return;
    const vv = window.visualViewport;
    if (!vv) return;
    // 모바일 주소창/하단바가 올라와도 보이는 영역에만 맞춤
    lightbox.style.top = `${Math.round(vv.offsetTop)}px`;
    lightbox.style.left = `${Math.round(vv.offsetLeft)}px`;
    lightbox.style.width = `${Math.round(vv.width)}px`;
    lightbox.style.height = `${Math.round(vv.height)}px`;
    lightbox.style.right = 'auto';
    lightbox.style.bottom = 'auto';
  };

  const clearLightboxViewport = () => {
    if (!lightbox) return;
    lightbox.style.top = '';
    lightbox.style.left = '';
    lightbox.style.width = '';
    lightbox.style.height = '';
    lightbox.style.right = '';
    lightbox.style.bottom = '';
  };

  const onLightboxViewportChange = () => {
    if (lightbox && !lightbox.hidden) syncLightboxViewport();
  };

  const bindLightboxViewport = () => {
    if (window.__galleryLightboxVvBound) return;
    window.__galleryLightboxVvBound = true;
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', onLightboxViewportChange);
      window.visualViewport.addEventListener('scroll', onLightboxViewportChange);
    }
    window.addEventListener('resize', onLightboxViewportChange);
  };

  const closeLightbox = (opts = {}) => {
    if (!lightbox) return;
    const wasOpen = !lightbox.hidden;
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-lightbox-open');
    clearLightboxViewport();
    if (!wasOpen) return;
    if (!opts.fromPopstate && lightboxHistoryPushed) {
      lightboxHistoryPushed = false;
      history.back();
    } else {
      lightboxHistoryPushed = false;
    }
  };

  const openLightbox = () => {
    if (!lightbox || !lightboxList) return;
    if (lightboxTitle) {
      lightboxTitle.textContent = `${gallery.length}장`;
    }
    // 항상 전체 사진을 위에서부터 렌더 (현재 인덱스만 보이며 잘리는 문제 방지)
    lightboxList.innerHTML = gallery
      .map(
        (item, i) => `
      <figure class="gallery-lightbox-item" id="galleryLbItem${i}">
        <img src="${item.src}" alt="${item.alt.replace(/"/g, '&quot;')}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async" />
      </figure>`
      )
      .join('');
    const alreadyOpen = !lightbox.hidden;
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('gallery-lightbox-open');
    bindLightboxViewport();
    syncLightboxViewport();
    if (!alreadyOpen && !lightboxHistoryPushed) {
      history.pushState({ galleryLightbox: true }, '', location.href);
      lightboxHistoryPushed = true;
    }
    // 맨 위부터 전체 스크롤 가능하도록
    requestAnimationFrame(() => {
      syncLightboxViewport();
      lightboxList.scrollTop = 0;
    });
  };

  window.__closeGalleryLightbox = (opts) => closeLightbox(opts || {});
  window.__isGalleryLightboxOpen = () =>
    !!(lightbox && !lightbox.hidden);

  mainImg.style.cursor = 'zoom-in';
  mainImg.onclick = (e) => {
    e.preventDefault();
    openLightbox();
  };

  // 메인 영역 클릭(이미지)만 팝업, 화살표는 stopPropagation
  const mainWrap = document.getElementById('detailGalleryMain');
  if (mainWrap && !mainWrap.dataset.lightboxBound) {
    mainWrap.dataset.lightboxBound = '1';
    mainWrap.addEventListener('click', (e) => {
      if (e.target.closest('.detail-gallery-nav')) return;
      if (e.target === mainImg || e.target.closest('#shopImage')) {
        openLightbox();
      }
    });
  }

  if (lightbox && !lightbox.dataset.bound) {
    lightbox.dataset.bound = '1';
    lightbox.addEventListener('click', (e) => {
      if (e.target.closest('[data-lightbox-close]')) {
        if (typeof window.__closeGalleryLightbox === 'function') {
          window.__closeGalleryLightbox();
        }
      }
    });
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        typeof window.__isGalleryLightboxOpen === 'function' &&
        window.__isGalleryLightboxOpen()
      ) {
        window.__closeGalleryLightbox();
      }
    });
  }

  if (!window.__galleryLightboxPopBound) {
    window.__galleryLightboxPopBound = true;
    window.addEventListener('popstate', () => {
      if (
        typeof window.__isGalleryLightboxOpen === 'function' &&
        window.__isGalleryLightboxOpen()
      ) {
        window.__closeGalleryLightbox({ fromPopstate: true });
      }
    });
  }

  // 스와이프(간단)
  let touchX = null;
  mainImg.ontouchstart = (e) => {
    touchX = e.changedTouches[0]?.clientX ?? null;
  };
  mainImg.ontouchend = (e) => {
    if (touchX == null || gallery.length < 2) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX) - touchX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) show(index + 1);
    else show(index - 1);
    touchX = null;
  };

  show(0);
}

// 상세 소개문 정리 (업체명/전화/위치 줄 제거, 소개 문장만 유지)
function getShopIntroText(shop) {
  let text = String(shop.description || '').trim();
  if (!text) {
    text = String(shop.detailContent || '').split('【')[0].trim();
  }
  if (!text) return '';

  text = text.split('【')[0].trim();
  text = text.split(/\n?\s*안내사항\s*\n?/)[0].trim();
  text = text.split(/\n?\s*건마시티 URL/)[0].trim();

  const shopName = String(shop.name || '').trim();
  const shopNameCompact = shopName.replace(/\s+/g, '');
  const phoneCompact = String(shop.phone || '').replace(/\D/g, '');
  const address = String(shop.address || '').trim();
  const isOutcall =
    shop.type === '출장마사지' || shop.type === 'outcall';

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
    // 00507... 처럼 앞에 0이 더 붙은 번호 정규화
    const normalized = digits.replace(/^0+(?=0?5\d{8,})/, '0').replace(/^00/, '0');
    const check = normalized.length <= 12 ? normalized : digits.slice(-11);
    if (check.length < 9 || check.length > 12) return false;
    if (phoneCompact) {
      const a = check.replace(/^0+/, '');
      const b = phoneCompact.replace(/^0+/, '');
      if (check === phoneCompact || a === b || check.endsWith(b) || digits.endsWith(b)) {
        return true;
      }
    }
    return /^0?\d{8,11}$/.test(check);
  };

  const isLocationLine = (line) => {
    const t = line.trim();
    if (!t) return false;
    // 문장형 소개는 유지
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
    if (/로드샵|골목|인근\.\.|부근\.\./.test(t) && t.length <= 40 && !isSentence(t)) {
      return true;
    }
    // 상세주소 문의 / 주차 가능 등 위치·주차 안내 줄
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
    if (/(도보|출구)\s*\d*\s*분?|거리$/.test(t) && t.length <= 40) {
      return true;
    }
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

  const lines = text.split(/\n/);
  const kept = [];
  for (const raw of lines) {
    const line = String(raw || '').trim();
    if (!line) {
      if (kept.length && kept[kept.length - 1] !== '') kept.push('');
      continue;
    }
    if (isPhoneLine(line) || isNameLine(line) || isLocationLine(line)) {
      continue;
    }
    if (/건마시티\s*회원/.test(line)) continue;
    // SEO 키워드 나열 줄 제거
    if ((line.match(/,/g) || []).length >= 3 && /마사지|홈타이|출장|건마/.test(line)) {
      continue;
    }
    kept.push(line);
  }

  while (kept.length && kept[0] === '') kept.shift();
  while (kept.length && kept[kept.length - 1] === '') kept.pop();

  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// 오시는 길 추출 (detailContent에서 영업시간 제외)
function getShopDirectionsText(shop) {
  if (shop.directions && String(shop.directions).trim()) {
    return String(shop.directions).trim();
  }
  const raw = shop.detailContent || '';
  if (!raw) return '';

  const wayMatch = raw.match(
    /【\s*오시는\s*길\s*】\s*([\s\S]*?)(?=【\s*영업시간\s*】|$)/
  );
  if (wayMatch && wayMatch[1]) {
    return wayMatch[1].trim();
  }
  return '';
}

function getDirectionLineMeta(line) {
  const t = String(line || '');
  if (/출구|도보|역|지하철|버스/.test(t)) {
    return { icon: '🚇', kind: 'transit' };
  }
  if (/주차|주차권|주차가능/.test(t)) {
    return { icon: '🅿️', kind: 'parking' };
  }
  if (/문의|상세\s*주소|전화/.test(t)) {
    return { icon: '💬', kind: 'note' };
  }
  if (/시|구|동|로|길|번지|대로/.test(t)) {
    return { icon: '🏠', kind: 'address' };
  }
  return { icon: '•', kind: 'default' };
}

// 오시는 길 / 위치 표시
function displayShopDirections(shop) {
  const section = document.getElementById('sectionLocation');
  const el = document.getElementById('shopDirections');
  if (!section || !el) return;

  const text = getShopDirectionsText(shop);
  const lines = String(text || '')
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const address = String(shop.address || shop.detailAddress || '').trim();
  const displayLines = lines.length
    ? lines
    : address
      ? [address]
      : [];

  if (!displayLines.length) {
    section.style.display = 'none';
    el.innerHTML = '';
    return;
  }

  el.innerHTML = displayLines
    .map((line) => {
      const meta = getDirectionLineMeta(line);
      return `<li class="directions-item directions-item--${meta.kind}">
        <span class="directions-item-icon" aria-hidden="true">${meta.icon}</span>
        <span class="directions-item-text">${line}</span>
      </li>`;
    })
    .join('');

  section.style.display = '';
}

function setupDetailTabs() {
  const tabsRoot = document.querySelector('[data-detail-tabs]');
  if (!tabsRoot) return;

  const buttons = Array.from(tabsRoot.querySelectorAll('.detail-tab'));
  const header = document.querySelector('.detail-header');
  let scrollingByClick = false;
  let scrollLockTimer = null;

  const tabsHeight = () => tabsRoot.getBoundingClientRect().height || 52;
  const headerHeight = () => (header ? header.getBoundingClientRect().height : 48);
  const stickyOffset = () => headerHeight() + tabsHeight() + 12;

  const visibleSections = () =>
    buttons
      .map((btn) => {
        const id = btn.dataset.tabTarget;
        const el = id ? document.getElementById(id) : null;
        if (!el) return null;
        const hidden =
          el.style.display === 'none' ||
          window.getComputedStyle(el).display === 'none';
        btn.hidden = hidden;
        return hidden ? null : { id, el, btn };
      })
      .filter(Boolean);

  const setActive = (id) => {
    buttons.forEach((btn) => {
      btn.classList.toggle('is-active', !btn.hidden && btn.dataset.tabTarget === id);
    });
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target || window.getComputedStyle(target).display === 'none') return;
    scrollingByClick = true;
    setActive(id);
    const top =
      window.scrollY +
      target.getBoundingClientRect().top -
      stickyOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    clearTimeout(scrollLockTimer);
    scrollLockTimer = setTimeout(() => {
      scrollingByClick = false;
    }, 700);
  };

  if (tabsRoot.dataset.bound !== '1') {
    tabsRoot.dataset.bound = '1';
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tabTarget;
        if (!id || btn.hidden) return;
        scrollToSection(id);
      });
    });
  }

  const syncActiveFromScroll = () => {
    if (scrollingByClick) return;
    const sections = visibleSections();
    if (!sections.length) return;

    const offset = stickyOffset();
    let current = sections[0].id;

    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].el.getBoundingClientRect().top;
      if (top - offset <= 1) {
        current = sections[i].id;
      }
    }

    setActive(current);
  };

  visibleSections();
  syncActiveFromScroll();

  if (tabsRoot.dataset.scrollBound !== '1') {
    tabsRoot.dataset.scrollBound = '1';
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          syncActiveFromScroll();
          ticking = false;
        });
      },
      { passive: true }
    );
    window.addEventListener('resize', syncActiveFromScroll);
  }
}

// 주소 표시용 정리 (출구/도보/역 부근 등 부가안내 제거)
function cleanDisplayAddress(address, shop) {
  let text = String(address || '').trim();
  if (!text) return '';

  // 출장 서비스권역 문구는 그대로
  if (
    shop &&
    (shop.type === '출장마사지' || shop.type === 'outcall') &&
    /(전\s*지역|전지역|,|\.|·)/.test(text) &&
    !/\d{1,4}-\d{1,4}/.test(text)
  ) {
    return text;
  }

  text = text
    // 장지역 1번 출구 / 성신여대역 7번출구 도보4분
    .replace(/\s+[가-힣A-Za-z0-9]+역\s*\d*\s*번?\s*출구(?:\s*도보\s*\d+\s*분)?.*$/u, '')
    // 강남구청역 부근 / 압구정역 인근
    .replace(/\s+[가-힣A-Za-z0-9]+역\s*(부근|인근|근처).*$/u, '')
    // 끝에 남은 역명만 (강남역)
    .replace(/\s+[가-힣A-Za-z0-9]+역\s*$/u, '')
    // 도보 N분
    .replace(/\s*도보\s*\d+\s*분.*$/u, '')
    // (주차권 ...) (출구 ...)
    .replace(/\s*\([^)]*(출구|도보|주차|문의|부근|인근)[^)]*\)\s*$/u, '')
    // 상세주소 문의 등
    .replace(/\s*(상세\s*주소\s*문의|주소\s*문의|위치\s*문의).*$/u, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return text || String(address || '').trim();
}
window.cleanDisplayAddress = cleanDisplayAddress;

function getShopDetailAddressLine(shop) {
  const address = cleanDisplayAddress(shop.address, shop);
  const fromField = String(shop.detailAddress || '').trim();
  const compact = (s) => String(s || '').replace(/\s+/g, '');
  const isBoiler = (line) =>
    /^[★☆*]/.test(line) ||
    /부재시|예약제|입실\s*후\s*선불|예약자동취소|100%\s*예약제/.test(line);
  const isSameAddress = (line) => {
    const a = compact(address);
    const b = compact(cleanDisplayAddress(line, shop) || line);
    if (!a || !b) return false;
    return a === b || a.includes(b) || b.includes(a);
  };

  const text = typeof getShopDirectionsText === 'function' ? getShopDirectionsText(shop) : '';
  const lines = String(text || '')
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (isBoiler(line) || isSameAddress(line)) continue;
    if (/상세\s*주소\s*문의|주소\s*문의/.test(line)) continue;
    return line;
  }

  if (fromField && !isSameAddress(fromField)) return fromField;
  return '';
}

// 주소 섹션 설정 (다른 info-item들과 동일한 형태)
function setupAddressSection(addressElement, shop) {
  if (!addressElement) return;

  const address = cleanDisplayAddress(shop.address, shop);
  const detail = getShopDetailAddressLine(shop);
  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  let html = `<img class="info-icon" src="images/icons/map.svg" alt="지도" width="20" height="20" />
    <div class="info-item-text">
      <div class="address-container"><span>${esc(address || '주소 정보 없음')}</span></div>`;
  if (detail) {
    html += `<div class="address-container"><span>${esc(detail)}</span></div>`;
  }
  html += `</div>`;
  addressElement.innerHTML = html;
}

// 주소에서 동 이름 추출
function extractDongFromAddress(address) {
  if (!address) return '';

  // 동 패턴 매칭 (예: 서귀동, 중문동, 한림동 등)
  // 구/군 이름에 포함된 '동'은 제외 (동작구 등)
  const dongPatterns = [
    /([가-힣]+[0-9]*동)(?!\s*[구군])/,
    /([가-힣]+리)/,
    /([가-힣]+[0-9]*가)/,
  ];

  for (const pattern of dongPatterns) {
    const match = String(address).match(pattern);
    if (match) {
      const name = match[1];
      if (/[구군시]$/.test(name)) continue;
      return name;
    }
  }

  return '';
}

// 상세 상단용: "서초구 서초동"
function formatShopAreaLabel(shop) {
  if (!shop) return '';
  const address = String(shop.address || shop.detailAddress || '');
  let district = String(shop.district || '').trim();
  let dong = String(shop.dong || '').trim();

  if (!district) {
    const gu = address.match(/([가-힣]+구)/);
    const gun = address.match(/([가-힣]+군)/);
    const si = address.match(/([가-힣]+시)(?!도)/);
    district = (gu && gu[1]) || (gun && gun[1]) || (si && si[1]) || '';
  }

  if (!dong) {
    dong = extractDongFromAddress(address);
  }

  if (dong && district && district.includes(dong)) {
    return district;
  }
  if (district && dong) return `${district} ${dong}`;
  return district || dong || '';
}

// 주소에서 지역 정보 추출 (구/시 + 동)
function extractLocationInfo(address) {
  if (!address) return '';

  // 구/시 패턴 매칭
  const guPattern = /([가-힣]+구)/;
  const siPattern = /([가-힣]+시)/;

  let location = '';

  // 구가 있는 경우
  const guMatch = address.match(guPattern);
  if (guMatch) {
    location = guMatch[1];
  }

  // 시가 있는 경우 (구가 없는 경우)
  const siMatch = address.match(siPattern);
  if (!location && siMatch) {
    location = siMatch[1];
  }

  // 동 정보 추가
  const dongName = extractDongFromAddress(address);
  if (dongName) {
    location = location ? `${location} ${dongName}` : dongName;
  }

  return location;
}

// 지도보기 함수 - 지도 선택 모달 열기
function openMap() {
  // 주소 가져오기
  const addressContainer = document.querySelector('.address-container span');
  let destinationAddress = '';

  if (addressContainer) {
    destinationAddress = addressContainer.textContent.trim();
  } else {
    // fallback: shop 데이터에서 주소 가져오기
    const shopId = getShopIdFromUrl();
    const shop = massageShops.find((s) => s.id == shopId);
    if (shop) {
      destinationAddress = cleanDisplayAddress(shop.address, shop);
      if (shop.detailAddress) {
        destinationAddress += ` ${shop.detailAddress}`;
      }
    }
  }

  if (!destinationAddress) {
    alert('주소 정보를 찾을 수 없습니다.');
    return;
  }

  // 지도 선택 모달 열기
  openMapSelectModal(destinationAddress);
}

// 지도 선택 모달 열기
function openMapSelectModal(address) {
  // 기존 모달이 있으면 제거
  const existingModal = document.getElementById('mapSelectModal');
  if (existingModal) {
    existingModal.remove();
  }

  // 모달 생성
  const modal = document.createElement('div');
  modal.id = 'mapSelectModal';
  modal.className = 'modal active';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 400px;">
      <div class="modal-header">
        <h2>지도 선택</h2>
        <button class="modal-close" onclick="closeMapSelectModal()">&times;</button>
      </div>
      <div class="modal-body">
        <p style="margin-bottom: 20px; color: #666; font-size: 0.9rem;">원하는 지도 앱을 선택하세요</p>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <button class="map-select-btn" onclick="openNaverMap('${address.replace(
            /'/g,
            "\\'"
          )}')" style="background: #03C75A; color: white;">
            <i class="fas fa-map-marked-alt"></i> 네이버지도
          </button>
          <button class="map-select-btn" onclick="openKakaoMap('${address.replace(
            /'/g,
            "\\'"
          )}')" style="background: #FEE500; color: #000;">
            <i class="fas fa-map-marked-alt"></i> 카카오지도
          </button>
          <button class="map-select-btn" onclick="openTmap('${address.replace(
            /'/g,
            "\\'"
          )}')" style="background: #FF6B6B; color: white;">
            <i class="fas fa-map-marked-alt"></i> 티맵
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  // 배경 클릭 시 닫기
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeMapSelectModal();
    }
  });
}

// 지도 선택 모달 닫기
function closeMapSelectModal() {
  const modal = document.getElementById('mapSelectModal');
  if (modal) {
    modal.remove();
    document.body.style.overflow = '';
  }
}

// 네이버지도 열기
function openNaverMap(address) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
  window.open(mapUrl, '_blank');
  closeMapSelectModal();
}

// 카카오지도 열기
function openKakaoMap(address) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://map.kakao.com/link/search/${encodedAddress}`;
  window.open(mapUrl, '_blank');
  closeMapSelectModal();
}

// 티맵 열기
function openTmap(address) {
  const encodedAddress = encodeURIComponent(address);
  // 티맵 앱 스킴 시도
  const tmapAppUrl = `tmap://search?name=${encodedAddress}`;
  const tmapWebUrl = `https://tmapapi.sktelecom.com/main/map.html?search=${encodedAddress}`;

  // 앱이 설치되어 있으면 앱으로, 없으면 웹으로
  const link = document.createElement('a');
  link.href = tmapAppUrl;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 1초 후 웹으로 fallback
  setTimeout(() => {
    window.open(tmapWebUrl, '_blank');
  }, 1000);

  closeMapSelectModal();
}

// 카카오맵 URL 방식 (API 키 없이 사용)
function openKakaoMapWithURL(destinationAddress) {
  // 중복 실행 방지
  if (window.mapLoading) {
    console.log('지도 로딩 중입니다.');
    return;
  }

  try {
    window.mapLoading = true;

    // 간단한 카카오맵 검색 URL 생성
    const mapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(
      destinationAddress
    )}`;

    console.log('카카오맵 URL:', mapUrl);

    // 새 창에서 카카오맵 열기
    window.open(mapUrl, '_blank');

    // 로딩 상태 해제 (즉시)
    window.mapLoading = false;
  } catch (error) {
    console.error('지도 열기 오류:', error);
    window.mapLoading = false;
    alert('지도를 열 수 없습니다. 주소를 확인해주세요.');
  }
}

// 관리사 정보 표시
function displayStaffInfo(shop) {
  const staffInfo = document.getElementById('staffInfo');
  if (!staffInfo) return;

  const raw = String(shop.staffInfo || '').trim();
  const names = parseStaffNames(raw);
  const isHealing = shop.showHealingShop === true;
  const countryLabel = getStaffCountryLabel(shop.country);

  let html = `<div class="staff-card">
    <div class="staff-card-header">
      <span class="staff-card-icon" aria-hidden="true">👩‍⚕️</span>
      <h3 class="staff-card-title">관리사 정보</h3>
    </div>`;

  if (names.length > 0) {
    if (countryLabel) {
      html += `<p class="staff-summary">${countryLabel}</p>`;
    }
    if (isHealing) {
      html += `<p class="staff-badge">힐링샵</p>`;
    }
    html += `<div class="staff-chip-list">`;
    names.forEach((item) => {
      html += `<div class="staff-chip">
        <span class="staff-chip-name">${item.name}</span>
        ${item.age ? `<span class="staff-chip-age">${item.age}</span>` : ''}
      </div>`;
    });
    html += `</div>`;
  } else if (raw && !raw.includes('전문 관리사')) {
    html += `<p class="staff-default">${raw}</p>`;
  } else {
    html += `<p class="staff-default">전문 관리사가 정성스럽게 케어합니다.</p>`;
  }

  html += `</div>`;
  staffInfo.innerHTML = html;
}

function getStaffCountryLabel(country) {
  const keys = String(country || '')
    .toLowerCase()
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const labels = [];
  if (keys.some((k) => k.includes('korea') || k.includes('한국'))) {
    labels.push('한국');
  }
  if (keys.some((k) => k.includes('japan') || k.includes('일본'))) {
    labels.push('일본');
  }
  if (
    keys.some(
      (k) => k.includes('thailand') || k.includes('thai') || k.includes('태국')
    )
  ) {
    labels.push('태국');
  }
  if (keys.some((k) => k.includes('china') || k.includes('중국'))) {
    labels.push('중국');
  }
  if (keys.some((k) => k.includes('russia') || k.includes('러시아'))) {
    labels.push('러시아');
  }
  if (!labels.length) return '';
  if (labels.length === 1 && labels[0] === '한국') {
    return '한국인 관리사';
  }
  return `${labels.join(' · ')} 관리사`;
}

function parseStaffNames(staffText) {
  const text = String(staffText || '').trim();
  if (!text || text.includes('전문 관리사')) return [];

  const results = [];
  const seen = new Set();
  const skip = new Set([
    '전원',
    '한국인',
    '힐링샵',
    '상기종목',
    '테라피',
    '과정수료',
    '여쌤들',
    '관리사',
    '관리사님',
    '힐러님',
    '수료',
    '코스수료',
    '여',
    '쌤들',
    '쌤',
    '전문',
  ]);

  // 이름(나이)
  const agePattern = /([가-힣A-Za-z]{2,8})\((\d{2})\)/g;
  let match;
  while ((match = agePattern.exec(text)) !== null) {
    const name = match[1];
    if (skip.has(name) || seen.has(name)) continue;
    seen.add(name);
    results.push({ name, age: match[2] });
  }
  if (results.length) return results;

  // 공백 구분 이름
  text.split(/\s+/).forEach((token) => {
    const name = token.replace(/[♥❤★☆·]/g, '').trim();
    if (!name || skip.has(name)) return;
    if (!/^[가-힣A-Za-z]{2,8}$/.test(name)) return;
    if (seen.has(name)) return;
    seen.add(name);
    results.push({ name, age: '' });
  });

  return results;
}


// 서비스 목록 표시 (최적화됨)
function displayShopServices(shop) {
  const servicesList = document.getElementById('servicesList');

  const services =
    shop.services && shop.services.length > 0
      ? shop.services
      : getDefaultServices(shop.type);

  // innerHTML 사용으로 빠른 렌더링 (성능 최적화)
  if (servicesList) {
    const html = services
      .map((service) => `<div class="service-item">${service}</div>`)
      .join('');
    servicesList.innerHTML = html;
  }
}

// 코스 가격 파싱/표시
function parseCoursePriceWon(priceStr) {
  const s = String(priceStr || '').replace(/\s/g, '');
  if (!s || s === '-') return null;
  const man = s.match(/(\d+(?:\.\d+)?)\s*만/);
  if (man) return Math.round(parseFloat(man[1]) * 10000);
  const digits = s.replace(/[^\d]/g, '');
  if (!digits) return null;
  return parseInt(digits, 10);
}

function formatCoursePriceWon(amount) {
  if (amount == null || Number.isNaN(amount)) return '-';
  return `${Number(amount).toLocaleString('ko-KR')}원`;
}

function applyCoursePriceMode(mode) {
  const wrap = document.getElementById('coursesList');
  if (!wrap) return;
  const isOriginal = mode === 'original';
  wrap.querySelectorAll('.course-col-price[data-member-price]').forEach((el) => {
    const member = parseInt(el.dataset.memberPrice, 10);
    if (Number.isNaN(member)) return;
    const amount = isOriginal ? member + 10000 : member;
    el.textContent = formatCoursePriceWon(amount);
    el.classList.toggle('is-original', isOriginal);
  });
  document.querySelectorAll('.price-mode-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.priceMode === mode);
  });
}

function setupCoursePriceToggle() {
  const buttons = document.querySelectorAll('.price-mode-btn');
  if (!buttons.length) return;
  buttons.forEach((btn) => {
    if (btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      applyCoursePriceMode(btn.dataset.priceMode || 'member');
    });
  });
}

// 코스 정보 표시 - 같은 코스는 한 표에 붙여서 표시
function displayShopCourses(shop) {
  const coursesList = document.getElementById('coursesList');
  if (!coursesList) return;

  const courses = shop.courses || getCoursesByType(shop.type) || [];
  if (!courses.length) {
    coursesList.innerHTML =
      '<p class="courses-empty">등록된 코스 정보가 없습니다.</p>';
    return;
  }

  const isDescCategory = (title) => {
    const t = String(title || '').trim();
    if (!t) return true;
    if (/[└┘┌┐｜|]/.test(t)) return true;
    if (/^[\(\[【「『]/.test(t) && /[\)\]】」』]$/.test(t)) return true;
    return false;
  };

  let html = '<div class="course-table">';
  let hasRows = false;
  let shownCategory = '';

  courses.forEach((category) => {
    const title = (category.category || category.name || '').trim();
    const courseItems = category.items || category.courses || [];
    if (!courseItems.length) return;

    const descOnly = isDescCategory(title);

    // 일반 카테고리 제목(스크럽 코스 등)은 구분 라벨로, 이전과 다를 때만
    if (title && !descOnly && title !== shownCategory) {
      html += `<div class="course-section-label">${title}</div>`;
      const catDesc = String(category.note || category.description || '').trim();
      if (catDesc) {
        html += `<div class="course-category-desc">${escapeCourseHtml(catDesc)}</div>`;
      }
      shownCategory = title;
    }

    courseItems.forEach((course) => {
      hasRows = true;
      const name = course.name || '-';
      const duration = course.duration || '-';
      const rawPrice = course.price || '-';
      const memberWon = parseCoursePriceWon(rawPrice);
      const priceText =
        memberWon != null ? formatCoursePriceWon(memberWon) : rawPrice;
      const priceAttr =
        memberWon != null ? ` data-member-price="${memberWon}"` : '';
      const itemNote = String(course.note || '').trim();
      const hasDesc = !!itemNote;
      html += `<div class="course-item-block${hasDesc ? ' has-desc' : ''}">`;
      html += `<div class="course-table-row">
        <span class="course-col-name">${name}</span>
        <span class="course-col-time">${duration}</span>
        <span class="course-col-price"${priceAttr}>${priceText}</span>
      </div>`;
      if (hasDesc) {
        html += `<div class="course-row-desc">${escapeCourseHtml(itemNote)}</div>`;
      }
      html += `</div>`;
    });

    // └ 베이직 코스 ┘ 같은 카테고리형 설명은 기존과 같이 유지
    if (descOnly && title) {
      html += `<div class="course-item-block has-desc"><div class="course-row-desc">${escapeCourseHtml(title)}</div></div>`;
    }
  });

  html += '</div>';
  coursesList.innerHTML = hasRows
    ? html
    : '<p class="courses-empty">등록된 코스 정보가 없습니다.</p>';

  setupCoursePriceToggle();
  applyCoursePriceMode('member');
}

function escapeCourseHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

// 타입별 코스 정보 반환
function getCoursesByType(type) {
  const courseMap = {
    thai: [
      {
        name: '태국 전통 마사지',
        courses: [
          {
            name: 'A 코스',
            price: '60,000원',
            duration: '60분',
            description:
              '태국 전통 마사지 60분 - 몸의 긴장을 완전히 풀어드립니다',
          },
          {
            name: 'B 코스',
            price: '80,000원',
            duration: '90분',
            description:
              '태국 전통 마사지 90분 - 더 깊은 힐링과 휴식을 제공합니다',
          },
        ],
      },
    ],
    outcall: [
      {
        name: '출장마사지',
        courses: [
          {
            name: 'A 코스',
            price: '100,000원',
            duration: '60분',
            description: '출장마사지 60분 - 집에서 편안하게 받는 마사지',
          },
          {
            name: 'B 코스',
            price: '150,000원',
            duration: '90분',
            description: '출장마사지 90분 - 더 긴 시간의 완전한 힐링',
          },
          {
            name: 'C 코스',
            price: '200,000원',
            duration: '120분',
            description: '출장마사지 120분 - 프리미엄 홈케어 서비스',
          },
        ],
      },
    ],
    waxing: [
      {
        name: '왁싱 서비스',
        courses: [
          {
            name: 'A 코스',
            price: '50,000원',
            duration: '30분',
            description: '기본 왁싱 30분 - 깔끔한 제모 서비스',
          },
          {
            name: 'B 코스',
            price: '80,000원',
            duration: '60분',
            description: '전신 왁싱 60분 - 완전한 제모 케어',
          },
          {
            name: 'C 코스',
            price: '120,000원',
            duration: '90분',
            description: '프리미엄 왁싱 90분 - 왁싱 + 스킨케어',
          },
        ],
      },
    ],
    korean: [
      {
        name: '한국 전통 찜질방',
        courses: [
          {
            name: 'A 코스',
            price: '45,000원',
            duration: '60분',
            description: '찜질방 + 한국 전통 마사지 60분 - 전통적인 힐링 경험',
          },
          {
            name: 'B 코스',
            price: '65,000원',
            duration: '90분',
            description: '찜질방 + 한국 전통 마사지 90분 - 완전한 휴식과 힐링',
          },
        ],
      },
    ],
    foot: [
      {
        name: '발마사지 전문',
        courses: [
          {
            name: 'A 코스',
            price: '35,000원',
            duration: '60분',
            description: '발마사지 60분 - 발의 피로를 완전히 풀어드립니다',
          },
          {
            name: 'B 코스',
            price: '50,000원',
            duration: '90분',
            description: '발마사지 + 족욕 90분 - 발과 다리 전체의 힐링',
          },
        ],
      },
    ],
    spa: [
      {
        name: '스웨디시 마사지',
        courses: [
          {
            name: 'A 코스',
            price: '80,000원',
            duration: '60분',
            description:
              '스웨디시 30분 + 힐링 30분 - 근육의 긴장을 완화하고 마음을 편안하게',
          },
          {
            name: 'B 코스',
            price: '100,000원',
            duration: '90분',
            description:
              '스웨디시 60분 + 힐링 30분 - 더 깊은 근육 이완과 완전한 휴식',
          },
        ],
      },
      {
        name: '아로마 마사지',
        courses: [
          {
            name: 'A 코스',
            price: '80,000원',
            duration: '60분',
            description:
              '힐링 10분 + 아로마 50분 - 천연 에센셜 오일로 깊은 힐링',
          },
          {
            name: 'B 코스',
            price: '100,000원',
            duration: '90분',
            description: '힐링 20분 + 아로마 70분 - 프리미엄 아로마 테라피',
          },
          {
            name: 'C 코스',
            price: '150,000원',
            duration: '120분',
            description:
              '힐링 30분 + 아로마 90분 - 최고급 아로마 마사지 패키지',
          },
        ],
      },
    ],
  };

  return (
    courseMap[type] || [
      {
        name: '기본 마사지',
        courses: [
          {
            name: 'A 코스',
            price: '50,000원',
            duration: '60분',
            description: '기본 마사지 60분 - 몸과 마음의 휴식을 제공합니다',
          },
        ],
      },
    ]
  );
}

// 타입별 기본 서비스 목록
function getDefaultServices(type) {
  const serviceMap = {
    thai: ['태국 전통 마사지', '오일 마사지', '발마사지', '경락 마사지'],
    korean: ['한국 전통 마사지', '찜질방', '족욕', '경락 마사지'],
    foot: ['발마사지', '족욕', '경락 마사지', '지압 마사지'],
    spa: ['아로마테라피', '바디 마사지', '스톤 마사지', '바디 스크럽'],
  };
  return serviceMap[type] || ['마사지', '힐링 서비스', '휴식 공간'];
}

// 리뷰 목록 표시
function displayShopReviews(shop) {
  const reviewsList = document.getElementById('reviewsList');

  // shop.reviews가 있으면 사용, 없으면 샘플 리뷰 생성
  const sampleReviews = shop.reviews || generateSampleReviews(shop);

  // innerHTML 사용으로 빠른 렌더링 (성능 최적화)
  let html = '';
  sampleReviews.forEach((review) => {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    html += `<div class="review-item">
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">${stars}</div>
            <div class="review-text">${review.comment}</div>
        </div>`;
  });

  if (reviewsList) {
    reviewsList.innerHTML = html;
  }
}

// 샘플 리뷰 생성
function generateSampleReviews(shop) {
  const reviewTemplates = [
    {
      name: '김○○',
      rating: 5,
      date: '2024.01.15',
      comment:
        '정말 만족스러운 서비스였습니다. 직원분들도 친절하시고 시설도 깔끔해요. 다음에도 꼭 이용하고 싶어요!',
    },
    {
      name: '이○○',
      rating: 4,
      date: '2024.01.10',
      comment:
        '가격 대비 좋은 서비스를 받았습니다. 마사지 기술도 훌륭하고 분위기도 좋았어요. 추천합니다.',
    },
    {
      name: '박○○',
      rating: 5,
      date: '2024.01.08',
      comment:
        '스트레스가 많이 풀렸어요. 전문적인 마사지로 몸이 한결 가벼워진 느낌입니다. 감사합니다.',
    },
    {
      name: '최○○',
      rating: 4,
      date: '2024.01.05',
      comment:
        '예약하기 쉽고 직원분들이 친절하세요. 시설도 깔끔하고 편안한 분위기였습니다.',
    },
    {
      name: '정○○',
      rating: 5,
      date: '2024.01.02',
      comment:
        '정말 힐링되는 시간이었어요. 마사지 기술이 뛰어나고 시설도 최고입니다. 강력 추천!',
    },
  ];

  // 업체 평점에 따라 리뷰 개수 조정
  const reviewCount = Math.min(Math.floor(shop.rating), 5);
  return reviewTemplates.slice(0, reviewCount);
}

// 뒤로 가기
function goBack() {
  if (
    typeof window.__isGalleryLightboxOpen === 'function' &&
    window.__isGalleryLightboxOpen()
  ) {
    window.__closeGalleryLightbox();
    return;
  }
  if (document.referrer && document.referrer.includes('index.html')) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

// 공유하기
function shareShop() {
  const shopName = document.getElementById('shopName').textContent;
  const shopAddress = document.getElementById('shopAddress').textContent;
  const shareText = `${shopName} - ${shopAddress}`;

  if (navigator.share) {
    navigator.share({
      title: shopName,
      text: shareText,
      url: window.location.href,
    });
  } else {
    // 클립보드에 복사
    navigator.clipboard
      .writeText(shareText + '\n' + window.location.href)
      .then(() => {
        alert('업체 정보가 클립보드에 복사되었습니다.');
      });
  }
}

// 지도 모달 열기 (API 키 없이 간단한 방식)
function openMapModal() {
  // 간단한 URL 방식으로 바로 열기
  openMap();
}

// 지도 모달 창 닫기 (사용하지 않음)
function closeMapModal() {
  // API 키 없이 URL 방식 사용으로 모달 불필요
  console.log('모달 기능은 사용하지 않습니다.');
}

// 전화 걸기
function callShop() {
  // info-value (shopPhone) 요소에서 전화번호 가져오기
  const phoneElement = document.getElementById('shopPhone');
  if (!phoneElement) {
    alert('전화번호를 찾을 수 없습니다.');
    console.error('shopPhone 요소를 찾을 수 없습니다.');
    return;
  }
  
  // a 태그 내부 텍스트 또는 직접 텍스트에서 전화번호 가져오기
  const phoneLink = phoneElement.querySelector('a');
  let phoneNumber = null;
  
  if (phoneLink) {
    phoneNumber = phoneLink.textContent || phoneLink.innerText;
  } else {
    phoneNumber = phoneElement.textContent || phoneElement.innerText;
  }
  
  // 전화번호가 없는 경우 처리
  if (!phoneNumber || phoneNumber.trim() === '') {
    alert('전화번호가 설정되지 않았습니다.');
    console.error('전화번호가 없습니다. phoneElement:', phoneElement);
    return;
  }
  
  // 전화번호 정리 (공백, 특수문자 제거)
  phoneNumber = phoneNumber.trim().replace(/\s+/g, '').replace(/[()]/g, '');
  
  if (!phoneNumber || phoneNumber === '') {
    alert('전화번호가 없습니다.');
    return;
  }
  
  if (confirm(`전화를 걸까요?\n${phoneNumber}`)) {
    // tel: 링크로 전화 걸기
    const telLink = `tel:${phoneNumber}`;
    window.location.href = telLink;
  }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function () {
  loadShopDetail();
});

// 이미지 로드 실패 시 기본 이미지로 대체
document.addEventListener('DOMContentLoaded', function () {
  const shopImage = document.getElementById('shopImage');
  if (shopImage) {
    shopImage.addEventListener('error', function () {
      if (this.dataset.fallbackApplied === '1') return;
      this.dataset.fallbackApplied = '1';
      this.src = 'images/강남_강남역_강남클라스.jpg';
    });
  }
});

// 회사소개 모달 열기
function openAboutModal(event) {
  event.preventDefault();
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }
}

// 이용약관 모달 열기
function openTermsModal(event) {
  event.preventDefault();
  const modal = document.getElementById('termsModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  }
}

// 모달 닫기
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // 스크롤 복원
  }
}

// SEO 메타태그 동적 업데이트
function updateSEOMetaTags(shop) {
  // 지역키워드 생성
  const regionKeyword = getRegionKeyword(shop.region);
  const districtKeyword = shop.district ? `${shop.district}마사지` : '';

  // 제목 업데이트
  const title = `${shop.name} - ${regionKeyword} 상세정보 | 마사지천국`;
  document.getElementById('pageTitle').textContent = title;
  document.title = title;

  // 메타 설명 업데이트
  const description = `${shop.name} ${regionKeyword} 상세정보. ${shop.price}부터, ${shop.operatingHours}. ${shop.address}. 전화예약 ${shop.phone}. 마사지천국에서 확인하세요.`;
  document
    .getElementById('pageDescription')
    .setAttribute('content', description);

  // 키워드 업데이트
  const keywords = `${regionKeyword}, ${districtKeyword}, ${shop.name}, 마사지상세, 마사지예약, 마사지가격, 마사지코스, 마사지리뷰, 마사지천국`;
  document.getElementById('pageKeywords').setAttribute('content', keywords);

  // Open Graph 메타태그 업데이트
  updateOpenGraphTags(shop, regionKeyword);
}

// 지역별 키워드 생성
function getRegionKeyword(region) {
  const regionMap = {
    서울: '서울마사지',
    부산: '부산마사지',
    대구: '대구마사지',
    인천: '인천마사지',
    광주: '광주마사지',
    대전: '대전마사지',
    울산: '울산마사지',
    세종: '세종마사지',
    경기: '경기마사지',
    강원: '강원마사지',
    충북: '충북마사지',
    충남: '충남마사지',
    전북: '전북마사지',
    전남: '전남마사지',
    경북: '경북마사지',
    경남: '경남마사지',
    제주: '제주도마사지',
  };
  return regionMap[region] || `${region}마사지`;
}

// 업체명에 지역키워드 자동 적용 함수
function generateShopNameWithRegion(originalName, region) {
  const regionKeyword = getRegionKeyword(region);

  // 이미 지역키워드가 포함되어 있는지 확인
  if (originalName.includes('마사지') || originalName.includes(region)) {
    return originalName;
  }

  // 지역키워드 + 원래 이름 형태로 생성
  return `${regionKeyword} ${originalName}`;
}

// Open Graph 메타태그 업데이트
function updateOpenGraphTags(shop, regionKeyword) {
  const title = `${shop.name} - ${regionKeyword} 상세정보 | 마사지천국`;
  const description = `${shop.name} ${regionKeyword} 상세정보. ${shop.price}부터, ${shop.operatingHours}. ${shop.address}. 전화예약 ${shop.phone}.`;
  const images = getShopImageList(shop);
  const imageAbs = toAbsoluteAssetUrl(images[0] || shop.image || '');

  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  };

  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('#ogTitle', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('#ogDescription', 'content', description);
  setMeta('meta[property="og:image"]', 'content', imageAbs);
  setMeta('#ogImage', 'content', imageAbs);
  setMeta('meta[name="twitter:image"]', 'content', imageAbs);
  setMeta('#twitterImage', 'content', imageAbs);

  updateShopJsonLd(shop, images, title, description);
}

function toAbsoluteAssetUrl(path) {
  const src = String(path || '').trim();
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  try {
    return new URL(src, window.location.href).href;
  } catch (e) {
    return src;
  }
}

function updateShopJsonLd(shop, images, title, description) {
  const el = document.getElementById('shopJsonLd');
  if (!el) return;
  const imgs = (images || []).map(toAbsoluteAssetUrl).filter(Boolean);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: shop.name,
    description,
    image: imgs.length === 1 ? imgs[0] : imgs,
    telephone: shop.phone || undefined,
    address: shop.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: shop.address,
          addressCountry: 'KR',
        }
      : undefined,
    url: window.location.href,
  };
  el.textContent = JSON.stringify(data);
}

// 주변 업체 표시 함수
function isOutcallShop(shop) {
  const t = String(shop?.type || '');
  return t === '출장마사지' || t === 'outcall' || t.includes('출장');
}

function shuffleArray(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function pickNearbyShops(currentShop, limit) {
  const all = window.shopCardData || [];
  const district = String(currentShop.district || '').trim();
  const wantOutcall = isOutcallShop(currentShop);
  const currentId = String(currentShop.id);

  const candidates = all.filter((shop) => {
    if (!shop || String(shop.id) === currentId) return false;
    if (isOutcallShop(shop) !== wantOutcall) return false;
    const d = String(shop.district || '').trim();
    if (district) return d === district;
    // 구 정보가 없으면 같은 지역으로
    return String(shop.region || '') === String(currentShop.region || '');
  });

  const healing = shuffleArray(
    candidates.filter((s) => s.showHealingShop === true)
  );
  const others = shuffleArray(
    candidates.filter((s) => s.showHealingShop !== true)
  );

  return healing.concat(others).slice(0, limit);
}

function buildNearbyShopCardHtml(shop) {
  const displayName =
    typeof createShopDisplayName === 'function'
      ? createShopDisplayName(shop)
      : shop.name || '';
  const locationInfo = formatShopAreaLabel(shop);
  const typeLabel =
    typeof getTypeName === 'function' ? getTypeName(shop) : '';
  const price = shop.priceLabel || shop.memberPrice || shop.price || '';
  const img = shop.image || 'images/강남_강남역_강남클라스.jpg';
  const alt = (shop.alt || displayName).replace(/"/g, '&quot;');
  const flags = renderDetailCountryFlagsHtml(shop.country);
  const typeBadge = typeLabel
    ? `<span class="nearby-mini-badge">${typeLabel}</span>`
    : '';
  const typeKind = isOutcallShop(shop) ? '출장마사지' : '마사지';

  return `<a class="nearby-mini-card" href="detail.html?id=${shop.id}" data-type="${typeKind}">
    <div class="nearby-mini-thumb">
      <img src="${img}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='images/강남_강남역_강남클라스.jpg'">
      ${typeBadge}
    </div>
    <div class="nearby-mini-body">
      <div class="nearby-mini-name">${displayName}</div>
      <div class="nearby-mini-meta">
        <span class="nearby-mini-district">${locationInfo}</span>
        <span class="nearby-mini-flags">${flags}</span>
      </div>
      <div class="nearby-mini-price">${price}</div>
    </div>
  </a>`;
}

function displayNearbyShops(currentShop) {
  const nearbyShopsDistrict = document.getElementById('nearbyShopsDistrict');
  const nearbyShopsTitle = document.getElementById('nearbyShopsTitle');
  const nearbyShopsTitleClickable = document.getElementById(
    'nearbyShopsTitleClickable'
  );
  const nearbyShopsList = document.getElementById('nearbyShopsList');

  if (!nearbyShopsDistrict || !nearbyShopsTitle || !nearbyShopsTitleClickable)
    return;

  const districtLabel = currentShop.district || currentShop.region || '';
  nearbyShopsDistrict.textContent = districtLabel;
  nearbyShopsTitle.textContent = '다른샵보기';

  if (nearbyShopsList) {
    const picked = pickNearbyShops(currentShop, 5);
    nearbyShopsList.innerHTML = picked.length
      ? picked.map(buildNearbyShopCardHtml).join('')
      : '<p class="nearby-shops-empty">같은 지역의 다른 업체가 없습니다.</p>';
  }

  // 제목 클릭: 같은 구분(출장/마사지)으로 지역 목록 이동
  if (isOutcallShop(currentShop)) {
    nearbyShopsTitleClickable.onclick = (e) => {
      e.preventDefault();
      if (typeof window.goToRegionPageWithTheme === 'function') {
        window.goToRegionPageWithTheme(
          currentShop.region,
          currentShop.district,
          'outcall'
        );
      } else {
        goToRegionPage(currentShop.region, currentShop.district);
      }
    };
  } else {
    nearbyShopsTitleClickable.onclick = (e) => {
      e.preventDefault();
      if (typeof window.goToRegionPageWithTheme === 'function') {
        window.goToRegionPageWithTheme(
          currentShop.region,
          currentShop.district,
          'massage'
        );
      } else {
        goToRegionPage(currentShop.region, currentShop.district);
      }
    };
  }
}

// 주변 업체 클릭 시 상세 페이지로 이동
function goToNearbyShop(shopId) {
  window.location.href = `detail.html?id=${shopId}`;
}

// 해당 지역+구로 이동
function goToRegionPage(region, district) {
  // 지역별 페이지 매핑
  const regionPages = {
    제주: 'jeju-massage.html',
    서울: 'seoul-massage.html',
    부산: 'busan-massage.html',
    대구: 'daegu-massage.html',
    인천: 'incheon-massage.html',
    광주: 'gwangju-massage.html',
    대전: 'daejeon-massage.html',
    울산: 'ulsan-massage.html',
    세종: 'sejong-massage.html',
    경기: 'gyeonggi-massage.html',
    강원: 'gangwon-massage.html',
    충북: 'chungbuk-massage.html',
    충남: 'chungnam-massage.html',
    전북: 'jeonbuk-massage.html',
    전남: 'jeonnam-massage.html',
    경북: 'gyeongbuk-massage.html',
    경남: 'gyeongnam-massage.html',
  };

  const pageUrl = regionPages[region];
  if (pageUrl) {
    // 지역 페이지로 이동하고 구 정보를 URL 파라미터로 전달
    window.location.href = `${pageUrl}?district=${encodeURIComponent(
      district
    )}`;
  } else {
    // 해당 지역 페이지가 없으면 메인 페이지로 이동
    window.location.href = 'index.html';
  }
}

// 모달 배경 클릭 시 닫기
window.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal')) {
    event.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});
