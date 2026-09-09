#!/usr/bin/env python3
# tools/mate-book/cropauto.py — quy trình VÀNG đọc sơ đồ (từ Chương 2 Bài 4 trở đi):
# quét darkfrac cả 90 ô, crop+zoom 4x TỪNG Ô riêng biệt (không đọc tổng thể bằng mắt —
# cách cũ hay nhầm lẫn 2 ô liền kề, nhất là khi 2 quân cùng loại/màu đứng gần nhau).
# Cách dùng: python cropauto.py <diagram.png> <out_prefix>
# Output: <out_prefix>_r{row}c{col}_{B|R}.png cho mỗi ô có quân (B=đặc/Đen, R=viền/Đỏ)
# kèm in ra darkfrac từng ô — Read từng ảnh để xác nhận CHỮ HÁN (binh chủng) rồi dựng FEN.
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


# 0.20 khớp ngưỡng "ô trống" của detect-pieces.py — tránh crop nhầm nhiễu đường kẻ bàn cờ
cells = [(r, c, darkfrac(r, c, rad)) for r in range(10) for c in range(9) if darkfrac(r, c, rad) > 0.20]

rad2 = min(cellw, cellh) * 0.48
for (r, c, df) in cells:
    cx = x0 + cellw * c
    cy = y0 + cellh * r
    xs, xe = max(0, int(cx - rad2)), min(W, int(cx + rad2))
    ys, ye = max(0, int(cy - rad2)), min(H, int(cy + rad2))
    crop = im.crop((xs, ys, xe, ye)).resize(((xe - xs) * 4, (ye - ys) * 4))
    color = 'B' if df > 0.48 else 'R'
    crop.save(f"{prefix}_r{r}c{c}_{color}.png")
    print(f"r{r}c{c} color={color} darkfrac={df:.3f}")
