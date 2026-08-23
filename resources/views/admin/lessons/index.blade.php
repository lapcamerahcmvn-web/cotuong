@extends('admin.layout')
@section('title', 'Bài học')
@section('heading', 'Bài học')

@section('content')
<form method="GET" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;">
    <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tìm theo tiêu đề…" style="max-width:260px;">
    <select class="input" name="status" style="max-width:170px;">
        <option value="">— Trạng thái —</option>
        @foreach(['published'=>'Đã xuất bản','review'=>'Chờ duyệt','draft'=>'Nháp','needs_fix'=>'Cần sửa'] as $k=>$v)
            <option value="{{ $k }}" @selected(request('status')===$k)>{{ $v }}</option>
        @endforeach
    </select>
    <select class="input" name="phase" style="max-width:160px;">
        <option value="">— Giai đoạn —</option>
        @foreach(\App\Models\Lesson::PHASES as $k=>$v)
            <option value="{{ $k }}" @selected(request('phase')===$k)>{{ $v }}</option>
        @endforeach
    </select>
    <button class="btn primary" type="submit">Lọc</button>
    <a class="btn" href="{{ route('admin.lessons.index') }}">Xóa lọc</a>
</form>

<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Tiêu đề</th><th>Chuỗi</th><th>Giai đoạn</th><th>Nước</th><th>Tin cậy</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
            @forelse($lessons as $l)
                <tr>
                    <td class="t-title"><a href="{{ route('admin.lessons.edit', $l) }}">{{ \Illuminate\Support\Str::limit($l->title, 50) }}</a></td>
                    <td style="color:var(--ink-soft);font-size:13px;">{{ \Illuminate\Support\Str::limit($l->series?->name, 24) ?: '—' }}</td>
                    <td>{{ $l->phase_label }}</td>
                    <td>{{ $l->move_count }}</td>
                    <td>@if($l->decode_confidence)<span class="badge {{ $l->decode_confidence }}">{{ $l->decode_confidence }}</span>@endif</td>
                    <td><span class="badge {{ $l->status }}">{{ $l->status }}</span></td>
                    <td style="white-space:nowrap;">
                        <a href="{{ route('admin.lessons.edit', $l) }}" class="btn" style="min-height:32px;padding:0 12px;">Sửa</a>
                        <form method="POST" action="{{ route('admin.lessons.toggle', $l) }}" style="display:inline;">
                            @csrf
                            <button class="btn" style="min-height:32px;padding:0 12px;" title="{{ $l->status==='published' ? 'Ẩn' : 'Xuất bản' }}">{{ $l->status==='published' ? 'Ẩn' : 'Đăng' }}</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="7" style="text-align:center;color:var(--ink-faint);padding:30px;">Không có bài học nào.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
<div style="margin-top:18px;">{{ $lessons->links() }}</div>
@endsection
