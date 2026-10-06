// Xếp cờ để thẩm (/luyen-tap/xep-co): bàn xếp quân cờ tướng / cờ úp → kiểm tra hợp lệ →
// sang "Chơi với máy" với thế tự chọn (máy tự giải / người cầm 1 bên, đổi bên trong ván) hoặc lưu thư viện.
import { loadBoard, postJson, toast, store, save, track } from './core';

const START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
const COUP_START = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';
const EMPTY = '4k4/9/9/9/9/9/9/9/9/3K5';   // 2 Tướng lệch cột (đối mặt là không hợp lệ)
const GLYPH = { K: '帥', A: '仕', B: '相', N: '傌', R: '俥', C: '炮', P: '兵', k: '將', a: '士', b: '象', n: '馬', r: '車', c: '砲', p: '卒', X: '?', x: '?' };
const NAME = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt', X: 'quân úp' };
const LIMIT = { K: 1, A: 2, B: 2, N: 2, R: 2, C: 2, P: 5 };
const M = 26, CW = 52, CH = 52;
const KEY = 'xq.setup';

export function init() {
    const root = document.querySelector('[data-setup]');
    if (root) loadBoard().then(() => run(root));
}

function run(root) {
    const R = window.XiangqiRules, XB = window.XiangqiBoard;
    const $ = (s) => root.querySelector(s);
    const holder = $('[data-setup-board]'), msgEl = $('[data-setup-msg]'), fenInput = $('[data-setup-fen]');

    const qs = new URLSearchParams(location.search);
    const saved = store(KEY, null);
    const fromUrl = qs.get('fen') && /^[0-9a-zA-Z/]+$/.test(qs.get('fen')) ? qs.get('fen') : null;
    let b = R.loadFen(fromUrl || saved?.fen || START);
    let redFirst = fromUrl ? qs.get('luot') !== 'den' : saved ? saved.redFirst !== false : true;
    let coup = b.some((p) => p === 'X' || p === 'x') || (!fromUrl && saved?.variant === 'co-up');
    let flip = false, pick = null, held = -1, level = 4;

    const name = (p) => (p === 'X' || p === 'x' ? 'quân úp ' + (p === 'X' ? 'Đỏ' : 'Đen') : NAME[p.toUpperCase()] + (R.isRed(p) ? ' Đỏ' : ' Đen'));
    const count = (p) => b.filter((x) => x === p).length;
    const sideCount = (red) => b.filter((x) => x && x.toUpperCase() !== 'K' && R.isRed(x) === red).length;

    /** Ô đặt quân hợp lệ. Cờ úp: quân úp chỉ đứng trên ô xuất phát (không phải ô Tướng) bên mình; Sĩ/Tượng đã lật đi tự do. */
    function zoneOk(p, i) {
        const r = (i / 9) | 0, c = i % 9, red = R.isRed(p), t = p.toUpperCase();
        if (t === 'X') { const role = R.posRole(i); return !!role && role !== 'K' && (red ? r >= 5 : r <= 4); }
        if (t === 'K' || (t === 'A' && !coup)) return c >= 3 && c <= 5 && (red ? r >= 7 : r <= 2);
        if (coup) return true;
        if (t === 'B') return (red ? r >= 5 : r <= 4) && [[0, 2], [0, 6], [2, 0], [2, 4], [2, 8], [4, 2], [4, 6]].some(([y, x]) => (red ? 9 - y : y) === r && x === c);
        if (t === 'A') return true;
        if (t === 'P') return red ? r <= 6 && (r <= 4 || c % 2 === 0) : r >= 3 && (r >= 5 || c % 2 === 0);
        return true;
    }

    function canAdd(p, i) {
        if (!zoneOk(p, i)) return `${name(p)} không đặt được ở ô này.`;
        if (b[i] === p) return null;
        const t = p.toUpperCase(), red = R.isRed(p);
        if (t !== 'X' && count(p) >= LIMIT[t]) return `Đã đủ ${LIMIT[t]} ${name(p)}.`;
        if (t !== 'K' && sideCount(red) - (b[i] && b[i].toUpperCase() !== 'K' && R.isRed(b[i]) === red ? 1 : 0) >= 15) return `Mỗi bên tối đa 15 quân ngoài Tướng.`;
        return null;
    }

    /** Lỗi khiến chưa thẩm được thế cờ (null = hợp lệ). Khớp GameRecordService::validStart phía server. */
    function problem() {
        if (count('K') !== 1 || count('k') !== 1) return 'Mỗi bên cần đúng 1 Tướng.';
        if (R.inCheck(b, !redFirst, coup)) return `Bên ${redFirst ? 'Đen' : 'Đỏ'} (vừa đi) đang bị chiếu hoặc hai Tướng đối mặt — thế cờ không hợp lệ.`;
        for (let f = 0; f < 90; f++) {
            if (!b[f] || R.isRed(b[f]) !== redFirst) continue;
            for (let t = 0; t < 90; t++) if (R.legalNoSelfCheck(b, f, t, false, coup)) return null;
        }
        return `Bên ${redFirst ? 'Đỏ' : 'Đen'} không còn nước đi — thế cờ đã kết thúc.`;
    }

    function msg(text, kind) {
        msgEl.className = 'card card--pad font-bold ' + (kind === 'ok' ? '!bg-jade-soft !text-jade-ink' : kind === 'err' ? '!bg-danger-soft !text-danger' : '');
        msgEl.textContent = text;
    }

    function render() {
        const fen = R.toFen(b);
        let svg = XB.render(fen, null, null, held >= 0 ? held : null, flip);
        let hit = '';
        for (let i = 0; i < 90; i++) {
            const r = (i / 9) | 0, c = i % 9, dr = flip ? 9 - r : r, dc = flip ? 8 - c : c;
            hit += `<circle class="setup-hit" data-sq="${i}" cx="${M + dc * CW}" cy="${M + dr * CH}" r="25" fill="transparent"/>`;
        }
        holder.innerHTML = svg.replace('</svg>', hit + '</svg>');
        if (document.activeElement !== fenInput) fenInput.value = fen;
        root.querySelectorAll('[data-setup-variant]').forEach((x) => x.classList.toggle('is-on', x.dataset.setupVariant === (coup ? 'co-up' : 'co-tuong')));
        root.querySelectorAll('[data-setup-turn]').forEach((x) => x.classList.toggle('is-on', (x.dataset.setupTurn === 'do') === redFirst));
        $('[data-setup-turn-tag]').textContent = (redFirst ? 'Đỏ' : 'Đen') + ' đi trước';
        $('[data-setup-title]').textContent = coup ? 'Bàn xếp quân · Cờ úp' : 'Bàn xếp quân · Cờ tướng';
        renderPalette();
        const p = problem();
        p ? msg(p, 'err') : msg(`Thế cờ hợp lệ · ${redFirst ? 'Đỏ' : 'Đen'} đi trước — chọn cách thẩm bên dưới.`, 'ok');
        root.querySelectorAll('[data-setup-go]').forEach((x) => { x.disabled = !!p; });
        save(KEY, { fen, redFirst, variant: coup ? 'co-up' : 'co-tuong' });
    }

    function renderPalette() {
        const list = ['R', 'N', 'B', 'A', 'K', 'C', 'P', ...(coup ? ['X'] : []), 'r', 'n', 'b', 'a', 'k', 'c', 'p', ...(coup ? ['x'] : [])];
        const pal = $('[data-setup-palette]');
        pal.innerHTML = list.map((p) => {
            const left = p.toUpperCase() === 'X' ? 15 - sideCount(R.isRed(p)) : Math.min(LIMIT[p.toUpperCase()] - count(p), 15 - sideCount(R.isRed(p)));
            return `<button type="button" class="pal ${R.isRed(p) ? 'is-red' : 'is-black'} ${p.toUpperCase() === 'X' ? 'is-up' : ''} ${pick === p ? 'is-on' : ''}" data-p="${p}" title="${name(p)} (còn đặt được ${Math.max(0, left)})" aria-label="${name(p)}"><span>${GLYPH[p]}</span><small>${Math.max(0, left)}</small></button>`;
        }).join('') + `<button type="button" class="pal is-erase ${pick === 'erase' ? 'is-on' : ''}" data-p="erase" title="Xoá quân" aria-label="Xoá quân"><span>✕</span><small>Xoá</small></button>`;
    }

    $('[data-setup-palette]').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-p]');
        if (!btn) return;
        pick = pick === btn.dataset.p ? null : btn.dataset.p;
        held = -1;
        render();
    });

    holder.addEventListener('click', (e) => {
        const c = e.target.closest('[data-sq]');
        if (!c) return;
        const i = +c.dataset.sq;
        if (pick === 'erase') {
            if (b[i] && b[i].toUpperCase() === 'K') return toast('Không xoá được Tướng — kéo Tướng sang ô khác trong cung.', { kind: 'err', iconName: 'x-circle' });
            b[i] = null; return render();
        }
        if (pick) {
            if (b[i] && b[i].toUpperCase() === 'K' && pick !== b[i]) return toast('Ô này đang có Tướng.', { kind: 'err', iconName: 'x-circle' });
            if (b[i] === pick) { b[i] = null; return render(); }     // bấm lại cùng quân = bỏ quân
            const err = pick.toUpperCase() === 'K' ? (zoneOk(pick, i) ? null : 'Tướng phải ở trong cung.') : canAdd(pick, i);
            if (err) return toast(err, { kind: 'err', iconName: 'x-circle' });
            if (pick.toUpperCase() === 'K') b = b.map((x) => (x === pick ? null : x));   // Tướng: chuyển chỗ
            b[i] = pick;
            return render();
        }
        // Không chọn quân ở bảng: bấm quân rồi bấm ô khác để di chuyển.
        if (held < 0) { if (b[i]) { held = i; render(); } return; }
        if (held === i) { held = -1; return render(); }
        const p = b[held];
        if (b[i] && b[i].toUpperCase() === 'K') { held = -1; render(); return toast('Không đặt đè lên Tướng.', { kind: 'err', iconName: 'x-circle' }); }
        if (!zoneOk(p, i)) { held = -1; render(); return toast(`${name(p)} không đặt được ở ô này.`, { kind: 'err', iconName: 'x-circle' }); }
        b[i] = p; b[held] = null; held = -1;
        render();
    });

    root.querySelectorAll('[data-setup-variant]').forEach((x) => x.addEventListener('click', () => {
        const want = x.dataset.setupVariant === 'co-up';
        if (want === coup) return;
        coup = want;
        // Đổi sang cờ tướng: bỏ quân úp. Đổi sang cờ úp: bày thế mở cờ úp nếu bàn đang là thế mở cờ tướng.
        if (!coup) b = b.map((p) => (p === 'X' || p === 'x' ? null : p));
        else if (R.toFen(b) === START) b = R.loadFen(COUP_START);
        pick = null; held = -1;
        render();
    }));
    root.querySelectorAll('[data-setup-turn]').forEach((x) => x.addEventListener('click', () => { redFirst = x.dataset.setupTurn === 'do'; render(); }));
    root.querySelectorAll('[data-setup-level]').forEach((x) => x.addEventListener('click', () => {
        level = +x.dataset.setupLevel;
        root.querySelectorAll('[data-setup-level]').forEach((y) => y.classList.toggle('is-on', y === x));
    }));
    $('[data-setup-start]').addEventListener('click', () => { b = R.loadFen(coup ? COUP_START : START); redFirst = true; held = -1; render(); });
    $('[data-setup-clear]').addEventListener('click', () => { b = R.loadFen(EMPTY); held = -1; render(); });
    $('[data-setup-flip]').addEventListener('click', () => { flip = !flip; render(); });
    $('[data-setup-fen-apply]').addEventListener('click', () => {
        const f = fenInput.value.trim().split(/\s+/);
        if (!/^[0-9a-zA-Z/]+$/.test(f[0]) || f[0].split('/').length !== 10) return toast('Chuỗi FEN không đúng định dạng.', { kind: 'err', iconName: 'x-circle' });
        b = R.loadFen(f[0]);
        if (f[1]) redFirst = f[1] !== 'b';
        coup = b.some((p) => p === 'X' || p === 'x');
        held = -1;
        render();
    });
    $('[data-setup-fen-copy]').addEventListener('click', () => {
        navigator.clipboard?.writeText(R.toFen(b) + (redFirst ? ' w' : ' b')).then(() => toast('Đã sao chép FEN.', { iconName: 'copy' }));
    });

    root.querySelectorAll('[data-setup-go]').forEach((x) => x.addEventListener('click', () => {
        if (problem()) return;
        try { localStorage.removeItem('xq.bot.game'); } catch (e) { /* bỏ qua */ }   // không để ván dở cũ chen vào
        track('setup_analyse', { mode: x.dataset.setupGo, variant: coup ? 'co-up' : 'co-tuong' });
        location.href = `/choi-voi-may?tu-the=${encodeURIComponent(R.toFen(b))}&luot=${redFirst ? 'do' : 'den'}&cam=${x.dataset.setupGo}&cap=${level}`;
    }));

    $('[data-setup-save]')?.addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        btn.disabled = true;
        const title = ($('[data-setup-name]')?.value || '').trim() || `Thế tự xếp ${new Date().toLocaleDateString('vi-VN')}`;
        try {
            await postJson('/thu-vien', { fen: R.toFen(b), title, note: `${redFirst ? 'Đỏ' : 'Đen'} đi trước · ${coup ? 'Cờ úp' : 'Cờ tướng'} · xếp từ "Xếp cờ để thẩm"` });
            toast('Đã lưu vào thư viện thế cờ.', { kind: 'xp', iconName: 'bookmark' });
            track('setup_save');
        } catch (err) {
            toast(err.data?.message || 'Chưa lưu được — thử lại.', { kind: 'err', iconName: 'x-circle' });
        }
        btn.disabled = false;
    });

    render();
}
