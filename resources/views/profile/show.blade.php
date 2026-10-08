@extends('layouts.app')
@section('title', $user->name . ' — Kỳ thủ trên Học Cờ Tướng')
@section('description', $user->name . ' học cờ tướng trên Học Cờ Tướng: cấp ' . $level['level'] . ', ' . $stats['lessons'] . ' bài đã học, ' . $stats['puzzles'] . ' thế cờ đã giải.')
@section('robots', 'noindex, follow')

@php
    $medals = ['gold' => 'Vàng', 'silver' => 'Bạc', 'bronze' => 'Đồng', 'top10' => 'Top 10'];
    $firstName = \Illuminate\Support\Str::of($user->name)->explode(' ')->last();
@endphp

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('leaderboard') }}">Xếp hạng</a><x-icon name="chev-right" />
    <span>Kỳ thủ</span>
</nav>

@if($self && ! $user->isPublic())
    <div class="alert mb-4"><x-icon name="lock" />Hồ sơ của bạn đang riêng tư (bạn chọn ẩn khỏi bảng xếp hạng) — chỉ mình bạn xem được trang này. <a href="{{ route('account.settings') }}" class="font-bold">Đổi trong Cài đặt</a>.</div>
@endif

<section class="card profile-head" data-profile>
    <x-avatar :name="$user->name" :src="$user->avatar" :frame="$user->avatar_frame" size="lg" />
    <div class="min-w-0">
        <h1 class="profile-head__name">{{ $user->name }}@if($_t = \App\Services\ShopService::titleText($user->shop_title))<span class="user-title">✦ {{ $_t }}</span>@endif</h1>
        <div class="flex flex-wrap items-center gap-2 mt-1">
            <span class="level-badge !min-w-0 !h-8 !text-[14px] !rounded-[10px]"><small>Lv</small>{{ $level['level'] }}</span>
            <span class="font-bold">{{ $level['title'] }}</span>
            <span class="text-ink-faint text-[13px]">· {{ number_format($user->xp_total, 0, ',', '.') }} XP · tham gia {{ $user->created_at->format('m/Y') }}</span>
        </div>
        <div class="flex flex-wrap gap-4 mt-3 text-[14px]">
            <span><b data-followers>{{ $followers }}</b> <span class="text-ink-soft">người theo dõi</span></span>
            <span><b>{{ $followingCount }}</b> <span class="text-ink-soft">đang theo dõi</span></span>
            @if($followsMe)<span class="tag tag--done">Đang theo dõi bạn</span>@endif
        </div>
    </div>
    <div class="flex gap-2 flex-wrap">
        @if($self)
            <a href="{{ route('friends') }}" class="btn btn--sm"><x-icon name="user" /> Bạn bè</a>
            <button type="button" class="btn btn--sm btn--primary" data-share-text="Kết bạn với mình trên Học Cờ Tướng — cùng học, giải thế cờ và thi đua bảng xếp hạng tuần!" data-share-url="{{ $user->profileUrl() }}"><x-icon name="share" /> Mời bạn bè</button>
        @elseif(auth()->check())
            <button type="button" class="btn btn--sm {{ $isFollowing ? '' : 'btn--primary' }}" data-follow="{{ route('profile.follow', basename(parse_url($user->profileUrl(), PHP_URL_PATH))) }}" data-following="{{ $isFollowing ? 1 : 0 }}">
                <x-icon :name="$isFollowing ? 'check' : 'user'" /> <span>{{ $isFollowing ? 'Đang theo dõi' : 'Theo dõi' }}</span>
            </button>
            <a href="{{ route('pvp.lobby') }}" class="btn btn--sm"><x-icon name="sword" /> Thách đấu</a>
        @else
            <a href="{{ route('login') }}" class="btn btn--sm btn--primary"><x-icon name="user" /> Đăng nhập để theo dõi</a>
        @endif
    </div>
</section>

<div class="stat-grid mt-4">
    <div class="card stat"><span class="stat__icon tone-flame"><x-icon name="flame" /></span><span><span class="stat__value">{{ $streak }}</span><span class="stat__label block">ngày liên tiếp · kỷ lục {{ $user->streak_best }}</span></span></div>
    <div class="card stat"><span class="stat__icon tone-jade"><x-icon name="book" /></span><span><span class="stat__value">{{ $stats['lessons'] }}</span><span class="stat__label block">bài đã học</span></span></div>
    <div class="card stat"><span class="stat__icon tone-primary"><x-icon name="puzzle" /></span><span><span class="stat__value">{{ $stats['puzzles'] }}</span><span class="stat__label block">thế cờ đã giải · điểm {{ $user->puzzle_rating }}</span></span></div>
    <div class="card stat"><span class="stat__icon tone-gold"><x-icon name="sword" /></span><span><span class="stat__value">{{ $stats['wins'] }}<span class="text-[14px] text-ink-faint">/{{ $stats['games'] }}</span></span><span class="stat__label block">ván thắng / đã chơi</span></span></div>
