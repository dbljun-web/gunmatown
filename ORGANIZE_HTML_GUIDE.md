# HTML 파일 구조화 가이드

## 목표

`public/` 폴더의 모든 HTML 파일을 지역별 폴더 구조로 변환:

```
public/seoul-gangnam.html → seoul/gangnam/index.html
public/busan-bukgu.html → busan/bukgu/index.html
public/busan-bukgu-deokcheon-dong.html → busan/bukgu/deokcheon-dong/index.html
```

## 실행 방법

```bash
python organize_html_to_folders.py
```

## 변환 규칙

### 파일명 패턴
- `{지역}-{구/시}-{동/역}.html` → `{지역}/{구/시}/{동/역}/index.html`
- `{지역}-{구/시}-{동/역}-{서비스타입}.html` → `{지역}/{구/시}/{동/역}/index.html` (서비스 타입 제거)

### 예시
- `seoul-gangnam.html` → `seoul/gangnam/index.html`
- `busan-bukgu.html` → `busan/bukgu/index.html`
- `busan-bukgu-deokcheon-dong.html` → `busan/bukgu/deokcheon-dong/index.html`
- `busan-bukgu-deokcheon-dong-aroma.html` → `busan/bukgu/deokcheon-dong/index.html`

### 자동 처리 사항

1. **폴더 구조 생성**
   - 필요한 모든 폴더 자동 생성

2. **경로 수정**
   - CSS: `style.css` → `../css/style.css` (depth에 따라)
   - JS: `script.js` → `../js/script.js` (depth에 따라)
   - base href 자동 조정

3. **URL 수정**
   - canonical URL 업데이트
   - og:url 업데이트

## 주의사항

1. **백업**
   - 기존 파일이 있으면 `.backup` 확장자로 백업

2. **중복 파일**
   - 같은 경로에 여러 파일이 있으면 마지막 파일로 덮어씀

3. **특수 파일**
   - `index.html`, `admin.html`은 제외

## 실행 후 확인

1. **폴더 구조 확인**
   ```bash
   ls -R seoul/
   ls -R busan/
   ```

2. **파일 경로 확인**
   - HTML 파일의 CSS, JS 경로가 올바른지 확인

3. **브라우저 테스트**
   - `https://msg1000.com/seoul/gangnam/` 접속 확인
