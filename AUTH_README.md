# 인증 및 회원관리 시스템

## 개요

마사지천국 플랫폼에 로그인, 회원가입, 회원관리, 어드민 기능이 추가되었습니다.

## 주요 기능

### 1. 로그인 (login.html)

- 아이디/이메일로 로그인 가능
- 비밀번호 표시/숨김 토글
- 자동 로그인 유지 옵션
- 관리자/일반 사용자 권한 구분
- 로그인 후 역할에 따른 자동 리다이렉트

**데모 계정:**

- 아이디: `admin`
- 비밀번호: `admin123!`
- 역할: 관리자

### 2. 회원가입 (signup.html)

- 회원정보 입력 (아이디, 이메일, 비밀번호, 이름, 연락처, 프로필 이미지)
- 실시간 비밀번호 강도 체크
- 이메일/전화번호 유효성 검사
- 프로필 이미지 URL 입력 (선택사항)
- 이용약관 동의
- 회원가입 후 자동 로그인 페이지 이동

### 3. 회원관리 (users-management.html)

**관리자 전용 페이지**

- 전체 회원 목록 조회
- 회원 검색 (이름, 아이디, 이메일)
- 권한별 필터링 (관리자/일반)
- 상태별 필터링 (활성/비활성)
- 회원 정보 수정 (이메일, 이름, 연락처, 프로필 이미지)
- 프로필 이미지 표시 (URL 방식)
- 회원 활성화/비활성화
- 회원 삭제
- 실시간 통계 (전체/활성/최근가입/최근로그인)

### 4. 어드민 페이지 (admin.html)

- 로그인 인증 추가
- 현재 로그인 사용자 정보 표시
- 로그아웃 기능
- 회원관리 메뉴 추가
- 기존 업체 관리 기능 유지

## 파일 구조

```
kissbang-main/
├── auth-manager.js          # 인증 관리 시스템
├── users.json                # 사용자 데이터 (초기 구조)
├── login.html                # 로그인 페이지
├── signup.html               # 회원가입 페이지
├── users-management.html     # 회원관리 페이지
├── admin.html                # 어드민 페이지 (업데이트)
├── AUTH_README.md           # 이 파일
└── IMAGE_GUIDE.md           # 이미지 URL 사용 가이드
```

## 데이터 저장 방식

현재 버전은 **LocalStorage**를 사용하여 클라이언트 측에서 데이터를 관리합니다.

### LocalStorage 키

- `kissbang_users`: 사용자 데이터
- `kissbang_session`: 로그인 세션 정보

### 프로덕션 환경

실제 운영 환경에서는 다음과 같이 변경이 필요합니다:

1. 백엔드 API 서버 구축 (Node.js + Express)
2. 데이터베이스 연동 (MongoDB, PostgreSQL 등)
3. 비밀번호 해싱 (bcryptjs)
4. JWT 토큰 기반 인증
5. HTTPS 통신

## 사용 방법

### 1. 관리자 로그인

```
1. login.html 접속
2. 아이디: admin
3. 비밀번호: admin123!
4. 로그인 버튼 클릭
5. admin.html로 자동 이동
```

### 2. 회원가입

```
1. signup.html 접속
2. 회원정보 입력
3. 필수 약관 동의
4. 회원가입 버튼 클릭
5. login.html로 자동 이동
```

### 3. 회원관리

```
1. admin.html 로그인
2. "회원 관리" 탭 클릭
3. users-management.html로 이동
4. 회원 검색, 수정, 삭제 가능
```

## 권한 시스템

### 역할 (Role)

- `admin`: 관리자 (모든 권한)
- `user`: 일반 회원 (제한된 권한)

### 페이지 접근 권한

| 페이지                | admin | user | 비로그인 |
| --------------------- | ----- | ---- | -------- |
| index.html            | ✅    | ✅   | ✅       |
| login.html            | ✅    | ✅   | ✅       |
| signup.html           | ✅    | ✅   | ✅       |
| admin.html            | ✅    | ❌   | ❌       |
| users-management.html | ✅    | ❌   | ❌       |

