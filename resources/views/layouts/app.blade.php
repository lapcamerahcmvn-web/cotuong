<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#c8451f">
    {{-- Áp theme đã lưu TRƯỚC khi tải CSS để tránh nháy sáng/tối (FOUC). --}}
    <script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}})();</script>

    @php
        // Blade escape sẵn nội dung @section(...) truyền theo tham số (e()). Các giá trị lấy từ
        // yieldContent đã an toàn cho cả element lẫn attribute → in bằng {!! !!}. Giá trị mặc định
        // tự dựng ở đây thì e() thủ công.
        $__title      = trim($__env->yieldContent('title')) ?: e($siteName . ' — Bàn Cờ Tương Tác, Diễn Giải Từng Nước');
        $__desc       = trim($__env->yieldContent('description')) ?: e('Học cờ tướng bài bản với bàn cờ tương tác: khai cuộc, trung cuộc, tàn cuộc và cờ úp. Diễn giải từng nước đi rõ ràng, dễ hiểu.');
        $__ogTitle    = trim($__env->yieldContent('og_title')) ?: $__title;
        $__ogImage    = trim($__env->yieldContent('og_image')) ?: e($ogImageDefault);
        $__ogImageAlt = trim($__env->yieldContent('og_image_alt')) ?: e($siteName . ' — học cờ qua bàn cờ tương tác');
        $__ogType     = trim($__env->yieldContent('og_type')) ?: 'website';
    @endphp

    <title>{!! $__title !!}</title>
    <meta name="description" content="{!! $__desc !!}">
    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="robots" content="@yield('robots', 'index, follow')">

    {{-- Open Graph --}}
    <meta property="og:type" content="{{ $__ogType }}">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:title" content="{!! $__ogTitle !!}">
    <meta property="og:description" content="{!! $__desc !!}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:locale" content="vi_VN">
    <meta property="og:image" content="{!! $__ogImage !!}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="{!! $__ogImageAlt !!}">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    @if(!empty($siteTwitter))<meta name="twitter:site" content="{{ $siteTwitter }}">@endif
    <meta name="twitter:title" content="{!! $__ogTitle !!}">
    <meta name="twitter:description" content="{!! $__desc !!}">
    <meta name="twitter:image" content="{!! $__ogImage !!}">

    {{-- Favicon / PWA --}}
    <link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="font" type="font/woff2" href="{{ asset('fonts/xiangqi-kai.woff2') }}" crossorigin>
    {{-- Font tải BẤT ĐỒNG BỘ (không chặn render) — trang hiện ngay bằng font hệ thống rồi swap.
         Bricolage rút về 2 weight cố định (bỏ trục opsz variable) để giảm số file tải. --}}
    @php $_fontHref = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap'; @endphp
    <link rel="stylesheet" href="{{ $_fontHref }}" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="{{ $_fontHref }}"></noscript>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}?v={{ @filemtime(public_path('css/app.css')) }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- JSON-LD toàn site: Organization + WebSite (kèm SearchAction). Trang con tham chiếu @id. --}}
    {!! \App\Support\Seo::ld($orgLd) !!}
    {!! \App\Support\Seo::ld($websiteLd) !!}

    @stack('head')
