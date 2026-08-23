@extends('layouts.app')

@section('title', $meta['label'] . ' Cờ Tướng — Học Qua Bàn Cờ Tương Tác')
@section('description', $meta['desc'])

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> › <span>{{ $meta['label'] }}</span>
</nav>

<section class="section" style="padding-top:12px;">
    <h1 style="font-size:clamp(26px,4vw,36px);font-weight:800;margin:0 0 8px;">{{ $meta['label'] }} cờ tướng</h1>
    <p class="sub" style="max-width:40em;">{{ $meta['desc'] }}</p>

    @if($seriesList->isNotEmpty())
        <div style="margin:24px 0 8px;font-weight:700;font-size:15px;">Chương trình</div>
        <div class="lesson-list" style="margin-bottom:28px;">
            @foreach($seriesList as $s)
                @if($s->published_lessons_count > 0)
                <a href="{{ route('series', $s->slug) }}" class="lesson-item card">
                    <span class="li-num">課</span>
                    <span>
                        <span class="li-title">{{ $s->name }}</span>
                        <span class="li-sub">{{ $s->published_lessons_count }} bài</span>
                    </span>
                    <span class="li-meta">→</span>
                </a>
                @endif
            @endforeach
        </div>
    @endif

    @if($lessons->count())
        <div style="margin:8px 0;font-weight:700;font-size:15px;">Tất cả bài học</div>
        <div class="lesson-list">
            @foreach($lessons as $i => $lesson)
                <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card">
                    <span class="li-num">{{ str_pad($lessons->firstItem() + $i, 2, '0', STR_PAD_LEFT) }}</span>
                    <span>
                        <span class="li-title">{{ $lesson->title }}</span>
                        <span class="li-sub">{{ $lesson->move_count }} nước đi · {{ $lesson->level_label }}</span>
                    </span>
                    <span class="li-meta"><span class="tag count">{{ $lesson->move_count }} nước</span></span>
                </a>
            @endforeach
        </div>
        <div style="margin-top:24px;">{{ $lessons->links() }}</div>
    @else
        <div class="notice">Chưa có bài học nào được xuất bản cho mục này. Nội dung đang được biên soạn — quay lại sau nhé.</div>
    @endif
</section>
@endsection
