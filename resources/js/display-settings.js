// Cài đặt Giao diện bàn cờ + Âm thanh (partials/display-settings.blade.php) — lưu localStorage trên thiết bị này,
// áp dụng ngay (bàn xem trước vẽ lại). board.js đọc các khoá: board_theme, piece_set, piece_style, board_coords,
// reduce_fx, xq_sound.
import { loadBoard } from './core';

const PREVIEW = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';   // thế mở: đủ loại quân
const AFTER = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C2C4/9/RNBAKABNR';    // sau Pháo 2 bình 5 (h2e2)
const LAST = 'h2e2';

const get = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } };
const set = (k, v) => { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { /* bỏ qua */ } };

export function init() {
    const box = document.querySelector('[data-display-settings]');
    if (!box) return;
    loadBoard().then(() => setup(box));
}

function setup(box) {
    const XB = window.XiangqiBoard, html = document.documentElement;
    const prev = box.querySelector('[data-ds-preview]');
    let demoFen = PREVIEW, demoLast = null;
    const sq = (iccs) => ({ from: [iccs.charCodeAt(0) - 97, 9 - +iccs[1]], to: [iccs.charCodeAt(2) - 97, 9 - +iccs[3]] });
    const draw = () => { XB.reloadPrefs(); prev.innerHTML = XB.render(demoFen, demoLast ? sq(demoLast) : null, null, -1, false); };

    // Màu bàn
    const themes = box.querySelectorAll('[data-board-theme-opt]');
    const markTheme = () => { const cur = get('board_theme', ''); themes.forEach((b) => b.classList.toggle('is-on', b.dataset.boardThemeOpt === cur)); };
    themes.forEach((b) => b.addEventListener('click', () => {
        const v = b.dataset.boardThemeOpt;
        set('board_theme', v || null);
        if (v) html.dataset.boardTheme = v; else delete html.dataset.boardTheme;
        markTheme();
    }));
    markTheme();

    // Bộ chữ / kiểu quân
    const prefs = box.querySelectorAll('[data-pref]');
    const DEF = { piece_set: 'han', piece_style: 'flat', last_fx: 'pulse' };
    const markPrefs = () => prefs.forEach((b) => b.classList.toggle('is-on', get(b.dataset.pref, DEF[b.dataset.pref]) === b.dataset.val));
    prefs.forEach((b) => b.addEventListener('click', () => {
        set(b.dataset.pref, b.dataset.val); markPrefs();
        if (b.dataset.pref === 'last_fx' && !demoLast) { demoFen = AFTER; demoLast = LAST; }   // hiện nước mẫu để thấy hiệu ứng
        draw();
    }));
    markPrefs();

    // Ô tích: số cột, mũi tên nước vừa đi
    box.querySelectorAll('[data-pref-check]').forEach((cb) => {
        const k = cb.dataset.prefCheck;
        cb.checked = get(k, '0') === '1';
        cb.addEventListener('change', () => {
            set(k, cb.checked ? '1' : '0');
            if (k === 'board_coords') html.dataset.boardCoords = cb.checked ? '1' : '0';
            if (k === 'last_arrow' && !demoLast) { demoFen = AFTER; demoLast = LAST; }
            draw();
        });
    });

    // Giảm hiệu ứng
    const fx = box.querySelector('[data-reduce-fx]');
    fx.checked = get('reduce_fx', '0') === '1';
    fx.addEventListener('change', () => { set('reduce_fx', fx.checked ? '1' : '0'); html.classList.toggle('reduce-fx', fx.checked); });

    // Đi thử 1 nước (xem hiệu ứng + nghe tiếng)
    box.querySelector('[data-ds-demo]').addEventListener('click', () => {
        const going = demoFen === PREVIEW;
        demoFen = going ? AFTER : PREVIEW;
        demoLast = going ? LAST : null;
        draw();
        if (going) { XB.sound.move(false); XB.sound.say('Pháo 2 bình 5'); }
    });
    draw();

    // ---- Âm thanh
    const S = XB.sound;
    const snd = document.querySelector('[data-sound-settings]');
    if (!snd) return;
    const body = snd.querySelector('[data-snd-body]');
    const volLabel = snd.querySelector('[data-snd-vol-label]');
    const render = () => {
        const p = S.get();
        snd.querySelectorAll('[data-snd]').forEach((el) => {
            const k = el.dataset.snd;
            if (el.type === 'range') el.value = Math.round(p[k] * 100); else el.checked = !!p[k];
        });
        volLabel.textContent = Math.round(p.vol * 100) + '%';
        snd.querySelectorAll('[data-snd-pack]').forEach((b) => b.classList.toggle('is-on', b.dataset.sndPack === p.pack));
        body.style.opacity = p.on ? '' : '.5';
        body.style.pointerEvents = p.on ? '' : 'none';
    };
    snd.querySelectorAll('[data-snd]').forEach((el) => el.addEventListener(el.type === 'range' ? 'input' : 'change', () => {
        S.set({ [el.dataset.snd]: el.type === 'range' ? el.value / 100 : el.checked });
        render();
    }));
    snd.querySelector('[data-snd="vol"]').addEventListener('change', () => S.move(false));
    snd.querySelectorAll('[data-snd-pack]').forEach((b) => b.addEventListener('click', () => { S.set({ pack: b.dataset.sndPack }); render(); S.move(false); setTimeout(() => S.move(true), 350); }));
    snd.querySelector('[data-snd-test]').addEventListener('click', () => { S.move(false); setTimeout(() => S.move(true), 350); });
    snd.querySelectorAll('[data-snd-try]').forEach((b) => b.addEventListener('click', (e) => {
        e.preventDefault();
        const k = b.dataset.sndTry;
        if (k === 'check') { S.move(false); setTimeout(() => S.check(), 60); }
        if (k === 'end') S.end('win');
        if (k === 'voice') S.say('Pháo 2 bình 5', true);
    }));
    // Máy không có giọng tiếng Việt → báo rõ (trình duyệt nạp danh sách giọng chậm, kiểm tra lại sau 1 giây).
    const voiceNote = snd.querySelector('[data-snd-voice-note]');
    setTimeout(() => {
        if (!S.hasVoice()) voiceNote.textContent = 'Thiết bị/trình duyệt này chưa có giọng đọc tiếng Việt (thường có sẵn trên Android/Chrome, iPhone, Windows 10+). Có thể cài thêm giọng Việt trong cài đặt máy.';
    }, 1200);
    render();
}
