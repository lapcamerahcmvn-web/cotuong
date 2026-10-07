// Trang chuyên đề (/chuong-trinh/{slug}): nút "Hiện thêm" nạp trang kế (?page=N) và nối bài vào danh sách,
// không tải lại trang. Không có JS vẫn dùng được liên kết phân trang thường (thẻ <a> của nút).
export function init() {
    const list = document.querySelector('[data-series-list]');
    const btn = document.querySelector('[data-series-next]');
    if (!list || !btn) return;
    let busy = false;
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (busy) return;
        busy = true;
        const label = btn.innerHTML;
        btn.classList.add('is-loading');
        btn.textContent = 'Đang tải…';
        try {
            const res = await fetch(btn.href, { headers: { 'X-Requested-With': 'XMLHttpRequest' }, credentials: 'same-origin' });
            if (!res.ok) throw new Error(res.status);
            const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
            const items = doc.querySelectorAll('[data-series-list] > .lesson-item');
            const frag = document.createDocumentFragment();
            items.forEach((el) => frag.appendChild(document.importNode(el, true)));
            list.appendChild(frag);
            const end = doc.querySelector('[data-series-end]');
            const endHere = document.querySelector('[data-series-end]');
            if (end && endHere) endHere.textContent = end.textContent;
            const nextBtn = doc.querySelector('[data-series-next]');
            const page = +btn.dataset.page;
            history.replaceState(null, '', btn.href);   // tải lại trang / chia sẻ link → đúng trang đang xem
            const pager = document.querySelector('[data-series-more] .pager');
            const newPager = doc.querySelector('[data-series-more] .pager');
            if (pager && newPager) pager.replaceWith(newPager);
            if (nextBtn) {
                btn.href = nextBtn.href;
                btn.dataset.page = String(page + 1);
                btn.innerHTML = nextBtn.innerHTML;
            } else {
                btn.remove();
            }
        } catch (err) {
            window.location.href = btn.href;   // lỗi mạng: chuyển trang thường
            return;
        } finally {
            btn.classList.remove('is-loading');
            busy = false;
        }
        if (!btn.isConnected) return;
        if (btn.textContent === 'Đang tải…') btn.innerHTML = label;
    });
}
