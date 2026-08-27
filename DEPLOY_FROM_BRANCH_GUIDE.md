# Deploy from a branch 설정 가이드

## 현재 상황
- GitHub Actions로 배포 중이지만 사이트가 제대로 작동하지 않음
- `main/` 폴더 구조로 변경 완료
- "Deploy from a branch"로 변경하려고 함

## 해결 방법

GitHub Pages의 "Deploy from a branch"는 다음 폴더만 지원합니다:
- `/` (root)
- `/docs`

`/main` 폴더는 지원하지 않으므로, 두 가지 옵션이 있습니다:

### 옵션 1: main/ 내용을 root로 이동 (권장)

가장 간단하고 확실한 방법입니다.

1. `main/` 폴더의 모든 내용을 프로젝트 root로 이동
2. GitHub Settings → Pages → Source를 "Deploy from a branch"로 변경
3. Branch: `main`, Folder: `/ (root)` 선택

**장점:**
- 가장 간단하고 확실함
- GitHub Pages 기본 기능 사용
- 추가 설정 불필요

### 옵션 2: main/ 내용을 docs/로 이동

1. `main/` 폴더를 `docs/`로 이름 변경
2. GitHub Settings → Pages → Source를 "Deploy from a branch"로 변경
3. Branch: `main`, Folder: `/docs` 선택

**장점:**
- 폴더 구조 유지
- root에 소스 코드와 분리

### 옵션 3: GitHub Actions 수정 (현재 방식 유지)

GitHub Actions를 수정하여 더 안정적으로 배포:

1. `.nojekyll` 파일을 `main/` 폴더에 추가
2. GitHub Actions 워크플로우 확인 및 수정
3. GitHub Settings → Pages → Source를 "GitHub Actions"로 유지

**장점:**
- `main/` 폴더 구조 유지
- 더 많은 제어 가능

## 추천: 옵션 1 (root로 이동)

가장 확실하고 간단한 방법입니다.
