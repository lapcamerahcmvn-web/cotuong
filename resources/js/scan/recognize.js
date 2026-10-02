// Nhận dạng thế cờ từ ẢNH (ảnh chụp bàn cờ thật hoặc ảnh chụp màn hình phần mềm khác) — chạy hoàn toàn trên
// trình duyệt, không gửi ảnh đi đâu. Các bước:
//   1. detectGrid(): tìm lưới 9×10 trong ảnh chụp màn hình (hồ sơ đường kẻ đều nhau) → 4 góc lưới.
//   2. rectify(): nắn phẳng phối cảnh theo 4 góc (homography) → ảnh bàn cờ vuông vức, mỗi ô S px.
//   3. classify(): ở 90 giao điểm: có quân? quân úp (cờ úp)? màu Đỏ/Đen? binh chủng (so khớp chữ với mẫu
//      dựng từ 4 font, thử nhiều góc xoay) → gán theo ràng buộc luật (số lượng, vị trí hợp lệ).
// Kết quả luôn cần người dùng "thẩm" lại — ô kém chắc chắn được đánh dấu.

export const TYPES = ['K', 'A', 'B', 'N', 'R', 'C', 'P'];
const GLYPHS = { K: '帥帅將将', A: '仕士', B: '相象', N: '馬傌马', R: '車俥车', C: '炮砲包', P: '兵卒' };
const FONTS = [
    { family: 'XqScanSerif', file: 'scan-serif', missing: '帅将' },
    { family: 'XqScanSans', file: 'scan-sans', missing: '帅将' },
    { family: 'XqScanSC', file: 'scan-sc', missing: '' },
    { family: 'XqScanKai', file: 'scan-kai', missing: '' },
];
// Chữ giản thể: phần mềm TQ hay dùng; bộ cờ gỗ ở VN hầu hết phồn thể → ảnh chụp phạt nhẹ.
const SIMPLIFIED = '帅将车马包';
const MAX = { K: 1, A: 2, B: 2, N: 2, R: 2, C: 2, P: 5 };
const N = 20;                 // cạnh ma trận chữ chuẩn hoá
const INNER = 0.34;           // bán kính vùng chữ (theo cạnh ô)
const DISC = 0.44;            // bán kính quân

// ---------------------------------------------------------------- hình học
function solve(A, b) {
    const n = b.length;
    for (let i = 0; i < n; i++) {
        let p = i;
        for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
        [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
        for (let r = i + 1; r < n; r++) {
            const f = A[r][i] / A[i][i];
            for (let c = i; c < n; c++) A[r][c] -= f * A[i][c];
            b[r] -= f * b[i];
        }
    }
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let c = i + 1; c < n; c++) s -= A[i][c] * x[c]; x[i] = s / A[i][i]; }
    return x;
}

/** Ma trận 3×3 biến điểm src → dst (4 cặp điểm). */
export function homography(src, dst) {
    const A = [], b = [];
    for (let i = 0; i < 4; i++) {
        const [x, y] = src[i], [u, v] = dst[i];
        A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
        A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
    }
    const h = solve(A, b);
    return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
}
export const applyH = (H, x, y) => {
    const w = H[6] * x + H[7] * y + H[8];
    return [(H[0] * x + H[1] * y + H[2]) / w, (H[3] * x + H[4] * y + H[5]) / w];
};

/** Nắn bàn cờ: corners = 4 góc lưới [trên-trái, trên-phải, dưới-phải, dưới-trái] (toạ độ ảnh gốc). */
export function rectify(img, corners, S = 40, margin = 0.6) {
    const H = homography([[0, 0], [8, 0], [8, 9], [0, 9]], corners);
    const W = Math.round((8 + 2 * margin) * S), Hh = Math.round((9 + 2 * margin) * S);
    const out = new Uint8ClampedArray(W * Hh * 4);
    const { data, width, height } = img;
    for (let y = 0; y < Hh; y++) {
        for (let x = 0; x < W; x++) {
            const [sx, sy] = applyH(H, x / S - margin, y / S - margin);
            const o = (y * W + x) * 4;
            if (sx < 0 || sy < 0 || sx >= width - 1 || sy >= height - 1) { out[o + 3] = 255; continue; }
            const x0 = sx | 0, y0 = sy | 0, fx = sx - x0, fy = sy - y0;
            const i00 = (y0 * width + x0) * 4, i10 = i00 + 4, i01 = i00 + width * 4, i11 = i01 + 4;
            for (let c = 0; c < 3; c++) {
                out[o + c] = (data[i00 + c] * (1 - fx) + data[i10 + c] * fx) * (1 - fy) + (data[i01 + c] * (1 - fx) + data[i11 + c] * fx) * fy;
            }
            out[o + 3] = 255;
        }
    }
    return { data: out, width: W, height: Hh, S, margin };
}

// ---------------------------------------------------------------- tìm lưới tự động
/**
 * Tìm lưới bàn cờ thẳng (ảnh chụp màn hình / ảnh chụp chính diện): đường kẻ ngang/dọc là các điểm ảnh tối
 * hơn hai bên → cộng theo hàng/cột → tìm 10 hàng + 9 cột cách đều có tổng lớn nhất. Trả null nếu không chắc.
 */
