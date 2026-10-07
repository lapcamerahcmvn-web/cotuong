@extends('layouts.app')
@section('title', $title . ' — Luyện cờ tướng | Học Cờ Tướng')
@section('description', $lede)
@section('robots', 'noindex, follow')

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('practice.hub') }}">Luyện tập</a><x-icon name="chev-right" />
    <span>{{ $title }}</span>
</nav>

<div data-practice="play" data-mode="{{ $mode }}" data-skill="{{ $skill ?? '' }}" data-rounds="{{ $rounds ?? 0 }}"
     @if(!empty($ladder)) data-ladder="{{ $ladder['level'] }}" data-ladder-pass="{{ $ladder['pass'] }}" data-ladder-levels="{{ $ladder['levels'] }}" @endif
     data-queue='@json($queue ?? [])'>
    @if($first)
        <script type="application/json" data-first>@json($first->toBoardPayload(), JSON_UNESCAPED_UNICODE)</script>
    @endif
    @foreach($items ?? [] as $it)
        <script type="application/json" data-puzzle="{{ $it->id }}">@json($it->toBoardPayload(), JSON_UNESCAPED_UNICODE)</script>
    @endforeach

    <div class="practice">
        <div class="min-w-0">
            @if($first)
                @include('partials.puzzle-board')
            @endif
        </div>

        <div class="grid gap-3 content-start">
            <div>
                <div class="eyebrow">
                    @switch($mode)
                        @case('daily')<x-icon name="calendar" /> Thử thách mỗi ngày @break
                        @case('review')<x-icon name="repeat" /> Ôn tập @break
                        @case('placement')<x-icon name="target" /> Xếp lớp @break
                        @default<x-icon name="puzzle" /> Luyện tập
                    @endswitch
                </div>
                <h1 class="page-title mt-1">{{ $title }}</h1>
                <p class="muted m-0">{{ $lede }}</p>
            </div>

            @if($mode === 'daily')
                <div class="card card--pad flex flex-wrap gap-x-6 gap-y-2 items-center">
                    <span class="daily-card__timer"><x-icon name="clock" /> Thế mới sau <span data-countdown="{{ $secondsLeft }}">--:--:--</span></span>
                    @if($solveRate !== null)<span class="text-[13.5px] text-ink-soft font-semibold">{{ $solveRate }}% người giải đúng hôm nay</span>@endif
                    @if($alreadySolved)<span class="tag tag--done"><x-icon name="check" /> Bạn đã giải hôm nay</span>@endif
                </div>
            @endif

            @if($first)
                <div class="card card--pad">
                    <div class="text-[12.5px] font-bold text-ink-faint uppercase tracking-wider">Thế cờ</div>
                    <div class="font-bold leading-snug mt-1" data-p-title>{{ $first->title }}</div>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span class="tag"><x-icon name="chart" /> Độ khó <b class="ml-1" data-p-rating>{{ $first->rating }}</b></span>
                        <a class="tag" data-p-lesson href="{{ $first->lesson ? route('lessons.show', $first->lesson->slug) : '#' }}" @unless($first->lesson) hidden @endunless><x-icon name="book" /> Bài gốc</a>
                    </div>
                    @php $verses = $first->verses(); @endphp
                    <details class="kq-box mt-3" data-p-verses @if(! $verses) hidden @endif>
                        <summary><x-icon name="bulb" class="w-4 h-4" /> Khẩu quyết của thế này <small>(mở khi cần gợi ý)</small></summary>
                        <ol>@foreach($verses as $v)<li>{{ $v }}</li>@endforeach</ol>
                    </details>
                    <div class="flex flex-wrap gap-2 mt-4">
                        <button type="button" class="btn btn--ghost btn--sm" data-hint><x-icon name="bulb" /> Gợi ý</button>
                        <button type="button" class="btn btn--ghost btn--sm" data-reveal><x-icon name="eye" /> Xem lời giải</button>
                    </div>
                    <p class="text-[12.5px] text-ink-faint mt-2 mb-0">Dùng gợi ý hoặc xem lời giải thì thế này không tính XP.</p>
                </div>
            @endif

            @if(!empty($ladder))
                <div class="card card--pad text-[13.5px]" data-ladder-info>
                    <div class="font-bold">Bậc {{ $ladder['level'] }} · chiếu hết trong {{ $ladder['level'] }} nước</div>
                    <div class="text-ink-soft mt-1">Giải đúng {{ $ladder['pass'] }} thế khác nhau ở bậc này để mở bậc {{ $ladder['level'] + 1 <= $ladder['levels'] ? $ladder['level'] + 1 : 'cuối' }}.
                        @if($ladder['solved'] !== null) Bạn đã đúng <b>{{ $ladder['solved'] }}</b> thế.@endif</div>
                    <a href="{{ route('practice.ladder') }}" class="inline-flex items-center gap-1 font-bold mt-2"><x-icon name="map" class="w-4 h-4" /> Bản đồ chinh phục</a>
                </div>
            @endif

            @if(($rounds ?? 0) > 0)
                <div class="result-list !justify-start !my-0" data-dots aria-label="Tiến độ lượt luyện"></div>
            @endif

            <div data-result hidden></div>

            @guest
                <div class="notice text-[13.5px]"><a href="{{ route('login') }}" class="font-bold">Đăng nhập</a> để lưu kết quả, nhận XP và luyện lại các thế đã sai.</div>
            @endguest
        </div>
    </div>
</div>
@endsection
