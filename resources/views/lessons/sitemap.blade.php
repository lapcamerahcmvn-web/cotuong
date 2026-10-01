@extends('layouts.app')
@section('title', 'Sơ Đồ Trang — Học Cờ Tướng')
@section('description', 'Sơ đồ toàn bộ trang Học Cờ Tướng: các chuyên mục và tất cả bài học cờ tướng, cờ úp theo chương trình.')

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>Sơ đồ trang</span>
</nav>

<section>
    <h1 class="page-title">Sơ đồ trang</h1>
    <p class="page-lede mb-6">Toàn bộ chuyên mục và bài học trên Học Cờ Tướng. Bấm để tới trang bạn cần.</p>

    <div class="sitemap-sec card card--pad">
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
        <div class="sitemap-sec card card--pad">
            <h2><a href="{{ route('series', $s->slug) }}" class="text-ink">{{ $s->name }}</a>
                <span class="sm-sub">({{ $s->publishedLessons->count() }} bài)</span></h2>
            <div class="sitemap-links">
                @foreach($s->publishedLessons as $l)
                    <a href="{{ route('lessons.show', $l->slug) }}">{{ $l->title }}</a>
                @endforeach
            </div>
        </div>
    @endforeach
</section>
@endsection
