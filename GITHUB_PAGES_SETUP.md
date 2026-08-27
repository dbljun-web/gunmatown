# GitHub Pages 정적 HTML 배포 가이드

## ✅ 현재 상태

- **HTML 파일**: 2,535개
- **sitemap.xml**: ✅ 생성됨 (모든 HTML 포함)
- **robots.txt**: ✅ 생성됨 (모든 페이지 허용)
- **.nojekyll**: ✅ 생성됨 (Jekyll 처리 방지)

## 🚀 GitHub Pages 설정 방법

### ⚠️ 중요: GitHub Pages에서 `/public` 폴더 옵션이 없는 경우

GitHub Pages 설정에서 Folder 옵션에 `/public`이 없고 `/` (root)와 `/docs`만 있는 경우, **GitHub Actions**를 사용해야 합니다.

### 설정 단계

1. **GitHub 저장소 → Settings → Pages**
2. **Source** 섹션에서:
   - **Source**: `GitHub Actions` 선택
3. **Save** 클릭

이제 `.github/workflows/deploy.yml` 파일이 자동으로 `public` 폴더를 배포합니다.

### 방법 1: GitHub Actions 사용 (권장 - 자동 배포)

`.github/workflows/deploy.yml` 파일 생성:

`.github/workflows/deploy.yml` 파일이 이미 생성되어 있습니다.

이 워크플로우는:

- `main` 브랜치에 푸시할 때마다 자동 실행
- `public` 폴더의 모든 파일을 GitHub Pages에 배포
- 수동 실행도 가능 (Actions 탭에서)

**워크플로우 파일 위치**: `.github/workflows/deploy.yml`

## 📋 확인 사항

### 1. .gitignore 확인

- `public/` 폴더가 제외되어 있지 않은지 확인
- 현재 `.gitignore`에는 `public/` 제외가 없으므로 ✅ 정상

### 2. 모든 HTML 파일이 Git에 포함되는지 확인

```bash
git status public/*.html
```

### 3. sitemap.xml 업데이트

HTML 파일이 추가/변경되면 sitemap 재생성:

```bash
python generate_sitemap.py
```

## 🔍 SEO 확인

### robots.txt

- ✅ 모든 페이지 허용: `Allow: /`
- ✅ sitemap.xml 위치 명시: `Sitemap: https://msg1000.com/sitemap.xml`

### sitemap.xml

- ✅ 모든 HTML 파일 포함
- ✅ 우선순위 설정 (index.html: 1.0, 메인 페이지: 0.9, 세부 페이지: 0.7)
- ✅ 변경 빈도 설정 (daily/weekly)

## ⚠️ 주의사항

1. **도메인 설정**:

   - GitHub Pages는 기본적으로 `your-username.github.io/repo-name/` 형식
   - 커스텀 도메인 사용 시 DNS 설정 필요

2. **파일 크기 제한**:

   - GitHub Pages는 파일당 100MB 제한
   - 저장소 전체 1GB 제한 (무료 플랜)

3. **빌드 시간**:
   - GitHub Pages는 정적 파일만 서빙
   - 빌드 과정 없이 바로 배포됨

## 🎯 체크리스트

- [ ] GitHub 저장소에 모든 파일 푸시 완료
- [ ] GitHub Pages 설정 완료 (Source: `/public`)
- [ ] `.nojekyll` 파일이 `public/` 폴더에 있음
- [ ] `sitemap.xml`이 최신 상태
- [ ] `robots.txt`가 올바르게 설정됨
- [ ] 모든 HTML 파일이 접근 가능한지 테스트
- [ ] Google Search Console에 sitemap 제출

## 📝 다음 단계

1. **Google Search Console 등록**:

   - https://search.google.com/search-console
   - sitemap.xml 제출: `https://your-domain.com/sitemap.xml`

2. **Bing Webmaster Tools 등록**:

   - https://www.bing.com/webmasters
   - sitemap.xml 제출

3. **모니터링**:
   - Google Search Console에서 인덱싱 상태 확인
   - 크롤링 오류 확인
