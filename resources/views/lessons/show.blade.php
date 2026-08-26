@extends('layouts.app')

@section('title', \Illuminate\Support\Str::limit($lesson->seo_title_formatted, 60, ''))
@section('description', \Illuminate\Support\Str::limit(strip_tags($lesson->seo_description ?: $lesson->summary ?: ($lesson->title . ' — học cờ tướng qua bàn cờ tương tác, diễn giải từng nước đi.')), 155))

@push('head')
@php
    $ldArticle = array_filter([
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => $lesson->title,
        'description' => \Illuminate\Support\Str::limit(strip_tags($lesson->summary ?: ''), 300),
        'inLanguage' => 'vi-VN',
        'author' => ['@type' => 'Organization', 'name' => 'Học Cờ Tướng'],
        'publisher' => ['@type' => 'Organization', 'name' => 'Học Cờ Tướng'],
        'datePublished' => $lesson->published_at?->toIso8601String(),
        'dateModified' => $lesson->updated_at?->toIso8601String(),
        'mainEntityOfPage' => url()->current(),
        // GEO: gợi ý phần nội dung nên đọc cho trợ lý AI / tìm kiếm bằng giọng nói.
        'speakable' => ['@type' => 'SpeakableSpecification', 'cssSelector' => ['.title', '.prose']],
    ]);

    $crumbs = [['@type' => 'ListItem', 'position' => 1, 'name' => 'Trang chủ', 'item' => route('home')]];
    if ($lesson->phase) {
        $crumbs[] = ['@type' => 'ListItem', 'position' => 2, 'name' => $lesson->phase_label, 'item' => route('phase', $lesson->phase)];
    }
    $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $lesson->title];
    $ldCrumb = ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $crumbs];

    // HowTo schema cho bài hướng dẫn cách đi quân (nhập môn, có nước demo) — hỗ trợ rich result.
    $ldHowTo = null;
    if ($lesson->phase === 'nhap-mon' && $lesson->game_mode === 'co-tuong' && $lesson->steps->isNotEmpty()) {
        $ldHowTo = [
            '@context' => 'https://schema.org', '@type' => 'HowTo',
            'name' => $lesson->title,
            'description' => \Illuminate\Support\Str::limit(strip_tags($lesson->summary ?: ''), 250),
            'inLanguage' => 'vi-VN',
            'step' => $lesson->steps->values()->map(fn ($s, $i) => [
                '@type' => 'HowToStep', 'position' => $i + 1,
                'name' => $s->move_notation_wxf ?: ('Bước ' . ($i + 1)),
                'text' => $s->caption ?: ($s->move_notation_wxf ?: ('Bước ' . ($i + 1))),
            ])->all(),
        ];
    }
