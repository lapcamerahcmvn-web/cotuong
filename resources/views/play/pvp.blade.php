@extends('layouts.app')
@section('title', 'Ván đấu #' . $game->code . ' — Học Cờ Tướng')
@section('description', 'Ván cờ tướng giữa ' . ($game->red?->name ?? '?') . ' và ' . ($game->black?->name ?? '?') . ' trên Học Cờ Tướng.')
@section('robots', 'noindex, nofollow')

@section('content')
@php
    $u = auth()->user();
    $you = $game->sideOf($u);
    $canAccept = $game->status === 'waiting' && $u && ! $you;
@endphp
<div data-pvp data-code="{{ $game->code }}" data-variant="{{ $game->variant }}" data-needs-board>
    <script type="application/json" data-pvp-state>@json($state, JSON_UNESCAPED_UNICODE)</script>

    <nav class="crumbs" aria-label="breadcrumb"><a href="{{ route('pvp.lobby') }}">Thách đấu</a><x-icon name="chev-right" /><span>Ván #{{ $game->code }}</span>
        @if($game->isCoup())<span class="variant-badge ml-2">Cờ úp</span>@endif</nav>

    @if($game->status === 'waiting')
        <div class="card card--pad card--hero mb-4" data-pvp-waiting>
            @if($you)
                <div class="flex flex-wrap items-center gap-4 justify-between">
                    <div>
                        <div class="font-display font-extrabold text-xl">Gửi link này cho bạn của bạn</div>
                        <p class="text-ink-soft text-[14.5px] mt-1 mb-0">Ván bắt đầu ngay khi bạn ấy bấm "Nhận lời". Trang này tự cập nhật.</p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button type="button" class="btn btn--primary" data-share-text="♟ Thách đấu {{ mb_strtolower(\App\Models\Game::VARIANTS[$game->variant]) }} với mình nhé! Mã phòng {{ $game->code }}" data-share-url="{{ route('pvp.show', $game->code) }}"><x-icon name="share" /> Gửi lời mời</button>
                        <form method="POST" action="{{ route('pvp.resign', $game->code) }}" data-pvp-cancel>@csrf<button class="btn btn--ghost" type="submit">Huỷ phòng</button></form>
                    </div>
                </div>
                <div class="mt-4 flex items-center gap-2 text-[14px]"><span class="text-ink-soft">Mã phòng:</span> <code class="!text-[18px] font-extrabold tracking-[.2em]">{{ $game->code }}</code></div>
            @elseif($canAccept)
                <div class="flex flex-wrap items-center gap-4 justify-between">
                    <div>
                        <div class="font-display font-extrabold text-xl">{{ ($game->red ?? $game->black)?->name }} thách đấu bạn!</div>
                        <p class="text-ink-soft text-[14.5px] mt-1 mb-0">{{ \App\Models\Game::VARIANTS[$game->variant] }} · bạn cầm quân {{ $game->red_user_id ? 'Đen' : 'Đỏ' }} · {{ \App\Models\Game::TIME_CONTROLS[$game->time_control] }}</p>
                    </div>
                    <form method="POST" action="{{ route('pvp.accept', $game->code) }}">@csrf<button class="btn btn--primary btn--lg" type="submit"><x-icon name="sword" /> Nhận lời</button></form>
                </div>
            @else
                <div class="font-display font-extrabold text-xl">Lời thách đấu đang chờ</div>
                <p class="text-ink-soft mt-1 mb-3">Đăng nhập (miễn phí) để nhận lời và vào ván.</p>
                <a href="{{ route('login') }}" class="btn btn--primary">Đăng nhập để chơi</a>
            @endif
        </div>
    @endif

    <div class="practice">
        <div class="min-w-0">
            <div class="board-card card">
                <div class="board-bar" data-pvp-top></div>
                <div class="board-stage" data-pvp-board></div>
                <div class="board-bar mt-2" data-pvp-bottom></div>
            </div>
        </div>
        <div class="grid gap-3 content-start">
            <div class="card card--pad" data-pvp-status>Đang tải…</div>
            <div class="card card--pad" data-pvp-draw hidden></div>
            <div class="card card--pad !py-3" data-pvp-captured></div>
            <div class="card overflow-hidden">
                <div class="side-head"><span>Biên bản ván cờ</span><span class="muted" data-pvp-count></span></div>
                <div class="px-4 py-2 max-h-[40vh] overflow-y-auto" data-pvp-moves></div>
            </div>
            @if($you)
            <div class="flex flex-wrap gap-2" data-pvp-actions>
                <button type="button" class="btn" data-pvp-offer><x-icon name="repeat" /> Đề nghị hoà</button>
                <button type="button" class="btn btn--ghost btn--danger" data-pvp-resign><x-icon name="x-circle" /> Xin thua</button>
                <button type="button" class="btn btn--ghost" data-pvp-flip><x-icon name="flip" /> Lật bàn</button>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection
