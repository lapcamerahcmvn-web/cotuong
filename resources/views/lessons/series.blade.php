@extends('layouts.app')

@section('title', \Illuminate\Support\Str::limit($series->name, 55, '') . ' — Học Cờ Tướng')
@section('description', \Illuminate\Support\Str::limit(strip_tags($series->description ?: ('Chương trình ' . $series->name . ' — học cờ tướng qua bàn cờ tương tác, diễn giải từng nước.')), 155))
@section('og_image', \App\Support\Seo::ogImage($series))

@push('head')
@php
    $_url = url()->current();
    $_desc = strip_tags($series->description ?: ('Chương trình ' . $series->name . ' — học cờ tướng qua bàn cờ tương tác, diễn giải từng nước.'));
    $_workload = 'PT' . max(1, (int) ceil($total / 4)) . 'H';

    $_crumbs = [['@type' => 'ListItem', 'position' => 1, 'name' => 'Trang chủ', 'item' => route('home')]];
    if ($series->phase && isset(\App\Models\Lesson::PHASES[$series->phase])) {
        $_crumbs[] = ['@type' => 'ListItem', 'position' => 2, 'name' => \App\Models\Lesson::PHASES[$series->phase], 'item' => route('phase', $series->phase)];
    }
    $_crumbs[] = ['@type' => 'ListItem', 'position' => count($_crumbs) + 1, 'name' => $series->name];

    $_course = array_filter([
        '@context' => 'https://schema.org',
        '@type' => 'Course',
        'name' => $series->name,
        'description' => $_desc,
        'url' => $_url,
        'inLanguage' => 'vi-VN',
        'image' => \App\Support\Seo::ogImage($series),
        'educationalLevel' => 'Beginner',
        'isAccessibleForFree' => true,
        'provider' => [
            '@type' => 'Organization',
            'name' => 'Học Cờ Tướng',
            'url' => url('/'),
            'logo' => asset('icon-512.png'),
        ],
        'offers' => [
            '@type' => 'Offer',
            'category' => 'Free',
            'price' => '0',
            'priceCurrency' => 'VND',
            'availability' => 'https://schema.org/InStock',
        ],
        'hasCourseInstance' => [
            '@type' => 'CourseInstance',
            'courseMode' => 'online',
            'courseWorkload' => $_workload,
            'inLanguage' => 'vi-VN',
        ],
        // Chỉ bài của trang đang xem — chuyên đề 1.000+ bài từng làm JSON-LD nặng hàng trăm KB.
        'hasPart' => $lessons->map(fn ($l) => [
            '@type' => 'Course',
            'name' => $l->title,
            'url' => route('lessons.show', $l->slug),
        ])->all(),
    ]);

    $_ld = [
        ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $_crumbs],
        $_course,
    ];
@endphp
@foreach($_ld as $_block)
{!! \App\Support\Seo::ld($_block) !!}
@endforeach
@endpush

@if($page > 1)@section('robots', 'index, follow')@endif
@push('head')
@if($page > 1)<link rel="prev" href="{{ route('series', $series->slug) . ($page > 2 ? '?page=' . ($page - 1) : '') }}">@endif
@if($page < $pages)<link rel="next" href="{{ route('series', $series->slug) }}?page={{ $page + 1 }}">@endif
@endpush

@section('content')
@php
    $doneIds = array_flip($completedIds ?? []);
    $tot = $total;
    $doneN = $doneCount;
    $pct = $tot ? (int) round(100 * $doneN / $tot) : 0;
    $pageUrl = fn ($n) => route('series', $series->slug) . ($n > 1 ? '?page=' . $n : '');
@endphp
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    @if($series->phase)<a href="{{ route('phase', $series->phase) }}">{{ \App\Models\Lesson::PHASES[$series->phase] ?? '' }}</a><x-icon name="chev-right" />@endif
    <span>{{ $series->name }}</span>
</nav>