</head>
<body data-auth="{{ auth()->check() ? '1' : '0' }}">
    @php
        $navLinks = [
            'nhap-mon' => 'Nhập môn', 'khai-cuoc' => 'Khai cuộc', 'trung-cuoc' => 'Trung cuộc',
            'tan-cuoc' => 'Tàn cuộc', 'co-up' => 'Cờ úp',
        ];
        $magnifier = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
        $userIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        $themeIcons = '<svg class="ic-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg><svg class="ic-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    @endphp
    <header class="nav">
        <input type="checkbox" id="navcb" class="navcb" hidden>
        <div class="wrap nav-inner">
            <a href="{{ route('home') }}" class="brand"><span class="logo">車</span> Học Cờ Tướng</a>

            <nav class="nav-links" aria-label="Điều hướng chính">
                @foreach($navLinks as $slug => $label)
                    <a href="{{ route('phase', $slug) }}" @class(['on' => request()->routeIs('phase') && request()->route('phase')===$slug])>{{ $label }}</a>
                @endforeach
            </nav>

            <div class="nav-right">
                <form method="GET" action="{{ route('search') }}" class="nav-search" role="search">
                    <span class="ns-icon">{!! $magnifier !!}</span>
                    <input type="search" name="q" value="{{ request('q') }}" placeholder="Tìm bài học…" aria-label="Tìm kiếm">
                </form>
                <button type="button" class="theme-toggle" data-theme-toggle title="Đổi giao diện sáng/tối" aria-label="Đổi giao diện sáng/tối">{!! $themeIcons !!}</button>
                <a href="{{ route('account.index') }}" class="account-btn" title="Tài khoản">
                    {!! $userIcon !!}<span class="ab-text">{{ auth()->check() ? \Illuminate\Support\Str::limit(auth()->user()->name, 10) : 'Tài khoản' }}</span>
                </a>
                <label for="navcb" class="nav-toggle" aria-label="Mở menu">
                    <span class="nt-bars"></span>
                </label>
            </div>
        </div>

        {{-- Menu mobile (drawer) — hiện khi bấm ☰ (checkbox-hack, không cần JS) --}}
        <div class="nav-drawer">
            <form method="GET" action="{{ route('search') }}" class="drawer-search" role="search">
                <span class="ns-icon">{!! $magnifier !!}</span>
                <input type="search" name="q" value="{{ request('q') }}" placeholder="Tìm bài học…" aria-label="Tìm kiếm">
            </form>
            <nav class="drawer-links" aria-label="Menu">
                @foreach($navLinks as $slug => $label)
                    <a href="{{ route('phase', $slug) }}">{{ $label }}</a>
                @endforeach
                <a href="{{ route('account.index') }}" class="drawer-account">{!! $userIcon !!} {{ auth()->check() ? 'Tài khoản của tôi' : 'Đăng nhập' }}</a>
            </nav>
            <button type="button" class="drawer-theme" data-theme-toggle>{!! $themeIcons !!} <span>Giao diện sáng / tối</span></button>
        </div>
    </header>

    <main class="wrap">
        @yield('content')
    </main>

    <footer class="foot">
        <div class="wrap foot-inner">
            <div>© {{ date('Y') }} Học Cờ Tướng — bàn cờ tương tác, diễn giải từng nước.</div>
            <nav class="foot-links" aria-label="Liên kết chân trang">
                <a href="{{ route('phase', 'nhap-mon') }}">Nhập môn</a>
                <a href="{{ route('phase', 'khai-cuoc') }}">Khai cuộc</a>
                <a href="{{ route('phase', 'trung-cuoc') }}">Trung cuộc</a>
                <a href="{{ route('phase', 'tan-cuoc') }}">Tàn cuộc</a>
                <a href="{{ route('phase', 'co-up') }}">Cờ úp</a>
                <a href="{{ route('sitemap.page') }}">Sơ đồ trang</a>
            </nav>
        </div>
    </footer>

    {{-- Guest-gate: sau ~2 phút, nhắc khách đăng nhập để học có lộ trình (không chặn cứng) --}}
    @guest
    <div id="guest-gate" role="dialog" aria-modal="true" aria-labelledby="gg-title"
         style="display:none;position:fixed;inset:0;z-index:9998;background:rgba(20,18,16,.55);backdrop-filter:blur(3px);align-items:center;justify-content:center;padding:20px;">
        <div class="card" style="max-width:420px;padding:28px;text-align:center;">
            <div style="font-size:34px;font-family:'XiangqiKai','KaiTi',serif;color:var(--red);line-height:1;">將</div>
            <h2 id="gg-title" style="font-size:21px;font-weight:800;margin:12px 0 8px;">Đăng nhập để học có lộ trình</h2>
            <p class="muted" style="font-size:14.5px;margin:0 0 20px;">Miễn phí. Lưu tiến độ, đánh dấu bài đã học và gợi ý bài tiếp theo phù hợp với bạn.</p>
            <a href="{{ route('login') }}" class="btn primary lg" style="width:100%;margin-bottom:10px;">Đăng nhập miễn phí</a>
            <button type="button" class="btn" style="width:100%;" onclick="document.getElementById('guest-gate').style.display='none';sessionStorage.setItem('gg_dismissed','1');">Để sau, xem tiếp</button>
        </div>
    </div>
    <script>
    (function(){
        if (sessionStorage.getItem('gg_dismissed')) return;
        setTimeout(function(){
            if (sessionStorage.getItem('gg_dismissed')) return;
            var g = document.getElementById('guest-gate');
            if (g) g.style.display = 'flex';
        }, 120000); // 2 phút
    })();
    </script>
    @endguest

    {{-- Chuyển giao diện: auto (theo HĐH) → sáng → tối → auto. Lưu localStorage. --}}
    <script>
    (function () {
        var mq = window.matchMedia('(prefers-color-scheme: dark)');
        function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
        function effective() { var t = stored(); return t || (mq.matches ? 'dark' : 'light'); }
        function apply() {
            var t = stored();
            if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
            var m = document.querySelector('meta[name=theme-color]');
            if (m) m.setAttribute('content', effective() === 'dark' ? '#1e1a15' : '#c8451f');
            document.querySelectorAll('[data-theme-toggle]').forEach(function (b) { b.setAttribute('aria-pressed', t === 'dark'); });
        }
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var order = ['light', 'dark'];
                var cur = stored();
                var next = cur === 'light' ? 'dark' : (cur === 'dark' ? null : (mq.matches ? 'light' : 'dark'));
                try { next ? localStorage.setItem('theme', next) : localStorage.removeItem('theme'); } catch (e) {}
                apply();
            });
        });
        mq.addEventListener && mq.addEventListener('change', apply);
        apply();
    })();
    </script>

    <script src="{{ asset('js/xiangqi-rules.js') }}?v={{ @filemtime(public_path('js/xiangqi-rules.js')) }}" defer></script>
    <script src="{{ asset('js/board.js') }}?v={{ @filemtime(public_path('js/board.js')) }}" defer></script>
    @stack('scripts')
</body>
</html>
