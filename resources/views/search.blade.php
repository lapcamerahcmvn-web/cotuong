@extends('layouts.app')

@section('title', $q ? ('Tìm: ' . $q . ' — Học Cờ Tướng') : 'Tìm kiếm — Học Cờ Tướng')
@section('description', 'Tìm bài học cờ tướng theo tên thế trận, khai cuộc, chiến thuật.')
@section('robots', 'noindex, follow')

@section('content')
<div class="max-w-4xl">
    <h1 class="page-title">Tìm kiếm bài học</h1>
    <form method="GET" action="{{ route('search') }}" class="flex gap-2 max-w-2xl mt-4 mb-6" role="search">
        <input class="input !min-h-[52px] !text-[16px]" type="search" name="q" value="{{ $q }}" placeholder="VD: Bình Phong Mã, Pháo Đầu, tàn cuộc…" autofocus aria-label="Từ khoá">
        <button class="btn btn--primary btn--lg" type="submit"><x-icon name="search" /> Tìm</button>
    </form>

    @if($q && mb_strlen($q) < 2)
        <div class="notice">Nhập ít nhất 2 ký tự để tìm.</div>
    @elseif($q)
        @if($lessons->isEmpty() && $series->isEmpty())
            <div class="empty card"><div class="empty__glyph">?</div><h3>Không tìm thấy “{{ $q }}”</h3><p>Thử tên khai cuộc, quân cờ hoặc thế sát khác.</p></div>
        @else
            @if($series->isNotEmpty())
                <h2 class="text-lg font-extrabold mb-3">Chương trình <span class="text-ink-faint font-semibold">({{ $series->count() }})</span></h2>
                <div class="lesson-list mb-8">
                    @foreach($series as $s)
                        <a href="{{ route('series', $s->slug) }}" class="lesson-item card">
                            <span class="li-num font-piece">課</span>
                            <span><span class="li-title">{{ $s->name }}</span><span class="li-sub">{{ $s->published_lessons_count }} bài</span></span>
                            <span class="li-meta"><x-icon name="chev-right" /></span>
                        </a>
                    @endforeach
                </div>
            @endif

            @if($lessons->isNotEmpty())
                <h2 class="text-lg font-extrabold mb-3">Bài học <span class="text-ink-faint font-semibold">({{ $lessons->count() }})</span></h2>
                <div class="lesson-list">
                    @foreach($lessons as $lesson)
                        <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card">
                            <span class="li-num font-piece">{{ $lesson->game_mode === 'co-up' ? '揭' : '棋' }}</span>
                            <span>
                                <span class="li-title">{{ $lesson->title }}</span>
                                <span class="li-sub">{{ $lesson->phase_label }} · {{ $lesson->move_count_label }} · {{ $lesson->level_label }}</span>
                            </span>
                            <span class="li-meta"><span class="tag tag--level-{{ $lesson->level }}">{{ $lesson->level_label }}</span></span>
                        </a>
                    @endforeach
                </div>
            @endif
        @endif
    @else
        <div class="grid gap-3 sm:grid-cols-3">
            @foreach(['Pháo đầu', 'Bình phong mã', 'Song xe', 'Mã hậu pháo', 'Tàn cuộc', 'Cờ úp'] as $kw)
                <a href="{{ route('search', ['q' => $kw]) }}" class="chip justify-center !h-12">{{ $kw }}</a>
            @endforeach
        </div>
    @endif
</div>
@endsection
