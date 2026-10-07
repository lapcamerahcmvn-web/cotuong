@extends('admin.layout')
@section('title', 'Sơ đồ tư duy')
@section('heading', 'Sơ đồ tư duy')

@section('top-actions')
    <a href="{{ route('admin.mindmaps.create') }}" class="btn primary">+ Tạo sơ đồ</a>
@endsection

@section('content')
<div class="panel card">
    <h3>Cách dùng</h3>
    <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;">
        <li>Tạo sơ đồ: soạn dàn ý (<code>#</code> nhánh lớn, <code>##</code> nhánh con, <code>- </code> khẩu quyết, <code>@slug-bai-hoc</code> để gắn ví dụ) hoặc bấm <b>Tạo từ chuyên đề</b>.</li>
        <li>Chép shortcode <code>[so-do-tu-duy slug="…"]</code> dán vào nội dung bài viết (Tin tức).</li>
        <li>Sơ đồ <b>tự cập nhật</b> theo chuyên đề (không cần lưu ở đây): <code>[so-do-tu-duy chuyen-de="co-tan-co-khau-quyet" ket-qua="hoa|thang|kheo"]</code>.</li>
    </ol>
</div>
<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Sơ đồ</th><th>Số ý</th><th>Shortcode</th><th>Cập nhật</th><th></th></tr></thead>
            <tbody>
            @forelse($maps as $m)
                <tr>
                    <td class="t-title"><a href="{{ route('admin.mindmaps.edit', $m) }}">{{ $m->title }}</a></td>
                    <td>{{ \App\Support\Mindmap::leafCount($m->tree()) }}</td>
                    <td><code style="font-size:12px;">{{ $m->shortcode() }}</code></td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ $m->updated_at?->format('d/m/Y H:i') }}</td>
                    <td><a class="btn" href="{{ route('admin.mindmaps.edit', $m) }}" style="min-height:32px;padding:0 12px;">Sửa</a></td>
                </tr>
            @empty
                <tr><td colspan="5" style="text-align:center;color:var(--ink-faint);padding:30px;">Chưa có sơ đồ nào.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
