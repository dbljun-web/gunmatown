# 배포 문제 해결 가이드

## 현재 상황
- GitHub Actions로 배포 중이지만 사이트가 제대로 작동하지 않음
- "Deploy from a branch"로 변경하려고 함

## 해결 방법

### 방법 1: GitHub Actions 수정 (권장 - main/ 폴더 유지)

현재 GitHub Actions가 제대로 작동하지 않는 이유를 수정합니다.

**수정 사항:**
1. `.nojekyll` 파일을 `main/` 폴더에 추가
2. GitHub Actions 워크플로우 확인

**장점:**
- `main/` 폴더 구조 유지
- 추가 파일 이동 불필요

### 방법 2: Deploy from a branch 사용 (root로 이동)

`main/` 폴더의 내용을 프로젝트 root로 이동합니다.

**단계:**
1. `main/` 폴더의 모든 내용을 root로 수동 이동
2. GitHub Settings → Pages → Source를 "Deploy from a branch"로 변경
3. Branch: `main`, Folder: `/ (root)` 선택

**주의사항:**
- 기존 root 파일들과 충돌할 수 있음
- 백업 필요

### 방법 3: Deploy from a branch 사용 (docs/로 이동)

`main/` 폴더를 `docs/`로 이름 변경합니다.

**단계:**
1. `main/` 폴더를 `docs/`로 이름 변경
2. GitHub Settings → Pages → Source를 "Deploy from a branch"로 변경
3. Branch: `main`, Folder: `/docs` 선택

## 추천: 방법 1 (GitHub Actions 수정)

가장 안전하고 확실한 방법입니다.
