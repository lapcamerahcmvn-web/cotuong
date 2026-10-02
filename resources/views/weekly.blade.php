@extends('layouts.app')
@section('title', 'Thử Thách & Giải Thưởng Tuần — Học Cờ Tướng')
@section('description', 'Mỗi tuần 4 thử thách học, luyện, chơi cờ tướng mới — hoàn thành để nhận XP và mở rương. Top 10 bảng xếp hạng XP tuần nhận cúp vàng, bạc, đồng.')
@section('robots', 'noindex, follow')

@php
    $prizes = config('weekly.prizes');
    $medalOf = fn (int $rank) => $rank <= 3 ? $prizes[$rank]['medal'] : 'top10';
    $me = auth()->user();
@endphp

@section('content')
<div class="text-center mb-6">
    <div class="eyebrow justify-center"><x-icon name="trophy" /> Thi đua hằng tuần</div>
    <h1 class="page-title mt-1">Thử thách &amp; giải thưởng tuần</h1>
    <p class="page-lede mx-auto">Tuần mới bắt đầu 0h thứ Hai. Hoàn thành thử thách để nhận XP, lọt Top 10 bảng XP tuần để nhận cúp.
        Còn <b data-weekly-countdown="{{ $secondsLeft }}" data-weekly></b> là chốt tuần.</p>
</div>

