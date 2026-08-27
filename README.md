# 🎯 마사지천국 - Next.js 풀스택 플랫폼

**Next.js + MongoDB + Vercel** 기반 전국 마사지 업체 검색 및 예약 플랫폼

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

> 💡 **NEW!** 백엔드 기능 완전 구현: 회원가입, 로그인, 휴대폰 인증, 주민번호 인증

## ✨ 주요 기능

### 🔐 완벽한 인증 시스템

- ✅ **성인 인증** (간편인증, 휴대폰, 주민번호)
- ✅ **회원가입/로그인** (JWT 토큰 기반)
- ✅ **비밀번호 암호화** (bcryptjs)
- ✅ **세션 관리** (24시간 유효)

### 📱 휴대폰 인증

- ✅ SMS 인증번호 발송 (실제 API 연동 준비 완료)
- ✅ 3분 타이머
- ✅ 인증번호 검증
- ✅ 중복 번호 체크

### 🆔 주민번호 검증

- ✅ 생년월일 유효성 검사
- ✅ 만 19세 자동 계산
- ✅ 미성년자 자동 차단
- ✅ 성별 판별

### 🔍 업체 검색

- 🔍 **지역별 검색**: 서울, 경기, 인천 등 전국 주요 도시의 구별 검색
- 🏷️ **카테고리 필터**: 태국마사지, 한국마사지, 발마사지, 스파 등으로 필터링
- 📱 **모바일 최적화**: 반응형 웹 디자인으로 모바일에서 최적화된 사용자 경험
- 📞 **원클릭 예약**: 전화번호 연결을 통한 간편한 예약 시스템
- ⭐ **리뷰 시스템**: 평점과 리뷰 수를 통한 업체 정보 제공

## 포함된 지역 및 업체

### 서울 (6개 업체)

- 강남구, 마포구, 송파구, 서대문구, 광진구, 용산구

### 경기 (6개 업체)

- 수원시, 성남시, 의정부시, 안양시, 부천시, 광명시

### 인천 (4개 업체)

- 연수구, 부평구, 남동구

### 기타 지역 (10개 업체)

- 부산, 대구, 광주, 대전, 울산

## 🛠️ 기술 스택

### Frontend

- **Next.js 14** (App Router, TypeScript)
- **React 18** (Server Components)
- **Tailwind CSS** (스타일링)
- **Axios** (HTTP 클라이언트)

### Backend

- **Next.js API Routes** (서버리스 함수)
- **MongoDB** (NoSQL 데이터베이스)
- **JWT** (인증 토큰)
- **bcryptjs** (비밀번호 암호화)

### Deployment

- **Vercel** (호스팅, 자동 배포)
- **MongoDB Atlas** (관리형 DB, 무료)
- **GitHub** (버전 관리)

### Legacy (기존 HTML 버전)

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript**: 바닐라 JS
- **Font Awesome**: 아이콘

## 🚀 빠른 시작

### Option 1: 로컬 개발 (5분)

```bash
# 1. 패키지 설치
npm install

# 2. 환경 변수 설정
cp env.template .env.local
# .env.local 파일 편집 (MongoDB URI 등)

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저 접속
# http://localhost:3000
```

### Option 2: Vercel 원클릭 배포

1. 위의 "Deploy with Vercel" 버튼 클릭
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 배포 완료!

📖 **자세한 가이드**: [QUICKSTART.md](./QUICKSTART.md)

---

## 📁 프로젝트 구조

```
massage-platform/
├── app/                      # Next.js App Router
│   ├── api/                 # 백엔드 API
│   │   ├── auth/           # 회원가입, 로그인, 로그아웃
│   │   └── verification/   # SMS, 주민번호 인증
│   ├── login/              # 로그인 페이지
│   ├── page.tsx            # 메인 페이지
│   └── layout.tsx          # 루트 레이아웃
├── lib/                    # 유틸리티
│   ├── mongodb.ts         # MongoDB 연결
│   ├── auth.ts            # 인증 로직
│   └── models/            # 데이터 모델
├── public/                # 정적 파일
├── .env.local            # 환경 변수 (Git 제외)
├── package.json          # 의존성
└── vercel.json           # Vercel 설정

Legacy Files (기존 HTML 버전):
├── index.html           # 메인 HTML
├── style.css            # CSS
└── script.js            # JavaScript
```

