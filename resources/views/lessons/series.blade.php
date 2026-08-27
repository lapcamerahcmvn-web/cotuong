@extends('layouts.app')

@section('title', $series->name . ' — Học Cờ Tướng')
@section('description', \Illuminate\Support\Str::limit(strip_tags($series->description ?: ('Chương trình ' . $series->name . ' — học cờ tướng qua bàn cờ tương tác, diễn giải từng nước.')), 155))

@push('head')
@php
    $ld = [
        '@context' => 'https://schema.org',
        '@type' => 'Course',
        'name' => $series->name,
        'description' => strip_tags($series->description ?: ('Chương trình ' . $series->name)),
        'provider' => ['@type' => 'Organization', 'name' => 'Học Cờ Tướng'],
        'inLanguage' => 'vi-VN',
    ];
@endphp
<script type="application/ld+json">{!! json_encode($ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@endpush

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> ›
    @if($series->phase)<a href="{{ route('phase', $series->phase) }}">{{ \App\Models\Lesson::PHASES[$series->phase] ?? '' }}</a> ›@endif
    <span>{{ $series->name }}</span>
</nav>

<section class="section" style="padding-top:12px;">
    <h1 style="font-size:clamp(24px,4vw,34px);font-weight:800;margin:0 0 8px;">{{ $series->name }}</h1>
    @if($series->description)<p class="sub" style="max-width:44em;">{{ $series->description }}</p>@endif
    <p class="muted" style="font-size:14px;">{{ $lessons->count() }} bài học @if($series->planned_total) / {{ $series->planned_total }} dự kiến @endif
        @auth
            @php $doneN = count($completedIds ?? []); $tot = $lessons->count(); @endphp
            <span class="series-prog {{ $doneN >= $tot ? 'is-done' : '' }}" style="margin-left:8px;">{{ $doneN >= $tot ? '✓ Đã hoàn thành' : 'Hoàn thành '.$doneN.'/'.$tot }}</span>
        @endauth
    </p>

    <div class="lesson-list" style="margin-top:20px;">
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
