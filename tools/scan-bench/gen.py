# Sinh ảnh bàn cờ thử nghiệm (có đáp án) cho bộ nhận dạng ảnh: nhiều kiểu phần mềm + mô phỏng ảnh chụp.
import json, os, random, math
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONTDIR = os.path.join(HERE, '..', '..', 'public', 'fonts', 'scan')
random.seed(11)

def ttf(name):
    out = os.path.join(HERE, 'img', name + '.ttf')
    os.makedirs(os.path.join(HERE, 'img'), exist_ok=True)
    if not os.path.exists(out):
        f = TTFont(os.path.join(FONTDIR, name + '.woff2')); f.flavor = None; f.save(out)
    return out

FONTS = {k: ttf(k) for k in ['scan-serif', 'scan-sans', 'scan-sc', 'scan-kai']}
TRAD = {'K': '帥', 'A': '仕', 'B': '相', 'N': '傌', 'R': '俥', 'C': '炮', 'P': '兵', 'k': '將', 'a': '士', 'b': '象', 'n': '馬', 'r': '車', 'c': '砲', 'p': '卒'}
SIMP = {'K': '帅', 'A': '仕', 'B': '相', 'N': '马', 'R': '车', 'C': '炮', 'P': '兵', 'k': '将', 'a': '士', 'b': '象', 'n': '马', 'r': '车', 'c': '包', 'p': '卒'}

def load(fen):
    b = [None] * 90
    for r, row in enumerate(fen.split(' ')[0].split('/')):
        f = 0
        for ch in row:
            if ch.isdigit(): f += int(ch)
            else: b[r * 9 + f] = ch; f += 1
    return b

def draw_board(fen, st, cell=60, red_top=False, ui=False, piece_rot=None):
    b = load(fen)
    m = int(cell * 0.75)
    W, H = 8 * cell + 2 * m, 9 * cell + 2 * m
    img = Image.new('RGB', (W, H), st['board'])
    d = ImageDraw.Draw(img)
    X = lambda c: m + c * cell
    Y = lambda r: m + r * cell
    lw = st.get('lw', 2)
    for r in range(10): d.line([X(0), Y(r), X(8), Y(r)], fill=st['line'], width=lw)
    for c in range(9):
        if c in (0, 8): d.line([X(c), Y(0), X(c), Y(9)], fill=st['line'], width=lw)
        else:
            d.line([X(c), Y(0), X(c), Y(4)], fill=st['line'], width=lw); d.line([X(c), Y(5), X(c), Y(9)], fill=st['line'], width=lw)
    for (a, bb) in [((3, 0), (5, 2)), ((5, 0), (3, 2)), ((3, 7), (5, 9)), ((5, 7), (3, 9))]:
        d.line([X(a[0]), Y(a[1]), X(bb[0]), Y(bb[1])], fill=st['line'], width=lw)
    d.rectangle([X(0) - 6, Y(0) - 6, X(8) + 6, Y(9) + 6], outline=st['line'], width=lw + 1)
    font = ImageFont.truetype(FONTS[st['font']], int(cell * 0.56))
    cmap = TTFont(FONTS[st['font']]).getBestCmap()
    alt = ImageFont.truetype(FONTS['scan-sc'], int(cell * 0.56))
    chars = SIMP if st.get('simp') else TRAD
    R = int(cell * 0.45)
    for i, p in enumerate(b):
        if not p: continue
        r, c = divmod(i, 9)
        if red_top: r, c = 9 - r, 8 - c
        cx, cy = X(c), Y(r)
        red = p.isupper()
        if p in 'Xx':
            d.ellipse([cx - R, cy - R, cx + R, cy + R], fill=st['back'], outline=st.get('backline', '#222'), width=2)
            continue
        disc = st['red_disc'] if red else st['black_disc']
        ink = st['red_ink'] if red else st['black_ink']
        d.ellipse([cx - R, cy - R, cx + R, cy + R], fill=disc, outline=ink if st.get('ring', True) else disc, width=3)
        if st.get('ring2', True):
            d.ellipse([cx - R + 5, cy - R + 5, cx + R - 5, cy + R - 5], outline=ink, width=1)
        g = Image.new('RGBA', (2 * R, 2 * R), (0, 0, 0, 0))
        ch = chars[p]
        ImageDraw.Draw(g).text((R, R), ch, font=font if ord(ch) in cmap else alt, fill=ink, anchor='mm')
        ang = 0
        if piece_rot == 'random': ang = random.uniform(0, 360)
        elif (red_top and red) or (st.get('flip_black') and not red and not red_top): ang = 180
        if ang: g = g.rotate(ang, resample=Image.BICUBIC)
        img.paste(g, (cx - R, cy - R), g)
    corners = [(X(0), Y(0)), (X(8), Y(0)), (X(8), Y(9)), (X(0), Y(9))]
    if ui:   # khung giao diện phần mềm bao quanh bàn cờ
        pad_t, pad_l, pad_r, pad_b = 90, 40, 260, 70
        full = Image.new('RGB', (W + pad_l + pad_r, H + pad_t + pad_b), '#2b2f36')
        fd = ImageDraw.Draw(full)
        fd.rectangle([0, 0, full.width, 50], fill='#1d2026')
        sm = ImageFont.truetype(FONTS['scan-sans'], 22)
        for k in range(8): fd.text((W + pad_l + 20, pad_t + k * 40), '炮二平五 馬８進７'[k % 8] * 3, font=sm, fill='#ddd')
        full.paste(img, (pad_l, pad_t))
        corners = [(x + pad_l, y + pad_t) for x, y in corners]
        img = full
    return img, corners