export function detectGrid(img) {
    const scale = Math.min(1, 720 / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
    const g = new Float32Array(w * h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const o = ((Math.min(img.height - 1, Math.round(y / scale)) * img.width) + Math.min(img.width - 1, Math.round(x / scale))) * 4;
        g[y * w + x] = 0.299 * img.data[o] + 0.587 * img.data[o + 1] + 0.114 * img.data[o + 2];
    }
    const best = (dark) => {
        // Điểm "đường kẻ": tối (hoặc sáng) hơn 2 phía. Tổng tiền tố theo hàng/cột để đo độ phủ TRONG phạm vi lưới.
        const hP = new Float32Array(h * (w + 1)), vP = new Float32Array(w * (h + 1));
        const hs = new Float32Array(h), vs = new Float32Array(w);
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
            let lh = 0, lv = 0;
            if (y >= 2 && y < h - 2 && x >= 2 && x < w - 2) {
                const c = g[y * w + x], up = g[(y - 2) * w + x], dn = g[(y + 2) * w + x], lf = g[y * w + x - 2], rt = g[y * w + x + 2];
                const dh = dark ? Math.min(up, dn) - c : c - Math.max(up, dn);
                const dv = dark ? Math.min(lf, rt) - c : c - Math.max(lf, rt);
                lh = dh > 14 ? 1 : 0; lv = dv > 14 ? 1 : 0;
            }
            hP[y * (w + 1) + x + 1] = hP[y * (w + 1) + x] + lh;
            vP[x * (h + 1) + y + 1] = vP[x * (h + 1) + y] + lv;
            hs[y] += lh; vs[x] += lv;
        }
        const rowCov = (y, x0, x1) => {
            let m = 0;
            for (let k = Math.round(y) - 1; k <= Math.round(y) + 1; k++) {
                if (k < 0 || k >= h) continue;
                const a = Math.max(0, Math.round(x0)), b = Math.min(w, Math.round(x1));
                if (b > a) m = Math.max(m, (hP[k * (w + 1) + b] - hP[k * (w + 1) + a]) / (b - a));
            }
            return m;
        };
        const colCov = (x, y0, y1) => {
            let m = 0;
            for (let k = Math.round(x) - 1; k <= Math.round(x) + 1; k++) {
                if (k < 0 || k >= w) continue;
                const a = Math.max(0, Math.round(y0)), b = Math.min(h, Math.round(y1));
                if (b > a) m = Math.max(m, (vP[k * (h + 1) + b] - vP[k * (h + 1) + a]) / (b - a));
            }
            return m;
        };
        const peak = (arr, p) => { const i = Math.round(p); let m = 0; for (let k = i - 1; k <= i + 1; k++) if (k >= 0 && k < arr.length && arr[k] > m) m = arr[k]; return m; };
        const search = (arr, len, lines, minD, maxD) => {
            const cands = [];
            for (let d = minD; d <= maxD; d += 0.25) {
                const top = [];
                for (let o = 0; o + (lines - 1) * d < len; o++) {
                    let s = 0;
                    for (let k = 0; k < lines; k++) s += peak(arr, o + k * d);
                    top.push([s, o]);
                }
                top.sort((x, y) => y[0] - x[0]);
                for (const [sc, o] of top.slice(0, 3)) cands.push({ d, o, s: sc });
            }
            cands.sort((x, y) => y.s - x.s);
            return cands.slice(0, 120);
        };
        const rows = search(hs, h, 10, (0.3 * h) / 9, h / 9);
        const cols = search(vs, w, 9, (0.3 * w) / 8, w / 8);
        let pick = null;
        for (const r of rows) for (const c of cols) {
            const ratio = c.d / r.d;
            if (ratio < 0.82 || ratio > 1.22) continue;
            const x0 = c.o, x1 = c.o + 8 * c.d, y0 = r.o, y1 = r.o + 9 * r.d;
            let sr = 0, sc = 0;
            for (let k = 0; k < 10; k++) sr += Math.min(1, rowCov(y0 + k * r.d, x0, x1));
            // sông: cột giữa bị ngắt ở hàng 4–5 → đo cột trên 2 nửa
            for (let k = 0; k < 9; k++) sc += Math.min(1, (colCov(x0 + k * c.d, y0, y0 + 4 * r.d) + colCov(x0 + k * c.d, y0 + 5 * r.d, y1)) / 2);
            const score = sr / 10 + sc / 9;
            if (!pick || score > pick.sc + 1e-9 || (Math.abs(score - pick.sc) < 0.02 && c.d > pick.c.d)) pick = { sc: score, r, c };
        }
        if (!pick) return null;
        // Tinh chỉnh: vị trí thật của từng đường = trọng tâm độ phủ trong cửa sổ ±0.2 ô, rồi khớp tuyến tính.
        const refine = (n, o, d, cov) => {
            const xs = [], ys = [];
            for (let k = 0; k < n; k++) {
                const c0 = o + k * d;
                let sw = 0, sp = 0;
                for (let t = Math.ceil(c0 - 0.2 * d); t <= Math.floor(c0 + 0.2 * d); t++) { const v = cov(t); if (v > 0.15) { sw += v * v; sp += v * v * t; } }
                if (sw > 0) { xs.push(k); ys.push(sp / sw); }
            }
            if (xs.length < n * 0.6) return { o, d };
            const mx = xs.reduce((a, b) => a + b, 0) / xs.length, my = ys.reduce((a, b) => a + b, 0) / ys.length;
            let num = 0, den = 0;
            for (let i = 0; i < xs.length; i++) { num += (xs[i] - mx) * (ys[i] - my); den += (xs[i] - mx) ** 2; }
            const dd = num / den;
            return Math.abs(dd - d) < 0.1 * d ? { o: my - dd * mx, d: dd } : { o, d };
        };
        const { r, c } = pick;
        const rr = refine(10, r.o, r.d, (t) => (t >= 0 && t < h ? (hP[t * (w + 1) + Math.min(w, Math.round(c.o + 8 * c.d))] - hP[t * (w + 1) + Math.max(0, Math.round(c.o))]) / (8 * c.d) : 0));
        const cc = refine(9, c.o, c.d, (t) => (t >= 0 && t < w ? (vP[t * (h + 1) + Math.min(h, Math.round(r.o + 4 * r.d))] - vP[t * (h + 1) + Math.max(0, Math.round(r.o))]) / (4 * r.d) : 0));
        return { sc: pick.sc, r: { ...r, ...rr }, c: { ...c, ...cc } };
    };
    const a = best(true), b = best(false);
    const p = !b || (a && a.sc >= b.sc) ? a : b;
    if (!p || p.sc < 1.0) return null;   // lưới thật ≥ 1.3; ảnh nghiêng / không phải bàn cờ ≤ 0.6
    const x0 = p.c.o / scale, x1 = (p.c.o + 8 * p.c.d) / scale, y0 = p.r.o / scale, y1 = (p.r.o + 9 * p.r.d) / scale;
    return { corners: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], score: p.sc };
}

// ---------------------------------------------------------------- mẫu chữ
let templatesPromise = null;
/** Dựng ma trận chữ chuẩn hoá cho mọi biến thể chữ × 4 font (tải font subset ~19 KB một lần). */
export function loadTemplates(base = '/fonts/scan/') {
    templatesPromise ??= (async () => {
        await Promise.all(FONTS.map(async (f) => {
            try { const ff = new FontFace(f.family, `url(${base}${f.file}.woff2)`); await ff.load(); document.fonts.add(ff); } catch (e) { /* bỏ qua font lỗi */ }
        }));
        const size = 64, cv = document.createElement('canvas');
        cv.width = cv.height = size;
        const ctx = cv.getContext('2d', { willReadFrequently: true });
        const out = [];
        for (const t of TYPES) {
            for (const ch of GLYPHS[t]) {
                for (const f of FONTS) {
                    if (f.missing.includes(ch)) continue;
                    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
                    ctx.fillStyle = '#000'; ctx.font = `700 ${size * 0.62}px ${f.family}`;
                    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                    ctx.fillText(ch, size / 2, size / 2 + size * 0.03);
                    const d = ctx.getImageData(0, 0, size, size).data;
                    const pts = [];
                    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
                        if (d[(y * size + x) * 4] < 128) pts.push([x - size / 2, y - size / 2]);
                    }
                    if (pts.length < 20) continue;
                    for (let rot = 0; rot < 4; rot++) out.push({ t, ch, rot, v: normalize(pts, rot * Math.PI / 2) });
                }
            }
        }
        return out;
    })();
    return templatesPromise;
}

