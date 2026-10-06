// Lời mời đấu bạn bè (mọi trang, chỉ khi đã đăng nhập): poll /loi-moi 20s (3s trong 2 phút sau khi vừa mời),
// hiện thẻ "X mời bạn chơi" có Đồng ý / Không đồng ý; báo người mời khi được đồng ý (tự vào ván) / từ chối / hết hạn.
// Trang sảnh /dau-ban: thêm danh sách bạn bè đang online (nút Mời) + các phòng đang thi đấu (nút Xem).
import { getJson, postJson, toast, icon, escapeHtml, track } from './core';

const FAST_KEY = 'xq.invite.sentAt';
let timer = null, current = null;
const handled = new Set();

export function init() {
    poll();
    document.addEventListener('visibilitychange', () => { if (!document.hidden) poll(); });
    if (document.querySelector('[data-lobby], [data-lobby-live]')) initLobby();
}

function fast() {
    try { return Date.now() - (+sessionStorage.getItem(FAST_KEY) || 0) < 125000; } catch (e) { return false; }
}

async function poll() {
    clearTimeout(timer);
    if (!document.hidden) {
        try { handle(await getJson('/loi-moi')); } catch (e) { /* mạng chập chờn: thử lại lần sau */ }
    }
    timer = setTimeout(poll, fast() ? 3000 : 20000);
}

function handle(r) {
    const next = (r.incoming || []).find((i) => !handled.has(i.id));
    if (next && !current) showInvite(next);
    (r.results || []).forEach((x) => {
        const who = escapeHtml(x.name || 'Bạn bè');
        if (x.status === 'accepted' && x.url) {
            toast(`${who} đã đồng ý — đang vào ván…`, { kind: 'xp', iconName: 'sword', timeout: 2500 });
            track('invite_accepted');
            setTimeout(() => { location.href = x.url; }, 1200);
        } else if (x.status === 'declined') toast(`${who} không đồng ý lời mời.`, { kind: 'err', iconName: 'x-circle', timeout: 4500 });
        else if (x.status === 'expired') toast(`${who} chưa trả lời — lời mời đã hết hạn.`, { iconName: 'clock', timeout: 4500 });
    });
    if (!r.pending_sent) { try { sessionStorage.removeItem(FAST_KEY); } catch (e) { /* bỏ qua */ } }
}

function showInvite(inv) {
    handled.add(inv.id);
    const el = document.createElement('div');
    el.className = 'invite-pop';
    el.setAttribute('role', 'alertdialog');
    el.setAttribute('aria-label', 'Lời mời chơi cờ');
    el.innerHTML = `<div class="flex items-center gap-2 font-extrabold text-[16px]">${icon('sword', 'w-5 h-5 text-primary')} Lời mời chơi cờ</div>
        <p class="mt-2 mb-1"><b>${escapeHtml(inv.name)}</b> <span class="text-ink-faint text-[13px]">Cấp ${inv.level}</span> mời bạn một ván <b>${escapeHtml(inv.variant)}</b>.</p>
        <p class="text-[13.5px] text-ink-soft mt-0 mb-3">${escapeHtml(inv.time)} · ${escapeHtml(inv.side)} · còn <span data-left>${inv.expires_in}</span> giây</p>
        <div class="flex gap-2"><button type="button" class="btn btn--primary" data-yes>${icon('check')} Đồng ý</button>
        <button type="button" class="btn" data-no>Không đồng ý</button></div>`;
    document.body.appendChild(el);
    current = el;
    navigator.vibrate?.(150);
    try { window.XiangqiBoard?.sound?.tick?.(false); } catch (e) { /* bỏ qua */ }
    let left = inv.expires_in;
    const iv = setInterval(() => {
        left--;
        const s = el.querySelector('[data-left]');
        if (s) s.textContent = Math.max(0, left);
        if (left <= 0) close();
    }, 1000);
    function close() { clearInterval(iv); el.remove(); current = null; }
    el.querySelector('[data-yes]').addEventListener('click', async (e) => {
        e.currentTarget.disabled = true;
        try {
            const r = await postJson(`/loi-moi/${inv.id}/dong-y`);
            track('invite_accept');
            location.href = r.url;
        } catch (err) {
            toast(escapeHtml(err.data?.error || 'Không vào được ván — thử lại.'), { kind: 'err', iconName: 'x-circle' });
            close();
        }
    });
    el.querySelector('[data-no]').addEventListener('click', () => {
        postJson(`/loi-moi/${inv.id}/tu-choi`).catch(() => {});
        close();
    });
}

