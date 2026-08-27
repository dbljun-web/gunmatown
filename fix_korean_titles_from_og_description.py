#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
title/og:title에 영문 슬러그가 들어간 페이지들을
og:description의 한글 문구를 기반으로 일괄 수정하는 스크립트.

대상:
- 루트 및 public 폴더의 모든 .html 파일
- 현재 <title> 또는 og:title 안에 영문자가 포함되어 있고
- og:description 안에 `BEST 샵 실시간 순위` 패턴이 있는 경우

동작:
- og:description에서 `...BEST 샵 실시간 순위` 앞부분까지 추출
  예) "달성군 설화명곡역 발마사지 BEST 샵 실시간 순위★ ..." ->
      "달성군 설화명곡역 발마사지 BEST 샵"
- 추출한 한글 문구 + " | 지금 가장 핫 업체" 를 새 타이틀로 사용
- <title>, og:title, twitter:title 를 모두 이 값으로 통일
"""

import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


def build_title_from_og_description(desc: str) -> str | None:
    """
    og:description에서 '...BEST 샵 실시간 순위' 앞부분까지를 이용해
    '...BEST 샵 | 지금 가장 핫 업체' 형태의 타이틀을 생성.
    """
    if "BEST 샵" not in desc:
        return None

    # "BEST 샵 실시간 순위" 앞까지 캡처
    m = re.search(r"(.*?BEST 샵)\s*실시간 순위", desc)
    if not m:
        # '실시간 순위'가 없으면 'BEST 샵'까지만 사용
        m = re.search(r"(.*?BEST 샵)", desc)
        if not m:
            return None

    prefix = m.group(1).strip()
    if not prefix:
        return None

    return f"{prefix} | 지금 가장 핫 업체"


def fix_file(path: Path) -> tuple[bool, str]:
    """
    단일 HTML 파일에 대해 title/og:title/twitter:title을 수정.
    """
    try:
        text = path.read_text(encoding="utf-8")
    except Exception as e:
        return False, f"읽기 오류: {e}"

    # 현재 title / og:title
    title_match = re.search(r"<title>(.*?)</title>", text, flags=re.IGNORECASE | re.DOTALL)
    current_title = title_match.group(1).strip() if title_match else ""

    og_title_match = re.search(
        r'<meta\s+property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']',
        text,
        flags=re.IGNORECASE,
    )
    current_og_title = og_title_match.group(1).strip() if og_title_match else ""

    # 영어가 없으면 굳이 손대지 않음 (이미 한글일 가능성 높음)
    if not re.search(r"[A-Za-z]", current_title) and not re.search(r"[A-Za-z]", current_og_title):
        return False, "영문 없음 (스킵)"

    # og:description에서 한글 기준 문구 추출
    og_desc_match = re.search(
        r'<meta\s+property=["\']og:description["\'][^>]*content=["\']([^"\']+)["\']',
        text,
        flags=re.IGNORECASE | re.DOTALL,
    )
    if not og_desc_match:
        return False, "og:description 없음"

    og_desc = og_desc_match.group(1).strip()
    new_title = build_title_from_og_description(og_desc)
    if not new_title:
        return False, "패턴 불일치 (BEST 샵 기반 생성 실패)"

    # 실제 변경할 값이 동일하면 스킵
    if current_title == new_title and current_og_title == new_title:
        return False, "이미 동일 (스킵)"

    # <title> 교체
    text_new = re.sub(
        r"<title>.*?</title>",
        f"<title>{new_title}</title>",
        text,
        flags=re.IGNORECASE | re.DOTALL,
    )

    # og:title 교체 (있을 때만)
    if og_title_match:
        text_new = re.sub(
            r'<meta\s+property=["\']og:title["\'][^>]*content=["\'][^"\']+["\'][^>]*>',
            f'<meta property="og:title" content="{new_title}" />',
            text_new,
            flags=re.IGNORECASE,
        )

    # twitter:title 교체 (있을 때만)
    text_new = re.sub(
        r'<meta\s+name=["\']twitter:title["\'][^>]*content=["\'][^"\']+["\'][^>]*>',
        f'<meta name="twitter:title" content="{new_title}" />',
        text_new,
        flags=re.IGNORECASE,
    )

    try:
        path.write_text(text_new, encoding="utf-8")
    except Exception as e:
        return False, f"쓰기 오류: {e}"

    return True, f"수정: '{current_title[:60]}...' -> '{new_title[:60]}...'"


def main() -> None:
    # 루트 + public 모든 .html
    html_files: list[Path] = list(BASE_DIR.glob("*.html"))
    public_dir = BASE_DIR / "public"
    if public_dir.exists():
        html_files.extend(public_dir.glob("*.html"))

    updated = 0
    skipped = 0
    errors = 0

    print(f"대상 HTML 파일: {len(html_files)}개\n")

    for idx, path in enumerate(html_files, 1):
        ok, msg = fix_file(path)
        if not ok:
            if "스킵" in msg or "영문 없음" in msg or "og:description 없음" in msg or "패턴 불일치" in msg:
                skipped += 1
            else:
                errors += 1
                print(f"[ERROR] {path.name}: {msg}")
        else:
            updated += 1
            if updated <= 20:
                print(f"[OK] {path.name}: {msg}")
            elif updated % 500 == 0:
                print(f"[OK] {updated}개 파일 수정 완료...")

        if idx % 5000 == 0:
            print(f"\n진행 상황: {idx}/{len(html_files)} (수정 {updated}, 스킵 {skipped}, 오류 {errors})\n")

    print("\n=== 처리 결과 ===")
    print(f"수정됨: {updated}개")
    print(f"스킵   : {skipped}개")
    print(f"오류   : {errors}개")


if __name__ == "__main__":
    main()

