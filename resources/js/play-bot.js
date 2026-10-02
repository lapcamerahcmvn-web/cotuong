// Chơi với máy (cờ tướng + cờ úp): engine chạy trong Web Worker; ván đang chơi lưu localStorage.
// Cờ úp: ván giữ `layout` (danh tính 30 quân úp) để lật quân; máy CHỈ nhận "túi quân chưa lộ" của
// mỗi bên (không biết quân nào ở ô nào) → không nhìn trộm.
import { loadBoard, postJson, track, icon, escapeHtml, store, save } from './core';
import { handleGamification, openSheet, confetti } from './gamification';
import { START_FEN, COUP_FEN, COUP_SET, loadFen, toFen, fromIccs, gameOver, stateFrom, inCheckSt, LEVELS } from './engine/engine';
import { buildNotes, renderNotes, renderCaptured } from './notation';

const KEY = 'xq.bot.game';
const MAX_PLIES = 300;

export function init() {
    const root = document.querySelector('[data-bot]');
    if (!root) return;
    loadBoard().then(() => setup(root));
}

function newLayout() {
    const layout = {};
    const b = loadFen(COUP_FEN);
    [true, false].forEach((red) => {
        const set = COUP_SET.slice().sort(() => Math.random() - 0.5);
        for (let i = 0; i < 90; i++) if (b[i] === (red ? 'X' : 'x')) layout[i] = red ? set.pop() : set.pop().toLowerCase();
    });
    return layout;
}

/** Dựng lại bàn công khai từ các nước đã đi (lật quân theo layout). */
function replay(g) {
    const b = loadFen(g.variant === 'co-up' ? COUP_FEN : START_FEN);
    const reveals = [], captured = [];
    for (const m of g.moves) {
        const [f, t] = fromIccs(m);
        let p = b[f], rev = null;
        if (p === 'X' || p === 'x') { p = rev = g.layout[f]; }
        let v = b[t];
        if (v === 'X' || v === 'x') v = g.layout[t];
        if (v) captured.push(v);
        b[t] = p; b[f] = null;
        reveals.push(rev);
    }
    return { board: b, reveals, captured };
}

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

    const fresh = (level, human, variant) => ({
        level, human, variant, moves: [], hints: 0, undos: 0, over: null, t0: Date.now(),
        layout: variant === 'co-up' ? newLayout() : null,
    });

    $('[data-bot-start]').addEventListener('click', () => {
        const side = pick.side === 'random' ? (Math.random() < 0.5 ? 'do' : 'den') : pick.side;
        start(fresh(pick.level, side, pick.variant));
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
    const turnRed = () => g.moves.length % 2 === 0;           // ván luôn từ thế đầu, Đỏ đi trước
    const fen = () => toFen(view.board);

    function refresh(animateLast) {
        view = replay(g);
        board.set(fen(), g.moves[g.moves.length - 1] || null, animateLast ? undefined : { noAnim: true, silent: true });
        const startFen = coup() ? COUP_FEN : START_FEN;
        renderNotes(listEl, buildNotes(startFen, g.moves, view.reveals));
        const hidden = coup() ? { red: view.board.filter((p) => p === 'X').length, black: view.board.filter((p) => p === 'x').length } : null;
        renderCaptured($('[data-bot-captured]'), view.captured.slice(), hidden);
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
        apply(iccs);
        next();
    }

    function result() {
        const end = gameOver(view.board, turnRed(), coup());
        if (end) return end;
        // Lặp thế 3 lần — tính trên bàn công khai.
        const b = loadFen(coup() ? COUP_FEN : START_FEN);
        const seen = { [toFen(b) + 'r']: 1 };
        g.moves.forEach((m, i) => {
            const [f, t] = fromIccs(m);
            b[t] = view.reveals[i] || b[f]; b[f] = null;
            const k = toFen(b) + (i % 2 ? 'r' : 'b');
            seen[k] = (seen[k] || 0) + 1;
        });
        if (Object.values(seen).some((n) => n >= 3)) return { winner: null, reason: 'lặp lại thế cờ 3 lần' };
        if (g.moves.length >= MAX_PLIES) return { winner: null, reason: 'quá ' + MAX_PLIES / 2 + ' nước' };
        return null;
    }

    /** Túi quân chưa lộ của mỗi bên — thứ duy nhất máy được biết về quân úp. */
    function pools() {
        const red = [], black = [];
        view.board.forEach((p, i) => {
            if (p === 'X') red.push(g.layout[i]);
            else if (p === 'x') black.push(g.layout[i].toUpperCase());
        });
        return { red, black };
    }

    function engineMsg(red, extra = {}) {
        return coup() ? { fen: fen(), red, coup: true, pools: pools(), ...extra } : { fen: fen(), red, ...extra };
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
        board.lock(true);
        const outcome = r.winner === null ? 'draw' : (r.winner === g.human ? 'win' : 'loss');
        status(outcome === 'win' ? 'Bạn thắng!' : outcome === 'loss' ? 'Máy thắng' : 'Hoà', outcome === 'win' ? 'ok' : 'err');
        track('game_finish', { mode: 'bot', level: g.level, result: outcome, variant: g.variant });
        let res = null;
        if (window.__xq?.auth) {
            res = await postJson('/choi-voi-may/ket-qua', {
                level: g.level, result: outcome, plies: g.moves.length, hints: g.hints, undos: g.undos, ms: Date.now() - g.t0, variant: g.variant,
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
            ${xp ? `<div class="celebrate__xp">${icon('star')} +${xp} XP</div>` : ''}
            ${!window.__xq?.auth && outcome === 'win' ? '<p class="text-[13.5px] text-ink-soft">Đăng nhập để nhận XP khi thắng máy.</p>' : ''}
            <div class="celebrate__actions mt-3">
                ${canUp ? `<button type="button" class="btn btn--primary btn--lg" data-again="${g.level + 1}">${icon('zap')} Thử cấp ${escapeHtml(LEVELS[g.level + 1].name)}</button>` : ''}
                <button type="button" class="btn ${canUp ? '' : 'btn--primary'} btn--lg" data-again="${g.level}">${icon('repeat')} Chơi lại</button>
                <button type="button" class="btn btn--ghost" data-share>${icon('share')} Chia sẻ kết quả</button>
            </div></div>`);
        if (outcome === 'win') confetti(dlg.querySelector('.celebrate'));
        dlg.querySelectorAll('[data-again]').forEach((b) => b.addEventListener('click', () => {
            dlg.close();
            start(fresh(+b.dataset.again, g.human, g.variant));
        }));
        dlg.querySelector('[data-share]').addEventListener('click', () => {
            const verb = outcome === 'win' ? 'thắng' : outcome === 'loss' ? 'thua' : 'hoà';
            import('./share').then((m) => m.share(`♟ Tôi vừa ${verb} máy ván ${kind} cấp ${LEVELS[g.level].name} sau ${Math.ceil(g.moves.length / 2)} nước trên Học Cờ Tướng!`, location.origin + '/choi-voi-may' + (coup() ? '?bien-the=co-up' : '')));
        });
        if (res?.gamification) handleGamification(res.gamification, { silent: true });
    }
}
