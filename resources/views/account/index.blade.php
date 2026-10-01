@extends('layouts.app')
@section('title', 'Hồ sơ của tôi — Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@section('content')
@php
    $lv = $snap['level'];
    $today = \App\Support\Vn::today();
    $start = \Carbon\CarbonImmutable::parse($activityFrom);
    $days = (int) $start->diffInDays(\Carbon\CarbonImmutable::parse($today)) + 1;
    $lvOf = fn ($xp) => $xp <= 0 ? 0 : ($xp < 20 ? 1 : ($xp < 50 ? 2 : ($xp < 100 ? 3 : 4)));
    $accuracy = $puzzleStats['total'] ? round(100 * $puzzleStats['ok'] / $puzzleStats['total']) : null;
    $unlocked = collect($achievements)->filter(fn ($a) => $a['unlocked_at'])->count();
    $dowLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
@endphp

@if(session('ok'))<div class="alert alert--ok mb-4"><x-icon name="check-circle" />{{ session('ok') }}</div>@endif

<section class="card profile-head">
    <span class="avatar avatar--lg">@if($user->avatar)<img src="{{ $user->avatar }}" alt="" referrerpolicy="no-referrer">@else{{ mb_strtoupper(mb_substr($user->name, 0, 1)) }}@endif</span>
    <div class="min-w-0">
        <h1 class="profile-head__name">{{ $user->name }}</h1>
        <div class="flex flex-wrap items-center gap-2 mt-1">
            <span class="level-badge !min-w-0 !h-8 !text-[14px] !rounded-[10px]"><small>Lv</small>{{ $lv['level'] }}</span>
            <span class="font-bold">{{ $lv['title'] }}</span>
            <span class="text-ink-faint text-[13px]">· {{ number_format($snap['xp'], 0, ',', '.') }} XP</span>
        </div>
        <div class="progress progress--gold mt-3 max-w-md"><div class="progress__bar" style="width: {{ $lv['pct'] }}%"></div></div>
        <div class="text-[12.5px] text-ink-soft mt-1">{{ $lv['into'] }}/{{ $lv['need'] }} XP tới cấp {{ $lv['level'] + 1 }} · Cấp độ chỉ để tạo động lực, không phải đẳng cấp cờ chính thức.</div>
    </div>
    <div class="flex gap-2 flex-wrap">
        <a href="{{ route('account.settings') }}" class="btn btn--sm"><x-icon name="settings" /> Cài đặt</a>
        <form method="POST" action="{{ route('logout') }}">@csrf<button class="btn btn--ghost btn--sm"><x-icon name="logout" /> Đăng xuất</button></form>
    </div>
</section>

<div class="stat-grid mt-4">
    <div class="card stat"><span class="stat__icon tone-flame"><x-icon name="flame" /></span><span><span class="stat__value">{{ $snap['streak'] }}</span><span class="stat__label block">ngày liên tiếp · kỷ lục {{ $user->streak_best }}</span></span></div>
    <div class="card stat"><span class="stat__icon tone-jade"><x-icon name="book" /></span><span><span class="stat__value">{{ $completed->count() }}</span><span class="stat__label block">bài đã học</span></span></div>
    <div class="card stat"><span class="stat__icon tone-primary"><x-icon name="puzzle" /></span><span><span class="stat__value">{{ $puzzleStats['solved'] }}</span><span class="stat__label block">thế cờ đã giải{{ $accuracy !== null ? ' · đúng '.$accuracy.'%' : '' }}</span></span></div>
    <div class="card stat"><span class="stat__icon tone-gold"><x-icon name="chart" /></span><span><span class="stat__value">{{ $user->puzzle_rating }}</span><span class="stat__label block">điểm thế cờ · 60s: {{ $user->rush_best }}</span></span></div>
</div>

<div class="profile-grid mt-4">
    <div class="grid gap-4 content-start min-w-0">
        <section class="card card--pad">
            <div class="flex items-center justify-between gap-2 mb-3">
                <h2 class="text-lg font-extrabold m-0">Lịch học 18 tuần</h2>
                <span class="text-[12.5px] text-ink-faint">Đậm hơn = nhiều XP hơn</span>
            </div>
            <div class="heatmap" role="img" aria-label="Lịch hoạt động học">
                @for($i = 0; $i < ceil($days / 7) * 7; $i++)
                    @php $d = $start->addDays($i)->toDateString(); $xp = $activity[$d] ?? 0; @endphp
                    <span class="heatmap__cell {{ $d > $today ? 'is-future' : '' }} {{ $d === $today ? 'is-today' : '' }}" data-l="{{ $lvOf($xp) }}" title="{{ \Carbon\Carbon::parse($d)->format('d/m') }}: {{ $xp }} XP"></span>
                @endfor
            </div>
        </section>

        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-3">Kỹ năng</h2>
            <div class="grid gap-3">
                @foreach($courses as $c)
                    <div class="skill-row">
                        <span>{{ $c['name'] }}</span>
                        <span class="progress progress--sm"><span class="progress__bar" style="width: {{ $c['mastery'] }}%"></span></span>
                        <b>{{ $c['mastery'] }}%</b>
                    </div>
                @endforeach
            </div>
            <p class="text-[12.5px] text-ink-faint mt-3 mb-0">Thông thạo = 60% tỉ lệ bài đã học + 40% độ chính xác giải thế cờ của chặng (khi đủ 5 lượt).</p>
            @if(!empty($weak))
                <div class="mt-4 pt-4 border-t border-line">
                    <div class="font-bold mb-2">Bạn hay sai ở</div>
                    <div class="flex flex-wrap gap-2">
                        @foreach($weak as $w)
                            <a href="{{ route('practice.topic', $w['skill']) }}" class="chip">{{ $w['name'] }} · {{ $w['accuracy'] }}%</a>
                        @endforeach
                    </div>
                </div>
            @endif
        </section>

        @if($reading->isNotEmpty())
        <section>
            <h2 class="text-lg font-extrabold mb-3">Đang học dở</h2>
            <div class="lesson-list">
                @foreach($reading->take(6) as $p)
                    @if($p->lesson)
                    <a href="{{ route('lessons.show', $p->lesson->slug) }}" class="lesson-item card">
                        <span class="li-num"><x-icon name="play" class="w-4 h-4" /></span>
                        <span><span class="li-title">{{ $p->lesson->title }}</span><span class="li-sub">Đã đọc {{ floor($p->read_seconds / 60) }} phút{{ $p->viewed_all_moves ? ' · đã xem hết nước' : '' }}</span></span>
                        <span class="li-meta"><x-icon name="chev-right" /></span>
                    </a>
                    @endif
                @endforeach
            </div>
        </section>
        @endif

        @if($completed->isNotEmpty())
        <section>
            <h2 class="text-lg font-extrabold mb-3">Bài đã học <span class="text-ink-faint font-semibold">({{ $completed->count() }})</span></h2>
            <div class="lesson-list" data-more-list>
                @foreach($completed->values() as $i => $p)
                    @if($p->lesson)
                    <a href="{{ route('lessons.show', $p->lesson->slug) }}" class="lesson-item card is-done" @if($i >= 5) hidden data-more @endif>
                        <span class="li-num !bg-jade-soft !text-jade-ink"><x-icon name="check" class="w-4 h-4" /></span>
                        <span><span class="li-title">{{ $p->lesson->title }}</span><span class="li-sub">Hoàn thành {{ optional($p->completed_at)->format('d/m/Y') }}</span></span>
                        <span class="li-meta"><x-icon name="chev-right" /></span>
                    </a>
                    @endif
                @endforeach
                @if($completed->count() > 5)
                    <button type="button" class="btn btn--block" onclick="this.parentNode.querySelectorAll('[data-more]').forEach(function(e){e.hidden=false});this.remove();">Hiện thêm {{ $completed->count() - 5 }} bài</button>
                @endif
            </div>
        </section>
        @endif

        @if($completed->isEmpty() && $reading->isEmpty())
            <div class="empty card"><div class="empty__glyph">兵</div><h3>Bắt đầu bài học đầu tiên</h3>
                <p>Xem hết các nước của một bài là được đánh dấu <strong>đã học</strong> và nhận XP.</p>
                <a href="{{ route('path') }}" class="btn btn--primary mt-2">Mở lộ trình học</a></div>
        @endif
    </div>

    <aside class="grid gap-4 content-start">
        <section class="card card--pad">
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-lg font-extrabold m-0 flex items-center gap-2"><x-icon name="flame" class="w-5 h-5 text-flame" /> Tuần này</h2>
                @if($user->streak_freezes)<span class="tag" title="Tự dùng khi bạn lỡ 1 ngày"><x-icon name="snowflake" /> {{ $user->streak_freezes }} thẻ giữ chuỗi</span>@endif
            </div>
            <div class="week-strip">
                @for($i = 6; $i >= 0; $i--)
                    @php $d = \App\Support\Vn::daysAgo($i); $on = ($activity[$d] ?? 0) > 0; $dow = \Carbon\Carbon::parse($d)->dayOfWeekIso - 1; @endphp
                    <span class="week-strip__day">{{ $dowLabels[$dow] }}<span class="week-strip__dot {{ $on ? 'is-on' : '' }} {{ $i === 0 ? 'is-today' : '' }}">@if($on)<x-icon name="check" />@endif</span></span>
                @endfor
            </div>
            @php $gp = min(100, (int) round(100 * $snap['goal']['xp'] / max(1, $snap['goal']['target']))); @endphp
            <div class="mt-4 text-[13.5px] font-semibold flex justify-between"><span>Mục tiêu hôm nay</span><span>{{ $snap['goal']['xp'] }}/{{ $snap['goal']['target'] }} XP</span></div>
            <div class="progress progress--gold mt-1"><div class="progress__bar" style="width: {{ $gp }}%"></div></div>
        </section>

        <section class="card card--pad">
            <div class="flex items-center justify-between mb-3">
                <h2 class="text-lg font-extrabold m-0">Huy hiệu</h2>
                <span class="text-[13px] font-bold text-ink-soft">{{ $unlocked }}/{{ count($achievements) }}</span>
            </div>
            <div class="ach-grid">
                @foreach($achievements as $a)
                    <div class="ach {{ $a['unlocked_at'] ? '' : 'is-locked' }}" title="{{ $a['desc'] }}">
                        <span class="ach__icon">@if(preg_match('/^\p{Han}$/u', $a['icon']))<span class="font-piece">{{ $a['icon'] }}</span>@else<x-icon :name="$a['icon']" />@endif</span>
                        <span class="ach__name">{{ $a['name'] }}</span>
                        <span class="ach__desc">{{ $a['desc'] }}</span>
                    </div>
                @endforeach
            </div>
        </section>

        <a href="{{ route('practice.review') }}" class="card card--pad flex items-center gap-3">
            <span class="stat__icon tone-jade"><x-icon name="repeat" /></span>
            <span class="flex-1"><span class="block font-bold">Luyện lỗi sai</span><span class="block text-[13px] text-ink-soft">{{ $dueCount ? $dueCount.' thế cần ôn hôm nay' : 'Không có thế cần ôn' }}</span></span>
            <x-icon name="chev-right" class="w-5 h-5 text-ink-faint" />
        </a>
        <a href="{{ route('account.library') }}" class="card card--pad flex items-center gap-3">
            <span class="stat__icon tone-primary"><x-icon name="bookmark" /></span>
            <span class="flex-1"><span class="block font-bold">Thư viện thế cờ</span><span class="block text-[13px] text-ink-soft">{{ $libraryCount }} thế đã lưu</span></span>
            <x-icon name="chev-right" class="w-5 h-5 text-ink-faint" />
        </a>

        @if($suggested->isNotEmpty())
        <section>
            <h2 class="text-lg font-extrabold mb-3">Gợi ý học tiếp</h2>
            <div class="lesson-list">
                @foreach($suggested as $lesson)
                    <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card">
                        <span class="li-num">{{ $lesson->order_in_series ?? '•' }}</span>
                        <span><span class="li-title">{{ $lesson->title }}</span><span class="li-sub">{{ $lesson->phase_label }} · {{ $lesson->move_count_label }}</span></span>
                        <span class="li-meta"><x-icon name="chev-right" /></span>
                    </a>
                @endforeach
            </div>
        </section>
        @endif
    </aside>
</div>
@endsection
