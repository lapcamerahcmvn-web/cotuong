// Trang bài học: chuyển "Xem lời giảng / Thử tự giải", theo dõi tiến độ (đăng nhập), sheet hoàn
// thành (+XP, bài tiếp theo), ghi kết quả "Thử tự giải" vào kho thế cờ, tiến độ khách (localStorage).
import { postJson, store, save, track, icon, escapeHtml } from './core';
import { installPuzzleCheck } from './puzzle-check';
import { handleGamification } from './gamification';

export function init() {
    const page = document.querySelector('[data-lesson-page]');
    if (!page) return;
    installPuzzleCheck();
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
    const boxes = { view: document.getElementById('lesson-board-view'), guess: document.getElementById('lesson-board-guess'), puzzle: document.getElementById('lesson-board-puzzle') };
    const set = (mode) => {
        Object.entries(boxes).forEach(([k, el]) => { if (el) el.hidden = k !== mode; });
        btns.forEach((b) => {
            const on = b.dataset.boardMode === mode;
            b.classList.toggle('is-on', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        if (mode === 'puzzle') track('puzzle_start', { mode: 'lesson' });
        if (mode === 'guess') track('guess_start');
    };
    btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.boardMode)));
    document.addEventListener('xq:guess-done', (e) => track('guess_done', { hits: e.detail.hits, total: e.detail.total }));
    if (location.hash === '#giai-do') set('puzzle');
}

// Thanh "Đã học · Bài tiếp theo" (dính đáy màn hình). Trạng thái: locked → ready (đủ điều kiện, chờ server ghi) → done.
function nextBar(d) {
    const bar = document.querySelector('[data-lesson-nextbar]');
    const btn = bar?.querySelector('[data-nextbar-btn]');
    const hint = bar?.querySelector('[data-nextbar-hint]');
    const set = (state, text) => {
        if (!bar) return;
        bar.dataset.state = state;
        btn.disabled = state === 'locked' || state === 'busy';
        if (text) hint.innerHTML = text;
    };
    const go = () => { if (d.nextUrl) location.href = d.nextUrl; };

    return { bar, btn, set, go };
}

// Giây ở lại trang (chỉ tính lúc tab đang hiện).
function visibleClock() {
    let acc = 0, since = document.hidden ? null : Date.now();
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && since) { acc += Date.now() - since; since = null; } else if (!document.hidden && !since) since = Date.now();
    });

    return () => Math.floor((acc + (since ? Date.now() - since : 0)) / 1000);
}

function trackProgress(page, d, lessonId) {
    const isText = d.isText === '1';
    const minSec = parseInt(d.minSeconds || '20', 10);
    const secs = visibleClock();
    const ui = nextBar(d);
    let viewedAll = isText, done = d.completed === '1', finishedReading = false, solved = false, pending = false, retry = null;

    // Điều kiện phía trình duyệt (server kiểm lại): bài có nước → xem hết nước + đủ giây, hoặc tự giải đúng;
    // bài lý thuyết → đọc tới cuối + đủ giây, hoặc đọc ≥ 90 giây.
    const ready = () => solved || (isText ? ((finishedReading && secs() >= minSec) || secs() >= 90) : (viewedAll && secs() >= minSec));
    const refresh = () => {
        if (done) return;
        if (ready()) ui.set('ready', 'Xong bài này — bấm để ghi nhận' + (d.nextUrl ? ' và sang bài tiếp' : ''));
        else if (viewedAll || finishedReading) {
            const left = Math.max(1, minSec - secs());
            ui.set('locked', `Xem lại lời giảng thêm chút — còn ${left} giây`);
            clearTimeout(retry);
            retry = setTimeout(() => { refresh(); send(); }, left * 1000 + 300);
        }
    };

    const send = (force = false) => {
        if (done || (pending && !force)) return Promise.resolve(done);
        pending = true;
        return postJson(d.progressUrl, { read_seconds: secs(), viewed_all_moves: viewedAll, finished_reading: finishedReading, solved_puzzle: solved }, { keepalive: true })
            .then((res) => {
                pending = false;
                if (res && res.completed && !done) {
                    done = true;
                    document.getElementById('lesson-done-badge')?.removeAttribute('hidden');
                    ui.set('done', `${icon('check')} Đã học${res.gamification?.xp ? ` · +${res.gamification.xp} XP` : ''}`);
                    if (res.gamification) {
                        handleGamification(res.gamification);   // XP, mục tiêu ngày, huy hiệu, lên cấp — thông báo nhẹ, không chặn màn hình
                        track('lesson_complete', { lesson_id: lessonId, phase: d.phase || '' });
                    }
                }
                return done;
            })
            .catch(() => { pending = false; return done; });
    };

    ui.btn?.addEventListener('click', async () => {
        if (done) return ui.go();
        ui.set('busy', 'Đang ghi nhận…');
        const ok = await send(true);
        if (ok) setTimeout(ui.go, 700);   // thấy kịp "+XP" rồi sang bài
        else refresh();
    });

    document.addEventListener('xq:viewed-all-moves', () => { viewedAll = true; refresh(); send(); });
    document.addEventListener('xq:lesson-solved', () => { solved = true; refresh(); send(true); });
    if (isText) {
        const checkEnd = () => {
            if (finishedReading) return;
            const docH = document.documentElement.scrollHeight, winH = innerHeight;
            if (docH <= winH + 160 || scrollY + winH >= docH - 400) { finishedReading = true; refresh(); send(); }
        };
        addEventListener('scroll', checkEnd, { passive: true });
        addEventListener('load', checkEnd);
        checkEnd();
    }
    // Ghi nhận lần đầu sớm (tạo bản ghi → server tính thời gian thật từ lúc này), rồi nhịp 10 giây như cũ.
    setTimeout(() => send(), 1500);
    setInterval(() => { if (!document.hidden) { refresh(); send(); } }, 10000);
    addEventListener('pagehide', () => send());
    document.addEventListener('visibilitychange', () => { if (document.hidden) send(); });
}

