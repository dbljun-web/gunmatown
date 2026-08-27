# 🎉 마사지천국 - Next.js + Vercel + MongoDB 플랫폼

**전국 마사지 업체 검색 및 예약 플랫폼**

백엔드 기능이 완전히 구현된 풀스택 Next.js 애플리케이션입니다!

---

## ✨ 주요 기능

### 🔐 완벽한 인증 시스템
- ✅ **성인 인증** (간편인증, 휴대폰, 주민번호)
- ✅ **회원가입 / 로그인** (JWT 토큰 기반)
- ✅ **비밀번호 암호화** (bcryptjs)
- ✅ **세션 관리** (HTTP-only 쿠키)

### 📱 휴대폰 인증
- ✅ SMS 인증번호 발송 (3분 유효)
- ✅ 인증번호 검증
- ✅ 중복 번호 체크
- 🔄 실제 SMS API 연동 준비 완료

### 🆔 주민번호 검증
- ✅ 생년월일 유효성 검사
- ✅ 만 19세 자동 계산
- ✅ 성별 판별
- ✅ 미성년자 자동 차단

### 💾 데이터베이스
- ✅ MongoDB Atlas 연동
- ✅ 사용자 정보 관리
- ✅ 인증 정보 관리
- ✅ 자동 인덱싱

---

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/massage-platform.git
cd massage-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/massage-platform?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-32-characters-long
NEXTAUTH_SECRET=your-nextauth-secret-32-characters-long
NEXTAUTH_URL=http://localhost:3000
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속!

---

## 📚 API 엔드포인트

### 인증 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/auth/register` | 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| POST | `/api/auth/logout` | 로그아웃 |
| GET | `/api/auth/me` | 현재 사용자 정보 |

### 인증 확인 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/verification/send-sms` | SMS 인증번호 발송 |
| POST | `/api/verification/verify-sms` | SMS 인증번호 검증 |
| POST | `/api/verification/verify-jumin` | 주민번호 검증 |

---

## 🔧 기술 스택

### Frontend
- **Next.js 14** (App Router, TypeScript)
- **React 18** (Hooks)
- **Tailwind CSS** (스타일링)
- **Axios** (HTTP 클라이언트)

### Backend
- **Next.js API Routes** (서버리스 함수)
- **MongoDB** (NoSQL 데이터베이스)
- **JWT** (인증 토큰)
- **bcryptjs** (비밀번호 암호화)

### Deployment
- **Vercel** (호스팅, 자동 배포)
- **MongoDB Atlas** (관리형 데이터베이스)
- **GitHub** (버전 관리)

---

## 📁 프로젝트 구조

```
massage-platform/
├── app/                      # Next.js App Router
│   ├── api/                 # API 라우트 (백엔드)
│   │   ├── auth/           # 인증 API
│   │   │   ├── register/   # 회원가입
│   │   │   ├── login/      # 로그인
│   │   │   ├── logout/     # 로그아웃
│   │   │   └── me/         # 사용자 정보
│   │   └── verification/   # 인증 확인 API
│   │       ├── send-sms/   # SMS 발송
│   │       ├── verify-sms/ # SMS 검증
│   │       └── verify-jumin/ # 주민번호 검증
│   ├── login/              # 로그인 페이지
│   ├── page.tsx            # 메인 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   └── globals.css         # 전역 스타일
├── lib/                    # 유틸리티 라이브러리
│   ├── mongodb.ts         # MongoDB 연결
│   ├── auth.ts            # 인증 헬퍼 함수
│   └── models/            # 데이터 모델
│       └── User.ts        # User 타입 정의
├── public/                # 정적 파일
├── .gitignore            # Git 제외 파일
├── next.config.js        # Next.js 설정
├── package.json          # 의존성 관리
├── tailwind.config.ts    # Tailwind CSS 설정
├── tsconfig.json         # TypeScript 설정
├── vercel.json           # Vercel 배포 설정
├── DEPLOYMENT.md         # 📖 배포 가이드 (필독!)
└── SETUP_GUIDE.md        # 📖 설치 가이드
```

---

## 🌐 Vercel 배포 방법

### 단계별 가이드

1. **MongoDB Atlas 설정** (무료)
   - https://www.mongodb.com/cloud/atlas 가입
   - M0 (무료) 클러스터 생성
   - 연결 문자열 복사

