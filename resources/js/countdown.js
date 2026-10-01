// Đồng hồ đếm ngược tới thế cờ ngày mai: <span data-countdown="SECONDS">.
export function init() {
    document.querySelectorAll('[data-countdown]').forEach((el) => {
        let left = parseInt(el.dataset.countdown, 10) || 0;
        const tick = () => {
            const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
            el.textContent = [h, m, s].map((x) => String(x).padStart(2, '0')).join(':');
            if (left > 0) left--;
        };
        tick();
        setInterval(tick, 1000);
    });
}
