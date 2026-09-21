#!/usr/bin/env python3
# tools/mate-book/pagecrop.py — đọc sơ đồ khi trang PDF không có ảnh nhúng (bàn cờ vẽ
# bằng hàng trăm mảnh line-vector nhỏ, render-diagrams.py không trích được gì hữu ích).
# Thay vào đó: nhận 1 crop thô (chứa TRỌN 1 sơ đồ) cắt từ ảnh full-page hi-res, tự dò
# chính xác 9 đường dọc + 10 đường ngang (nội suy đường bị đứt ở khoảng sông giữa bàn),
# rồi báo darkfrac tại từng giao điểm — thay thế cropauto.py cho loại trang này.
# Cách dùng: python pagecrop.py <rough_crop.png> <out_prefix>
# Output: in danh sách r{row}c{col} darkfrac=... (không tự phân loại màu — xem bằng mắt
# qua ảnh <out_prefix>_r{r}c{c}.png để biết đặc/viền).
import sys
import numpy as np
from PIL import Image

path, prefix = sys.argv[1], sys.argv[2]
im = Image.open(path).convert('RGB')
imL = im.convert('L')
a = np.asarray(imL)
W, H = imL.size
dark = a < 150


def find_lines(proj_axis_fixed_values, length, get_line):
    """Quét nhiều lát cắt sạch (không dính chữ quân) để tìm các cụm điểm tối liên tiếp
    = đường lưới. Trả về danh sách trung tâm các cụm được thấy NHIỀU LẦN nhất."""
    from collections import Counter
    votes = Counter()
    for v in proj_axis_fixed_values:
        line = get_line(v)
        idx = [i for i in range(length) if line[i]]
        if not idx:
            continue
        groups, cur = [], [idx[0]]
        for x in idx[1:]:
            if x - cur[-1] <= 2:
                cur.append(x)
            else:
                groups.append(cur)
                cur = [x]
        groups.append(cur)
        for g in groups:
            votes[round(sum(g) / len(g) / 5) * 5] += 1
    return votes


# 9 đường dọc: quét vài hàng y "sạch" (không có chữ) rải trong nửa trên bàn cờ.
col_votes = find_lines(range(int(H * 0.12), int(H * 0.30), 7), W, lambda y: dark[y, :])
col_centers = sorted([c for c, n in col_votes.items() if n >= 3])
# gộp các đỉnh gần nhau (trong vòng 15px) thành 1
merged = []
for c in col_centers:
    if merged and c - merged[-1] < 15:
        continue
    merged.append(c)
col_centers = merged
if len(col_centers) != 9:
    print(f"WARNING: found {len(col_centers)} vertical lines instead of 9: {col_centers} -- try adjusting crop")

# 10 đường ngang: quét vài cột x "sạch" (không phải cột biên, không dính chữ) —
# dùng cột thứ 2 (giữa c0 và c1) để tránh viền dày ở mép trái.
mid_x = int((col_centers[0] + col_centers[1]) / 2) if len(col_centers) >= 2 else int(W * 0.1)
row_votes = find_lines(range(mid_x - 3, mid_x + 3), H, lambda x: dark[:, x])
row_centers = sorted([r for r, n in row_votes.items() if n >= 3])
merged = []
for r in row_centers:
    if merged and r - merged[-1] < 15:
        continue
    merged.append(r)
row_centers = merged
# Nội suy đường bị mất ở khoảng sông (khoảng cách gấp đôi bình thường)
if len(row_centers) == 9:
    gaps = [row_centers[i + 1] - row_centers[i] for i in range(8)]
    avg = sum(gaps) / len(gaps)
    for i, g in enumerate(gaps):
        if g > avg * 1.6:
            row_centers.insert(i + 1, (row_centers[i] + row_centers[i + 1]) // 2)
            break
if len(row_centers) != 10:
    print(f"WARNING: found {len(row_centers)} horizontal lines instead of 10: {row_centers} -- try adjusting crop")

print(f"cols={col_centers}")
print(f"rows={row_centers}")

cellw = (col_centers[-1] - col_centers[0]) / 8.0
cellh = (row_centers[-1] - row_centers[0]) / 9.0
rad = min(cellw, cellh) * 0.42
S = 4
found = []
for r, ry in enumerate(row_centers):
    for c, cx in enumerate(col_centers):
        xs, xe = max(0, int(cx - rad)), min(W, int(cx + rad))
        ys, ye = max(0, int(ry - rad)), min(H, int(ry + rad))
        patch = dark[ys:ye, xs:xe]
        yy, xx = np.ogrid[ys:ye, xs:xe]
        indisc = np.sqrt((xx - cx) ** 2 + (yy - ry) ** 2) <= rad
        disc = patch[indisc] if indisc.size else np.array([])
        frac = disc.mean() if disc.size else 0
        if frac > 0.15:
            found.append((r, c, frac))
            rad2 = min(cellw, cellh) * 0.48
            xs2, xe2 = max(0, int(cx - rad2)), min(W, int(cx + rad2))
            ys2, ye2 = max(0, int(ry - rad2)), min(H, int(ry + rad2))
            crop = im.crop((xs2, ys2, xe2, ye2)).resize(((xe2 - xs2) * S, (ye2 - ys2) * S))
            crop.save(f"{prefix}_r{r}c{c}.png")

for (r, c, frac) in found:
    print(f"r{r}c{c} darkfrac={frac:.3f}")
