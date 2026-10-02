@extends('layouts.app')
@section('title', 'Sai Lầm Của Tôi — Luyện Lại Từ Ván Đã Chơi | Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('practice.hub') }}">Luyện tập</a><x-icon name="chev-right" />
    <span>Sai lầm của tôi</span>
</nav>

<div class="flex flex-wrap items-end justify-between gap-3 mb-4">
    <div>
        <h1 class="page-title">Sai lầm của tôi</h1>
        <p class="page-lede">Các nước sai trong chính ván bạn đã chơi (tìm ra khi "Phân tích ván"). Tìm lại nước đúng — làm đúng thì thế cờ quay lại sau 1, 3, 7, 21 ngày cho đến khi thuộc hẳn; làm sai thì ôn lại ngày mai.</p>
    </div>
    <div class="flex gap-2 text-center">
        <div class="card px-4 py-2"><b class="block text-xl font-display">{{ $stats['due'] }}</b><small class="text-ink-soft font-semibold">cần ôn hôm nay</small></div>
        <div class="card px-4 py-2"><b class="block text-xl font-display">{{ $stats['learning'] }}</b><small class="text-ink-soft font-semibold">đang luyện</small></div>
        <div class="card px-4 py-2"><b class="block text-xl font-display text-jade-ink">{{ $stats['mastered'] }}</b><small class="text-ink-soft font-semibold">đã thuộc</small></div>
    </div>
</div>

@if($items->isEmpty())
    <div class="card card--pad text-center">
        <div class="empty__glyph mx-auto">帥</div>
        <h2 class="text-lg font-extrabold mt-2">{{ $stats['total'] ? 'Hôm nay không còn thế nào cần ôn 🎉' : 'Chưa có sai lầm nào để luyện' }}</h2>
        <p class="text-ink-soft text-[14.5px] max-w-xl mx-auto">{{ $stats['total'] ? 'Quay lại vào ngày mai, hoặc phân tích thêm ván để có thế mới.' : 'Chơi một ván với máy hoặc với bạn, rồi bấm "Phân tích ván" trong lịch sử — các nước Sai lầm / Sai lầm nghiêm trọng của bạn sẽ tự vào đây.' }}</p>
        <div class="cluster justify-center mt-3">
            @foreach($recentGames as $g)
                <a href="{{ route('history.show', $g) }}" class="btn"><x-icon name="chart" /> Phân tích ván {{ $g->created_at->format('d/m') }} vs {{ \Illuminate\Support\Str::limit($g->opponent, 18) }}</a>
            @endforeach
            <a href="{{ route('play.bot') }}" class="btn btn--primary"><x-icon name="play" /> Chơi với máy</a>
        </div>
    </div>
@else
    <div class="practice" data-mistakes data-url="{{ url('/luyen-tap/sai-lam-cua-toi') }}">
        <script type="application/json">@json($items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)</script>
        <div class="min-w-0">
            <div class="board-card card">
                <div class="board-bar">
                    <span class="step-pill" data-mk-progress>1/{{ $items->count() }}</span>
                    <span class="tag" data-mk-turn></span>
                </div>
                <div class="board-stage" data-mk-board></div>
            </div>
        </div>
        <div class="grid gap-3 content-start">
            <div class="card card--pad" data-mk-info></div>
            <div class="card card--pad" data-mk-feedback hidden></div>
            <div class="flex gap-2 flex-wrap">
                <button type="button" class="btn" data-mk-show><x-icon name="eye" /> Xem đáp án</button>
                <button type="button" class="btn btn--primary" data-mk-next hidden>Thế tiếp theo <x-icon name="chev-right" /></button>
            </div>
            <p class="text-[13px] text-ink-faint m-0">Chấp nhận nước tốt nhất hoặc nước gần tương đương (kém không quá 0,6 Tốt). Cờ úp: đánh giá theo xác suất quân úp.</p>
        </div>
    </div>
@endif
@endsection
