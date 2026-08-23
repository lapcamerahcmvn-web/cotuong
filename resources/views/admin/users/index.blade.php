@extends('admin.layout')
@section('title', 'Người dùng')
@section('heading', 'Người dùng')

@section('content')
<form method="GET" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;">
    <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tìm tên / email…" style="max-width:260px;">
    <select class="input" name="role" style="max-width:180px;">
        <option value="">— Vai trò —</option>
        @foreach(['admin'=>'Quản trị','bien_tap'=>'Biên tập','hoc_vien'=>'Học viên'] as $k=>$v)
            <option value="{{ $k }}" @selected(request('role')===$k)>{{ $v }}</option>
        @endforeach
    </select>
    <button class="btn primary" type="submit">Lọc</button>
    <a class="btn" href="{{ route('admin.users.index') }}">Xóa lọc</a>
</form>

<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Tên</th><th>Email</th><th>Vai trò</th><th>Đã học</th><th>Đăng nhập gần nhất</th><th></th></tr></thead>
            <tbody>
            @forelse($users as $u)
                <tr>
                    <td class="t-title">{{ $u->name }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ $u->email }}</td>
                    <td><span class="badge draft">{{ $u->role }}</span></td>
                    <td>{{ $u->completed_count }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ optional($u->last_login_at)->format('d/m/Y H:i') ?: '—' }}</td>
                    <td><a href="{{ route('admin.users.show', $u) }}" class="btn" style="min-height:32px;padding:0 12px;">Xem</a></td>
                </tr>
            @empty
                <tr><td colspan="6" style="text-align:center;color:var(--ink-faint);padding:30px;">Chưa có người dùng.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
<div style="margin-top:18px;">{{ $users->links() }}</div>
@endsection
