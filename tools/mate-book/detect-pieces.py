#!/usr/bin/env python3
# tools/mate-book/detect-pieces.py — Tự dò quân trên sơ đồ: vị trí (col,rank) + MÀU (đặc=Đen,
# viền=Đỏ) bằng cách lấy mẫu pixel. In lưới + lưu ảnh chú thích để đọc BINH CHỦNG (chữ) nhanh.
# Cách dùng: python detect-pieces.py <diagram.png> [out_annot.png]
import sys
import numpy as np
from PIL import Image, ImageDraw

path = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else path.replace('.png', '-detect.png')
im = Image.open(path).convert('L')
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
cellw = (x1 - x0) / 8.0
cellh = (y1 - y0) / 9.0
rad = min(cellw, cellh) * 0.42        # bán kính quân
inner = min(cellw, cellh) * 0.30       # vành trong (phân biệt đặc/viền)

grid = [['.'] * 9 for _ in range(10)]
detail = []
for r in range(10):
    for c in range(9):
        cx = x0 + cellw * c
        cy = y0 + cellh * r
        # vùng đĩa quân — CẮT theo mép ảnh (quân ở hàng biên vẫn dò được, không bỏ sót)
        xs, xe = max(0, int(cx - rad)), min(W, int(cx + rad))
        ys, ye = max(0, int(cy - rad)), min(H, int(cy + rad))
        if (xe - xs) < rad or (ye - ys) < rad:
            continue
        patch = a[ys:ye, xs:xe]
        # chỉ lấy pixel TRONG đĩa quân (bỏ góc ô + đường kẻ bàn cờ ngoài đĩa)
        yy, xx = np.ogrid[ys:ye, xs:xe]
        indisc = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) <= rad
        disc = patch[indisc]
        darkfrac = (disc < 110).mean() if disc.size else 0
        if darkfrac < 0.20:            # ít mực → ô trống
            continue
        # Quân ĐẶC (nền đen, chữ trắng) → nhiều mực; quân VIỀN (nền trắng) → ít mực.
        # Dùng TỈ LỆ MỰC TOÀN ĐĨA (bền với đường viền bàn cờ ở hàng biên, khác annulus cũ).
        color = 'B' if darkfrac > 0.48 else 'R'   # B=Đen(đặc), R=Đỏ(viền)
        grid[r][c] = '#' if color == 'B' else 'o'
        detail.append((r, c, color))

# in lưới text (col 0-8 trái→phải, rank 0 trên)
print("   " + " ".join(str(c) for c in range(9)))
for r in range(10):
    print(f"{r}: " + "  ".join(grid[r]))
print("\n# = Đen(đặc)  o = Đỏ(viền)   — đọc ảnh để điền binh chủng")
print("pieces:", len(detail))

# ảnh chú thích: viền + nhãn cr + màu
S = 3
big = im.convert('RGB').resize((W * S, H * S))
d = ImageDraw.Draw(big)
for (r, c, col) in detail:
    cx = (x0 + cellw * c) * S
    cy = (y0 + cellh * r) * S
    color = (200, 0, 0) if col == 'R' else (0, 0, 220)
    d.ellipse([cx - rad * S, cy - rad * S, cx + rad * S, cy + rad * S], outline=color, width=3)
    d.text((cx - rad * S, cy - rad * S - 12), f"{c}{r}{col}", fill=color)
big.save(out)
print("annot:", out)
