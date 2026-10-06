@extends('layouts.app')

@section('title', config('site.home_title') ?: 'Học Cờ Tướng — Bàn Cờ Tương Tác, Diễn Giải Từng Nước')
@section('description', config('site.home_description') ?: 'Học cờ tướng bài bản từ khai cuộc đến tàn cuộc và cờ úp. Bàn cờ tương tác đi từng nước có diễn giải, dễ hiểu cho người mới lẫn kỳ thủ.')

@push('head')
@php
    // WebSite + Organization JSON-LD đã xuất toàn site trong layouts/app.blade.php.
    // Câu hỏi thường gặp — dùng cho cả FAQPage schema (Google/AI) lẫn phần hiển thị bên dưới.
    $faqs = [
        ['Học cờ tướng cho người mới bắt đầu từ đâu?', 'Bắt đầu từ luật chơi cơ bản và cách đi từng quân (Xe, Pháo, Mã, Tượng, Sĩ, Tướng, Tốt), sau đó học khai cuộc, trung cuộc (sát pháp) và tàn cuộc. Tại Học Cờ Tướng, mỗi bài có bàn cờ tương tác đi từng nước để bạn thấy rõ cách quân di chuyển.'],
        ['Cờ tướng có mấy loại quân và đi thế nào?', 'Có 7 loại quân: Tướng (đi 1 ô trong cung), Sĩ (chéo 1 ô trong cung), Tượng (chéo 2 ô, không qua sông), Mã (hình chữ nhật, bị cản chân mã), Xe (đi thẳng bao xa tuỳ ý), Pháo (đi thẳng như Xe, khi ăn phải có ngòi), Tốt (đi thẳng 1 ô, qua sông được đi ngang, không lùi).'],
        ['Cờ úp là gì?', 'Cờ úp là biến thể của cờ tướng: chơi trên cùng bàn cờ và bộ quân, nhưng 30 quân (trừ hai Tướng) được úp sấp mặt và tráo ngẫu nhiên — bạn không biết quân thật là gì cho tới khi lật. Quân úp đi theo binh chủng của ô xuất phát, khi đi nước đầu sẽ lật lộ mặt thật.'],
        ['Cờ úp khác cờ tướng thế nào?', 'Cờ úp thêm yếu tố ẩn thông tin (không biết quân úp là gì), khai cuộc chỉ gói trong khoảng 5 nước, con Pháo và cửa tướng quan trọng hơn, và rất ít khi hòa. Cờ tàn cờ úp cũng đa dạng hơn vì Sĩ ra được khỏi cung và Tượng qua được sông.'],
        ['Học cờ ở đây khác gì các trang khác?', 'Học Cờ Tướng có bàn cờ tương tác đi từng nước kèm diễn giải, cùng lộ trình bài học có cấu trúc từ nhập môn đến nâng cao — cho cả cờ tướng lẫn cờ úp. Bạn không chỉ đọc lý thuyết mà thấy trực tiếp từng nước trên bàn cờ.'],
    ];
    $ldFaq = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => collect($faqs)->map(fn ($f) => [
            '@type' => 'Question', 'name' => $f[0],
            'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f[1]],
        ])->all(),
    ];
