@extends('layouts.app')

@section('title', $q ? ('Tìm: ' . $q . ' — Học Cờ Tướng') : 'Tìm kiếm — Học Cờ Tướng')
@section('description', 'Tìm bài học cờ tướng theo tên thế trận, khai cuộc, chiến thuật.')
@section('robots', 'noindex, follow')

@section('content')
<section class="section" style="padding-top:20px;">
    <h1 style="font-size:clamp(24px,4vw,32px);font-weight:800;margin:0 0 14px;">Tìm kiếm bài học</h1>

    <form method="GET" action="{{ route('search') }}" style="display:flex;gap:10px;max-width:560px;margin-bottom:26px;">
        <input class="input search-input" type="search" name="q" value="{{ $q }}" placeholder="VD: Bình Phong Mã, Pháo Đầu, tàn cuộc…" autofocus
               style="flex:1;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:12px;padding:11px 14px;font-size:15px;">
        <button class="btn primary" type="submit">Tìm</button>
    </form>

    @if($q && mb_strlen($q) < 2)
        <div class="notice">Nhập ít nhất 2 ký tự để tìm.</div>
    @elseif($q)
        @if($lessons->isEmpty() && $series->isEmpty())
            <div class="notice">Không tìm thấy kết quả cho “{{ $q }}”. Thử từ khóa khác như tên khai cuộc hoặc quân cờ.</div>
        @else
            @if($series->isNotEmpty())
                <div style="font-weight:700;margin:0 0 10px;">Chương trình ({{ $series->count() }})</div>
                <div class="lesson-list" style="margin-bottom:26px;">
                    @foreach($series as $s)
                        <a href="{{ route('series', $s->slug) }}" class="lesson-item card">
                            <span class="li-num">課</span>
                            <span><span class="li-title">{{ $s->name }}</span><span class="li-sub">{{ $s->published_lessons_count }} bài</span></span>
                            <span class="li-meta">→</span>
                        </a>
                    @endforeach
                </div>
            @endif

            @if($lessons->isNotEmpty())
                <div style="font-weight:700;margin:0 0 10px;">Bài học ({{ $lessons->count() }})</div>
                <div class="lesson-list">
                    @foreach($lessons as $lesson)
                        <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card">
                            <span class="li-num">{{ $lesson->game_mode === 'co-up' ? '揭' : '棋' }}</span>
                            <span>
                                <span class="li-title">{{ $lesson->title }}</span>
                                <span class="li-sub">{{ $lesson->phase_label }} · {{ $lesson->move_count }} nước đi · {{ $lesson->level_label }}</span>
                            </span>
                            <span class="li-meta"><span class="tag count">{{ $lesson->move_count }} nước</span></span>
                        </a>
                    @endforeach
                </div>
            @endif
        @endif
    @else
        <div class="notice">Nhập từ khóa để tìm bài học theo tên thế trận, khai cuộc hay chiến thuật.</div>
    @endif
</section>
@endsection
