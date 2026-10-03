#!/usr/bin/env python3
# tools/trung-cuoc-bao-dien/detect.py — Nhận diện sơ đồ bàn cờ (ảnh render từ PDF sách) → FEN.
#
# Sơ đồ sách là hình vẽ máy (không phải ảnh chụp) nên làm hoàn toàn bằng pixel, không đoán:
#   1. Dò lưới: chiếu các pixel "nét mảnh" (đường kẻ) theo trục X/Y rồi dò (gốc, bước) khớp nhất
#      9 cột × 10 hàng.
#   2. Mỗi giao điểm: quân ĐEN = đĩa tô đặc (tâm tối); quân TRẮNG(đỏ) = có vành tròn khép kín
#      (≥80% góc quét gặp nét tối ở bán kính 0.36–0.50 bước) nhưng tâm sáng; còn lại = trống.
#   3. Binh chủng: cắt chữ trong đĩa (đảo màu với quân Đen), chuẩn hoá 28×28, so láng giềng gần
#      nhất với kho mẫu `templates/` (gán nhãn từ các sơ đồ đã đọc tay + đã được engine xác thực).
#
# Cách dùng:
#   python detect.py <img.png> [--annot out.png] [--json]          → in FEN + bảng độ tin cậy
#   python detect.py --learn <img.png> <FEN>                         → thêm mẫu chữ từ sơ đồ đã biết FEN
# FEN theo quy ước site: hàng 0 = trên (Đen), chữ HOA = Trắng/Đỏ.
import sys, os, json, glob
import numpy as np
import cv2

HERE = os.path.dirname(os.path.abspath(__file__))
TPL_DIR = os.path.join(HERE, 'templates')
DARK = 128
N = 28


def load_gray(path):
    im = cv2.imdecode(np.fromfile(path, dtype=np.uint8), cv2.IMREAD_GRAYSCALE)
    return im


def _runs_mask(mask, axis, minlen):
    """Giữ pixel thuộc đoạn chạy liên tục dài ≥ minlen theo trục (axis=1 ngang, 0 dọc)."""
    k = np.ones((1, minlen), np.uint8) if axis == 1 else np.ones((minlen, 1), np.uint8)
    return cv2.morphologyEx(mask, cv2.MORPH_OPEN, k)


def _fit_axis(proj, n, lo, hi):
    """Tìm (gốc, bước) sao cho tổng proj tại n vạch cách đều là lớn nhất."""
    L = len(proj)
    p = np.maximum(np.maximum(proj, np.roll(proj, 1)), np.roll(proj, -1)).astype(np.float64)
    best = (-1, 0, 0)
    for step in np.arange(lo, hi, 0.25):
        span = step * (n - 1)
        if span >= L:
            break
        o = np.arange(0, L - span - 1, 1.0)
        if not len(o):
            continue
        idx = (o[:, None] + np.arange(n)[None, :] * step).round().astype(int)
        sc = p[idx].sum(1)
        i = int(sc.argmax())
        if sc[i] > best[0]:
            best = (sc[i], o[i], step)
    return best[1], best[2]


def fit_grid(g):
    H, W = g.shape
    dark = (g < DARK).astype(np.uint8)
    s0 = W / 9.6
    # nét mảnh: tối nhưng cách 3px theo phương vuông góc là sáng → loại phần ruột đĩa đen
    up = np.roll(dark, 3, 0); dn = np.roll(dark, -3, 0)
    lf = np.roll(dark, 3, 1); rt = np.roll(dark, -3, 1)
    hthin = dark & ((1 - up) | (1 - dn))
    vthin = dark & ((1 - lf) | (1 - rt))
    hl = _runs_mask(hthin, 1, max(8, int(s0 * 0.33)))
    vl = _runs_mask(vthin, 0, max(8, int(s0 * 0.33)))
    px = vl.sum(0); py = hl.sum(1)
    x0, sx = _fit_axis(px, 9, W / 11.0, W / 8.2)
    y0, sy = _fit_axis(py, 10, sx * 0.75, sx * 1.2)
    return x0, sx, y0, sy


def ring_score(g, cx, cy, s):
    H, W = g.shape
    hits = 0; tot = 0
    for a in np.linspace(0, 2 * np.pi, 72, endpoint=False):
        ca, sa = np.cos(a), np.sin(a)
        hit = False; inside = False
        for r in np.linspace(0.36 * s, 0.50 * s, 10):
            x, y = int(round(cx + r * ca)), int(round(cy + r * sa))
            if 0 <= x < W and 0 <= y < H:
                inside = True
                if g[y, x] < DARK:
                    hit = True; break
        if inside:
            tot += 1; hits += hit
    return hits / tot if tot else 0.0


