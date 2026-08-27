# Canonical URL 문제 해결 가이드

## 🔍 문제 상황

**오류 메시지:**

```
Document does not have a valid rel=canonical
Points to the domain's root URL (the homepage),
instead of an equivalent page of content
```

## ⚠️ 원인 분석

### 1. GitHub Actions vs Deploy from Branch

**GitHub Actions 사용 시:**

- ✅ 장점: `/public` 폴더를 직접 배포 가능
- ❌ 단점: 워크플로우 설정이 복잡하고, 빌드 과정에서 문제 발생 가능

**Deploy from Branch 사용 시:**

- ✅ 장점: 간단하고 안정적
- ❌ 단점: GitHub Pages는 `/` (root) 또는 `/docs` 폴더만 지원
  - `/public` 폴더 옵션이 없으면 GitHub Actions 필수

### 2. 현재 프로젝트 구조

```
kissbang-main/
├── public/          ← 모든 HTML 파일이 여기에 있음
│   ├── index.html
│   ├── seoul-gangnam-yeoksam-dong.html
│   └── ...
└── ...
```

## ✅ 해결 방법

### 방법 1: GitHub Actions 워크플로우 생성 (권장)

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './public'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**설정 방법:**

1. GitHub 저장소 → Settings → Pages
2. Source: **GitHub Actions** 선택
3. 위 워크플로우 파일 생성 후 푸시
4. 자동으로 배포 시작

### 방법 2: Deploy from Branch (간단하지만 제한적)

**⚠️ 주의: 이 방법은 `/public` 폴더를 직접 배포할 수 없습니다!**

만약 이 방법을 사용하려면:

1. **모든 파일을 root로 이동:**

   ```bash
   # public 폴더의 모든 파일을 root로 복사
   cp -r public/* .
   ```

2. **GitHub Pages 설정:**

   - Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**

3. **문제점:**
   - 프로젝트 구조가 깨짐
   - 다른 파일들과 HTML 파일이 섞임
   - 유지보수 어려움

### 방법 3: public 폴더를 docs로 변경 (비권장)

1. `public` 폴더를 `docs`로 이름 변경
2. GitHub Pages 설정에서 Folder: `/docs` 선택
3. **문제점:** 모든 스크립트와 경로 수정 필요

## 🎯 권장 해결책

### ✅ GitHub Actions 워크플로우 사용 (방법 1)

**이유:**

1. 현재 프로젝트 구조 유지 가능
2. `/public` 폴더를 그대로 배포
3. Canonical URL이 올바르게 작동
4. 자동 배포 가능

**설정 단계:**

1. `.github/workflows/deploy.yml` 파일 생성 (위 코드 사용)

2. GitHub 저장소 → Settings → Pages

   - Source: **GitHub Actions** 선택
   - Save

3. 커밋 및 푸시:

   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions workflow for Pages deployment"
   git push
   ```

4. Actions 탭에서 배포 진행 상황 확인

## 🔍 Canonical URL 확인

각 HTML 파일의 canonical URL이 올바른지 확인:

**올바른 예:**

```html
<!-- seoul-gangnam-yeoksam-dong.html -->
<link
  rel="canonical"
  href="https://msg1000.com/seoul-gangnam-yeoksam-dong.html"
/>
```

**잘못된 예:**

```html
<!-- 모든 페이지가 홈페이지를 가리킴 -->
<link rel="canonical" href="https://msg1000.com" />
```

## 📋 체크리스트

- [ ] `.github/workflows/deploy.yml` 파일 생성
- [ ] GitHub Pages Source를 **GitHub Actions**로 설정
- [ ] 첫 배포 후 Actions 탭에서 성공 확인
- [ ] 실제 사이트에서 canonical URL 확인
- [ ] Google Search Console에서 오류 해결 확인

## 🚨 주의사항

1. **Custom Domain 설정:**

   - GitHub Pages → Settings → Custom domain
   - `msg1000.com` 입력
   - DNS 설정 확인

2. **.nojekyll 파일:**

   - ✅ `public/.nojekyll` 파일이 이미 존재함
   - Jekyll 처리 방지

3. **빌드 시간:**
   - GitHub Actions는 약 1-2분 소요
   - 첫 배포는 더 오래 걸릴 수 있음

## 💡 추가 팁

### Canonical URL 자동 생성 확인

`generate_dong_htmls.js`에서 canonical URL 생성 로직 확인:

```javascript
const canonicalUrl = `https://msg1000.com/${filename}`;
```

이 부분이 올바르게 작동하는지 확인하세요.

### 문제가 계속되면

1. **브라우저 캐시 클리어**
2. **Google Search Console에서 URL 재검사 요청**
3. **실제 HTML 소스 확인** (개발자 도구 → View Source)

---

**결론:** GitHub Actions 워크플로우를 사용하는 것이 가장 안정적이고 프로젝트 구조를 유지할 수 있는 방법입니다.
