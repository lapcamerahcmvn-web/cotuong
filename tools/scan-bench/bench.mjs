// Chấm điểm bộ nhận dạng trên ảnh thử: node bench.mjs [lọc] — phục vụ tĩnh mã nguồn + ảnh, chạy trong Chrome headless.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const HERE = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const ROOTS = { '/src/': HERE + '/../../resources/js/', '/fonts/': HERE + '/../../public/fonts/', '/bench/': HERE + '/' };
const TYPES = { '.js': 'text/javascript', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.html': 'text/html' };
const srv = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    if (u === '/') { res.writeHead(200, { 'content-type': 'text/html' }); res.end('<!doctype html><meta charset=utf-8><body>bench</body>'); return; }
    const root = Object.keys(ROOTS).find((r) => u.startsWith(r));
    if (!root) { res.writeHead(404); res.end(); return; }
    const f = ROOTS[root] + u.slice(root.length);
    fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); res.end(d); });
}).listen(8099);

const filter = process.argv[2] || '';
const cases = JSON.parse(fs.readFileSync(HERE + '/cases.json', 'utf8')).filter((c) => c.file.includes(filter));
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
const p = await b.newPage();
p.on('pageerror', (e) => console.log('JS', e.message));
p.on('console', (m) => { if (m.type() === 'error') console.log('console', m.text()); });
await p.goto('http://127.0.0.1:8099/');
const res = await p.evaluate(async (cases) => {
    const R = await import('/src/scan/recognize.js');
    await R.loadTemplates('/fonts/scan/');
    const load = (src) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = src; });
    const out = [];
    for (const c of cases) {
        const img = R.imageData(await load('/bench/img/' + c.file));
        const sc = img.scale;
        const truthC = c.corners.map(([x, y]) => [x * sc, y * sc]);
        // Ảnh chụp: mô phỏng người dùng kéo 4 góc lệch tay ±0.08 ô (giả ngẫu nhiên cố định theo tên file).
        if (c.kind !== 'screen' && c.kind !== 'coup') {
            let seed = [...c.file].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);
            const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 4294967296 - 0.5) * 2;
            const cw = Math.hypot(truthC[1][0] - truthC[0][0], truthC[1][1] - truthC[0][1]) / 8;
            for (const p of truthC) { p[0] += rnd() * 0.08 * cw; p[1] += rnd() * 0.08 * cw; }
        }
        let auto = null;
        if (c.kind === 'screen' || c.kind === 'coup') auto = R.detectGrid(img);
        const corners = auto ? auto.corners : truthC;
        const cornerErr = auto ? Math.max(...auto.corners.map(([x, y], i) => Math.hypot(x - truthC[i][0], y - truthC[i][1]))) / ((truthC[1][0] - truthC[0][0]) / 8) : null;
        const t0 = performance.now();
        const rect = R.rectify(img, corners, 40);
        const manual = !auto; const r0 = await R.classify(rect, { photo: manual, fontBase: '/fonts/scan/' }); let r = r0; if (!manual && r0.quality < 0.76) { const r2 = await R.classify(rect, { photo: true, fontBase: '/fonts/scan/' }); if (r2.quality > r0.quality) r = r2; } window.__q = [r0.quality.toFixed(2), r.quality.toFixed(2)];
        const ms = performance.now() - t0;
        // đáp án
        const tb = new Array(90).fill(null);
        c.fen.split('/').forEach((row, ri) => { let f = 0; for (const ch of row) { if (/\d/.test(ch)) f += +ch; else { tb[ri * 9 + f] = ch; f++; } } });
        let wrong = [], present = 0;
        for (let i = 0; i < 90; i++) {
            if (tb[i]) present++;
            if ((tb[i] || null) !== (r.board[i] || null)) wrong.push(`${i}:${tb[i] || '.'}→${r.board[i] || '.'}`);
        }
        out.push({ q: window.__q, file: c.file, kind: c.kind, auto: !!auto, cornerErr: cornerErr === null ? null : +cornerErr.toFixed(2), wrong: wrong.length, present, list: wrong.slice(0, 8).join(' '), flipped: r.flipped, ms: Math.round(ms), warn: r.warnings.join('; ') });
    }
    return out;
}, cases);
let tot = 0, totW = 0;
const byKind = {};
for (const r of res) {
    console.log(r.q.join(" "), `${r.file.padEnd(28)} sai ${String(r.wrong).padStart(2)}/${r.present} ${r.auto ? 'auto lệch ' + r.cornerErr : 'góc tay'} ${r.flipped ? 'XOAY' : ''} ${r.ms}ms ${r.list} ${r.warn}`);
    const k = byKind[r.kind] ??= { n: 0, perfect: 0, wrong: 0, pieces: 0 };
    k.n++; k.perfect += r.wrong === 0 ? 1 : 0; k.wrong += r.wrong; k.pieces += r.present;
}
for (const [k, v] of Object.entries(byKind)) console.log(`== ${k}: ${v.perfect}/${v.n} ảnh đúng hoàn toàn · ${(100 - 100 * v.wrong / v.pieces).toFixed(1)}% ô quân đúng`);
await b.close(); srv.close();
