# GitHub Pages 커스텀 도메인 설정 가이드

## 현재 상황
- ✅ GitHub Pages 설정: "Deploy from a branch" (root 폴더)
- ✅ 도메인: msg1000.com (도메인닷컴에서 구매)
- ✅ CNAME 파일 생성 완료

## 필요한 설정

### 1. GitHub 저장소 설정

1. **GitHub 저장소** → **Settings** → **Pages**
2. **Custom domain** 섹션에서:
   - 도메인 입력: `msg1000.com`
   - **Save** 클릭
3. **Enforce HTTPS** 옵션 활성화 (SSL 인증서 발급 후)

### 2. DNS 설정 (도메인닷컴)

도메인닷컴 관리 페이지에서 다음 DNS 레코드를 추가하세요:

#### A 레코드 (IPv4)
| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | `185.199.108.153` | 3600 |
| A | @ | `185.199.109.153` | 3600 |
| A | @ | `185.199.110.153` | 3600 |
| A | @ | `185.199.111.153` | 3600 |

#### CNAME 레코드 (www 서브도메인)
| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `your-username.github.io` | 3600 |

**참고:** `your-username`은 실제 GitHub 사용자명으로 변경하세요.

### 3. DNS 전파 확인

DNS 설정 후 전파 시간:
- 최소: 10분
- 최대: 48시간
- 보통: 1-2시간

확인 사이트:
- https://dnschecker.org
- https://www.whatsmydns.net

### 4. SSL 인증서 발급

GitHub Pages가 자동으로 Let's Encrypt SSL 인증서를 발급합니다:
- DNS 설정 완료 후 자동 시작
- 보통 몇 분~몇 시간 소요
- **Enforce HTTPS** 옵션이 활성화되면 완료

## 확인 사항

### ✅ 완료된 작업
- [x] CNAME 파일 생성 (root에 `msg1000.com`)
- [x] GitHub Pages 설정 변경 (Deploy from a branch)

### 🔄 진행 중
- [ ] GitHub Settings에서 Custom domain 설정
- [ ] DNS 레코드 추가 (도메인닷컴)
- [ ] DNS 전파 대기
- [ ] SSL 인증서 발급 대기

## 문제 해결

### 도메인이 연결되지 않을 때

1. **CNAME 파일 확인**
   - root에 `CNAME` 파일이 있는지 확인
   - 내용이 `msg1000.com`인지 확인 (www 없이)

2. **DNS 설정 확인**
   - 도메인닷컴에서 A 레코드 4개가 모두 추가되었는지 확인
   - CNAME 레코드가 올바른지 확인

3. **GitHub Settings 확인**
   - Settings → Pages → Custom domain에 도메인이 등록되었는지 확인
   - 오류 메시지가 있는지 확인

4. **DNS 전파 확인**
   - https://dnschecker.org 에서 전 세계 DNS 전파 상태 확인

### SSL 인증서가 발급되지 않을 때

- DNS 전파가 완료될 때까지 기다리기 (최대 24시간)
- GitHub Settings에서 "Remove" 후 다시 "Save" 시도
- CNAME 파일이 올바른지 확인

## 참고

- GitHub Pages는 무료로 SSL 인증서를 제공합니다
- www와 non-www 모두 지원 가능합니다
- DNS 설정은 도메인 제공업체마다 인터페이스가 다를 수 있습니다
