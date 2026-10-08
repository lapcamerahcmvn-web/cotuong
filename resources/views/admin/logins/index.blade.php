@extends('admin.layout')
@section('title', 'Lịch sử đăng nhập')
@section('heading', 'Lịch sử đăng nhập')

@section('content')
@php
    $qs = fn ($a) => route('admin.logins.index', array_filter($a + request()->only('q', 'method', 'kq', 'ngay', 'vai-tro'), fn ($v) => $v !== null && $v !== ''));
    $dev = fn ($ua) => \App\Http\Controllers\Admin\LoginHistoryController::device($ua);
@endphp
<div class="mini-stats">
    <div><b>{{ number_format($stats['ok7']) }}</b><span>Lượt đăng nhập 7 ngày</span></div>
    <div><b>{{ number_format($stats['users24']) }}</b><span>Người đăng nhập 24 giờ qua</span></div>
    <div><b>{{ number_format($stats['fail7']) }}</b><span>Lượt sai mật khẩu / bị khoá 7 ngày</span></div>
    @foreach($methods as $k => $v)
        <div><b>{{ number_format($stats['byMethod'][$k] ?? 0) }}</b><span>{{ $v }} (7 ngày)</span></div>
    @endforeach
</div>

@if($stats['suspect']->isNotEmpty())
    <div class="card" style="padding:12px 16px;margin-bottom:14px;border-color:var(--red);">
        <b>IP sai mật khẩu nhiều lần (7 ngày):</b>
        @foreach($stats['suspect'] as $s)
            <a href="{{ $qs(['q' => $s->ip, 'kq' => 'fail']) }}" style="margin-left:10px;">{{ $s->ip }} ({{ $s->c }} lần)</a>
        @endforeach
    </div>
@endif

<div class="chips">
    <a href="{{ $qs(['kq' => null]) }}" class="{{ !request('kq') ? 'on' : '' }}">Tất cả</a>
    <a href="{{ $qs(['kq' => 'ok']) }}" class="{{ request('kq') === 'ok' ? 'on' : '' }}">Thành công</a>
    <a href="{{ $qs(['kq' => 'fail']) }}" class="{{ request('kq') === 'fail' ? 'on' : '' }}">Thất bại</a>
    <a href="{{ $qs(['vai-tro' => request('vai-tro') === 'staff' ? null : 'staff']) }}" class="{{ request('vai-tro') === 'staff' ? 'on' : '' }}">Chỉ Admin / Biên tập</a>
</div>
<form method="GET" class="form-row" style="margin-bottom:16px;">
    <input type="hidden" name="kq" value="{{ request('kq') }}">
    <input type="hidden" name="vai-tro" value="{{ request('vai-tro') }}">
    <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tên / email / IP…" style="max-width:240px;">
    <select class="input" name="method" style="max-width:220px;">
        <option value="">— Cách đăng nhập —</option>
        @foreach($methods as $k => $v)<option value="{{ $k }}" @selected(request('method') === $k)>{{ $v }}</option>@endforeach
    </select>
    <select class="input" name="ngay" style="max-width:160px;">
        @foreach([1 => '24 giờ', 7 => '7 ngày', 30 => '30 ngày', 180 => '180 ngày'] as $k => $v)
            <option value="{{ $k }}" @selected((int) request('ngay', 30) === $k)>{{ $v }}</option>
        @endforeach
    </select>
    <button class="btn primary" type="submit">Lọc</button>
    <a class="btn" href="{{ route('admin.logins.index') }}">Xoá lọc</a>
</form>

<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Thời gian</th><th>Người dùng</th><th>Cách</th><th>Kết quả</th><th>IP</th><th>Thiết bị</th></tr></thead>
            <tbody>
            @forelse($events as $e)
                <tr>
                    <td style="white-space:nowrap;font-size:13px;">{{ $e->created_at?->timezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i') }}</td>
                    <td class="t-title">
                        @if($e->user)
                            <a href="{{ route('admin.users.show', $e->user) }}">{{ $e->user->name }}</a>
                            @if(in_array($e->user->role, ['admin', 'bien_tap'], true))<span class="badge high" style="margin-left:6px;">{{ $e->user->role === 'admin' ? 'Admin' : 'Biên tập' }}</span>@endif
                            <div class="muted" style="font-size:12px;">{{ $e->user->email }}</div>
                        @else
                            <span class="muted">{{ $e->email ?: '—' }}</span> <span class="muted" style="font-size:12px;">(không có tài khoản)</span>
                        @endif
                    </td>
                    <td style="font-size:13px;">{{ $methods[$e->method] ?? $e->method }}</td>
                    <td>@if($e->success)<span class="badge high">Thành công</span>@else<span class="badge low">Thất bại</span>@endif</td>
                    <td style="font-size:13px;"><a href="{{ $qs(['q' => $e->ip]) }}">{{ $e->ip }}</a></td>
                    <td style="font-size:13px;color:var(--ink-soft);" title="{{ $e->user_agent }}">{{ $dev($e->user_agent) }}</td>
                </tr>
            @empty
                <tr><td colspan="6" style="text-align:center;color:var(--ink-faint);padding:30px;">Chưa có lượt đăng nhập nào khớp bộ lọc.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
<div style="margin-top:18px;">{{ $events->links() }}</div>
<p class="muted" style="font-size:12.5px;margin-top:10px;">Lưu 180 ngày. "Tự đăng nhập lại (ghi nhớ)" = người dùng quay lại web khi phiên cũ đã hết, được đăng nhập tự động bằng cookie Ghi nhớ — ghi từ 08/10/2026.</p>
@endsection
