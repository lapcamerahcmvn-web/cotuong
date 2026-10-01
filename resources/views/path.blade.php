@extends('layouts.app')
@section('title', 'Lộ Trình Học Cờ Tướng Từ Cơ Bản Đến Nâng Cao — Học Cờ Tướng')
@section('description', 'Lộ trình học cờ tướng 5 chặng: nhập môn, khai cuộc, trung cuộc (sát pháp), tàn cuộc và cờ úp. Theo dõi tiến độ từng bài, luôn biết bước học tiếp theo.')

@push('head')
{!! \App\Support\Seo::ld([
    '@context' => 'https://schema.org', '@type' => 'ItemList', 'name' => 'Lộ trình học cờ tướng',
    'itemListElement' => collect(array_values($courses))->map(fn ($c, $i) => [
        '@type' => 'ListItem', 'position' => $i + 1, 'name' => $c['name'], 'url' => route('phase', $c['key']),
    ])->all(),
]) !!}
@endpush

@section('content')
@php $u = auth()->user(); @endphp
<nav class="crumbs" aria-label="breadcrumb"><a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>Lộ trình học</span></nav>

<section class="grid gap-4 lg:grid-cols-[1fr_340px] lg:items-end mb-6">
    <div>
        <div class="eyebrow"><x-icon name="map" /> Lộ trình</div>
        <h1 class="page-title mt-1">Lộ trình học cờ tướng</h1>
        <p class="page-lede">Học theo thứ tự từ trên xuống — nút <span class="font-bold text-primary-ink">đỏ</span> là bài nên học tiếp. Không có bài nào bị khoá: bạn vẫn có thể mở bất kỳ bài nào trong thư viện.</p>
    </div>
    <div class="card card--pad">
        <div class="flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-semibold text-ink-soft">
            <span class="flex items-center gap-2"><span class="node is-done !w-6 !h-6 !text-[10px]"><x-icon name="check" class="!w-3 !h-3" /></span> Đã học</span>
            <span class="flex items-center gap-2"><span class="node is-next !w-6 !h-6 !animate-none !text-[10px]"></span> Học tiếp</span>
            <span class="flex items-center gap-2"><span class="node is-reading !w-6 !h-6 !text-[10px]"></span> Đang học</span>
            <span class="flex items-center gap-2"><span class="node !w-6 !h-6 !text-[10px]"></span> Chưa học</span>
        </div>
        @guest<p class="text-[13px] text-ink-faint mt-3 mb-0"><a href="{{ route('login') }}" class="font-bold">Đăng nhập</a> để lưu tiến độ trên lộ trình.</p>@endguest
    </div>
</section>

<div class="grid gap-5">
@foreach($courses as $key => $c)
    <section class="card course" id="chang-{{ $key }}">
        <div class="course__head">
            <span class="course__glyph" @if($c['black']) style="color:var(--xq-black);box-shadow:inset 0 0 0 2px var(--xq-black),inset 0 0 0 6px var(--xq-disc)" @endif>{{ $c['glyph'] }}</span>
            <div class="flex-1 min-w-0">
                <div class="text-[12px] font-extrabold text-ink-faint uppercase tracking-wider">Chặng {{ $loop->iteration }}</div>
                <h2 class="course__title">{{ $c['name'] }}</h2>
                <p class="course__sub">{{ $c['desc'] }} · {{ $c['total'] }} bài</p>
            </div>
            @if($u)
                <div class="text-center shrink-0">
                    <span class="ring" style="--p: {{ $c['mastery'] }}"><span>{{ $c['mastery'] }}%</span></span>
                    <div class="text-[11px] font-bold text-ink-faint mt-1">Thông thạo</div>
                </div>
            @endif
        </div>

        @php
            $hasNext = collect($c['series_list'])->contains(fn ($s) => collect($s['units'])->flatMap(fn ($un) => $un['nodes'])->contains('state', 'next'));
        @endphp
        @foreach($c['series_list'] as $si => $s)
            @php
                $allNodes = collect($s['units'])->flatMap(fn ($un) => $un['nodes']);
                $seriesActive = $allNodes->contains('state', 'next');
                $openSeries = $seriesActive || (! $hasNext && $si === 0);
                $sTotal = $allNodes->count();
            @endphp
            <details class="unit" @if($openSeries) open @endif>
                <summary class="unit__head cursor-pointer list-none">
                    <span class="unit__name">{{ $s['name'] }}
                        <small>{{ $sTotal }} bài @if($u)· {{ $s['done'] }} đã học @endif @if(count($s['units']) > 1)· {{ count($s['units']) }} phần @endif</small>
                    </span>
                    <span class="flex items-center gap-3 shrink-0">
                        @if($u)<span class="progress progress--sm w-24 hidden sm:block"><span class="progress__bar" style="width: {{ $sTotal ? round(100 * $s['done'] / $sTotal) : 0 }}%"></span></span>@endif
                        <x-icon name="chev-down" class="w-5 h-5 text-ink-faint" />
                    </span>
                </summary>
                @foreach($s['units'] as $ui => $unit)
                    @php $unitActive = collect($unit['nodes'])->contains('state', 'next') || (! $seriesActive && $ui === 0); @endphp
                    @if(count($s['units']) > 1)
                        <details class="mt-2" @if($unitActive) open @endif>
                            <summary class="cursor-pointer text-[13.5px] font-bold text-ink-soft py-2 list-none flex items-center gap-2">
                                <x-icon name="chev-right" class="w-4 h-4" /> Phần {{ $unit['index'] }} · bài {{ $unit['nodes'][0]['n'] }}–{{ end($unit['nodes'])['n'] }}
                                @if($u)<span class="text-ink-faint font-semibold">({{ $unit['done'] }}/{{ count($unit['nodes']) }})</span>@endif
                            </summary>
                    @endif
                    <div class="nodes pb-1">
                        @foreach($unit['nodes'] as $n)
                            <a href="{{ route('lessons.show', $n['slug']) }}" title="{{ $n['n'] }}. {{ $n['title'] }}" aria-label="Bài {{ $n['n'] }}: {{ $n['title'] }}"
                               class="node is-{{ $n['state'] }}" data-lesson-node="{{ $n['id'] }}">
                                @if($n['state'] === 'done')<x-icon name="check" />@else{{ $n['n'] }}@endif
                            </a>
                        @endforeach
                    </div>
                    @if(count($s['units']) > 1)</details>@endif
                @endforeach
                <a href="{{ route('series', $s['slug']) }}" class="inline-flex items-center gap-1 text-[13px] font-bold mt-3">Xem danh sách bài <x-icon name="arrow-right" class="w-4 h-4" /></a>
            </details>
        @endforeach
    </section>
@endforeach
</div>

@guest
@push('scripts')
<script>
// Khách: tô node đã xem từ localStorage (tiến độ khách, gộp vào tài khoản khi đăng nhập).
(function () { try {
    var ids = JSON.parse(localStorage.getItem('xq.guest.lessons') || '[]');
    ids.forEach(function (id) { var n = document.querySelector('[data-lesson-node="' + id + '"]'); if (n) n.classList.add('is-reading'); });
} catch (e) {} })();
</script>
@endpush
@endguest
@endsection
