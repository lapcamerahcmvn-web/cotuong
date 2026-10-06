@extends('layouts.app')
@section('title', 'Sơ Đồ Trang — Học Cờ Tướng')
@section('description', 'Sơ đồ toàn bộ trang Học Cờ Tướng: lộ trình, luyện tập, chơi cờ và tất cả bài học cờ tướng, cờ úp theo chương trình.')

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>Sơ đồ trang</span>
</nav>

<section>
    <h1 class="page-title">Sơ đồ trang</h1>
    <p class="page-lede mb-6">Toàn bộ chuyên mục, công cụ và bài học trên Học Cờ Tướng. Bấm để tới trang bạn cần.</p>

    <div class="sitemap-sec card card--pad">
        <h2>Chuyên mục chính</h2>
        <div class="sitemap-links">
            <a href="{{ route('home') }}">Trang chủ</a>
            <a href="{{ route('path') }}">Lộ trình học</a>
            <a href="{{ route('phase', 'nhap-mon') }}">Nhập môn cờ tướng</a>
            <a href="{{ route('phase', 'khai-cuoc') }}">Khai cuộc</a>
            <a href="{{ route('phase', 'trung-cuoc') }}">Trung cuộc</a>
            <a href="{{ route('phase', 'tan-cuoc') }}">Tàn cuộc</a>
            <a href="{{ route('phase', 'co-up') }}">Cờ úp</a>
            <a href="{{ route('posts.index') }}">Tin tức</a>
        </div>
    </div>

    <div class="sitemap-sec card card--pad">
        <h2>Luyện tập &amp; chơi cờ</h2>
        <div class="sitemap-links">
            <a href="{{ route('practice.hub') }}">Luyện tập thế cờ</a>
            <a href="{{ route('practice.daily') }}">Thế cờ hôm nay</a>
            <a href="{{ route('practice.setup') }}">Xếp cờ để thẩm</a>
            <a href="{{ route('play.bot') }}">Chơi với máy</a>
            <a href="{{ route('pvp.lobby') }}">Thách đấu bạn bè</a>
            <a href="{{ route('weekly') }}">Thử thách tuần</a>
            <a href="{{ route('leaderboard') }}">Bảng xếp hạng</a>
            <a href="{{ route('scan') }}">Nhận diện bàn cờ từ ảnh</a>
            <a href="{{ route('display') }}">Giao diện bàn cờ</a>
        </div>
    </div>

    @foreach($groups as $g)
        <h2 class="text-xl font-extrabold mt-8 mb-3">
            @if($g['key'])<a href="{{ route('phase', $g['key']) }}" class="text-ink">{{ $g['name'] }}</a>@else{{ $g['name'] }}@endif
            <span class="sm-sub">({{ $g['series']->count() }} chương trình)</span>
        </h2>
        @foreach($g['series'] as $s)
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
    @endforeach

    <div class="sitemap-sec card card--pad">
        <h2>Thông tin</h2>
        <div class="sitemap-links">
            <a href="{{ route('legal.terms') }}">Điều khoản sử dụng</a>
            <a href="{{ route('legal.privacy') }}">Chính sách bảo mật</a>
        </div>
    </div>
</section>
@endsection
