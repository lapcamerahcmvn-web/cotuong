// Chơi với máy: engine chạy trong Web Worker; ván đang chơi lưu localStorage để mở lại.
import { loadBoard, postJson, track, icon, escapeHtml, store, save } from './core';
import { handleGamification, openSheet, confetti } from './gamification';
import { START_FEN, loadFen, toFen, legalMoves, inCheck, fromIccs, LEVELS } from './engine/engine';

const KEY = 'xq.bot.game';
const MAX_PLIES = 300;

export function init() {
    const root = document.querySelector('[data-bot]');
    if (!root) return;
    loadBoard().then(() => setup(root));
}

function setup(root) {
    const $ = (s) => root.querySelector(s);
    const setupBox = $('[data-bot-setup]'), playBox = $('[data-bot-play]');
    const statusEl = $('[data-bot-status]'), listEl = $('[data-bot-moves]'), levelEl = $('[data-bot-level]');
    let worker = null, reqId = 0, g = null, board = null;

    const pick = { level: 2, side: 'do' };
    root.querySelectorAll('[data-pick-level]').forEach((b) => b.addEventListener('click', () => {
        pick.level = +b.dataset.pickLevel; mark('[data-pick-level]', b);
    }));
    root.querySelectorAll('[data-pick-side]').forEach((b) => b.addEventListener('click', () => {
        pick.side = b.dataset.pickSide; mark('[data-pick-side]', b);
    }));
    function mark(sel, on) { root.querySelectorAll(sel).forEach((x) => x.classList.toggle('is-on', x === on)); }

    $('[data-bot-start]').addEventListener('click', () => {
        const side = pick.side === 'random' ? (Math.random() < 0.5 ? 'do' : 'den') : pick.side;
        start({ level: pick.level, human: side, fen: START_FEN, moves: [], hints: 0, undos: 0, over: null, t0: Date.now() });
    });

    const saved = store(KEY, null);
    if (saved && !saved.over && saved.moves?.length) {
        const r = $('[data-bot-resume]');
        r.hidden = false;
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

    const humanRed = () => g.human === 'do';
    const turnRed = () => g.moves.length % 2 === 0;           // ván luôn bắt đầu từ thế chuẩn, Đỏ đi trước
    const curFen = () => g.fen;

    function start(game) {
        g = game;
        setupBox.hidden = true; playBox.hidden = false;
        window.scrollTo({ top: Math.max(0, playBox.getBoundingClientRect().top + scrollY - 76), behavior: 'smooth' });
        levelEl.textContent = LEVELS[g.level].name;
        const el = $('[data-bot-board]');
        el.innerHTML = '<div class="board-holder" data-xq-holder></div>';
        board = window.XiangqiBoard.mountGame(el, { fen: g.fen, red: humanRed(), onMove: humanMove });
        board.set(g.fen, g.moves[g.moves.length - 1] || null, { noAnim: true, silent: true });
        renderMoves();
        persist();
        track('game_start', { mode: 'bot', level: g.level, side: g.human });
        next();
    }

    function apply(iccs) {
        const b = loadFen(g.fen);
        const [f, t] = fromIccs(iccs);
        const note = window.XiangqiRules.notation(b, f, t);
        b[t] = b[f]; b[f] = null;
        g.fen = toFen(b);
        g.moves.push(iccs);
        (g.notes ||= []).push(note);
        board.set(g.fen, iccs);
        renderMoves();
        persist();
    }

    function humanMove(iccs) {
        if (g.over || turnRed() !== humanRed()) return;
        apply(iccs);
        next();
    }

    function result() {
        const b = loadFen(g.fen), red = turnRed();
        if (!legalMoves(b, red).length) return { winner: red ? 'den' : 'do', reason: inCheck(b, red) ? 'chiếu hết' : 'hết nước đi' };
        const seen = {};
        // Tính lặp từ các thế đã qua (dựng lại từ nước đi).
        let fb = loadFen(START_FEN);
        seen[toFen(fb) + 'r'] = 1;
        g.moves.forEach((m, i) => {
            const [f, t] = fromIccs(m); fb[t] = fb[f]; fb[f] = null;
            const k = toFen(fb) + (i % 2 ? 'r' : 'b');
            seen[k] = (seen[k] || 0) + 1;
        });
        if (Object.values(seen).some((n) => n >= 3)) return { winner: null, reason: 'lặp lại thế cờ 3 lần' };
        if (g.moves.length >= MAX_PLIES) return { winner: null, reason: 'quá ' + MAX_PLIES / 2 + ' nước' };
        return null;
    }

    async function next() {
        const r = result();
        if (r) return finish(r);
        const humanTurn = turnRed() === humanRed();
        board.lock(!humanTurn);
        const check = inCheck(loadFen(g.fen), turnRed());
        status(humanTurn ? (check ? 'Bạn đang bị chiếu!' : 'Đến lượt bạn') : 'Máy đang suy nghĩ…', humanTurn ? (check ? 'err' : 'ok') : null);
        if (humanTurn) return;
        const t0 = Date.now();
        const res = await ask({ fen: curFen(), red: !humanRed(), level: g.level });
        await new Promise((ok) => setTimeout(ok, Math.max(0, 450 - (Date.now() - t0))));
        if (g.over || !res.move) return;
        apply(res.move);
        next();
    }

    function status(text, kind) {
        statusEl.textContent = text;
        statusEl.className = 'tag ' + (kind === 'ok' ? 'tag--done' : kind === 'err' ? 'tag--level-nang-cao' : '');
    }

    function renderMoves() {
        const notes = g.notes || [];
        let h = '';
        for (let i = 0; i < notes.length; i += 2) {
            h += `<div class="flex gap-2 py-1.5 border-b border-line text-[14px]"><span class="w-7 text-ink-faint font-bold">${i / 2 + 1}.</span>
                <span class="flex-1"><span class="side-dot do"></span>${escapeHtml(notes[i])}</span>
                <span class="flex-1">${notes[i + 1] ? '<span class="side-dot den"></span>' + escapeHtml(notes[i + 1]) : ''}</span></div>`;
        }
        listEl.innerHTML = h || '<p class="text-ink-faint text-[14px] m-0">Chưa có nước nào.</p>';
        listEl.scrollTop = listEl.scrollHeight;
    }

    function persist() { save(KEY, g); }

    // ---- Nút điều khiển ----
    $('[data-bot-undo]').addEventListener('click', () => {
        if (g.over || turnRed() !== humanRed() || g.moves.length < 2) return;
        const keep = g.moves.slice(0, -2), notes = (g.notes || []).slice(0, -2);
        let b = loadFen(START_FEN);
        keep.forEach((m) => { const [f, t] = fromIccs(m); b[t] = b[f]; b[f] = null; });
        g.moves = keep; g.notes = notes; g.fen = toFen(b); g.undos++;
        board.set(g.fen, keep[keep.length - 1] || null, { noAnim: true, silent: true });
        renderMoves(); persist(); next();
    });
    $('[data-bot-hint]').addEventListener('click', async () => {
        if (g.over || turnRed() !== humanRed()) return;
        status('Đang tìm gợi ý…', null);
        const res = await ask({ fen: curFen(), red: humanRed(), analyse: true });
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
        track('game_finish', { mode: 'bot', level: g.level, result: outcome });
        let res = null;
        if (window.__xq?.auth) {
            res = await postJson('/choi-voi-may/ket-qua', {
                level: g.level, result: outcome, plies: g.moves.length, hints: g.hints, undos: g.undos, ms: Date.now() - g.t0,
            }).catch(() => null);
        }
        const title = outcome === 'win' ? 'Bạn đã thắng!' : outcome === 'loss' ? 'Máy thắng ván này' : 'Ván cờ hoà';
        const glyph = outcome === 'win' ? 'trophy' : outcome === 'loss' ? 'shield' : 'repeat';
        const xp = res?.gamification?.xp || 0;
        const canUp = outcome === 'win' && g.level < 4;
        const dlg = openSheet(`<div class="celebrate">
            <div class="celebrate__burst">${icon(glyph)}</div>
            <h2>${title}</h2>
            <p class="muted">Cấp ${escapeHtml(LEVELS[g.level].name)} · ${Math.ceil(g.moves.length / 2)} nước · ${escapeHtml(r.reason)}</p>
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
            start({ level: +b.dataset.again, human: g.human, fen: START_FEN, moves: [], hints: 0, undos: 0, over: null, t0: Date.now() });
        }));
        dlg.querySelector('[data-share]').addEventListener('click', () => {
            import('./share').then((m) => m.share(`♟ Tôi vừa ${outcome === 'win' ? 'thắng' : outcome === 'loss' ? 'thua' : 'hoà'} máy cấp ${LEVELS[g.level].name} sau ${Math.ceil(g.moves.length / 2)} nước trên Học Cờ Tướng!`, location.origin + '/choi-voi-may'));
        });
        if (res?.gamification) handleGamification(res.gamification, { silent: true });
    }
}
