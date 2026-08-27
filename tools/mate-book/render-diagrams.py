#!/usr/bin/env python3
# tools/mate-book/render-diagrams.py — trích sơ đồ bàn cờ (ảnh nhúng) từ 1 trang PDF sát pháp,
# phủ lưới toạ độ (col rank, 0-8 / 0-9) để đọc FEN chính xác. Dùng cho pipeline "mate-book".
# Cách dùng: python render-diagrams.py <pdf> <page_1based> <out_dir>
import sys, pymupdf
from PIL import Image, ImageDraw
import numpy as np

pdf, page1, outdir = sys.argv[1], int(sys.argv[2]), sys.argv[3]
doc = pymupdf.open(pdf)
pg = doc.load_page(page1 - 1)
imgs = pg.get_images(full=True)
print(f"page {page1}: {len(imgs)} images")
for k, img in enumerate(imgs):
    xref = img[0]
    d = doc.extract_image(xref)
    raw = f"{outdir}/pg{page1}-d{k}.{d['ext']}"
    open(raw, "wb").write(d["image"])
    im = Image.open(raw).convert("L")
    W, H = im.size
    a = np.asarray(im)
    dark = a < 110
    cs, rs = dark.sum(0), dark.sum(1)

    def bounds(proj):
        thr = proj.max() * 0.45
        idx = [i for i, v in enumerate(proj) if v >= thr]
        return (idx[0], idx[-1]) if idx else (0, len(proj) - 1)
    x0, x1 = bounds(cs)
    y0, y1 = bounds(rs)
    S = 3
    big = im.convert("RGB").resize((W * S, H * S))
    dr = ImageDraw.Draw(big)
    for c in range(9):
        x = (x0 + (x1 - x0) * c / 8) * S
        for r in range(10):
            y = (y0 + (y1 - y0) * r / 9) * S
            dr.ellipse([x - 3, y - 3, x + 3, y + 3], outline=(255, 0, 0), width=1)
            dr.text((x + 2, y + 2), f"{c}{r}", fill=(0, 0, 255))
    out = f"{outdir}/pg{page1}-d{k}-grid.png"
    big.save(out)
    print(f"  {raw} {W}x{H} -> {out} (bbox x{x0}-{x1} y{y0}-{y1})")
