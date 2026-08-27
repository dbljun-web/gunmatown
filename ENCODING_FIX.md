# 한글 인코딩 문제 해결 가이드

## 문제 상황

GitHub에서 한글이 깨져 보이는 경우, 파일이 UTF-8 인코딩으로 저장되지 않았거나 Git이 올바르게 처리하지 못하는 경우입니다.

## 해결 방법

### 1. `.gitattributes` 파일 생성 ✅

`.gitattributes` 파일을 생성하여 Git이 모든 텍스트 파일을 올바르게 처리하도록 설정했습니다.

### 2. 기존 파일 재인코딩 (필요한 경우)

이미 커밋된 파일이 잘못된 인코딩으로 저장된 경우, 다음 단계를 따르세요:

#### 방법 A: 에디터에서 재저장 (권장)

1. VS Code 또는 다른 텍스트 에디터 열기
2. 파일을 열고 인코딩 확인 (VS Code: 우측 하단 인코딩 표시)
3. 인코딩이 UTF-8이 아니면:
   - VS Code: `Ctrl+Shift+P` → "Change File Encoding" → "Save with Encoding" → "UTF-8" 선택
   - 다른 에디터: 파일을 UTF-8로 재저장
4. 변경사항 커밋 및 푸시

#### 방법 B: Git에서 파일 재정규화

```bash
# 모든 텍스트 파일 재정규화 (line endings만, 인코딩은 변경 안됨)
git add --renormalize .

# 변경사항 확인
git status

# 커밋
git commit -m "Fix: 파일 인코딩 및 line endings 정규화"

# 푸시
git push
```

### 3. 에디터 설정 확인

#### VS Code 설정

`.vscode/settings.json` 파일에 다음 설정 추가:

```json
{
  "files.encoding": "utf8",
  "files.autoGuessEncoding": false,
  "files.eol": "\n"
}
```

#### Git 설정 (선택사항)

```bash
# Git이 한글 파일명을 올바르게 표시하도록 설정
git config core.quotepath false

# Line ending 자동 변환 비활성화 (이미 .gitattributes에서 처리)
git config core.autocrlf false
```

## 확인 방법

1. GitHub에서 파일 확인
2. 한글이 정상적으로 표시되는지 확인
3. 파일 내용 검색이 정상 작동하는지 확인

## 참고사항

- Git은 파일을 바이트 단위로 저장하므로 인코딩 메타데이터를 저장하지 않습니다
- `.gitattributes` 파일은 line endings와 text 파일 감지만 처리합니다
- 실제 인코딩 변환은 에디터나 다른 도구를 사용해야 합니다
- UTF-8로 저장된 파일은 GitHub에서 정상적으로 표시됩니다

## 문제가 계속되면

1. 특정 파일의 인코딩 확인:
   ```bash
   # Windows PowerShell
   Get-Content "파일명.md" -Encoding UTF8 | Out-File "파일명_utf8.md" -Encoding UTF8
   ```

2. 파일을 UTF-8로 명시적 변환 후 재커밋

3. GitHub에서 Raw 파일 확인 (브라우저 인코딩 자동 감지)

