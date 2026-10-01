<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#c8451f">
    {{-- Áp theme + giao diện bàn cờ đã lưu TRƯỚC khi tải CSS (chống nháy sáng/tối). Không lưu → theo HĐH. --}}
    <script>(function(){try{var d=document.documentElement,t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;var b=localStorage.getItem('board_theme');if(b)d.dataset.boardTheme=b;if(localStorage.getItem('reduce_fx')==='1')d.classList.add('reduce-fx');}catch(e){}})();</script>

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
        // Canonical tự trỏ theo trang: giữ ?page=N (N>1) để không "gộp" các trang phân trang
        // về trang 1 — Google vẫn cần thấy /trung-cuoc?page=2 là URL riêng để thu thập tiếp.
        // Các query string khác (utm_*, ...) vẫn bị bỏ như trước.
        $__pageNum = (int) request('page', 1);
        $__canonical = url()->current() . ($__pageNum > 1 ? '?page='.$__pageNum : '');
    @endphp

    <title>{!! $__title !!}</title>
    <meta name="description" content="{!! $__desc !!}">
    <link rel="canonical" href="{{ $__canonical }}">
    <meta name="robots" content="@yield('robots', 'index, follow')">
    @if(config('site.gsc_verification'))
    <meta name="google-site-verification" content="{{ config('site.gsc_verification') }}">
    @endif

    {{-- Open Graph --}}
    <meta property="og:type" content="{{ $__ogType }}">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:title" content="{!! $__ogTitle !!}">
    <meta property="og:description" content="{!! $__desc !!}">
    <meta property="og:url" content="{{ $__canonical }}">
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
    {{-- Font tải BẤT ĐỒNG BỘ (không chặn render) — trang hiện ngay bằng font hệ thống rồi swap. --}}
    @php $_fontHref = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=optional'; @endphp
    <link rel="stylesheet" href="{{ $_fontHref }}" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="{{ $_fontHref }}"></noscript>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>window.__xq={rules:"{{ asset('js/xiangqi-rules.js') }}?v={{ @filemtime(public_path('js/xiangqi-rules.js')) }}",board:"{{ asset('js/board.js') }}?v={{ @filemtime(public_path('js/board.js')) }}",auth:{{ auth()->check() ? 'true' : 'false' }},ga:{{ config('site.ga4_id') ? 'true' : 'false' }}};</script>

    {{-- JSON-LD toàn site: Organization + WebSite (kèm SearchAction). Trang con tham chiếu @id. --}}
    {!! \App\Support\Seo::ld($orgLd) !!}
    {!! \App\Support\Seo::ld($websiteLd) !!}

    {{-- Google Analytics 4 — chỉ chèn khi đã cấu hình SITE_GA4_ID trong .env. --}}
    @if(config('site.ga4_id'))
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ config('site.ga4_id') }}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '{{ config('site.ga4_id') }}');
    </script>
    @endif

    @if(session('ga_event') && config('site.ga4_id'))
    <script>gtag('event', @json(session('ga_event')), { method: 'site' });</script>
    @endif
    @stack('head')
</head>
@php
    $u = auth()->user();
    $phaseNav = [
        'nhap-mon'   => ['Nhập môn', '兵', 'Luật chơi, cách đi từng quân'],
        'khai-cuoc'  => ['Khai cuộc', '車', 'Bố trí quân, tranh tiên'],
        'trung-cuoc' => ['Trung cuộc', '炮', 'Sát pháp, phối hợp tấn công'],
        'tan-cuoc'   => ['Tàn cuộc', '將', 'Kỹ thuật thắng thế ít quân'],
        'co-up'      => ['Cờ úp', '卒', 'Lật quân, chiến thuật cờ úp'],
    ];
    $isLearn = request()->routeIs('phase', 'series', 'lessons.show', 'path');
    $isPractice = request()->routeIs('practice.*');
    $isBoard = request()->routeIs('leaderboard');
    $isPlay = request()->routeIs('play.*', 'pvp.*');
    $isMe = request()->routeIs('account.*', 'login', 'register');
