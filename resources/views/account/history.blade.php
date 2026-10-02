@extends('layouts.app')
@section('title', 'Lịch sử ván đấu — Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@php
    $tone = ['win' => 'tag--done', 'loss' => 'tag--loss', 'draw' => ''];
    $link = fn (array $over) => route('history.index', array_filter(array_merge($f, $over)));
@endphp

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('account.index') }}">Hồ sơ</a><x-icon name="chev-right" />
    <span>Lịch sử ván đấu</span>
</nav>

<h1 class="page-title">Lịch sử ván đấu</h1>
<p class="page-lede">Mọi ván bạn chơi với máy và đấu bạn được lưu tự động. Bấm vào ván để xem lại từng nước, hoặc chép vào thư viện để chỉnh sửa và thêm nhánh biến.</p>

@if(session('success'))
    <div class="alert alert--ok mt-4"><x-icon name="check-circle" />{{ session('success') }}</div>
@endif

<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
    <div class="card stat"><span class="stat__icon tone-ink"><x-icon name="layers" /></span><span><span class="stat__value">{{ $stats['total'] }}</span><span class="stat__label block">Ván đã lưu</span></span></div>
    <div class="card stat"><span class="stat__icon tone-jade"><x-icon name="trophy" /></span><span><span class="stat__value">{{ $stats['win'] }}</span><span class="stat__label block">Thắng</span></span></div>
    <div class="card stat"><span class="stat__icon tone-primary"><x-icon name="x-circle" /></span><span><span class="stat__value">{{ $stats['loss'] }}</span><span class="stat__label block">Thua</span></span></div>
    <div class="card stat"><span class="stat__icon tone-gold"><x-icon name="repeat" /></span><span><span class="stat__value">{{ $stats['draw'] }}</span><span class="stat__label block">Hoà</span></span></div>
</div>

<div class="chips mt-5" role="navigation" aria-label="Lọc ván đấu">
    <a href="{{ $link(['loai' => null]) }}" class="chip {{ !$f['loai'] ? 'is-on' : '' }}">Tất cả</a>
    <a href="{{ $link(['loai' => 'bot']) }}" class="chip {{ $f['loai'] === 'bot' ? 'is-on' : '' }}">Với máy</a>
    <a href="{{ $link(['loai' => 'pvp']) }}" class="chip {{ $f['loai'] === 'pvp' ? 'is-on' : '' }}">Đấu bạn</a>
    <span class="chips__sep"></span>
    <a href="{{ $link(['bien-the' => $f['bien-the'] === 'co-tuong' ? null : 'co-tuong']) }}" class="chip {{ $f['bien-the'] === 'co-tuong' ? 'is-on' : '' }}">Cờ tướng</a>
    <a href="{{ $link(['bien-the' => $f['bien-the'] === 'co-up' ? null : 'co-up']) }}" class="chip {{ $f['bien-the'] === 'co-up' ? 'is-on' : '' }}">Cờ úp</a>
    <span class="chips__sep"></span>
    @foreach(\App\Models\GameRecord::RESULTS as $k => $label)
        <a href="{{ $link(['ket-qua' => $f['ket-qua'] === $k ? null : $k]) }}" class="chip {{ $f['ket-qua'] === $k ? 'is-on' : '' }}">{{ $label }}</a>
    @endforeach
</div>

@if($records->isEmpty())
    <div class="card card--pad mt-5 text-center">
        <x-icon name="sword" class="mx-auto w-10 h-10 text-ink-faint" />
        <p class="mt-2 text-ink-soft">{{ $stats['total'] ? 'Không có ván nào khớp bộ lọc.' : 'Chưa có ván nào — chơi 1 ván với máy hoặc mời bạn đấu, ván sẽ tự lưu vào đây.' }}</p>
        <div class="cluster justify-center mt-4">
            <a href="{{ route('play.bot') }}" class="btn primary">Chơi với máy</a>
            <a href="{{ route('pvp.lobby') }}" class="btn">Đấu với bạn</a>
        </div>
    </div>
@else
    <div class="lesson-list mt-4">
        @foreach($records as $r)
            <a href="{{ route('history.show', $r) }}" class="lesson-item card">
                <span class="li-num hist-res hist-res--{{ $r->result }}" aria-label="{{ \App\Models\GameRecord::RESULTS[$r->result] }}"><x-icon :name="['win' => 'trophy', 'loss' => 'x-circle', 'draw' => 'repeat'][$r->result] ?? 'sword'" /></span>
                <span>
                    <span class="li-title">{{ $r->isCoup() ? 'Cờ úp' : 'Cờ tướng' }} · cầm {{ $r->side === 'do' ? 'Đỏ' : 'Đen' }} vs {{ $r->opponent }}</span>
                    <span class="li-sub">
                        {{ $r->created_at->format('d/m/Y H:i') }} · {{ (int) ceil($r->plies / 2) }} nước
                        @if($r->reason) · {{ $r->reason }} @endif
                    </span>
                </span>
                <span class="li-meta"><span class="tag {{ $tone[$r->result] ?? '' }}">{{ \App\Models\GameRecord::RESULTS[$r->result] }}</span></span>
            </a>
        @endforeach
    </div>
    <div class="mt-5">{{ $records->links() }}</div>
@endif
@endsection
