<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Quản trị') — Học Cờ Tướng</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>♟️</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}?v={{ @filemtime(public_path('css/app.css')) }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}?v={{ @filemtime(public_path('css/admin.css')) }}">
    @stack('head')
</head>
<body>
@php
    $isAdmin = auth()->user()?->isAdmin();
    $navPending = $isAdmin ? \App\Models\LessonComment::where('approved', false)->count() : 0;
@endphp
<div class="admin-body">
    <input type="checkbox" id="admincb" class="admincb" hidden>

    {{-- Thanh trên (chỉ mobile) --}}
    <header class="admin-mobilebar">
        <label for="admincb" class="admin-burger" aria-label="Mở menu">☰</label>
        <span class="amb-brand"><span class="logo">車</span> Cờ Tướng Admin</span>
    </header>

    <label for="admincb" class="admin-scrim" aria-hidden="true"></label>

    <aside class="admin-side">
        <div class="side-brand"><span class="logo">車</span> Cờ Tướng Admin</div>
        <nav class="admin-nav">
            <a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">Bảng điều khiển</a>
            <a href="{{ route('admin.lessons.index') }}" class="{{ request()->routeIs('admin.lessons.*') ? 'active' : '' }}">Bài học</a>
            <a href="{{ route('admin.series.index') }}" class="{{ request()->routeIs('admin.series.*') ? 'active' : '' }}">Chuỗi bài học</a>
            <a href="{{ route('admin.puzzle-audit.index') }}" class="{{ request()->routeIs('admin.puzzle-audit.*') ? 'active' : '' }}">Kiểm định thế cờ</a>
            <a href="{{ route('admin.posts.index') }}" class="{{ request()->routeIs('admin.posts.*') || request()->routeIs('admin.post-categories.*') ? 'active' : '' }}">Tin tức</a>
            <a href="{{ route('admin.mindmaps.index') }}" class="{{ request()->routeIs('admin.mindmaps.*') ? 'active' : '' }}">Sơ đồ tư duy</a>
            @if($isAdmin)
                <a href="{{ route('admin.comments.index') }}" class="{{ request()->routeIs('admin.comments.*') ? 'active' : '' }}">
                    Bình luận @if($navPending)<span class="nav-badge">{{ $navPending }}</span>@endif
                </a>
                <a href="{{ route('admin.stats.index') }}" class="{{ request()->routeIs('admin.stats.*') ? 'active' : '' }}">Thống kê</a>
                <a href="{{ route('admin.users.index') }}" class="{{ request()->routeIs('admin.users.*') ? 'active' : '' }}">Người dùng</a>
                <a href="{{ route('admin.source-assets.index') }}" class="{{ request()->routeIs('admin.source-assets.*') ? 'active' : '' }}">Nguồn tài liệu</a>
                <a href="{{ route('admin.settings.index') }}" class="{{ request()->routeIs('admin.settings.*') ? 'active' : '' }}">Cài đặt web &amp; SEO</a>
            @endif
            <a href="{{ route('home') }}" target="_blank">Xem site ↗</a>
        </nav>
        <div class="side-foot">
            <div class="who">{{ auth()->user()?->name }} · {{ $isAdmin ? 'Admin' : 'Biên tập' }}</div>
            <form method="POST" action="{{ route('logout') }}">@csrf<button type="submit" class="btn" style="width:100%;">Đăng xuất</button></form>
        </div>
    </aside>

    <main class="admin-main">
        <div class="admin-top">
            <h1>@yield('heading', 'Quản trị')</h1>
            @yield('top-actions')
        </div>
        <div class="admin-content">
            @if(session('ok'))<div class="flash ok">{{ session('ok') }}</div>@endif
            @if(session('err'))<div class="flash err">{{ session('err') }}</div>@endif
            @if($errors->any())<div class="flash err">{{ $errors->first() }}</div>@endif
            @yield('content')
        </div>
    </main>
</div>
<script>
// Bảng admin trên điện thoại hiển thị dạng thẻ: gắn nhãn cột (từ <th>) vào từng ô để CSS hiện "NHÃN  giá trị".
document.querySelectorAll('table.admin-table').forEach(function (t) {
    var heads = Array.prototype.map.call(t.querySelectorAll('thead th'), function (th) { return th.textContent.trim(); });
    t.querySelectorAll('tbody tr').forEach(function (tr) {
        Array.prototype.forEach.call(tr.children, function (td, i) {
            if (!td.hasAttribute('data-label')) td.setAttribute('data-label', td.colSpan > 1 ? '' : (heads[i] || ''));
        });
    });
});
// Form dài (bài học, tin tức): trên điện thoại hiện nút Lưu nổi ở đáy khi nút Lưu gốc đã cuộn khuất.
(function () {
    var orig = document.querySelector('.form-grid button.btn.primary[type=submit]');
    if (!orig || !('IntersectionObserver' in window)) return;
    var bar = document.createElement('div');
    bar.className = 'm-savebar';
    bar.innerHTML = '<button type="button" class="btn primary"></button>';
    bar.firstChild.textContent = orig.textContent.trim();
    bar.firstChild.addEventListener('click', function () { orig.click(); });   // bấm nút gốc: giữ nguyên xử lý đồng bộ editor trước khi gửi
    document.body.appendChild(bar);
    new IntersectionObserver(function (es) { bar.classList.toggle('is-on', !es[0].isIntersecting); }).observe(orig);
})();
</script>
<script src="{{ asset('js/board.js') }}?v={{ @filemtime(public_path('js/board.js')) }}" defer></script>
@stack('scripts')
</body>
</html>
