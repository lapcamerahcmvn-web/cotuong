// Chơi với máy (cờ tướng + cờ úp): engine chạy trong Web Worker; ván đang chơi lưu localStorage.
// Cờ úp: ván giữ `layout` (danh tính 30 quân úp) để lật quân; máy CHỈ nhận "túi quân chưa lộ" của
// mỗi bên (không biết quân nào ở ô nào) → không nhìn trộm.
import { loadBoard, postJson, track, icon, escapeHtml, store, save, toast } from './core';
import { handleGamification, openSheet, confetti } from './gamification';
import { START_FEN, COUP_FEN, COUP_SET, loadFen, toFen, fromIccs, gameOver, stateFrom, inCheckSt, legalMovesSt, toIccs, isRed, LEVELS } from './engine/engine';
import { analyse, renderNotes, renderCaptured, lastNap, NAME } from './notation';

const poolCounts = (pool) => {
    const c = (list) => list.reduce((o, t) => ({ ...o, [t]: (o[t] || 0) + 1 }), { R: 0, C: 0, N: 0, A: 0, B: 0, P: 0 });
    return { do: c(pool.red), den: c(pool.black) };
};

const KEY = 'xq.bot.game';
const MAX_PLIES = 300;

export function init() {
    const root = document.querySelector('[data-bot]');
    if (!root) return;
    loadBoard().then(() => setup(root));
}

/**
 * Danh tính quân úp: thế mở chuẩn tráo đủ bộ 15 quân; thế tự chọn tráo từ túi quân chưa lộ `pool`
 * (thiếu dữ liệu thì suy từ quân đã ngửa trên bàn, hụt thì bù Tốt).
 */
function newLayout(startFen = COUP_FEN, pool = null) {
    const layout = {};
    const b = loadFen(startFen);
    [true, false].forEach((red) => {
        let set;
        if (pool) set = (red ? pool.red : pool.black).slice();
        else {
            set = COUP_SET.slice();
            if (startFen !== COUP_FEN) b.forEach((p) => { if (p && p !== 'X' && p !== 'x' && (p === p.toUpperCase()) === red) { const k = set.indexOf(p.toUpperCase()); if (k >= 0) set.splice(k, 1); } });
        }
        set.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 90; i++) if (b[i] === (red ? 'X' : 'x')) { const t = set.pop() || 'P'; layout[i] = red ? t : t.toLowerCase(); }
    });
    return layout;
}

const startOf = (g) => g.startFen || (g.variant === 'co-up' ? COUP_FEN : START_FEN);
const redFirstOf = (g) => g.redFirst !== false;

/**
 * Dựng lại bàn công khai từ các nước đã đi (lật quân theo layout). `capInfo[k]` = quân bị ăn thứ k lúc đó có đang úp
 * không + bên ăn — luật cờ úp: ăn nắp thì CHỈ bên ăn biết là quân gì.
 */
function replay(g) {
    const b = loadFen(startOf(g));
    const reveals = [], captured = [], capInfo = [];
    g.moves.forEach((m, i) => {
        const [f, t] = fromIccs(m);
        let p = b[f], rev = null;
        if (p === 'X' || p === 'x') { p = rev = g.layout[f]; }
        let v = b[t];
        const hidden = v === 'X' || v === 'x';
        if (hidden) v = g.layout[t];
        if (v) { captured.push(v); capInfo.push({ hidden, by: isRed(p) ? 'do' : 'den', ply: i }); }
        b[t] = p; b[f] = null;
        reveals.push(rev);
    });
    return { board: b, reveals, captured, capInfo };
}

const removeOne = (arr, t) => { const k = arr.indexOf(t); if (k >= 0) arr.splice(k, 1); };

