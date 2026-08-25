<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Học Cờ Tướng — Bàn Cờ Tương Tác, Diễn Giải Từng Nước')</title>
    <meta name="description" content="@yield('description', 'Học cờ tướng bài bản với bàn cờ tương tác: khai cuộc, trung cuộc, tàn cuộc và cờ úp. Diễn giải từng nước đi rõ ràng, dễ hiểu.')">
    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="robots" content="@yield('robots', 'index, follow')">

    {{-- Open Graph --}}
    <meta property="og:type" content="@yield('og_type', 'website')">
    <meta property="og:title" content="@yield('og_title', 'Học Cờ Tướng')">
    <meta property="og:description" content="@yield('description', 'Học cờ tướng bài bản với bàn cờ tương tác.')">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:locale" content="vi_VN">

    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>♟️</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @stack('head')
</head>
<body data-auth="{{ auth()->check() ? '1' : '0' }}">
    @php
        $navLinks = [
            'khai-cuoc' => 'Khai cuộc', 'trung-cuoc' => 'Trung cuộc',
            'tan-cuoc' => 'Tàn cuộc', 'co-up' => 'Cờ úp',
        ];
        $magnifier = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
        $userIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
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
                <a href="{{ route('account.index') }}" class="account-btn" title="Tài khoản">
                    {!! $userIcon !!}<span class="ab-text">{{ auth()->check() ? \Illuminate\Support\Str::limit(auth()->user()->name, 10) : 'Tài khoản' }}</span>
                </a>
                <label for="navcb" class="nav-toggle" role="button" aria-label="Mở menu" tabindex="0">
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
        </div>
    </header>

    <main class="wrap">
        @yield('content')
    </main>

    <footer class="foot">
        <div class="wrap foot-inner">
            <div>© {{ date('Y') }} Học Cờ Tướng — bàn cờ tương tác, diễn giải từng nước.</div>
            <div class="muted">Khai cuộc · Trung cuộc · Tàn cuộc · Cờ úp</div>
        </div>
    </footer>

    {{-- Guest-gate: sau ~2 phút, nhắc khách đăng nhập để học có lộ trình (không chặn cứng) --}}
    @guest
    <div id="guest-gate" role="dialog" aria-modal="true" aria-labelledby="gg-title"
         style="display:none;position:fixed;inset:0;z-index:9998;background:rgba(20,18,16,.55);backdrop-filter:blur(3px);align-items:center;justify-content:center;padding:20px;">
        <div class="card" style="max-width:420px;padding:28px;text-align:center;">
            <div style="font-size:34px;font-family:'KaiTi',serif;color:var(--red);line-height:1;">將</div>
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

    <script src="{{ asset('js/board.js') }}" defer></script>
    @stack('scripts')
</body>
</html>
