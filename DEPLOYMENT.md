# Next.js + Vercel 배포 가이드 🚀

## 1. 프로젝트 준비

### 필수 파일 확인

- ✅ `package.json` - 의존성 패키지
- ✅ `next.config.js` - Next.js 설정
- ✅ `tsconfig.json` - TypeScript 설정
- ✅ `app/` - Next.js App Router
- ✅ `lib/` - 유틸리티 함수

## 2. MongoDB Atlas 설정 (무료)

### 2.1 MongoDB Atlas 회원가입

1. https://www.mongodb.com/cloud/atlas/register 접속
2. 무료 계정 생성 (Google 계정으로 간편 가입 가능)
3. "Build a Database" 클릭
4. **M0 (무료)** 플랜 선택
5. 지역: **Seoul (ap-northeast-2)** 선택
6. 클러스터 이름: `massage-cluster` (원하는 이름)

### 2.2 데이터베이스 사용자 생성

1. Security → Database Access
2. "Add New Database User" 클릭
3. Username: `massage-admin` (원하는 이름)
4. Password: **강력한 비밀번호 생성** (복사해두기!)
5. User Privileges: **Read and write to any database**
6. "Add User" 클릭

### 2.3 네트워크 접근 허용

1. Security → Network Access
2. "Add IP Address" 클릭
3. **"Allow Access from Anywhere"** 선택 (0.0.0.0/0)
   - Vercel에서 접근하려면 필수
4. "Confirm" 클릭

### 2.4 연결 문자열 복사

1. Database → Connect
2. "Connect your application" 선택
3. Driver: **Node.js**, Version: **5.5 or later**
4. 연결 문자열 복사:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   ```
5. `<username>`, `<password>` 부분을 실제 값으로 변경
6. `<database>`를 `massage-platform`으로 변경

**예시:**

```
mongodb+srv://massage-admin:MyStr0ngP@ssw0rd@cluster0.abc123.mongodb.net/massage-platform?retryWrites=true&w=majority
```

## 3. GitHub 저장소 생성

### 3.1 GitHub에 코드 업로드

```bash
# Git 초기화
git init

# .gitignore 파일 생성 (중요!)
echo "node_modules
.next
.env.local
.env
.vercel
*.log" > .gitignore

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Next.js + MongoDB massage platform"

# GitHub 저장소 연결 (GitHub에서 새 저장소 생성 후)
git remote add origin https://github.com/your-username/massage-platform.git

# 푸시
git push -u origin main
```

## 4. Vercel 배포

### 4.1 Vercel 회원가입 및 프로젝트 연결

1. https://vercel.com/signup 접속
2. **"Continue with GitHub"** 클릭 (GitHub 계정으로 로그인)
3. "Add New Project" 클릭
4. GitHub 저장소 **"massage-platform"** 선택
5. "Import" 클릭

### 4.2 환경 변수 설정 (매우 중요!)

프로젝트 설정 화면에서 **"Environment Variables"** 섹션:

#### 필수 환경 변수:

```bash
# MongoDB 연결 문자열 (위에서 복사한 것)
MONGODB_URI=mongodb+srv://massage-admin:password@cluster.mongodb.net/massage-platform?retryWrites=true&w=majority

# JWT 비밀키 (랜덤 생성)
JWT_SECRET=your-super-secret-jwt-key-32-characters-long

# NextAuth 비밀키 (랜덤 생성)
NEXTAUTH_SECRET=your-nextauth-secret-32-characters-long

# NextAuth URL (자동으로 설정되지만 명시)
NEXTAUTH_URL=https://your-app-name.vercel.app
```

#### 비밀키 생성 방법:

**방법 1: 온라인 생성기**

- https://www.random.org/strings/
- Length: 32
- Characters: Alphanumeric

**방법 2: 터미널 (Mac/Linux)**

```bash
openssl rand -base64 32
```

**방법 3: Node.js**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4.3 배포 시작

1. 모든 환경 변수 입력 후 **"Deploy"** 클릭
2. 배포 완료까지 약 2-3분 소요
3. 배포 완료 후 도메인 확인:
   - `https://your-app-name.vercel.app`

