@extends('layouts.app')
@section('title', 'Luyện Sát Pháp Cờ Tướng Từ 1 Đến 10 Nước — Học Cờ Tướng')
@section('description', 'Luyện sát pháp cờ tướng theo 10 bậc từ dễ đến khó: chiếu hết 1 nước, 2 nước… tới 10 nước. Giải đúng đủ thế để mở bậc tiếp theo, lời giải được máy kiểm chứng.')

@push('head')
{!! \App\Support\Seo::ld(\App\Support\Seo::appLd('Luyện sát pháp 1 → 10 nước', 'Bài tập chiếu hết cờ tướng chia 10 bậc từ dễ đến khó, mở khoá dần theo tiến độ.', 'EducationalApplication')) !!}
@endpush

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('practice.hub') }}">Luyện tập</a><x-icon name="chev-right" />
    <span>Luyện sát pháp</span>
</nav>

<section class="grid gap-4 md:grid-cols-[1fr_auto] md:items-end mb-6">
    <div>
        <div class="eyebrow"><x-icon name="trophy" /> Chinh phục từng bậc</div>
        <h1 class="page-title mt-1">Luyện sát pháp 1 → 10 nước</h1>
        <p class="page-lede">{{ number_format($total, 0, ',', '.') }} thế chiếu hết chia 10 bậc theo số nước. Mỗi bậc giải đúng <b>{{ $pass }} thế khác nhau</b> là mở bậc tiếp theo. Máy đỡ dai nhất cho bên thua, và mọi đường chiếu hết đúng hạn đều được tính.</p>
    </div>
    @if($solvedTotal !== null)
        <div class="card stat">
            <span class="stat__icon tone-primary"><x-icon name="check-circle" /></span>
            <span><span class="stat__value">{{ number_format($solvedTotal, 0, ',', '.') }}</span><span class="stat__label block">thế đã chinh phục</span></span>
        </div>
    @endif
</section>

@if(session('status'))<div class="alert alert--err mb-4"><x-icon name="lock" /> <span>{{ session('status') }}</span></div>@endif

@php $current = collect($levels)->first(fn ($l) => $l['open'] && ($l['solved'] === null || $l['solved'] < min($pass, $l['count']))); @endphp
<ol class="ladder" data-ladder-map data-pass="{{ $pass }}" data-stars='@json($stars)' data-auth="{{ auth()->check() ? 1 : 0 }}">
    @foreach($levels as $l)
        @php
            $need = min($pass, $l['count']);
            $done = $l['solved'] !== null && $l['solved'] >= $need;
            $state = ! $l['open'] ? 'locked' : ($done ? 'done' : ($current && $current['level'] === $l['level'] ? 'current' : 'open'));
            $pct = $l['solved'] !== null && $need ? min(100, (int) round(100 * $l['solved'] / $need)) : 0;
        @endphp
        <li class="ladder__step is-{{ $state }}" data-level="{{ $l['level'] }}" data-count="{{ $l['count'] }}">
            <a href="{{ $l['open'] ? route('practice.ladder.level', $l['level']) : '#' }}" class="card ladder__card" @unless($l['open']) aria-disabled="true" tabindex="-1" @endunless>
                <span class="ladder__num">@if($state === 'locked')<x-icon name="lock" />@elseif($done)<x-icon name="check" />@else{{ $l['level'] }}@endif</span>
                <span class="min-w-0">
                    <span class="ladder__title">Bậc {{ $l['level'] }} · Chiếu hết trong {{ $l['level'] }} nước</span>
                    <span class="ladder__sub">{{ number_format($l['count'], 0, ',', '.') }} thế ·
                        <span data-ladder-progress>@if($l['solved'] !== null){{ $l['solved'] }}/{{ $need }} để mở bậc sau @else Đăng nhập để lưu tiến độ @endif</span></span>
                    <span class="progress progress--sm mt-2"><span class="progress__bar" data-ladder-bar style="width: {{ $pct }}%"></span></span>
                </span>
                <span class="ladder__stars" aria-label="{{ $l['stars'] }}/3 sao" data-ladder-stars>@for($k = 0; $k < 3; $k++)<x-icon name="star" class="{{ $k < $l['stars'] ? 'is-on' : '' }}" />@endfor</span>
            </a>
        </li>
    @endforeach
