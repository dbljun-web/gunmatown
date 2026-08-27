# DNS 설정 수정 가이드

## 현재 상황
- GitHub 저장소: `https://kyungrock.github.io/kissbang`
- 목표: `msg1000.com`으로 접근

## DNS 설정 확인 및 수정

### ✅ 이미 올바르게 설정된 것들
1. **A 레코드 4개** - 올바름 (GitHub Pages IP)
2. **NS, SOA 레코드** - 필수이므로 유지
3. **TXT 레코드** - Google Search Console 인증용, 유지

### ⚠️ 수정이 필요한 것

#### www CNAME 레코드 수정

**현재 설정:**
```
www.msg1000.com → kyungrock.github.io
```

**수정 필요:**
```
www.msg1000.com → kyungrock.github.io/kissbang
```

또는 GitHub Pages에서 커스텀 도메인을 사용할 때는:

```
www.msg1000.com → kyungrock.github.io
```

실제로는 두 가지 방법이 있습니다:

### 방법 1: www를 저장소로 직접 연결 (권장하지 않음)
```
www.msg1000.com → kyungrock.github.io/kissbang
```
이 방법은 GitHub Pages의 커스텀 도메인 기능을 사용하지 않습니다.

### 방법 2: www도 루트 도메인과 동일하게 (권장)
```
www.msg1000.com → msg1000.com
```
또는
```
www.msg1000.com → kyungrock.github.io
```

## 실제로 해야 할 일

### 1. GitHub Settings 확인
1. GitHub 저장소 → **Settings** → **Pages**
2. **Custom domain**에 `msg1000.com` 입력
3. **Save** 클릭
4. **Enforce HTTPS** 활성화 (SSL 발급 후)

### 2. www CNAME 수정 (선택사항)

**옵션 A: www를 루트 도메인으로 리다이렉트**
```
Type: CNAME
Host: www
Value: msg1000.com
```

**옵션 B: www도 GitHub Pages로 연결**
```
Type: CNAME
Host: www
Value: kyungrock.github.io
```

**옵션 C: 현재 설정 유지**
현재 `www.msg1000.com → kyungrock.github.io`로 되어 있다면,
GitHub Pages 설정에서 www도 커스텀 도메인으로 추가하면 됩니다.

## 중요 사항

1. **CNAME 파일 확인**
   - root에 `CNAME` 파일이 있어야 함
   - 내용: `msg1000.com` (www 없이)

2. **GitHub Pages 설정**
   - Custom domain에 `msg1000.com` 등록 필수
   - 등록하지 않으면 DNS만으로는 작동하지 않음

3. **DNS 전파 대기**
   - 설정 변경 후 최대 48시간 소요
   - 보통 1-2시간 내 완료

## 확인 방법

1. **DNS 전파 확인**
   - https://dnschecker.org 에서 `msg1000.com` 확인
   - A 레코드가 4개 IP로 전파되었는지 확인

2. **도메인 연결 확인**
   - GitHub Settings → Pages에서 도메인 상태 확인
   - "DNS check" 통과 여부 확인

3. **SSL 인증서 확인**
   - "Enforce HTTPS" 옵션이 활성화되면 SSL 발급 완료
   - 보통 DNS 전파 후 자동 발급