## 5. 배포 후 확인

### 5.1 API 테스트

브라우저 또는 Postman에서 테스트:

**회원가입 API:**

```bash
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234",
    "name": "테스터"
  }'
```

**로그인 API:**

```bash
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

### 5.2 MongoDB 데이터 확인

1. MongoDB Atlas → Database → Browse Collections
2. `massage-platform` 데이터베이스
3. `users` 컬렉션에서 회원가입된 사용자 확인

## 6. 도메인 연결 (선택사항)

### 6.1 커스텀 도메인 설정

1. Vercel 프로젝트 → Settings → Domains
2. "Add" 클릭
3. 구매한 도메인 입력 (예: `msg1000.com`)
4. DNS 설정:
   - **A 레코드**: `76.76.21.21`
   - **CNAME 레코드**: `cname.vercel-dns.com`

## 7. 업데이트 배포

코드 수정 후 자동 배포:

```bash
# 코드 수정 후
git add .
git commit -m "Update: 기능 추가"
git push

# Vercel이 자동으로 배포 시작!
```

## 8. 환경별 URL

- **개발 환경**: `http://localhost:3000`
- **프리뷰 환경**: `https://massage-platform-git-branch-username.vercel.app`
- **프로덕션 환경**: `https://msg1000.com`

## 9. 모니터링 및 로그

### Vercel 대시보드

- **Analytics**: 방문자 통계
- **Logs**: 실시간 로그 확인
- **Deployments**: 배포 히스토리

### MongoDB Atlas 모니터링

- **Metrics**: 데이터베이스 사용량
- **Performance**: 쿼리 성능
- **Alerts**: 알림 설정

## 10. 비용 (무료 범위)

### Vercel (무료 플랜)

- ✅ 무제한 배포
- ✅ 100GB 대역폭/월
- ✅ 자동 HTTPS
- ✅ 서버리스 함수 (12초 타임아웃)

### MongoDB Atlas (M0 무료 플랜)

- ✅ 512MB 스토리지
- ✅ 공유 RAM
- ✅ 네트워크 전송 무제한

## 11. 문제 해결

### 배포 오류 발생 시

1. Vercel 대시보드 → Deployments → 실패한 배포 클릭
2. "View Function Logs" 확인
3. 환경 변수 재확인

### MongoDB 연결 오류

1. 연결 문자열에 특수문자가 있으면 URL 인코딩 필요
   - 예: `@` → `%40`, `#` → `%23`
2. Network Access에 `0.0.0.0/0` 추가되었는지 확인
3. 데이터베이스 사용자 권한 확인

### API 호출 오류

1. 브라우저 콘솔에서 네트워크 탭 확인
2. CORS 에러: `next.config.js`에서 허용 도메인 추가
3. 인증 에러: JWT 토큰 만료 확인

## 12. 보안 체크리스트

- ✅ `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- ✅ MongoDB 비밀번호가 강력한지 확인
- ✅ JWT_SECRET이 랜덤 생성되었는지 확인
- ✅ API 엔드포인트에 rate limiting 추가 (선택)
- ✅ HTTPS 자동 적용 확인 (Vercel 자동)

## 13. 다음 단계

### SMS 인증 추가 (실제 운영)

1. NAVER Cloud Platform 가입
2. SMS API 키 발급
3. 환경 변수에 추가:
   ```
   SMS_API_KEY=your-key
   SMS_API_SECRET=your-secret
   SMS_SENDER_PHONE=01012345678
   ```

### 본인인증 API 연동

1. NICE 평가정보 또는 PASS 가입
2. 본인인증 API 키 발급
3. 주민번호 검증 로직 교체

---

## 🎉 배포 완료!

이제 전 세계 어디서나 접속 가능한 마사지 플랫폼이 준비되었습니다!

**배포된 사이트**: https://your-app-name.vercel.app

문의: 010-2246-3693