</ol>

<section class="section pt-6">
    <div class="prose">
        <h2>Cách chinh phục</h2>
        <ul>
            <li><strong>Bậc 1–2:</strong> nhận ra ngay ô chiếu hết của từng quân và vai trò mặt Tướng.</li>
            <li><strong>Bậc 3–5:</strong> phối hợp hai quân, bắt đầu có thí quân, chiếu rút, lưỡng chiếu.</li>
            <li><strong>Bậc 6–10:</strong> chuỗi chiếu dài — tính trước Tướng đối phương chạy đâu, quân nào về cứu.</li>
        </ul>
        <p>Sao của mỗi bậc: <x-icon name="star" class="w-4 h-4 inline" /> {{ $stars[0] }} thế · <x-icon name="star" class="w-4 h-4 inline" /><x-icon name="star" class="w-4 h-4 inline" /> {{ $stars[1] }} thế · ba sao {{ $stars[2] }} thế giải đúng. Bí ở bậc nào, đọc lại <a href="{{ route('series', 'sat-cuc-lien-hoan') }}">chuyên đề Sát Cục Liên Hoàn 1-10 Nước</a> và phương pháp tư duy 6 câu hỏi.</p>
    </div>
</section>

@guest
@push('scripts')
<script>
// Khách: tiến độ lưu trên máy (localStorage "xq.ladder" = {bậc: [id thế đã giải]}) — tự khoá/mở bậc theo đó.
(function () {
    var map = document.querySelector('[data-ladder-map]');
    if (!map) return;
    var pass = +map.dataset.pass, stars = JSON.parse(map.dataset.stars || '[]'), data = {};
    try { data = JSON.parse(localStorage.getItem('xq.ladder') || '{}') || {}; } catch (e) {}
    var prevDone = true, currentSet = false;
    map.querySelectorAll('[data-level]').forEach(function (li) {
        var lv = li.dataset.level, count = +li.dataset.count, solved = (data[lv] || []).length, need = Math.min(pass, count);
        var open = prevDone, done = solved >= need;
        var state = !open ? 'locked' : (done ? 'done' : (!currentSet ? 'current' : 'open'));
        if (state === 'current') currentSet = true;
        li.className = 'ladder__step is-' + state;
        var a = li.querySelector('a');
        if (!open) { a.setAttribute('href', '#'); a.setAttribute('aria-disabled', 'true'); a.tabIndex = -1; }
        var num = li.querySelector('.ladder__num');
        if (open && !done) num.textContent = lv;
        if (!open) num.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-lock"/></svg>';
        if (done) num.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-check"/></svg>';
        li.querySelector('[data-ladder-progress]').textContent = solved + '/' + need + ' để mở bậc sau (lưu trên máy này)';
        li.querySelector('[data-ladder-bar]').style.width = (need ? Math.min(100, Math.round(100 * solved / need)) : 0) + '%';
        li.querySelectorAll('[data-ladder-stars] svg').forEach(function (s, k) { s.classList.toggle('is-on', solved >= Math.min(stars[k], count)); });
        prevDone = done;
    });
    map.addEventListener('click', function (e) { var a = e.target.closest('a[aria-disabled="true"]'); if (a) e.preventDefault(); });
})();
</script>
@endpush
@endguest
@auth
@push('scripts')
<script>document.querySelector('[data-ladder-map]')?.addEventListener('click', function (e) { var a = e.target.closest('a[aria-disabled="true"]'); if (a) e.preventDefault(); });</script>
@endpush
@endauth
@endsection
