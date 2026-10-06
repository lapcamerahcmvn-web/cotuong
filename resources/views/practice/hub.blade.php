@extends('layouts.app')
@section('title', 'Luyện Cờ Tướng Online — Bài Tập Thế Cờ, Sát Pháp | Học Cờ Tướng')
@section('description', 'Luyện cờ tướng online miễn phí: thế cờ hôm nay, thử thách 60 giây, chế độ 3 mạng, bài tập sát pháp theo chủ đề và luyện lại thế đã giải sai.')

@push('head')
{!! \App\Support\Seo::ld(\App\Support\Seo::appLd('Luyện cờ tướng — thế cờ mỗi ngày', 'Luyện thế cờ sát pháp, tàn cuộc: thế cờ hôm nay, thử thách 60 giây, chế độ 3 mạng, theo chủ đề, ôn sai lầm.', 'EducationalApplication')) !!}
@endpush

@section('content')
@php $u = auth()->user(); @endphp
<section class="grid gap-4 md:grid-cols-[1fr_auto] md:items-end mb-6">
    <div>
        <div class="eyebrow"><x-icon name="puzzle" /> Luyện tập</div>
        <h1 class="page-title mt-1">Luyện cờ như chơi game</h1>
        <p class="page-lede">{{ number_format($total, 0, ',', '.') }} thế cờ sát pháp & tàn cuộc lấy từ chính các bài học — mỗi thế đúng đều cộng XP và nâng điểm thế cờ của bạn.</p>
    </div>
    @if($u)
        <div class="card stat">
            <span class="stat__icon tone-primary"><x-icon name="chart" /></span>
            <span><span class="stat__value">{{ $u->puzzle_rating }}</span><span class="stat__label block">Điểm thế cờ của bạn</span></span>
        </div>
    @endif
</section>

<div class="mode-grid">
    @if($daily)
    <a href="{{ route('practice.daily') }}" class="card mode-card card--hero">
        <span class="mode-card__icon tone-primary"><x-icon name="calendar" /></span>
        <span>
            <h3>Thế cờ hôm nay</h3>
            <p>Một thế cho mọi người, đổi lúc 0h. Giải đúng +{{ config('gamification.xp.daily_puzzle') }} XP.</p>
            <span class="mode-card__meta flex items-center gap-1"><x-icon name="clock" class="w-4 h-4" /> Còn <span data-countdown="{{ $secondsLeft }}">--:--:--</span></span>
        </span>
    </a>
    @endif
    <a href="{{ route('practice.rush') }}" class="card mode-card">
        <span class="mode-card__icon tone-gold"><x-icon name="zap" /></span>
        <span><h3>60 giây</h3><p>Giải càng nhiều càng tốt trước khi hết giờ. Luyện phản xạ chiếu hết.</p>
            @if($u?->rush_best)<span class="mode-card__meta">Kỷ lục: {{ $u->rush_best }}</span>@endif</span>
    </a>
    <a href="{{ route('practice.survival') }}" class="card mode-card">
        <span class="mode-card__icon tone-primary"><x-icon name="heart" /></span>
        <span><h3>3 mạng</h3><p>Không giới hạn giờ, khó dần. Sai 3 lần là kết thúc.</p>
            @if($u?->survival_best)<span class="mode-card__meta">Kỷ lục: {{ $u->survival_best }}</span>@endif</span>
    </a>
    @if($u)
    <a href="{{ route('practice.review') }}" class="card mode-card">
        <span class="mode-card__icon tone-jade"><x-icon name="repeat" /></span>
        <span><h3>Luyện lỗi sai</h3><p>Ôn lại thế từng giải sai theo lịch giãn cách — cách nhớ lâu nhất.</p>
            <span class="mode-card__meta">{{ $dueCount ? $dueCount . ' thế cần ôn hôm nay' : 'Chưa có thế cần ôn' }}</span></span>
    </a>
    @endif
    @if($u)
    <a href="{{ route('practice.mistakes') }}" class="card mode-card">
        <span class="mode-card__icon tone-primary"><x-icon name="target" /></span>
        <span><h3>Sai lầm của tôi</h3><p>Luyện lại đúng các nước bạn từng đi sai trong ván của chính mình (từ "Phân tích ván").</p>
            <span class="mode-card__meta">{{ $mistakesDue ? $mistakesDue . ' thế cần ôn hôm nay' : 'Phân tích 1 ván để có thế luyện' }}</span></span>
    </a>
    @endif
    <a href="{{ route('play.bot') }}" class="card mode-card">
        <span class="mode-card__icon tone-ink"><x-icon name="shield" /></span>
        <span><h3>Chơi với máy</h3><p>Áp dụng thế cờ vào ván thật — 4 cấp độ, có gợi ý.</p></span>
    </a>
    <a href="{{ route('practice.setup') }}" class="card mode-card">
        <span class="mode-card__icon tone-gold"><x-icon name="grid" /></span>
        <span><h3>Xếp cờ để thẩm</h3><p>Tự xếp thế cờ tướng hoặc cờ úp, cho máy giải hay đánh với máy, đổi bên tuỳ ý, lưu vào thư viện.</p></span>
    </a>
    <a href="{{ route('practice.placement') }}" class="card mode-card">
        <span class="mode-card__icon tone-ink"><x-icon name="target" /></span>
        <span><h3>Kiểm tra trình độ</h3><p>5 thế từ dễ đến khó — gợi ý bạn nên bắt đầu học từ đâu.</p></span>
    </a>
