# 성능 최적화 가이드

## 적용된 최적화 사항

### 1. ✅ 렌더링 차단 요청 최소화
- **Font Awesome 비동기 로드**: `media="print"` + `onload` 사용
- **Google Fonts 비동기 로드**: `display=swap` + 비동기 로드
- **예상 절감 시간**: ~1,050ms

### 2. ✅ 레이아웃 변경 (CLS) 방지
- **main-content 초기 크기 고정**: `min-height: 200px` 설정
- **CSS Containment 적용**: `contain: layout style paint`
- **헤더 고정 크기**: `min-height: 60px` 설정
- **예상 CLS 점수 개선**: 1.000 → 0.1 이하

### 3. ✅ 강제 리플로우 최소화
- **읽기/쓰기 배치 분리**: `requestAnimationFrame` 이중 사용
- **DOM 조작 최적화**: 배치 읽기 후 배치 쓰기
- **예상 리플로우 시간 감소**: 78ms → 20ms 이하

### 4. ✅ 네트워크 최적화
- **preconnect 추가**: Google Fonts, Cloudflare CDN
- **리소스 우선순위**: preconnect → preload → 실제 로드

## 추가 최적화 방법

### CSS/JS 축소 (Minification)

#### 방법 1: 온라인 도구 사용
1. **CSS 축소**: https://www.minifier.org/
   - `style.css` 업로드 → 축소된 코드 복사
   - `style.min.css`로 저장
   - HTML에서 `style.css` → `style.min.css`로 변경

2. **JS 축소**: https://www.minifier.org/
   - `script.js`, `common-components.js` 축소
   - `.min.js` 확장자로 저장

#### 방법 2: Node.js 빌드 스크립트 (권장)

```bash
npm install -g clean-css-cli terser
```

```bash
# CSS 축소
cleancss -o style.min.css style.css

# JS 축소
terser script.js -o script.min.js -c -m
terser common-components.js -o common-components.min.js -c -m
```

#### 방법 3: Python 스크립트 (자동화)

```python
# minify_assets.py
import subprocess
import os

# CSS 축소
subprocess.run(['cleancss', '-o', 'public/style.min.css', 'public/style.css'])

# JS 축소
subprocess.run(['terser', 'public/script.js', '-o', 'public/script.min.js', '-c', '-m'])
subprocess.run(['terser', 'public/common-components.js', '-o', 'public/common-components.min.js', '-c', '-m'])
```

### 사용하지 않는 CSS 제거

Font Awesome에서 실제로 사용하는 아이콘만 추출:

1. **IcoMoon 사용** (https://icomoon.io/app/)
   - Font Awesome에서 필요한 아이콘만 선택
   - 커스텀 폰트 생성 (약 5-10KB)

2. **필요한 아이콘 목록**:
   - `fa-spa` (로고)
   - `fa-search` (검색)
   - `fa-bars` (햄버거 메뉴)
   - `fa-times` (닫기)
   - `fa-chevron-down` (드롭다운)
   - `fa-chevron-right` (화살표)
   - `fa-bullhorn` (공지사항)
   - `fa-gift` (이벤트)
   - `fa-sign-out-alt` (로그아웃)

### HTML 파일 일괄 업데이트

모든 HTML 파일에 동일한 최적화 적용:

```python
# update_html_performance.py
import os
import re

def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Font Awesome 비동기 로드 패턴
    old_fa = r'<link\s+href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.0\.0/css/all\.min\.css"\s+rel="stylesheet"\s*/>'
    new_fa = '''<link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
      />
    </noscript>'''
    
    # Google Fonts 비동기 로드 패턴
    old_gf = r'<link\s+href="https://fonts\.googleapis\.com/css2\?family=Gmarket\+Sans:wght@300;500;700&display=swap"\s+rel="stylesheet"\s*/>'
    new_gf = '''<link
      href="https://fonts.googleapis.com/css2?family=Gmarket+Sans:wght@300;500;700&display=swap"
      rel="stylesheet"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Gmarket+Sans:wght@300;500;700&display=swap"
        rel="stylesheet"
      />
    </noscript>'''
    
    content = re.sub(old_fa, new_fa, content)
    content = re.sub(old_gf, new_gf, content)
    
    # preconnect 추가 (없는 경우)
    if 'preconnect' not in content or 'cdnjs.cloudflare.com' not in content:
        preconnect = '<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin />\n    '
        if '<link rel="preconnect" href="https://fonts.googleapis.com"' in content:
            content = content.replace(
                '<link rel="preconnect" href="https://fonts.googleapis.com" />',
                '<link rel="preconnect" href="https://fonts.googleapis.com" />\n    ' + preconnect
            )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# public 폴더의 모든 HTML 파일 업데이트
for root, dirs, files in os.walk('public'):
    for file in files:
        if file.endswith('.html'):
            update_html_file(os.path.join(root, file))
            print(f'Updated: {file}')
```

## 예상 성능 개선 효과

| 항목 | 개선 전 | 개선 후 | 절감 |
|------|---------|---------|------|
| 렌더링 차단 시간 | 1,050ms | ~200ms | 850ms |
| CLS 점수 | 1.000 | <0.1 | 90%+ |
| 리플로우 시간 | 78ms | ~20ms | 75% |
| CSS 크기 | 13.6KB | ~10KB (축소) | 26% |
| JS 크기 | 32.4KB | ~21KB (축소) | 35% |
| Font Awesome | 15.8KB | ~5KB (아이콘만) | 68% |

## 검증 방법

1. **Lighthouse 테스트**:
   - Chrome DevTools → Lighthouse 탭
   - Performance 점수 확인

2. **WebPageTest**:
   - https://www.webpagetest.org/
   - First Contentful Paint (FCP) 확인
   - Largest Contentful Paint (LCP) 확인

3. **Chrome DevTools Performance**:
   - Network 탭: 리소스 로딩 시간 확인
   - Performance 탭: 리플로우 확인

## 주의사항

1. **Font Awesome 비동기 로드**: 
   - 아이콘이 약간 늦게 표시될 수 있음
   - `noscript` 태그로 폴백 제공

2. **CSS 축소 후 테스트**:
   - 모든 페이지에서 스타일이 정상 작동하는지 확인

3. **캐시 버스팅**:
   - 파일 변경 시 버전 쿼리 업데이트: `?v=20250116`

