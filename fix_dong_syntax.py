#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""dong 필드 문법 오류 수정"""
import sys
import re
import io
from pathlib import Path

# Windows UTF-8 출력 설정
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

SCRIPT_DIR = Path(__file__).parent.absolute()
SHOP_CARD_DATA_FILE = SCRIPT_DIR / 'public' / 'shop-card-data.js'

content = SHOP_CARD_DATA_FILE.read_text(encoding='utf-8')

# dong: \'...',, 패턴을 dong: '...', 로 수정
content = re.sub(r"dong: \\'([^']+)',,", r"dong: '\1',", content)

# dong: \'...', 패턴을 dong: '...', 로 수정 (쉼표 없는 경우)
content = re.sub(r"dong: \\'([^']+)',", r"dong: '\1',", content)

# 중복된 dong 필드 제거 (같은 줄에 두 개 있는 경우)
content = re.sub(r"dong: '([^']+)',\s*dong: '([^']+)',", r"dong: '\1',", content)

SHOP_CARD_DATA_FILE.write_text(content, encoding='utf-8')
print("dong 필드 문법 오류 수정 완료")