def annulus_vals(g, cx, cy, s, r_in=0.33, r_out=0.40):
    H, W = g.shape
    ro = r_out * s; ri = r_in * s
    x0, x1 = max(0, int(cx - ro)), min(W, int(cx + ro) + 1)
    y0, y1 = max(0, int(cy - ro)), min(H, int(cy + ro) + 1)
    patch = g[y0:y1, x0:x1].astype(np.float64)
    yy, xx = np.ogrid[y0:y1, x0:x1]
    d2 = (xx - cx) ** 2 + (yy - cy) ** 2
    return patch[(d2 <= ro * ro) & (d2 >= ri * ri)]


def annulus_dark(g, cx, cy, s, r_in=0.33, r_out=0.40):
    """Tỉ lệ pixel tối trong vành khuyên giữa chữ và mép quân: Đen (tô đặc) ≈ 1, Trắng ≈ 0."""
    H, W = g.shape
    ro = r_out * s; ri = r_in * s
    x0, x1 = max(0, int(cx - ro)), min(W, int(cx + ro) + 1)
    y0, y1 = max(0, int(cy - ro)), min(H, int(cy + ro) + 1)
    patch = g[y0:y1, x0:x1].astype(np.float64)
    yy, xx = np.ogrid[y0:y1, x0:x1]
    d2 = (xx - cx) ** 2 + (yy - cy) ** 2
    v = patch[(d2 <= ro * ro) & (d2 >= ri * ri)]
    return (v < DARK).mean() if v.size else 0.0


