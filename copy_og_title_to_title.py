#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML 파일들의 og:title 값을 추출하여 <title>에 동일하게 적용하는 스크립트.
og:title의 content 속성 값을 읽어서 <title> 태그에 그대로 복사합니다.

예시:
- og:title: "마사지사이트 - 마사지천국 추천 BEST 샵｜안마·힐링 1위샵 가격·후기"
- title: "마사지사이트 - 마사지천국 추천 BEST 샵｜안마·힐링 1위샵 가격·후기" (동일하게)
"""

import re
import sys
import html
from pathlib import Path


# 경로 설정
script_path = Path(__file__).resolve()
BASE_DIR = script_path.parent


def extract_og_title(content: str) -> str:
    """
    HTML 내용에서 og:title의 content 값을 추출합니다.

    Returns:
        og:title의 content 값, 없으면 None
    """
    # 다양한 형식의 og:title 태그 매칭
    # property="og:title" 또는 property='og:title' 형식 모두 지원
    patterns = [
        # property="og:title" content="값" (표준 형식)
        r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)["\']',
        # content="값" property="og:title" (속성 순서 반대)
        r'<meta\s+content=["\']([^"\']+)["\']\s+property=["\']og:title["\']',
        # property="og:title" ... content="값" (속성 사이 다른 속성 있을 수 있음)
        r'<meta\s+property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']',
        # 더 유연한 패턴: 속성 사이 공백/다른 속성 허용
        r'<meta[^>]*property\s*=\s*["\']og:title["\'][^>]*content\s*=\s*["\']([^"\']+)["\'][^>]*>',
        r'<meta[^>]*content\s*=\s*["\']([^"\']+)["\'][^>]*property\s*=\s*["\']og:title["\'][^>]*>',
        # 닫는 태그가 /> 또는 > 일 수 있음
        r'<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']+)["\'][^>]*/?>',
    ]

    for pattern in patterns:
        match = re.search(pattern, content, flags=re.IGNORECASE | re.DOTALL)
        if match:
            title = match.group(1).strip()
            if title:  # 빈 값이 아닌 경우만 반환
                return title

    return None


def update_title_from_og_title(content: str, og_title_value: str) -> str:
    """
    og:title 값을 사용하여 <title> 태그를 업데이트합니다.

    Args:
        content: HTML 내용
        og_title_value: og:title의 content 값

    Returns:
        업데이트된 HTML 내용
    """
    # <title>...</title> 태그를 og_title_value로 교체
    content = re.sub(
        r"<title>.*?</title>",
        f"<title>{og_title_value}</title>",
        content,
        flags=re.IGNORECASE | re.DOTALL,
    )

    return content


def process_html_file(html_file: Path) -> tuple[bool, str]:
    """
    HTML 파일을 처리하여 og:title 값을 title에 복사합니다.

    Returns:
        (성공 여부, 메시지)
    """
    try:
        # 파일 읽기
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()

        # 빈 파일 스킵
        if not content or len(content.strip()) == 0:
            return True, "빈 파일 (스킵)"

        # og:title 값 추출
        og_title_value = extract_og_title(content)

        if not og_title_value:
            return False, f"og:title을 찾을 수 없습니다"

        # 현재 title 값 확인
        title_match = re.search(r"<title>(.*?)</title>", content, flags=re.IGNORECASE | re.DOTALL)
        current_title = title_match.group(1).strip() if title_match else ""

        # og:title 값을 그대로 사용 (원본 값 유지)
        # HTML 엔티티는 디코딩하되, 특수문자(｜, · 등)는 그대로 유지
        og_title_final = html.unescape(og_title_value).strip()

        # 정확한 비교를 위해 원본 값 직접 비교 (HTML 엔티티만 디코딩)
        current_title_decoded = html.unescape(current_title).strip()
        og_title_decoded = og_title_final.strip()

        # 디버깅: 처음 몇 개 파일의 실제 값 출력
        # 이미 정확히 동일하면 스킵
        if current_title_decoded == og_title_decoded:
            return True, "이미 동일함 (스킵)"

        # 다르면 무조건 업데이트 (디버깅 정보 포함)
        if len(current_title_decoded) > 0 and len(og_title_decoded) > 0:
            # 처음 10개만 상세 로그
            pass

        # title 업데이트 (og:title 원본 값을 그대로 사용)
        new_content = update_title_from_og_title(content, og_title_final)

        # 파일 저장
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(new_content)

        return True, f"업데이트 완료: '{current_title[:50]}...' -> '{og_title_final[:50]}...'"

    except Exception as e:
        return False, f"오류: {str(e)}"


def copy_og_title_to_title():
    """
    루트 디렉토리와 public 폴더의 모든 HTML 파일에서 og:title 값을 title에 복사합니다.
    """
    # 루트 디렉토리의 HTML 파일
    html_files = list(BASE_DIR.glob("*.html"))

    # public 폴더의 HTML 파일도 추가
    public_dir = BASE_DIR / "public"
    if public_dir.exists():
        html_files.extend(list(public_dir.glob("*.html")))

    # index/admin 등은 제외
    exclude = {"index.html", "admin.html"}
    html_files = [f for f in html_files if f.name not in exclude]

    print(f"처리할 HTML 파일: {len(html_files)}개\n")
    print(f"BASE_DIR: {BASE_DIR}\n")

    updated = 0
    skipped = 0
    errors = 0
    no_og_title = 0
    total = len(html_files)
    debug_count = 0

    print("처리 시작...\n")

    for idx, html_file in enumerate(html_files, 1):
        success, message = process_html_file(html_file)

        # 업데이트된 파일의 상세 정보 출력
        if "업데이트 완료" in message:
            # 파일을 다시 읽어서 확인
            try:
                with open(html_file, "r", encoding="utf-8") as f:
                    content_after = f.read()
                og_title_after = extract_og_title(content_after)
                title_match_after = re.search(r"<title>(.*?)</title>", content_after, flags=re.IGNORECASE | re.DOTALL)
                current_title_after = title_match_after.group(1).strip() if title_match_after else ""
                if og_title_after and current_title_after:
                    title_dec = html.unescape(current_title_after).strip()
                    og_dec = html.unescape(og_title_after).strip()
                    if title_dec != og_dec:
                        print(f"  [경고] {html_file.name}: 업데이트 후에도 다름!")
                        print(f"     title: '{title_dec[:80]}'")
                        print(f"     og:title: '{og_dec[:80]}'")
            except:
                pass

        if not success:
            if "og:title을 찾을 수 없습니다" in message:
                no_og_title += 1
                if no_og_title <= 10:  # 처음 10개만 출력
                    print(f"  [WARN] [{idx}/{total}] {html_file.name}: {message}")
                    sys.stdout.flush()
            else:
                errors += 1
                print(f"  [ERROR] [{idx}/{total}] {html_file.name}: {message}")
                sys.stdout.flush()
        else:
            if "스킵" in message:
                skipped += 1
            else:
                updated += 1
                if updated <= 20:  # 처음 20개만 상세 출력
                    print(f"  [OK] [{idx}/{total}] {html_file.name}: {message}")
                    sys.stdout.flush()

        # 진행 상황 출력 (매 1000개마다)
        if idx % 1000 == 0:
            print(f"\n  [진행 상황] {idx}/{total} ({idx*100//total}%) | 업데이트: {updated} | 스킵: {skipped} | og:title 없음: {no_og_title} | 오류: {errors}\n")
            sys.stdout.flush()

    print("\n[처리 결과]")
    print(f"  [OK] 업데이트: {updated}개")
    print(f"  [SKIP] 스킵 (이미 동일): {skipped}개")
    print(f"  [WARN] og:title 없음: {no_og_title}개")
    print(f"  [ERROR] 오류: {errors}개")
    print("\n작업 완료! 모든 HTML 파일의 title이 og:title과 동일하게 설정되었습니다.")


if __name__ == "__main__":
    copy_og_title_to_title()