/**
 * Điểm mực (toạ độ quanh tâm, đơn vị px) → vector N×N theo MẬT ĐỘ PHỦ (trung bình vùng) trong khung bao chữ,
 * làm mờ nhẹ, trừ trung bình, chuẩn hoá độ dài — không phụ thuộc độ phân giải / độ dày nét.
 */
function normalize(pts, angle = 0) {
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const rp = pts.map(([x, y]) => [x * ca - y * sa, x * sa + y * ca]);
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [u, v] of rp) { if (u < minX) minX = u; if (u > maxX) maxX = u; if (v < minY) minY = v; if (v > maxY) maxY = v; }
    // Lưới nhị phân 1px (xoay xong làm tròn 2 phía để không thủng lỗ).
    const gw = Math.ceil(maxX - minX) + 2, gh = Math.ceil(maxY - minY) + 2;
    const grid = new Float32Array(gw * gh);
    for (let i = 0; i < rp.length; i++) {
        const x = rp[i][0] - minX, y = rp[i][1] - minY, w = pts[i][2] ?? 1;
        for (const xx of [Math.floor(x), Math.ceil(x)]) for (const yy of [Math.floor(y), Math.ceil(y)]) { const k = yy * gw + xx; if (w > grid[k]) grid[k] = w; }
    }
    const span = Math.max(gw, gh);
    const ox = (span - gw) / 2, oy = (span - gh) / 2, cell = span / N;
    let m = new Float32Array(N * N);
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
        if (!grid[y * gw + x]) continue;
        const cx = Math.min(N - 1, Math.floor((x + ox) / cell)), cy = Math.min(N - 1, Math.floor((y + oy) / cell));
        m[cy * N + cx] += grid[y * gw + x];
    }
    const area = cell * cell;
    for (let i = 0; i < m.length; i++) m[i] = Math.min(1, m[i] / area);
    const b = new Float32Array(N * N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        let s = 0, c = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const yy = y + dy, xx = x + dx;
            if (yy >= 0 && yy < N && xx >= 0 && xx < N) { const w = dx || dy ? 1 : 2; s += m[yy * N + xx] * w; c += w; }
        }
        b[y * N + x] = s / c;
    }
    m = b;
    let mean = 0; for (const v of m) mean += v; mean /= m.length;
    let nrm = 0; for (let i = 0; i < m.length; i++) { m[i] -= mean; nrm += m[i] * m[i]; }
    nrm = Math.sqrt(nrm) || 1;
    for (let i = 0; i < m.length; i++) m[i] /= nrm;
    return m;
}
const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

// ---------------------------------------------------------------- phân loại
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const median = (arr) => { const s = arr.slice().sort((x, y) => x - y); return s.length ? s[s.length >> 1] : 0; };
const medColor = (px) => [0, 1, 2].map((c) => median(px.map((p) => p[c])));
/** Màu chiếm diện tích lớn nhất (histogram 8 mức/kênh) — mặt quân luôn nhiều hơn nét chữ và viền. */
function dominant(px) {
    const h = new Map();
    for (const p of px) { const k = (p[0] >> 5) * 64 + (p[1] >> 5) * 8 + (p[2] >> 5); const e = h.get(k) || [0, 0, 0, 0]; e[0]++; e[1] += p[0]; e[2] += p[1]; e[3] += p[2]; h.set(k, e); }
    let best = null;
    for (const e of h.values()) if (!best || e[0] > best[0]) best = e;
    return best ? [best[1] / best[0], best[2] / best[0], best[3] / best[0]] : [0, 0, 0];
}
const redness = (c) => (c[0] - (c[1] + c[2]) / 2) / 255;

function otsu(vals) {
    const s = vals.slice().sort((a, b) => a - b);
    let best = s[0], bs = -1;
    for (let i = 1; i < s.length; i++) {
        const a = s.slice(0, i), b = s.slice(i);
        const ma = a.reduce((x, y) => x + y, 0) / a.length, mb = b.reduce((x, y) => x + y, 0) / b.length;
        const v = a.length * b.length * (ma - mb) ** 2;
        if (v > bs) { bs = v; best = (s[i - 1] + s[i]) / 2; }
    }
    return best;
}

/** Ô hợp lệ cho từng binh chủng (bàn đã xoay Đỏ ở dưới). Cờ úp: Sĩ/Tượng/Tốt đã lật đi tự do. */
function legal(t, red, sq, coup) {
    const r = Math.floor(sq / 9), c = sq % 9, rr = red ? r : 9 - r;   // rr: hàng tính từ phía mình (9 = hàng cuối)
    if (t === 'K') return rr >= 7 && c >= 3 && c <= 5;
    if (coup) return true;
    if (t === 'A') return [[7, 3], [7, 5], [8, 4], [9, 3], [9, 5]].some(([a, b]) => a === rr && b === c);
    if (t === 'B') return [[5, 2], [5, 6], [7, 0], [7, 4], [7, 8], [9, 2], [9, 6]].some(([a, b]) => a === rr && b === c);
    if (t === 'P') return rr <= 6 && (rr <= 4 || c % 2 === 0);
    return true;
}
const ROLE = (sq) => {
    const r = Math.floor(sq / 9), c = sq % 9;
    if (r === 0 || r === 9) return 'RNBAKABNR'[c];
    if ((r === 2 || r === 7) && (c === 1 || c === 7)) return 'C';
    if ((r === 3 || r === 6) && c % 2 === 0) return 'P';
    return null;
};


let PN = 24, PBLUR = 1; const PNF = 32, PR = 0.74, PMASK = 0.7;   // lưới mẫu chữ ảnh chụp: PN×PN điểm phủ hình vuông ±PR·bán kính quân

