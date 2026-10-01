// Chia sẻ kết quả: dùng Web Share trên điện thoại, không thì sao chép vào bộ nhớ tạm.
import { toast, track } from './core';

export async function share(text, url) {
    track('share', { url });
    const full = text + '\n' + url;
    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        try { await navigator.share({ text, url }); return; } catch (e) { /* người dùng huỷ */ }
    }
    try {
        await navigator.clipboard.writeText(full);
        toast('Đã sao chép — dán vào Zalo/Facebook để khoe nhé!', { kind: 'ok', iconName: 'copy' });
    } catch (e) {
        window.prompt('Sao chép nội dung này:', full);
    }
}
