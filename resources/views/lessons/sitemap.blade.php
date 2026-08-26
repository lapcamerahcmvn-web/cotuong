@extends('layouts.app')
@section('title', 'Sơ Đồ Trang — Học Cờ Tướng')
@section('description', 'Sơ đồ toàn bộ trang Học Cờ Tướng: các chuyên mục và tất cả bài học cờ tướng, cờ úp theo chương trình.')

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> › <span>Sơ đồ trang</span>
</nav>

<section class="section" style="padding-top:12px;">
    <h1 style="font-size:clamp(24px,4vw,32px);font-weight:800;margin:0 0 8px;">Sơ đồ trang</h1>
    <p class="sub" style="max-width:44em;">Toàn bộ chuyên mục và bài học trên Học Cờ Tướng. Bấm để tới trang bạn cần.</p>

    <div class="sitemap-sec">
        <h2>Chuyên mục chính</h2>
        <div class="sitemap-links">
            <a href="{{ route('home') }}">Trang chủ</a>
            <a href="{{ route('phase', 'nhap-mon') }}">Nhập môn cờ tướng</a>
            <a href="{{ route('phase', 'khai-cuoc') }}">Khai cuộc</a>
            <a href="{{ route('phase', 'trung-cuoc') }}">Trung cuộc</a>
            <a href="{{ route('phase', 'tan-cuoc') }}">Tàn cuộc</a>
            <a href="{{ route('phase', 'co-up') }}">Cờ úp</a>
        </div>
    </div>

    @foreach($series as $s)
        <div class="sitemap-sec">
            <h2><a href="{{ route('series', $s->slug) }}" style="color:inherit;">{{ $s->name }}</a>
                <span class="sm-sub" style="font-weight:400;">({{ $s->publishedLessons->count() }} bài)</span></h2>
            <div class="sitemap-links">
                @foreach($s->publishedLessons as $l)
                    <a href="{{ route('lessons.show', $l->slug) }}">{{ $l->title }}</a>
                @endforeach
            </div>
        </div>
    @endforeach
</section>
@endsection