/** Bản đồ mực mềm (0..1) quanh tâm quân, kèm bán kính để lấy mẫu theo toạ độ chuẩn hoá. */
function softMap(pts, inkW, R) {
    const D = Math.ceil(R) * 2 + 3, c = Math.ceil(R) + 1;
    const m = new Float32Array(D * D);
    for (const o of pts) {
        const x = Math.round(o.x) + c, y = Math.round(o.y) + c;
        if (x >= 0 && y >= 0 && x < D && y < D) m[y * D + x] = Math.max(m[y * D + x], inkW(o));
    }
    return inkFrame({ m, D, c, R });
}
/** Trọng tâm (ox, oy) và bán kính quán tính (rms) của mực trong vòng 0.75R — để căn tâm & cỡ chữ. */
function inkFrame(sm) {
    const { m, D, c, R } = sm;
    let sw = 0, sx = 0, sy = 0;
    for (let y = 0; y < D; y++) for (let x = 0; x < D; x++) {
        const w = m[y * D + x];
        if (!w || Math.hypot(x - c, y - c) > 0.75 * R) continue;
        sw += w; sx += w * (x - c); sy += w * (y - c);
    }
    if (!sw) return { ...sm, ox: 0, oy: 0, rms: 0 };
    let ox = sx / sw, oy = sy / sw;
    const sh = Math.hypot(ox, oy), cap = 0.25 * R;
    if (sh > cap) { ox *= cap / sh; oy *= cap / sh; }
    let sr = 0;
    for (let y = 0; y < D; y++) for (let x = 0; x < D; x++) {
        const w = m[y * D + x];
        if (!w || Math.hypot(x - c, y - c) > 0.75 * R) continue;
        sr += w * ((x - c - ox) ** 2 + (y - c - oy) ** 2);
    }
    return { ...sm, ox, oy, rms: Math.sqrt(sr / sw) };
}
/** Lấy mẫu bản đồ mực theo lưới PN×PN đã xoay góc a, co giãn k (cỡ chữ so với quân khác nhau giữa các bộ). */
function polarVec(sm, a, k, n = PN) {
    const { m, D, R } = sm;
    const cxs = sm.c + (sm.ox || 0), cys = sm.c + (sm.oy || 0);
    const ca = Math.cos(a), sa = Math.sin(a), v = new Float32Array(n * n);
    const half = PR * R * k;
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const u = ((i + 0.5) / n * 2 - 1) * half, w = ((j + 0.5) / n * 2 - 1) * half;
        if (Math.hypot(u, w) > PMASK * R) continue;      // bỏ vòng khắc ở rìa quân (cả ảnh lẫn mẫu)
        const x = u * ca - w * sa + cxs, y = u * sa + w * ca + cys;
        const x0 = Math.floor(x), y0 = Math.floor(y);
        if (x0 < 0 || y0 < 0 || x0 >= D - 1 || y0 >= D - 1) continue;
        const fx = x - x0, fy = y - y0, o = y0 * D + x0;
        v[j * n + i] = (m[o] * (1 - fx) + m[o + 1] * fx) * (1 - fy) + (m[o + D] * (1 - fx) + m[o + D + 1] * fx) * fy;
    }
    return finishVec(v, n);
}
function finishVec(v, n, passes = PBLUR) {
    let b = v;
    for (let ps = 0; ps < passes; ps++) b = blurOnce(b, n);
    return normVec(b);
}
function blurOnce(v, n) {
    const b = new Float32Array(n * n);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        let s = 0, c = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
            const yy = y + dy, xx = x + dx;
            if (yy >= 0 && yy < n && xx >= 0 && xx < n) { const w = dx || dy ? 1 : 2; s += v[yy * n + xx] * w; c += w; }
        }
        b[y * n + x] = s / c;
    }
    return b;
}
function normVec(b) {
    let mean = 0; for (const x of b) mean += x; mean /= b.length;
    let nrm = 0; for (let i = 0; i < b.length; i++) { b[i] -= mean; nrm += b[i] * b[i]; }
    if (nrm < 1e-6) return null;
    nrm = Math.sqrt(nrm);
    for (let i = 0; i < b.length; i++) b[i] /= nrm;
    return b;
}
let polarPromise = null;
/** Mẫu chữ cho ảnh chụp: chữ cao ≈ 0.57 đường kính quân, lấy mẫu cùng lưới chuẩn hoá theo bán kính. */
function polarTemplates() {
    polarPromise ??= (async () => {
        await loadTemplates();
        const size = 96, cv = document.createElement('canvas');
        cv.width = cv.height = size;
        const ctx = cv.getContext('2d', { willReadFrequently: true });
        const R = size * 0.46, out = [];
        for (const t of TYPES) for (const ch of GLYPHS[t]) for (const f of FONTS) {
            if (f.missing.includes(ch)) continue;
            ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, size, size);
            ctx.fillStyle = '#000'; ctx.font = `700 ${R * 2 * 0.6}px ${f.family}`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(ch, size / 2, size / 2 + size * 0.02);
            const d = ctx.getImageData(0, 0, size, size).data;
            const m = new Float32Array(size * size);
            for (let i = 0; i < size * size; i++) m[i] = 1 - d[i * 4] / 255;
            const sm = inkFrame({ m, D: size, c: size / 2, R });
            const v = polarVec(sm, 0, 1), vf = polarVec(sm, 0, 1, PNF);
            if (v && vf) out.push({ t, ch, v, vf, rms: sm.rms / R });
        }
        return out;
    })();
    return polarPromise;
}

/** Khớp mặt phẳng z = a + b·x + c·y (bình phương tối thiểu) — mô hình ánh sáng loang trên mặt quân. */
function fitPlane(pts) {
    if (pts.length < 10) return null;
    let n = 0, sx = 0, sy = 0, sz = 0, sxx = 0, syy = 0, sxy = 0, sxz = 0, syz = 0;
    for (const [x, y, z] of pts) { n++; sx += x; sy += y; sz += z; sxx += x * x; syy += y * y; sxy += x * y; sxz += x * z; syz += y * z; }
    const A = [[n, sx, sy], [sx, sxx, sxy], [sy, sxy, syy]], bb = [sz, sxz, syz];
    try { return solve(A, bb); } catch (e) { return null; }
}

/** Ảnh xám + đạo hàm Sobel của ảnh đã nắn (dùng chung cho dò đường tròn mép quân). */
function gradients(rect) {
    const { data, width: W, height: H } = rect;
    const g = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) g[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
    const gx = new Float32Array(W * H), gy = new Float32Array(W * H);
    const mags = [];
    for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        const i = y * W + x;
        const a = g[i - W - 1], b = g[i - W], c = g[i - W + 1], d = g[i - 1], e = g[i + 1], f = g[i + W - 1], h = g[i + W], k = g[i + W + 1];
        gx[i] = (c + 2 * e + k) - (a + 2 * d + f);
        gy[i] = (f + 2 * h + k) - (a + 2 * b + c);
        if ((i & 7) === 0) mags.push(Math.hypot(gx[i], gy[i]));
    }
    mags.sort((p, q) => p - q);
    return { gx, gy, W, H, T: Math.max(40, mags[Math.floor(mags.length * 0.9)] || 40) };
}

/**
 * Đường tròn mép quân tốt nhất quanh giao điểm (cx0, cy0): thử tâm lệch ≤ 0.3 ô, bán kính 0.34–0.5 ô.
 * Điểm = tỉ lệ điểm trên chu vi có biên hướng tâm đủ mạnh (quân: gần như kín chu vi; giao điểm trống:
 * chỉ vài chỗ đường kẻ cắt qua) — trừ nhẹ theo độ lệch tâm.
 */
