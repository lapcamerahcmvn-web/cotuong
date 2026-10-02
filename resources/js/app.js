// Học Cờ Tướng — JS dùng chung toàn site (vanilla, không Alpine).
// Module nặng (bàn cờ, luyện tập) chỉ nạp khi trang cần.
import { loadBoard, postJson, store, save, track } from './core';
import { handleGamification } from './gamification';

window.xq = Object.assign(window.xq || {}, { handleGamification, track });

/* ---------- Dropdown (menu Học, menu tài khoản) ---------- */
function initDropdowns() {
    const all = document.querySelectorAll('[data-dropdown]');
    const closeAll = (except) => all.forEach((d) => {
        if (d === except) return;
        d.classList.remove('is-open');
        d.querySelector('[data-dropdown-trigger]')?.setAttribute('aria-expanded', 'false');
    });
    all.forEach((d) => {
        const t = d.querySelector('[data-dropdown-trigger]');
        t?.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = !d.classList.contains('is-open');
            closeAll(d);
            d.classList.toggle('is-open', open);
            t.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('[data-dropdown]')) closeAll(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
}

/* ---------- Sáng / tối ---------- */
function initTheme() {
    const root = document.documentElement;
    const meta = document.querySelector('meta[name=theme-color]');
    const apply = (t) => {
        root.dataset.theme = t;
        meta?.setAttribute('content', t === 'dark' ? '#1c1915' : '#c8451f');
    };
    apply(root.dataset.theme || 'light');
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => btn.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('theme', next); } catch (e) { /* bỏ qua */ }
        apply(next);
        track('theme_change', { theme: next });
    }));
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e) => {
        let stored = null;
        try { stored = localStorage.getItem('theme'); } catch (err) { /* bỏ qua */ }
        if (!stored) apply(e.matches ? 'dark' : 'light');
    });
}

/* ---------- Ô tìm kiếm mobile ---------- */
function initSearch() {
    const btn = document.querySelector('[data-search-toggle]');
    const panel = document.querySelector('[data-search-panel]');
    btn?.addEventListener('click', () => {
        const open = panel.hidden;
        panel.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) panel.querySelector('input')?.focus();
    });
    document.querySelectorAll('form[role=search]').forEach((f) => f.addEventListener('submit', () => {
        track('search', { q_len: (f.q?.value || '').length });
    }));
}

/* ---------- Gợi ý đăng nhập (khách) ---------- */
function initGuestGate() {
    const g = document.getElementById('guest-gate');
    if (!g) return;
    const ss = window.sessionStorage;
    try {
        if (ss.getItem('gg_dismissed')) return;
        let seen = parseInt(ss.getItem('gg_lessons_seen') || '0', 10);
        if (location.pathname.startsWith('/bai-hoc/') || location.pathname.startsWith('/luyen-tap/')) {
            seen += 1;
            ss.setItem('gg_lessons_seen', String(seen));
        }
        if (seen < 2) return;
    } catch (e) { return; }
    setTimeout(() => { if (!ss.getItem('gg_dismissed')) g.hidden = false; }, 15000);
    g.querySelector('[data-guest-gate-close]')?.addEventListener('click', () => {
        g.hidden = true;
        try { ss.setItem('gg_dismissed', '1'); } catch (e) { /* bỏ qua */ }
    });
}

/* ---------- Tiến độ khách: gộp vào tài khoản sau khi đăng nhập ---------- */
function mergeGuestProgress() {
    if (!window.__xq?.auth) return;
    const ids = store('xq.guest.lessons', []);
    if (!ids.length) return;
    postJson('/tien-do/gop', { lessons: ids.slice(-200) }).then(() => save('xq.guest.lessons', [])).catch(() => {});
}

/* ---------- Bộ chọn mục tiêu ngày / onboarding ---------- */
function initChoices() {
    document.querySelectorAll('[data-choice-group]').forEach((grp) => {
        grp.addEventListener('click', (e) => {
            const c = e.target.closest('[data-choice]');
            if (!c) return;
            grp.querySelectorAll('[data-choice]').forEach((x) => x.classList.toggle('is-on', x === c));
            const input = grp.querySelector('input[type=hidden]');
            if (input) input.value = c.dataset.choice;
        });
    });
    document.querySelectorAll('[data-open-sheet]').forEach((b) => b.addEventListener('click', () => {
        document.getElementById(b.dataset.openSheet)?.showModal();
    }));
    document.querySelectorAll('dialog.sheet').forEach((d) => d.addEventListener('click', (e) => {
        if (e.target === d || e.target.closest('[data-close]')) d.close();
    }));
}

function boot() {
    initDropdowns();
    initTheme();
    initSearch();
    initGuestGate();
    initChoices();
    mergeGuestProgress();

    if (document.querySelector('[data-xqboard], [data-needs-board], [data-fen-thumb]')) {
        loadBoard().then(() => {
            // Ảnh bàn cờ tĩnh nhỏ (thẻ thế cờ hôm nay, thư viện…): <div data-fen-thumb="FEN" [data-flip]>
            document.querySelectorAll('[data-fen-thumb]').forEach((el) => {
                const target = el.querySelector('.board-holder') || el;
                target.innerHTML = window.XiangqiBoard.render(el.dataset.fenThumb, null, null, null, el.dataset.flip === '1');
            });
            document.dispatchEvent(new CustomEvent('xq:board-ready'));
        });
    }
    if (document.querySelector('[data-lesson-page]')) import('./lesson').then((m) => m.init());
    if (document.querySelector('[data-practice]')) import('./practice').then((m) => m.init());
    if (document.querySelector('[data-countdown]')) import('./countdown').then((m) => m.init());
    if (document.querySelector('[data-bot]')) import('./play-bot').then((m) => m.init());
    if (document.querySelector('[data-pvp]')) import('./play-pvp').then((m) => m.init());
    if (document.querySelector('[data-review]')) import('./review').then((m) => m.init());
    if (document.querySelector('[data-weekly]')) import('./weekly').then((m) => m.init());
    document.addEventListener('click', (e) => {
        const f = e.target.closest('[data-follow]');
        if (f) import('./social').then((m) => m.follow(f));
    });
    // "Cài ứng dụng" (PWA, không service worker): chỉ hiện nút khi trình duyệt cho phép cài.
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        document.querySelectorAll('[data-install]').forEach((b) => {
            b.hidden = false;
            b.onclick = async () => { e.prompt(); const r = await e.userChoice; track('pwa_install', { outcome: r.outcome }); if (r.outcome === 'accepted') b.hidden = true; };
        });
    });
    if (window.__xq?.award) setTimeout(() => import('./weekly').then((m) => m.showAward(window.__xq.award)), 700);
    document.querySelectorAll('[data-share-text]').forEach((b) => b.addEventListener('click', () => import('./share').then((m) => m.share(b.dataset.shareText, b.dataset.shareUrl || location.href))));
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
