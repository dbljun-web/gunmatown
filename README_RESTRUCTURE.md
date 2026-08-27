# 사이트 구조 재구성 가이드

## 목표 구조

```
main/
 ├ index.html
 ├ sitemap.xml
 ├ robots.txt
 ├ css/
 │   └ style.css
 ├ js/
 │   ├ script.js
 │   ├ detail.js
 │   └ ...
 ├ images/
 ├ seoul/
 │   ├ index.html
 │   ├ gangnam/
 │   │   ├ index.html
 │   └ jongro/
 │       ├ index.html
 ├ gyeonggi/
 │   ├ suwon/
 │   │   ├ index.html
 └ incheon/
```

## 실행 방법

### 1. Python 스크립트 실행

```bash
python restructure_to_main.py
```

이 스크립트는:
- `main/` 폴더 구조 생성
- `public/`에서 기본 파일들 복사
- CSS, JS 파일들을 각각 폴더로 이동
- images 폴더 복사
- 기본 지역별 폴더 구조 생성

### 2. GitHub Actions 설정

`.github/workflows/deploy.yml` 파일이 생성되었습니다.

GitHub 저장소에서:
1. Settings → Pages
2. Source: **GitHub Actions** 선택
3. Save

### 3. HTML 파일 경로 수정

스크립트 실행 후, 모든 HTML 파일의 경로를 수정해야 합니다:

- `style.css` → `css/style.css` (또는 `../css/style.css` 등 상대경로)
- `script.js` → `js/script.js` (또는 `../js/script.js` 등 상대경로)
- `images/` → `images/` (상대경로 유지)

### 4. 지역별 HTML 파일 이동

기존 HTML 파일들을 적절한 폴더로 이동:

- `seoul-gangnam.html` → `main/seoul/gangnam/index.html`
- `seoul-jongro.html` → `main/seoul/jongro/index.html`
- `gyeonggi-suwon.html` → `main/gyeonggi/suwon/index.html`

### 5. 내부 링크 업데이트

모든 HTML 파일의 내부 링크를 새로운 구조에 맞게 수정:

- 상대 경로 사용 (`../`, `../../` 등)
- 카테고리 구조 반영 (`/seoul/`, `/seoul/gangnam/` 등)

## SEO 최적화

### URL 구조
- ✅ 슬래시 구조로 카테고리 인식
- ✅ `example.com/seoul/` → 서울 카테고리
- ✅ `example.com/seoul/gangnam/` → 강남 카테고리

### 내부 링크
- ✅ 모든 페이지에 촘촘한 내부 링크
- ✅ 지역별 상위/하위 페이지 연결
- ✅ 관련 지역 페이지 간 연결

## 주의사항

1. **백업**: 작업 전 반드시 백업하세요
2. **경로 수정**: 모든 HTML 파일의 경로를 확인하세요
3. **테스트**: 로컬에서 모든 링크가 작동하는지 테스트하세요
4. **sitemap.xml**: 새로운 구조에 맞게 sitemap 재생성 필요

## 다음 단계

1. `restructure_to_main.py` 실행
2. HTML 파일 경로 일괄 수정 스크립트 실행 (추가 필요)
3. 지역별 HTML 파일 이동
4. 내부 링크 업데이트
5. GitHub에 푸시 및 배포 테스트
