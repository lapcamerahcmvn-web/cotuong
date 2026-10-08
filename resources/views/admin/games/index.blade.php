@extends('admin.layout')
@section('title', 'Ván đấu')
@section('heading', 'Ván đấu — thắng máy & tư liệu')

@section('content')
@php
    $qs = fn ($a) => route('admin.games.index', array_filter($a + request()->only('mode', 'kq', 'cap', 'bien-the', 'phan-tich', 'q', 'sx'), fn ($v) => $v !== null && $v !== ''));
    $maxDay = max(1, collect($days)->max('c'));
    $vn = ['co-tuong' => 'Cờ tướng', 'co-up' => 'Cờ úp'];
@endphp

<h2 style="font-size:17px;font-weight:800;margin:0 0 10px;">Ván với máy theo cấp</h2>
<div class="panel card" style="padding:0;margin-bottom:14px;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Biến thể</th><th>Cấp máy</th><th>Số ván</th><th>Người thắng</th><th>Thua</th><th>Hoà</th><th>Tỉ lệ người thắng</th><th>Thắng 30 ngày</th><th>Số nước TB khi thắng</th><th></th></tr></thead>
            <tbody>
            @forelse($byLevel as $r)
                <tr>
                    <td>{{ $vn[$r->variant] ?? $r->variant }}</td>
                    <td><b>{{ $levels[$r->level] ?? '—' }}</b></td>
                    <td>{{ number_format($r->c) }}</td>
                    <td><b>{{ number_format($r->w) }}</b></td>
                    <td>{{ number_format($r->l) }}</td>
                    <td>{{ number_format($r->d) }}</td>
                    <td>{{ $r->c ? round(100 * $r->w / $r->c) : 0 }}%</td>
                    <td>{{ number_format($r->w30) }}</td>
                    <td>{{ $r->avgw ? round($r->avgw / 2) : '—' }}</td>
                    <td><a class="btn" style="min-height:30px;padding:0 10px;" href="{{ $qs(['mode' => 'bot', 'kq' => 'win', 'cap' => $r->level, 'bien-the' => $r->variant]) }}">Xem ván thắng</a></td>
                </tr>
            @empty
                <tr><td colspan="10" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa có ván nào với máy được lưu.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>

<div class="split-2" style="margin-bottom:18px;">
    <div class="card" style="padding:14px 16px;">
        <div style="font-weight:800;font-size:14px;margin-bottom:6px;">Ván người chơi thắng máy — 30 ngày</div>
        <div class="bars">
            @foreach($days as $d)
                <div title="{{ $d['label'] }}: {{ $d['c'] }}"><em>{{ $d['c'] ?: '' }}</em><i style="height:{{ max(2, round($d['c'] / $maxDay * 85)) }}%"></i><small>{{ substr($d['label'], 0, 2) }}</small></div>
            @endforeach
        </div>
    </div>
    <div class="card" style="padding:14px 16px;">
        <div style="font-weight:800;font-size:14px;margin-bottom:6px;">Thắng máy cấp Vừa / Khó nhiều nhất</div>
        @forelse($top as $t)
            <div style="display:flex;justify-content:space-between;gap:8px;font-size:13.5px;padding:4px 0;border-bottom:1px solid var(--line);">
                <a href="{{ $qs(['mode' => 'bot', 'kq' => 'win', 'q' => $t->user?->name, 'cap' => null]) }}">{{ $t->user?->name ?? '—' }}</a>
                <span class="muted">{{ $t->c }} ván · cao nhất {{ $levels[$t->maxlv] ?? '' }} · nhanh nhất {{ (int) ceil($t->fastest / 2) }} nước</span>
            </div>
        @empty
            <div class="muted" style="font-size:13px;">Chưa có ai thắng máy cấp Vừa / Khó.</div>
        @endforelse
    </div>
</div>

<div class="chips">
    @foreach(['bot' => 'Với máy', 'pvp' => 'Đấu bạn', 'all' => 'Tất cả'] as $k => $v)
        <a href="{{ $qs(['mode' => $k]) }}" class="{{ $filters['mode'] === $k ? 'on' : '' }}">{{ $v }}</a>
    @endforeach
    <span style="width:12px;"></span>
    @foreach(['win' => 'Người chơi thắng', 'loss' => 'Người chơi thua', 'draw' => 'Hoà', 'all' => 'Mọi kết quả'] as $k => $v)
        <a href="{{ $qs(['kq' => $k]) }}" class="{{ $filters['kq'] === $k ? 'on' : '' }}">{{ $v }}</a>
    @endforeach
