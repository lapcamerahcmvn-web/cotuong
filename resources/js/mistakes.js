// "Sai lầm của tôi": giải lại thế cờ từ nước sai trong ván của chính mình. Đáp án chấm ở server.
import { loadBoard, postJson, icon, escapeHtml, track } from './core';
import { handleGamification, openSheet, confetti } from './gamification';

const CLS = { mistake: ['?', 'Sai lầm'], blunder: ['??', 'Sai lầm nghiêm trọng'] };

export function init() {
    const root = document.querySelector('[data-mistakes]');
    if (!root) return;
    loadBoard().then(() => setup(root));
}

function setup(root) {
    const R = window.XiangqiRules;
    const items = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
    const $ = (s) => root.querySelector(s);
    let i = 0, board = null, done = false, solved = 0, xp = 0;

    function show() {
        const m = items[i];
        done = false;
        const red = m.side === 'do';
        const el = $('[data-mk-board]');
        el.innerHTML = '<div class="board-holder" data-xq-holder></div>';
        board = window.XiangqiBoard.mountGame(el, { fen: m.fen, red, coup: /[Xx]/.test(m.fen), onMove });
        $('[data-mk-progress]').textContent = `${i + 1}/${items.length}`;
        $('[data-mk-turn]').textContent = `${red ? 'Đỏ' : 'Đen'} đi`;
        $('[data-mk-turn]').className = 'tag ' + (red ? 'tag--loss' : '');
        const [mark, label] = CLS[m.class] || CLS.mistake;
        $('[data-mk-info]').innerHTML = `<div class="font-extrabold text-[15px] mb-1">${icon('target')} Tìm nước tốt hơn</div>
            <p class="text-[14px] m-0">Ván <b>${escapeHtml(m.game?.title || '')}</b> (${escapeHtml(m.game?.date || '')}), nước ${m.move}:
            bạn đã đi <b>${escapeHtml(m.playedNote)}</b> — <span class="text-[#c62f2f] font-bold">${mark} ${label}</span>, mất khoảng ${(m.loss / 100).toFixed(1).replace('.', ',')} điểm.</p>
            <p class="text-[13px] text-ink-soft mt-2 mb-0">Hộp ôn: ${'●'.repeat(m.box)}${'○'.repeat(4 - m.box)} ${m.game?.url ? `· <a href="${escapeHtml(m.game.url)}">xem lại cả ván</a>` : ''}</p>`;
        $('[data-mk-feedback]').hidden = true;
        $('[data-mk-next]').hidden = true;
        $('[data-mk-show]').hidden = false;
    }

    async function check(move) {
        const m = items[i];
        board.lock(true);
        const res = await postJson(`${root.dataset.url}/${m.id}`, { move }).catch(() => null);
        if (!res) { board.lock(false); return; }
        done = true;
        const best = R.fromIccs(res.best), played = R.fromIccs(m.played);
        const fb = $('[data-mk-feedback]');
        fb.hidden = false;
        if (move && res.correct) {
            solved++;
            xp += res.gamification?.xp || 0;
            fb.innerHTML = `<div class="font-extrabold text-jade-ink">${icon('check-circle')} Chính xác!</div>
                <p class="text-[14px] mb-0">${move === res.best ? 'Đây là nước máy đề xuất' : `Nước tốt tương đương. Máy đề xuất: <b>${escapeHtml(res.bestNote)}</b>`}.
                ${res.mastered ? ' Bạn đã <b>thuộc</b> thế này 🎉' : ` Gặp lại sau ${['', '1', '3', '7', '21'][res.box] || 1} ngày.`}</p>`;
            board.set(m.fen, null, { arrows: [{ from: best.from, to: best.to, color: '#2f6b5e' }], noAnim: true, silent: true });
            handleGamification(res.gamification);
        } else {
            fb.innerHTML = `<div class="font-extrabold text-[#c62f2f]">${icon('x-circle')} ${move ? 'Chưa đúng' : 'Đáp án'}</div>
                <p class="text-[14px] mb-0">Nước tốt hơn: <b>${escapeHtml(res.bestNote)}</b> (mũi tên xanh) · nước bạn đã đi trong ván: mũi tên đỏ. Thế này sẽ quay lại ngày mai.</p>`;
            board.set(m.fen, null, { arrows: [{ from: played.from, to: played.to, color: '#c8451f' }, { from: best.from, to: best.to, color: '#2f6b5e' }], noAnim: true, silent: true });
        }
        track('mistake_answer', { correct: !!(move && res.correct) });
        $('[data-mk-show]').hidden = true;
        $('[data-mk-next]').hidden = false;
        $('[data-mk-next]').textContent = i + 1 < items.length ? 'Thế tiếp theo' : 'Xong lượt ôn';
    }

    function onMove(iccs) { if (!done) check(iccs); }
    $('[data-mk-show]').addEventListener('click', () => { if (!done) check(''); });
    $('[data-mk-next]').addEventListener('click', () => {
        if (i + 1 < items.length) { i++; show(); return; }
        const dlg = openSheet(`<div class="celebrate"><div class="celebrate__burst">${icon('repeat')}</div>
            <h2>Xong lượt ôn hôm nay</h2><p class="muted">Đúng ${solved}/${items.length} thế${xp ? ` · +${xp} XP` : ''}.</p>
            <div class="celebrate__actions mt-3"><a class="btn btn--primary btn--lg" href="/luyen-tap">${icon('puzzle')} Luyện tập tiếp</a>
            <a class="btn btn--ghost" href="/tai-khoan/lich-su-van-dau">${icon('chart')} Phân tích thêm ván</a></div></div>`);
        if (solved === items.length) confetti(dlg.querySelector('.celebrate'));
    });
    show();
}
