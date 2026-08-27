@extends('layouts.app')

@section('title', 'Không có quyền truy cập (403) — Học Cờ Tướng')
@section('description', 'Bạn không có quyền xem trang này.')
@section('robots', 'noindex, nofollow')

@section('content')
<section class="err-page">
    <div class="err-card card">
        <div class="err-code">403</div>
        <h1>Không có quyền truy cập</h1>
        <p class="err-sub">Trang này chỉ dành cho quản trị viên. Nếu bạn là học viên, hãy quay về trang chủ để tiếp tục học.</p>
        <div class="err-links">
            <a class="btn primary" href="{{ route('home') }}">🏠 Về trang chủ</a>
            @guest<a class="btn" href="{{ route('login') }}">Đăng nhập</a>@endguest
        </div>
    </div>
</section>
@endsection
