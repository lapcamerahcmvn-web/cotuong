@extends('layouts.app')

@section('title', ($page?->seo_title ?: $meta['title']) . ($lessons->currentPage() > 1 ? ' — Trang '.$lessons->currentPage() : ''))
@section('description', $page?->seo_description ?: $meta['desc'])
@section('og_image', \App\Support\Seo::ogImage($phase))

@push('head')
@php
    $_url = url()->current();
    $_crumbs = [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Trang chủ', 'item' => route('home')],
        ['@type' => 'ListItem', 'position' => 2, 'name' => $meta['h1']],
    ];

    // Danh sách bài (ItemList) — gộp bài của trang hiện tại, đủ để Google hiểu đây là trang tuyển tập.
    $_items = $lessons->map(fn ($l, $i) => [
        '@type'    => 'ListItem',
        'position' => $lessons->firstItem() + $i,
        'url'      => route('lessons.show', $l->slug),
        'name'     => $l->title,
    ])->all();

    $_ld = [
        [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => $_crumbs,
        ],
        [
            '@context' => 'https://schema.org',
            '@type' => 'CollectionPage',
            'name' => $meta['h1'],
            'description' => $page?->lede ?: $meta['desc'],
            'url' => $_url,
            'inLanguage' => 'vi-VN',
            'isPartOf' => ['@id' => url('/#website')],
            'about' => $meta['about'],
        ],
    ];
    if ($_items) {
        $_ld[] = [
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'name' => 'Bài học ' . mb_strtolower($meta['h1']),
            'numberOfItems' => count($_items),
            'itemListElement' => $_items,
        ];
    }
    if ($page && !empty($page->faq)) {
        $_ld[] = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => collect($page->faq)->map(fn ($f) => [
                '@type' => 'Question', 'name' => $f['q'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f['a']],
            ])->all(),
        ];
    }
@endphp
@foreach($_ld as $_block)
{!! \App\Support\Seo::ld($_block) !!}
@endforeach
@if($lessons->currentPage() > 1)
<link rel="prev" href="{{ $lessons->previousPageUrl() }}">
@endif
@if($lessons->hasMorePages())
<link rel="next" href="{{ $lessons->nextPageUrl() }}">
@endif
@endpush

@section('content')
@php
    $glyphs = ['nhap-mon' => '兵', 'khai-cuoc' => '車', 'trung-cuoc' => '炮', 'tan-cuoc' => '將', 'co-up' => '卒'];
    $hasFilter = $filters['level'] || $filters['length'] || $filters['done'];
@endphp
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>{{ $meta['label'] }}</span>
</nav>

<section class="flex gap-4 items-start mb-2">
    <span class="course__glyph hidden sm:grid">{{ $glyphs[$phase] ?? '棋' }}</span>
    <div class="min-w-0">
        <h1 class="page-title">{{ $page?->h1 ?: $meta['h1'] }}</h1>
        <p class="page-lede">{{ $page?->lede ?: $meta['desc'] }}</p>
        <div class="flex flex-wrap gap-2 mt-4">
            <a href="{{ route('path') }}#chang-{{ $phase }}" class="btn btn--sm"><x-icon name="map" /> Xem trên lộ trình</a>
            @if(in_array($phase, ['trung-cuoc', 'tan-cuoc']))
                <a href="{{ route('practice.hub') }}" class="btn btn--sm btn--soft"><x-icon name="puzzle" /> Luyện thế cờ</a>
            @endif
        </div>
    </div>
</section>

@if($seriesList->where('published_lessons_count', '>', 0)->isNotEmpty())
<section class="section pb-0">
    <div class="section-head"><div><h2>Chương trình</h2><p>Học theo chuỗi bài có thứ tự — dễ theo dõi tiến độ.</p></div></div>
    <div class="lesson-list lesson-list--grid">
        @foreach($seriesList as $s)
            @if($s->published_lessons_count > 0)
            <a href="{{ route('series', $s->slug) }}" class="card series-card">
                <span class="li-thumb"><img src="{{ \App\Support\Seo::ogThumb($s) }}" alt="{{ $s->name }} - Học Cờ Tướng" loading="lazy" width="64" height="64"></span>
                <span class="min-w-0">
                    <span class="series-card__name block">{{ $s->name }}</span>
                    <span class="series-card__meta block">{{ $s->published_lessons_count }} bài</span>
                    <x-series-progress :series="$s" />
                </span>
            </a>
            @endif
        @endforeach
    </div>
