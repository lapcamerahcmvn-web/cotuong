@extends('layouts.app')
@section('title', 'Thử thách ' . $title . ' — Luyện cờ tướng | Học Cờ Tướng')
@section('description', $lede)
@section('robots', 'noindex, follow')

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('practice.hub') }}">Luyện tập</a><x-icon name="chev-right" />
    <span>{{ $title }}</span>
</nav>

<div data-practice="session" data-mode="{{ $mode }}" class="max-w-3xl mx-auto">
    <div data-start class="card card--pad text-center py-10">
        <div class="mode-card__icon {{ $mode === 'rush' ? 'tone-gold' : 'tone-primary' }} mx-auto !w-16 !h-16"><x-icon :name="$mode === 'rush' ? 'zap' : 'heart'" class="!w-8 !h-8" /></div>
        <h1 class="page-title mt-4">{{ $title }}</h1>
        <p class="muted max-w-md mx-auto">{{ $lede }}</p>
        <ul class="text-left inline-grid gap-2 mt-4 text-[14.5px] text-ink-soft">
            @if($mode === 'rush')
                <li class="flex gap-2"><x-icon name="check" class="w-5 h-5 text-jade shrink-0" /> Thế cờ ngắn 1–3 nước, khó dần</li>
                <li class="flex gap-2"><x-icon name="check" class="w-5 h-5 text-jade shrink-0" /> Đi sai: hiện nước đúng, trừ 5 giây, sang thế mới</li>
            @else
                <li class="flex gap-2"><x-icon name="check" class="w-5 h-5 text-jade shrink-0" /> Không giới hạn thời gian — cứ suy nghĩ kỹ</li>
                <li class="flex gap-2"><x-icon name="check" class="w-5 h-5 text-jade shrink-0" /> Mỗi lần sai mất 1 mạng, hết 3 mạng là kết thúc</li>
            @endif
            <li class="flex gap-2"><x-icon name="check" class="w-5 h-5 text-jade shrink-0" /> Mỗi thế đúng +{{ config('gamification.xp.'.$mode.'_per') }} XP (tối đa {{ config('gamification.xp.'.$mode.'_cap') }} XP/lượt)</li>
        </ul>
        @if($best)<p class="mt-4 font-bold">Kỷ lục của bạn: {{ $best }}</p>@endif
        <button type="button" class="btn btn--primary btn--lg mt-6" data-go><x-icon name="play" /> Bắt đầu</button>
    </div>

    <div data-play hidden>
        <div class="practice-hud">
            <span class="practice-hud__item"><x-icon name="check-circle" class="text-jade" /> <span data-score>0</span></span>
            @if($mode === 'rush')
                <span class="practice-hud__item"><x-icon name="clock" /> <span data-timer>60s</span></span>
            @else
                <span class="lives" data-lives aria-label="Số mạng còn lại"></span>
            @endif
        </div>
        @if($mode === 'rush')
            <div class="timer-bar" data-timer-bar><div class="timer-bar__fill" style="width:100%"></div></div>
        @endif
        @include('partials.puzzle-board')
    </div>

    <div data-end hidden></div>
</div>
@endsection
