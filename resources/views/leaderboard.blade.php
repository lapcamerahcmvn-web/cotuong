@extends('layouts.app')
@section('title', 'Bảng Xếp Hạng — Học Cờ Tướng')
@section('description', 'Bảng xếp hạng người học cờ tướng theo XP tuần/tháng, chuỗi ngày học và thử thách 60 giây.')
@section('robots', 'noindex, follow')

@section('content')
@php
    $boards = ['xp' => ['XP', 'star'], 'streak' => ['Chuỗi ngày', 'flame'], 'rush' => ['60 giây', 'zap']];
    $unit = match ($board) { 'streak' => 'ngày', 'rush' => 'điểm', default => 'XP' };
    $meInTop = $me && collect($rows)->contains('user_id', $me->id);
@endphp
<div class="max-w-3xl mx-auto">
    <div class="text-center mb-6">
        <div class="eyebrow justify-center"><x-icon name="trophy" /> Xếp hạng</div>
        <h1 class="page-title mt-1">Bảng xếp hạng</h1>
        <p class="page-lede mx-auto">Thi đua cho vui — cấp độ và điểm ở đây không phải đẳng cấp cờ chính thức.</p>
    </div>

    <a href="{{ route('weekly') }}" class="card card--hero card--pad flex items-center gap-3 mb-4 hover:no-underline">
        <span class="wk-medal wk-medal--gold"><x-icon name="trophy" /></span>
        <span class="flex-1 min-w-0 text-ink"><b class="block">Giải thưởng & thử thách tuần</b><span class="text-[13.5px] text-ink-soft">Top 10 bảng XP tuần nhận cúp + XP thưởng · 4 thử thách mới mỗi thứ Hai</span></span>
        <x-icon name="chev-right" class="w-5 h-5 text-ink-faint" />
    </a>

    <nav class="tabs mb-3" aria-label="Loại bảng xếp hạng">
        @foreach($boards as $k => [$label, $ic])
            <a href="{{ route('leaderboard', ['loai' => $k]) }}" class="tabs__item {{ $board === $k ? 'is-on' : '' }}"><x-icon :name="$ic" class="w-4 h-4" /> {{ $label }}</a>
        @endforeach
        <a href="{{ $me ? route('friends') : route('login') }}" class="tabs__item"><x-icon name="user" class="w-4 h-4" /> Bạn bè</a>
    </nav>
    @if($board === 'xp')
        <div class="chips mb-4 justify-center">
            @foreach(\App\Services\Gamification\LeaderboardService::PERIODS as $k => $label)
                <a href="{{ route('leaderboard', ['loai' => 'xp', 'ky' => $k]) }}" class="chip {{ $period === $k ? 'is-on' : '' }}">{{ $label }}</a>
            @endforeach
        </div>
    @endif

    <div class="card overflow-hidden">
        @forelse($rows as $i => $r)
            <div class="lb-row {{ $me && $r['user_id'] === $me->id ? 'is-me' : '' }}">
                <span class="lb-rank lb-rank--{{ $i + 1 }}">{{ $i + 1 }}</span>
                <x-avatar :name="$r['name']" :src="$r['avatar']" :frame="$r['frame'] ?? null" lazy />
                <a href="{{ \App\Models\User::profileUrlFor($r['user_id'], $r['name']) }}" class="lb-name text-ink hover:text-primary">{{ $r['name'] }}@if(!empty($r['title']))<span class="user-title">✦ {{ $r['title'] }}</span>@endif<small>Cấp {{ $r['level'] }} · {{ \App\Services\Gamification\LevelService::title($r['level']) }}</small></a>
                <span class="lb-score">{{ number_format($r['score'], 0, ',', '.') }} <span class="text-[12px] text-ink-faint font-semibold">{{ $unit }}</span></span>
            </div>
        @empty
            <div class="empty"><div class="empty__glyph">帥</div><h3>Chưa có ai trên bảng</h3><p>Hãy là người đầu tiên — học một bài hoặc giải một thế cờ.</p>
                <a href="{{ route('practice.hub') }}" class="btn btn--primary mt-2">Luyện tập ngay</a></div>
        @endforelse

        @if($me && $mine && !$meInTop)
            <div class="lb-row is-me border-t-2 border-line">
                <span class="lb-rank">{{ $mine['rank'] }}</span>
                <x-avatar :name="$me->name" :src="$me->avatar" :frame="$me->avatar_frame" />
                <span class="lb-name">Bạn<small>Cấp {{ $me->level }}</small></span>
                <span class="lb-score">{{ number_format($mine['score'], 0, ',', '.') }} <span class="text-[12px] text-ink-faint font-semibold">{{ $unit }}</span></span>
            </div>
        @endif
    </div>

    <p class="text-center text-[13.5px] text-ink-soft mt-4">
        @if(!$me)
            <a href="{{ route('login') }}" class="font-bold">Đăng nhập</a> để có tên trên bảng xếp hạng.
        @elseif($me->leaderboard_opt_out)
            Bạn đang ẩn khỏi bảng xếp hạng. <a href="{{ route('account.settings') }}" class="font-bold">Thay đổi trong Cài đặt</a>.
        @else
            Không muốn hiện tên? <a href="{{ route('account.settings') }}" class="font-bold">Ẩn khỏi bảng xếp hạng</a>.
        @endif
    </p>
</div>
@endsection
