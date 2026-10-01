@extends('layouts.app')
@section('title', 'Đăng ký — Học Cờ Tướng')
@section('description', 'Đăng ký tài khoản miễn phí để lưu tiến độ, đánh dấu bài đã học và bình luận.')
@section('robots', 'noindex, follow')

@section('content')
<div class="auth-wrap">
    <div class="card auth-card">
        <div class="text-center">
            <span class="brand__logo auth-card__glyph !w-14 !h-14 !text-[28px] mx-auto">兵</span>
            <h1 class="text-[26px] font-extrabold mb-1">Tạo tài khoản</h1>
            <p class="muted text-[14.5px] mb-6">Miễn phí. Lưu tiến độ, nhận XP, giữ chuỗi ngày học và bình luận.</p>
        </div>

        @if($errors->any())
            <div class="alert alert--err mb-4"><x-icon name="x-circle" /><span>@foreach($errors->all() as $e)<span class="block">{{ $e }}</span>@endforeach</span></div>
        @endif

        @if($googleEnabled)
            @include('auth._google', ['label' => 'Đăng ký nhanh bằng Google'])
            <div class="divider-text">hoặc dùng email</div>
        @endif

        <form method="POST" action="{{ route('register') }}">
            @csrf
            <div class="field">
                <label class="label" for="name">Họ tên</label>
                <input class="input" type="text" id="name" name="name" value="{{ old('name') }}" required maxlength="100" autocomplete="name">
            </div>
            <div class="field">
                <label class="label" for="email">Email</label>
                <input class="input" type="email" id="email" name="email" value="{{ old('email') }}" required autocomplete="email">
            </div>
            <div class="field">
                <label class="label" for="password">Mật khẩu <span class="text-ink-faint font-normal">(tối thiểu 6 ký tự)</span></label>
                <input class="input" type="password" id="password" name="password" required minlength="6" autocomplete="new-password">
            </div>
            <div class="field">
                <label class="label" for="password_confirmation">Nhập lại mật khẩu</label>
                <input class="input" type="password" id="password_confirmation" name="password_confirmation" required minlength="6" autocomplete="new-password">
            </div>
            <button type="submit" class="btn btn--primary btn--lg btn--block mt-2">Tạo tài khoản</button>
        </form>

        <p class="text-center text-[14px] text-ink-soft mt-5 mb-0">
            Đã có tài khoản? <a href="{{ route('login') }}" class="font-bold">Đăng nhập</a>
        </p>
    </div>
</div>
@endsection
