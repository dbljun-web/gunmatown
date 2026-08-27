# CSS/JS 축소 및 Font Awesome 최적화 가이드

## ✅ 가능합니다!

CSS/JS 축소와 Font Awesome 최적화를 자동으로 적용할 수 있습니다.

## 방법 1: 자동화 스크립트 사용 (권장)

### 1단계: Node.js 도구 설치 (선택사항)

```bash
npm install -g clean-css-cli terser
```

**참고**: 설치하지 않아도 온라인 도구를 사용할 수 있습니다.

### 2단계: 스크립트 실행

```bash
# CSS/JS 축소
python minify_assets.py

# Font Awesome 최적화 (SVG로 대체)
python optimize_fontawesome.py
```

### 결과
- `style.min.css` 생성 (약 26% 크기 감소)
- `script.min.js` 생성 (약 35% 크기 감소)
- `common-components.min.js` 생성
- 모든 HTML 파일이 `.min` 파일을 참조하도록 자동 업데이트

## 방법 2: 온라인 도구 사용 (간단)

### CSS 축소
1. https://www.minifier.org/ 접속
2. `public/style.css` 파일 내용 복사
3. "Minify" 클릭
4. 축소된 코드를 `public/style.min.css`로 저장

### JS 축소
1. https://www.minifier.org/ 접속
2. `public/script.js` 또는 `public/common-components.js` 내용 복사
3. "Minify" 클릭
4. 축소된 코드를 `.min.js` 파일로 저장

### HTML 파일 업데이트
`minify_assets.py` 스크립트의 `update_html_for_minified_files()` 함수를 실행하거나, 수동으로 변경:

```html
<!-- 변경 전 -->
<link rel="stylesheet" href="style.css?v=20250115" />
<script src="script.js?v=20250115"></script>

<!-- 변경 후 -->
<link rel="stylesheet" href="style.min.css?v=20250115" />
<script src="script.min.js?v=20250115"></script>
```

## 방법 3: Font Awesome SVG 대체 (최대 절감)

### 장점
- Font Awesome CDN 제거 가능 (15.8KB → 0KB)
- 필요한 아이콘만 사용 (약 5KB SVG)
- 네트워크 요청 감소

### 실행
```bash
python optimize_fontawesome.py
```

### 결과
- Font Awesome 아이콘이 SVG로 대체됨
- Font Awesome CDN 링크 제거 (선택사항)
- 약 68% 크기 절감 (15.8KB → 5KB)

## 예상 성능 개선

| 항목 | 개선 전 | 개선 후 | 절감 |
|------|---------|---------|------|
| CSS 크기 | 13.6KB | ~10KB | 26% |
| JS 크기 | 32.4KB | ~21KB | 35% |
| Font Awesome | 15.8KB | ~5KB (SVG) | 68% |
| **총 절감** | **62KB** | **~36KB** | **42%** |

## 주의사항

1. **테스트 필수**: 축소된 파일을 적용한 후 모든 페이지가 정상 작동하는지 확인
2. **백업**: 원본 파일은 유지 (`.min` 파일만 배포)
3. **캐시 버스팅**: 파일 변경 시 버전 쿼리 업데이트 (`?v=20250116`)

## 빠른 시작

```bash
# 1. CSS/JS 축소
python minify_assets.py

# 2. 테스트
# 브라우저에서 페이지 열어서 정상 작동 확인

# 3. Font Awesome 최적화 (선택사항)
python optimize_fontawesome.py

# 4. 성능 테스트
# Lighthouse로 점수 확인
```

## 문제 해결

### Node.js 도구가 없을 때
- 온라인 도구 사용 (방법 2)
- 또는 Python으로 간단한 축소 스크립트 작성 가능

### SVG 아이콘이 표시되지 않을 때
- `optimize_fontawesome.py`에서 Font Awesome CDN 제거 부분을 주석 처리
- 또는 Font Awesome CDN을 유지하고 SVG만 추가 사용

### 축소된 파일이 작동하지 않을 때
- 원본 파일로 되돌리기
- 축소 옵션 조정 (너무 공격적인 압축 방지)

