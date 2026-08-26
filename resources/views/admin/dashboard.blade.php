@extends('admin.layout')
@section('title', 'Bảng điều khiển')
@section('heading', 'Bảng điều khiển')

@section('content')
<div class="stat-grid">
    <div class="card stat-card"><div class="sc-num" style="color:var(--jade)">{{ number_format($stats['views_today']) }}</div><div class="sc-label">Lượt xem hôm nay</div><div class="sc-sub">{{ number_format($stats['visitors_today']) }} khách · <a href="{{ route('admin.stats.index') }}">Thống kê →</a></div></div>
    <div class="card stat-card"><div class="sc-num">{{ number_format($stats['views_7']) }}</div><div class="sc-label">Lượt xem 7 ngày</div></div>
    <div class="card stat-card"><div class="sc-num" style="{{ $stats['pending_comments'] ? 'color:var(--red)' : '' }}">{{ number_format($stats['pending_comments']) }}</div><div class="sc-label">Bình luận chờ duyệt</div><div class="sc-sub"><a href="{{ route('admin.comments.index') }}">Duyệt ngay →</a></div></div>
    <div class="card stat-card"><div class="sc-num">{{ number_format($stats['users']) }}</div><div class="sc-label">Người dùng</div></div>
</div>

<div class="stat-grid" style="margin-top:14px;">
    <div class="card stat-card"><div class="sc-num" style="color:var(--jade)">{{ $stats['published'] }}</div><div class="sc-label">Bài đã xuất bản</div></div>
    <div class="card stat-card"><div class="sc-num">{{ $stats['draft'] }}</div><div class="sc-label">Bài nháp</div></div>
    <div class="card stat-card"><div class="sc-num">{{ $stats['series'] }}</div><div class="sc-label">Chuỗi bài</div></div>
    <div class="card stat-card"><div class="sc-label" style="margin-bottom:8px;">Thao tác nhanh</div><a href="{{ route('admin.lessons.index') }}" class="btn primary" style="width:100%;">Quản lý bài học</a></div>
</div>

@if($pendingComments->isNotEmpty())
<div class="card" style="padding:18px 20px;margin-top:18px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <h3 style="margin:0;font-size:16px;font-weight:800;">Bình luận chờ duyệt</h3>
        <a href="{{ route('admin.comments.index') }}" class="btn">Xem tất cả</a>
    </div>
    @foreach($pendingComments as $c)
        <div class="cmt-admin is-pending" style="border:none;box-shadow:none;padding:10px 0;border-bottom:1px solid var(--line);">
            <div class="cmt-admin-head"><strong>{{ $c->user->name ?? 'Ẩn danh' }}</strong> <span class="muted" style="font-size:12px;">· {{ \Illuminate\Support\Str::limit($c->lesson->title ?? '', 30) }}</span></div>
            <div class="cmt-admin-body" style="margin:4px 0;">{{ \Illuminate\Support\Str::limit($c->body, 120) }}</div>
            <div style="display:flex;gap:8px;">
                <form method="POST" action="{{ route('admin.comments.approve', $c) }}">@csrf<button class="btn primary" style="min-height:32px;padding:0 12px;">Duyệt</button></form>
                <form method="POST" action="{{ route('admin.comments.destroy', $c) }}" onsubmit="return confirm('Xóa?')">@csrf @method('DELETE')<button class="btn danger" style="min-height:32px;padding:0 12px;">Xóa</button></form>
            </div>
        </div>
    @endforeach
</div>
@endif

<div class="panel card" style="margin-top:18px;">
    <h3>Bài học cập nhật gần đây</h3>
    <div class="tbl-wrap" style="overflow-x:auto;">
        <table class="admin-table" style="min-width:560px;">
            <thead><tr><th>Tiêu đề</th><th>Giai đoạn</th><th>Nước</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
            @foreach($recent as $l)
                <tr>
                    <td class="t-title">{{ \Illuminate\Support\Str::limit($l->title, 44) }}</td>
                    <td>{{ $l->phase_label }}</td>
                    <td>{{ $l->move_count }}</td>
                    <td><span class="badge {{ $l->status }}">{{ $l->status }}</span></td>
                    <td><a href="{{ route('admin.lessons.edit', $l) }}" class="btn" style="min-height:32px;padding:0 12px;">Sửa</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
