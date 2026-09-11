@extends('layouts.app')

@section('title', $page?->seo_title ?: $meta['title'])
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
                <a href="{{ route('series', $s->slug) }}" class="lesson-item card">
                    <span class="li-num">課</span>
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

    @if($lessons->count())
        <h2 class="phase-sec-title">Tất cả bài học</h2>
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
        <div class="mt-5">{{ $lessons->links() }}</div>
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
