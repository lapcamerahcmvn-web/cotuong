@extends('layouts.app')
@section('title', ($public ? 'Ván cờ của ' . $record->user->name : $record->title()) . ' — Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@php
    $resLabel = \App\Models\GameRecord::RESULTS[$record->result] ?? '';
    $mine = $record->side === 'do';
    // Link công khai: không lộ tên người thật là đối thủ (chỉ hiện tên máy).
    $opp = $public && $record->mode === 'pvp' ? 'Bạn chơi' : $record->opponent;
    $player = $public ? $record->user->name : 'Bạn';
    $caps = collect($steps)->pluck('cap')->filter()->values();
    $isRedPc = fn (string $p) => $p === strtoupper($p);
    $glyph = ['R' => ['俥', '車'], 'N' => ['傌', '馬'], 'B' => ['相', '象'], 'A' => ['仕', '士'], 'K' => ['帥', '將'], 'C' => ['炮', '砲'], 'P' => ['兵', '卒']];
    $byMe = $caps->filter(fn ($c) => $isRedPc($c['p']) !== $mine);
    $byOpp = $caps->filter(fn ($c) => $isRedPc($c['p']) === $mine);
    $config = [
        'startFen' => $record->start_fen,
        'coupFen' => \App\Models\Game::COUP_FEN,
        'redFirst' => $record->redFirst(),
        'coup' => $record->isCoup(),
        'you' => $record->side,
        'youName' => $public ? $record->user->name : 'bạn',
        'ended' => str_contains((string) $record->reason, 'hết'),
        'steps' => collect($steps)->map(fn ($s) => ['fen' => $s['fen'], 'iccs' => $s['move_notation_iccs'], 'wxf' => $s['move_notation_wxf'],
            'side' => $s['move_side'], 'caption' => $s['caption'], 'reveal' => $s['reveal'], 'cap' => $s['cap']])->values(),
        'analysis' => $record->analysis,
        'canAnalyse' => ! $public,
        'saveUrl' => $public ? null : route('history.analysis', $record),
        'playUrl' => route('play.bot'),
    ];
@endphp

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    @if(!empty($admin))
        <a href="{{ $admin['back'] }}">Admin · Ván đấu</a><x-icon name="chev-right" />
    @elseif($public)
        <a href="{{ route('play.bot') }}">Chơi cờ</a><x-icon name="chev-right" />
    @else
        <a href="{{ route('history.index') }}">Lịch sử ván đấu</a><x-icon name="chev-right" />
    @endif
    <span>Xem lại ván</span>
</nav>

@if(session('success'))
    <div class="alert alert--ok mb-4"><x-icon name="check-circle" />{{ session('success') }}</div>
@endif

<div class="flex flex-wrap items-start justify-between gap-3">
    <div class="min-w-0">
        <h1 class="page-title">{{ $record->isCoup() ? 'Cờ úp' : 'Cờ tướng' }} · {{ $player }} cầm {{ $mine ? 'Đỏ' : 'Đen' }} vs {{ $opp }}</h1>
        <p class="page-lede">
            <span class="tag {{ $record->result === 'win' ? 'tag--done' : ($record->result === 'loss' ? 'tag--loss' : '') }}">{{ $resLabel }}</span>
            {{ $record->reason ? '— ' . $record->reason : '' }} · {{ (int) ceil($record->plies / 2) }} nước · {{ $record->created_at->format('d/m/Y') }}
            · {{ $record->mode === 'bot' ? 'Chơi với máy' : 'Đấu bạn' }}{{ $record->customStart() ? ' · từ thế tự chọn' : '' }}
        </p>
    </div>
    @unless($public)
        <div class="cluster">
            <form method="POST" action="{{ route('history.library', $record) }}">@csrf
                <button type="submit" class="btn primary"><x-icon name="bookmark" /> Lưu vào thư viện để sửa, thêm biến</button>
            </form>
            <form method="POST" action="{{ route('history.share', $record) }}">@csrf
                <button type="submit" class="btn"><x-icon name="share" /> {{ $record->share_token ? 'Tắt link chia sẻ' : 'Tạo link chia sẻ' }}</button>
            </form>
        </div>
    @endunless
</div>

@if(!empty($admin))
    {{-- Công cụ Admin (Admin › Ván đấu): xem người chơi, tải ván, tạo bài học nháp từ ván (cả ván hoặc từ 1 nước). --}}
    <div class="card card--pad mt-4">
        <div class="font-extrabold mb-2"><x-icon name="shield" class="w-4 h-4 inline" /> Công cụ Admin
            <span class="text-ink-soft font-semibold text-[13px]">· ván #{{ $record->id }}{{ $admin['level'] ? ' · máy cấp ' . $admin['level'] : '' }} · người chơi <a href="{{ $admin['user'] }}">{{ $record->user->name ?? '?' }}</a></span></div>
        <div class="flex flex-wrap gap-2 items-end">
            <a href="{{ $admin['export'] }}" class="btn btn--sm"><x-icon name="copy" /> Tải ván (.txt)</a>
            <form method="POST" action="{{ $admin['toLesson'] }}" class="flex flex-wrap gap-2 items-end">@csrf
                <label class="text-[12.5px] font-semibold">Tiêu đề bài học
                    <input class="input" name="title" required maxlength="200" value="Ván thắng máy cấp {{ $admin['level'] ?? '' }} — {{ $record->user->name ?? '' }} ({{ $record->created_at->format('d/m/Y') }})" style="min-width:300px;"></label>
                <label class="text-[12.5px] font-semibold">Chương trình
                    <select class="input" name="series_id"><option value="">— Không xếp —</option>
                        @foreach($admin['series'] as $s)<option value="{{ $s->id }}">{{ $s->name }}</option>@endforeach</select></label>
                <label class="text-[12.5px] font-semibold">Bắt đầu từ nước
                    <input class="input" type="number" name="from_ply" min="0" max="{{ max(0, $record->plies - 1) }}" value="0" style="width:90px;" title="0 = cả ván; N = bắt đầu từ thế sau N nửa nước"></label>
                <button class="btn btn--sm btn--primary"><x-icon name="edit" /> Tạo bài học nháp</button>
            </form>
        </div>
        <p class="text-[12.5px] text-ink-soft mt-2 mb-0">Bài học tạo ở trạng thái nháp, mở ngay trình sửa để thêm lời giảng từng nước. "Bắt đầu từ nước" tính theo nửa nước (0 = cả ván) — dùng để cắt đoạn trung/tàn cuộc hay.</p>
    </div>
@endif

@if(! $public && $record->share_token)
    @php $shareUrl = route('history.public', $record->share_token); @endphp
    <div class="card card--pad mt-4 flex flex-wrap items-center gap-3">
        <x-icon name="share" class="w-5 h-5 text-jade-ink" />
        <span class="flex-1 min-w-0 text-[14px]">Link xem lại công khai: <a href="{{ $shareUrl }}" class="break-all">{{ $shareUrl }}</a></span>
        <button type="button" class="btn btn--sm" data-share-text="Xem lại ván {{ $record->isCoup() ? 'cờ úp' : 'cờ tướng' }} của tôi ({{ mb_strtolower($resLabel) }}, {{ (int) ceil($record->plies / 2) }} nước) — có máy phân tích từng nước:" data-share-url="{{ $shareUrl }}"><x-icon name="share" /> Gửi bạn bè</button>
    </div>
@endif

@if(empty($steps))
    <div class="alert mt-5">Không đọc được nước đi của ván này.</div>
@else
    <div class="practice mt-5" data-review tabindex="-1">
        <script type="application/json">@json($config, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)</script>
        <div class="min-w-0 grid gap-3 content-start">
            <div class="board-card card">
                <div class="rv-evalbar" title="Ưu thế (Đỏ bên trái)"><span class="rv-evalbar__fill" data-rv-evalfill></span><b data-rv-evallabel></b></div>
                <div class="board-stage" data-rv-board></div>
                <div class="controls">
                    <button type="button" class="btn btn--icon" data-rv-first aria-label="Về đầu"><x-icon name="first" /></button>
                    <button type="button" class="btn flex-1" data-rv-prev><x-icon name="chev-left" /> Lùi</button>
                    <button type="button" class="btn btn--primary flex-1" data-rv-next>Tiến <x-icon name="chev-right" /></button>
                    <button type="button" class="btn btn--icon" data-rv-last aria-label="Về cuối"><x-icon name="last" /></button>
                    <button type="button" class="btn btn--icon btn--ghost" data-rv-flip aria-label="Lật bàn"><x-icon name="flip" /></button>
                </div>
                <div class="rv-coach" data-rv-coach aria-live="polite"></div>
            </div>
            <div class="card card--pad" data-rv-graph hidden>
                <div class="flex items-center justify-between mb-2"><span class="font-extrabold text-[14px]">Biểu đồ ưu thế</span><span class="text-[12px] text-ink-faint">trên = Đỏ hơn · bấm để xem thế cờ</span></div>
                <div data-rv-svg></div>
            </div>
        </div>
        <div class="grid gap-3 content-start">
            <div class="card card--pad" data-rv-summary></div>
            <div class="card card--pad" data-rv-moments hidden></div>
            <div class="card overflow-hidden">
                <div class="side-head"><span>Biên bản ván cờ</span><span class="text-[12px] text-ink-faint">{{ $record->plies }} nước</span></div>
                <div class="rv-moves" data-rv-moves></div>
            </div>
            @if($caps->isNotEmpty())
            <div class="card card--pad">
                <div class="font-extrabold text-[14px] mb-2">Quân bị ăn</div>
                @foreach([[$player . ' ăn được', $byMe], [$opp . ' ăn được', $byOpp]] as [$label, $list])
                    <div class="flex flex-wrap items-center gap-1.5 mb-2">
                        <span class="text-[13px] font-bold text-ink-soft w-full">{{ $label }}
                            @if($record->isCoup() && ($nap = $list->where('hidden', true)->count())) <span class="note-nap">· {{ $nap }} nắp</span> @endif
                        </span>
                        @forelse($list as $c)
                            @php $up = strtoupper($c['p']); $red = $isRedPc($c['p']); @endphp
                            <span class="cap-chip is-sm {{ $red ? 'is-red' : 'is-black' }} {{ $c['hidden'] ? 'is-nap' : '' }}" title="{{ ['R' => 'Xe', 'N' => 'Mã', 'B' => 'Tượng', 'A' => 'Sĩ', 'K' => 'Tướng', 'C' => 'Pháo', 'P' => 'Tốt'][$up] ?? '' }}{{ $c['hidden'] ? ' (ăn nắp)' : '' }}">{{ $glyph[$up][$red ? 0 : 1] ?? '?' }}</span>
                        @empty
                            <span class="text-[13px] text-ink-faint">—</span>
                        @endforelse
                    </div>
                @endforeach
            </div>
            @endif
        </div>
    </div>
@endif

@if($public)
    <div class="card card--hero card--pad mt-6 flex flex-wrap items-center gap-4">
        <span class="flex-1 min-w-0"><b class="block text-lg">Bạn cũng muốn thử sức?</b><span class="text-ink-soft text-[14px]">Chơi cờ tướng, cờ úp với máy ngay trên trình duyệt — có phân tích từng nước sau ván.</span></span>
        <a href="{{ route('play.bot', $record->isCoup() ? ['bien-the' => 'co-up'] : []) }}" class="btn btn--primary btn--lg"><x-icon name="play" /> Chơi với máy</a>
    </div>
@else
    <form method="POST" action="{{ route('history.destroy', $record) }}" class="mt-6" onsubmit="return confirm('Xoá ván này khỏi lịch sử?');">
        @csrf @method('DELETE')
        <button type="submit" class="btn btn--ghost" style="color:var(--danger);"><x-icon name="x" /> Xoá khỏi lịch sử</button>
    </form>
@endif
@endsection