2. **GitHub 푸시**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Vercel 배포**
   - https://vercel.com 로그인
   - "New Project" → GitHub 저장소 연결
   - 환경 변수 설정:
     ```
     MONGODB_URI=mongodb+srv://...
     JWT_SECRET=랜덤32자문자열
     NEXTAUTH_SECRET=랜덤32자문자열
     NEXTAUTH_URL=https://your-app.vercel.app
     ```
   - Deploy 클릭!

4. **완료!** 🎉
   - 배포된 URL: `https://your-app-name.vercel.app`

**자세한 배포 가이드**: [DEPLOYMENT.md](./DEPLOYMENT.md) 참조

---

## 📊 데이터베이스 스키마

### Users Collection
```typescript
{
  _id: ObjectId,
  email: string,              // 이메일 (고유)
  password: string,           // 해시된 비밀번호
  name: string,               // 이름
  phone?: string,             // 휴대폰 번호
  birthDate?: string,         // 생년월일 (YYMMDD)
  gender?: "M" | "F",         // 성별
  verified: boolean,          // 본인인증 여부
  verificationMethod?: "simple" | "phone" | "jumin",
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt?: Date
}
```

### Verifications Collection
```typescript
{
  _id: ObjectId,
  phone: string,              // 휴대폰 번호
  code: string,               // 인증번호 (6자리)
  expiresAt: Date,            // 만료 시간 (3분)
  verified: boolean,
  createdAt: Date
}
```

---

## 🔐 보안 기능

### 비밀번호
- ✅ bcryptjs로 해싱 (Salt 10 rounds)
- ✅ 최소 8자, 영문+숫자 조합 필수
- ✅ 평문 비밀번호 저장 금지

### JWT 토큰
- ✅ HTTP-only 쿠키에 저장
- ✅ 7일 유효 기간
- ✅ 서버 측 검증

### 환경 변수
- ✅ `.env.local`은 Git에서 제외
- ✅ Vercel에서 암호화 저장
- ✅ 프로덕션/개발 환경 분리

---

## 🧪 API 테스트

### Postman / Thunder Client

**회원가입:**
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test1234",
  "name": "테스터",
  "phone": "010-1234-5678"
}
```

**로그인:**
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test1234"
}
```

**SMS 인증번호 발송:**
```http
POST http://localhost:3000/api/verification/send-sms
Content-Type: application/json

{
  "phone": "010-1234-5678"
}
```

---

## 📝 개발 모드 vs 프로덕션 모드

### 개발 모드 (localhost)
- ✅ 인증번호가 콘솔에 표시됨
- ✅ 상세한 에러 메시지
- ✅ Hot Reload 지원

### 프로덕션 모드 (Vercel)
- ✅ 실제 SMS API 연동 필요
- ✅ 에러 메시지 간략화
- ✅ 자동 최적화

---

## 🛠️ 다음 단계

### 실제 SMS API 연동
```typescript
// app/api/verification/send-sms/route.ts
// NAVER Cloud, KakaoTalk, NHN Cloud 등

const response = await fetch('SMS_API_ENDPOINT', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SMS_API_KEY}`,
  },
  body: JSON.stringify({
    to: phone,
    message: `[마사지천국] 인증번호: ${code}`,
  }),
});
```

### 본인인증 API 연동
```typescript
// NICE 평가정보, PASS 등
const niceResponse = await verifyWithNICE({
  name, birthDate, gender
});
```

---

## 🤝 기여 방법

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 문의

- **전화**: 010-2246-3693
- **이메일**: support@massage-gaga.com
- **GitHub Issues**: https://github.com/your-username/massage-platform/issues

---

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

## 🎯 체크리스트

### 로컬 개발
- [ ] Node.js 18+ 설치
- [ ] MongoDB Atlas 계정 생성
- [ ] `.env.local` 파일 생성
- [ ] `npm install` 실행
- [ ] `npm run dev` 실행
- [ ] http://localhost:3000 접속

### GitHub 배포
- [ ] GitHub 저장소 생성
- [ ] `.gitignore` 확인
- [ ] `git push` 실행

### Vercel 배포
- [ ] Vercel 계정 생성
- [ ] GitHub 저장소 연결
- [ ] 환경 변수 설정
- [ ] 배포 완료!

---

**자세한 가이드**:
- 📖 [설치 가이드](./SETUP_GUIDE.md)
- 📖 [배포 가이드](./DEPLOYMENT.md)

**Happy Coding! 🚀**

