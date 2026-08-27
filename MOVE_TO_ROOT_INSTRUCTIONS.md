# main/ 폴더를 root로 이동하는 방법

## 방법 1: Python 스크립트 실행 (권장)

터미널에서 다음 명령어를 실행하세요:

```bash
python move_main_to_root.py
```

또는:

```bash
py move_main_to_root.py
```

## 방법 2: 수동으로 이동

다음 파일/폴더들을 `main/`에서 프로젝트 root로 이동하세요:

### 필수 파일들:
- `main/index.html` → `index.html`
- `main/robots.txt` → `robots.txt`
- `main/sitemap.xml` → `sitemap.xml`
- `main/shops.json` → `shops.json`
- `main/shop-card-data.js` → `shop-card-data.js`

### 폴더들:
- `main/css/` → `css/`
- `main/js/` → `js/`
- `main/images/` → `images/`
- `main/seoul/` → `seoul/`
- `main/gyeonggi/` → `gyeonggi/`
- `main/incheon/` → `incheon/`

### 추가 작업:
- root에 `.nojekyll` 파일 생성 (빈 파일)

## 이동 후 GitHub 설정

1. **GitHub 저장소** → **Settings** → **Pages**
2. **Source** 섹션에서:
   - **Deploy from a branch** 선택
   - **Branch**: `main` 선택
   - **Folder**: `/ (root)` 선택
3. **Save** 클릭

## 확인 사항

이동 후 다음 구조가 되어야 합니다:

```
프로젝트 root/
 ├ index.html
 ├ robots.txt
 ├ sitemap.xml
 ├ .nojekyll
 ├ css/
 ├ js/
 ├ images/
 ├ seoul/
 ├ gyeonggi/
 └ incheon/
```