/* ---------- Sảnh đấu bạn ---------- */
function initLobby() {
    const friendsEl = document.querySelector('[data-lobby-friends]');
    const liveEl = document.querySelector('[data-lobby-live]');
    const leftEl = document.querySelector('[data-lobby-left]');
    const load = async () => { try { render(await getJson('/dau-ban/sanh')); } catch (e) { /* thử lại lần sau */ } };
    load();
    setInterval(() => { if (!document.hidden) load(); }, 20000);

    function render(d) {
        if (leftEl) leftEl.textContent = `Còn ${d.invites_left}/3 lời mời (10 phút)`;
        if (friendsEl) {
            friendsEl.innerHTML = d.friends.length ? d.friends.map((f) => `<div class="flex items-center gap-3 px-4 py-3 border-b border-line">
                <span class="online-dot"></span>
                <a href="${escapeHtml(f.url)}" class="flex-1 min-w-0 font-bold truncate text-ink">${escapeHtml(f.name)} <span class="text-[12px] text-ink-faint font-semibold">Cấp ${f.level}</span></a>
                ${f.playing ? `<a class="btn btn--sm btn--ghost" href="/dau-ban/${f.playing}">${icon('eye')} Đang đấu · Xem</a>`
                    : `<button type="button" class="btn btn--sm btn--primary" data-invite="${f.id}" data-name="${escapeHtml(f.name)}" ${d.invites_left ? '' : 'disabled'}>${icon('sword')} Mời</button>`}
            </div>`).join('')
                : '<p class="px-4 py-3 m-0 text-[14px] text-ink-soft">Chưa có bạn bè nào online. Theo dõi kỳ thủ ở <a href="/xep-hang">Bảng xếp hạng</a> để thêm bạn, hoặc tạo phòng và gửi link.</p>';
        }
        if (liveEl) {
            liveEl.innerHTML = d.live.length ? d.live.map((g) => `<a href="/dau-ban/${g.code}" class="flex items-center gap-3 px-4 py-3 border-b border-line text-ink hover:bg-surface-2 hover:no-underline">
                <span class="flex-1 min-w-0">
                    <span class="block font-bold truncate"><span class="side-dot do"></span> ${escapeHtml(g.red || '?')} <span class="text-ink-faint font-semibold">vs</span> <span class="side-dot den"></span> ${escapeHtml(g.black || '?')}</span>
                    <span class="block text-[12.5px] text-ink-faint">${g.variant === 'co-up' ? 'Cờ úp' : 'Cờ tướng'} · ${escapeHtml(g.time)} · ${Math.ceil(g.plies / 2)} nước${g.watchers ? ` · ${g.watchers} người xem` : ''}</span>
                </span>
                <span class="tag ${g.mine ? 'tag--done' : ''}">${g.mine ? 'Ván của bạn' : 'Xem'}</span></a>`).join('')
                : '<p class="px-4 py-3 m-0 text-[14px] text-ink-faint">Chưa có ván nào đang diễn ra.</p>';
        }
    }

    friendsEl?.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-invite]');
        if (!b) return;
        const form = document.querySelector('[data-create-form]');
        const val = (n) => form?.querySelector(`[name=${n}]`)?.value;
        b.disabled = true;
        try {
            const r = await postJson('/loi-moi', { to: +b.dataset.invite, variant: val('variant') || 'co-tuong', side: val('side') || 'random', time: val('time') || '600' });
            b.innerHTML = `${icon('clock')} Đã mời`;
            if (leftEl) leftEl.textContent = `Còn ${r.left}/3 lời mời (10 phút)`;
            toast(escapeHtml(r.message), { iconName: 'sword', timeout: 4500 });
            track('invite_send');
            try { sessionStorage.setItem(FAST_KEY, String(Date.now())); } catch (err) { /* bỏ qua */ }
            poll();
        } catch (err) {
            b.disabled = false;
            toast(escapeHtml(err.data?.error || 'Chưa gửi được lời mời — thử lại.'), { kind: 'err', iconName: 'x-circle', timeout: 5000 });
        }
    });
}
