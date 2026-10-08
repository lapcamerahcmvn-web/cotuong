@extends('layouts.app')

@section('title', $lesson->seo_title ?: (mb_strlen($lesson->title) <= 55 ? $lesson->title . ' — Học Cờ Tướng' : \Illuminate\Support\Str::limit($lesson->title, 60, '…')))
@section('description', \Illuminate\Support\Str::limit(strip_tags($lesson->seo_description ?: $lesson->summary ?: ($lesson->title . ' — học cờ tướng qua bàn cờ tương tác, diễn giải từng nước đi.')), 155))
@section('og_title', $lesson->title)
@section('og_type', 'article')
@section('og_image', \App\Support\Seo::ogImage($lesson))
@section('og_image_alt', 'Thế cờ bài học: ' . $lesson->title . ' — Học Cờ Tướng')

@push('head')
<meta property="article:published_time" content="{{ $lesson->published_at?->toIso8601String() }}">
<meta property="article:modified_time" content="{{ $lesson->updated_at?->toIso8601String() }}">
@if($lesson->phase)<meta property="article:section" content="{{ $lesson->phase_label }}">@endif
@php
    $_ogImage = \App\Support\Seo::ogImage($lesson);

    $ldArticle = array_filter([
        '@context' => 'https://schema.org',
        '@type' => ['Article', 'LearningResource'],
        'headline' => $lesson->title,
        'description' => \Illuminate\Support\Str::limit(strip_tags($lesson->summary ?: ''), 300),
        'inLanguage' => 'vi-VN',
        'learningResourceType' => 'lesson',
        'educationalLevel' => $lesson->level_label,
        'timeRequired' => $lesson->time_required_iso,
        'image' => $_ogImage,
        'author' => ['@id' => url('/#org')],
        'publisher' => ['@id' => url('/#org')],
        'isPartOf' => $lesson->series ? ['@type' => 'Course', 'name' => $lesson->series->name, 'url' => route('series', $lesson->series->slug)] : null,
        'datePublished' => $lesson->published_at?->toIso8601String(),
        'dateModified' => $lesson->updated_at?->toIso8601String(),
        'mainEntityOfPage' => url()->current(),
        // GEO: gợi ý phần nội dung nên đọc cho trợ lý AI / tìm kiếm bằng giọng nói.
        'speakable' => ['@type' => 'SpeakableSpecification', 'cssSelector' => ['.title', '.prose']],
    ]);

    $crumbs = [['@type' => 'ListItem', 'position' => 1, 'name' => 'Trang chủ', 'item' => route('home')]];
    if ($lesson->phase) {
        $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $lesson->phase_label, 'item' => route('phase', $lesson->phase)];
    }
    if ($lesson->series) {
        $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $lesson->series->name, 'item' => route('series', $lesson->series->slug)];
    }
    $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $lesson->title];
    $ldCrumb = ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $crumbs];

    // HowTo schema cho bài hướng dẫn cách đi quân (nhập môn, có nước demo) — hỗ trợ rich result.
    $ldHowTo = null;
    if ($lesson->phase === 'nhap-mon' && $lesson->game_mode === 'co-tuong' && $lesson->steps->isNotEmpty()) {
        $ldHowTo = [
            '@context' => 'https://schema.org', '@type' => 'HowTo',
            'name' => $lesson->title,
            'description' => \Illuminate\Support\Str::limit(strip_tags($lesson->summary ?: ''), 250),
            'inLanguage' => 'vi-VN',
            'step' => $lesson->steps->values()->map(fn ($s, $i) => [
                '@type' => 'HowToStep', 'position' => $i + 1,
                'name' => $s->move_notation_wxf ?: ('Bước ' . ($i + 1)),
                'text' => $s->caption ?: ($s->move_notation_wxf ?: ('Bước ' . ($i + 1))),
            ])->all(),
        ];
    }
