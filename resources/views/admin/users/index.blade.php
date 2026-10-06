@extends('admin.layout')
@section('title', 'Người dùng')
@section('heading', 'Người dùng')

@section('content')
@php $qs = fn ($a) => route('admin.users.index', array_filter($a + request()->only('q', 'role', 'loc', 'sx'), fn ($v) => $v !== null && $v !== '')); @endphp
<div class="chips">
    <a href="{{ $qs(['loc' => null]) }}" class="{{ !request('loc') ? 'on' : '' }}">Tất cả ({{ $counts['all'] }})</a>
    <a href="{{ $qs(['loc' => 'active']) }}" class="{{ request('loc') === 'active' ? 'on' : '' }}">Hoạt động 7 ngày ({{ $counts['active'] }})</a>
    <a href="{{ $qs(['loc' => 'new']) }}" class="{{ request('loc') === 'new' ? 'on' : '' }}">Mới 7 ngày ({{ $counts['new'] }})</a>
    <a href="{{ $qs(['loc' => 'google']) }}" class="{{ request('loc') === 'google' ? 'on' : '' }}">Đăng nhập Google</a>
    <a href="{{ $qs(['loc' => 'banned']) }}" class="{{ request('loc') === 'banned' ? 'on' : '' }}">Bị khoá ({{ $counts['banned'] }})</a>
</div>
<form method="GET" class="form-row" style="margin-bottom:16px;">
    <input type="hidden" name="loc" value="{{ request('loc') }}">
    <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tìm tên / email…" style="max-width:240px;">
    <select class="input" name="role" style="max-width:160px;">
        <option value="">— Vai trò —</option>
        @foreach($roles as $k => $v)<option value="{{ $k }}" @selected(request('role') === $k)>{{ $v }}</option>@endforeach
    </select>
    <select class="input" name="sx" style="max-width:200px;">
        @foreach(['' => 'Đăng nhập gần nhất', 'new' => 'Mới đăng ký', 'xp' => 'XP cao nhất', 'streak' => 'Chuỗi ngày dài nhất', 'games' => 'Nhiều ván nhất'] as $k => $v)
            <option value="{{ $k }}" @selected((string) request('sx') === $k)>Sắp xếp: {{ $v }}</option>
        @endforeach
    </select>
    <button class="btn primary" type="submit">Lọc</button>
    <a class="btn" href="{{ route('admin.users.index') }}">Xoá lọc</a>
</form>

<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Người dùng</th><th>Vai trò</th><th>Cấp · XP</th><th>Chuỗi</th><th>Bài học</th><th>Thế giải</th><th>Ván đấu</th><th>Đăng nhập gần nhất</th><th>Tạo</th><th></th></tr></thead>
            <tbody>
            @forelse($users as $u)
                <tr>
                    <td class="t-title">
                        <a href="{{ route('admin.users.show', $u) }}">{{ $u->name }}</a>
                        @if($u->banned_at)<span class="badge low" style="margin-left:6px;">Bị khoá</span>@endif
                        @if($u->google_id)<span class="muted" style="font-size:11px;margin-left:4px;">G</span>@endif
                        <div class="muted" style="font-size:12px;">{{ $u->email }}</div>
                    </td>
                    <td><span class="badge {{ $u->role === 'admin' ? 'high' : ($u->role === 'bien_tap' ? 'review' : 'draft') }}">{{ $roles[$u->role] ?? $u->role }}</span></td>
                    <td>Cấp {{ $u->level }} · {{ number_format($u->xp_total) }}</td>
                    <td>{{ $u->streak_current }}<span class="muted" style="font-size:12px;"> / {{ $u->streak_best }}</span></td>
                    <td>{{ $u->completed_count }}</td>
                    <td>{{ $u->solved_count }}</td>
                    <td>{{ $u->games_count }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);white-space:nowrap;">{{ optional($u->last_login_at)->format('d/m/Y H:i') ?: '—' }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ $u->created_at?->format('d/m/Y') }}</td>
                    <td><a href="{{ route('admin.users.show', $u) }}" class="btn" style="min-height:32px;padding:0 12px;">Xem</a></td>
                </tr>
            @empty
                <tr><td colspan="10" style="text-align:center;color:var(--ink-faint);padding:30px;">Không có người dùng phù hợp.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
<div style="margin-top:18px;">{{ $users->links() }}</div>
@endsection
