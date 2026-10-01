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
@php
    $doneIds = $completedIds ?? [];
    $tot = $lessons->count();
    $doneN = count($doneIds);
    $nextUp = $lessons->first(fn ($l) => ! in_array($l->id, $doneIds));
    $pct = $tot ? (int) round(100 * $doneN / $tot) : 0;
@endphp
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    @if($series->phase)<a href="{{ route('phase', $series->phase) }}">{{ \App\Models\Lesson::PHASES[$series->phase] ?? '' }}</a><x-icon name="chev-right" />@endif
    <span>{{ $series->name }}</span>
</nav>

<section class="card card--pad card--hero grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
    <div class="min-w-0">
        <div class="eyebrow"><x-icon name="layers" /> Chương trình · {{ $tot }} bài @if($series->planned_total) / {{ $series->planned_total }} dự kiến @endif</div>
        <h1 class="page-title mt-1">{{ $series->name }}</h1>
        @if($series->description)<p class="page-lede">{{ $series->description }}</p>@endif
        @if($nextUp)
            <a href="{{ route('lessons.show', $nextUp->slug) }}" class="btn btn--primary btn--lg mt-4">
                <x-icon name="play" /> {{ $doneN ? 'Học tiếp' : 'Bắt đầu' }}: bài {{ $lessons->search(fn ($l) => $l->id === $nextUp->id) + 1 }}
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

<section class="section">
    <div class="lesson-list">
        @foreach($lessons as $lesson)
            @php $isDone = in_array($lesson->id, $doneIds); $isNext = $nextUp && $nextUp->id === $lesson->id; @endphp
            <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card {{ $isDone ? 'is-done' : '' }} {{ $isNext ? '!border-primary' : '' }}">
                <span class="node {{ $isDone ? 'is-done' : ($isNext ? 'is-next' : '') }} !w-10 !h-10 !text-[13px] !animate-none">
                    @if($isDone)<x-icon name="check" />@else{{ $loop->iteration }}@endif
                </span>
                <span>
                    <span class="li-title">{{ $lesson->title }}</span>
                    <span class="li-sub">{{ $lesson->move_count_label }} · {{ $lesson->level_label }}@if($isNext) · <span class="text-primary-ink font-bold">học tiếp</span>@endif</span>
                </span>
                <span class="li-meta"><x-icon name="chev-right" /></span>
            </a>
        @endforeach
    </div>
</section>
@endsection
