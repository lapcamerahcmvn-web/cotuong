@extends('admin.layout')
@section('title', 'Chuyên mục Tin tức')
@section('heading', 'Chuyên mục Tin tức')

@section('top-actions')
    <a href="{{ route('admin.post-categories.create') }}" class="btn primary">+ Thêm chuyên mục</a>
@endsection

@section('content')
<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Tên chuyên mục</th><th>Số bài</th><th>Thứ tự</th><th></th></tr></thead>
            <tbody>
            @forelse($categories as $c)
                <tr>
                    <td class="t-title">
                        <a href="{{ route('admin.post-categories.edit', $c) }}">{{ $c->name }}</a>
                        <div class="muted" style="font-size:12px;">/tin-tuc/{{ $c->slug }}</div>
                    </td>
                    <td>{{ $c->posts_count }}</td>
                    <td>{{ $c->sort_order }}</td>
                    <td style="white-space:nowrap;">
                        <a href="{{ route('admin.post-categories.edit', $c) }}" class="btn" style="min-height:32px;padding:0 12px;">Sửa</a>
                        <form method="POST" action="{{ route('admin.post-categories.destroy', $c) }}" style="display:inline;"
                              onsubmit="return confirm('Xoá chuyên mục &quot;{{ $c->name }}&quot;? Các bài trong chuyên mục sẽ được gỡ (KHÔNG bị xoá).')">
                            @csrf @method('DELETE')
                            <button class="btn danger" style="min-height:32px;padding:0 12px;">Xoá</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="4" style="text-align:center;color:var(--ink-faint);padding:30px;">Chưa có chuyên mục nào. Bấm "+ Thêm chuyên mục".</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
