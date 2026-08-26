@extends('admin.layout')
@section('title', 'Thống kê truy cập')
@section('heading', 'Thống kê truy cập')

@section('content')
<div class="stat-grid">
    <div class="card stat-card"><div class="sc-num">{{ number_format($kpi['views_today']) }}</div><div class="sc-label">Lượt xem hôm nay</div><div class="sc-sub">{{ number_format($kpi['visitors_today']) }} khách</div></div>
    <div class="card stat-card"><div class="sc-num">{{ number_format($kpi['views_7']) }}</div><div class="sc-label">Lượt xem 7 ngày</div><div class="sc-sub">{{ number_format($kpi['visitors_7']) }} khách</div></div>
    <div class="card stat-card"><div class="sc-num">{{ number_format($kpi['views_30']) }}</div><div class="sc-label">Lượt xem 30 ngày</div><div class="sc-sub">{{ number_format($kpi['visitors_30']) }} khách</div></div>
    <div class="card stat-card"><div class="sc-num">{{ number_format($kpi['total_views']) }}</div><div class="sc-label">Tổng lượt xem</div><div class="sc-sub">từ khi bật thống kê</div></div>
</div>

<div class="card" style="padding:18px 20px;margin-top:18px;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <h2 style="font-size:16px;font-weight:800;margin:0;">Lượt xem 14 ngày gần nhất</h2>
        <span class="muted" style="font-size:12.5px;">■ Lượt xem</span>
    </div>
    <div class="chart-14">
        @foreach($chart as $d)
            <div class="chart-col" title="{{ $d['date'] }}: {{ $d['views'] }} lượt xem, {{ $d['visitors'] }} khách">
                <div class="chart-bar" style="height:{{ max(2, round($d['views'] / $chartMax * 100)) }}%;">
                    <span class="chart-val">{{ $d['views'] ?: '' }}</span>
                </div>
                <div class="chart-x">{{ $d['date'] }}</div>
            </div>
        @endforeach
    </div>
</div>

<div class="stats-2col">
    <div class="card" style="padding:18px 20px;">
        <h2 style="font-size:16px;font-weight:800;margin:0 0 12px;">Bài học xem nhiều nhất</h2>
        @forelse($topLessons as $l)
            <div class="rank-row">
                <a href="{{ route('lessons.show', $l->slug) }}" target="_blank">{{ \Illuminate\Support\Str::limit($l->title, 46) }}</a>
                <span class="rank-num">{{ number_format($l->view_count) }}</span>
            </div>
        @empty
            <p class="muted">Chưa có dữ liệu.</p>
        @endforelse
    </div>
    <div class="card" style="padding:18px 20px;">
        <h2 style="font-size:16px;font-weight:800;margin:0 0 12px;">Trang xem nhiều (30 ngày)</h2>
        @forelse($topPaths as $p)
            <div class="rank-row">
                <a href="{{ url($p->path) }}" target="_blank">/{{ \Illuminate\Support\Str::limit($p->path, 44) }}</a>
                <span class="rank-num">{{ number_format($p->c) }} <span class="muted" style="font-weight:400;">({{ number_format($p->u) }} khách)</span></span>
            </div>
        @empty
            <p class="muted">Chưa có dữ liệu truy cập. Số liệu sẽ xuất hiện khi có khách truy cập.</p>
        @endforelse
    </div>
</div>
@endsection