function trackGuest(d, lessonId) {
    const ui = nextBar(d);
    const mark = () => {
        const ids = store('xq.guest.lessons', []);
        if (!ids.includes(lessonId)) { ids.push(lessonId); save('xq.guest.lessons', ids.slice(-200)); }
        ui.set('ready', d.nextUrl ? 'Xong bài này — sang bài tiếp theo' : 'Đã xem xong bài này');
    };
    if (d.isText === '1') setTimeout(mark, 15000);
    document.addEventListener('xq:viewed-all-moves', mark);
    document.addEventListener('xq:lesson-solved', mark);
    ui.btn?.addEventListener('click', () => { mark(); ui.go(); });
}

function initLessonPuzzle(d) {
    const puzzleId = d.puzzleId;
    if (!puzzleId) return;
    // Gửi tối đa 2 lượt: lượt SAI đầu tiên (tính điểm thế cờ) và lượt GIẢI ĐÚNG (để ghi nhận đã học bài).
    let reported = false, reportedSolve = false, t0 = Date.now();
    const report = (body) => {
        if (!window.__xq?.auth) return null;
        const solve = !body.revealed && !body.wrong;
        if (solve ? reportedSolve : reported) return null;
        reported = true;
        if (solve) reportedSolve = true;
        delete body.wrong;
        return postJson(`/luyen-tap/the-co/${puzzleId}/thu`, { mode: 'lesson', ...body })
            .then((res) => handleGamification(res.gamification)).catch(() => {});
    };
    document.addEventListener('xq:puzzle-move', (e) => {
        const box = document.getElementById('lesson-board-puzzle');
        if (!box || !box.contains(e.target)) return;
        if (!e.detail.ok && !reported) report({ moves: [...(box.__moves || []), e.detail.move], ms: Date.now() - t0, revealed: false, wrong: true });
        if (e.detail.ok) box.__moves = [...(box.__moves || []), e.detail.move];
    });
    document.addEventListener('xq:puzzle-solved', (e) => {
        const box = document.getElementById('lesson-board-puzzle');
        if (!box || !box.contains(e.target)) return;
        track(e.detail.revealed ? 'puzzle_reveal' : 'puzzle_correct', { mode: 'lesson' });
        const done = report({ moves: e.detail.moves, line: e.detail.line, ms: e.detail.ms, revealed: e.detail.revealed });
        // Tự giải đúng (không xem lời giải) = đã học bài — đợi lượt giải được server ghi rồi mới báo tiến độ.
        if (!e.detail.revealed) Promise.resolve(done).then(() => document.dispatchEvent(new CustomEvent('xq:lesson-solved')));
        box.__moves = [];
    });
}