@endphp
<script type="application/ld+json">{!! json_encode($ldArticle, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
<script type="application/ld+json">{!! json_encode($ldCrumb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@if($ldHowTo)<script type="application/ld+json">{!! json_encode($ldHowTo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>@endif
@endpush

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> ›
    @if($lesson->phase)<a href="{{ route('phase', $lesson->phase) }}">{{ $lesson->phase_label }}</a> ›@endif
    @if($lesson->series)<a href="{{ route('series', $lesson->series->slug) }}">{{ \Illuminate\Support\Str::limit($lesson->series->name, 30) }}</a> ›@endif
    <span>{{ \Illuminate\Support\Str::limit($lesson->title, 40) }}</span>
</nav>

<div style="padding:8px 0 60px;">
    <h1 class="title">{{ $lesson->title }}</h1>
    <div class="meta-row">
        <span class="tag level">{{ $lesson->level_label }}</span>
        @if($lesson->series)<span class="tag series">{{ \Illuminate\Support\Str::limit($lesson->series->name, 34) }}</span>@endif
        <span class="tag count">{{ $lesson->move_count }} nước đi</span>
        <span id="lesson-done-badge" class="tag" style="background:var(--jade-soft);color:var(--jade);{{ $completed ? '' : 'display:none;' }}">✓ Đã học</span>
    </div>

    @if($lesson->initial_fen || $lesson->steps->isNotEmpty())
        <x-chess-board
            :initial-fen="$lesson->initial_fen"
            :steps="$lesson->steps"
            :show-list="$lesson->steps->isNotEmpty()"
            :caption="$lesson->game_mode === 'co-up' && $lesson->steps->isEmpty() ? 'Thế mở cờ úp: 30 quân úp sấp mặt (chưa lộ binh chủng), hai Tướng để ngửa. Quân úp đi theo binh chủng của ô xuất phát cho tới khi lật. Bấm ⛶ để phóng to.' : null" />
    @endif

    @if($lesson->content)
        <article class="prose">{!! $lesson->content !!}</article>
    @elseif($lesson->summary)
        <article class="prose"><p>{{ $lesson->summary }}</p></article>
    @else
        <div class="notice" style="margin-top:28px;max-width:720px;">Phần diễn giải chi tiết đang được biên soạn. Bạn vẫn có thể đi lại từng nước trên bàn cờ ở trên để theo dõi thế trận.</div>
    @endif

    <div style="margin-top:28px;max-width:720px;">
        <x-share-buttons :url="url()->current()" :title="$lesson->title" />
    </div>

    <nav style="display:flex;justify-content:space-between;gap:12px;margin-top:28px;flex-wrap:wrap;max-width:720px;">
        @if($prev)<a href="{{ route('lessons.show', $prev->slug) }}" class="btn">‹ {{ \Illuminate\Support\Str::limit($prev->title, 26) }}</a>@else<span></span>@endif
        @if($next)<a href="{{ route('lessons.show', $next->slug) }}" class="btn primary">{{ \Illuminate\Support\Str::limit($next->title, 26) }} ›</a>@endif
    </nav>

    @if($related->isNotEmpty())
    <section style="margin-top:40px;max-width:720px;">
        <h2 style="font-size:19px;font-weight:800;margin:0 0 12px;">Bài liên quan</h2>
        <div class="lesson-list">
            @foreach($related as $r)
                <a href="{{ route('lessons.show', $r->slug) }}" class="lesson-item card">
                    <span class="li-num">{{ str_pad($r->order_in_series ?? '•', 2, '0', STR_PAD_LEFT) }}</span>
                    <span>
                        <span class="li-title">{{ $r->title }}</span>
                        <span class="li-sub">{{ $r->move_count }} nước đi · {{ $r->level_label }}</span>
                    </span>
                    <span class="li-meta">→</span>
                </a>
            @endforeach
        </div>
    </section>
    @endif

    @include('lessons._comments')
</div>

@auth
@push('scripts')
<script>
// Theo dõi tiến độ học (chỉ user đăng nhập): đọc ≥5 phút + xem hết nước → đánh dấu đã học.
(function(){
    var lessonId = {{ $lesson->id }};
    var url = "{{ route('progress.store', $lesson->id) }}";
    var token = document.querySelector('meta[name=csrf-token]').content;
    var seconds = 0, viewedAll = {{ $lesson->steps->count() === 0 ? 'true' : 'false' }}, done = {{ $completed ? 'true' : 'false' }}, dirty = true;

    // Xem hết các nước → gửi NGAY (không đợi tick) để đánh dấu đã học liền, khỏi phải reload.
    document.addEventListener('xq:viewed-all-moves', function(){ viewedAll = true; dirty = true; send(); });

    setInterval(function(){ if(!document.hidden){ seconds += 10; dirty = true; send(); } }, 10000);

    function send(){
        if (done || !dirty) return;
        dirty = false;
        fetch(url, {
            method:'POST', keepalive: true,
            headers:{'Content-Type':'application/json','X-CSRF-TOKEN':token,'Accept':'application/json'},
            body: JSON.stringify({ read_seconds: seconds, viewed_all_moves: viewedAll })
        }).then(function(r){ return r.ok ? r.json() : null; }).then(function(d){
            if (d && d.completed) { done = true; showBadge(); }
        }).catch(function(){});
    }
    window.addEventListener('pagehide', send);
    document.addEventListener('visibilitychange', function(){ if(document.hidden) send(); });

    function showBadge(){
        var el = document.getElementById('lesson-done-badge');
        if (el) el.style.display = 'inline-flex';
    }
})();
</script>
@endpush
@endauth
@endsection
