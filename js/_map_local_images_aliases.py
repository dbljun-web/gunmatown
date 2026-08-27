# -*- coding: utf-8 -*-
"""Manual aliases + soft rematch for leftover local images."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "js" / "shop-card-data.js"
IMG = ROOT / "images"

ALIASES = {
    # shop name compact -> filename
    "강남더라임": "서울_서초_서초동_강남역_더라임.jpg",
    "더라임": "서울_서초_서초동_강남역_더라임.jpg",
    "포인트스파": "송파마사지_모카스파.jpg",
    "루미홈타이": "충북홈타이_충북출장마사지.jpg",
    "물결힐링출장": "제주출장마사지_이쁘니출장.jpg",
    "부산일본인홈케어": "부산출장마사지_부산일본홈케어.jpg",
    "크레파스스웨디시테라피": "경기_김포_구래동_구래역_올래.jpg",
    "꽃스웨디시": "경기_광명_소하동_꽃미녀스웨디시.jpg",
    "공항스웨디시": "연동마사지_프라이빗.jpg",
    "1인샵top": "제주시마사지_a스웨디시.jpg",
    "오예스출장마사지": "출장마사지_쏘핫.jpg",
    "vvip한국인출장": "출장마사지_vip20대힐링_한국홈케어.jpg",
    "vvip도파민출장": "VVIP20대여신한국인홈케어.jpg",
    "24시한국일본출장": "24시한국일본혼혈.jpg",
    "한국힐링손": "한국20대이쁜이.jpg",
    "내상치유전문출장": "20대인스타이쁜이.jpg",
    "훗카이도": "출장마사지_재팬혼혈.jpg",
    "중독출장": "출장마사지_원정녀.jpg",
    "지려따출장": "출장마사지_비키니출장.jpg",
    "오늘밤24시출장": "20대이쁘니탱글출장.jpg",
    "s출장": "출장마사지_슴살화끈색녀.jpg",
}


def compact(s: str) -> str:
    return re.sub(r"[^가-힣A-Za-z0-9]+", "", (s or "").lower())


def seo_alt(shop):
    region = str(shop.get("region") or "").split(",")[0].strip()
    district = str(shop.get("district") or "").strip()
    dong = str(shop.get("dong") or "").strip()
    name = str(shop.get("name") or "").strip()
    parts = [p for p in [region, district, dong, name] if p]
    kind = "출장마사지" if shop.get("type") == "출장마사지" else "마사지"
    return f"{' '.join(parts)} {kind} 업체 사진".strip()


def main():
    text = DATA.read_text(encoding="utf-8")
    shops = json.loads(text[text.index("[") : text.rindex("]") + 1])
    used = set()
    for s in shops:
        for u in s.get("images") or []:
            if str(u).startswith("images/"):
                used.add(Path(str(u)).name)
        if str(s.get("image") or "").startswith("images/"):
            used.add(Path(str(s["image"])).name)

    applied = 0
    for shop in shops:
        key = compact(shop.get("name") or "")
        fname = ALIASES.get(key)
        if not fname:
            continue
        if not (IMG / fname).exists():
            continue
        # allow reuse if already local same file, otherwise only if unused or currently remote
        is_local = str(shop.get("image") or "").startswith("images/")
        if is_local and Path(str(shop["image"])).name == fname:
            continue
        if fname in used and not is_local:
            # still assign if this shop has no local yet
            pass
        if is_local:
            continue
        path = f"images/{fname}"
        imgs = shop.get("images") if isinstance(shop.get("images"), list) else []
        local_imgs = [path] + [x for x in imgs if str(x).startswith("images/") and x != path]
        # also keep unique
        uniq = []
        for x in local_imgs:
            if x not in uniq:
                uniq.append(x)
        shop["image"] = path
        shop["images"] = uniq
        shop["alt"] = seo_alt(shop)
        shop["imageAlts"] = [
            f"{shop['alt']} {i+1}" if i else shop["alt"] for i in range(len(uniq))
        ]
        used.add(fname)
        applied += 1

    # soft match leftovers by last token
    leftovers = [
        p
        for p in IMG.iterdir()
        if p.is_file()
        and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
        and p.name not in used
        and p.name not in {"한국.jpg", "일본.jpg", "중국.jpg", "태국.jpg", "러시아.jpg"}
    ]
    unmatched = [s for s in shops if not str(s.get("image") or "").startswith("images/")]
    for f in leftovers:
        last = compact(f.stem.split("_")[-1])
        if len(last) < 2:
            continue
        best = None
        for s in unmatched:
            nc = compact(s.get("name") or "")
            if last in nc or nc in last:
                best = s
                break
        if not best:
            continue
        path = f"images/{f.name}"
        best["image"] = path
        best["images"] = [path]
        best["alt"] = seo_alt(best)
        best["imageAlts"] = [best["alt"]]
        unmatched.remove(best)
        used.add(f.name)
        applied += 1

    DATA.write_text(
        "window.shopCardData = " + json.dumps(shops, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    local = sum(1 for s in shops if str(s.get("image") or "").startswith("images/"))
    print(f"applied={applied} local={local}/{len(shops)}")


if __name__ == "__main__":
    main()
