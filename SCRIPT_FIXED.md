# 스크립트 수정 완료

## 문제점

`fix_missing_files.py` 스크립트가 `seoul.html` 같은 단일 지역명 파일을 파싱하지 못했습니다.

## 수정 내용

`parse_filename()` 함수에 단일 지역명 처리 로직을 추가했습니다:

```python
# 단일 지역명 처리 (예: seoul.html -> seoul/)
if len(parts) == 1:
    region = parts[0]
    if region in REGION_MAP:
        return {
            'region': REGION_MAP[region],
            'path_parts': [],
            'original_name': name
        }
```

## 다음 단계

**스크립트를 다시 실행하세요:**

```bash
python fix_missing_files.py
```

이제 `seoul.html` → `seoul/index.html` 같은 단일 지역명 파일도 처리됩니다!

## 예상 결과

- ✅ `seoul.html` → `seoul/index.html` 교체
- ✅ `incheon.html` → `incheon/index.html` 교체
- ✅ 기타 단일 지역명 파일들 교체