@endphp
<script type="application/ld+json">{!! json_encode($ldFaq, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@endpush

@section('content')
@php
    $u = auth()->user();
    $dailyFen = $dailyPuzzle?->fen ?? $dailyLesson?->initial_fen;
    $dailyUrl = $dailyPuzzle ? route('practice.daily') : ($dailyLesson ? route('lessons.show', $dailyLesson->slug).'#giai-do' : null);
@endphp

@if(!$u)
{{-- ================= KHÁCH: HERO ================= --}}
<section class="hero">
    <div>
        <span class="eyebrow"><x-icon name="sparkles" /> Miễn phí · {{ number_format($totalLessons, 0, ',', '.') }} bài học tương tác</span>
        <h1 class="hero__title">Mỗi ngày tiến bộ <em>một nước cờ</em></h1>
        <p class="hero__lede">Học cờ tướng và cờ úp qua bàn cờ tương tác: đi lại từng nước có lời giảng, luyện thế cờ như chơi game, giữ chuỗi ngày học và theo lộ trình từ nhập môn đến nâng cao.</p>
        <div class="hero__cta">
            <a href="{{ route('phase', 'nhap-mon') }}" class="btn btn--primary btn--lg"><x-icon name="graduation" /> Tôi mới học</a>
            <a href="{{ route('practice.placement') }}" class="btn btn--lg"><x-icon name="target" /> Tôi đã biết chơi</a>
        </div>
        <div class="hero__proof">
            <span><b>{{ number_format($totalLessons, 0, ',', '.') }}</b>bài học</span>
            <span><b>{{ \App\Models\Puzzle::published()->count() }}</b>thế cờ luyện tập</span>
            <span><b>5</b>chặng lộ trình</span>
        </div>
    </div>
    <div class="hero__board">
        <x-chess-board
            :initial-fen="$heroLesson?->initial_fen ?? 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR'"
            :steps="$heroSteps" :tree="$heroTree ?? null" :show-list="false" :compact="true" />
    </div>
</section>
@else
{{-- ================= ĐÃ ĐĂNG NHẬP: DASHBOARD ================= --}}
<section class="pt-2">
    <div class="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
            <span class="eyebrow">{{ $snap['streak_today'] ? 'Hôm nay bạn đã học — tuyệt!' : 'Học một chút hôm nay để giữ chuỗi' }}</span>
            <h1 class="page-title mt-1">Chào {{ \Illuminate\Support\Str::of($u->name)->explode(' ')->last() }}!</h1>
        </div>
        <a href="{{ route('account.index') }}" class="flex items-center gap-3">
            <span class="level-badge"><small>Lv</small>{{ $snap['level']['level'] }}</span>
            <span class="min-w-[160px]">
                <span class="block text-[13px] font-bold text-ink">{{ $snap['level']['title'] }}</span>
                <span class="progress progress--sm progress--gold mt-1 block"><span class="progress__bar" style="width: {{ $snap['level']['pct'] }}%"></span></span>
                <span class="block text-[12px] text-ink-faint mt-0.5">{{ $snap['level']['into'] }}/{{ $snap['level']['need'] }} XP tới cấp {{ $snap['level']['level'] + 1 }}</span>
            </span>
        </a>
    </div>

    <div class="dash-stats">
        <div class="card stat"><span class="stat__icon tone-flame"><x-icon name="flame" /></span><span><span class="stat__value">{{ $snap['streak'] }}</span><span class="stat__label block">ngày liên tiếp</span></span></div>
        @php $goalPct = min(100, (int) round(100 * $snap['goal']['xp'] / max(1, $snap['goal']['target']))); @endphp
        <div class="card stat"><span class="ring" style="--p: {{ $goalPct }}; --size: 42px; --w: 5px; --c: var(--gold)"><span class="!text-[10px]">{{ $goalPct }}%</span></span><span><span class="stat__value">{{ $snap['goal']['xp'] }}<span class="text-[14px] text-ink-faint">/{{ $snap['goal']['target'] }}</span></span><span class="stat__label block">XP mục tiêu hôm nay</span></span></div>
        <div class="card stat"><span class="stat__icon tone-gold"><x-icon name="star" /></span><span><span class="stat__value">{{ number_format($snap['xp'], 0, ',', '.') }}</span><span class="stat__label block">tổng XP</span></span></div>
        <div class="card stat"><span class="stat__icon tone-jade"><x-icon name="chart" /></span><span><span class="stat__value">{{ $u->puzzle_rating }}</span><span class="stat__label block">điểm thế cờ</span></span></div>
    </div>

    @if($weekly)
        <div class="mt-4">@include('partials.weekly-card', ['progress' => $weekly, 'compact' => true])</div>
    @endif

    @if(!$u->onboarding_level)
        <div class="card card--pad card--hero mt-4">
            <div class="font-display font-extrabold text-lg">Bạn muốn bắt đầu từ đâu?</div>
            <p class="text-ink-soft text-[14.5px] mt-1 mb-3">Chọn để chúng tôi gợi ý đúng bài và mục tiêu mỗi ngày.</p>
            <form method="POST" action="{{ route('account.onboarding') }}" class="choice-grid sm:grid-cols-2">
                @csrf
                <button type="submit" name="level" value="beginner" class="choice"><span class="choice__glyph">兵</span><span><b>Tôi mới học</b><small>Bắt đầu từ luật chơi và cách đi quân.</small></span></button>
                <button type="submit" name="level" value="intermediate" class="choice"><span class="choice__glyph">炮</span><span><b>Tôi đã biết chơi</b><small>Làm bài kiểm tra 5 thế để xếp chặng phù hợp.</small></span></button>
            </form>
        </div>
    @endif

    @if($continue)
        <div class="card continue mt-4">
            <a href="{{ route('lessons.show', $continue->slug) }}" class="continue__thumb" tabindex="-1" aria-hidden="true"><img src="{{ \App\Support\Seo::ogThumb($continue) }}" alt="" width="84" height="84"></a>
            <div class="continue__body">
                <span class="eyebrow"><x-icon name="play" /> Tiếp tục học</span>
                <div class="continue__title">{{ $continue->title }}</div>
                <div class="continue__meta">{{ $continue->series?->name ?? ($continue->phase_label ?? 'Bài học') }} · {{ $continue->move_count_label }}</div>
                @if($continueSeries)
                    <div class="flex items-center gap-2 text-[12.5px] text-ink-soft font-semibold"><span class="progress progress--sm flex-1 max-w-[260px]"><span class="progress__bar" style="width: {{ $continueSeries['pct'] }}%"></span></span>{{ $continueSeries['done'] }}/{{ $continueSeries['total'] }}</div>
                @endif
            </div>
            <a href="{{ route('lessons.show', $continue->slug) }}" class="btn btn--primary btn--lg">Học tiếp <x-icon name="arrow-right" /></a>
        </div>
    @endif
</section>
@endif

{{-- ================= THẾ CỜ HÔM NAY ================= --}}
@if($dailyUrl)
<section class="section pb-0">
    <div class="card daily-card">
        <a href="{{ $dailyUrl }}" class="daily-card__board" data-fen-thumb="{{ $dailyFen }}" @if($dailyPuzzle?->side === 'den') data-flip="1" @endif>
            <span class="sr-only">Mở thế cờ hôm nay</span>
            <div class="board-holder" aria-hidden="true"></div>
        </a>
        <div>
            <span class="eyebrow"><x-icon name="calendar" /> Thế cờ hôm nay</span>
            <h2 class="text-[22px] font-extrabold mt-1 mb-1">Tìm nước đi mạnh nhất</h2>
            <p class="text-ink-soft text-[14.5px] m-0">{{ $dailyPuzzle?->title ?? $dailyLesson?->title }}
                @if($dailyPuzzle) · {{ $dailyPuzzle->side === 'do' ? 'Đỏ' : 'Đen' }} đi, {{ $dailyPuzzle->solver_moves }} nước @endif</p>
            <div class="flex flex-wrap items-center gap-4 mt-4">
                <a href="{{ $dailyUrl }}" class="btn btn--primary btn--lg"><x-icon name="puzzle" /> Giải ngay</a>
                <span class="daily-card__timer"><x-icon name="clock" /> Thế mới sau <span data-countdown="{{ $secondsLeft }}">--:--:--</span></span>
                <span class="tag tag--xp"><x-icon name="star" /> +{{ config('gamification.xp.daily_puzzle') }} XP</span>
            </div>
        </div>
    </div>
</section>
@endif

{{-- ================= LỘ TRÌNH ================= --}}
<section class="section">
    <div class="section-head">
        <div><h2>Lộ trình học cờ tướng</h2><p>Năm chặng từ người mới đến nâng cao — luôn biết bước tiếp theo.</p></div>
        <a href="{{ route('path') }}" class="section-head__link">Xem lộ trình <x-icon name="arrow-right" /></a>
    </div>
    <div class="path-strip">
        @foreach($paths as $i => $c)
            <a href="{{ route('phase', $c['key']) }}" class="card path-step">
                <span class="path-step__n">{{ $i + 1 }}</span>
                <span class="path-step__glyph {{ $c['black'] ? 'is-black' : '' }}">{{ $c['glyph'] }}</span>
                <h3>{{ $c['name'] }}</h3>
                <p>{{ $c['desc'] }}</p>
                @if($u)
                    <span class="progress progress--sm mt-2"><span class="progress__bar" style="width: {{ $c['completion'] }}%"></span></span>
                    <span class="text-[12px] font-bold text-ink-soft">{{ $c['done'] }}/{{ $c['total'] }} bài</span>
                @else
                    <span class="text-[12.5px] font-bold text-jade-ink mt-1">{{ $c['total'] }} bài</span>
                @endif
            </a>
        @endforeach
    </div>
</section>

@if(!empty($weak))
<section class="section pt-0">
    <div class="section-head"><div><h2>Luyện điểm yếu</h2><p>Những chủ đề bạn giải đúng ít nhất gần đây.</p></div></div>
    <div class="grid gap-3 sm:grid-cols-3">
        @foreach($weak as $w)
            <a href="{{ route('practice.topic', $w['skill']) }}" class="card card--pad">
                <div class="flex justify-between font-bold"><span>{{ $w['name'] }}</span><span class="text-danger">{{ $w['accuracy'] }}%</span></div>
                <div class="progress progress--sm mt-2"><div class="progress__bar" style="width: {{ $w['accuracy'] }}%"></div></div>
            </a>
        @endforeach
    </div>
</section>
@endif

{{-- ================= LUYỆN TẬP NHANH ================= --}}
<section class="section pt-0">
    <div class="section-head">
        <div><h2>Luyện tập & chơi</h2><p>Thế cờ lấy từ chính bài học, chơi với máy hoặc thách đấu bạn bè — đều có XP.</p></div>
        <a href="{{ route('practice.hub') }}" class="section-head__link">Tất cả chế độ <x-icon name="arrow-right" /></a>
    </div>
    <div class="mode-grid">
        <a href="{{ route('practice.rush') }}" class="card mode-card"><span class="mode-card__icon tone-gold"><x-icon name="zap" /></span><span><h3>60 giây</h3><p>Giải nhanh nhất có thể trước khi hết giờ.</p></span></a>
        <a href="{{ route('practice.survival') }}" class="card mode-card"><span class="mode-card__icon tone-primary"><x-icon name="heart" /></span><span><h3>3 mạng</h3><p>Khó dần, sai 3 lần là kết thúc.</p></span></a>
        <a href="{{ route('practice.topic', 'song-xe') }}" class="card mode-card"><span class="mode-card__icon tone-jade"><x-icon name="puzzle" /></span><span><h3>Sát pháp Song Xe</h3><p>Chủ đề được luyện nhiều nhất — 10 thế mỗi lượt.</p></span></a>
        <a href="{{ route('play.bot') }}" class="card mode-card"><span class="mode-card__icon tone-ink"><x-icon name="shield" /></span><span><h3>Chơi với máy</h3><p>4 cấp độ từ Tập sự đến Khó, có gợi ý và đi lại.</p></span></a>
        <a href="{{ route('pvp.lobby') }}" class="card mode-card"><span class="mode-card__icon tone-primary"><x-icon name="sword" /></span><span><h3>Thách đấu bạn bè</h3><p>Tạo phòng, gửi link qua Zalo — chơi theo lượt có đồng hồ.</p></span></a>
    </div>
</section>

@if($featured->isNotEmpty())
<section class="section pt-0">
    <div class="section-head"><div><h2>Bài học nổi bật</h2><p>Những thế trận kinh điển, có bàn cờ đi từng nước.</p></div></div>
    <div class="lesson-list lesson-list--grid">
        @foreach($featured as $i => $lesson)
            <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card has-thumb">
                <span class="li-thumb"><img src="{{ \App\Support\Seo::ogThumb($lesson) }}" alt="{{ $lesson->title }} - Học Cờ Tướng" loading="lazy" width="56" height="56"></span>
                <span><span class="li-title">{{ $lesson->title }}</span><span class="li-sub">{{ $lesson->phase_label }} · {{ $lesson->move_count_label }}</span></span>
                <span class="li-meta"><span class="tag tag--level-{{ $lesson->level }}">{{ $lesson->level_label }}</span></span>
            </a>
        @endforeach
    </div>
</section>
@endif

<section class="section pt-0">
    <div class="grid gap-4 lg:grid-cols-[1fr_380px]">
        <div>
            <h2 class="text-[clamp(21px,3vw,27px)] font-extrabold mb-3">Vì sao học cờ tướng tại Học Cờ Tướng?</h2>
            <div class="prose">
                <p><strong>Học Cờ Tướng</strong> giúp bạn học chơi <strong>cờ tướng</strong> và <strong>cờ úp</strong> bài bản, dễ hiểu — từ người mới chưa biết luật đến kỳ thủ muốn nâng cao. Mỗi bài học đều có <strong>bàn cờ tương tác đi từng nước</strong>: bạn không chỉ đọc lý thuyết mà bấm “Tiến” để xem từng nước cờ diễn ra, kèm lời diễn giải vì sao đi nước đó.</p>
                <p>Lộ trình sắp theo các giai đoạn của ván cờ. <strong>Nhập môn</strong> dạy luật chơi và cách đi từng quân. <strong>Khai cuộc</strong> hướng dẫn bố trí quân, tranh tiên. <strong>Trung cuộc</strong> tập trung vào sát pháp — các đòn phối hợp chiếu hết. <strong>Tàn cuộc</strong> rèn kỹ thuật thắng thế cờ ít quân. Riêng <strong>cờ úp</strong> có cả luật chơi lẫn chiến thuật thực chiến.</p>
                <p>Sau mỗi bài, bạn có thể <strong>tự giải thế cờ</strong>, luyện chế độ 60 giây hay 3 mạng, nhận XP, giữ chuỗi ngày học và mở huy hiệu. Toàn bộ nội dung miễn phí.</p>
            </div>
        </div>
        <div class="card overflow-hidden self-start">
            <div class="flex items-center justify-between px-4 py-3 border-b border-line">
                <span class="font-extrabold flex items-center gap-2"><x-icon name="trophy" class="w-5 h-5 text-gold" /> Bảng xếp hạng tuần</span>
                <a href="{{ route('leaderboard') }}" class="text-[13px] font-bold">Xem tất cả</a>
            </div>
            @forelse($topWeek as $i => $r)
                <div class="lb-row">
                    <span class="lb-rank lb-rank--{{ $i + 1 }}">{{ $i + 1 }}</span>
                    <span class="avatar">@if($r['avatar'])<img src="{{ $r['avatar'] }}" alt="" referrerpolicy="no-referrer" loading="lazy">@else{{ mb_strtoupper(mb_substr($r['name'], 0, 1)) }}@endif</span>
                    <span class="lb-name">{{ $r['name'] }}<small>Cấp {{ $r['level'] }}</small></span>
                    <span class="lb-score">{{ number_format($r['score'], 0, ',', '.') }} XP</span>
                </div>
            @empty
                <div class="empty py-8"><div class="empty__glyph">帥</div><p class="m-0 text-[14px]">Tuần mới bắt đầu — giải 1 thế cờ để lên bảng đầu tiên!</p></div>
            @endforelse
        </div>
    </div>
</section>

<section class="section pt-0">
    <div class="section-head"><div><h2>Câu hỏi thường gặp</h2><p>Những thắc mắc phổ biến khi bắt đầu học cờ tướng và cờ úp.</p></div></div>
    <div class="faq-list">
        @foreach($faqs as $f)
            <details class="faq-item card">
                <summary>{{ $f[0] }}</summary>
                <div class="faq-answer">{{ $f[1] }}</div>
            </details>
        @endforeach
    </div>
</section>

@if($series->isNotEmpty())
<section class="section pt-0">
    <div class="section-head"><div><h2>Chương trình học</h2><p>Giáo trình có hệ thống, theo từng chuỗi bài.</p></div></div>
    <div class="lesson-list lesson-list--grid">
        @foreach($series as $s)
            <a href="{{ route('series', $s->slug) }}" class="card series-card">
                <span class="li-thumb"><img src="{{ \App\Support\Seo::ogThumb($s) }}" alt="{{ $s->name }} - Học Cờ Tướng" loading="lazy" width="64" height="64"></span>
                <span class="min-w-0">
                    <span class="series-card__name block">{{ $s->name }}</span>
                    <span class="series-card__meta block">{{ $s->published_lessons_count }} bài · {{ \App\Models\Lesson::PHASES[$s->phase] ?? \App\Models\Lesson::GAME_MODES[$s->game_mode] ?? 'Chương trình' }}</span>
                    <x-series-progress :series="$s" />
                </span>
            </a>
        @endforeach
    </div>
</section>
@endif
@endsection
