// Trang "Nhận diện bàn cờ từ ảnh": chọn/chụp/dán ảnh → căn 4 góc lưới (tự động hoặc kéo tay) → nhận dạng
// trên trình duyệt → THẨM (bấm ô để sửa) → lưu thư viện / mở trình soạn / máy đánh giá / chơi tiếp với máy.
import { loadBoard, postJson, icon, escapeHtml, toast, track, store, save } from './core';
import { detectGrid, rectify, classify, toFen, homography, applyH, imageData, loadTemplates } from './scan/recognize';

const PALETTE = [null, 'K', 'A', 'B', 'N', 'R', 'C', 'P', 'X', 'k', 'a', 'b', 'n', 'r', 'c', 'p', 'x'];
const NAME = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt', X: 'Quân úp' };
const GLYPH = { K: '帥', A: '仕', B: '相', N: '傌', R: '俥', C: '炮', P: '兵', k: '將', a: '士', b: '象', n: '馬', r: '車', c: '砲', p: '卒', X: '?', x: '?' };
const COUP_SET = 'AABBNNRRCCPPPPP';

/*
 * HỌC KIỂU CHỮ của phần mềm người dùng hay chụp: mỗi phần mềm vẽ quân giống hệt nhau giữa các ảnh, nhưng chữ thư pháp
 * của chúng có thể khác xa font mẫu. Khi người dùng đã THẨM xong và dùng kết quả, lưu "chữ ký" nét chữ của từng quân
 * (trên thiết bị này) → lần quét sau máy so với mẫu đã học trước. Tối đa 6 mẫu mỗi binh chủng.
 */
const LEARN_KEY = 'xq.scan.learned';
const LEARN_PER_TYPE = 6;
const sim = (a, b) => {
    let d = 0, r = 0;
    const n = a.length;
    for (let i = 0; i < n; i++) { d += a[i] * b[i]; r += a[i] * b[n - 1 - i]; }   // 0° và 180° (Đen chữ ngược)
    return Math.max(d, r);
};
const loadLearned = () => { const v = store(LEARN_KEY, []); return Array.isArray(v) ? v : []; };

export function init() {
    const root = document.querySelector('[data-scan]');
    if (!root) return;
    loadBoard().then(() => setup(root));
    loadTemplates();   // tải sẵn mẫu chữ trong lúc người dùng chọn ảnh
}

