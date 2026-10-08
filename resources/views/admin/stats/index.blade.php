@extends('admin.layout')
@section('title', 'Thống kê')
@section('heading', 'Thống kê')

@section('content')
@php
    $lm = ['password' => 'Mật khẩu', 'google' => 'Google', 'register' => 'Đăng ký', 'remember' => 'Tự đăng nhập lại'];
    $pm = ['daily' => 'Thế hôm nay', 'rush' => '60 giây', 'survival' => '3 mạng', 'topic' => 'Chủ đề', 'review' => 'Ôn lỗi', 'lesson' => 'Trong bài học', 'placement' => 'Kiểm tra trình độ'];
    $lv = [1 => 'Tập sự', 2 => 'Dễ', 3 => 'Vừa', 4 => 'Khó'];
    $max = fn ($k) => max(1, collect($learn14)->max($k));
@endphp
<h2 style="font-size:17px;font-weight:800;margin:0 0 10px;">Người dùng &amp; học tập</h2>
<div class="mini-stats">
    <div><b>{{ number_format($users['total']) }}</b><span>Tổng tài khoản ({{ number_format($users['google']) }} Google)</span></div>
    <div><b>{{ $users['new7'] }} · {{ $users['new30'] }}</b><span>Đăng ký mới 7 · 30 ngày</span></div>
    <div><b>{{ $users['dau'] }}</b><span>Học hôm nay (có XP)</span></div>
    <div><b>{{ $users['wau'] }} · {{ $users['mau'] }}</b><span>Hoạt động 7 · 30 ngày</span></div>
    <div><b>{{ $learn['lessons7'] }} · {{ $learn['lessons30'] }}</b><span>Bài hoàn thành 7 · 30 ngày</span></div>
    <div><b>{{ number_format($learn['xp30']) }}</b><span>XP phát 30 ngày</span></div>
    <div><b>{{ $pvp['finished30'] }}</b><span>Ván đấu bạn 30 ngày ({{ $pvp['coup30'] }} cờ úp) · {{ $pvp['playing'] }} đang chơi</span></div>
    <div><b>{{ $users['banned'] }}</b><span>Tài khoản bị khoá</span></div>
</div>

<div class="split-2">
    @foreach([['new', 'Đăng ký mới'], ['active', 'Người học hoạt động'], ['lessons', 'Bài hoàn thành'], ['puzzles', 'Lượt giải thế cờ']] as [$k, $label])
        <div class="card" style="padding:14px 16px;">
            <div style="font-weight:800;font-size:14px;margin-bottom:6px;">{{ $label }} — 14 ngày</div>
            <div class="bars">
                @foreach($learn14 as $d)
                    <div title="{{ $d['date'] }}: {{ $d[$k] }}"><em>{{ $d[$k] ?: '' }}</em><i style="height:{{ max(2, round($d[$k] / $max($k) * 85)) }}%"></i><small>{{ substr($d['date'], 0, 2) }}</small></div>
                @endforeach
            </div>
        </div>
    @endforeach
</div>

<div class="stats-2col">
    <div class="card" style="padding:18px 20px;">
        <h2 style="font-size:16px;font-weight:800;margin:0 0 12px;">Luyện tập 30 ngày</h2>
        @forelse($puzzleModes as $m)
            <div class="rank-row"><span>{{ $pm[$m->mode] ?? $m->mode }}</span><span class="rank-num">{{ number_format($m->c) }} lượt · {{ $m->c ? round(100 * $m->ok / $m->c) : 0 }}% đúng</span></div>
        @empty <p class="muted">Chưa có lượt giải.</p> @endforelse
        @foreach(['rush' => '60 giây', 'survival' => '3 mạng'] as $k => $label)
            @if(isset($sessions[$k]))<div class="rank-row"><span>Phiên {{ $label }}</span><span class="rank-num">{{ $sessions[$k]->c }} phiên · kỷ lục {{ $sessions[$k]->best }}</span></div>@endif
        @endforeach
    </div>
    <div class="card" style="padding:18px 20px;">
        <h2 style="font-size:16px;font-weight:800;margin:0 0 12px;">Chơi với máy 30 ngày (người chơi thắng–thua–hoà)</h2>
        @forelse($botByLevel as $b)
            <div class="rank-row"><span>{{ $b->variant === 'co-up' ? 'Cờ úp' : 'Cờ tướng' }} · {{ $lv[$b->level] ?? 'Cấp ' . $b->level }}</span>
                <span class="rank-num">{{ $b->c }} ván · {{ $b->w }}–{{ $b->l }}–{{ $b->d }} <span class="muted" style="font-weight:400;">({{ $b->c ? round(100 * $b->w / $b->c) : 0 }}% thắng máy)</span></span></div>
        @empty <p class="muted">Chưa có ván với máy (chỉ ván của người đã đăng nhập được lưu).</p> @endforelse
    </div>
    <div class="card" style="padding:18px 20px;">
        <h2 style="font-size:16px;font-weight:800;margin:0 0 12px;">Đăng nhập 7 ngày</h2>
        @forelse($logins as $l)
            <div class="rank-row"><span>{{ $lm[$l->method] ?? $l->method }} · {{ $l->success ? 'thành công' : 'thất bại' }}</span><span class="rank-num">{{ number_format($l->c) }}</span></div>
        @empty <p class="muted">Chưa có dữ liệu (ghi từ 10/2026).</p> @endforelse
    </div>
    <div class="card" style="padding:18px 20px;">
        <h2 style="font-size:16px;font-weight:800;margin:0 0 12px;">Học chăm nhất tuần (XP)</h2>
        @forelse($topLearners as $t)
            <div class="rank-row"><a href="{{ route('admin.users.show', $t->id) }}">{{ $t->name }}</a><span class="rank-num">{{ number_format($t->xp) }} XP</span></div>
        @empty <p class="muted">Chưa có.</p> @endforelse
    </div>
</div>

<h2 style="font-size:17px;font-weight:800;margin:26px 0 10px;">Lượt xem trang</h2>
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