@endphp
<body data-auth="{{ $u ? '1' : '0' }}" class="has-bottom-nav">
    @include('partials.icons')
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] btn btn--primary btn--sm">Bỏ qua tới nội dung</a>

    <header class="site-header" data-header>
        <div class="wrap site-header__inner">
            <a href="{{ route('home') }}" class="brand" aria-label="Học Cờ Tướng — trang chủ">
                <span class="brand__logo">車</span>
                <span class="brand__text">Học Cờ Tướng<small class="hidden sm:block">Mỗi ngày một nước cờ</small></span>
            </a>

            <nav class="main-nav" aria-label="Điều hướng chính">
                <div class="dropdown" data-dropdown>
                    <button type="button" class="main-nav__trigger {{ $isLearn ? 'is-active' : '' }}" aria-expanded="false" aria-haspopup="true" data-dropdown-trigger>
                        <x-icon name="book" /> Học <x-icon name="chev-down" class="!w-4 !h-4 opacity-60" />
                    </button>
                    <div class="dropdown__panel" data-dropdown-panel>
                        <a href="{{ route('path') }}" class="dropdown__item">
                            <span class="dropdown__glyph"><x-icon name="map" /></span>
                            <span>Lộ trình học<small>Học theo thứ tự, biết bước tiếp theo</small></span>
                        </a>
                        <div class="dropdown__sep"></div>
                        @foreach($phaseNav as $slug => [$label, $glyph, $hint])
                            <a href="{{ route('phase', $slug) }}" class="dropdown__item">
                                <span class="dropdown__glyph">{{ $glyph }}</span>
                                <span>{{ $label }}<small>{{ $hint }}</small></span>
                            </a>
                        @endforeach
                    </div>
                </div>
                <a href="{{ route('practice.hub') }}" class="main-nav__link {{ $isPractice ? 'is-active' : '' }}"><x-icon name="puzzle" /> Luyện tập</a>
                <div class="dropdown" data-dropdown>
                    <button type="button" class="main-nav__trigger {{ $isPlay ? 'is-active' : '' }}" aria-expanded="false" aria-haspopup="true" data-dropdown-trigger>
                        <x-icon name="sword" /> Chơi <x-icon name="chev-down" class="!w-4 !h-4 opacity-60" />
                    </button>
                    <div class="dropdown__panel" data-dropdown-panel>
                        <a href="{{ route('play.bot') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="shield" /></span><span>Chơi với máy<small>4 cấp độ, có gợi ý nước đi</small></span></a>
                        <a href="{{ route('pvp.lobby') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="sword" /></span><span>Thách đấu bạn bè<small>Gửi link, chơi theo lượt có đồng hồ</small></span></a>
                    </div>
                </div>
                <a href="{{ route('posts.index') }}" class="main-nav__link {{ request()->routeIs('posts.*') ? 'is-active' : '' }}"><x-icon name="news" /> Tin tức</a>
                <a href="{{ route('leaderboard') }}" class="main-nav__link {{ $isBoard ? 'is-active' : '' }}"><x-icon name="trophy" /> Xếp hạng</a>
            </nav>

            <div class="header-actions">
                <form method="GET" action="{{ route('search') }}" class="header-search" role="search">
                    <x-icon name="search" />
                    <input type="search" name="q" value="{{ request('q') }}" placeholder="Tìm bài học, khai cuộc…" aria-label="Tìm kiếm">
                </form>
                <button type="button" class="icon-btn icon-btn--search" data-search-toggle aria-label="Tìm kiếm" aria-expanded="false"><x-icon name="search" /></button>

                @if($u && $hud)
                    <a href="{{ route('account.index') }}" class="hud-chip hud-chip--flame {{ $hud['streak_today'] ? '' : 'is-cold' }}" title="{{ $hud['streak'] }} ngày học liên tiếp{{ $hud['streak_today'] ? '' : ' — học hôm nay để giữ chuỗi' }}" data-hud-streak>
                        <x-icon name="flame" /><span>{{ $hud['streak'] }}</span>
                    </a>
                    <a href="{{ route('account.index') }}" class="hud-chip hud-chip--xp" title="Tổng XP — cấp {{ $hud['level']['level'] }} {{ $hud['level']['title'] }}" data-hud-xp>
                        <x-icon name="star" /><span data-hud-xp-value>{{ number_format($hud['xp'], 0, ',', '.') }}</span>
                    </a>
                @endif

                <button type="button" class="icon-btn" data-theme-toggle aria-label="Đổi giao diện sáng/tối">
                    <x-icon name="sun" class="theme-icon-light" /><x-icon name="moon" class="theme-icon-dark" />
                </button>

                @if($u)
                    <div class="dropdown" data-dropdown>
                        <button type="button" class="avatar-btn" aria-expanded="false" aria-haspopup="true" data-dropdown-trigger aria-label="Tài khoản">
                            <span class="avatar avatar--sm">@if($u->avatar)<img src="{{ $u->avatar }}" alt="" referrerpolicy="no-referrer">@else{{ mb_strtoupper(mb_substr($u->name, 0, 1)) }}@endif</span>
                            <span class="avatar-btn__name">{{ $u->name }}</span>
                        </button>
                        <div class="dropdown__panel dropdown__panel--right" data-dropdown-panel>
                            <a href="{{ route('account.index') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="user" /></span><span>Hồ sơ của tôi<small>Cấp {{ $hud['level']['level'] ?? 1 }} · {{ $hud['level']['title'] ?? '' }}</small></span></a>
                            <a href="{{ route('account.library') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="bookmark" /></span><span>Thư viện thế cờ</span></a>
                            <a href="{{ route('practice.review') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="repeat" /></span><span>Luyện lỗi sai</span></a>
                            <a href="{{ route('leaderboard') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="trophy" /></span><span>Bảng xếp hạng</span></a>
                            <a href="{{ route('pvp.lobby') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="sword" /></span><span>Ván đấu của tôi</span></a>
                            <a href="{{ route('account.settings') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="settings" /></span><span>Cài đặt</span></a>
                            @if($u->isStaff())
                                <a href="{{ route('admin.dashboard') }}" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="shield" /></span><span>Quản trị</span></a>
                            @endif
                            <div class="dropdown__sep"></div>
                            <form method="POST" action="{{ route('logout') }}">@csrf
                                <button type="submit" class="dropdown__item"><span class="dropdown__glyph"><x-icon name="logout" /></span><span>Đăng xuất</span></button>
                            </form>
                        </div>
                    </div>
                @else
                    <a href="{{ route('login') }}" class="btn btn--primary btn--sm hidden sm:inline-flex">Đăng nhập</a>
                @endif
            </div>
        </div>
        <div class="search-overlay" data-search-panel hidden>
            <div class="wrap">
                <form method="GET" action="{{ route('search') }}" role="search">
                    <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tìm bài học, khai cuộc, thế sát…" aria-label="Tìm kiếm">
                    <button class="btn btn--primary" type="submit" aria-label="Tìm"><x-icon name="search" /></button>
                </form>
            </div>
        </div>
    </header>

    <main id="main" class="wrap page">
        @yield('content')
    </main>

    <footer class="site-footer">
        <div class="wrap">
            <div class="site-footer__grid">
                <div>
                    <a href="{{ route('home') }}" class="brand"><span class="brand__logo">車</span><span class="brand__text">Học Cờ Tướng</span></a>
                    <p class="mt-3 max-w-sm">Học cờ tướng và cờ úp bằng bàn cờ tương tác: bài học có lộ trình, thế cờ mỗi ngày, luyện tập như chơi game. Miễn phí.</p>
                </div>
                <div>
                    <h3>Học</h3>
                    <ul>
                        <li><a href="{{ route('path') }}">Lộ trình học</a></li>
                        @foreach($phaseNav as $slug => [$label])
                            <li><a href="{{ route('phase', $slug) }}">{{ $label }}</a></li>
                        @endforeach
                    </ul>
                </div>
                <div>
                    <h3>Luyện tập</h3>
                    <ul>
                        <li><a href="{{ route('practice.daily') }}">Thế cờ hôm nay</a></li>
                        <li><a href="{{ route('practice.rush') }}">Thử thách 60 giây</a></li>
                        <li><a href="{{ route('practice.survival') }}">Chế độ 3 mạng</a></li>
                        <li><a href="{{ route('practice.hub') }}">Luyện theo chủ đề</a></li>
                        <li><a href="{{ route('leaderboard') }}">Bảng xếp hạng</a></li>
                    </ul>
                    <h3 class="mt-5">Chơi</h3>
                    <ul>
                        <li><a href="{{ route('play.bot') }}">Chơi cờ tướng với máy</a></li>
                        <li><a href="{{ route('pvp.lobby') }}">Thách đấu bạn bè</a></li>
                    </ul>
                </div>
                <div>
                    <h3>Khám phá</h3>
                    <ul>
                        <li><a href="{{ route('posts.index') }}">Tin tức cờ tướng</a></li>
                        <li><a href="{{ route('search') }}">Tìm kiếm</a></li>
                        <li><a href="{{ route('sitemap.page') }}">Sơ đồ trang</a></li>
                    </ul>
                </div>
            </div>
            <div class="site-footer__bottom">
                <span>© {{ date('Y') }} Học Cờ Tướng — bàn cờ tương tác, diễn giải từng nước.</span>
                <span>Cấp độ & XP chỉ để tạo động lực, không phải đẳng cấp cờ chính thức.</span>
            </div>
        </div>
    </footer>

    <nav class="bottom-nav" aria-label="Điều hướng nhanh">
        <a href="{{ route('home') }}" class="bottom-nav__item {{ request()->routeIs('home') ? 'is-active' : '' }}"><x-icon name="home" /><span>Trang chủ</span></a>
        <a href="{{ route('path') }}" class="bottom-nav__item {{ $isLearn ? 'is-active' : '' }}"><x-icon name="book" /><span>Học</span></a>
        <a href="{{ route('practice.hub') }}" class="bottom-nav__item {{ $isPractice ? 'is-active' : '' }}"><x-icon name="puzzle" /><span>Luyện</span></a>
        <a href="{{ route('play.bot') }}" class="bottom-nav__item {{ $isPlay || $isBoard ? 'is-active' : '' }}"><x-icon name="sword" /><span>Chơi</span></a>
        <a href="{{ $u ? route('account.index') : route('login') }}" class="bottom-nav__item {{ $isMe ? 'is-active' : '' }}">
            <x-icon name="user" /><span>{{ $u ? 'Tôi' : 'Đăng nhập' }}</span>
            @if($u && $hud && $hud['streak'] > 0)<span class="bottom-nav__badge" aria-label="{{ $hud['streak'] }} ngày liên tiếp">{{ $hud['streak'] }}</span>@endif
        </a>
    </nav>

    <div class="toast-region" data-toasts aria-live="polite" aria-atomic="false"></div>

    {{-- Gợi ý đăng nhập: thanh trượt KHÔNG che nội dung, chỉ hiện từ bài học thứ 2 trong phiên (sau 15s). --}}
    @guest
    <div id="guest-gate" class="fixed inset-x-4 z-[70] mx-auto max-w-md bottom-[calc(var(--bottomnav-h)+12px+env(safe-area-inset-bottom))] lg:bottom-4" role="complementary" aria-label="Gợi ý đăng nhập" hidden>
        <div class="card flex items-center gap-3 p-4 shadow-[var(--shadow-lg)]">
            <div class="font-piece text-3xl leading-none text-primary shrink-0">將</div>
            <div class="flex-1 min-w-0">
                <div class="font-bold text-[14.5px]">Lưu tiến độ & chuỗi ngày học</div>
                <div class="text-[13px] text-ink-soft">Đăng nhập miễn phí để nhận XP, huy hiệu và gợi ý bài tiếp theo.</div>
            </div>
            <a href="{{ route('login') }}" class="btn btn--primary btn--sm shrink-0">Đăng nhập</a>
            <button type="button" class="icon-btn !w-9 !h-9 !border-0 shrink-0" data-guest-gate-close aria-label="Đóng"><x-icon name="x" /></button>
        </div>
    </div>
    @endguest

    @stack('sheets')
    @stack('scripts')
</body>
</html>