def glyph(g, cx, cy, s, black):
    H, W = g.shape
    r = 0.34 * s
    x0, x1 = int(cx - r), int(cx + r) + 1
    y0, y1 = int(cy - r), int(cy + r) + 1
    pad = cv2.copyMakeBorder(g, 64, 64, 64, 64, cv2.BORDER_CONSTANT, value=255)
    crop = pad[y0 + 64:y1 + 64, x0 + 64:x1 + 64].copy()
    ink = (crop < DARK).astype(np.uint8)
    if black:
        ink = 1 - ink
    yy, xx = np.ogrid[0:crop.shape[0], 0:crop.shape[1]]
    c = crop.shape[0] / 2.0
    ink[(xx - c) ** 2 + (yy - c) ** 2 > (r * 0.98) ** 2] = 0
    ys, xs = np.nonzero(ink)
    if len(xs) < 8:
        return None
    ink = ink[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = ink.shape
    m = max(h, w)
    sq = np.zeros((m, m), np.uint8)
    sq[(m - h) // 2:(m - h) // 2 + h, (m - w) // 2:(m - w) // 2 + w] = ink
    out = cv2.resize(sq.astype(np.float32), (N, N), interpolation=cv2.INTER_AREA)
    return out


def load_templates():
    T = []
    for f in glob.glob(os.path.join(TPL_DIR, '*.npy')):
        typ = os.path.basename(f)[0]  # R N B A K C P
        T.append((typ, np.load(f)))
    return T


def classify(v, T):
    if v is None or not T:
        return '?', 0.0, 0.0
    a = v.ravel() - v.mean(); na = np.linalg.norm(a) or 1
    best = {}
    for typ, t in T:
        b = t.ravel() - t.mean(); nb = np.linalg.norm(b) or 1
        sc = float(a @ b / (na * nb))
        if sc > best.get(typ, -2):
            best[typ] = sc
    ranked = sorted(best.items(), key=lambda kv: -kv[1])
    top = ranked[0]
    second = ranked[1][1] if len(ranked) > 1 else -1
    return top[0], top[1], top[1] - second


def scan(path):
    g = load_gray(path)
    x0, sx, y0, sy = fit_grid(g)
    s = (sx + sy) / 2
    bg = float(np.median(g))          # nền trắng (~255) hay nền xám (~190, quân Trắng không viền)
    gray_bg = bg < 225
    cells = []
    for r in range(10):
        for c in range(9):
            cx, cy = x0 + c * sx, y0 + r * sy
            fill = annulus_dark(g, cx, cy, s)
            ring = ring_score(g, cx, cy, s)
            if fill > 0.60:
                color = 'b'
            elif ring > 0.80 or (gray_bg and (annulus_vals(g, cx, cy, s) > (bg + 255) / 2).mean() > 0.7):
                color = 'w'
            else:
                continue
            cells.append({'r': r, 'c': c, 'color': color, 'fill': round(fill, 2), 'ring': round(ring, 2),
                          'glyph': glyph(g, cx, cy, s, color == 'b')})
    return g, (x0, sx, y0, sy), cells


def to_fen(grid):
    rows = []
    for r in range(10):
        e = 0; out = ''
        for c in range(9):
            p = grid[r][c]
            if not p:
                e += 1
            else:
                if e: out += str(e); e = 0
                out += p
        if e: out += str(e)
        rows.append(out)
    return '/'.join(rows)


def fen_grid(fen):
    grid = [[None] * 9 for _ in range(10)]
    for r, row in enumerate(fen.split(' ')[0].split('/')):
        c = 0
        for ch in row:
            if ch.isdigit():
                c += int(ch)
            else:
                grid[r][c] = ch; c += 1
    return grid


def detect(path, annot=None):
    g, (x0, sx, y0, sy), cells = scan(path)
    T = load_templates()
    grid = [[None] * 9 for _ in range(10)]
    low = []
    for cl in cells:
        typ, sc, margin = classify(cl['glyph'], T)
        ch = typ.upper() if cl['color'] == 'w' else typ.lower()
        grid[cl['r']][cl['c']] = ch
        cl.update({'type': typ, 'score': round(sc, 3), 'margin': round(margin, 3)})
        if typ == '?' or sc < 0.80 or margin < 0.12:
            low.append(cl)
    fen = to_fen(grid)
    if annot:
        im = cv2.cvtColor(g, cv2.COLOR_GRAY2BGR)
        for r in range(10):
            cv2.line(im, (int(x0), int(y0 + r * sy)), (int(x0 + 8 * sx), int(y0 + r * sy)), (0, 200, 0), 1)
        for c in range(9):
            cv2.line(im, (int(x0 + c * sx), int(y0)), (int(x0 + c * sx), int(y0 + 9 * sy)), (0, 200, 0), 1)
        for cl in cells:
            cx, cy = int(x0 + cl['c'] * sx), int(y0 + cl['r'] * sy)
            col = (0, 0, 255) if cl in low else ((255, 0, 0) if cl['color'] == 'b' else (0, 140, 255))
            ch = grid[cl['r']][cl['c']]
            cv2.putText(im, ch, (cx + int(sx * 0.18), cy - int(sx * 0.2)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, col, 2)
        cv2.imencode('.png', im)[1].tofile(annot)
    return fen, cells, low, (x0, sx, y0, sy)


def learn(path, fen):
    os.makedirs(TPL_DIR, exist_ok=True)
    g, geo, cells = scan(path)
    want = fen_grid(fen)
    got = {(c['r'], c['c']): c for c in cells}
    errs = []
    for r in range(10):
        for c in range(9):
            w = want[r][c]
            cl = got.get((r, c))
            if (w is None) != (cl is None):
                errs.append(f'ô r{r}c{c}: FEN={w} detect={"có quân" if cl else "trống"}')
                continue
            if w and ((w.isupper() and cl['color'] != 'w') or (w.islower() and cl['color'] != 'b')):
                errs.append(f'ô r{r}c{c}: màu lệch FEN={w} detect={cl["color"]}')
    if errs:
        print('KHÔNG học — vị trí/màu lệch với FEN:\n  ' + '\n  '.join(errs))
        return False
    base = os.path.splitext(os.path.basename(path))[0]
    vol = os.path.basename(os.path.dirname(path))
    n = 0
    for cl in cells:
        typ = want[cl['r']][cl['c']].upper()
        if cl['glyph'] is None:
            continue
        np.save(os.path.join(TPL_DIR, f'{typ}_{vol}_{base}_r{cl["r"]}c{cl["c"]}.npy'), cl['glyph'])
        n += 1
    print(f'Đã học {n} mẫu chữ từ {path}')
    return True


if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == '--all':
        # python detect.py --all <thư mục t1|t2>  → ghi fens.json (FEN + ô nghi ngờ) cho mọi sơ đồ
        d = a[1]
        res = {}
        for f in sorted(glob.glob(os.path.join(d, 'p*.png'))):
            try:
                fen, cells, low, geo = detect(f)
                res[os.path.splitext(os.path.basename(f))[0]] = {
                    'fen': fen, 'pieces': len(cells),
                    'low': [{k: v for k, v in c.items() if k != 'glyph'} for c in low]}
            except Exception as e:  # sơ đồ hỏng/khác dạng → ghi lỗi, không dừng cả lô
                res[os.path.splitext(os.path.basename(f))[0]] = {'error': str(e)}
        json.dump(res, open(os.path.join(d, 'fens.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'{len(res)} sơ đồ → {os.path.join(d, "fens.json")}')
        sys.exit(0)
    if a and a[0] == '--learn':
        ok = learn(a[1], a[2])
        sys.exit(0 if ok else 1)
    path = a[0]
    annot = a[a.index('--annot') + 1] if '--annot' in a else None
    fen, cells, low, geo = detect(path, annot)
    if '--json' in a:
        print(json.dumps({'fen': fen, 'low': [{k: v for k, v in c.items() if k != 'glyph'} for c in low],
                          'pieces': len(cells)}, ensure_ascii=False))
    else:
        print(fen)
        print(f'pieces={len(cells)} grid x0={geo[0]:.1f} sx={geo[1]:.2f} y0={geo[2]:.1f} sy={geo[3]:.2f}')
        for c in low:
            print(f'  ? r{c["r"]}c{c["c"]} {c["color"]} type={c["type"]} score={c["score"]} margin={c["margin"]}')
