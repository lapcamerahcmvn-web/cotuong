#!/usr/bin/env python3
# tools/khai-cuoc-bo-cuc/find_boards.py — Tìm sơ đồ bàn cờ trên trang sách scan (ảnh cả trang) và cắt ra PNG.
# Lưới kẻ + quân dính nhau thành một thành phần liên thông lớn (chữ in là mảnh nhỏ) → lấy thành phần có kích thước
# cỡ bàn cờ (rộng 18–45% trang, tỉ lệ cao/rộng 0.95–1.35). Nới thêm biên để lấy trọn quân ở mép.
#   python find_boards.py <page.png> <out_prefix>   → <out_prefix>_0.png … (trên → dưới, trái → phải) + in toạ độ
import sys, cv2, numpy as np

def find(path):
    g = cv2.imdecode(np.fromfile(path, dtype=np.uint8), cv2.IMREAD_GRAYSCALE)
    h, w = g.shape
    bw = (g < 150).astype(np.uint8)
    bw = cv2.dilate(bw, np.ones((3, 3), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(bw)
    out = []
    for i in range(1, n):
        x, y, cw, ch, area = st[i]
        if w * 0.18 <= cw <= w * 0.45 and 0.95 <= ch / cw <= 1.35 and area > cw * ch * 0.04:
            m = int(cw * 0.04)
            out.append((max(x - m, 0), max(y - m, 0), min(x + cw + m, w), min(y + ch + m, h)))
    out.sort(key=lambda b: (round(b[1] / 200), b[0]))
    return g, out

if __name__ == '__main__':
    g, bs = find(sys.argv[1])
    for k, (a, b, c, d) in enumerate(bs):
        cv2.imencode('.png', g[b:d, a:c])[1].tofile(f'{sys.argv[2]}_{k}.png')
        print(k, a, b, c, d)