</div>

@if(!empty($weak))
<section class="section pb-0">
    <div class="section-head"><div><h2>Bạn hay sai ở</h2><p>Dựa trên các lượt giải 60 ngày gần đây.</p></div></div>
    <div class="grid gap-3 sm:grid-cols-3">
        @foreach($weak as $w)
            <a href="{{ route('practice.topic', $w['skill']) }}" class="card card--pad">
                <div class="flex items-center justify-between font-bold"><span>{{ $w['name'] }}</span><span class="text-danger">{{ $w['accuracy'] }}%</span></div>
                <div class="progress progress--sm mt-2"><div class="progress__bar" style="width:{{ $w['accuracy'] }}%"></div></div>
                <div class="text-[13px] text-ink-soft mt-2">{{ $w['n'] }} lượt · bấm để luyện thêm</div>
            </a>
        @endforeach
    </div>
</section>
@endif

<section class="section">
    <div class="section-head"><div><h2>Luyện theo chủ đề</h2><p>Mỗi lượt 10 thế, độ khó tự điều chỉnh theo điểm thế cờ của bạn.</p></div></div>
    <div class="grid gap-3 grid-cols-2 md:grid-cols-4">
        @foreach($skills as $s)
            <a href="{{ route('practice.topic', $s['slug']) }}" class="card card--pad flex flex-col gap-1">
                <span class="path-step__glyph !w-11 !h-11 !text-[22px]">{{ $s['glyph'] }}</span>
                <span class="font-bold mt-2">{{ $s['name'] }}</span>
                <span class="text-[13px] text-ink-soft leading-snug">{{ $s['desc'] }}</span>
                <span class="text-[12.5px] font-bold text-jade-ink mt-auto pt-2">{{ $s['count'] }} thế</span>
            </a>
        @endforeach
    </div>
</section>

<section class="section pt-0">
    <div class="prose">
        <h2>Vì sao nên luyện thế cờ mỗi ngày?</h2>
        <p>Đọc lý thuyết giúp bạn biết <strong>sát pháp</strong> là gì, nhưng chỉ khi tự tìm nước đi trên bàn cờ bạn mới nhớ được hình cờ. Mỗi thế ở đây đều lấy từ bài học thật trên site — sai thì xem ngay nước đúng và bài giảng gốc, đúng thì được cộng XP và điểm thế cờ.</p>
        <p>Thế giải sai được tự đưa vào <strong>hàng đợi ôn tập</strong> với lịch giãn cách 1 → 3 → 7 → 14 ngày, giúp bạn sửa đúng điểm yếu thay vì luyện ngẫu nhiên.</p>
    </div>
</section>
@endsection
