// Tiện ích dùng chung: CSRF fetch, toast, analytics, nạp bàn cờ (file tĩnh public/js) khi cần.

export function csrf() {
    const el = document.querySelector('meta[name=csrf-token]');
    return el ? el.content : '';
}

export async function postJson(url, body = {}, opts = {}) {
    const res = await fetch(url, {
        method: 'POST',
        keepalive: !!opts.keepalive,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-CSRF-TOKEN': csrf() },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw Object.assign(new Error('HTTP ' + res.status), { status: res.status });
    return res.json();
}

export async function getJson(url, params = {}) {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach((x) => q.append(k + '[]', x));
        else if (v !== null && v !== undefined) q.append(k, v);
    });
    const res = await fetch(url + (url.includes('?') ? '&' : '?') + q.toString(), { headers: { Accept: 'application/json' } });
    if (!res.ok) throw Object.assign(new Error('HTTP ' + res.status), { status: res.status });
    return res.json();
}

export function icon(name, cls = '') {
    return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

export function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export function toast(message, { kind = 'ok', iconName = null, timeout = 3200 } = {}) {
    const region = document.querySelector('[data-toasts]');
    if (!region) return;
    const el = document.createElement('div');
    el.className = 'toast toast--' + kind;
    el.setAttribute('role', 'status');
    el.innerHTML = (iconName ? icon(iconName) : '') + '<span>' + message + '</span>';
    region.appendChild(el);
    setTimeout(() => {
        el.classList.add('is-leaving');
        setTimeout(() => el.remove(), 260);
    }, timeout);
}

export function track(name, params = {}) {
    try {
        if (window.__xq && window.__xq.ga && typeof window.gtag === 'function') window.gtag('event', name, params);
    } catch (e) { /* bỏ qua */ }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

let boardPromise = null;
/** Nạp xiangqi-rules.js + board.js (file tĩnh — admin cũng dùng) đúng 1 lần. */
export function loadBoard() {
    if (window.XiangqiBoard && window.XiangqiRules) return Promise.resolve();
    if (!boardPromise) {
        const cfg = window.__xq || {};
        boardPromise = loadScript(cfg.rules).then(() => loadScript(cfg.board));
    }
    return boardPromise;
}

export function store(key, fallback = null) {
    try {
        const v = localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
    } catch (e) {
        return fallback;
    }
}

export function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
}

export function fmt(n) {
    return Number(n || 0).toLocaleString('vi-VN');
}
