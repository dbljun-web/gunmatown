# GitHub 저장소 생성 및 푸시 가이드

## 1️⃣ GitHub 저장소 생성

### A. GitHub 웹사이트에서 생성

1. https://github.com 로그인
2. 오른쪽 상단 **"+"** 버튼 클릭
3. **"New repository"** 선택
4. 저장소 정보 입력:
   - **Repository name**: `massage-platform`
   - **Description**: `Next.js + MongoDB 기반 마사지 예약 플랫폼`
   - **Public** 또는 **Private** 선택
   - ⚠️ **"Initialize this repository with:"** 체크 해제 (중요!)
5. **"Create repository"** 클릭

### B. 저장소 URL 복사
```
https://github.com/your-username/massage-platform.git
```

---

## 2️⃣ 로컬 Git 설정

### 프로젝트 폴더에서 터미널 열기

**Windows (PowerShell):**
```powershell
cd C:\Users\USER\OneDrive\Desktop\경락\cursor\massage-a1\massage-a1-main\kissbang
```

**Mac/Linux:**
```bash
cd /path/to/your/project
```

---

## 3️⃣ Git 초기화 및 커밋

```bash
# 1. Git 초기화 (이미 되어있으면 건너뛰기)
git init

# 2. Git 사용자 정보 설정 (처음 한 번만)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. 모든 파일 추가
git add .

# 4. 커밋
git commit -m "Initial commit: Next.js massage platform with auth"

# 5. 메인 브랜치 이름 확인/변경
git branch -M main
```

---

## 4️⃣ GitHub 저장소 연결

```bash
# GitHub 저장소 URL을 원격 저장소로 추가
git remote add origin https://github.com/your-username/massage-platform.git

# 확인
git remote -v
```

**출력 예시:**
```
origin  https://github.com/your-username/massage-platform.git (fetch)
origin  https://github.com/your-username/massage-platform.git (push)
```

---

## 5️⃣ GitHub에 푸시

```bash
# 메인 브랜치에 푸시
git push -u origin main
```

### 인증 방법

#### A. Personal Access Token (권장)
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" 클릭
3. Note: `massage-platform`
4. Expiration: `90 days`
5. Select scopes: `repo` 체크
6. "Generate token" 클릭
7. **토큰 복사** (다시 볼 수 없으니 안전한 곳에 보관!)

푸시 시 비밀번호 대신 **토큰** 입력

#### B. SSH 키 (대안)
```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your.email@example.com"

# 공개키 복사
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys → New SSH key
# 복사한 키 붙여넣기

# 원격 저장소 URL 변경
git remote set-url origin git@github.com:your-username/massage-platform.git
```

---

## 6️⃣ 푸시 성공 확인

### GitHub 웹사이트에서 확인
1. https://github.com/your-username/massage-platform 접속
2. 파일들이 업로드 되었는지 확인:
   - ✅ `app/` 폴더
   - ✅ `lib/` 폴더
   - ✅ `package.json`
   - ✅ `README.md`
   - ✅ `.gitignore`

### ⚠️ 확인할 것
- ❌ `.env.local` 파일이 **없어야 함** (민감 정보!)
- ❌ `node_modules/` 폴더가 **없어야 함** (용량 큼)
- ✅ `.gitignore` 파일이 **있어야 함**

---

## 7️⃣ 이후 업데이트 푸시

코드 수정 후:

```bash
# 1. 변경사항 확인
git status

# 2. 모든 변경사항 추가
git add .

# 3. 커밋 (의미있는 메시지 작성)
git commit -m "Add user profile page"

# 4. 푸시
git push
```

---

## 🚨 문제 해결

### "remote origin already exists" 에러
```bash
# 기존 원격 저장소 제거 후 재추가
git remote remove origin
git remote add origin https://github.com/your-username/massage-platform.git
```

### "Updates were rejected" 에러
```bash
# 원격 저장소의 변경사항을 먼저 가져오기
git pull origin main --rebase
git push -u origin main
```

### ".env.local이 푸시됨" (절대 안 됨!)
```bash
# .gitignore에 추가되었는지 확인
cat .gitignore | grep .env

# .env.local을 Git에서 제거
git rm --cached .env.local
git commit -m "Remove .env.local from git"
git push
```

### 대용량 파일 푸시 에러
```bash
# node_modules가 .gitignore에 있는지 확인
cat .gitignore | grep node_modules

# 캐시 삭제 후 재푸시
git rm -r --cached node_modules
git commit -m "Remove node_modules"
git push
```

---

## 📋 .gitignore 체크리스트

반드시 포함되어야 할 항목:

```
node_modules/
.next/
.env.local
.env
.vercel/
*.log
```

---

## ✅ GitHub 푸시 완료 후

이제 **Vercel 배포**로 넘어가세요!

📖 [DEPLOYMENT.md](./DEPLOYMENT.md) - Vercel 배포 가이드

---

## 🎯 체크리스트

- [ ] GitHub 저장소 생성
- [ ] `.gitignore` 파일 확인
- [ ] Git 초기화 (`git init`)
- [ ] 모든 파일 추가 (`git add .`)
- [ ] 커밋 (`git commit`)
- [ ] 원격 저장소 연결 (`git remote add origin`)
- [ ] 푸시 (`git push -u origin main`)
- [ ] GitHub에서 파일 확인
- [ ] `.env.local`이 푸시 안 됐는지 확인

---

**다음 단계**: [Vercel 배포하기](./DEPLOYMENT.md) 🚀

**문의**: 010-2246-3693

