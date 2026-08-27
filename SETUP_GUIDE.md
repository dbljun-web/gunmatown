# 마사지천국 플랫폼 - 설치 및 실행 가이드

## 📋 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [기술 스택](#기술-스택)
3. [로컬 개발 환경 설정](#로컬-개발-환경-설정)
4. [배포 방법](#배포-방법)
5. [API 문서](#api-문서)
6. [주요 기능](#주요-기능)

---

## 프로젝트 소개

**마사지천국**는 전국 마사지 업체를 검색하고 예약할 수 있는 종합 플랫폼입니다.

### 주요 기능

- ✅ **성인 인증** (간편인증, 휴대폰, 주민번호)
- ✅ **회원가입 / 로그인** (JWT 기반)
- ✅ **업체 검색** (지역별, 서비스별)
- ✅ **업체 상세 정보**
- ✅ **휴대폰 인증** (SMS 발송)
- ✅ **주민번호 검증** (만 19세 확인)

---

## 기술 스택

### Frontend

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios**

### Backend

- **Next.js API Routes** (서버리스)
- **MongoDB** (데이터베이스)
- **JWT** (인증)
- **bcryptjs** (비밀번호 암호화)

### 배포

- **Vercel** (호스팅)
- **MongoDB Atlas** (데이터베이스)

---

## 로컬 개발 환경 설정

### 1. 필수 요구사항

- Node.js 18+ 설치
- Git 설치
- MongoDB Atlas 계정 (무료)

### 2. 저장소 클론

```bash
git clone https://github.com/your-username/massage-platform.git
cd massage-platform
```

### 3. 의존성 패키지 설치

```bash
npm install
# 또는
yarn install
```

### 4. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# MongoDB 연결 문자열
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/massage-platform?retryWrites=true&w=majority

# JWT 비밀키 (32자 이상 랜덤 문자열)
JWT_SECRET=your-super-secret-jwt-key-change-this

# NextAuth 비밀키
NEXTAUTH_SECRET=your-nextauth-secret-change-this

# NextAuth URL (로컬 개발)
NEXTAUTH_URL=http://localhost:3000
```

#### 비밀키 생성 방법:

```bash
# Mac/Linux
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 5. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

서버가 실행되면 브라우저에서 `http://localhost:3000` 접속

---

## 배포 방법

자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md) 참조

### 간단 요약:

1. **MongoDB Atlas** 무료 계정 생성
2. **GitHub**에 코드 푸시
3. **Vercel**에서 GitHub 저장소 연결
4. 환경 변수 설정
5. 자동 배포 완료!

---

## API 문서

### 인증 API

#### 1. 회원가입

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "name": "홍길동",
  "phone": "010-1234-5678"
}
```

**응답 (201 Created):**

```json
{
  "message": "회원가입이 완료되었습니다.",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "홍길동",
    "verified": false
  }
}
```

#### 2. 로그인

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

**응답 (200 OK):**

```json
{
  "message": "로그인 성공",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "홍길동"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### 3. 로그아웃

```http
POST /api/auth/logout
```

#### 4. 현재 사용자 정보

```http
GET /api/auth/me
Cookie: auth-token=eyJhbGciOiJIUzI1NiIs...
```

### 인증 확인 API

#### 5. SMS 인증번호 발송

```http
POST /api/verification/send-sms
Content-Type: application/json

{
  "phone": "010-1234-5678"
}
```

**응답 (200 OK):**

```json
{
  "message": "인증번호가 발송되었습니다.",
  "code": "123456" // 개발 환경에서만
}
```

#### 6. SMS 인증번호 검증

```http
POST /api/verification/verify-sms
Content-Type: application/json

{
  "phone": "010-1234-5678",
  "code": "123456"
}
```

#### 7. 주민번호 검증

```http
POST /api/verification/verify-jumin
Content-Type: application/json

{
  "juminFront": "950101",
  "juminBack": "1"
}
```

**응답 (200 OK):**

```json
{
  "message": "주민번호 인증이 완료되었습니다.",
  "verified": true,
  "age": 29,
  "gender": "M",
  "birthDate": "950101"
}
```

---

## 주요 기능

### 1. 성인 인증 시스템

- **간편 인증**: 만 19세 이상 버튼 클릭
- **휴대폰 인증**: SMS 인증번호 발송 및 검증
- **주민번호 인증**: 생년월일 및 성별로 만 19세 자동 계산

### 2. 회원 관리

- 이메일/비밀번호 기반 회원가입
- JWT 토큰 기반 인증
- 비밀번호 암호화 저장 (bcryptjs)
- 중복 이메일/전화번호 검증

### 3. 데이터베이스 구조

#### Users Collection

```typescript
{
  _id: ObjectId,
  email: string,
  password: string, // 해시된 비밀번호
  name: string,
  phone?: string,
  birthDate?: string,
  gender?: "M" | "F",
  verified: boolean,
  verificationMethod?: "simple" | "phone" | "jumin",
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt?: Date
}
```

#### Verifications Collection

```typescript
{
  _id: ObjectId,
  phone: string,
  code: string, // 6자리 인증번호
  expiresAt: Date, // 3분 후 만료
  verified: boolean,
  createdAt: Date
}
```

---

## 프로젝트 구조

```
massage-platform/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   │   ├── auth/         # 인증 API
│   │   │   ├── register/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   └── me/
│   │   └── verification/ # 인증 확인 API
│   │       ├── send-sms/
│   │       ├── verify-sms/
│   │       └── verify-jumin/
│   └── login/            # 로그인 페이지
├── lib/                  # 유틸리티 함수
│   ├── mongodb.ts       # MongoDB 연결
│   ├── auth.ts          # 인증 헬퍼
│   └── models/          # 데이터 모델
├── public/              # 정적 파일
├── .gitignore          # Git 제외 파일
├── next.config.js      # Next.js 설정
├── package.json        # 의존성 패키지
└── tsconfig.json       # TypeScript 설정
```

---

## 개발 팁

### MongoDB 데이터 확인

```bash
# MongoDB Atlas 웹 콘솔
1. Database → Browse Collections
2. massage-platform 데이터베이스
3. users, verifications 컬렉션 확인
```

### API 테스트 (Postman/Thunder Client)

```bash
# 회원가입
POST http://localhost:3000/api/auth/register

# 로그인
POST http://localhost:3000/api/auth/login

# 인증 필요한 API (쿠키 자동 전송됨)
GET http://localhost:3000/api/auth/me
```

### 로그 확인

```bash
# 개발 서버 터미널에서 실시간 로그 확인
# MongoDB 쿼리, API 호출 등이 표시됨
```

---

## 문제 해결

### MongoDB 연결 오류

```
Error: MONGODB_URI 환경 변수를 설정해주세요.
```

→ `.env.local` 파일에 `MONGODB_URI` 추가

### JWT 토큰 오류

```
Error: JWT_SECRET이 설정되지 않았습니다.
```

→ `.env.local` 파일에 `JWT_SECRET` 추가

### 포트 충돌

```
Error: Port 3000 is already in use
```

→ `npm run dev -- -p 3001` (다른 포트 사용)

---

## 라이선스

MIT License

---

## 문의

- **전화**: 010-2246-3693
- **GitHub**: https://github.com/your-username/massage-platform
- **이메일**: support@massage-gaga.com

---

## 다음 단계

1. ✅ 로컬 개발 환경 설정
2. ✅ MongoDB Atlas 연결
3. ✅ 회원가입/로그인 구현
4. ⬜ GitHub에 푸시
5. ⬜ Vercel 배포
6. ⬜ 커스텀 도메인 연결
7. ⬜ 실제 SMS API 연동
8. ⬜ 본인인증 API 연동

배포 가이드: [DEPLOYMENT.md](./DEPLOYMENT.md)