@endphp
<script type="application/ld+json">{!! json_encode($ldArticle, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
<script type="application/ld+json">{!! json_encode($ldCrumb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@if($ldHowTo)<script type="application/ld+json">{!! json_encode($ldHowTo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>@endif
@endpush

@section('content')
@php
    $hasBoard = $lesson->initial_fen || $lesson->steps->isNotEmpty();
    $canPuzzle = $lesson->puzzle_side && $lesson->steps->isNotEmpty();
    // Đoán nước (học chủ động): mọi ván cờ tướng có từ 4 nước — cờ úp không áp dụng (nước lật quân không đoán được).
    $canGuess = $lesson->game_mode !== 'co-up' && $lesson->steps->count() >= 4;
    $practiceUrl = $practiceSkill ? route('practice.topic', $practiceSkill) : ($canPuzzle ? route('practice.hub') : null);
@endphp
<div data-lesson-page
     data-lesson-id="{{ $lesson->id }}"
     data-phase="{{ $lesson->phase }}"
     data-is-text="{{ $lesson->steps->isEmpty() ? '1' : '0' }}"
     data-completed="{{ $completed ? '1' : '0' }}"
     data-progress-url="{{ route('progress.store', $lesson->id) }}"
     data-puzzle-id="{{ $lessonPuzzleId }}"
     data-next-url="{{ $suggestNext ? route('lessons.show', $suggestNext->slug) : '' }}"
     data-min-seconds="{{ $lesson->steps->isEmpty() ? 15 : \App\Http\Controllers\ProgressController::minSeconds($lesson) }}"
     data-practice-url="{{ $practiceUrl }}">

    <nav class="crumbs" aria-label="breadcrumb">
        <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
        @if($lesson->phase)<a href="{{ route('phase', $lesson->phase) }}">{{ $lesson->phase_label }}</a><x-icon name="chev-right" />@endif
        @if($lesson->series)<a href="{{ route('series', $lesson->series->slug) }}">{{ \Illuminate\Support\Str::limit($lesson->series->name, 30) }}</a><x-icon name="chev-right" />@endif
        <span>{{ \Illuminate\Support\Str::limit($lesson->title, 40) }}</span>
    </nav>

    <header class="lesson-head">
        <h1 class="title">{{ $lesson->title }}</h1>
        <div class="meta-row">
            <span class="tag tag--level-{{ $lesson->level }}">{{ $lesson->level_label }}</span>
            <span class="tag count">{{ $lesson->move_count_badge }}</span>
            @if($canPuzzle)<span class="tag"><x-icon name="puzzle" /> Có thể tự giải</span>@endif
            <span id="lesson-done-badge" class="tag tag--done" @unless($completed) hidden @endunless><x-icon name="check" /> Đã học</span>
        </div>
        @if($lesson->series && $seriesTotal)
            <div class="lesson-progress">
                <span>Bài {{ $seriesPos }}/{{ $seriesTotal }}</span>
                <div class="progress progress--sm"><div class="progress__bar" style="width: {{ round(100 * ($seriesDone ?: $seriesPos - 1) / $seriesTotal) }}%"></div></div>
                @auth<span>{{ $seriesDone }} đã học</span>@endauth
            </div>
        @endif
    </header>

    @if($hasBoard)
        @if($canPuzzle || $canGuess)
            <div class="seg" role="tablist" aria-label="Chế độ bàn cờ">
                <button type="button" class="seg__btn is-on" data-board-mode="view" role="tab" aria-selected="true"><x-icon name="book" /> Xem lời giảng</button>
                @if($canGuess)<button type="button" class="seg__btn" data-board-mode="guess" role="tab" aria-selected="false"><x-icon name="target" /> Đoán nước</button>@endif
                @if($canPuzzle)<button type="button" class="seg__btn" data-board-mode="puzzle" role="tab" aria-selected="false"><x-icon name="puzzle" /> Thử tự giải</button>@endif
            </div>
            <div id="lesson-board-view">
                <x-chess-board :initial-fen="$lesson->initial_fen" :steps="$lesson->steps" :tree="$lesson->variation_tree"
                    :show-list="true" :source-lesson-id="$lesson->id" />
            </div>
            @if($canGuess)
                <div id="lesson-board-guess" hidden>
                    <div class="max-w-xl">
                        <x-chess-board :initial-fen="$lesson->initial_fen" :steps="$lesson->steps" mode="guess" :source-lesson-id="$lesson->id" />
                    </div>
                </div>
            @endif
            @if($canPuzzle)
                <div id="lesson-board-puzzle" hidden>
                    <div class="max-w-xl">
                        <x-chess-board :initial-fen="$lesson->initial_fen" :steps="$lesson->steps" mode="puzzle"
                            :puzzle-side="$lesson->puzzle_side" :source-lesson-id="$lesson->id" />
                    </div>
                </div>
            @endif
        @else
            <x-chess-board :initial-fen="$lesson->initial_fen" :steps="$lesson->steps" :tree="$lesson->variation_tree"
                :show-list="$lesson->steps->isNotEmpty()"
                :caption="$lesson->game_mode === 'co-up' && $lesson->steps->isEmpty() ? 'Thế mở cờ úp: 30 quân úp sấp mặt (chưa lộ binh chủng), hai Tướng để ngửa. Quân úp đi theo binh chủng của ô xuất phát cho tới khi lật.' : null"
                :source-lesson-id="$lesson->id" />
        @endif
        @php
            // Bài tàn cuộc: cho máy tự giải / đánh thử với máy ngay từ thế mở đầu của bài.
            $engineFen = $lesson->game_mode !== 'co-up' && $lesson->phase === 'tan-cuoc' && $lesson->initial_fen ? $lesson->initial_fen : null;
            $engineSide = optional($lesson->steps->first())->move_side ?: ($lesson->puzzle_side ?: 'do');
        @endphp
        @if($engineFen)
            <div class="engine-tools card mt-3 max-w-[740px]" style="padding:12px 14px;display:flex;flex-wrap:wrap;gap:10px 12px;align-items:center">
                <span style="flex:1 1 220px;display:flex;align-items:center;gap:12px;min-width:0">
                    <x-mini-board :fen="$engineFen" :size="64" style="flex:none;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,.25)" />
                    <span class="text-ink-soft" style="font-size:13.5px;line-height:1.45">Thẩm thế cờ này với máy<br>({{ $engineSide === 'den' ? 'Đen' : 'Đỏ' }} đi trước)</span>
                </span>
                <a class="btn btn--primary" rel="nofollow" href="{{ route('play.bot', ['tu-the' => $engineFen, 'luot' => $engineSide, 'cam' => 'may', 'cap' => 4, 'bai' => $lesson->slug]) }}"><x-icon name="cpu" /> Máy tự giải</a>
                <a class="btn" rel="nofollow" href="{{ route('play.bot', ['tu-the' => $engineFen, 'luot' => $engineSide, 'cam' => $engineSide, 'cap' => 4, 'bai' => $lesson->slug]) }}"><x-icon name="play" /> Đánh thử với máy</a>
            </div>
        @endif
    @endif

    <div class="lesson-body">
        <div class="min-w-0">
            @if($lesson->content)
                <article class="prose">{!! $lesson->content !!}</article>
            @elseif($lesson->summary)
                <article class="prose"><p>{{ $lesson->summary }}</p></article>
            @else
                <div class="notice max-w-[740px]">Phần diễn giải chi tiết đang được biên soạn. Bạn vẫn có thể đi lại từng nước trên bàn cờ ở trên để theo dõi thế trận.</div>
            @endif

            <div class="mt-8 max-w-[740px]">
                <x-share-buttons :url="url()->current()" :title="$lesson->title" :image="\App\Support\Seo::ogImage($lesson)" />
            </div>

            @if($prev || $next)
            <nav class="lesson-nav mt-6 max-w-[740px]" aria-label="Bài trước / bài sau">
                @if($prev)
                    <a href="{{ route('lessons.show', $prev->slug) }}" class="card"><small><x-icon name="chev-left" /> Bài trước</small><span>{{ $prev->title }}</span></a>
                @else<span></span>@endif
                @if($next)
                    <a href="{{ route('lessons.show', $next->slug) }}" class="card is-next"><small>Bài tiếp <x-icon name="chev-right" /></small><span>{{ $next->title }}</span></a>
                @endif
            </nav>
            @endif

            @if($related->isNotEmpty())
            <section class="mt-10 max-w-[740px]">
                <h2 class="text-xl font-extrabold mb-3">Bài liên quan</h2>
                <div class="lesson-list">
                    @foreach($related as $r)
                        <a href="{{ route('lessons.show', $r->slug) }}" class="lesson-item card has-thumb">
                            <span class="li-thumb"><img src="{{ \App\Support\Seo::ogThumb($r) }}" alt="{{ $r->title }} - Học Cờ Tướng" loading="lazy" width="56" height="56"></span>
                            <span><span class="li-title">{{ $r->title }}</span><span class="li-sub">{{ $r->move_count_label }} · {{ $r->level_label }}</span></span>
                            <span class="li-meta"><x-icon name="chev-right" /></span>
                        </a>
                    @endforeach
                </div>
            </section>
            @endif

            @if($posts->isNotEmpty())
            <section class="mt-10 max-w-[740px]">
                <h2 class="text-xl font-extrabold mb-3">Bài viết liên quan</h2>
                <div class="lesson-list">
                    @foreach($posts as $p)
                        <a href="{{ route('posts.show', [$p->category?->slug ?: 'tin-tuc', $p->slug]) }}" class="lesson-item card has-thumb">
                            <span class="li-thumb"><img src="{{ \App\Support\Seo::postImage($p, true) }}" alt="{{ $p->title }}" loading="lazy" width="56" height="56"></span>
                            <span><span class="li-title">{{ $p->title }}</span><span class="li-sub">{{ $p->category?->name ?? 'Tin tức' }}</span></span>
                            <span class="li-meta"><x-icon name="chev-right" /></span>
                        </a>
                    @endforeach
                </div>
            </section>
            @endif

            @include('lessons._comments')
        </div>

        <aside class="lesson-aside" aria-label="Học tiếp">
            @if(!empty($suggestNext))
            <div class="card card--pad">
                <div class="eyebrow"><x-icon name="arrow-right" /> Học tiếp</div>
                <div class="font-display font-extrabold text-[17px] leading-snug mt-2">{{ $suggestNext->title }}</div>
                <div class="text-[13px] text-ink-soft mt-1">{{ $suggestNext->series?->name ?? (\App\Models\Lesson::PHASES[$suggestNext->phase] ?? 'Bài học') }}</div>
                <a href="{{ route('lessons.show', $suggestNext->slug) }}" class="btn btn--primary btn--block mt-4">Học bài này</a>
            </div>
            @endif

            @if($practiceUrl)
            <a href="{{ $practiceUrl }}" class="card card--pad flex gap-3 items-center">
                <span class="stat__icon tone-jade"><x-icon name="puzzle" /></span>
                <span><span class="block font-bold">Luyện thế cờ cùng chủ đề</span><span class="block text-[13px] text-ink-soft">Củng cố ngay điều vừa học — có tính XP.</span></span>
            </a>
            @endif

            @if($lesson->series)
            <a href="{{ route('series', $lesson->series->slug) }}" class="card card--pad block">
                <div class="eyebrow"><x-icon name="layers" /> Chương trình</div>
                <div class="font-bold mt-2 leading-snug">{{ $lesson->series->name }}</div>
                @if($seriesTotal)
                    <div class="progress progress--sm mt-3"><div class="progress__bar" style="width: {{ round(100 * $seriesDone / $seriesTotal) }}%"></div></div>
                    <div class="text-[12.5px] text-ink-soft mt-1.5">{{ $seriesDone }}/{{ $seriesTotal }} bài đã học</div>
                @endif
            </a>
            @endif

            @guest
            <div class="card card--pad card--hero">
                <div class="font-bold">Lưu tiến độ của bạn</div>
                <p class="text-[13.5px] text-ink-soft mt-1 mb-3">Đăng nhập để nhận XP, giữ chuỗi ngày học và mở huy hiệu.</p>
                <a href="{{ route('login') }}" class="btn btn--primary btn--block">Đăng nhập miễn phí</a>
            </div>
            @endguest
        </aside>
    </div>

    {{-- Thanh "Đã học · Bài tiếp theo" (lesson.js): ẩn bình thường để không che diễn biến nước đi; trượt lên ở đáy màn hình khi
         chạy tới nước cuối / tự giải đúng / đọc hết bài, tự ẩn sau 3 giây nếu không bấm. --}}
    <div class="lesson-nextbar" data-lesson-nextbar data-state="{{ $completed ? 'done' : 'locked' }}" role="status" aria-live="polite" hidden>
        <span class="lesson-nextbar__hint" data-nextbar-hint>
            @if($completed) <x-icon name="check" /> Đã học bài này
            @elseif($lesson->steps->isEmpty()) Đọc hết bài để đánh dấu đã học
            @else Xem hết các nước{{ $canPuzzle ? ' hoặc tự giải đúng' : '' }} để đánh dấu đã học
            @endif
        </span>
        <button type="button" class="btn btn--primary" data-nextbar-btn @unless($completed) disabled @endunless>
            <x-icon name="check" /> {{ $suggestNext ? 'Đã học · Bài tiếp theo' : 'Đánh dấu đã học' }} @if($suggestNext)<x-icon name="arrow-right" />@endif
        </button>
        <button type="button" class="lesson-nextbar__close" data-nextbar-close aria-label="Ẩn"><x-icon name="x" /></button>
    </div>
</div>
@endsection
