@extends('admin.layout')
@section('title', 'Chi tiết người dùng')
@section('heading', 'Người dùng: ' . $user->name)

@section('content')
<div class="panel card">
    <h3>Thông tin</h3>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px 24px;font-size:14px;">
        <div><span class="muted">Tên:</span> {{ $user->name }}</div>
        <div><span class="muted">Email:</span> {{ $user->email }}</div>
        <div><span class="muted">Vai trò:</span> {{ $user->role }}</div>
        <div><span class="muted">Đăng nhập gần nhất:</span> {{ optional($user->last_login_at)->format('d/m/Y H:i') ?: '—' }}</div>
        <div><span class="muted">Đăng nhập Google:</span> {{ $user->google_id ? 'Có' : 'Không' }}</div>
        <div><span class="muted">Tạo lúc:</span> {{ $user->created_at->format('d/m/Y') }}</div>
    </div>
</div>

<div class="panel card">
    <h3>Bài đã học ({{ $progress->where('status','completed')->count() }} hoàn thành / {{ $progress->count() }} bài chạm tới)</h3>
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Bài học</th><th>Trạng thái</th><th>Đã đọc</th><th>Xem hết nước?</th><th>Hoàn thành</th></tr></thead>
            <tbody>
            @forelse($progress as $p)
                <tr>
                    <td class="t-title">{{ $p->lesson?->title ?? '—' }}</td>
                    <td><span class="badge {{ $p->status==='completed'?'published':'draft' }}">{{ $p->status==='completed'?'Đã học':'Đang đọc' }}</span></td>
                    <td>{{ floor($p->read_seconds/60) }}p{{ $p->read_seconds%60 }}s</td>
                    <td>{{ $p->viewed_all_moves ? 'Có' : 'Chưa' }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ optional($p->completed_at)->format('d/m/Y H:i') ?: '—' }}</td>
                </tr>
            @empty
                <tr><td colspan="5" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa học bài nào.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>

<div class="panel card">
    <h3>Lịch sử truy cập (80 gần nhất)</h3>
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Thời gian</th><th>Đường dẫn</th><th>IP</th></tr></thead>
            <tbody>
            @forelse($logs as $log)
                <tr>
                    <td style="white-space:nowrap;font-size:13px;">{{ $log->created_at?->format('d/m H:i:s') }}</td>
                    <td style="font-size:13px;">/{{ $log->url }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ $log->ip }}</td>
                </tr>
            @empty
                <tr><td colspan="3" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa có lịch sử.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
