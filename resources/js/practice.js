// Khu Luyện tập. Hai kiểu trang:
//  [data-practice="play"]    — từng thế: thế cờ hôm nay / theo chủ đề / lỗi sai / kiểm tra trình độ
//  [data-practice="session"] — phiên có luật: 60 giây (rush) · 3 mạng (survival)
// Bàn cờ dùng XiangqiBoard.mountPuzzle (public/js/board.js). Kết quả luôn được server thẩm định.
import { loadBoard, postJson, getJson, track, icon, escapeHtml, store, save, fmt } from './core';
import { installPuzzleCheck } from './puzzle-check';
import { handleGamification, confetti } from './gamification';

export function init() {
    const root = document.querySelector('[data-practice]');
    if (!root) return;
    installPuzzleCheck();
    loadBoard().then(() => (root.dataset.practice === 'session' ? initSession(root) : initPlay(root)));
}

function $(root, sel) { return root.querySelector(sel); }

/* =================== Từng thế =================== */
function initPlay(root) {
    const mode = root.dataset.mode;
    const skill = root.dataset.skill || null;
    const rounds = parseInt(root.dataset.rounds || '0', 10);
    let queue = JSON.parse(root.dataset.queue || '[]');
    let puzzle = JSON.parse($(root, 'script[data-first]')?.textContent || 'null');
    const seen = [];
    const results = [];
    let reported = false;
    let busy = false;

    const result = $(root, '[data-result]');
    const dots = $(root, '[data-dots]');
    const boardEl = $(root, '[data-board]');

    if (!puzzle) { result.innerHTML = emptyState(mode); result.hidden = false; return; }

    const engine = window.XiangqiBoard.mountPuzzle(boardEl, {
        fen: puzzle.fen, solution: puzzle.solution, side: puzzle.side, failOnWrong: true,
        onSolved: (info) => finish(true, info),
        onFail: (info) => finish(false, info),
    });
    $(root, '[data-hint]')?.addEventListener('click', () => engine.hint());
    $(root, '[data-reveal]')?.addEventListener('click', () => engine.reveal());
    setMeta();
    renderDots();
    track('puzzle_start', { mode, puzzle_id: puzzle.id, rating: puzzle.rating });

    function setMeta() {
        const t = $(root, '[data-p-title]');
        if (t) t.textContent = puzzle.title;
        const r = $(root, '[data-p-rating]');
        if (r) r.textContent = puzzle.rating;
        const link = $(root, '[data-p-lesson]');
        if (link) { link.hidden = !puzzle.lessonUrl; if (puzzle.lessonUrl) link.href = puzzle.lessonUrl; }
        const side = $(root, '[data-p-side]');
        if (side) side.textContent = puzzle.side === 'do' ? 'Đỏ đi trước' : 'Đen đi trước';
    }

    function renderDots() {
        if (!dots || !rounds) return;
        let h = '';
        for (let i = 0; i < rounds; i++) {
            const r = results[i];
            h += `<span class="${r === undefined ? '' : (r ? 'is-ok' : 'is-bad')}" style="${r === undefined ? 'background:var(--surface-3)' : ''}">${r === undefined ? '' : icon(r ? 'check' : 'x')}</span>`;
        }
        dots.innerHTML = h;
    }

    async function finish(ok, info) {
        if (reported) return;
        reported = true;
        results.push(ok && !info.revealed);
        renderDots();
        track(ok && !info.revealed ? 'puzzle_correct' : 'puzzle_wrong', { mode, puzzle_id: puzzle.id });
        let res = null;
        try {
            res = await postJson(`/luyen-tap/the-co/${puzzle.id}/thu`, { moves: info.moves, line: info.line, ms: info.ms, mode, revealed: !!info.revealed });
        } catch (e) { /* mất mạng: vẫn cho đi tiếp */ }
        if (res) handleGamification(res.gamification);
        if (mode === 'daily' && ok && !info.revealed) { track('daily_challenge_complete'); confetti($(root, '[data-board]')); }
        if (!window.__xq?.auth && mode === 'daily' && ok) save('xq.guest.daily', new Date().toDateString());
        showResult(ok && !info.revealed, res);
    }

    function showResult(ok, res) {
        const more = rounds ? results.length < rounds : mode !== 'daily';
        const delta = res?.rating?.delta;
        const rate = res?.stats?.rate;
        result.innerHTML = `
            <div class="alert ${ok ? 'alert--ok' : 'alert--err'}">${icon(ok ? 'check-circle' : 'x-circle')}
              <span>${ok ? 'Chính xác!' : 'Chưa đúng — xem nước đúng trên bàn cờ.'}
              ${delta ? ` <span class="font-bold">${delta > 0 ? '+' : ''}${delta} điểm thế cờ</span>` : ''}
              ${rate !== null && rate !== undefined ? `<span class="block text-[13px] font-semibold opacity-80">${rate}% người giải đúng thế này</span>` : ''}</span></div>
            <div class="flex flex-wrap gap-2 mt-3">
              ${more ? `<button type="button" class="btn btn--primary" data-next>${icon('arrow-right')} Thế tiếp theo</button>` : ''}
              ${mode === 'daily' ? `<a href="/luyen-tap/60-giay" class="btn btn--primary">${icon('zap')} Thử thách 60 giây</a>` : ''}
              ${!ok ? `<button type="button" class="btn" data-retry>${icon('reset')} Thử lại</button>` : ''}
              ${puzzle.lessonUrl ? `<a href="${escapeHtml(puzzle.lessonUrl)}" class="btn btn--ghost">${icon('book')} Xem bài học gốc</a>` : ''}
              ${mode === 'daily' ? `<button type="button" class="btn btn--ghost" data-share-daily>${icon('share')} Chia sẻ</button>` : ''}
            </div>`;
        result.hidden = false;
        result.querySelector('[data-retry]')?.addEventListener('click', () => { result.hidden = true; engine.reset(); });
        result.querySelector('[data-next]')?.addEventListener('click', next);
        result.querySelector('[data-share-daily]')?.addEventListener('click', () => {
            const d = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
            const streak = res?.gamification?.streak;
            import('./share').then((m) => m.share(`♟ Thế cờ hôm nay ${d}: ${ok ? '✅ giải đúng ngay lần đầu' : '❌ chưa giải được'}${streak > 1 ? ` · 🔥 ${streak} ngày liên tiếp` : ''}
Bạn thử xem giải được không?`, location.origin + '/luyen-tap/hom-nay'));
        });
        if (!more && rounds) summary();
    }

    async function next() {
        if (busy) return;
        busy = true;
        seen.push(puzzle.id);
        let p = null;
        // Kiểm tra trình độ / lỗi sai: hàng đợi chọn sẵn, payload nhúng trong trang.
        queue = queue.filter((id) => !seen.includes(id));
        if (queue.length) p = fetchById(queue[0]);
        if (!p && !['placement', 'review'].includes(mode)) {
            p = (await getJson('/luyen-tap/the-co/tiep', { mode: 'topic', skill, exclude: seen }).catch(() => null))?.puzzle || null;
        }
        busy = false;
        if (!p) { summary(); return; }
        puzzle = p;
        reported = false;
        result.hidden = true;
        engine.load({ fen: p.fen, solution: p.solution, side: p.side });
        setMeta();
        track('puzzle_start', { mode, puzzle_id: p.id, rating: p.rating });
    }

    function fetchById(id) {
        const el = document.querySelector(`script[data-puzzle="${id}"]`);
        return el ? JSON.parse(el.textContent) : null;
    }

    function summary() {
        const okN = results.filter(Boolean).length;
        let extra = '';
        if (mode === 'placement') {
            const lvl = okN >= 4 ? ['trung-cuoc', 'Trung cuộc & sát pháp'] : (okN >= 2 ? ['khai-cuoc', 'Khai cuộc'] : ['nhap-mon', 'Nhập môn']);
            extra = `<p class="mt-2">Gợi ý điểm bắt đầu: <strong>${lvl[1]}</strong>.</p>
                <div class="flex flex-wrap gap-2 mt-3"><a class="btn btn--primary" href="/${lvl[0]}">${icon('book')} Học ${lvl[1]}</a><a class="btn" href="/lo-trinh">${icon('map')} Xem lộ trình</a></div>`;
        } else {
            extra = `<div class="flex flex-wrap gap-2 mt-3"><a class="btn btn--primary" href="${location.pathname}">${icon('repeat')} Lượt mới</a><a class="btn" href="/luyen-tap">${icon('puzzle')} Chế độ khác</a></div>`;
        }
        result.innerHTML = `<div class="card card--pad text-center">
            <div class="result-hero"><div class="result-hero__big">${okN}/${results.length}</div><div class="result-hero__label">thế giải đúng</div></div>
            ${extra}</div>`;
        result.hidden = false;
    }
}