function bestCircle(G, cx0, cy0, S, dyRange = [-0.3, 0.3]) {
    const { gx, gy, W, H, T } = G;
    const K = 40, cs = [], sn = [];
    for (let k = 0; k < K; k++) { cs.push(Math.cos((2 * Math.PI * k) / K)); sn.push(Math.sin((2 * Math.PI * k) / K)); }
    const thr = 0.3 * T;
    let best = { score: -1, cx: cx0, cy: cy0, r: 0.44 * S, off: 0 };
    const step = 0.05 * S;
    for (let dy = dyRange[0] * S; dy <= dyRange[1] * S + 1e-6; dy += step) for (let dx = -0.3 * S; dx <= 0.3 * S + 1e-6; dx += step) {
        const off = Math.hypot(dx, dy) / S;
        if (off > 0.32) continue;
        const cx = cx0 + dx, cy = cy0 + dy;
        for (let r = 0.34 * S; r <= 0.5 * S + 1e-6; r += 0.02 * S) {
            let hit = 0, gap = 0, run = 0, first = -1;
            for (let k = 0; k < K; k++) {
                const x = Math.round(cx + r * cs[k]), y = Math.round(cy + r * sn[k]);
                let on = false;
                if (x >= 1 && y >= 1 && x < W - 1 && y < H - 1) {
                    // lấy biên mạnh nhất trong ±1px theo hướng bán kính (mép quân hơi mờ)
                    let m = 0;
                    for (let t = -1; t <= 1; t++) {
                        const i = (y + Math.round(t * sn[k])) * W + x + Math.round(t * cs[k]);
                        const v = Math.abs(gx[i] * cs[k] + gy[i] * sn[k]);
                        if (v > m) m = v;
                    }
                    on = m > thr;
                }
                if (on) { hit++; if (first < 0) first = run; run = 0; } else { run++; if (run > gap) gap = run; }
            }
            if (first >= 0 && run + first > gap) gap = run + first;   // khoảng hở vòng qua điểm đầu
            const score = hit / K - 0.25 * off - 0.02 * Math.max(0, gap - 5);
            if (score > best.score) best = { score, cx, cy, r, off, hit: hit / K };
        }
    }
    // Vòng khắc bên trong quân cũng là đường tròn đậm → tại tâm đã chọn, lấy bán kính LỚN NHẤT còn biên
    // mạnh (≥ 85% điểm tốt nhất) = mép ngoài quân, để cắt chữ đúng tỉ lệ.
    const hitAt = (r) => {
        let hit = 0;
        for (let k = 0; k < K; k++) {
            const x = Math.round(best.cx + r * cs[k]), y = Math.round(best.cy + r * sn[k]);
            if (x < 1 || y < 1 || x >= W - 1 || y >= H - 1) continue;
            let m = 0;
            for (let t = -1; t <= 1; t++) { const i = (y + Math.round(t * sn[k])) * W + x + Math.round(t * cs[k]); const v = Math.abs(gx[i] * cs[k] + gy[i] * sn[k]); if (v > m) m = v; }
            if (m > thr) hit++;
        }
        return hit / K;
    };
    for (let r = 0.52 * S; r > best.r; r -= 0.01 * S) {
        if (hitAt(r) >= 0.85 * best.hit) { best.r = r; break; }
    }
    return best;
}

/** Bỏ thành phần liên thông dạng cung tròn mỏng (viền quân): nằm xa tâm, dày < 0.1 ô, phủ góc ≥ 50°. */
function stripRings(ink, S) {
    const key = (x, y) => (Math.round(y) + 200) * 1000 + Math.round(x) + 200;
    const map = new Map(ink.map((o) => [key(o.x, o.y), o]));
    const seen = new Set(), keep = [];
    for (const o of ink) {
        const k0 = key(o.x, o.y);
        if (seen.has(k0)) continue;
        const comp = [], stack = [o];
        seen.add(k0);
        while (stack.length) {
            const c = stack.pop();
            comp.push(c);
            for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
                const k = key(c.x + dx, c.y + dy);
                if (!seen.has(k) && map.has(k)) { seen.add(k); stack.push(map.get(k)); }
            }
        }
        let minR = Infinity, maxR = 0;
        const bins = new Set();
        for (const c of comp) { if (c.d < minR) minR = c.d; if (c.d > maxR) maxR = c.d; bins.add(Math.floor((Math.atan2(c.y, c.x) + Math.PI) / (Math.PI / 18))); }
        const ring = minR > 0.24 * S && (maxR - minR) < 0.1 * S && bins.size >= 5;
        const speck = comp.length < 3;
        if (!ring && !speck) keep.push(...comp);
    }
    return keep;
}

/** Thuật toán Hungarian: cost n×m (n ≤ m) → mảng cột được chọn cho từng hàng (tổng chi phí nhỏ nhất). */
function hungarian(cost) {
    const n = cost.length, m = n ? cost[0].length : 0;
    if (!n) return [];
    const INF = 1e9, u = new Array(n + 1).fill(0), v = new Array(m + 1).fill(0), p = new Array(m + 1).fill(0), way = new Array(m + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        p[0] = i;
        let j0 = 0;
        const minv = new Array(m + 1).fill(INF), used = new Array(m + 1).fill(false);
        do {
            used[j0] = true;
            const i0 = p[j0];
            let delta = INF, j1 = 0;
            for (let j = 1; j <= m; j++) if (!used[j]) {
                const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
                if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
                if (minv[j] < delta) { delta = minv[j]; j1 = j; }
            }
            for (let j = 0; j <= m; j++) {
                if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
            }
            j0 = j1;
        } while (p[j0] !== 0);
        do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
    }
    const ans = new Array(n);
    for (let j = 1; j <= m; j++) if (p[j]) ans[p[j] - 1] = j - 1;
    return ans;
}

/**
 * Phân loại 90 giao điểm trên ảnh đã nắn. Trả { board: [90] (ký tự quân | 'X'/'x' | null),
 * conf: [90] (0..1), flipped, coup, warnings[] }.
 */
