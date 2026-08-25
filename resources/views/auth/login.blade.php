@extends('layouts.app')
@section('title', 'Đăng nhập — Học Cờ Tướng')
@section('description', 'Đăng nhập để lưu tiến độ học cờ tướng và theo lộ trình miễn phí.')
@section('robots', 'noindex, follow')

@section('content')
<section style="max-width:420px;margin:40px auto 60px;">
    <div class="card" style="padding:30px;">
        <h1 style="font-size:24px;font-weight:800;margin:0 0 6px;">Đăng nhập để học</h1>
        <p class="muted" style="margin:0 0 22px;font-size:14.5px;">Lưu tiến độ, đánh dấu bài đã học và theo lộ trình miễn phí.</p>

        @if($errors->any())<div class="notice" style="border-color:var(--red);color:var(--red);margin-bottom:16px;">{{ $errors->first() }}</div>@endif

        @if($googleEnabled)
            <a href="{{ route('login.google') }}" class="btn lg" style="width:100%;border:1px solid var(--line);gap:10px;">
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.7 30.1 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.8 6.1C12.2 13.2 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-4 6.8-9.9 6.8-17.4z"/><path fill="#FBBC05" d="M10.3 28.6c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.8-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.5 10.7l7.8-6.1z"/><path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.3-5.7c-2 1.4-4.6 2.2-7.7 2.2-6.4 0-11.8-3.7-13.7-9.9l-7.8 6.1C6.4 42.6 14.6 48 24 48z"/></svg>
                Đăng nhập bằng Google
            </a>
            <div style="text-align:center;color:var(--ink-faint);font-size:13px;margin:18px 0 6px;">hoặc</div>
        @else
            <div class="notice" style="margin-bottom:16px;font-size:13.5px;">Đăng nhập Google chưa bật (cần cấu hình <code>GOOGLE_CLIENT_ID</code>). Tạm dùng email/mật khẩu.</div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="field" style="margin-bottom:14px;">
                <label for="email" style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;">Email</label>
                <input class="input" type="email" id="email" name="email" value="{{ old('email') }}" required
                       style="width:100%;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:10px;padding:9px 12px;">
            </div>
            <div class="field" style="margin-bottom:16px;">
                <label for="password" style="display:block;font-size:13px;font-weight:600;margin-bottom:5px;">Mật khẩu</label>
                <input class="input" type="password" id="password" name="password" required
                       style="width:100%;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:10px;padding:9px 12px;">
            </div>
            <button type="submit" class="btn primary" style="width:100%;">Đăng nhập</button>
        </form>

        <p class="muted" style="text-align:center;margin:18px 0 0;font-size:14px;">
            Chưa có tài khoản? <a href="{{ route('register') }}" style="font-weight:700;color:var(--red);">Đăng ký miễn phí</a>
        </p>
    </div>
</section>
@endsection
