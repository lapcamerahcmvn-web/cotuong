// Thử thách tuần (nhận thưởng nhiệm vụ / mở rương, đếm ngược hết tuần) + bảng chúc mừng giải xếp hạng tuần.
import { postJson, icon, escapeHtml, toast, track } from './core';
import { handleGamification, openSheet, confetti } from './gamification';

const MEDAL = { gold: ['Cúp vàng', 'trophy'], silver: ['Cúp bạc', 'trophy'], bronze: ['Cúp đồng', 'trophy'], top10: ['Huy hiệu Top 10', 'medal'] };

export function init() {
    document.querySelectorAll('[data-weekly-countdown]').forEach(countdown);
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('[data-weekly-claim]');
        if (!btn || btn.disabled) return;
        btn.disabled = true;
        const quest = btn.dataset.weeklyClaim;
        const res = await postJson('/thu-thach-tuan/nhan', { quest }).catch(() => null);
        if (!res?.gamification) {
            btn.disabled = false;
            toast('Chưa nhận được — hãy thử tải lại trang.', { kind: 'err' });
            return;
        }
        track('weekly_claim', { quest });
        if (quest === 'chest') {
            const dlg = openSheet(`<div class="celebrate"><div class="celebrate__burst">${icon('gift')}</div>
                <h2>Mở rương tuần!</h2><p class="muted">Bạn đã hoàn thành mọi thử thách tuần này.</p>
                <div class="celebrate__xp">${icon('star')} +${res.gamification.xp} XP</div>
                ${res.progress.chest.freezes ? `<p class="text-[13.5px] text-ink-soft">Thêm ${res.progress.chest.freezes} thẻ giữ chuỗi (tối đa 2).</p>` : ''}
                <div class="celebrate__actions mt-3"><button type="button" class="btn btn--primary btn--lg" data-close>Tuyệt vời</button></div></div>`);
            confetti(dlg.querySelector('.celebrate'));
            handleGamification(res.gamification, { silent: true });
        } else {
            handleGamification(res.gamification);
        }
        render(res.progress);
    });
}

/** Cập nhật trạng thái nút / rương sau khi nhận (mọi thẻ thử thách trên trang). */
function render(p) {
    p.quests.forEach((q) => document.querySelectorAll(`[data-weekly-claim="${q.key}"]`).forEach((b) => {
        if (q.claimed) b.replaceWith(Object.assign(document.createElement('span'), { className: 'wk-claimed', innerHTML: `${icon('check')} Đã nhận` }));
    }));
    document.querySelectorAll('[data-weekly-done]').forEach((el) => { el.textContent = `${p.done}/${p.total}`; });
    document.querySelectorAll('[data-weekly-chest]').forEach((el) => {
        el.classList.toggle('is-ready', p.chest.ready && !p.chest.claimed);
        el.classList.toggle('is-open', p.chest.claimed);
        const b = el.querySelector('[data-weekly-claim="chest"]');
        if (b) b.disabled = !p.chest.ready || p.chest.claimed;
        if (p.chest.claimed && b) b.replaceWith(Object.assign(document.createElement('span'), { className: 'wk-claimed', innerHTML: `${icon('check')} Đã mở` }));
    });
}

function countdown(el) {
    let left = +el.dataset.weeklyCountdown;
    const tick = () => {
        const d = Math.floor(left / 86400), h = Math.floor(left % 86400 / 3600), m = Math.floor(left % 3600 / 60);
        el.textContent = d > 0 ? `${d} ngày ${h} giờ` : h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
        left = Math.max(0, left - 60);
    };
    tick();
    setInterval(tick, 60000);
}

/** Bảng chúc mừng giải xếp hạng tuần (1 lần cho mỗi giải). */
export function showAward(a) {
    const [label, ic] = MEDAL[a.medal] || MEDAL.top10;
    const dlg = openSheet(`<div class="celebrate">
        <div class="celebrate__burst wk-medal wk-medal--${a.medal}">${icon(ic)}</div>
        <h2>${escapeHtml(a.name)}!</h2>
        <p class="muted">Bạn xếp <b>hạng ${a.rank}</b> bảng xếp hạng XP tuần ${escapeHtml(a.week)} với ${Number(a.score).toLocaleString('vi-VN')} XP.</p>
        <div class="celebrate__xp">${icon('star')} +${a.xp} XP · ${escapeHtml(label)}</div>
        ${a.freezes ? `<p class="text-[13.5px] text-ink-soft">Kèm ${a.freezes} thẻ giữ chuỗi.</p>` : ''}
        <div class="celebrate__actions mt-3">
            <a class="btn btn--primary btn--lg" href="/thu-thach-tuan">${icon('trophy')} Xem thử thách tuần này</a>
            <button type="button" class="btn btn--ghost" data-share-award>${icon('share')} Khoe với bạn bè</button>
        </div></div>`);
    confetti(dlg.querySelector('.celebrate'));
    track('weekly_award_seen', { rank: a.rank });
    postJson(`/giai-thuong-tuan/${a.id}/da-xem`, {}).catch(() => {});
    dlg.querySelector('[data-share-award]').addEventListener('click', () => import('./share').then((m) =>
        m.share(`🏆 Tôi đạt ${a.name.toLowerCase()} (hạng ${a.rank}) trên bảng xếp hạng Học Cờ Tướng tuần ${a.week}!`, location.origin + '/thu-thach-tuan')));
}