function setup(root) {
    const $ = (s) => root.querySelector(s);
    const setupBox = $('[data-bot-setup]'), playBox = $('[data-bot-play]');
    const statusEl = $('[data-bot-status]'), listEl = $('[data-bot-moves]'), levelEl = $('[data-bot-level]');
    let worker = null, reqId = 0, g = null, board = null, view = null;

    const pick = { level: 2, side: 'do', variant: root.dataset.defaultVariant === 'co-up' ? 'co-up' : 'co-tuong' };
    const markOn = (sel, val, attr) => root.querySelectorAll(sel).forEach((x) => x.classList.toggle('is-on', x.dataset[attr] === String(val)));
    markOn('[data-pick-variant]', pick.variant, 'pickVariant');
    root.querySelectorAll('[data-pick-level]').forEach((b) => b.addEventListener('click', () => { pick.level = +b.dataset.pickLevel; markOn('[data-pick-level]', pick.level, 'pickLevel'); }));
    root.querySelectorAll('[data-pick-side]').forEach((b) => b.addEventListener('click', () => { pick.side = b.dataset.pickSide; markOn('[data-pick-side]', pick.side, 'pickSide'); }));
    root.querySelectorAll('[data-pick-variant]').forEach((b) => b.addEventListener('click', () => {
        pick.variant = b.dataset.pickVariant; markOn('[data-pick-variant]', pick.variant, 'pickVariant');
        root.querySelectorAll('[data-coup-only]').forEach((x) => { x.hidden = pick.variant !== 'co-up'; });
    }));
    root.querySelectorAll('[data-coup-only]').forEach((x) => { x.hidden = pick.variant !== 'co-up'; });

    // Thế tự chọn (?tu-the=…): đã được server kiểm tra hợp lệ.
    const custom = root.dataset.custom ? JSON.parse(root.dataset.custom) : null;
    if (custom) {
        pick.variant = /[Xx]/.test(custom.fen) ? 'co-up' : 'co-tuong';
        pick.side = custom.redFirst ? 'do' : 'den';
        markOn('[data-pick-side]', pick.side, 'pickSide');
        const vb = root.querySelector('[data-pick-variant]')?.parentElement;
        if (vb) { vb.hidden = true; vb.previousElementSibling.hidden = true; }
        root.querySelectorAll('[data-coup-only]').forEach((x) => { x.hidden = true; });
    }

    const fresh = (level, human, variant, from = null) => ({
        level, human, variant, moves: [], hints: 0, undos: 0, over: null, t0: Date.now(),
        startFen: from?.fen || null, redFirst: from ? from.redFirst : true, custom: from || null,
        layout: variant === 'co-up' ? newLayout(from?.fen || COUP_FEN, from?.pool || null) : null,
    });

    $('[data-bot-start]').addEventListener('click', () => {
        const side = pick.side === 'random' ? (Math.random() < 0.5 ? 'do' : 'den') : pick.side;
        start(fresh(pick.level, side, pick.variant, custom));
    });

    const saved = store(KEY, null);
    if (saved && !saved.over && saved.moves?.length) {
        const r = $('[data-bot-resume]');
        r.hidden = false;
        r.querySelector('[data-resume-label]').textContent = saved.variant === 'co-up' ? 'Bạn có ván CỜ ÚP đang chơi dở' : 'Bạn có ván đang chơi dở';
        r.querySelector('button').addEventListener('click', () => start(saved));
    }

    function getWorker() {
        if (!worker) worker = new Worker(new URL('./engine/worker.js', import.meta.url), { type: 'module' });
        return worker;
    }
    function ask(msg) {
        return new Promise((resolve) => {
            const id = ++reqId, w = getWorker();
            const on = (e) => { if (e.data.id === id) { w.removeEventListener('message', on); resolve(e.data); } };
            w.addEventListener('message', on);
            w.postMessage({ id, ...msg });
        });
    }

    const coup = () => g.variant === 'co-up';
    const humanRed = () => g.human === 'do';
    const turnRedAt = (k) => (k % 2 === 0) === redFirstOf(g);
    const turnRed = () => turnRedAt(g.moves.length);
    const fen = () => toFen(view.board);

    /** Quân bị ăn theo góc nhìn người chơi: nắp máy ăn của mình → chỉ biết màu ('X'/'x') cho tới khi hết ván. */
    const seenCaptured = () => view.captured.map((v, k) => (view.capInfo[k].hidden && view.capInfo[k].by !== g.human && !g.over ? (isRed(v) ? 'X' : 'x') : v));

    function refresh(animateLast) {
        view = replay(g);
        board.set(fen(), g.moves[g.moves.length - 1] || null, animateLast ? undefined : { noAnim: true, silent: true });
        const a = analyse(startOf(g), g.moves, view.reveals, seenCaptured(), g.custom?.pool ? poolCounts(g.custom.pool) : null);
        renderNotes(listEl, redFirstOf(g) ? a.notes : [null, ...a.notes]);
        renderCaptured($('[data-bot-captured]'), a, g.human, { over: !!g.over });
        const nap = animateLast && lastNap(a, g.moves.length);
        if (nap) {
            const mine = nap.by === g.human;
            const naps = a.caps.filter((c) => c.hidden && c.by !== g.human).length;
            toast(mine ? `Bạn ăn nắp: ${NAME[nap.p.toUpperCase()]}!` : `Máy vừa ăn 1 nắp của bạn (đã mất ${naps} nắp — chỉ máy biết là quân gì)`,
                { kind: mine ? 'xp' : 'err', iconName: mine ? 'sparkles' : 'x-circle', timeout: 3500 });
        }
    }

    function start(game) {
        g = game;
        setupBox.hidden = true; playBox.hidden = false;
        window.scrollTo({ top: Math.max(0, playBox.getBoundingClientRect().top + scrollY - 76), behavior: 'smooth' });
        levelEl.textContent = LEVELS[g.level].name;
        $('[data-bot-variant]').textContent = coup() ? 'Cờ úp' : 'Cờ tướng';
        $('[data-bot-variant]').hidden = !coup();
        const el = $('[data-bot-board]');
        el.innerHTML = '<div class="board-holder" data-xq-holder></div>';
        view = replay(g);
        board = window.XiangqiBoard.mountGame(el, { fen: fen(), red: humanRed(), coup: coup(), onMove: humanMove });
        refresh(false);
        persist();
        track('game_start', { mode: 'bot', level: g.level, side: g.human, variant: g.variant });
        next();
    }

    function apply(iccs) {
        g.moves.push(iccs);
        refresh(true);
        persist();
    }

    function humanMove(iccs) {
        if (g.over || turnRed() !== humanRed()) return;
        if (forbidden(iccs)) {
            status('Luật chiếu dai: không được chiếu lặp lại lần thứ 3 — hãy đi nước khác', 'err');
            toast('Không được chiếu lặp lại thế cờ lần thứ 3 (chiếu dai) — hãy đổi nước.', { kind: 'err', iconName: 'x-circle', timeout: 4500 });
            board.set(fen(), g.moves[g.moves.length - 1] || null, { noAnim: true, silent: true });
            return;
        }
        apply(iccs);
        next();
    }

    /** Lịch sử thế công khai: [khoá thế (bàn + lượt), nước vừa đi có chiếu không, bên vừa đi]. */
    function history() {
        const b = loadFen(startOf(g));
        const out = [[toFen(b) + (turnRedAt(0) ? 'r' : 'b'), false, null]];
        g.moves.forEach((m, i) => {
            const [f, t] = fromIccs(m);
            b[t] = view.reveals[i] || b[f]; b[f] = null;
            const moverRed = turnRedAt(i);
            out.push([toFen(b) + (moverRed ? 'b' : 'r'), inCheckSt(stateFrom(b, coup()), !moverRed), moverRed ? 'do' : 'den']);
        });
        return out;
    }

    /** Luật chiếu dai: nước CHIẾU đưa tới thế đã xuất hiện ≥ 2 lần (lần thứ 3) bị cấm. */
    function forbidden(iccs, hist = history()) {
        const [f, t] = fromIccs(iccs);
        const b = view.board.slice();
        let p = b[f];
        if (p === 'X' || p === 'x') p = g.layout[f];
        b[t] = p; b[f] = null;
        const moverRed = isRed(p);
        if (!inCheckSt(stateFrom(b, coup()), !moverRed)) return false;
        const key = toFen(b) + (moverRed ? 'b' : 'r');
        return hist.filter((h) => h[0] === key).length >= 2;
    }
    const forbiddenMoves = (red) => {
        const hist = history();
        return legalMovesSt(stateFrom(view.board, coup()), red).map(([f, t]) => toIccs(f, t)).filter((m) => forbidden(m, hist));
    };

    function result() {
        const end = gameOver(view.board, turnRed(), coup());
        if (end) return end;
        // Lặp thế 3 lần → hoà, trừ khi 1 bên chiếu liên tục trong chu kỳ (chiếu dai: bên đó bị cấm chiếu tiếp).
        const hist = history();
        const last = hist[hist.length - 1][0];
        const idx = hist.map((h, i) => (h[0] === last ? i : -1)).filter((i) => i >= 0);
        if (idx.length >= 3) {
            const span = hist.slice(idx[0] + 1);
            const perpetual = ['do', 'den'].some((sd) => { const mine = span.filter((h) => h[2] === sd); return mine.length && mine.every((h) => h[1]); });
            if (!perpetual) return { winner: null, reason: 'lặp lại thế cờ 3 lần' };
        }
        if (g.moves.length >= MAX_PLIES) return { winner: null, reason: 'quá ' + MAX_PLIES / 2 + ' nước' };
        return null;
    }

    /**
     * Túi quân chưa lộ của mỗi bên THEO HIỂU BIẾT của bên `forRed`: bộ 15 quân − quân đã lật (ai cũng thấy) − nắp do
     * chính bên này ăn (chỉ bên ăn biết). Nắp bị đối phương ăn vẫn nằm trong túi vì không biết là quân gì → túi có thể
     * nhiều hơn số quân úp còn trên bàn (engine bốc ngẫu nhiên đủ số).
     */
    function pools(forRed) {
        const base = g.custom?.pool;
        const bag = { red: base ? base.red.slice() : COUP_SET.slice(), black: base ? base.black.slice() : COUP_SET.slice() };
        if (!base && g.startFen) loadFen(g.startFen).forEach((p) => { if (p && p !== 'X' && p !== 'x' && p.toUpperCase() !== 'K') removeOne(isRed(p) ? bag.red : bag.black, p.toUpperCase()); });
        view.reveals.forEach((rv) => { if (rv) removeOne(isRed(rv) ? bag.red : bag.black, rv.toUpperCase()); });
        view.capInfo.forEach((c, k) => {
            if (c.hidden && (c.by === 'do') === forRed) { const v = view.captured[k]; removeOne(isRed(v) ? bag.red : bag.black, v.toUpperCase()); }
        });
        return bag;
    }

    function engineMsg(red, extra = {}) {
        const avoid = forbiddenMoves(red);
        return coup() ? { fen: fen(), red, coup: true, pools: pools(red), avoid, ...extra } : { fen: fen(), red, avoid, ...extra };
    }

    async function next() {
        const r = result();
        if (r) return finish(r);
        const humanTurn = turnRed() === humanRed();
        board.lock(!humanTurn);
        const check = inCheckSt(stateFrom(view.board, coup()), turnRed());
        status(humanTurn ? (check ? 'Bạn đang bị chiếu!' : 'Đến lượt bạn') : 'Máy đang suy nghĩ…', humanTurn ? (check ? 'err' : 'ok') : null);
        if (humanTurn) return;
        const t0 = Date.now();
        const res = await ask(engineMsg(!humanRed(), { level: g.level }));
        await new Promise((ok) => setTimeout(ok, Math.max(0, 450 - (Date.now() - t0))));
        if (g.over || !res.move) return;
        apply(res.move);
        next();
    }

    function status(text, kind) {
        statusEl.textContent = text;
        statusEl.className = 'tag ' + (kind === 'ok' ? 'tag--done' : kind === 'err' ? 'tag--level-nang-cao' : '');
    }

    function persist() { save(KEY, g); }

    // ---- Nút điều khiển ----
    $('[data-bot-undo]').addEventListener('click', () => {
        if (g.over || turnRed() !== humanRed() || g.moves.length < 2) return;
        g.moves = g.moves.slice(0, -2);
        g.undos++;
        refresh(false); persist(); next();
    });
    $('[data-bot-hint]').addEventListener('click', async () => {
        if (g.over || turnRed() !== humanRed()) return;
        status('Đang tìm gợi ý…', null);
        const res = await ask(engineMsg(humanRed(), { analyse: true }));
        if (res.move && turnRed() === humanRed()) { g.hints++; board.showArrow(res.move, '#d99a1e'); status('Gợi ý: mũi tên vàng', 'ok'); persist(); }
    });
    $('[data-bot-flip]').addEventListener('click', () => board.flip());
    $('[data-bot-resign]').addEventListener('click', () => {
        if (g.over || !confirm('Xin thua ván này?')) return;
        finish({ winner: humanRed() ? 'den' : 'do', reason: 'xin thua' });
    });
    $('[data-bot-new]').addEventListener('click', () => {
        if (!g.over && g.moves.length > 4 && !confirm('Bỏ ván đang chơi và bắt đầu ván mới?')) return;
        save(KEY, null);
        playBox.hidden = true; setupBox.hidden = false;
        $('[data-bot-resume]').hidden = true;
    });

    async function finish(r) {
        g.over = r; persist();
        refresh(false);           // hết ván: nắp đối phương đã ăn thành "?" bấm để lật
        board.lock(true);
        const outcome = r.winner === null ? 'draw' : (r.winner === g.human ? 'win' : 'loss');
        status(outcome === 'win' ? 'Bạn thắng!' : outcome === 'loss' ? 'Máy thắng' : 'Hoà', outcome === 'win' ? 'ok' : 'err');
        track('game_finish', { mode: 'bot', level: g.level, result: outcome, variant: g.variant });
        let res = null;
        if (window.__xq?.auth) {
            res = await postJson('/choi-voi-may/ket-qua', {
                level: g.level, result: outcome, plies: g.moves.length, hints: g.hints, undos: g.undos, ms: Date.now() - g.t0, variant: g.variant,
                side: g.human, reason: String(r.reason || '').slice(0, 60), moves: g.moves,
                reveals: coup() ? view.reveals : [], captured: coup() ? view.captured : [],
                ...(g.startFen ? { start_fen: g.startFen, first_side: redFirstOf(g) ? 'do' : 'den' } : {}),
            }).catch(() => null);
        }
        const kind = coup() ? 'cờ úp' : 'cờ tướng';
        const title = outcome === 'win' ? 'Bạn đã thắng!' : outcome === 'loss' ? 'Máy thắng ván này' : 'Ván cờ hoà';
        const glyph = outcome === 'win' ? 'trophy' : outcome === 'loss' ? 'shield' : 'repeat';
        const xp = res?.gamification?.xp || 0;
        const canUp = outcome === 'win' && g.level < 4;
        const dlg = openSheet(`<div class="celebrate">
            <div class="celebrate__burst">${icon(glyph)}</div>
            <h2>${title}</h2>
            <p class="muted">${escapeHtml(kind)} · cấp ${escapeHtml(LEVELS[g.level].name)} · ${Math.ceil(g.moves.length / 2)} nước · ${escapeHtml(r.reason)}</p>
            ${g.startFen ? '<p class="text-[13px] text-ink-soft">Ván từ thế tự chọn — không tính XP.</p>' : ''}
            ${xp ? `<div class="celebrate__xp">${icon('star')} +${xp} XP</div>` : ''}
            ${!window.__xq?.auth && outcome === 'win' ? '<p class="text-[13.5px] text-ink-soft">Đăng nhập để nhận XP khi thắng máy.</p>' : ''}
            <div class="celebrate__actions mt-3">
                ${canUp ? `<button type="button" class="btn btn--primary btn--lg" data-again="${g.level + 1}">${icon('zap')} Thử cấp ${escapeHtml(LEVELS[g.level + 1].name)}</button>` : ''}
                <button type="button" class="btn ${canUp ? '' : 'btn--primary'} btn--lg" data-again="${g.level}">${icon('repeat')} Chơi lại</button>
                ${res?.record_url ? `<a class="btn btn--ghost" href="${escapeHtml(res.record_url)}">${icon('eye')} Xem lại ván · thêm biến</a>` : ''}
                <button type="button" class="btn btn--ghost" data-share>${icon('share')} Chia sẻ kết quả</button>
            </div>
            ${!window.__xq?.auth ? '<p class="text-[13px] text-ink-soft mt-2">Đăng nhập để tự lưu lịch sử ván đấu và xem lại.</p>' : ''}</div>`);
        if (outcome === 'win') confetti(dlg.querySelector('.celebrate'));
        dlg.querySelectorAll('[data-again]').forEach((b) => b.addEventListener('click', () => {
            dlg.close();
            start(fresh(+b.dataset.again, g.human, g.variant, g.custom));
        }));
        dlg.querySelector('[data-share]').addEventListener('click', () => {
            const verb = outcome === 'win' ? 'thắng' : outcome === 'loss' ? 'thua' : 'hoà';
            import('./share').then((m) => m.share(`♟ Tôi vừa ${verb} máy ván ${kind} cấp ${LEVELS[g.level].name} sau ${Math.ceil(g.moves.length / 2)} nước trên Học Cờ Tướng!`, location.origin + '/choi-voi-may' + (coup() ? '?bien-the=co-up' : '')));
        });
        if (res?.gamification) handleGamification(res.gamification, { silent: true });
    }
}