<div class="practice">
    <div class="grid gap-4 content-start min-w-0">
        @if($progress)
            @include('partials.weekly-card', ['progress' => $progress])
        @else
            <section class="card wk-card">
                <div class="wk-card__head"><b>Thử thách tuần này</b></div>
                <div class="wk-list">
                    @foreach($quests as $q)
                        <div class="wk-quest">
                            <span class="stat__icon tone-gold !w-10 !h-10"><x-icon :name="$q['icon']" /></span>
                            <span class="flex-1 min-w-0"><span class="wk-quest__title">{{ $q['title'] }}</span><span class="block text-[12.5px] text-ink-soft">{{ $q['desc'] }}</span></span>
                            <span class="tag tag--xp">+{{ $q['xp'] }} XP</span>
                        </div>
                    @endforeach
                </div>
                <div class="p-4 text-center"><a href="{{ route('login') }}" class="btn btn--primary">Đăng nhập để nhận thử thách</a></div>
            </section>
        @endif

        @if($podium)
            <section class="card card--pad">
                <h2 class="text-lg font-extrabold mb-4 flex items-center gap-2"><x-icon name="medal" class="w-5 h-5 text-gold-ink" /> Vinh danh tuần trước</h2>
                <div class="wk-podium">
                    @foreach([2, 1, 3] as $rank)
                        @php $p = collect($podium)->firstWhere('rank', $rank); @endphp
                        <div class="wk-podium__col wk-podium__col--{{ $rank }}">
                            @if($p)
                                <span class="avatar avatar--lg">@if($p['avatar'])<img src="{{ $p['avatar'] }}" alt="" referrerpolicy="no-referrer" loading="lazy">@else{{ mb_strtoupper(mb_substr($p['name'] ?? '?', 0, 1)) }}@endif</span>
                                <b class="wk-podium__name">{{ $p['name'] }}</b>
                                <small>{{ number_format($p['score'], 0, ',', '.') }} XP</small>
                            @endif
                            <span class="wk-podium__step"><span class="wk-medal wk-medal--{{ $medalOf($rank) }}"><x-icon name="trophy" /></span>{{ $rank }}</span>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif

        @if($trophies)
            <section class="card card--pad">
                <h2 class="text-lg font-extrabold mb-3 flex items-center gap-2"><x-icon name="trophy" class="w-5 h-5 text-gold-ink" /> Tủ cúp của tôi</h2>
                <div class="grid grid-cols-5 gap-2 text-center">
                    @foreach(['gold' => 'Vàng', 'silver' => 'Bạc', 'bronze' => 'Đồng', 'top10' => 'Top 10', 'chests' => 'Rương'] as $k => $label)
                        <div class="wk-trophy {{ $trophies[$k] ? '' : 'is-empty' }}">
                            <span class="wk-medal wk-medal--{{ $k === 'chests' ? 'chest' : $k }}"><x-icon :name="$k === 'chests' ? 'gift' : ($k === 'top10' ? 'medal' : 'trophy')" /></span>
                            <b>{{ $trophies[$k] }}</b><small>{{ $label }}</small>
                        </div>
                    @endforeach
                </div>
                @if($trophies['recent'])
                    <ul class="mt-3 grid gap-1 text-[13.5px] text-ink-soft">
                        @foreach($trophies['recent'] as $a)
                            <li>Tuần {{ $a->week_start->format('d/m') }}–{{ $a->week_start->addDays(6)->format('d/m/Y') }}: <b class="text-ink">hạng {{ $a->rank }}</b> · {{ number_format($a->score, 0, ',', '.') }} XP · +{{ $a->xp }} XP thưởng</li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-[13.5px] text-ink-soft mt-3 mb-0">Chưa có cúp nào — lọt Top 10 bảng XP tuần để nhận cúp đầu tiên.</p>
                @endif
            </section>
        @endif
    </div>

    <div class="grid gap-4 content-start">
        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-3 flex items-center gap-2"><x-icon name="gift" class="w-5 h-5 text-primary" /> Giải thưởng tuần</h2>
            <div class="grid gap-2">
                @foreach($prizes as $rank => $p)
                    <div class="wk-prize">
                        <span class="wk-medal wk-medal--{{ $p['medal'] }}"><x-icon :name="$p['medal'] === 'top10' ? 'medal' : 'trophy'" /></span>
                        <span class="flex-1 min-w-0"><b class="block text-[14px]">{{ $rank === 10 ? 'Hạng 4 – 10' : 'Hạng ' . $rank }} · {{ $p['name'] }}</b>
                            <small class="text-ink-soft">+{{ $p['xp'] }} XP{{ $p['freezes'] ? ' · +' . $p['freezes'] . ' thẻ giữ chuỗi' : '' }}</small></span>
                    </div>
                @endforeach
            </div>
            <p class="text-[12.5px] text-ink-faint mt-3 mb-0">Xét giải theo XP kiếm được trong tuần (tối thiểu {{ config('weekly.prize_min_xp') }} XP). XP thưởng từ thử thách và giải không tính vào bảng tuần. Người chọn ẩn khỏi bảng xếp hạng không được xét giải.</p>
        </section>

        <section class="card overflow-hidden">
            <div class="side-head"><span>Bảng XP tuần này</span><a href="{{ route('leaderboard') }}" class="text-[13px]">Xem đầy đủ</a></div>
            @forelse($top as $i => $r)
                <div class="lb-row {{ $me && $r['user_id'] === $me->id ? 'is-me' : '' }}">
                    <span class="lb-rank lb-rank--{{ $i + 1 }}">{{ $i + 1 }}</span>
                    <span class="avatar">@if($r['avatar'])<img src="{{ $r['avatar'] }}" alt="" referrerpolicy="no-referrer" loading="lazy">@else{{ mb_strtoupper(mb_substr($r['name'], 0, 1)) }}@endif</span>
                    <span class="lb-name">{{ $r['name'] }}<small>{{ $i < 3 ? $prizes[$i + 1]['name'] : 'Top 10' }} nếu giữ hạng</small></span>
                    <span class="lb-score">{{ number_format($r['score'], 0, ',', '.') }}</span>
                </div>
            @empty
                <div class="empty"><div class="empty__glyph">帥</div><h3>Tuần mới chưa ai ghi điểm</h3><p>Học một bài hoặc giải một thế cờ để lên bảng đầu tiên.</p></div>
            @endforelse
            @if($me && $mine && $mine['rank'] > 10)
                <div class="lb-row is-me border-t-2 border-line"><span class="lb-rank">{{ $mine['rank'] }}</span><span class="avatar">{{ mb_strtoupper(mb_substr($me->name, 0, 1)) }}</span>
                    <span class="lb-name">Bạn<small>Còn cách Top 10 — cố lên!</small></span><span class="lb-score">{{ number_format($mine['score'], 0, ',', '.') }}</span></div>
            @endif
        </section>
    </div>
</div>
@endsection