STYLES = {
    'wood-serif': dict(board='#e9cf9c', line='#7c5a2c', font='scan-serif', red_disc='#fbf3df', black_disc='#fbf3df', red_ink='#b3261e', black_ink='#1d1b18', back='#2f6b5e'),
    'app-sans-simp': dict(board='#f3dfb0', line='#8b5a2b', font='scan-sans', simp=True, red_disc='#c62f2f', black_disc='#2d2d2d', red_ink='#ffffff', black_ink='#ffffff', back='#6b4a2a', ring=False, ring2=False),
    'kai-flip': dict(board='#d8b47a', line='#3d2b17', font='scan-kai', red_disc='#f6e7c8', black_disc='#f6e7c8', red_ink='#d0201a', black_ink='#111111', back='#9c3d2a', flip_black=True, lw=1),
    'sc-green': dict(board='#cfe3c4', line='#2f4f3a', font='scan-sc', simp=True, red_disc='#fff8e6', black_disc='#fff8e6', red_ink='#cc1f1f', black_ink='#0e3b2a', back='#3b6e8f'),
}

def photo(img, corners):
    w, h = img.size
    pad = 120
    big = Image.new('RGB', (w + 2 * pad, h + 2 * pad), '#6d6a64'); big.paste(img, (pad, pad))
    src = np.float32([[pad, pad], [w + pad, pad], [w + pad, h + pad], [pad, h + pad]])
    j = lambda: random.uniform(-0.09, 0.09) * w
    dst = np.float32([[pad + j(), pad + j()], [w + pad + j(), pad + j()], [w + pad + j(), h + pad + j()], [pad + j(), h + pad + j()]])
    M = cv2.getPerspectiveTransform(src, dst)
    a = cv2.warpPerspective(np.array(big), M, big.size, borderValue=(109, 106, 100))
    grad = np.linspace(0.75, 1.1, a.shape[1])[None, :, None]
    a = np.clip(a * grad + np.random.normal(0, 7, a.shape), 0, 255).astype(np.uint8)
    out = Image.fromarray(a).filter(ImageFilter.GaussianBlur(1.1))
    pts = np.float32([[x + pad, y + pad] for x, y in corners])[None]
    return out, [[float(x), float(y)] for x, y in cv2.perspectiveTransform(pts, M)[0]]

def coupify(fen):
    # Thế cờ úp: quân ở ô xuất phát còn úp (X/x) xen quân đã lật.
    b = load('xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX')
    rev = list('RRNNBBAACCPPPPP')
    for i in range(90):
        if b[i] in ('X', 'x') and random.random() < 0.35:
            p = random.choice(rev); b[i] = None if random.random() < 0.3 else (p if b[i] == 'X' else p.lower())
    # vài quân đã lật đi lung tung
    for _ in range(4):
        i = random.randrange(27, 63)
        if not b[i]: b[i] = random.choice('RNCPrncp')
    rows = []
    for r in range(10):
        s, e = '', 0
        for c in range(9):
            p = b[r * 9 + c]
            if p is None: e += 1
            else:
                if e: s += str(e); e = 0
                s += p
        rows.append(s + (str(e) if e else ''))
    return '/'.join(rows)

WOOD = ['#e9cc96', '#efd6a8', '#e2bf86', '#f2dcb4', '#dcb47a']
INK_RED = ['#a3171a', '#b8231d', '#8e1414']
INK_BLACK = ['#1c1f1a', '#16301f', '#2a2018']