export async function classify(rect, opts = {}) {
    const { data, width, S, margin } = rect;
    const px = (x, y) => { const o = ((y | 0) * width + (x | 0)) * 4; return [data[o], data[o + 1], data[o + 2]]; };
    // Màu nền bàn cờ: giữa các ô (luôn trống), bỏ hàng sông.
    const bgSamples = [];
    for (let v = 0; v < 9; v++) for (let u = 0; u < 8; u++) {
        if (v === 4) continue;
        bgSamples.push(px((u + 0.72 + margin) * S, (v + 0.58 + margin) * S));
    }
    const bg = medColor(bgSamples);

    // Nền cục bộ: trung vị 4 tâm ô quanh giao điểm (ảnh chụp thật sáng tối không đều).
    const cellBg = (u, v) => {
        const ss = [];
        for (const [du, dv] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) {
            const uu = u + du, vv = v + dv;
            if (uu < 0 || uu > 8 || vv < 0 || vv > 9 || (vv > 4 && vv < 5)) continue;
            ss.push(px((uu + 0.22 + margin) * S, (vv + 0.08 + margin) * S));   // lệch khỏi tâm ô: đường chéo cung đi qua tâm
        }
        if (!ss.length) return bg;
        const m = medColor(ss);
        return dist(m, bg) < 90 ? m : bg;   // tâm ô bị quân to che → dùng nền chung
    };
    const feats = [];
    for (let sq = 0; sq < 90; sq++) {
        const u = sq % 9, v = Math.floor(sq / 9);
        const cx = (u + margin) * S, cy = (v + margin) * S;
        const lb = cellBg(u, v);
        const ann = [], all = [];
        const R = DISC * S;
        for (let y = Math.floor(cy - R); y <= cy + R; y++) for (let x = Math.floor(cx - R); x <= cx + R; x++) {
            const d = Math.hypot(x - cx, y - cy);
            if (d > R) continue;
            const p = px(x, y);
            if (d >= 0.30 * S) ann.push(p);
            all.push({ p, x: x - cx, y: y - cy, d });
        }
        // Độ phủ theo góc: quân cờ khác nền ở MỌI hướng; giao điểm trống chỉ khác nền dọc vài đường kẻ.
        const ang = new Array(36).fill(0).map(() => [0, 0]);
        for (const o of all) {
            if (o.d < 0.30 * S) continue;
            const k = Math.min(35, Math.floor((Math.atan2(o.y, o.x) + Math.PI) / (Math.PI / 18)));
            ang[k][0]++; if (dist(o.p, lb) > 45) ang[k][1]++;
        }
        const off = ang.filter(([n, m]) => n && m / n > 0.5).length / 36;
        feats.push({ sq, off, ann, all, lb });
    }
    const warnings = [];
    let pieces;
    let thr = Math.max(0.45, Math.min(0.7, otsu(feats.map((f) => f.off))));
    if (opts.photo) {
        // Ảnh chụp ván thật: quân gỗ cùng tông bàn → dò ĐƯỜNG TRÒN MÉP QUÂN quanh mỗi giao điểm (cho phép lệch
        // 0.3 ô vì người chơi đặt quân không ngay ngắn): biên sáng/tối chạy liền quanh chu vi = có quân.
        const G = gradients(rect);
        for (const f of feats) {
            const u = f.sq % 9, v = Math.floor(f.sq / 9);
            // Hàng 4/5 sát sông: không cho tâm trượt vào giữa sông (chữ 楚河 漢界 cũng tạo biên tròn).
            f.circ = bestCircle(G, (u + margin) * S, (v + margin) * S, S, v === 4 ? [-0.3, 0.1] : v === 5 ? [-0.1, 0.3] : [-0.3, 0.3]);
        }
        thr = Math.max(0.32, Math.min(0.75, otsu(feats.map((f) => f.circ.score))));
        // Có quân thật thì đường kẻ bị CHE: nếu từ giao điểm vẫn thấy đường kẻ chạy liền vào sát tâm theo ≥ 3 hướng
        // → ô trống (giữa cung / góc bàn nhiều đường giao nhau dễ tạo "vòng tròn" giả).
        const gray = (x, y) => { const q = px(x, y); return 0.299 * q[0] + 0.587 * q[1] + 0.114 * q[2]; };
        const linesThrough = (u, v) => {
            const cx = (u + margin) * S, cy = (v + margin) * S;
            let dirs = 0;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                if ((u === 0 && dx < 0) || (u === 8 && dx > 0) || (v === 0 && dy < 0) || (v === 9 && dy > 0)) continue;
                if ((v === 4 && dy > 0) || (v === 5 && dy < 0)) { if (u !== 0 && u !== 8) continue; }
                let on = 0, n = 0;
                for (let t = 0.1; t <= 0.38; t += 0.04) {
                    const x = cx + dx * t * S, y = cy + dy * t * S;
                    // điểm trên đường kẻ: tối hơn 2 bên vuông góc
                    const a2 = gray(x + dy * 3, y + dx * 3), b2 = gray(x - dy * 3, y - dx * 3), c2 = Math.min(gray(x, y), gray(x + dy, y + dx), gray(x - dy, y - dx));
                    n++; if (Math.min(a2, b2) - c2 > 18) on++;
                }
                if (on / n >= 0.75) dirs++;
            }
            return dirs;
        };
        for (const f of feats) f.lt = f.circ.score > thr ? linesThrough(f.sq % 9, Math.floor(f.sq / 9)) : 0;
        // Tâm bị kéo lệch xa mà biên tròn lại yếu → thường là giao điểm trống ăn ké mép quân bên cạnh.
        pieces = feats.filter((f) => f.circ.score > thr && f.lt < 3 && !(f.circ.off > 0.18 && f.circ.score < 0.72));
        // Hai quân thật không thể chồng lên nhau: 2 đĩa chồng quá nhiều → bỏ đĩa yếu hơn (thường là giao điểm trống
        // "ăn ké" mép quân bên cạnh, tâm bị kéo lệch tối đa).
        const strength = (f) => f.circ.score - 0.5 * f.circ.off;
        pieces = pieces.filter((f) => !pieces.some((g) => g !== f
            && Math.hypot(g.circ.cx - f.circ.cx, g.circ.cy - f.circ.cy) < 0.75 * (g.circ.r + f.circ.r)
            && strength(g) > strength(f)));
        for (const f of pieces) {
            const { cx, cy, r } = f.circ;
            f.R = r;
            const ann = [], all = [];
            for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
                const d = Math.hypot(x - cx, y - cy);
                if (d > r) continue;
                const pp = px(x, y);
                if (d >= 0.68 * r) ann.push(pp);
                all.push({ p: pp, x: x - cx, y: y - cy, d });
            }
            f.ann = ann; f.all = all;
        }
    } else {
        pieces = feats.filter((f) => f.off > thr);
    }
    // Căn tâm lại theo trọng tâm đĩa quân (lưới lệch vài px / ảnh chụp) rồi lấy lại điểm ảnh quanh tâm mới.
    for (const f of pieces) {
        if (opts.photo) continue;
        f.R = DISC * S;
        const u = f.sq % 9, v = Math.floor(f.sq / 9);
        const cx0 = (u + margin) * S, cy0 = (v + margin) * S, R5 = 0.5 * S;
        let sx = 0, sy = 0, n = 0;
        for (let y = Math.floor(cy0 - R5); y <= cy0 + R5; y++) for (let x = Math.floor(cx0 - R5); x <= cx0 + R5; x++) {
            if (Math.hypot(x - cx0, y - cy0) > R5) continue;
            if (dist(px(x, y), f.lb) > 45) { sx += x; sy += y; n++; }
        }
        if (!n) continue;
        let dx = sx / n - cx0, dy = sy / n - cy0;
        const sh = Math.hypot(dx, dy), cap = 0.15 * S;
        if (sh > cap) { dx *= cap / sh; dy *= cap / sh; }
        const cx = cx0 + dx, cy = cy0 + dy, R = DISC * S;
        const ann = [], all = [];
        for (let y = Math.floor(cy - R); y <= cy + R; y++) for (let x = Math.floor(cx - R); x <= cx + R; x++) {
            const d = Math.hypot(x - cx, y - cy);
            if (d > R) continue;
            const p = px(x, y);
            if (d >= 0.30 * S) ann.push(p);
            all.push({ p, x: x - cx, y: y - cy, d });
        }
        f.ann = ann; f.all = all;
    }

    for (const f of pieces) {
        const sc = (f.R || DISC * S) / DISC;          // cỡ "ô" suy từ bán kính quân thật
        const inkT = opts.photo ? 50 : 60;
        const body = dominant(f.all.filter((o) => o.d <= 0.40 * sc).map((o) => o.p));
        // Ảnh chụp: mặt quân sáng không đều → mực = điểm TỐI hơn hẳn "mặt phẳng ánh sáng" của mặt quân.
        let isInk = (o) => dist(o.p, body) > inkT;
        let inkW = () => 1;
        if (opts.photo) {
            const face = f.all.filter((o) => o.d <= 0.9 * f.R);
            const lum = (q) => 0.299 * q[0] + 0.587 * q[1] + 0.114 * q[2];
            const darkFace = lum(body) < 100;                 // quân mặt tối chữ sáng (hiếm) → đảo dấu
            let plane = [lum(body), 0, 0], use = face;
            for (let it = 0; it < 3; it++) {
                const fp = fitPlane(use.map((o) => [o.x, o.y, lum(o.p)]));
                if (fp && fp.every(Number.isFinite)) plane = fp;
                const res = (o) => (darkFace ? -1 : 1) * (plane[0] + plane[1] * o.x + plane[2] * o.y - lum(o.p));
                use = face.filter((o) => res(o) < 14);       // bỏ nét chữ khỏi lần khớp sau
            }
            const resid = face.map((o) => (darkFace ? -1 : 1) * (plane[0] + plane[1] * o.x + plane[2] * o.y - lum(o.p)));
            const pos = resid.filter((v) => v > 6);
            const t = Math.max(18, pos.length > 20 ? otsu(pos) || 18 : 18);
            const rmap = new Map(face.map((o, i) => [o, resid[i]]));
            isInk = (o) => (rmap.get(o) ?? 0) > t * 0.7;
            inkW = (o) => Math.max(0, Math.min(1, ((rmap.get(o) ?? 0) - 0.7 * t) / (1.3 * t)));
        }
        // Mực = điểm khác màu mặt quân; cắt vòng viền theo bán kính (mực phủ > 50% chu vi) và bỏ các mảnh
        // liên thông dạng CUNG TRÒN MỎNG ở rìa (viền trang trí / khắc) → chỉ còn nét chữ.
        let limit = 0.40 * sc;
        const bins = new Map();
        for (const o of f.all) {
            if (o.d < 0.27 * sc || o.d > 0.44 * sc) continue;
            const k = Math.round(o.d), e = bins.get(k) || [0, 0];
            e[0]++; if (isInk(o)) e[1]++;
            bins.set(k, e);
        }
        for (const k of [...bins.keys()].sort((x, y) => x - y)) {
            const [n, m] = bins.get(k);
            if (n > 8 && m / n > 0.5) { limit = Math.min(limit, k - 1.5); break; }
        }
        f.inner = f.all.filter((o) => o.d <= limit);
        const ink = stripRings(f.inner.filter(isInk), sc);
        f.body = body;
        f.inkFrac = ink.length / Math.max(1, f.inner.length);
        f.inkPts = ink.map((o) => [o.x, o.y, inkW(o)]);
        if (opts.photo) f.soft = softMap(f.all.filter((o) => o.d <= Math.min(limit, 0.86 * f.R)), inkW, f.R);
        f.inkColor = ink.length ? medColor(ink.map((o) => o.p)) : body;
        const discBody = medColor(f.ann.filter((p) => dist(p, f.lb) > 45));
        f.red = Math.max(redness(f.inkColor), redness(discBody), redness(body));
        if (opts.photo) {
            // Gỗ vốn ngả đỏ → chỉ xét các điểm mực ĐẬM nhất: mực đỏ R ≫ G, mực đen/xanh đen G ≥ R.
            const strong = ink.map((o) => [inkW(o), o.p]).sort((x, y) => y[0] - x[0]).slice(0, Math.max(8, Math.floor(ink.length * 0.35)));
            f.red = strong.length ? strong.reduce((acc, [, q]) => acc + (q[0] - q[1]), 0) / strong.length / 255 : 0;
        }
    }
    // Quân úp: mặt trơn (rất ít "mực") — so với các quân có chữ trên cùng ảnh.
    const inkVals = pieces.map((f) => f.inkFrac).sort((a, b) => a - b);
    const hiddenThr = Math.min(0.07, (inkVals[Math.floor(inkVals.length * 0.75)] || 0.2) * 0.3);
    for (const f of pieces) f.hidden = f.inkFrac < hiddenThr || f.inkPts.length < 12;

    // Màu: 2 cụm theo độ đỏ (chỉ quân có chữ; quân úp xét theo nửa bàn).
    const shown = pieces.filter((f) => !f.hidden);
    const rt = shown.length > 1 ? otsu(shown.map((f) => f.red)) : 0.15;
    for (const f of shown) f.isRed = f.red > Math.max(0.08, rt);

    const coup = pieces.some((f) => f.hidden);

    // Chữ → binh chủng.
    const tpl = await loadTemplates(opts.fontBase);
    const angles = opts.photo ? Array.from({ length: 24 }, (_, i) => (i * Math.PI) / 12) : [0, Math.PI];
    const ptpl = opts.photo ? await polarTemplates() : null;
    for (const f of shown) {
        if (opts.photo && f.soft && !globalThis.NOPOLAR) {
            const scores = Object.fromEntries(TYPES.map((t) => [t, -1]));
            const bestAK = {};
            const tr = ptpl.reduce((acc, t) => acc + t.rms, 0) / ptpl.length;
            const k0 = f.soft.rms ? Math.max(0.5, Math.min(1.3, f.soft.rms / f.soft.R / tr)) : 1;
            for (const a of Array.from({ length: 24 }, (_, i) => (i * Math.PI) / 12)) {
                for (const k of [0.9 * k0, k0, 1.1 * k0]) {
                    const v = polarVec(f.soft, a, k);
                    if (!v) continue;
                    for (const t of ptpl) { const sc2 = dot(v, t.v) - (SIMPLIFIED.includes(t.ch) ? 0.03 : 0); if (sc2 > scores[t.t]) { scores[t.t] = sc2; bestAK[t.t] = [a, k]; if (opts.debug) (f.bestV ??= {})[t.t] = { v: Array.from(v), tv: Array.from(t.v), a, k, ch: t.ch }; } }
                }
            }
            // So khớp tinh 3 ứng viên đầu: lưới 32×32, dò góc ±6°, cỡ ±5%.
            const top = Object.entries(scores).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([t]) => t);
            const fine = {};
            for (const t of top) {
                const [a0, k0b] = bestAK[t] || [0, 1];
                let bs = -1;
                for (const da of [-0.105, -0.052, 0, 0.052, 0.105]) for (const dk of [0.95, 1, 1.05]) {
                    const v = polarVec(f.soft, a0 + da, k0b * dk, PNF);
                    if (!v) continue;
                    for (const tp of ptpl) if (tp.t === t) { const sc2 = dot(v, tp.vf) - (SIMPLIFIED.includes(tp.ch) ? 0.03 : 0); if (sc2 > bs) bs = sc2; }
                }
                fine[t] = bs;
            }
            for (const t of top) scores[t] = Math.max(scores[t], fine[t]) + (fine[t] >= Math.max(...top.map((x) => fine[x])) ? 0.02 : 0);
            f.scores = scores;
            if (Math.max(...Object.values(scores)) < 0.42 && f.inkFrac > 0.05) f.ghost = true;
            continue;
        }
        const scores = Object.fromEntries(TYPES.map((t) => [t, -1]));
        for (const a of angles) {
            const v = normalize(f.inkPts, a);
            for (const t of tpl) {
                if (t.rot % 2 === 1 && !opts.photo) continue;
                const s = dot(v, t.v) - (t.rot ? 0.02 : 0);
                if (s > scores[t.t]) scores[t.t] = s;
            }
        }
        f.scores = scores;
    }

    for (let i = shown.length - 1; i >= 0; i--) {
        if (!shown[i].ghost) continue;
        pieces.splice(pieces.indexOf(shown[i]), 1);
        shown.splice(i, 1);
    }

    // Gán binh chủng tối ưu toàn cục (Hungarian) theo luật: số lượng, ô hợp lệ, mỗi bên ưu tiên có 1 Tướng.
    // Chiều bàn (Đỏ dưới / Đỏ trên) chọn theo tổng điểm cao hơn khi gán thử cả hai chiều.
    const solveSide = (red, flip) => {
        const at = (sq) => (flip ? 89 - sq : sq);
        const side = shown.filter((f) => f.isRed === red);
        const slots = [];
        for (const t of TYPES) for (let k = 0; k < MAX[t]; k++) slots.push(t);
        while (slots.length < side.length) slots.push('?');
        const cost = side.map((f) => slots.map((t) => {
            if (t === '?') return 1;
            if (!legal(t, red, at(f.sq), coup)) return 5;
            return -(f.scores[t] + (t === 'K' ? 0.35 : 0));
        }));
        const pick = hungarian(cost);
        let total = 0;
        const res = side.map((f, i) => {
            const t = slots[pick[i]];
            const c = cost[i][pick[i]];
            total -= c;
            const sorted = Object.values(f.scores).sort((a, b) => b - a);
            const s0 = t === '?' ? -1 : f.scores[t];
            const conf = t === '?' || c >= 5 ? 0 : Math.max(0, Math.min(1, (s0 - 0.25) * 2)) * (s0 >= sorted[0] - 1e-6 ? Math.min(1, 0.4 + (sorted[0] - sorted[1]) * 8) : 0.35);
            return { sq: at(f.sq), p: t === '?' ? (red ? 'P' : 'p') : (red ? t : t.toLowerCase()), conf };
        });
        return { res, total, king: res.some((r) => r.p === (red ? 'K' : 'k')) };
    };
    const tryFlip = (flip) => {
        const r = solveSide(true, flip), b = solveSide(false, flip);
        // Quân úp chỉ nằm ở ô xuất phát của bên mình → cộng điểm nếu khớp với chiều này.
        let hid = 0;
        for (const f of pieces.filter((x) => x.hidden)) { const sq = flip ? 89 - f.sq : f.sq; if (ROLE(sq)) hid += 0.2; }
        return { flip, r, b, total: r.total + b.total + hid };
    };
    const A = tryFlip(false), B = opts.flip === undefined ? tryFlip(true) : null;
    const best = opts.flip === true ? tryFlip(true) : (!B || A.total >= B.total ? A : B);
    const flipped = best.flip;
    const at = (sq) => (flipped ? 89 - sq : sq);
    const board = new Array(90).fill(null), conf = new Array(90).fill(1);
    for (const x of [...best.r.res, ...best.b.res]) { board[x.sq] = x.p; conf[x.sq] = x.conf; }
    if (!best.r.king) warnings.push('Không thấy Tướng Đỏ');
    if (!best.b.king) warnings.push('Không thấy Tướng Đen');
    for (const f of pieces.filter((x) => x.hidden)) {
        const sq = at(f.sq);
        const red = Math.floor(sq / 9) >= 5;
        board[sq] = red ? 'X' : 'x';
        conf[sq] = ROLE(sq) ? 0.9 : 0.1;
        if (!ROLE(sq)) warnings.push('Có quân úp ở ô không phải ô xuất phát');
    }
    if (pieces.length > 32) warnings.push('Nhận ra hơn 32 quân — kiểm tra lại góc lưới');
    const debug = opts.debug ? pieces.map((f) => ({ sq: at(f.sq), soft: f.soft ? { D: f.soft.D, m: Array.from(f.soft.m, (v) => Math.round(v * 255)) } : null, bestV: f.bestV, circ: f.circ, body: f.body, lb: f.lb, inkColor: f.inkColor, hidden: f.hidden, ink: f.inkPts.length, inner: f.inner.length, inkFrac: +f.inkFrac.toFixed(3), red: +f.red.toFixed(2), scores: f.scores, mask: f.inkPts.length ? Array.from(normalize(f.inkPts, 0)).map((v) => (v > 0.01 ? 1 : 0)) : null })) : undefined;
    const quality = shown.length ? shown.reduce((acc, f) => acc + Math.max(...Object.values(f.scores)), 0) / shown.length : 1;
    return { board, conf, flipped: !!flipped, coup, quality, warnings: [...new Set(warnings)], debug, offs: opts.debug ? feats.map((f) => +f.off.toFixed(2)) : undefined, thr, circles: opts.debug && opts.photo ? feats.map((f) => ({ sq: f.sq, lt: f.lt, ...f.circ, piece: pieces.includes(f) })) : undefined };
}

export function toFen(board) {
    const rows = [];
    for (let r = 0; r < 10; r++) {
        let s = '', e = 0;
        for (let c = 0; c < 9; c++) {
            const p = board[r * 9 + c];
            if (!p) e++; else { if (e) { s += e; e = 0; } s += p; }
        }
        rows.push(s + (e || ''));
    }
    return rows.join('/');
}

/** Tiện ích: ImageData từ ảnh (giới hạn cạnh dài 1600px cho nhẹ). */
export function imageData(imgEl, max = 1600) {
    const k = Math.min(1, max / Math.max(imgEl.naturalWidth, imgEl.naturalHeight));
    const cv = document.createElement('canvas');
    cv.width = Math.round(imgEl.naturalWidth * k); cv.height = Math.round(imgEl.naturalHeight * k);
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(imgEl, 0, 0, cv.width, cv.height);
    const id = ctx.getImageData(0, 0, cv.width, cv.height);
    return { data: id.data, width: id.width, height: id.height, scale: k };
}
