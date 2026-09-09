#!/usr/bin/env python3
# tools/mate-book/regioncrop.py — đọc sơ đồ nhanh hơn cropauto.py: thay vì crop riêng
# từng ô (20-30 ảnh/sơ đồ), gộp thành 4 vùng phần tư (trên-trái/trên-phải/dưới-trái/dưới-phải,
# có overlap ở giữa) zoom 4x, mỗi vùng thường chứa 5-8 quân — đọc 4 ảnh thay vì 25+.
# Dùng khi sơ đồ không quá dày đặc false-positive (bàn thưa quân, ít nhiễu cung Tướng).
# Cách dùng: python regioncrop.py <diagram.png> <out_prefix>
import sys
import numpy as np
from PIL import Image

path, prefix = sys.argv[1], sys.argv[2]
im = Image.open(path)
imL = im.convert('L')
W, H = imL.size
a = np.asarray(imL)
dark = a < 110
cs, rs = dark.sum(0), dark.sum(1)


def bounds(proj):
    thr = proj.max() * 0.45
    idx = [i for i, v in enumerate(proj) if v >= thr]
    return (idx[0], idx[-1]) if idx else (0, len(proj) - 1)


x0, x1 = bounds(cs)
y0, y1 = bounds(rs)
cellw = (x1 - x0) / 8.0
cellh = (y1 - y0) / 9.0
rad = min(cellw, cellh) * 0.42


def darkfrac(r, c, rd):
    cx = x0 + cellw * c
    cy = y0 + cellh * r
    xs, xe = max(0, int(cx - rd)), min(W, int(cx + rd))
    ys, ye = max(0, int(cy - rd)), min(H, int(cy + rd))
    patch = a[ys:ye, xs:xe]
    yy, xx = np.ogrid[ys:ye, xs:xe]
    indisc = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) <= rd
    disc = patch[indisc]
    return (disc < 110).mean() if disc.size else 0


cells = [(r, c, darkfrac(r, c, rad)) for r in range(10) for c in range(9) if darkfrac(r, c, rad) > 0.20]
print(f"total {len(cells)} cells (darkfrac>0.20)")
for (r, c, df) in cells:
    color = 'B' if df > 0.48 else 'R'
    print(f"  r{r}c{c} color={color} darkfrac={df:.3f}")

regions = {
    'TL': (range(0, 6), range(0, 5)),
    'TR': (range(0, 6), range(4, 9)),
    'BL': (range(4, 10), range(0, 5)),
    'BR': (range(4, 10), range(4, 9)),
}
pad = min(cellw, cellh) * 0.55
S = 4
for name, (rrange, crange) in regions.items():
    sub = [(r, c) for (r, c, df) in cells if r in rrange and c in crange]
    if not sub:
        continue
    xs = min(x0 + cellw * c for r, c in sub) - pad
    xe = max(x0 + cellw * c for r, c in sub) + pad
    ys = min(y0 + cellh * r for r, c in sub) - pad
    ye = max(y0 + cellh * r for r, c in sub) + pad
    xs, ys = max(0, int(xs)), max(0, int(ys))
    xe, ye = min(W, int(xe)), min(H, int(ye))
    crop = im.crop((xs, ys, xe, ye))
    crop = crop.resize((crop.width * S, crop.height * S))
    out = f"{prefix}_{name}.png"
    crop.save(out)
    print(f"{name}: {len(sub)} ô -> {out} ({crop.width}x{crop.height})")
