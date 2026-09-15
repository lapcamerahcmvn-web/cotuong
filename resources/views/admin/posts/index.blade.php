@extends('admin.layout')
@section('title', 'Tin tức')
@section('heading', 'Tin tức')

@section('top-actions')
    <div style="display:flex;gap:8px;">
        <a href="{{ route('admin.post-categories.index') }}" class="btn">Chuyên mục</a>
        <a href="{{ route('admin.posts.create') }}" class="btn primary">+ Viết bài mới</a>
    </div>
@endsection

@section('content')
<form method="GET" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px;">
    <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tìm theo tiêu đề…" style="max-width:260px;">
    <select class="input" name="status" style="max-width:170px;">
        <option value="">— Trạng thái —</option>
        <option value="published" @selected(request('status')==='published')>Đã xuất bản</option>
        <option value="draft" @selected(request('status')==='draft')>Nháp</option>
    </select>
    <select class="input" name="post_category_id" style="max-width:220px;">
        <option value="">— Chuyên mục —</option>
        @foreach($categories as $c)
            <option value="{{ $c->id }}" @selected((string) request('post_category_id')===(string) $c->id)>{{ $c->name }}</option>
        @endforeach
    </select>
    <button class="btn primary" type="submit">Lọc</button>
    <a class="btn" href="{{ route('admin.posts.index') }}">Xóa lọc</a>
</form>

<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Tiêu đề</th><th>Chuyên mục</th><th>Lượt xem</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
            @forelse($posts as $p)
                <tr>
                    <td class="t-title"><a href="{{ route('admin.posts.edit', $p) }}">{{ \Illuminate\Support\Str::limit($p->title, 60) }}</a></td>
                    <td style="color:var(--ink-soft);font-size:13px;">{{ $p->category?->name ?: '—' }}</td>
                    <td>{{ $p->view_count }}</td>
                    <td><span class="badge {{ $p->status }}">{{ $p->status === 'published' ? 'Xuất bản' : 'Nháp' }}</span></td>
                    <td style="white-space:nowrap;">
                        <a href="{{ route('admin.posts.edit', $p) }}" class="btn" style="min-height:32px;padding:0 12px;">Sửa</a>
                        <form method="POST" action="{{ route('admin.posts.toggle', $p) }}" style="display:inline;">
                            @csrf
                            <button class="btn" style="min-height:32px;padding:0 12px;">{{ $p->status === 'published' ? 'Ẩn' : 'Đăng' }}</button>
                        </form>
                        <form method="POST" action="{{ route('admin.posts.destroy', $p) }}" style="display:inline;" onsubmit="return confirm('Xoá bài viết này?');">
                            @csrf @method('DELETE')
                            <button class="btn danger" style="min-height:32px;padding:0 12px;">Xoá</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="5" style="text-align:center;color:var(--ink-faint);padding:30px;">Chưa có bài viết nào.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
<div style="margin-top:18px;">{{ $posts->links() }}</div>
@endsection
