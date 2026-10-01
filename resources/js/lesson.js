// Trang bài học: chuyển "Xem lời giảng / Thử tự giải", theo dõi tiến độ (đăng nhập), sheet hoàn
// thành (+XP, bài tiếp theo), ghi kết quả "Thử tự giải" vào kho thế cờ, tiến độ khách (localStorage).
import { postJson, store, save, track, icon, escapeHtml } from './core';
import { handleGamification, openSheet, confetti } from './gamification';

export function init() {
    const page = document.querySelector('[data-lesson-page]');
    if (!page) return;
    const d = page.dataset;
    const lessonId = parseInt(d.lessonId, 10);
    initModeToggle();
    track('lesson_start', { lesson_id: lessonId, phase: d.phase || '' });

    if (window.__xq?.auth) trackProgress(page, d, lessonId);
    else trackGuest(d, lessonId);
    initLessonPuzzle(d);
}

function initModeToggle() {
    const btns = document.querySelectorAll('[data-board-mode]');
    if (!btns.length) return;
    const boxes = { view: document.getElementById('lesson-board-view'), puzzle: document.getElementById('lesson-board-puzzle') };
    const set = (mode) => {
        Object.entries(boxes).forEach(([k, el]) => { if (el) el.hidden = k !== mode; });
        btns.forEach((b) => {
            const on = b.dataset.boardMode === mode;
            b.classList.toggle('is-on', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        if (mode === 'puzzle') track('puzzle_start', { mode: 'lesson' });
    };
    btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.boardMode)));
    if (location.hash === '#giai-do') set('puzzle');
}

function trackProgress(page, d, lessonId) {
    const isText = d.isText === '1';
    let seconds = 0, viewedAll = isText, done = d.completed === '1', dirty = true, finishedReading = false;

    const send = () => {
        if (done || !dirty) return;
        dirty = false;
        postJson(d.progressUrl, { read_seconds: seconds, viewed_all_moves: viewedAll, finished_reading: finishedReading }, { keepalive: true })
            .then((res) => {
                if (res && res.completed) {
                    done = true;
                    document.getElementById('lesson-done-badge')?.removeAttribute('hidden');
                    if (res.gamification) {
                        showComplete(d, res.gamification);
                        track('lesson_complete', { lesson_id: lessonId, phase: d.phase || '' });
                    }
                }
            })
            .catch(() => {});
    };

    document.addEventListener('xq:viewed-all-moves', () => { viewedAll = true; dirty = true; send(); });
    if (isText) {
        const checkEnd = () => {
            if (finishedReading) return;
            const docH = document.documentElement.scrollHeight, winH = innerHeight;
            if (docH <= winH + 160 || scrollY + winH >= docH - 400) { finishedReading = true; dirty = true; send(); }
        };
        addEventListener('scroll', checkEnd, { passive: true });
        addEventListener('load', checkEnd);
        checkEnd();
    }
    setInterval(() => { if (!document.hidden) { seconds += 10; dirty = true; send(); } }, 10000);
    addEventListener('pagehide', send);
    document.addEventListener('visibilitychange', () => { if (document.hidden) send(); });
}

function trackGuest(d, lessonId) {
    const mark = () => {
        const ids = store('xq.guest.lessons', []);
        if (!ids.includes(lessonId)) { ids.push(lessonId); save('xq.guest.lessons', ids.slice(-200)); }
    };
    if (d.isText === '1') setTimeout(mark, 30000);
    document.addEventListener('xq:viewed-all-moves', mark);
}

function showComplete(d, g) {
    const next = d.nextUrl ? `<a href="${escapeHtml(d.nextUrl)}" class="btn btn--primary btn--lg">${icon('arrow-right')} Bài tiếp theo</a>` : '';
    const practice = d.practiceUrl ? `<a href="${escapeHtml(d.practiceUrl)}" class="btn btn--lg">${icon('puzzle')} Luyện thế cờ cùng chủ đề</a>` : '';
    const goal = g.goal ? Math.min(100, Math.round(100 * g.goal.xp / Math.max(1, g.goal.target))) : 0;
    const dlg = openSheet(`<div class="celebrate">
        <div class="celebrate__burst">${icon('check-circle')}</div>
        <h2>Hoàn thành bài học!</h2>
        ${g.xp > 0 ? `<div class="celebrate__xp">${icon('star')} +${g.xp} XP</div>` : '<p class="muted">Bài đã được đánh dấu là đã học.</p>'}
        <ul class="celebrate__list">
            <li class="text-flame">${icon('flame')} <span>Chuỗi <b>${g.streak}</b> ngày học</span></li>
            <li>${icon('target')} <span class="flex-1">Mục tiêu hôm nay: <b>${g.goal.xp}/${g.goal.target} XP</b>
                <span class="progress progress--sm progress--gold mt-1 block"><span class="progress__bar" style="width:${goal}%"></span></span></span></li>
            <li>${icon('star')} <span>Cấp ${g.level.level} · ${escapeHtml(g.level.title)} — ${g.level.pct}% tới cấp kế</span></li>
        </ul>
        <div class="celebrate__actions">${next}${practice}<button type="button" class="btn btn--ghost" data-close>Ở lại bài này</button></div>
    </div>`);
    confetti(dlg.querySelector('.celebrate'));
    handleGamification(g, { silent: true });
}

function initLessonPuzzle(d) {
    const puzzleId = d.puzzleId;
    if (!puzzleId) return;
    let reported = false, t0 = Date.now();
    const report = (body) => {
        if (reported || !window.__xq?.auth) return;
        reported = true;
        postJson(`/luyen-tap/the-co/${puzzleId}/thu`, { mode: 'lesson', ...body })
            .then((res) => handleGamification(res.gamification)).catch(() => {});
    };
    document.addEventListener('xq:puzzle-move', (e) => {
        const box = document.getElementById('lesson-board-puzzle');
        if (!box || !box.contains(e.target)) return;
        if (!e.detail.ok && !reported) report({ moves: [...(box.__moves || []), e.detail.move], ms: Date.now() - t0, revealed: false });
        if (e.detail.ok) box.__moves = [...(box.__moves || []), e.detail.move];
    });
    document.addEventListener('xq:puzzle-solved', (e) => {
        const box = document.getElementById('lesson-board-puzzle');
        if (!box || !box.contains(e.target)) return;
        track(e.detail.revealed ? 'puzzle_reveal' : 'puzzle_correct', { mode: 'lesson' });
        report({ moves: e.detail.moves, ms: e.detail.ms, revealed: e.detail.revealed });
        box.__moves = [];
    });
}
