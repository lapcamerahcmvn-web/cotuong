@extends('layouts.app')

@section('title', 'Học Cờ Tướng — Bàn Cờ Tương Tác, Diễn Giải Từng Nước')
@section('description', 'Học cờ tướng bài bản từ khai cuộc đến tàn cuộc và cờ úp. Bàn cờ tương tác đi từng nước có diễn giải, dễ hiểu cho người mới lẫn kỳ thủ.')

@push('head')
@php
    $ld = [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => 'Học Cờ Tướng',
        'url' => url('/'),
        'inLanguage' => 'vi-VN',
    ];
@endphp
<script type="application/ld+json">{!! json_encode($ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@endpush

@section('content')
<section class="hero">
    <div>
        <h1>Học cờ tướng qua <span class="hl">bàn cờ tương tác</span>, hiểu từng nước đi</h1>
        <p class="lead">Không chỉ xem — bạn đi lại từng nước, đọc lý do đằng sau mỗi thế trận. Từ khai cuộc, trung cuộc, tàn cuộc đến cờ úp, học bài bản theo giáo trình.</p>
        <div class="cta-row">
            <a href="{{ route('phase', 'khai-cuoc') }}" class="btn primary lg">Bắt đầu với Khai cuộc</a>
            <a href="{{ route('phase', 'co-up') }}" class="btn lg">Khám phá Cờ úp</a>
        </div>
        @if($totalLessons > 0)
            <p class="muted" style="margin-top:18px;font-size:14px;">Hiện có <strong>{{ $totalLessons }}</strong> bài học tương tác.</p>
        @endif
    </div>
    <div class="hero-board">
        <x-chess-board
            :initial-fen="$heroLesson?->initial_fen ?? 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR'"
            :steps="$heroSteps"
            :show-list="false" />
    </div>
</section>

<section class="section">
    <h2>Học theo giai đoạn ván cờ</h2>
    <p class="sub">Mỗi giai đoạn có tư duy riêng — chọn nơi bạn muốn mạnh lên.</p>
    <div class="phase-grid">
        @php
            $phaseMeta = [
                'khai-cuoc'  => ['icon' => '車', 'desc' => 'Bố trí quân, tranh tiên ngay từ đầu ván.'],
                'trung-cuoc' => ['icon' => '炮', 'desc' => 'Phối hợp tấn công, tính toán đổi quân.'],
                'tan-cuoc'   => ['icon' => '將', 'desc' => 'Kỹ thuật thắng thế cờ ít quân.'],
                'nhap-mon'   => ['icon' => '兵', 'desc' => 'Luật chơi và nước đi cơ bản cho người mới.'],
            ];
        @endphp
        @foreach($phaseMeta as $key => $m)
            <a href="{{ route('phase', $key) }}" class="phase-card card">
                <div class="pc-icon">{{ $m['icon'] }}</div>
                <h3>{{ \App\Models\Lesson::PHASES[$key] }}</h3>
                <p>{{ $m['desc'] }}</p>
                @if(($phases[$key]['count'] ?? 0) > 0)
                    <div class="pc-count">{{ $phases[$key]['count'] }} bài học</div>
                @else
                    <div class="pc-count" style="color:var(--ink-faint)">Sắp ra mắt</div>
                @endif
            </a>
        @endforeach
    </div>
</section>

@if($featured->isNotEmpty())
<section class="section">
    <h2>Bài học nổi bật</h2>
    <p class="sub">Những thế trận kinh điển, có bàn cờ đi từng nước.</p>
    <div class="lesson-list">
        @foreach($featured as $i => $lesson)
            <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card">
                <span class="li-num">{{ str_pad($i + 1, 2, '0', STR_PAD_LEFT) }}</span>
                <span>
                    <span class="li-title">{{ $lesson->title }}</span>
                    <span class="li-sub">{{ $lesson->phase_label }} · {{ $lesson->move_count }} nước đi</span>
                </span>
                <span class="li-meta"><span class="tag level">{{ $lesson->level_label }}</span></span>
            </a>
        @endforeach
    </div>
</section>
@endif

@if($series->isNotEmpty())
<section class="section">
    <h2>Chương trình học</h2>
    <p class="sub">Giáo trình có hệ thống, theo từng chuỗi bài.</p>
    <div class="lesson-list">
        @foreach($series as $s)
            <a href="{{ route('series', $s->slug) }}" class="lesson-item card">
                <span class="li-num">{{ $s->game_mode === 'co-up' ? '揭' : '課' }}</span>
                <span>
                    <span class="li-title">{{ $s->name }}</span>
                    <span class="li-sub">{{ $s->published_lessons_count }} bài đã xuất bản</span>
                </span>
                <span class="li-meta"><span class="tag phase">{{ \App\Models\Lesson::PHASES[$s->phase] ?? \App\Models\Lesson::GAME_MODES[$s->game_mode] ?? 'Chương trình' }}</span></span>
            </a>
        @endforeach
    </div>
</section>
@endif
@endsection
