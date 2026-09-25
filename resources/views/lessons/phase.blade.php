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
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> › <span>{{ $meta['label'] }}</span>
</nav>

<section class="section page-head">
    <h1>{{ $page?->h1 ?: $meta['h1'] }}</h1>
    <p class="sub">{{ $page?->lede ?: $meta['desc'] }}</p>

    @if($page && $page->body_html)
        <div class="phase-intro">{!! $page->body_html !!}</div>
    @endif

    @if($seriesList->isNotEmpty())
        <h2 class="phase-sec-title">Chương trình</h2>
        <div class="lesson-list mt-3" style="margin-bottom:28px;">
            @foreach($seriesList as $s)
                @if($s->published_lessons_count > 0)
                <a href="{{ route('series', $s->slug) }}" class="lesson-item card has-thumb">
                    <span class="li-thumb">
                        <img src="{{ \App\Support\Seo::ogThumb($s) }}" alt="{{ $s->name }} - Học Cờ Tướng" loading="lazy">
                    </span>
                    <span class="li-body">
                        <span class="li-title">{{ $s->name }}</span>
                        <span class="li-sub">{{ $s->published_lessons_count }} bài</span>
                        <x-series-progress :series="$s" />
                    </span>
                    <span class="li-meta">→</span>
                </a>
                @endif
            @endforeach
        </div>
    @endif

    <h2 class="phase-sec-title">Tất cả bài học</h2>

    @if($showFilters)
        <div class="filter-bar">
            <span class="filter-label">Lọc:</span>
            @foreach(\App\Models\Lesson::LEVELS as $key => $label)
                <a href="{{ request()->fullUrlWithQuery(['level' => $filters['level'] === $key ? null : $key, 'page' => null]) }}"
                   class="tag-filter {{ $filters['level'] === $key ? 'on' : '' }}">{{ $label }}</a>
            @endforeach
            <span class="filter-sep"></span>
            @foreach(\App\Http\Controllers\LessonController::LENGTH_FILTERS as $key => $range)
                <a href="{{ request()->fullUrlWithQuery(['length' => $filters['length'] === $key ? null : $key, 'page' => null]) }}"
                   class="tag-filter {{ $filters['length'] === $key ? 'on' : '' }}">{{ $range['label'] }}</a>
            @endforeach
            @auth
                <span class="filter-sep"></span>
                <a href="{{ request()->fullUrlWithQuery(['done' => $filters['done'] === '1' ? null : '1', 'page' => null]) }}"
                   class="tag-filter {{ $filters['done'] === '1' ? 'on' : '' }}">✓ Đã học</a>
                <a href="{{ request()->fullUrlWithQuery(['done' => $filters['done'] === '0' ? null : '0', 'page' => null]) }}"
                   class="tag-filter {{ $filters['done'] === '0' ? 'on' : '' }}">Chưa học</a>
            @endauth
            @if($filters['level'] || $filters['length'] || $filters['done'])
                <a href="{{ url()->current() }}" class="tag-filter clear">✕ Xoá lọc</a>
            @endif
        </div>
    @endif

    @if($lessons->count())
        <div class="lesson-list">
            @foreach($lessons as $i => $lesson)
                @php $isDone = in_array($lesson->id, $completedIds); @endphp
                <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card has-thumb{{ $isDone ? ' is-done' : '' }}">
                    <span class="li-thumb">
                        <img src="{{ \App\Support\Seo::ogThumb($lesson) }}" alt="{{ $lesson->title }} - Học Cờ Tướng" loading="lazy">
                        @if($isDone)
                            <span class="li-rank" style="color:var(--jade);" title="Đã học">✓</span>
                        @else
                            <span class="li-rank">{{ str_pad($lessons->firstItem() + $i, 2, '0', STR_PAD_LEFT) }}</span>
                        @endif
                    </span>
                    <span>
                        <span class="li-title">{{ $lesson->title }}</span>
                        <span class="li-sub">{{ $lesson->move_count_label }} · {{ $lesson->level_label }}@if($isDone) · <span style="color:var(--jade);">đã học</span>@endif</span>
                    </span>
                    <span class="li-meta"><span class="tag count">{{ $lesson->move_count_badge }}</span></span>
                </a>
            @endforeach
        </div>
        <div class="mt-5">{{ $lessons->links() }}</div>
    @elseif($filters['level'] || $filters['length'] || $filters['done'])
        <div class="notice">Không có bài nào khớp bộ lọc hiện tại. <a href="{{ url()->current() }}">Xoá lọc</a> để xem tất cả.</div>
    @else
        <div class="notice">Chưa có bài học nào được xuất bản cho mục này. Nội dung đang được biên soạn — quay lại sau nhé.</div>
    @endif

    @if($page && !empty($page->faq))
        <h2 class="phase-sec-title">Câu hỏi thường gặp</h2>
        <div class="faq-list">
            @foreach($page->faq as $f)
                <details class="faq-item card">
                    <summary>{{ $f['q'] }}</summary>
                    <div class="faq-answer">{{ $f['a'] }}</div>
                </details>
            @endforeach
        </div>
    @endif
</section>
@endsection
