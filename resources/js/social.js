// Theo dõi kỳ thủ (nút [data-follow] ở hồ sơ công khai / trang Bạn bè).
import { postJson, icon, toast, track } from './core';

export async function follow(btn) {
    if (btn.disabled) return;
    if (!window.__xq?.auth) { location.href = '/dang-nhap'; return; }
    btn.disabled = true;
    const res = await postJson(btn.dataset.follow, {}).catch(() => null);
    btn.disabled = false;
    if (!res || res.following === undefined) { toast(res?.message || 'Chưa theo dõi được — thử lại sau.', { kind: 'err' }); return; }
    const on = res.following;
    btn.dataset.following = on ? '1' : '0';
    btn.classList.toggle('btn--primary', !on);
    btn.innerHTML = `${icon(on ? 'check' : 'user')} <span>${on ? 'Đang theo dõi' : 'Theo dõi'}</span>`;
    document.querySelectorAll('[data-followers]').forEach((el) => { el.textContent = res.followers; });
    toast(on ? 'Đã theo dõi — xem thi đua trong mục Bạn bè.' : 'Đã bỏ theo dõi.', { kind: on ? 'ok' : 'info', iconName: on ? 'user' : null });
    track(on ? 'follow' : 'unfollow');
}
