// Hiển thị kết quả gamification trả về từ server: toast +XP, mục tiêu ngày, lên cấp, huy hiệu mới.
import { toast, fmt, icon, escapeHtml, track } from './core';

const PIECE_GLYPHS = /^[一-鿿]$/;

function achIcon(a) {
    return PIECE_GLYPHS.test(a.icon || '') ? `<span class="font-piece">${a.icon}</span>` : icon(a.icon || 'medal');
}

function updateHud(g) {
    const xp = document.querySelector('[data-hud-xp-value]');
    if (xp && typeof g.total === 'number') xp.textContent = fmt(g.total);
    const st = document.querySelector('[data-hud-streak]');
    if (st && g.streak) {
        st.classList.remove('is-cold');
        const span = st.querySelector('span');
        if (span) span.textContent = g.streak;
    }
}

export function confetti(host) {
    if (document.documentElement.classList.contains('reduce-fx') || !host) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    const colors = ['#c8451f', '#d99a1e', '#2f6b5e', '#e08a2e', '#5fb39e'];
    for (let i = 0; i < 28; i++) {
        const c = document.createElement('i');
        c.style.left = Math.random() * 100 + '%';
        c.style.background = colors[i % colors.length];
        c.style.animationDelay = Math.random() * 0.4 + 's';
        box.appendChild(c);
    }
    host.appendChild(box);
    setTimeout(() => box.remove(), 2200);
}

/** Mở sheet tuỳ biến (dialog) với HTML, trả về dialog. */
export function openSheet(html) {
    const dlg = document.createElement('dialog');
    dlg.className = 'sheet';
    dlg.innerHTML = `<div class="sheet__handle"></div><button type="button" class="icon-btn sheet__close" aria-label="Đóng" data-close>${icon('x')}</button><div class="sheet__body">${html}</div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => {
        if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
    });
    dlg.addEventListener('close', () => setTimeout(() => dlg.remove(), 300));
    dlg.showModal();
    return dlg;
}

export function showLevelUp(g) {
    const dlg = openSheet(`<div class="celebrate">
        <div class="celebrate__burst">${icon('star')}</div>
        <h2>Lên cấp ${g.level.level}!</h2>
        <p class="muted">Danh hiệu mới: <strong>${escapeHtml(g.level.title)}</strong></p>
        <div class="celebrate__actions mt-4"><button type="button" class="btn btn--primary btn--lg" data-close>Tuyệt vời</button></div>
    </div>`);
    confetti(dlg.querySelector('.celebrate'));
    track('level_up', { level: g.level.level });
}

/** Xử lý khối `gamification` từ API. opts.silent = không bật toast XP (khi đã có sheet riêng). */
export function handleGamification(g, opts = {}) {
    if (!g) return;
    updateHud(g);
    if (g.xp > 0) {
        if (!opts.silent) toast(`+${g.xp} XP`, { kind: 'xp', iconName: 'star' });
        track('xp_gain', { amount: g.xp });
    }
    if (g.goalReached) {
        setTimeout(() => toast('Đã đạt mục tiêu hôm nay!', { kind: 'ok', iconName: 'target' }), 600);
        track('daily_goal_reached');
    }
    if (g.streakUp && g.streak > 1) {
        setTimeout(() => toast(`Chuỗi ${g.streak} ngày liên tiếp!`, { kind: 'xp', iconName: 'flame' }), 1100);
        track('streak_continue', { days: g.streak });
    }
    (g.achievements || []).forEach((a, i) => {
        setTimeout(() => toast(`Huy hiệu mới: ${escapeHtml(a.name)}`, { kind: 'xp', iconName: 'medal', timeout: 4200 }), 1500 + i * 900);
        track('achievement_unlock', { key: a.key });
    });
    if (g.leveledUp && !opts.noLevelSheet) setTimeout(() => showLevelUp(g), 800);
}

export { achIcon };
