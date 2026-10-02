@extends('layouts.app')
@section('title', $record->title() . ' — Lịch sử ván đấu')
@section('robots', 'noindex, nofollow')

@php
    $resLabel = \App\Models\GameRecord::RESULTS[$record->result] ?? '';
    $caps = collect($steps)->pluck('cap')->filter()->values();
    $isRedPc = fn (string $p) => $p === strtoupper($p);
    $glyph = ['R' => ['俥', '車'], 'N' => ['傌', '馬'], 'B' => ['相', '象'], 'A' => ['仕', '士'], 'K' => ['帥', '將'], 'C' => ['炮', '砲'], 'P' => ['兵', '卒']];
    $mine = $record->side === 'do';
    // Quân bạn ăn được = quân của đối phương bị ăn.
    $byMe = $caps->filter(fn ($c) => $isRedPc($c['p']) !== $mine);
    $byOpp = $caps->filter(fn ($c) => $isRedPc($c['p']) === $mine);
@endphp

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('history.index') }}">Lịch sử ván đấu</a><x-icon name="chev-right" />
    <span>Xem lại ván</span>
</nav>

<div class="flex flex-wrap items-start justify-between gap-3">
    <div>
        <h1 class="page-title">{{ $record->isCoup() ? 'Cờ úp' : 'Cờ tướng' }} · cầm {{ $mine ? 'Đỏ' : 'Đen' }} vs {{ $record->opponent }}</h1>
        <p class="page-lede">
            <span class="tag {{ $record->result === 'win' ? 'tag--done' : ($record->result === 'loss' ? 'tag--loss' : '') }}">{{ $resLabel }}</span>
            {{ $record->reason ? '— ' . $record->reason : '' }} · {{ (int) ceil($record->plies / 2) }} nước · {{ $record->created_at->format('d/m/Y H:i') }}
            · {{ $record->mode === 'bot' ? 'Chơi với máy' : 'Đấu bạn' }}
        </p>
    </div>
    <div class="cluster">
        <form method="POST" action="{{ route('history.library', $record) }}">@csrf
            <button type="submit" class="btn primary"><x-icon name="bookmark" /> Lưu vào thư viện để sửa, thêm biến</button>
        </form>
        @if($record->mode === 'bot')
            <a href="{{ route('play.bot') }}" class="btn"><x-icon name="play" /> Chơi ván mới</a>
        @else
            <a href="{{ route('pvp.lobby') }}" class="btn"><x-icon name="sword" /> Đấu ván mới</a>
        @endif
    </div>
</div>

@if(empty($steps))
    <div class="alert mt-5">Không đọc được nước đi của ván này.</div>
@else
    <div class="mt-5" data-needs-board>
        <x-chess-board :initial-fen="$record->start_fen" :steps="$steps" :show-list="true" />
    </div>

    @if($caps->isNotEmpty())
    <section class="card card--pad mt-5">
        <h2 class="text-lg font-extrabold mb-3">Quân bị ăn</h2>
        @foreach([['Bạn ăn được', $byMe], [$record->opponent . ' ăn được', $byOpp]] as [$label, $list])
            <div class="flex flex-wrap items-center gap-2 mb-2">
                <span class="text-[13.5px] font-bold text-ink-soft min-w-32">{{ $label }}</span>
                @forelse($list as $c)
                    @php $up = strtoupper($c['p']); $red = $isRedPc($c['p']); @endphp
                    <span class="cap-chip is-sm {{ $red ? 'is-red' : 'is-black' }} {{ $c['hidden'] ? 'is-nap' : '' }}" title="{{ ['R' => 'Xe', 'N' => 'Mã', 'B' => 'Tượng', 'A' => 'Sĩ', 'K' => 'Tướng', 'C' => 'Pháo', 'P' => 'Tốt'][$up] ?? '' }}{{ $c['hidden'] ? ' (ăn nắp)' : '' }}">{{ $glyph[$up][$red ? 0 : 1] ?? '?' }}</span>
                @empty
                    <span class="text-[13px] text-ink-faint">—</span>
                @endforelse
                @if($record->isCoup() && ($n = $list->where('hidden', true)->count()))
                    <span class="note-nap text-[13px]">{{ $n }} nắp</span>
                @endif
            </div>
        @endforeach
    </section>
    @endif

    <p class="muted text-[13.5px] mt-4">Mẹo: bấm "Lưu vào thư viện" để mở ván trong trình soạn — đi lại từ 1 nước bất kỳ để tạo nhánh biến (ví dụ nước lẽ ra nên đi), ghi chú rồi bấm "Cập nhật thế cờ".</p>
@endif

<form method="POST" action="{{ route('history.destroy', $record) }}" class="mt-6" onsubmit="return confirm('Xoá ván này khỏi lịch sử?');">
    @csrf @method('DELETE')
    <button type="submit" class="btn btn--ghost" style="color:var(--danger);"><x-icon name="x" /> Xoá khỏi lịch sử</button>
</form>
@endsection