def draw_real(fen, red_top=False):
    '''Ván cờ THẬT: quân gỗ cùng tông bàn, có độ dày + bóng đổ, đặt lệch giao điểm, chữ khắc xoay tự do.'''
    b = load(fen)
    cell = random.choice([62, 72, 84])
    m = int(cell * 0.9)
    W, H = 8 * cell + 2 * m, 9 * cell + 2 * m
    boardc = random.choice(['#e8c78f', '#e4c389', '#efd3a0', '#d9b67c'])
    img = Image.new('RGB', (W, H), boardc)
    a = np.array(img).astype(np.float32)
    a += np.random.normal(0, 6, a.shape)                                   # vân giấy/gỗ
    a += (np.sin(np.linspace(0, 40, W))[None, :, None] * 5)
    img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(img)
    X = lambda c: m + c * cell
    Y = lambda r: m + r * cell
    line = random.choice(['#4a2e14', '#5a3a1a', '#2e2a26'])
    lw = random.choice([2, 3])
    for r in range(10): d.line([X(0), Y(r), X(8), Y(r)], fill=line, width=lw)
    for c in range(9):
        if c in (0, 8): d.line([X(c), Y(0), X(c), Y(9)], fill=line, width=lw)
        else: d.line([X(c), Y(0), X(c), Y(4)], fill=line, width=lw); d.line([X(c), Y(5), X(c), Y(9)], fill=line, width=lw)
    for (p1, p2) in [((3, 0), (5, 2)), ((5, 0), (3, 2)), ((3, 7), (5, 9)), ((5, 7), (3, 9))]:
        d.line([X(p1[0]), Y(p1[1]), X(p2[0]), Y(p2[1])], fill=line, width=lw)
    d.rectangle([X(0) - 9, Y(0) - 9, X(8) + 9, Y(9) + 9], outline=line, width=lw + 2)
    rv = ImageFont.truetype(os.path.join(HERE, '..', '..', 'public', 'fonts', 'xiangqi-kai.ttf'), int(cell * 0.5))
    d.text((X(2), (Y(4) + Y(5)) / 2), '楚 河', font=rv, fill=line, anchor='mm')
    d.text((X(6), (Y(4) + Y(5)) / 2), '漢 界', font=rv, fill=line, anchor='mm')
    corners = [(X(0), Y(0)), (X(8), Y(0)), (X(8), Y(9)), (X(0), Y(9))]
    fname = random.choice(['scan-kai', 'scan-serif', 'scan-kai'])
    font_cache = {}
    order = sorted([i for i in range(90) if b[i]], key=lambda i: i // 9)   # vẽ hàng trên trước (che khuất tự nhiên)
    thick = int(cell * 0.11)
    for i in order:
        p = b[i]
        r, c = divmod(i, 9)
        if red_top: r, c = 9 - r, 8 - c
        R = int(cell * random.uniform(0.40, 0.47))
        cx = X(c) + random.uniform(-0.2, 0.2) * cell
        cy = Y(r) + random.uniform(-0.2, 0.2) * cell
        face = random.choice(WOOD)
        side = tuple(max(0, int(face[k:k + 2], 16) - 55) for k in (1, 3, 5))
        sh = Image.new('L', (W, H), 0)
        ImageDraw.Draw(sh).ellipse([cx - R + 5, cy - R + thick + 4, cx + R + 5, cy + R + thick + 8], fill=110)
        sh = sh.filter(ImageFilter.GaussianBlur(5))
        img.paste((40, 28, 15), (0, 0), sh)                                   # bóng đổ
        d = ImageDraw.Draw(img)
        d.ellipse([cx - R, cy - R + thick, cx + R, cy + R + thick], fill=side)  # thân quân (độ dày)
        d.ellipse([cx - R, cy - R, cx + R, cy + R], fill=face, outline=tuple(max(0, v - 25) for v in side), width=2)
        if p in 'Xx':
            continue                                                          # mặt sau trơn
        red = p.isupper()
        ink = random.choice(INK_RED if red else INK_BLACK)
        if random.random() < 0.7:
            d.ellipse([cx - R * 0.8, cy - R * 0.8, cx + R * 0.8, cy + R * 0.8], outline=ink, width=2)
        size = int(R * 2 * random.uniform(0.52, 0.62))
        f = font_cache.get(size) or ImageFont.truetype(FONTS[fname], size)
        font_cache[size] = f
        g = Image.new('RGBA', (2 * R, 2 * R), (0, 0, 0, 0))
        ImageDraw.Draw(g).text((R, R), TRAD[p], font=f, fill=ink, anchor='mm')
        g = g.rotate(random.uniform(0, 360), resample=Image.BICUBIC)
        img.paste(g, (int(cx - R), int(cy - R)), g)
    return img, corners

def photo_real(img, corners):
    w, h = img.size
    pad = 160
    bgc = random.choice([(96, 84, 70), (60, 62, 70), (120, 110, 96)])
    big = Image.new('RGB', (w + 2 * pad, h + 2 * pad), bgc); big.paste(img, (pad, pad))
    src = np.float32([[pad, pad], [w + pad, pad], [w + pad, h + pad], [pad, h + pad]])
    j = lambda: random.uniform(-0.13, 0.13) * w
    # chụp nghiêng: cạnh xa hẹp lại
    top = random.uniform(0.04, 0.16) * w
    dst = np.float32([[pad + top + j() * 0.4, pad + j() * 0.5], [w + pad - top + j() * 0.4, pad + j() * 0.5],
                      [w + pad + j() * 0.3, h + pad + j() * 0.3], [pad + j() * 0.3, h + pad + j() * 0.3]])
    M = cv2.getPerspectiveTransform(src, dst)
    ang = random.uniform(-7, 7)
    Rm = cv2.getRotationMatrix2D((big.size[0] / 2, big.size[1] / 2), ang, 1.0)
    M = np.vstack([Rm, [0, 0, 1]]) @ M
    a = cv2.warpPerspective(np.array(big), M, big.size, borderValue=bgc).astype(np.float32)
    yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
    cx, cy = random.uniform(0.2, 0.8) * a.shape[1], random.uniform(0.2, 0.8) * a.shape[0]
    light = 0.78 + 0.32 * np.exp(-(((xx - cx) ** 2 + (yy - cy) ** 2) / (2 * (0.5 * a.shape[1]) ** 2)))
    sx, sy = random.uniform(0.1, 0.9) * a.shape[1], random.uniform(0.1, 0.9) * a.shape[0]
    shade = 1 - 0.28 * np.exp(-(((xx - sx) ** 2) / (2 * (0.12 * a.shape[1]) ** 2) + ((yy - sy) ** 2) / (2 * (0.25 * a.shape[0]) ** 2)))
    a = a * (light * shade)[:, :, None]
    a = np.clip(a + np.random.normal(0, 6, a.shape), 0, 255).astype(np.uint8)
    out = Image.fromarray(a).filter(ImageFilter.GaussianBlur(random.uniform(0.8, 1.6)))
    import io as _io
    buf = _io.BytesIO(); out.save(buf, 'JPEG', quality=random.randint(62, 80)); out = Image.open(buf).convert('RGB')
    pts = np.float32([[x + pad, y + pad] for x, y in corners])[None]
    return out, [[float(x), float(y)] for x, y in cv2.perspectiveTransform(pts, M)[0]]

fens = json.load(open(os.path.join(HERE, 'fens.json')))
fens = ['rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR'] + fens
cases = []
os.makedirs(os.path.join(HERE, 'img'), exist_ok=True)
n = 0
for i, fen in enumerate(fens[:12]):
    for sname in STYLES:
        st = STYLES[sname]
        red_top = sname == 'kai-flip' and i % 2 == 1
        img, corners = draw_board(fen, st, cell=random.choice([44, 56, 68]), red_top=red_top, ui=(sname == 'app-sans-simp'))
        f = f'{n:03d}-{sname}.png'; img.save(os.path.join(HERE, 'img', f)); n += 1
        cases.append(dict(file=f, fen=fen, kind='screen', style=sname, corners=corners, red_top=red_top))
    # ảnh chụp mô phỏng
    img, corners = draw_board(fen, STYLES['wood-serif'], cell=70, piece_rot='random')
    pimg, pc = photo(img, corners)
    f = f'{n:03d}-photo.png'; pimg.save(os.path.join(HERE, 'img', f)); n += 1
    cases.append(dict(file=f, fen=fen, kind='photo', style='photo', corners=pc, red_top=False))
for i in range(6):
    fen = coupify('')
    sname = list(STYLES)[i % 4]
    img, corners = draw_board(fen, STYLES[sname], cell=58)
    f = f'{n:03d}-coup-{sname}.png'; img.save(os.path.join(HERE, 'img', f)); n += 1
    cases.append(dict(file=f, fen=fen, kind='coup', style=sname, corners=corners, red_top=False))
# Ván cờ thật chụp bằng điện thoại (người chơi đặt quân lệch, chữ xoay tự do) — cả cờ úp.
real_fens = fens[:14] + [coupify('') for _ in range(6)]
for i, fen in enumerate(real_fens):
    red_top = i % 4 == 3
    img, corners = draw_real(fen, red_top=red_top)
    pimg, pc = photo_real(img, corners)
    kind = 'real-coup' if 'x' in fen.lower() else 'real'
    f = f'{n:03d}-{kind}.jpg'; pimg.save(os.path.join(HERE, 'img', f), quality=92); n += 1
    cases.append(dict(file=f, fen=fen, kind=kind, style='real', corners=pc, red_top=red_top))
json.dump(cases, open(os.path.join(HERE, 'cases.json'), 'w'), indent=1)
print(len(cases), 'cases')