function setup(root) {
    const $ = (s) => root.querySelector(s);
    const R = window.XiangqiRules;
    const cfg = JSON.parse(root.dataset.scan || '{}');
    const steps = { pick: $('[data-step="pick"]'), align: $('[data-step="align"]'), result: $('[data-step="result"]') };
    let img = null, imgEl = null, corners = null, rect = null, result = null, selected = -1, redToMove = true;
    let edited = new Set(), learnedThisScan = false;

    const show = (name) => {
        Object.entries(steps).forEach(([k, el]) => { el.hidden = k !== name && !(name === 'result' && k === 'align' && false); });
        steps[name].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // ---------------- Bước 1: lấy ảnh
    const fileInputs = root.querySelectorAll('input[type=file]');
    fileInputs.forEach((inp) => inp.addEventListener('change', () => { if (inp.files[0]) loadFile(inp.files[0]); inp.value = ''; }));
    const drop = $('[data-drop]');
    ['dragenter', 'dragover'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove('is-over'); }));
    drop.addEventListener('drop', (e) => { const f = [...(e.dataTransfer?.files || [])].find((x) => x.type.startsWith('image/')); if (f) loadFile(f); });
    document.addEventListener('paste', (e) => {
        const f = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith('image/'))?.getAsFile();
        if (f) { loadFile(f); toast('Đã dán ảnh từ bộ nhớ tạm.'); }
    });
    root.querySelectorAll('[data-sample]').forEach((b) => b.addEventListener('click', () => loadUrl(b.dataset.sample)));

    function loadFile(f) {
        if (f.size > 15 * 1024 * 1024) { toast('Ảnh quá lớn (tối đa 15 MB).', { kind: 'err' }); return; }
        const url = URL.createObjectURL(f);
        loadUrl(url);
        track('scan_image', { type: f.type });
    }
    function loadUrl(url) {
        const el = new Image();
        el.onload = () => { imgEl = el; img = imageData(el); startAlign(true); };
        el.onerror = () => toast('Không đọc được ảnh này.', { kind: 'err' });
        el.src = url;
    }

    // ---------------- Bước 2: căn lưới
    const stage = $('[data-align-canvas]');
    const ctx = stage.getContext('2d');
    let view = 1;   // tỉ lệ canvas / ảnh
    function startAlign(auto) {
        steps.pick.hidden = true; steps.align.hidden = false; steps.result.hidden = true;
        // Vừa khung nhìn: ảnh dọc chụp bằng điện thoại không được cao quá màn hình (phải thấy đủ 4 chấm góc).
        const maxW = Math.min(stage.parentElement.clientWidth - 16, 760), maxH = Math.max(320, window.innerHeight * 0.72);
        view = Math.min(maxW / img.width, maxH / img.height);
        stage.width = Math.round(img.width * view); stage.height = Math.round(img.height * view);
        corners = null;
        if (auto) {
            const g = detectGrid(img);
            if (g) { corners = g.corners; setHint('Đã tự tìm thấy lưới bàn cờ — kiểm tra 4 chấm có nằm đúng 4 góc lưới không rồi bấm “Nhận dạng”.', 'ok'); }
        }
        setPhoto(!corners);
        if (!corners) {
            const w = img.width, h = img.height, mx = w * 0.12, my = h * 0.1;
            corners = [[mx, my], [w - mx, my], [w - mx, h - my], [mx, h - my]];
            setHint('Ảnh chụp bàn cờ thật: kéo 4 chấm vào 4 GIAO ĐIỂM góc ngoài cùng của lưới (không phải mép bàn). Góc bị quân che thì đặt chấm vào TÂM quân ở góc. Lưới xanh phải trùng các đường kẻ.', '');
        }
        draw();
        steps.align.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const photoBox = $('[data-photo-mode]');
    function setPhoto(v) { if (photoBox) photoBox.checked = v; }
    function setHint(t, kind) { const h = $('[data-align-hint]'); h.textContent = t; h.className = 'scan-hint ' + (kind === 'ok' ? 'is-ok' : ''); }
    function draw() {
        ctx.drawImage(imgEl, 0, 0, stage.width, stage.height);
        const H = homography([[0, 0], [8, 0], [8, 9], [0, 9]], corners);
        const P = (u, v) => { const [x, y] = applyH(H, u, v); return [x * view, y * view]; };
        ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(31,170,120,.9)';
        ctx.beginPath();
        for (let v = 0; v <= 9; v++) { const a = P(0, v), b = P(8, v); ctx.moveTo(...a); ctx.lineTo(...b); }
        for (let u = 0; u <= 8; u++) { const a = P(u, 0), b = P(u, 9); ctx.moveTo(...a); ctx.lineTo(...b); }
        ctx.stroke();
        corners.forEach(([x, y], i) => {
            ctx.beginPath(); ctx.arc(x * view, y * view, 11, 0, Math.PI * 2);
            ctx.fillStyle = drag === i ? 'rgba(200,69,31,.95)' : 'rgba(200,69,31,.7)'; ctx.fill();
            ctx.lineWidth = 2.5; ctx.strokeStyle = '#fff'; ctx.stroke();
        });
        if (drag >= 0) loupe(corners[drag]);
    }
    // Kính lúp: phóng to vùng quanh chấm đang kéo (ngón tay che mất điểm cần đặt) — đặt ở góc đối diện.
    function loupe([x, y]) {
        const R = Math.min(78, stage.width * 0.2), zoom = 3;
        const lx = x * view < stage.width / 2 ? stage.width - R - 10 : R + 10, ly = R + 10;
        ctx.save();
        ctx.beginPath(); ctx.arc(lx, ly, R, 0, Math.PI * 2); ctx.clip();
        const sw = (R * 2) / zoom / view;
        ctx.drawImage(imgEl, (x - sw / 2) * (imgEl.naturalWidth / img.width), (y - sw / 2) * (imgEl.naturalHeight / img.height),
            sw * (imgEl.naturalWidth / img.width), sw * (imgEl.naturalHeight / img.height), lx - R, ly - R, R * 2, R * 2);
        ctx.strokeStyle = 'rgba(200,69,31,.95)'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(lx - R, ly); ctx.lineTo(lx + R, ly); ctx.moveTo(lx, ly - R); ctx.lineTo(lx, ly + R); ctx.stroke();
        ctx.restore();
        ctx.beginPath(); ctx.arc(lx, ly, R, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = '#fff'; ctx.stroke();
    }
    let drag = -1;
    const pos = (e) => { const r = stage.getBoundingClientRect(); return [(e.clientX - r.left) * (stage.width / r.width) / view, (e.clientY - r.top) * (stage.height / r.height) / view]; };
    stage.addEventListener('pointerdown', (e) => {
        const [x, y] = pos(e);
        let best = -1, bd = Infinity;
        corners.forEach(([cx, cy], i) => { const d = Math.hypot(cx - x, cy - y) * view; if (d < bd) { bd = d; best = i; } });
        if (bd < 44) { drag = best; stage.setPointerCapture(e.pointerId); e.preventDefault(); draw(); }
    });
    stage.addEventListener('pointermove', (e) => { if (drag < 0) return; corners[drag] = pos(e); draw(); });
    stage.addEventListener('pointerup', () => { drag = -1; draw(); });
    $('[data-auto-grid]').addEventListener('click', () => {
        const g = detectGrid(img);
        if (g) { corners = g.corners; setPhoto(false); draw(); setHint('Đã căn lưới tự động.', 'ok'); } else setHint('Không tự tìm được lưới (ảnh chụp nghiêng?) — hãy kéo 4 chấm bằng tay.', '');
    });
    $('[data-rotate]').addEventListener('click', () => {
        const cv = document.createElement('canvas');
        cv.width = imgEl.naturalHeight; cv.height = imgEl.naturalWidth;
        const c = cv.getContext('2d');
        c.translate(cv.width, 0); c.rotate(Math.PI / 2); c.drawImage(imgEl, 0, 0);
        loadUrl(cv.toDataURL('image/jpeg', 0.92));
    });
    $('[data-repick]').addEventListener('click', () => { steps.align.hidden = true; steps.result.hidden = true; steps.pick.hidden = false; });
    $('[data-recognize]').addEventListener('click', recognize);

    async function recognize() {
        const btn = $('[data-recognize]');
        btn.disabled = true; btn.innerHTML = `${icon('sparkles')} Đang nhận dạng…`;
        await new Promise((r) => setTimeout(r, 30));
        try {
            // Ảnh chụp bàn thật: dò mép quân (quân đặt lệch, gỗ trên gỗ), chữ xoay mọi góc, nắn ở độ phân giải cao hơn.
            // Ảnh màn hình: chữ 0°/180°; điểm khớp thấp thì thử lại như ảnh chụp.
            const photo = !!photoBox?.checked;
            rect = rectify(img, corners, photo ? 56 : 40);
            const learned = loadLearned();
            let r = await classify(rect, { photo, learned });
            if (!photo && r.quality < 0.76) {
                const rect2 = rectify(img, corners, 56);
                const r2 = await classify(rect2, { photo: true, learned });
                if (r2.quality > r.quality) { r = r2; rect = rect2; }
            }
            result = r;
            result.sigs = r.sigs || {};
            edited = new Set(); learnedThisScan = false;
            redToMove = true;
            track('scan_done', { quality: Math.round(r.quality * 100), coup: r.coup, warnings: r.warnings.length });
            renderResult();
        } catch (e) {
            toast('Không nhận dạng được — thử căn lại 4 góc lưới.', { kind: 'err' });
        }
        btn.disabled = false; btn.innerHTML = `${icon('sparkles')} Nhận dạng`;
    }

    // ---------------- Bước 3: thẩm & dùng kết quả
    const holder = $('[data-result-board]');
    function renderResult() {
        steps.result.hidden = false;
        // ảnh đã nắn để đối chiếu
        const pv = $('[data-rect-preview]');
        pv.width = rect.width; pv.height = rect.height;
        pv.getContext('2d').putImageData(new ImageData(rect.data, rect.width, rect.height), 0, 0);
        drawBoard();
        steps.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const fen = () => toFen(result.board);
    function drawBoard() {
        const b = result.board;
        // Ô kém chắc chắn: chấm vàng; ô đang chọn: viền.
        const dots = [];
        for (let i = 0; i < 90; i++) if (b[i] && result.conf[i] < 0.45) dots.push(i);
        holder.innerHTML = window.XiangqiBoard.render(fen(), null, null, selected, false, { dots });
        holder.querySelector('svg')?.addEventListener('click', onBoardClick);
        const unsure = dots.length;
        const counts = validate();
        $('[data-result-info]').innerHTML = [
            unsure ? `<span class="scan-chip is-warn">${icon('target')} ${unsure} ô máy chưa chắc (chấm vàng) — kiểm tra kỹ</span>` : `<span class="scan-chip is-ok">${icon('check')} Máy khá chắc chắn mọi quân</span>`,
            unsure >= 5 && cfg.aiUrl ? `<span class="scan-chip">${icon('sparkles')} Nhiều ô chưa chắc (kiểu chữ lạ?) — thử <b class="ml-1">Nhận dạng lại bằng AI</b>; dùng kết quả xong máy sẽ nhớ kiểu chữ này cho lần sau</span>` : '',
            ...result.warnings.map((w) => `<span class="scan-chip is-warn">${escapeHtml(w)}</span>`),
            ...counts.map((w) => `<span class="scan-chip is-err">${escapeHtml(w)}</span>`),
            loadLearned().length ? `<span class="scan-chip is-ok">${icon('sparkles')} Đã nhớ kiểu chữ từ các lần bạn thẩm trước <button type="button" class="underline font-bold ml-1" data-forget>Xoá</button></span>` : '',
            result.coup ? `<span class="scan-chip">${icon('layers')} Cờ úp: ${b.filter((p) => p === 'X').length} quân úp Đỏ · ${b.filter((p) => p === 'x').length} quân úp Đen</span>` : '',
        ].join('');
        $('[data-forget]')?.addEventListener('click', () => { save(LEARN_KEY, []); toast('Đã xoá mẫu chữ đã học.'); drawBoard(); });
        $('[data-fen-out]').value = fen();
        $('[data-turn]').querySelectorAll('button').forEach((x) => x.classList.toggle('is-on', (x.dataset.side === 'do') === redToMove));
        renderPalette();
    }
    function validate() {
        const b = result.board, out = [];
        const cnt = (p) => b.filter((x) => x === p).length;
        if (cnt('K') !== 1) out.push(`Cần đúng 1 Tướng Đỏ (đang có ${cnt('K')})`);
        if (cnt('k') !== 1) out.push(`Cần đúng 1 Tướng Đen (đang có ${cnt('k')})`);
        const lim = { A: 2, B: 2, N: 2, R: 2, C: 2, P: 5 };
        for (const [t, m] of Object.entries(lim)) {
            for (const p of [t, t.toLowerCase()]) if (cnt(p) > m && !result.coup) out.push(`Thừa ${NAME[t]} ${p === t ? 'Đỏ' : 'Đen'} (${cnt(p)}/${m})`);
        }
        if (cnt('K') === 1 && cnt('k') === 1) {
            const coup = /[Xx]/.test(fen());
            if (R.inCheck(b, !redToMove, coup)) out.push(`Bên ${redToMove ? 'Đen' : 'Đỏ'} đang bị chiếu mà lại tới lượt ${redToMove ? 'Đỏ' : 'Đen'} — đổi bên đi`);
        }
        return out;
    }
    function onBoardClick(e) {
        const svg = e.currentTarget, pt = svg.createSVGPoint();
        pt.x = e.clientX; pt.y = e.clientY;
        const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
        const f = Math.round((loc.x - 26) / 52), r = Math.round((loc.y - 26) / 52);
        if (f < 0 || f > 8 || r < 0 || r > 9) return;
        selected = r * 9 + f;
        drawBoard();
        $('[data-palette]').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function renderPalette() {
        const pal = $('[data-palette]');
        if (selected < 0) { pal.innerHTML = '<p class="text-[13.5px] text-ink-soft m-0">Bấm vào 1 ô trên bàn cờ để sửa quân (đặt, đổi hoặc xoá).</p>'; return; }
        const cur = result.board[selected];
        pal.innerHTML = `<div class="text-[13px] font-bold mb-2">Ô ${'abcdefghi'[selected % 9]}${9 - Math.floor(selected / 9)}: chọn quân</div><div class="scan-palette">` +
            PALETTE.map((p) => `<button type="button" class="scan-pc ${p ? (p === p.toUpperCase() ? 'is-red' : 'is-black') : ''} ${p === cur ? 'is-on' : ''}" data-pc="${p || ''}" title="${p ? (NAME[p.toUpperCase()] || '') + (p === p.toUpperCase() ? ' Đỏ' : ' Đen') : 'Xoá'}">${p ? GLYPH[p] : icon('x')}</button>`).join('') + '</div>';
        pal.querySelectorAll('[data-pc]').forEach((bt) => bt.addEventListener('click', () => {
            const pc = bt.dataset.pc || null;
            result.board[selected] = pc;
            result.conf[selected] = 1;
            edited.add(selected);
            // Sửa 1 quân → tự sửa các quân có chữ GIỐNG HỆT (cùng phần mềm vẽ y nhau), giữ màu của từng quân.
            const me = result.sigs[selected];
            let more = 0;
            if (pc && me && !/[Xx]/.test(pc)) {
                for (const [k, v] of Object.entries(result.sigs)) {
                    const j = +k, cur = result.board[j];
                    if (j === selected || edited.has(j) || !cur || /[Xx]/.test(cur) || cur.toUpperCase() === pc.toUpperCase()) continue;
                    if (sim(me, v) < 0.93) continue;   // chỉ chữ gần như trùng khít (đo trên ảnh thật: thấp hơn dễ sửa nhầm)
                    result.board[j] = cur === cur.toUpperCase() ? pc.toUpperCase() : pc.toLowerCase();
                    result.conf[j] = 0.4;   // chấm vàng: nhờ người dùng liếc lại
                    more++;
                }
            }
            if (more) toast(`Đã tự sửa thêm ${more} quân có chữ giống hệt — kiểm tra lại giúp nhé.`, { iconName: 'sparkles' });
            drawBoard();
        }));
    }
    $('[data-turn]').querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { redToMove = b.dataset.side === 'do'; drawBoard(); }));
    $('[data-flip-result]').addEventListener('click', () => {
        result.board = result.board.slice().reverse(); result.conf = result.conf.slice().reverse(); selected = -1;
        result.sigs = Object.fromEntries(Object.entries(result.sigs || {}).map(([k, v]) => [89 - k, v]));
        edited = new Set([...edited].map((k) => 89 - k));
        drawBoard();
    });
    $('[data-copy-fen]').addEventListener('click', () => navigator.clipboard?.writeText(fen()).then(() => toast('Đã sao chép FEN.')));
    $('[data-realign]').addEventListener('click', () => { steps.result.hidden = true; steps.align.scrollIntoView({ behavior: 'smooth' }); });

    const ready = () => { const v = validate(); if (v.length) { toast(v[0], { kind: 'err' }); return false; } learn(); return true; };
    /** Kết quả đã thẩm hợp lệ → ghi nhớ chữ ký nét chữ từng quân theo binh chủng (1 lần mỗi ảnh). */
    function learn() {
        if (learnedThisScan || !result?.sigs) return;
        learnedThisScan = true;
        const L = loadLearned();
        for (const [k, v] of Object.entries(result.sigs)) {
            const p = result.board[+k];
            if (!p || /[Xx]/.test(p)) continue;
            const t = p.toUpperCase();
            const vv = v.map((x) => Math.round(x * 100) / 100);
            if (L.some((e) => e.t === t && sim(e.v, vv) > 0.97)) continue;   // đã có mẫu gần như y hệt
            L.push({ t, v: vv });
            const same = L.filter((e) => e.t === t);
            if (same.length > LEARN_PER_TYPE) L.splice(L.indexOf(same[0]), 1);
        }
        save(LEARN_KEY, L);
    }
    // Túi quân úp còn lại mỗi bên (cờ úp): bộ 15 quân trừ quân đã lật đang có trên bàn.
    const tui = () => {
        const left = (red) => { const s = COUP_SET.split(''); result.board.forEach((p) => { if (p && p !== 'X' && p !== 'x' && p.toUpperCase() !== 'K' && (p === p.toUpperCase()) === red) { const i = s.indexOf(p.toUpperCase()); if (i >= 0) s.splice(i, 1); } }); return s.join(''); };
        return left(true) + '-' + left(false).toLowerCase();
    };
    $('[data-play]').addEventListener('click', () => {
        if (!ready()) return;
        const q = new URLSearchParams({ 'tu-the': fen(), luot: redToMove ? 'do' : 'den' });
        if (/[Xx]/.test(fen())) { q.set('bien-the', 'co-up'); q.set('tui', tui()); }
        location.href = cfg.playUrl + '?' + q;
    });
    $('[data-compose]').addEventListener('click', () => {
        if (!cfg.auth) { location.href = cfg.loginUrl; return; }
        if (!validate().length) learn();
        location.href = cfg.libraryUrl + '?' + new URLSearchParams({ fen: fen() });
    });
    $('[data-save]').addEventListener('click', async () => {
        if (!cfg.auth) { location.href = cfg.loginUrl; return; }
        if (!ready()) return;
        const title = ($('[data-title]').value || '').trim() || 'Thế cờ từ ảnh ' + new Date().toLocaleDateString('vi-VN');
        const res = await postJson(cfg.saveUrl, { fen: fen(), title, note: $('[data-note]').value || null }).catch(() => null);
        if (res?.ok) {
            track('scan_save');
            toast('Đã lưu vào thư viện.', { kind: 'ok', iconName: 'bookmark' });
            $('[data-saved]').innerHTML = `${icon('check-circle')} Đã lưu. <a href="${cfg.libraryUrl}?sua=${res.id}">Mở trong thư viện để thêm nước đi / biến</a>`;
        } else toast('Chưa lưu được — thử lại.', { kind: 'err' });
    });

    // Máy đánh giá thế cờ (engine chạy trong Web Worker như trang chơi với máy).
    let worker = null;
    $('[data-evaluate]').addEventListener('click', async () => {
        if (!ready()) return;
        const out = $('[data-eval-out]');
        out.innerHTML = `${icon('sparkles')} Máy đang tính…`;
        worker ??= new Worker(new URL('./engine/worker.js', import.meta.url), { type: 'module' });
        const coup = /[Xx]/.test(fen());
        const t = tui().split('-');
        const msg = { id: Date.now(), review: true, fen: fen(), red: redToMove, timeMs: 2500, pools: coup ? { red: t[0].split(''), black: t[1].toUpperCase().split('') } : undefined };
        const res = await new Promise((ok) => { worker.onmessage = (e) => ok(e.data); worker.postMessage(msg); });
        if (!res.best) { out.textContent = 'Bên đi không còn nước hợp lệ (bị chiếu hết / hết nước).'; return; }
        const m = R.fromIccs(res.best);
        const b = result.board.slice();
        let pc = b[m.from];
        if (pc === 'X' || pc === 'x') { const role = R.posRole(m.from) || 'P'; b[m.from] = pc === 'X' ? role : role.toLowerCase(); }
        const note = R.notation(b, m.from, m.to);
        const sc = res.score, abs = Math.abs(sc);
        const verdict = abs > 90000 ? (sc > 0 ? 'thấy đường chiếu hết' : 'đang bị dồn vào thế thua') : abs < 60 ? 'thế cờ cân bằng' : `${sc > 0 ? 'bên đi' : 'đối phương'} hơn khoảng ${(abs / 100).toFixed(1).replace('.', ',')} điểm`;
        out.innerHTML = `<b>${redToMove ? 'Đỏ' : 'Đen'} nên đi: ${escapeHtml(note)}</b> <span class="text-ink-soft">· ${verdict}${coup ? ' (cờ úp: ước lượng theo xác suất quân úp)' : ''}</span>`;
        holder.innerHTML = window.XiangqiBoard.render(fen(), null, [{ from: m.from, to: m.to, color: '#2f6b5e' }], -1, false);
        holder.querySelector('svg')?.addEventListener('click', onBoardClick);
        track('scan_evaluate');
    });

    // AI nhận dạng (Claude vision) — chỉ hiện khi hosting cấu hình khoá API.
    $('[data-ai]')?.addEventListener('click', async (e) => {
        if (!cfg.auth) { location.href = cfg.loginUrl; return; }
        const btn = e.currentTarget;
        btn.disabled = true; btn.innerHTML = `${icon('sparkles')} AI đang đọc ảnh…`;
        const cv = document.createElement('canvas');
        cv.width = rect.width; cv.height = rect.height;
        cv.getContext('2d').putImageData(new ImageData(rect.data, rect.width, rect.height), 0, 0);
        const res = await postJson(cfg.aiUrl, { image: cv.toDataURL('image/jpeg', 0.9).split(',')[1] }).catch(() => null);
        btn.disabled = false; btn.innerHTML = `${icon('sparkles')} Nhận dạng lại bằng AI`;
        if (!res?.fen) { toast(res?.message || 'AI chưa đọc được ảnh này.', { kind: 'err' }); return; }
        result.board = R.loadFen(res.fen); result.conf = new Array(90).fill(1); result.warnings = ['Kết quả từ AI — vẫn cần thẩm lại'];
        edited = new Set(); learnedThisScan = false;   // giữ chữ ký nét chữ (result.sigs) → dùng kết quả AI xong sẽ học kiểu chữ
        result.coup = /[Xx]/.test(res.fen); selected = -1;
        drawBoard();
        track('scan_ai');
    });
}