<section class="card card--pad card--hero grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
    <div class="min-w-0">
        <div class="eyebrow"><x-icon name="layers" /> Chương trình · {{ $tot }} bài @if($series->planned_total && $series->planned_total != $tot) / {{ $series->planned_total }} dự kiến @endif</div>
        <h1 class="page-title mt-1">{{ $series->name }}</h1>
        @if($series->description)<p class="page-lede">{{ $series->description }}</p>@endif
        @if($nextUp)
            <a href="{{ route('lessons.show', $nextUp->slug) }}" class="btn btn--primary btn--lg mt-4">
                <x-icon name="play" /> {{ $doneN ? 'Học tiếp' : 'Bắt đầu' }}: bài {{ $nextIndex + 1 }}
            </a>
        @else
            <span class="tag tag--done mt-4"><x-icon name="check" /> Bạn đã hoàn thành chương trình này</span>
        @endif
    </div>
    @auth
        <div class="text-center">
            <span class="ring" style="--p: {{ $pct }}; --size: 96px; --w: 9px"><span class="!text-xl">{{ $pct }}%</span></span>
            <div class="text-[13px] font-bold text-ink-soft mt-2">{{ $doneN }}/{{ $tot }} bài đã học</div>
        </div>
    @endauth
</section>

@if($chapters)
<section class="section pb-0">
    <details class="card card--pad series-toc" @if(count($chapters) <= 16) open @endif>
        <summary class="font-bold cursor-pointer list-none flex items-center justify-between gap-2">
            <span><x-icon name="map" class="w-4 h-4 inline" /> Mục lục · {{ count($chapters) }} phần</span>
            <x-icon name="chev-down" class="w-5 h-5 text-ink-faint" />
        </summary>
        <div class="series-toc__chips">
            @foreach($chapters as $c)
                <a href="{{ $pageUrl($c['page']) }}#bai-{{ $c['index'] + 1 }}" class="chip {{ $c['page'] === $page ? 'is-on' : '' }}">{{ $c['name'] }} <small>{{ $c['count'] }}</small></a>
            @endforeach
        </div>
    </details>
</section>
@endif

<section class="section">
    @if($pages > 1)<p class="text-[13.5px] text-ink-soft font-semibold mb-3">Bài {{ $offset + 1 }}–<span data-series-end>{{ $offset + $lessons->count() }}</span> / {{ $tot }}</p>@endif
    <div class="lesson-list" data-series-list>
        @foreach($lessons as $i => $lesson)
            @php $n = $offset + $i + 1; $isDone = isset($doneIds[$lesson->id]); $isNext = $nextUp && $nextUp->id === $lesson->id; @endphp
            <a href="{{ route('lessons.show', $lesson->slug) }}" id="bai-{{ $n }}" class="lesson-item card {{ $isDone ? 'is-done' : '' }} {{ $isNext ? '!border-primary' : '' }}">
                <span class="node {{ $isDone ? 'is-done' : ($isNext ? 'is-next' : '') }} !w-10 !h-10 !text-[13px] !animate-none">
                    @if($isDone)<x-icon name="check" />@else{{ $n }}@endif
                </span>
                <span>
                    <span class="li-title">{{ $lesson->title }}</span>
                    <span class="li-sub">{{ $lesson->move_count_label }} · {{ $lesson->level_label }}@if($isNext) · <span class="text-primary-ink font-bold">học tiếp</span>@endif</span>
                </span>
                <span class="li-meta"><x-icon name="chev-right" /></span>
            </a>
        @endforeach
    </div>

    @if($pages > 1)
        <div class="series-more" data-series-more>
            @if($page < $pages)
                <a href="{{ $pageUrl($page + 1) }}" class="btn btn--primary" data-series-next data-page="{{ $page + 1 }}" data-pages="{{ $pages }}">
                    <x-icon name="chev-down" /> Hiện thêm {{ min(\App\Http\Controllers\LessonController::SERIES_PER_PAGE, $tot - $offset - $lessons->count()) }} bài
                </a>
            @endif
            <nav class="pager" aria-label="Phân trang">
                @if($page > 1)<a href="{{ $pageUrl($page - 1) }}" class="btn btn--ghost btn--sm" rel="prev"><x-icon name="chev-left" /> Trước</a>@endif
                <form method="get" action="{{ route('series', $series->slug) }}" class="pager__jump">
                    <label>Trang
                        <select name="page" onchange="this.form.submit()" aria-label="Chọn trang">
                            @for($p = 1; $p <= $pages; $p++)<option value="{{ $p }}" @selected($p === $page)>{{ $p }}</option>@endfor
                        </select> / {{ $pages }}</label>
                    <noscript><button class="btn btn--sm">Đi</button></noscript>
                </form>
                @if($page < $pages)<a href="{{ $pageUrl($page + 1) }}" class="btn btn--ghost btn--sm" rel="next">Sau <x-icon name="chev-right" /></a>@endif
            </nav>
        </div>
    @endif
</section>
@endsection