## 보안 고려사항

### 현재 구현 (개발 환경)

- LocalStorage 기반 저장
- 평문 비밀번호 저장 (⚠️ 주의)
- 클라이언트 측 인증

### 프로덕션 권장사항

```javascript
// 1. 비밀번호 해싱
const bcrypt = require('bcryptjs');
const hashedPassword = await bcrypt.hash(password, 10);

// 2. JWT 토큰 생성
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  expiresIn: '7d',
});

// 3. HTTPS 사용
// 4. CSRF 토큰 구현
// 5. Rate Limiting 적용
```

## API 엔드포인트 (향후 구현)

### 인증

```
POST /api/auth/signup    - 회원가입
POST /api/auth/login     - 로그인
POST /api/auth/logout    - 로그아웃
GET  /api/auth/me        - 현재 사용자 정보
```

### 회원관리 (관리자 전용)

```
GET    /api/users        - 전체 회원 목록
GET    /api/users/:id    - 특정 회원 정보
PUT    /api/users/:id    - 회원 정보 수정
DELETE /api/users/:id    - 회원 삭제
PATCH  /api/users/:id/status - 회원 상태 변경
GET    /api/users/stats  - 회원 통계
```

## 초기 계정

### 관리자 계정

```json
{
  "id": "admin-001",
  "username": "admin",
  "email": "admin@kissbang.com",
  "password": "admin123!",
  "role": "admin",
  "name": "관리자",
  "phone": "010-0000-0000"
}
```

⚠️ **중요**: 프로덕션 배포 전 반드시 관리자 비밀번호를 변경하세요!

## 문제 해결

### 로그인이 안 될 때

1. 브라우저 개발자 도구 (F12) 열기
2. Console 탭에서 에러 확인
3. Application > Local Storage 확인
4. `kissbang_users` 키가 있는지 확인

### 데이터 초기화

```javascript
// 브라우저 콘솔에서 실행
localStorage.clear();
location.reload();
```

## 개발 로드맵

### Phase 1 (완료) ✅

- [x] 로그인 페이지
- [x] 회원가입 페이지
- [x] 회원관리 페이지
- [x] 어드민 인증 추가
- [x] LocalStorage 기반 저장

### Phase 2 (계획)

- [ ] 백엔드 API 서버 구축
- [ ] MongoDB 연동
- [ ] JWT 인증 구현
- [ ] 비밀번호 해싱
- [ ] 이메일 인증

### Phase 3 (계획)

- [ ] 소셜 로그인 (Google, Kakao, Naver)
- [ ] 2단계 인증 (2FA)
- [ ] 비밀번호 찾기
- [ ] 회원 프로필 페이지
- [ ] 활동 로그

## 이미지 URL 사용

### 로고 이미지 변경

로그인/회원가입 페이지에서 로고 아이콘을 실제 이미지로 변경할 수 있습니다.

```html
<!-- login.html 또는 signup.html -->
<div class="logo-icon" id="logoIcon">
  <!-- 아이콘 대신 이미지 URL 사용 -->
  <img src="https://i.imgur.com/yourlogo.png" alt="마사지천국 로고" />
</div>
```

### 프로필 이미지 추가

**회원가입 시:**

- 프로필 이미지 URL 필드에 이미지 주소 입력 (선택사항)
- 예: `https://i.imgur.com/profile.jpg`

**회원 관리에서:**

- 회원 정보 수정 시 프로필 이미지 URL 수정 가능
- 이미지가 있으면 프로필 사진 표시
- 이미지가 없으면 이름 첫 글자로 자동 표시

**자세한 가이드**: `IMAGE_GUIDE.md` 파일을 참고하세요.

## 연락처

문의사항이나 버그 리포트는 다음으로 연락주세요:

- 이메일: admin@kissbang.com
- 전화: 010-2246-3693

---

**마사지천국** - 전국 마사지 예약 플랫폼