## 주요 특징

### UI/UX

- 여기어때, 야놀자 스타일의 모던한 디자인
- 그라데이션과 카드 기반 레이아웃
- 부드러운 애니메이션과 호버 효과
- 직관적인 네비게이션

### 반응형 디자인

- 모바일 우선 설계
- 다양한 화면 크기에 최적화
- 터치 친화적 인터페이스

### 성능 최적화

- 빠른 로딩 속도 (API 키 없이 URL 방식 사용)
- 효율적인 DOM 조작
- 부드러운 스크롤 애니메이션
- 무한루프 방지 및 메모리 최적화

## 📚 문서 가이드

| 문서                                                     | 내용                  |
| -------------------------------------------------------- | --------------------- |
| [QUICKSTART.md](./QUICKSTART.md)                         | ⚡ 5분 만에 시작하기  |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md)                       | 📖 상세 설치 가이드   |
| [DEPLOYMENT.md](./DEPLOYMENT.md)                         | 🚀 Vercel 배포 가이드 |
| [SHOP_MANAGEMENT_README.md](./SHOP_MANAGEMENT_README.md) | 🏪 업체 관리 가이드   |

---

## 🎯 API 사용 예제

### 회원가입

```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'Password123',
    name: '홍길동',
    phone: '010-1234-5678',
  }),
});
```

### 로그인

```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'Password123',
  }),
});
const { token, user } = await response.json();
```

### SMS 인증

```javascript
// 1. 인증번호 발송
await fetch('/api/verification/send-sms', {
  method: 'POST',
  body: JSON.stringify({ phone: '010-1234-5678' }),
});

// 2. 인증번호 검증
await fetch('/api/verification/verify-sms', {
  method: 'POST',
  body: JSON.stringify({ phone: '010-1234-5678', code: '123456' }),
});
```

---

## 🔐 환경 변수 설정

`.env.local` 파일 필수 항목:

```bash
# MongoDB 연결 (무료 Atlas 사용)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/massage-platform

# JWT 비밀키 (32자 이상 랜덤 문자열)
JWT_SECRET=your-super-secret-jwt-key-change-this

# NextAuth 비밀키
NEXTAUTH_SECRET=your-nextauth-secret-change-this

# 사이트 URL
NEXTAUTH_URL=http://localhost:3000
```

---

## 📊 데이터베이스

### MongoDB Collections

**users** - 회원 정보

- 이메일, 비밀번호(해시), 이름, 전화번호
- 인증 정보 (본인인증 방법, 인증 여부)
- 생성일, 수정일, 마지막 로그인

**verifications** - 인증번호 관리

- 전화번호, 인증번호, 만료시간
- 인증 여부, 생성일

---

## 🌐 배포 URL

- **개발**: http://localhost:3000
- **프로덕션**: https://your-app.vercel.app

---

## 브라우저 지원

- ✅ Chrome (권장)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 모바일 브라우저

---

## 📞 문의

- **전화**: 010-2246-3693
- **GitHub Issues**: [이슈 등록하기](https://github.com/your-username/massage-platform/issues)

---

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

## 🎉 다음 할 일

- [ ] MongoDB Atlas 무료 계정 생성
- [ ] 로컬에서 개발 서버 실행 (`npm run dev`)
- [ ] GitHub 저장소 생성 및 푸시
- [ ] Vercel 배포
- [ ] 실제 SMS API 연동 (선택)
- [ ] 커스텀 도메인 연결 (선택)

**시작하기**: [QUICKSTART.md](./QUICKSTART.md) 📖
