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
            <details class="unit" @if($openSeries) open @endif @unless($openSeries) data-path-lazy="{{ route('path.series', $s['slug']) }}" @endunless>
                <summary class="unit__head cursor-pointer list-none">
                    <span class="unit__name">{{ $s['name'] }}
                        <small>{{ $sTotal }} bài @if($u)· {{ $s['done'] }} đã học @endif @if(count($s['units']) > 1)· {{ count($s['units']) }} phần @endif</small>
                    </span>
                    <span class="flex items-center gap-3 shrink-0">
                        @if($u)<span class="progress progress--sm w-24 hidden sm:block"><span class="progress__bar" style="width: {{ $sTotal ? round(100 * $s['done'] / $sTotal) : 0 }}%"></span></span>@endif
                        <x-icon name="chev-down" class="w-5 h-5 text-ink-faint" />
                    </span>
                </summary>
                {{-- Chỉ in sẵn nút bài của chương trình đang mở; chương trình đóng nạp khi bấm (route path.series) —
                     lộ trình 4.000+ bài từng làm treo điện thoại. --}}
                @if($openSeries)
                    @include('partials.path-series-body', ['s' => $s, 'u' => $u, 'seriesActive' => $seriesActive])
                @else
                    <div class="text-[13px] text-ink-faint py-3" data-path-loading>Đang tải danh sách bài…</div>
                @endif
            </details>
        @endforeach
    </section>
@endforeach
</div>

@push('scripts')
<script>
// Lộ trình nhẹ cho điện thoại: (1) chương trình đóng → nạp nút bài khi mở; (2) phần đóng → dựng từ <template> khi mở;
// (3) khách: tô node đã xem từ localStorage (tiến độ khách, gộp vào tài khoản khi đăng nhập).
(function () {
    var guestIds = {};
    @guest try { JSON.parse(localStorage.getItem('xq.guest.lessons') || '[]').forEach(function (id) { guestIds[id] = 1; }); } catch (e) {} @endguest
    function paint(root) {
        root.querySelectorAll('[data-lesson-node]').forEach(function (n) { if (guestIds[n.getAttribute('data-lesson-node')]) n.classList.add('is-reading'); });
    }
    function wireUnits(root) {
        root.querySelectorAll('details[data-unit-tpl]').forEach(function (d) {
            d.addEventListener('toggle', function () {
                var t = d.querySelector('template');
                if (!d.open || !t) return;
                d.appendChild(t.content.cloneNode(true)); t.remove(); paint(d);
            });
        });
    }
    document.querySelectorAll('details[data-path-lazy]').forEach(function (d) {
        d.addEventListener('toggle', function () {
            if (!d.open || d.dataset.loaded) return;
            d.dataset.loaded = '1';
            fetch(d.getAttribute('data-path-lazy'), { credentials: 'same-origin', headers: { 'X-Requested-With': 'XMLHttpRequest' } })
                .then(function (r) { if (!r.ok) throw r; return r.text(); })
                .then(function (html) {
                    var box = d.querySelector('[data-path-loading]');
                    var tmp = document.createElement('div'); tmp.innerHTML = html;
                    while (tmp.firstChild) d.insertBefore(tmp.firstChild, box);
                    box.remove(); wireUnits(d); paint(d);
                })
                .catch(function () { d.dataset.loaded = ''; var box = d.querySelector('[data-path-loading]'); if (box) box.textContent = 'Không tải được — bấm đóng rồi mở lại.'; });
        });
    });
    wireUnits(document); paint(document);
})();
</script>
@endpush
@endsection
