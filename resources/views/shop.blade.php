@extends('layouts.app')
@section('title', 'Đổi Thưởng Bằng Xu — Học Cờ Tướng')
@section('description', 'Đổi xu kiếm được khi học và luyện cờ tướng lấy thẻ giữ chuỗi, màu bàn cờ cao cấp, khung ảnh đại diện và danh hiệu. Đổi thưởng không làm giảm XP hay thứ hạng.')

@section('content')
@php
    $fmt = fn ($n) => number_format((int) $n, 0, ',', '.');
    $lv = (int) ($user->level ?? 0);
@endphp
<nav class="crumbs" aria-label="breadcrumb"><a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>Đổi thưởng</span></nav>

<section class="card card--pad card--hero grid gap-4 md:grid-cols-[1fr_auto] md:items-center mb-6">
    <div class="min-w-0">
        <div class="eyebrow"><x-icon name="gift" /> Đổi thưởng</div>
        <h1 class="page-title mt-1">Đổi xu lấy quà</h1>
        <p class="page-lede">Mỗi <b>1 XP</b> bạn kiếm được khi học bài, giải thế cờ, thắng máy… là <b>1 xu</b>. Đổi thưởng chỉ trừ xu —
            <b>XP, cấp độ và thứ hạng của bạn giữ nguyên</b>.</p>
    </div>
    @auth
        <div class="shop-balance">
            <span class="shop-balance__coin" aria-hidden="true">₫</span>
            <span><span class="shop-balance__n" data-shop-balance>{{ $fmt($balance) }}</span><span class="block text-[13px] font-bold text-ink-soft">xu hiện có</span></span>
        </div>
    @else
        <a href="{{ route('login') }}" class="btn btn--primary btn--lg"><x-icon name="user" /> Đăng nhập để đổi</a>
    @endauth
</section>

@if(session('shop_ok'))<div class="alert alert--ok mb-4"><x-icon name="check-circle" /> <span>{{ session('shop_ok') }}</span></div>@endif
@if(session('shop_err'))<div class="alert alert--err mb-4"><x-icon name="x-circle" /> <span>{{ session('shop_err') }}</span></div>@endif

