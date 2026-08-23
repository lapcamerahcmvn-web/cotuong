@extends('admin.layout')
@section('title', 'Bảng điều khiển')
@section('heading', 'Bảng điều khiển')

@section('content')
<div class="stat-grid">
    <div class="stat card"><div class="n" style="color:var(--jade)">{{ $stats['published'] }}</div><div class="l">Đã xuất bản</div></div>
    <div class="stat card"><div class="n" style="color:#1e40af">{{ $stats['review'] }}</div><div class="l">Chờ duyệt (review)</div></div>
    <div class="stat card"><div class="n">{{ $stats['draft'] }}</div><div class="l">Nháp</div></div>
    <div class="stat card"><div class="n">{{ $stats['total'] }}</div><div class="l">Tổng bài học</div></div>
</div>
<div class="stat-grid">
    <div class="stat card"><div class="n">{{ $stats['series'] }}</div><div class="l">Chuỗi bài</div></div>
    <div class="stat card"><div class="n">{{ $stats['assets'] }}</div><div class="l">Nguồn tài liệu</div></div>
    <div class="stat card"><div class="n" style="color:var(--red)">{{ $stats['low_conf'] }}</div><div class="l">Độ tin cậy thấp (soi kỹ)</div></div>
    <div class="stat card"><div class="l" style="margin-bottom:8px;">Thao tác</div><a href="{{ route('admin.lessons.index') }}" class="btn primary" style="width:100%;">Quản lý bài học</a></div>
</div>

<div class="panel card">
    <h3>Cập nhật gần đây</h3>
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Tiêu đề</th><th>Giai đoạn</th><th>Nước</th><th>Tin cậy</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
            @foreach($recent as $l)
                <tr>
                    <td class="t-title">{{ \Illuminate\Support\Str::limit($l->title, 48) }}</td>
                    <td>{{ $l->phase_label }}</td>
                    <td>{{ $l->move_count }}</td>
                    <td>@if($l->decode_confidence)<span class="badge {{ $l->decode_confidence }}">{{ $l->decode_confidence }}</span>@endif</td>
                    <td><span class="badge {{ $l->status }}">{{ $l->status }}</span></td>
                    <td><a href="{{ route('admin.lessons.edit', $l) }}" class="btn" style="min-height:32px;padding:0 12px;">Sửa</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
