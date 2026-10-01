@extends('layouts.app')
@section('title', 'Đăng nhập — Học Cờ Tướng')
@section('description', 'Đăng nhập để lưu tiến độ học cờ tướng và theo lộ trình miễn phí.')
@section('robots', 'noindex, follow')

@section('content')
<div class="auth-wrap">
    <div class="card auth-card">
        <div class="text-center">
            <span class="brand__logo auth-card__glyph !w-14 !h-14 !text-[28px] mx-auto">將</span>
            <h1 class="text-[26px] font-extrabold mb-1">Đăng nhập để học</h1>
            <p class="muted text-[14.5px] mb-6">Lưu tiến độ, giữ chuỗi ngày học, nhận XP và huy hiệu — miễn phí.</p>
        </div>

        @if($errors->any())<div class="alert alert--err mb-4"><x-icon name="x-circle" />{{ $errors->first() }}</div>@endif

        @if($googleEnabled)
            @include('auth._google', ['label' => 'Tiếp tục với Google'])
            <div class="divider-text">hoặc dùng email</div>
        @else
            <div class="notice mb-4 text-[13.5px]">Đăng nhập Google chưa bật (cần cấu hình <code>GOOGLE_CLIENT_ID</code>). Tạm dùng email/mật khẩu.</div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="field">
                <label class="label" for="email">Email</label>
                <input class="input" type="email" id="email" name="email" value="{{ old('email') }}" required autocomplete="email">
            </div>
            <div class="field">
                <label class="label" for="password">Mật khẩu</label>
                <input class="input" type="password" id="password" name="password" required autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn--primary btn--lg btn--block mt-2">Đăng nhập</button>
        </form>

        <p class="text-center text-[14px] text-ink-soft mt-5 mb-0">
            Chưa có tài khoản? <a href="{{ route('register') }}" class="font-bold">Đăng ký miễn phí</a>
        </p>
    </div>
</div>
@endsection
