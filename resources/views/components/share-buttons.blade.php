@props(['url', 'title', 'image' => null])
@php
    $encUrl   = rawurlencode($url);
    $encTitle = rawurlencode($title);
    $fbUrl    = 'https://www.facebook.com/sharer/sharer.php?u=' . $encUrl;
    $zaloUrl  = 'https://zalo.me/share?url=' . $encUrl . '&title=' . $encTitle
              . ($image ? '&thumbnail=' . rawurlencode($image) : '');
@endphp
<div class="share-row" data-share data-url="{{ $url }}" data-title="{{ $title }}"
     data-fb="{{ $fbUrl }}" data-zalo="{{ $zaloUrl }}">
    <span class="share-label">Chia sẻ:</span>
    <button type="button" class="share-btn share-fb" onclick="xqShare(this,'fb')" aria-label="Chia sẻ Facebook">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z"/></svg>
        Facebook
    </button>
    <button type="button" class="share-btn share-zalo" onclick="xqShare(this,'zalo')" aria-label="Chia sẻ Zalo">
        <svg viewBox="0 0 48 48" width="15" height="15" fill="currentColor"><path d="M24 4C12.95 4 4 11.6 4 21c0 5.36 2.9 10.13 7.45 13.24-.2 1.7-.9 4.02-2.5 5.9-.3.36-.05.9.42.83 3.2-.5 5.9-1.9 7.8-3.2 2.1.55 4.4.85 6.83.85 11.05 0 20-7.6 20-17S35.05 4 24 4z"/></svg>
        Zalo
    </button>
    <button type="button" class="share-btn share-copy" onclick="xqShare(this,'copy')" aria-label="Sao chép link">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <span class="sc-text">Sao chép link</span>
    </button>
</div>
@once
@push('scripts')
<script>
window.xqShare = function (btn, kind) {
    var box = btn.closest('[data-share]');
    var url = box.getAttribute('data-url'), title = box.getAttribute('data-title');
    var isMobile = navigator.share && /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (kind === 'copy') {
        // URL ở dòng đầu để Zalo/FB giữ được ảnh preview khi dán.
        navigator.clipboard.writeText(url + '\n' + title).then(function () {
            var t = btn.querySelector('.sc-text'); if (!t) return;
            var old = t.textContent; t.textContent = 'Đã sao chép!'; btn.classList.add('is-copied');
            setTimeout(function () { t.textContent = old; btn.classList.remove('is-copied'); }, 2200);
        });
        return;
    }
    if (isMobile) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
    var target = kind === 'fb' ? box.getAttribute('data-fb') : box.getAttribute('data-zalo');
    window.open(target, '_blank', 'noopener,noreferrer,width=620,height=540');
};
</script>
@endpush
@endonce
