# 빠른 해결 방법

## "Deploy from a branch"로 변경하기

GitHub Pages는 `/main` 폴더를 지원하지 않으므로, 다음 중 하나를 선택하세요:

### 옵션 A: main/ 내용을 root로 이동 (가장 간단)

1. **수동으로 이동:**
   - `main/` 폴더의 모든 파일과 폴더를 프로젝트 root로 복사/이동
   - `main/index.html` → `index.html`
   - `main/css/` → `css/`
   - `main/js/` → `js/`
   - `main/images/` → `images/`
   - `main/seoul/` → `seoul/`
   - 등등...

2. **GitHub 설정:**
   - Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`

3. **GitHub Actions 비활성화:**
   - Settings → Pages → Source를 "Deploy from a branch"로 변경하면 자동으로 GitHub Actions가 비활성화됨

### 옵션 B: main/을 docs/로 변경

1. **폴더 이름 변경:**
   - `main/` 폴더를 `docs/`로 이름 변경

2. **GitHub 설정:**
   - Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/docs`

### 옵션 C: GitHub Actions 수정 (main/ 유지)

현재 GitHub Actions를 수정하여 제대로 작동하도록 합니다.

1. `.nojekyll` 파일이 `main/` 폴더에 있는지 확인 (방금 추가함)
2. GitHub Actions 워크플로우가 올바른지 확인
3. Settings → Pages → Source를 **GitHub Actions**로 유지

## 추천: 옵션 A (root로 이동)

가장 확실하고 간단합니다. GitHub Pages의 기본 기능을 사용하므로 문제가 적습니다.
