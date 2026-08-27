# 이미지 URL 사용 가이드

## 로고 이미지 변경 방법

### 로그인 페이지 (login.html)

```html
<!-- 기본 아이콘 (현재) -->
<div class="logo-icon" id="logoIcon">
  <i class="fas fa-spa"></i>
</div>

<!-- 이미지 URL 사용 방법 -->
<div class="logo-icon" id="logoIcon">
  <img src="https://your-logo-url.com/logo.png" alt="마사지천국 로고" />
</div>
```

**예시:**

```html
<div class="logo-icon" id="logoIcon">
  <img src="https://i.imgur.com/yourlogo.png" alt="마사지천국 로고" />
</div>
```

### 회원가입 페이지 (signup.html)

로그인 페이지와 동일한 방식으로 변경하세요.

```html
<div class="logo-icon" id="logoIcon">
  <img src="https://your-logo-url.com/logo.png" alt="마사지천국 로고" />
</div>
```

## 프로필 이미지 추가

### 회원가입 시 프로필 이미지 설정

회원가입 페이지에 **프로필 이미지 URL** 필드가 추가되었습니다.

**사용 가능한 이미지 호스팅 서비스:**

- Imgur: https://imgur.com
- ImgBB: https://imgbb.com
- Cloudinary: https://cloudinary.com
- Google Drive (공개 링크)
- GitHub (저장소 이미지)

**예시 URL:**

```
https://i.imgur.com/abc123.jpg
https://ibb.co/xyz456
https://res.cloudinary.com/demo/image/upload/sample.jpg
```

### 회원 관리에서 프로필 이미지 수정

회원 관리 페이지에서 기존 회원의 프로필 이미지도 수정할 수 있습니다.

1. 회원 관리 페이지 접속
2. 수정할 회원의 "수정" 버튼 클릭
3. "프로필 이미지 URL" 필드에 이미지 주소 입력
4. 저장 버튼 클릭

## 이미지 표시 규칙

### 프로필 이미지 우선순위

1. **이미지 URL이 있는 경우**: 프로필 이미지 표시
2. **이미지 URL이 없거나 로드 실패**: 이름 첫 글자로 대체
3. **이미지 로드 에러**: 자동으로 이름 첫 글자로 폴백

### 회원 목록에서 표시

```
✅ 이미지 있음: [프로필 사진]
❌ 이미지 없음: [김] (이름 첫 글자)
⚠️ 로드 실패: [김] (자동 폴백)
```

## 이미지 업로드 방법

### 1. Imgur 사용 (무료, 추천)

```
1. https://imgur.com 접속
2. "New post" 클릭
3. 이미지 업로드
4. 우클릭 > "Copy image address"
5. URL 복사하여 사용
```

### 2. ImgBB 사용 (무료)

```
1. https://imgbb.com 접속
2. "Start uploading" 클릭
3. 이미지 선택
4. "Direct link" URL 복사
```

### 3. GitHub 사용 (무료)

```
1. GitHub 저장소 생성
2. images 폴더 생성
3. 이미지 업로드
4. 이미지 클릭 > "Raw" 버튼
5. URL 복사 (https://raw.githubusercontent.com/...)
```

## 권장 이미지 사양

### 로고 이미지

- **크기**: 200x200px 이상
- **형식**: PNG (투명 배경 권장), JPG, WebP
- **비율**: 1:1 (정사각형)
- **용량**: 500KB 이하

### 프로필 이미지

- **크기**: 150x150px 이상
- **형식**: JPG, PNG, WebP
- **비율**: 1:1 (정사각형)
- **용량**: 300KB 이하

## 예시 코드

### 로그인/회원가입 페이지 로고

```html
<!-- Option 1: 실제 로고 이미지 -->
<div class="logo-icon" id="logoIcon">
  <img src="https://i.imgur.com/YOUR_LOGO.png" alt="마사지천국 로고" />
</div>

<!-- Option 2: 기본 아이콘 (현재) -->
<div class="logo-icon" id="logoIcon">
  <i class="fas fa-spa"></i>
</div>
```

### 회원가입 시 프로필 이미지

```javascript
// 회원가입 폼
{
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123',
  name: '홍길동',
  phone: '010-1234-5678',
  profileImage: 'https://i.imgur.com/profile.jpg' // ← 이미지 URL
}
```

## 문제 해결

### 이미지가 표시되지 않을 때

1. **URL 확인**: 브라우저에서 직접 URL을 열어 이미지가 보이는지 확인
2. **HTTPS 사용**: HTTP URL은 차단될 수 있으므로 HTTPS 사용
3. **CORS 확인**: 일부 이미지 호스팅은 CORS를 차단할 수 있음
4. **파일 형식**: JPG, PNG, WebP 형식 확인
5. **파일 크기**: 너무 큰 파일은 로딩이 느릴 수 있음

### 로드 실패 시 자동 폴백

현재 시스템은 이미지 로드 실패 시 자동으로 이름 첫 글자로 표시됩니다.

```javascript
// 자동 폴백 처리
onerror = "this.style.display='none'; this.parentElement.innerHTML='홍';";
```

## 보안 주의사항

⚠️ **주의**: 외부 이미지 URL 사용 시 다음을 확인하세요:

1. **신뢰할 수 있는 호스팅 사용**: Imgur, ImgBB 등 공식 서비스
2. **개인정보 노출 주의**: 실제 신분증이나 개인정보가 포함된 이미지 금지
3. **저작권 확인**: 본인이 소유하거나 사용 권한이 있는 이미지만 사용
4. **부적절한 이미지 금지**: 성인, 폭력, 혐오 등의 이미지 업로드 금지

## 추가 기능 (향후 개발)

- [ ] 직접 파일 업로드 기능
- [ ] 이미지 편집 (크롭, 리사이즈)
- [ ] 서버 측 이미지 저장
- [ ] CDN 연동
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 썸네일 자동 생성

---

**마사지천국** - 전국 마사지 예약 플랫폼
