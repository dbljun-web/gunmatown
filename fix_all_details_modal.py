#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re
from pathlib import Path

DETAILS_MODAL = '''    <!-- 상세 정보 모달 -->
    <div
      id="detailsModal"
      class="modal"
      role="dialog"
      aria-labelledby="detailsModalTitle"
      aria-hidden="true"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="detailsModalTitle">서비스 필터 전체 보기</h2>
          <button
            class="modal-close"
            onclick="closeModal('detailsModal')"
            aria-label="닫기"
          >
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="terms-section">
            <h3>서비스 필터 전체 보기</h3>
            <div class="filter-links-container" style="margin-top: 20px;">
              <p>필터 링크를 생성하는 중...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
'''

OPEN_DETAILS_MODAL_FUNC = '''      function openDetailsModal(event) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }

        const modal = document.getElementById('detailsModal');
        if (!modal) {
          console.error('detailsModal을 찾을 수 없습니다.');
          alert('모달을 찾을 수 없습니다. 페이지를 새로고침해주세요.');
          return;
        }

        if (typeof window.openDetailsModal === 'function' && window.openDetailsModal !== openDetailsModal) {
          window.openDetailsModal(event);
          return;
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
'''

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'id="detailsModal"' in content:
            return 'skip'
        
        modified = False
        
        # 1. detailsModal 추가
        if '</div>\n    </div>\n\n    <script>' in content:
            content = content.replace('</div>\n    </div>\n\n    <script>', 
                                     f'</div>\n    </div>\n\n{DETAILS_MODAL}\n    <script>')
            modified = True
        elif '</div>\n      </div>\n    </div>\n\n    <script>' in content:
            content = content.replace('</div>\n      </div>\n    </div>\n\n    <script>',
                                     f'</div>\n      </div>\n    </div>\n\n{DETAILS_MODAL}\n    <script>')
            modified = True
        elif '</div>\n    </div>\n    <script>' in content:
            content = content.replace('</div>\n    </div>\n    <script>',
                                     f'</div>\n    </div>\n{DETAILS_MODAL}\n    <script>')
            modified = True
        elif '</div>\n    </div>\n\n    </body>' in content:
            content = content.replace('</div>\n    </div>\n\n    </body>',
                                     f'</div>\n    </div>\n\n{DETAILS_MODAL}\n    </body>')
            modified = True
        
        # 2. openDetailsModal 함수 추가
        if 'function openDetailsModal' not in content:
            if 'function closeModal(' in content:
                content = content.replace('function closeModal(',
                                        f'{OPEN_DETAILS_MODAL_FUNC}\n\n      function closeModal(')
                modified = True
            elif 'function openAboutModal(' in content:
                content = content.replace('function openAboutModal(',
                                        f'{OPEN_DETAILS_MODAL_FUNC}\n\n      function openAboutModal(')
                modified = True
            elif 'function shareShop(' in content:
                # shareShop 함수 끝 찾기
                idx = content.find('function shareShop(')
                if idx != -1:
                    brace = 0
                    start = False
                    for i in range(idx, len(content)):
                        if content[i] == '{':
                            brace += 1
                            start = True
                        elif content[i] == '}':
                            brace -= 1
                            if start and brace == 0:
                                content = content[:i+1] + '\n\n' + OPEN_DETAILS_MODAL_FUNC + content[i+1:]
                                modified = True
                                break
        
        # 3. footer 링크 수정
        if 'onclick="openDetailsModal(event)"' not in content:
            # 기존 링크 패턴
            patterns = [
                (r'(<a href="[^"]*-info\.html"[^>]*>)(.*?정보)(</a>)', 
                 r'<a href="#" class="footer-link" onclick="openDetailsModal(event)">\2\3'),
                (r'(<a href="#" class="footer-link"[^>]*>)(.*?정보)(</a>)',
                 lambda m: m.group(0) if 'onclick' in m.group(0) else f'<a href="#" class="footer-link" onclick="openDetailsModal(event)">{m.group(2)}{m.group(3)}')
            ]
            for pattern, repl in patterns:
                new_content = re.sub(pattern, repl, content)
                if new_content != content:
                    content = new_content
                    modified = True
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return 'ok'
        return 'no'
    except Exception as e:
        print(f"ERROR {filepath.name}: {e}")
        return 'err'

def main():
    script_path = Path(__file__).resolve()
    script_dir = script_path.parent
    public_dir = script_dir / 'public'
    
    if not public_dir.exists():
        alt_public = Path('public')
        if alt_public.exists():
            public_dir = alt_public.resolve()
        else:
            print(f"ERROR: public 디렉터리를 찾을 수 없습니다.")
            print(f"  시도한 경로: {public_dir}")
            print(f"  스크립트 위치: {script_dir}")
            return
    
    files = sorted(public_dir.glob('company-*.html'))
    
    stats = {'ok': 0, 'skip': 0, 'no': 0, 'err': 0}
    
    for f in files:
        result = fix_file(f)
        stats[result] = stats.get(result, 0) + 1
        if result == 'ok':
            print(f"OK: {f.name}")
    
    print(f"\n완료: OK={stats['ok']}, SKIP={stats['skip']}, NO={stats['no']}, ERR={stats['err']}")

if __name__ == '__main__':
    main()