</div>

<div class="profile-grid mt-4">
    <div class="grid gap-4 content-start min-w-0">
        <section class="card card--pad">
            <div class="flex items-center justify-between gap-2 mb-3">
                <h2 class="text-lg font-extrabold m-0">Huy hiệu</h2>
                <span class="text-[13px] text-ink-faint">{{ $badges->count() }}/{{ $badgeTotal }}</span>
            </div>
            @if($badges->isEmpty())
                <p class="text-[14px] text-ink-soft m-0">{{ $self ? 'Bạn' : $firstName }} chưa mở huy hiệu nào.</p>
            @else
                <div class="ach-grid">
                    @foreach($badges as $a)
                        <div class="ach" title="{{ $a['desc'] }} · {{ $a['at']?->format('d/m/Y') }}">
                            <span class="ach__icon">@if(preg_match('/^\p{Han}$/u', $a['icon']))<span class="font-piece">{{ $a['icon'] }}</span>@else<x-icon :name="$a['icon']" />@endif</span>
                            <span class="ach__name">{{ $a['name'] }}</span>
                            <span class="ach__desc">{{ $a['desc'] }}</span>
                        </div>
                    @endforeach
                </div>
            @endif
        </section>

        @if($shared->isNotEmpty())
            <section class="card overflow-hidden">
                <div class="side-head"><span>Ván cờ được chia sẻ</span></div>
                <div class="lesson-list">
                    @foreach($shared as $g)
                        <a href="{{ route('history.public', $g->share_token) }}" class="lesson-item">
                            <span class="li-num hist-res hist-res--{{ $g->result }}"><x-icon :name="['win' => 'trophy', 'loss' => 'x-circle', 'draw' => 'repeat'][$g->result] ?? 'sword'" /></span>
                            <span><span class="li-title">{{ $g->isCoup() ? 'Cờ úp' : 'Cờ tướng' }} · {{ \App\Models\GameRecord::RESULTS[$g->result] }} {{ $g->mode === 'bot' ? $g->opponent : 'ván đấu bạn' }}</span>
                                <span class="li-sub">{{ $g->created_at->format('d/m/Y') }} · {{ (int) ceil($g->plies / 2) }} nước{{ ($acc = $g->accuracy()) !== null ? ' · chính xác ' . $acc . '%' : '' }}</span></span>
                            <span class="li-meta"><x-icon name="chev-right" /></span>
                        </a>
                    @endforeach
                </div>
            </section>
        @endif
    </div>

    <div class="grid gap-4 content-start">
        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-3 flex items-center gap-2"><x-icon name="trophy" class="w-5 h-5 text-gold-ink" /> Tủ cúp tuần</h2>
            <div class="grid grid-cols-5 gap-2 text-center">
                @foreach($medals + ['chests' => 'Rương'] as $k => $label)
                    <div class="wk-trophy {{ $trophies[$k] ? '' : 'is-empty' }}">
                        <span class="wk-medal wk-medal--{{ $k === 'chests' ? 'chest' : $k }}"><x-icon :name="$k === 'chests' ? 'gift' : ($k === 'top10' ? 'medal' : 'trophy')" /></span>
                        <b>{{ $trophies[$k] }}</b><small>{{ $label }}</small>
                    </div>
                @endforeach
            </div>
            @if($weekRank)
                <p class="text-[13.5px] text-ink-soft mt-3 mb-0">Tuần này: <b class="text-ink">hạng {{ $weekRank['rank'] }}</b> · {{ number_format($weekRank['score'], 0, ',', '.') }} XP. <a href="{{ route('weekly') }}" class="font-bold">Thử thách tuần</a></p>
            @endif
        </section>
        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-3">Kỷ lục</h2>
            <ul class="grid gap-2 m-0 p-0 list-none text-[14px]">
                <li class="flex justify-between"><span class="text-ink-soft">Thử thách 60 giây</span><b>{{ $user->rush_best }} điểm</b></li>
                <li class="flex justify-between"><span class="text-ink-soft">3 mạng liên tiếp</span><b>{{ $user->survival_best }} thế</b></li>
                <li class="flex justify-between"><span class="text-ink-soft">Chuỗi ngày dài nhất</span><b>{{ $user->streak_best }} ngày</b></li>
            </ul>
        </section>
    </div>
</div>
@endsection
