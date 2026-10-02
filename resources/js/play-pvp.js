// Phòng đấu bạn bè: polling trạng thái (1,5s; 4s khi tab ẩn), đồng hồ đếm cục bộ, gửi nước đi.
import { loadBoard, postJson, getJson, track, icon, escapeHtml, toast } from './core';
import { openSheet, confetti } from './gamification';
import { analyse, renderNotes, renderCaptured, lastNap, NAME } from './notation';

const START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
const COUP_START = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';

export function init() {
    const root = document.querySelector('[data-pvp]');
    if (!root) return;
    loadBoard().then(() => run(root));
}

function run(root) {
    const $ = (s) => root.querySelector(s);
    const code = root.dataset.code;
    let s = JSON.parse($('script[data-pvp-state]').textContent);
    let clockAt = Date.now(), sending = false, lastShownEnd = false, flipped = false, lastTickSec = null;
    let seenPlies = s.moves.length;   // để chỉ báo "ăn nắp" cho nước MỚI, không báo lại khi tải trang
    const R = window.XiangqiRules;

    const youRed = () => s.you !== 'den';
    const coup = s.variant === 'co-up';
    const el = $('[data-pvp-board]');
    el.innerHTML = '<div class="board-holder" data-xq-holder></div>';
    const board = window.XiangqiBoard.mountGame(el, { fen: s.fen, red: youRed(), coup, onMove: send });
    board.set(s.fen, s.moves[s.moves.length - 1] || null, { noAnim: true, silent: true });
    render(true);
    poll();
    setInterval(tickClocks, 250);

    async function send(iccs) {
        if (sending) return;
        sending = true;
        board.lock(true);
        try {
            const res = await postJson(`/dau-ban/${code}/nuoc`, { move: iccs });
            apply(res);
            track('pvp_move');
        } catch (e) {
            const msg = e.data?.error || 'Nước đi không được chấp nhận — thử lại.';
            status(msg, 'err');
            if (e.data?.error) toast(msg, { kind: 'err', iconName: 'x-circle', timeout: 4500 });
            board.set(s.fen, s.moves[s.moves.length - 1] || null, { noAnim: true, silent: true });
            render();
        }
        sending = false;
    }

    function apply(n) {
        if (!n || n.same) {
            if (n && n.clocks) { s.clocks = n.clocks; clockAt = Date.now(); }
            return;
        }
        const wasWaiting = s.status === 'waiting';
        const moved = n.moves.length !== s.moves.length;
        s = n;
        clockAt = Date.now();
        if (wasWaiting && s.status !== 'waiting') { location.reload(); return; }
        if (moved) board.set(s.fen, s.moves[s.moves.length - 1] || null);
        render();
    }

    function act(url, body) {
        return postJson(url, body).then(apply).catch(() => toast('Không gửi được — kiểm tra mạng rồi thử lại.', { kind: 'err', iconName: 'x-circle' }));
    }

    async function poll() {
        if (s.status !== 'finished' && s.status !== 'aborted') {
            try { apply(await getJson(`/dau-ban/${code}/trang-thai`, { v: s.version })); } catch (e) { /* mạng chập chờn: thử lại lần sau */ }
        }
        const waitingOpp = s.status === 'playing' && s.you && s.turn !== s.you;
        setTimeout(poll, document.hidden ? 4000 : (waitingOpp ? 1000 : 1800));
    }

    function player(side) {
        const p = side === 'do' ? s.red : s.black;
        const name = p ? escapeHtml(p.name) : '<span class="text-ink-faint">Đang chờ…</span>';
        const lvl = p ? `<span class="text-[12px] text-ink-faint font-semibold">Cấp ${p.level}</span>` : '';
        const turn = s.status === 'playing' && s.turn === side;
        return `<span class="flex items-center gap-2 min-w-0"><span class="side-dot ${side}"></span><span class="font-bold truncate">${name}</span>${lvl}${side === s.you ? '<span class="tag !py-0">Bạn</span>' : ''}</span>
            ${s.clocks ? `<span class="step-pill ${turn ? '!bg-primary !text-white !border-primary' : ''}" data-clock="${side}">--:--</span>` : (turn ? '<span class="tag tag--done">Đang đi</span>' : '')}`;
    }

    function render(first) {
        const bottom = flipped ? (youRed() ? 'den' : 'do') : (youRed() ? 'do' : 'den');
        const top = bottom === 'do' ? 'den' : 'do';
        $('[data-pvp-top]').innerHTML = player(top);
        $('[data-pvp-bottom]').innerHTML = player(bottom);
        tickClocks();

        const myTurn = s.status === 'playing' && s.you && s.turn === s.you;
        board.lock(!myTurn || sending);
        if (s.status === 'waiting') status('Đang chờ đối thủ vào phòng…', null);
        else if (s.status === 'aborted') status('Phòng đã huỷ.', null);
        else if (s.status === 'finished') status(endText(), s.result === 'hoa' ? null : (s.result === s.you ? 'ok' : 'err'));
        else if (!s.you) status(`Đang xem · tới lượt ${s.turn === 'do' ? 'Đỏ' : 'Đen'}`, null);
        else {
            const check = R.inCheck(R.loadFen(s.fen), s.turn === 'do', coup);
            status(myTurn ? (check ? 'Bạn đang bị chiếu!' : 'Tới lượt bạn') : 'Chờ đối thủ đi…', myTurn ? (check ? 'err' : 'ok') : null);
        }
        renderDraw();
        renderMoves();
        const acts = $('[data-pvp-actions]');
        if (acts) acts.hidden = s.status !== 'playing';
        if (s.status === 'finished' && !lastShownEnd && !first) { lastShownEnd = true; showEnd(); }
        if (s.status === 'finished') lastShownEnd = true;
    }

    function endText() {
        const who = s.result === 'do' ? 'Đỏ' : 'Đen';
        const base = s.result === 'hoa' ? 'Ván cờ hoà' : (s.you ? (s.result === s.you ? 'Bạn thắng!' : 'Bạn thua') : who + ' thắng');
        return base + ' · ' + (s.reason || '');
    }

    function status(text, kind) {
        const box = $('[data-pvp-status]');
        box.className = 'card card--pad font-bold ' + (kind === 'ok' ? '!bg-jade-soft !text-jade-ink' : kind === 'err' ? '!bg-danger-soft !text-danger' : '');
        box.textContent = text;
    }

    function renderDraw() {
        const box = $('[data-pvp-draw]');
        if (s.status !== 'playing' || !s.draw_offer || !s.you) { box.hidden = true; return; }
        box.hidden = false;
        if (s.draw_offer === s.you) { box.innerHTML = '<span class="text-ink-soft">Bạn đã đề nghị hoà — chờ đối thủ trả lời.</span>'; return; }
        box.innerHTML = `<div class="font-bold mb-2">Đối thủ đề nghị hoà</div><div class="flex gap-2">
            <button type="button" class="btn btn--primary btn--sm" data-acc>${icon('check')} Đồng ý</button>
            <button type="button" class="btn btn--sm" data-dec>Từ chối</button></div>`;
        box.querySelector('[data-acc]').onclick = () => act(`/dau-ban/${code}/hoa`);
        box.querySelector('[data-dec]').onclick = () => act(`/dau-ban/${code}/hoa`, { decline: true });
    }

    function renderMoves() {
        const a = analyse(coup ? COUP_START : START, s.moves, s.reveals || [], s.captured || []);
        renderNotes($('[data-pvp-moves]'), a.notes);
        $('[data-pvp-count]').textContent = a.notes.length ? Math.ceil(a.notes.length / 2) + ' nước' : '';
        renderCaptured($('[data-pvp-captured]'), a, s.you, { over: s.status !== 'playing' });
        if (s.moves.length > seenPlies) {
            const nap = lastNap(a, s.moves.length);
            if (nap) {
                const who = s.you ? (nap.by === s.you ? 'Bạn' : 'Đối thủ') : (nap.by === 'do' ? 'Đỏ' : 'Đen');
                // Ăn nắp: chỉ bên ăn biết là quân gì (server đã giấu với người khác).
                const known = nap.p !== 'X' && nap.p !== 'x';
                toast(known ? `${who} ăn nắp: ${NAME[nap.p.toUpperCase()]}!` : `${who} vừa ăn 1 nắp${s.you && nap.by !== s.you ? ' của bạn' : ''} — chỉ bên ăn biết là quân gì`,
                    { kind: s.you && nap.by !== s.you ? 'err' : 'xp', iconName: 'sparkles', timeout: 3500 });
            }
        }
        seenPlies = s.moves.length;
    }

    function tickClocks() {
        if (!s.clocks) return;
        ['do', 'den'].forEach((side) => {
            let ms = s.clocks[side];
            if (s.status === 'playing' && s.turn === side) ms -= Date.now() - clockAt;
            ms = Math.max(0, ms);
            if (side === s.you && s.status === 'playing' && s.turn === side && ms < 10000) {
                const sec = Math.ceil(ms / 1000);
                if (sec !== lastTickSec) { lastTickSec = sec; window.XiangqiBoard.sound.tick(sec <= 5); }
            }
            const elc = root.querySelector(`[data-clock="${side}"]`);
            if (elc) {
                const t = Math.ceil(ms / 1000);
                elc.textContent = String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
                elc.classList.toggle('!bg-danger', ms < 20000 && s.status === 'playing' && s.turn === side);
            }
        });
    }

    function showEnd() {
        const win = s.you && s.result === s.you;
        window.XiangqiBoard.sound.end(s.result === 'hoa' ? 'draw' : win ? 'win' : s.you ? 'loss' : 'draw');
        const dlg = openSheet(`<div class="celebrate">
            <div class="celebrate__burst">${icon(s.result === 'hoa' ? 'repeat' : (win ? 'trophy' : 'shield'))}</div>
            <h2>${escapeHtml(endText().split(' · ')[0])}</h2>
            <p class="muted">${escapeHtml(s.reason || '')} · ${Math.ceil(s.moves.length / 2)} nước</p>
            <div class="celebrate__actions mt-3">
                <a class="btn btn--primary btn--lg" href="/dau-ban">${icon('sword')} Ván mới</a>
                <button type="button" class="btn" data-close>Xem lại bàn cờ</button>
                ${s.you ? `<a class="btn btn--ghost" href="/tai-khoan/lich-su-van-dau?loai=pvp">${icon('eye')} Lịch sử ván · thêm biến</a>` : ''}
            </div></div>`);
        if (win) confetti(dlg.querySelector('.celebrate'));
        track('pvp_finish', { result: s.result === 'hoa' ? 'draw' : (win ? 'win' : 'loss') });
    }

    $('[data-pvp-resign]')?.addEventListener('click', () => {
        if (confirm('Xin thua ván này?')) act(`/dau-ban/${code}/xin-thua`);
    });
    $('[data-pvp-offer]')?.addEventListener('click', () => act(`/dau-ban/${code}/hoa`));
    $('[data-pvp-flip]')?.addEventListener('click', () => { flipped = !flipped; board.flip(); render(); });
}