</section>
@endif

<section class="section">
    <div class="section-head"><div><h2>Tất cả bài học</h2><p>{{ $lessons->total() }} bài{{ $hasFilter ? ' khớp bộ lọc' : '' }}</p></div></div>

    @if($showFilters)
        <div class="chips mb-4" role="group" aria-label="Lọc bài học">
            @foreach(\App\Models\Lesson::LEVELS as $key => $label)
                <a href="{{ request()->fullUrlWithQuery(['level' => $filters['level'] === $key ? null : $key, 'page' => null]) }}"
                   class="chip {{ $filters['level'] === $key ? 'is-on' : '' }}" rel="nofollow">{{ $label }}</a>
            @endforeach
            <span class="chips__sep"></span>
            @foreach(\App\Http\Controllers\LessonController::LENGTH_FILTERS as $key => $range)
                <a href="{{ request()->fullUrlWithQuery(['length' => $filters['length'] === $key ? null : $key, 'page' => null]) }}"
                   class="chip {{ $filters['length'] === $key ? 'is-on' : '' }}" rel="nofollow">{{ $range['label'] }}</a>
            @endforeach
            @auth
                <span class="chips__sep"></span>
                <a href="{{ request()->fullUrlWithQuery(['done' => $filters['done'] === '1' ? null : '1', 'page' => null]) }}"
                   class="chip {{ $filters['done'] === '1' ? 'is-on' : '' }}" rel="nofollow"><x-icon name="check" /> Đã học</a>
                <a href="{{ request()->fullUrlWithQuery(['done' => $filters['done'] === '0' ? null : '0', 'page' => null]) }}"
                   class="chip {{ $filters['done'] === '0' ? 'is-on' : '' }}" rel="nofollow">Chưa học</a>
            @endauth
            @if($hasFilter)
                <a href="{{ url()->current() }}" class="chip chip--clear"><x-icon name="x" /> Xoá lọc</a>
            @endif
        </div>
    @endif

    @if($lessons->count())
        <div class="lesson-list lesson-list--grid">
            @foreach($lessons as $i => $lesson)
                @php $isDone = in_array($lesson->id, $completedIds); @endphp
                <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card has-thumb{{ $isDone ? ' is-done' : '' }}">
                    <span class="li-thumb">
                        <img src="{{ \App\Support\Seo::ogThumb($lesson) }}" alt="{{ $lesson->title }} - Học Cờ Tướng" loading="lazy" width="56" height="56">
                        @if($isDone)<span class="li-check" title="Đã học"><x-icon name="check" /></span>
                        @else<span class="li-rank">{{ str_pad($lessons->firstItem() + $i, 2, '0', STR_PAD_LEFT) }}</span>@endif
                    </span>
                    <span>
                        <span class="li-title">{{ $lesson->title }}</span>
                        <span class="li-sub">{{ $lesson->move_count_label }} · {{ $lesson->level_label }}@if($isDone) · <span class="text-jade-ink font-semibold">đã học</span>@endif</span>
                    </span>
                    <span class="li-meta"><span class="tag tag--level-{{ $lesson->level }}">{{ $lesson->level_label }}</span></span>
                </a>
            @endforeach
        </div>
        {{ $lessons->links() }}
    @elseif($hasFilter)
        <div class="notice">Không có bài nào khớp bộ lọc hiện tại. <a href="{{ url()->current() }}">Xoá lọc</a> để xem tất cả.</div>
    @else
        <div class="notice">Chưa có bài học nào được xuất bản cho mục này. Nội dung đang được biên soạn — quay lại sau nhé.</div>
    @endif
</section>

@if($page && $page->body_html)
<section class="section pt-0">
    <div class="prose phase-intro">{!! $page->body_html !!}</div>
</section>
@endif

@if($page && !empty($page->faq))
<section class="section pt-0">
    <div class="section-head"><div><h2>Câu hỏi thường gặp</h2></div></div>
    <div class="faq-list">
        @foreach($page->faq as $f)
            <details class="faq-item card">
                <summary>{{ $f['q'] }}</summary>
                <div class="faq-answer">{{ $f['a'] }}</div>
            </details>
        @endforeach
    </div>
</section>
@endif
@endsection
