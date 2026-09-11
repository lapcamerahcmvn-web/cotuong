@extends('layouts.app')

@section('title', \Illuminate\Support\Str::limit($series->name, 55, '') . ' — Học Cờ Tướng')
@section('description', \Illuminate\Support\Str::limit(strip_tags($series->description ?: ('Chương trình ' . $series->name . ' — học cờ tướng qua bàn cờ tương tác, diễn giải từng nước.')), 155))
@section('og_image', \App\Support\Seo::ogImage($series))

@push('head')
@php
    $_url = url()->current();
    $_desc = strip_tags($series->description ?: ('Chương trình ' . $series->name . ' — học cờ tướng qua bàn cờ tương tác, diễn giải từng nước.'));
    $_workload = 'PT' . max(1, (int) ceil($lessons->count() / 4)) . 'H';

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

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> ›
    @if($series->phase)<a href="{{ route('phase', $series->phase) }}">{{ \App\Models\Lesson::PHASES[$series->phase] ?? '' }}</a> ›@endif
    <span>{{ $series->name }}</span>
</nav>

<section class="section page-head">
    <h1>{{ $series->name }}</h1>
    @if($series->description)<p class="sub">{{ $series->description }}</p>@endif
    <p class="muted mt-3" style="font-size:14px;">{{ $lessons->count() }} bài học @if($series->planned_total) / {{ $series->planned_total }} dự kiến @endif
        @auth
            @php $doneN = count($completedIds ?? []); $tot = $lessons->count(); @endphp
            <span class="series-prog {{ $doneN >= $tot ? 'is-done' : '' }}" style="margin-left:8px;">{{ $doneN >= $tot ? '✓ Đã hoàn thành' : 'Hoàn thành '.$doneN.'/'.$tot }}</span>
        @endauth
    </p>

    <div class="lesson-list mt-5">
        @foreach($lessons as $lesson)
            @php $isDone = in_array($lesson->id, $completedIds ?? []); @endphp
            <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card{{ $isDone ? ' is-done' : '' }}">
                @if($isDone)
                    <span class="li-num" style="color:var(--jade);" title="Đã học">✓</span>
                @else
                    <span class="li-num">{{ str_pad($lesson->order_in_series ?? $loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
                @endif
                <span>
                    <span class="li-title">{{ $lesson->title }}</span>
                    <span class="li-sub">{{ $lesson->move_count }} nước đi · {{ $lesson->level_label }}@if($isDone) · <span style="color:var(--jade);">đã học</span>@endif</span>
                </span>
                <span class="li-meta">→</span>
            </a>
        @endforeach
    </div>
</section>
@endsection