</div>
<form method="GET" class="form-row" style="margin-bottom:16px;">
    <input type="hidden" name="mode" value="{{ $filters['mode'] }}"><input type="hidden" name="kq" value="{{ $filters['kq'] }}">
    <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tên / email người chơi…" style="max-width:220px;">
    <select class="input" name="cap" style="max-width:150px;">
        <option value="">— Cấp máy —</option>
        @foreach($levels as $k => $v)<option value="{{ $k }}" @selected((int) request('cap') === $k)>{{ $v }}</option>@endforeach
    </select>
    <select class="input" name="bien-the" style="max-width:140px;">
        <option value="">— Biến thể —</option>
        @foreach($vn as $k => $v)<option value="{{ $k }}" @selected(request('bien-the') === $k)>{{ $v }}</option>@endforeach
    </select>
    <select class="input" name="sx" style="max-width:180px;">
        @foreach(['' => 'Mới nhất', 'ngan' => 'Ít nước nhất', 'dai' => 'Nhiều nước nhất'] as $k => $v)<option value="{{ $k }}" @selected((string) request('sx') === $k)>Sắp xếp: {{ $v }}</option>@endforeach
    </select>
    <label style="display:flex;align-items:center;gap:6px;font-size:13.5px;"><input type="checkbox" name="phan-tich" value="1" @checked(request('phan-tich') === '1')> Đã phân tích</label>
    <button class="btn primary" type="submit">Lọc</button>
    <a class="btn" href="{{ route('admin.games.index') }}">Xoá lọc</a>
</form>

<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Ngày</th><th>Người chơi</th><th>Ván</th><th>Cấp</th><th>Kết quả</th><th>Số nước</th><th>Độ chính xác</th><th></th></tr></thead>
            <tbody>
            @forelse($games as $g)
                <tr>
                    <td style="white-space:nowrap;font-size:13px;">{{ $g->created_at?->timezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i') }}</td>
                    <td class="t-title">@if($g->user)<a href="{{ route('admin.users.show', $g->user) }}">{{ $g->user->name }}</a>@else — @endif</td>
                    <td style="font-size:13px;">{{ $g->title() }}@if($g->customStart())<span class="badge review" style="margin-left:6px;">Thế tuỳ chọn</span>@endif</td>
                    <td>{{ $g->mode === 'bot' ? ($levels[$g->level] ?? '—') : 'Đấu bạn' }}</td>
                    <td><span class="badge {{ $g->result === 'win' ? 'high' : ($g->result === 'loss' ? 'low' : 'draft') }}">{{ $results[$g->result] ?? $g->result }}</span>
                        @if($g->reason)<div class="muted" style="font-size:11.5px;">{{ $g->reason }}</div>@endif</td>
                    <td>{{ (int) ceil($g->plies / 2) }}</td>
                    <td>{{ $g->accuracy() !== null ? $g->accuracy() . '%' : '—' }}</td>
                    <td style="white-space:nowrap;"><a href="{{ route('admin.games.show', $g) }}" class="btn" style="min-height:32px;padding:0 12px;" target="_blank" rel="noopener">Xem lại</a>
                        <a href="{{ route('admin.games.export', $g) }}" class="btn" style="min-height:32px;padding:0 10px;" title="Tải ván dạng chữ">Tải</a></td>
                </tr>
            @empty
                <tr><td colspan="8" style="text-align:center;color:var(--ink-faint);padding:30px;">Không có ván phù hợp.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
<div style="margin-top:18px;">{{ $games->links() }}</div>
<p class="muted" style="font-size:12.5px;margin-top:10px;">Ván được lưu khi người chơi đã đăng nhập chơi xong. "Xem lại" mở trang xem từng nước (có phân tích bằng máy nếu người chơi đã phân tích) kèm nút tải về và tạo bài học nháp.</p>
@endsection