function emptyState(mode) {
    if (mode === 'review') {
        return `<div class="empty card"><div class="empty__glyph">帥</div><h3>Không có thế nào cần ôn hôm nay</h3>
            <p>Thế bạn giải sai sẽ tự vào đây để ôn lại theo lịch.</p><a class="btn btn--primary mt-3" href="/luyen-tap">Luyện tập ngay</a></div>`;
    }
    return '<div class="notice">Chưa có thế cờ phù hợp.</div>';
}

/* =================== Phiên 60 giây / 3 mạng =================== */
function initSession(root) {
    const mode = root.dataset.mode;
    const startBox = $(root, '[data-start]');
    const playBox = $(root, '[data-play]');
    const endBox = $(root, '[data-end]');
    const scoreEl = $(root, '[data-score]');
    const timerEl = $(root, '[data-timer]');
    const timerBar = $(root, '[data-timer-bar]');
    const livesEl = $(root, '[data-lives]');
    const boardEl = $(root, '[data-board]');
    let uuid = null, engine = null, puzzle = null, deadline = 0, tick = null, ending = false, sending = false;
    const total = 60000;

    $(root, '[data-go]')?.addEventListener('click', start);

    async function start() {
        startBox.hidden = true; endBox.hidden = true; playBox.hidden = false;
        let st;
        try { st = await postJson('/luyen-tap/phien', { mode }); } catch (e) { startBox.hidden = false; playBox.hidden = true; return; }
        uuid = st.uuid; ending = false;
        track('puzzle_start', { mode });
        apply(st);
        if (mode === 'rush') {
            deadline = Date.now() + (st.remaining_ms ?? total);
            clearInterval(tick);
            tick = setInterval(updateTimer, 200);
            updateTimer();
        }
    }

    function apply(st) {
        if (scoreEl) scoreEl.textContent = st.score;
        if (livesEl) {
            const before = livesEl.dataset.n === undefined ? st.lives : +livesEl.dataset.n;
            livesEl.innerHTML = [0, 1, 2].map((i) => `<span class="${i < st.lives ? '' : 'is-lost'}${i === st.lives && st.lives < before ? ' just-lost' : ''}">${icon('heart')}</span>`).join('');
            livesEl.dataset.n = st.lives;
            livesEl.setAttribute('aria-label', `Còn ${st.lives}/3 mạng`);
        }
        if (typeof st.remaining_ms === 'number' && mode === 'rush') deadline = Date.now() + st.remaining_ms;
        if (st.over) return end(st);
        puzzle = st.puzzle;
        root.__puzzle = puzzle;
        if (!puzzle) return end(st);
        const cfg = { fen: puzzle.fen, solution: puzzle.solution, side: puzzle.side, failOnWrong: true, onSolved: (i) => answer(i), onFail: (i) => answer(i, true) };
        if (!engine) engine = window.XiangqiBoard.mountPuzzle(boardEl, cfg);
        else engine.load(cfg);
        const t = $(root, '[data-p-side]');
        if (t) t.textContent = puzzle.side === 'do' ? 'Đỏ đi' : 'Đen đi';
    }

    async function answer(info, failed) {
        if (sending || ending) return;
        sending = true;
        if (!failed) pop('+1', 'var(--jade)');
        await new Promise((r) => setTimeout(r, failed ? 900 : 250));
        let st;
        try { st = await postJson(`/luyen-tap/phien/${uuid}/nuoc`, { puzzle_id: puzzle.id, moves: info.moves, line: info.line, ms: info.ms }); } catch (e) { st = null; }
        sending = false;
        if (failed && mode === 'rush') pop('−5s', 'var(--danger)');
        if (st) apply(st);
    }

    function pop(text, color) {
        const el = document.createElement('div');
        el.className = 'score-pop';
        el.style.color = color;
        el.textContent = text;
        boardEl.style.position = 'relative';
        boardEl.appendChild(el);
        setTimeout(() => el.remove(), 750);
    }

    function updateTimer() {
        const left = Math.max(0, deadline - Date.now());
        if (timerEl) timerEl.textContent = (left / 1000).toFixed(left < 10000 ? 1 : 0) + 's';
        if (timerBar) {
            timerBar.querySelector('div').style.width = (100 * left / total) + '%';
            timerBar.classList.toggle('is-low', left < 10000);
        }
        if (left <= 0 && !ending) {
            ending = true;
            clearInterval(tick);
            postJson(`/luyen-tap/phien/${uuid}/ket-thuc`).then(end).catch(() => end({ score: parseInt(scoreEl?.textContent || '0', 10), log: [] }));
        }
    }

    function end(st) {
        ending = true;
        clearInterval(tick);
        playBox.hidden = true;
        const best = st.best ?? store('xq.best.' + mode, 0);
        if (!window.__xq?.auth && st.score > store('xq.best.' + mode, 0)) save('xq.best.' + mode, st.score);
        const isRecord = st.score > 0 && st.score >= (best || 0);
        endBox.innerHTML = `<div class="card card--pad celebrate">
            <div class="result-hero"><div class="result-hero__big">${st.score}</div><div class="result-hero__label">${mode === 'rush' ? 'thế giải đúng trong 60 giây' : 'thế giải đúng liên tiếp'}</div></div>
            ${isRecord ? `<div class="tag tag--xp mt-2">${icon('trophy')} Kỷ lục cá nhân!</div>` : (best ? `<div class="muted mt-2">Kỷ lục của bạn: <b>${fmt(best)}</b></div>` : '')}
            <div class="result-list">${(st.log || []).map((l) => `<span class="${l.ok ? 'is-ok' : 'is-bad'}">${icon(l.ok ? 'check' : 'x')}</span>`).join('')}</div>
            ${!window.__xq?.auth ? '<p class="text-[13.5px] text-ink-soft">Đăng nhập để lưu kỷ lục, nhận XP và lên bảng xếp hạng.</p>' : ''}
            <div class="celebrate__actions mt-3">
                <button type="button" class="btn btn--primary btn--lg" data-again>${icon('repeat')} Chơi lại</button>
                <button type="button" class="btn" data-share-run>${icon('share')} Chia sẻ</button>
                <a class="btn btn--ghost" href="/xep-hang?loai=rush">${icon('trophy')} Bảng xếp hạng</a>
            </div></div>`;
        endBox.hidden = false;
        endBox.querySelector('[data-again]')?.addEventListener('click', start);
        endBox.querySelector('[data-share-run]')?.addEventListener('click', () => {
            const grid = (st.log || []).map((l) => (l.ok ? '🟩' : '🟥')).join('');
            const title = mode === 'rush' ? `⚡ Thử thách 60 giây: ${st.score} thế đúng` : `❤️ Chế độ 3 mạng: ${st.score} thế liên tiếp`;
            import('./share').then((m) => m.share(`${title}
${grid}`, location.origin + location.pathname));
        });
        if (isRecord) confetti(endBox.querySelector('.celebrate'));
        handleGamification(st.gamification);
        track(mode === 'rush' ? 'rush_finish' : 'survival_finish', { score: st.score });
    }
}
