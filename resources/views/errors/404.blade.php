@extends('layouts.app')

@section('title', 'Không tìm thấy trang (404) — Học Cờ Tướng')
@section('description', 'Trang bạn tìm không tồn tại hoặc đã đổi địa chỉ. Quay về trang chủ hoặc chọn một giai đoạn: khai cuộc, trung cuộc, tàn cuộc, cờ úp.')
@section('robots', 'noindex, follow')

@section('content')
<section class="err-page">
    <div class="err-card card">
        <div class="err-code">404</div>
        <h1>Không tìm thấy trang</h1>
        <p class="err-sub">Trang bạn tìm không tồn tại, đã đổi địa chỉ hoặc đã bị gỡ. Thử tìm bài học hoặc chọn một mục bên dưới.</p>

        <form method="GET" action="{{ route('search') }}" class="err-search" role="search">
            <input type="search" name="q" placeholder="Tìm bài học (VD: pháo đầu, tàn cuộc mã…)" aria-label="Tìm kiếm bài học">
            <button class="btn primary" type="submit">Tìm</button>
        </form>

        <div class="err-links">
            <a class="btn" href="{{ route('home') }}">🏠 Trang chủ</a>
            <a class="btn" href="{{ route('phase', 'nhap-mon') }}">Nhập môn</a>
            <a class="btn" href="{{ route('phase', 'khai-cuoc') }}">Khai cuộc</a>
            <a class="btn" href="{{ route('phase', 'trung-cuoc') }}">Trung cuộc</a>
            <a class="btn" href="{{ route('phase', 'tan-cuoc') }}">Tàn cuộc</a>
            <a class="btn" href="{{ route('phase', 'co-up') }}">Cờ úp</a>
            <a class="btn" href="{{ route('sitemap.page') }}">Sơ đồ trang</a>
        </div>
    </div>
</section>
@endsection