@foreach($sections as $type => $sec)
    @continue(empty($items[$type]))
    <section class="section {{ $loop->first ? 'pt-0' : '' }}" id="{{ $type }}">
        <div class="section-head"><div><h2>{{ $sec['name'] }}</h2><p>{{ $sec['desc'] }}</p></div></div>
        <div class="shop-grid">
            @foreach($items[$type] as $it)
                @php
                    $has = isset($owned[$it['key']]);
                    $equipped = $user && (($type === 'frame' && $user->avatar_frame === $it['key']) || ($type === 'title' && $user->shop_title === $it['key']));
                    $locked = $user && $lv < $it['min_level'];
                    $full = $type === 'freeze' && $user && (int) $user->streak_freezes >= $freezeMax;
                    $afford = $user && $balance >= $it['price'];
                @endphp
                <div class="card shop-item {{ $has ? 'is-owned' : '' }} {{ $equipped ? 'is-equipped' : '' }}">
                    <div class="shop-item__preview">
                        @switch($type)
                            @case('freeze')<span class="shop-freeze"><x-icon name="snowflake" /></span>@break
                            @case('board')<span class="ds-swatch__wood shop-board" data-board-theme="{{ $it['theme'] }}"><span class="ds-swatch__pc"></span></span>@break
                            @case('frame')<x-avatar :name="$user->name ?? 'Kỳ'" :src="$user->avatar ?? null" :frame="$it['key']" size="lg" />@break
                            @case('title')<span class="shop-title-tag">✦ {{ $it['title'] }}</span>@break
                        @endswitch
                    </div>
                    <div class="shop-item__body">
                        <div class="font-extrabold">{{ $it['name'] }}</div>
                        <div class="text-[13px] text-ink-soft leading-snug">{{ $it['desc'] }}</div>
                        @if($it['min_level'] > 1)<div class="text-[12px] font-bold text-gold-ink mt-1">Từ cấp {{ $it['min_level'] }}</div>@endif
                        @if($type === 'freeze' && $user)<div class="text-[12px] font-bold text-ink-faint mt-1">Đang giữ {{ (int) $user->streak_freezes }}/{{ $freezeMax }} thẻ</div>@endif
                    </div>
                    <div class="shop-item__action">
                        @guest
                            <span class="shop-price">{{ $fmt($it['price']) }} xu</span>
                        @else
                            @if($has && $type === 'board')
                                <button type="button" class="btn btn--sm" data-use-board="{{ $it['theme'] }}"><x-icon name="check" /> Dùng màu này</button>
                            @elseif($has && in_array($type, ['frame', 'title'], true))
                                <form method="post" action="{{ route('shop.equip') }}">@csrf
                                    <input type="hidden" name="type" value="{{ $type }}"><input type="hidden" name="item" value="{{ $equipped ? '' : $it['key'] }}">
                                    <button class="btn btn--sm {{ $equipped ? 'btn--ghost' : '' }}">@if($equipped)<x-icon name="x" /> Bỏ dùng @else<x-icon name="check" /> Dùng @endif</button>
                                </form>
                                @if($equipped)<span class="tag tag--done">Đang dùng</span>@endif
                            @else
                                <form method="post" action="{{ route('shop.buy', $it['key']) }}" data-shop-buy="{{ $it['name'] }}" data-price="{{ $it['price'] }}">@csrf
                                    <button class="btn btn--sm {{ $afford && ! $locked && ! $full ? 'btn--primary' : '' }}" @disabled(! $afford || $locked || $full)>
                                        @if($locked)<x-icon name="lock" /> Cấp {{ $it['min_level'] }}
                                        @elseif($full) Đã đủ thẻ
                                        @else<x-icon name="gift" /> Đổi · {{ $fmt($it['price']) }} xu @endif
                                    </button>
                                </form>
                            @endif
                        @endguest
                    </div>
                </div>
            @endforeach
        </div>
    </section>
@endforeach

<section class="section pt-0">
    <div class="prose">
        <h2>Kiếm xu bằng cách nào?</h2>
        <ul>
            <li>Hoàn thành bài học: +{{ config('gamification.xp.lesson_complete') }} xu mỗi bài; xong cả chương trình +{{ config('gamification.xp.series_complete') }}.</li>
            <li>Giải thế cờ lần đầu: +{{ config('gamification.xp.puzzle_base') }} đến +{{ config('gamification.xp.puzzle_base') + 15 }} xu tuỳ độ khó; thế cờ hôm nay +{{ config('gamification.xp.daily_puzzle') }}.</li>
            <li>Đạt mục tiêu ngày, giữ chuỗi 7 / 30 / 100 ngày, thắng máy, đấu bạn và thử thách tuần đều có thưởng.</li>
        </ul>
        <p>Thử ngay <a href="{{ route('practice.ladder') }}">Luyện sát pháp 1 → 10 nước</a> hoặc <a href="{{ route('practice.topic', 'tan-cuoc') }}">Luyện tàn cuộc</a>.</p>
    </div>
</section>

@push('scripts')
<script>
// Dùng màu bàn cờ đã đổi: lưu trên thiết bị (như Cài đặt giao diện) + áp ngay. Hỏi lại trước khi đổi xu.
document.querySelectorAll('[data-use-board]').forEach(function (b) {
    b.addEventListener('click', function () {
        try { localStorage.setItem('board_theme', b.dataset.useBoard); } catch (e) {}
        document.documentElement.dataset.boardTheme = b.dataset.useBoard;
        b.innerHTML = '✓ Đang dùng';
    });
});
document.querySelectorAll('[data-shop-buy]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
        if (!confirm('Đổi “' + f.dataset.shopBuy + '” với giá ' + Number(f.dataset.price).toLocaleString('vi-VN') + ' xu?')) e.preventDefault();
    });
});
</script>
@endpush
@endsection
