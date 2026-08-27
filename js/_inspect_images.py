# -*- coding: utf-8 -*-
import json
import re
from pathlib import Path

root = Path(r"d:\경락\커서\site setting\msg1000\kissbang-main\kissbang-main")
js = root / "js"
img_dir = root / "images"

premium = json.loads((js / "premium_full.json").read_text(encoding="utf-8"))
usu = json.loads((js / "usu_full.json").read_text(encoding="utf-8"))
src = {str(x["id"]): x for x in premium + usu}

# shop 70 images in source
s = src["70"]
print("SHOP70 title:", s["title"])
print("SHOP70 images field:", s.get("images"))
urls = re.findall(r"https?://[^\s\"'<>]+?\.(?:jpg|jpeg|png|gif|webp)", s.get("content") or "", flags=re.I)
print("content urls:", len(urls))
for u in urls[:15]:
    print(" ", u)

# local files containing 지윤 or 가산
locals_ = [f.name for f in img_dir.iterdir() if f.is_file()]
hits = [n for n in locals_ if "지윤" in n or "가산" in n]
print("local hits:", hits[:20], "count", len(hits))

# sample local names
print("--- samples ---")
for n in locals_[:15]:
    print(n)
