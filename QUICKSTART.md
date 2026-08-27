# ⚡ 5분 만에 시작하기

## 1️⃣ MongoDB Atlas 무료 계정 생성 (2분)

1. https://www.mongodb.com/cloud/atlas/register 접속
2. **Google 계정으로 로그인**
3. "Build a Database" → **M0 FREE** 선택
4. Provider: **AWS**, Region: **Seoul (ap-northeast-2)**
5. Cluster Name: `Cluster0` (기본값)
6. "Create" 클릭

## 2️⃣ 데이터베이스 사용자 생성 (1분)

1. 왼쪽 메뉴: **Security → Database Access**
2. "Add New Database User" 클릭
3. **Username**: `admin`
4. **Password**: `Admin1234` (또는 강력한 비밀번호)
   - ⚠️ **비밀번호 복사해두기!**
5. User Privileges: **Atlas Admin**
6. "Add User" 클릭

## 3️⃣ 네트워크 접근 허용 (30초)

1. 왼쪽 메뉴: **Security → Network Access**
2. "Add IP Address" 클릭
3. **"ALLOW ACCESS FROM ANYWHERE"** 클릭
4. "Confirm" 클릭

## 4️⃣ 연결 문자열 복사 (30초)

1. 왼쪽 메뉴: **Database**
2. "Connect" 버튼 클릭
3. "Drivers" 선택
4. "Node.js" 선택
5. **연결 문자열 복사**:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<password>`를 실제 비밀번호로 변경
7. 끝에 `/massage-platform` 추가:
   ```
   mongodb+srv://admin:Admin1234@cluster0.xxxxx.mongodb.net/massage-platform?retryWrites=true&w=majority
   ```

## 5️⃣ 로컬 환경 설정 (1분)

### A. 환경 변수 파일 생성

프로젝트 폴더에서:

```bash
# env.template을 .env.local로 복사
cp env.template .env.local
```

### B. .env.local 파일 편집

```bash
# 메모장이나 VS Code로 .env.local 열기
notepad .env.local
# 또는
code .env.local
```

### C. 값 입력

```bash
# MongoDB 연결 문자열 (위에서 복사한 것)
MONGODB_URI=mongodb+srv://admin:Admin1234@cluster0.xxxxx.mongodb.net/massage-platform?retryWrites=true&w=majority

# JWT 비밀키 (아무 문자열이나 32자 이상)
JWT_SECRET=my-super-secret-jwt-key-for-massage-platform-2024

# NextAuth 비밀키 (아무 문자열이나 32자 이상)
NEXTAUTH_SECRET=my-super-secret-nextauth-key-for-massage-2024

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000
```

⚠️ **중요**: `MONGODB_URI`의 `Admin1234`와 `cluster0.xxxxx` 부분을 실제 값으로 변경!

## 6️⃣ 패키지 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## 7️⃣ 브라우저에서 확인

http://localhost:3000 접속!

---

## ✅ 작동 확인

### 1. 성인 인증 모달 표시 확인
- 페이지 접속 시 성인 인증 모달이 자동으로 표시되어야 함

### 2. 로그인 페이지 이동
- http://localhost:3000/login 접속

### 3. 회원가입 테스트
- "회원가입" 탭 클릭
- 정보 입력 후 가입
- 성공 시 "회원가입이 완료되었습니다" 알림

### 4. 로그인 테스트
- "로그인" 탭 클릭
- 가입한 이메일/비밀번호 입력
- 성공 시 메인 페이지로 이동

### 5. MongoDB 데이터 확인
- MongoDB Atlas → Database → Browse Collections
- `massage-platform` 데이터베이스
- `users` 컬렉션에 가입한 사용자 표시

---

## 🚨 문제 해결

### "MONGODB_URI 환경 변수를 설정해주세요" 에러
→ `.env.local` 파일이 프로젝트 루트에 있는지 확인
→ 파일 이름이 정확히 `.env.local`인지 확인 (`.env.txt` 아님!)

### MongoDB 연결 오류
→ 연결 문자열에서 `<password>` 부분을 실제 비밀번호로 변경했는지 확인
→ Network Access에서 `0.0.0.0/0`가 추가되었는지 확인

### 포트 3000이 이미 사용 중
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### 패키지 설치 오류
```bash
# 캐시 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## 🎉 GitHub에 올리기

```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: Next.js massage platform"

# GitHub 저장소 생성 후 연결
git remote add origin https://github.com/your-username/massage-platform.git

# 푸시
git push -u origin main
```

---

## 🌐 Vercel 배포 (3분)

1. https://vercel.com 접속
2. "Continue with GitHub" 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. **환경 변수 설정**:
   - `MONGODB_URI`: (MongoDB 연결 문자열)
   - `JWT_SECRET`: (랜덤 문자열)
   - `NEXTAUTH_SECRET`: (랜덤 문자열)
   - `NEXTAUTH_URL`: `https://your-app.vercel.app`
6. "Deploy" 클릭
7. 완료! 🎉

---

## 📚 더 자세한 가이드

- 📖 [완전한 설치 가이드](./SETUP_GUIDE.md)
- 📖 [상세 배포 가이드](./DEPLOYMENT.md)

---

**문의: 010-2246-3693**

