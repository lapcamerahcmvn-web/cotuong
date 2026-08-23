@extends('admin.layout')
@section('title', 'Nguồn tài liệu')
@section('heading', 'Nguồn tài liệu (nội bộ)')

@section('content')
<div class="flash" style="background:var(--surface-2);color:var(--ink-soft);border:1px dashed var(--line);">
    ⚠️ Đây là tài liệu gốc có bản quyền — chỉ dùng nội bộ để đối chiếu khi biên soạn. KHÔNG public,
    KHÔNG chép nguyên văn vào bài học.
</div>

<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Tên file</th><th>Loại</th><th>Version</th><th>Bản quyền</th><th>Bài liên kết</th><th></th></tr></thead>
            <tbody>
            @forelse($assets as $a)
                <tr>
                    <td class="t-title">{{ \Illuminate\Support\Str::limit($a->original_filename, 50) }}</td>
                    <td><span class="badge draft">{{ $a->type }}</span></td>
                    <td style="font-size:12px;color:var(--ink-soft);">{{ $a->decode_version }}</td>
                    <td style="font-size:12px;">{{ $a->verified_authorship }}</td>
                    <td style="font-size:13px;">@if($a->lesson)<a href="{{ route('admin.lessons.edit', $a->lesson) }}">{{ \Illuminate\Support\Str::limit($a->lesson->title, 26) }}</a>@else — @endif</td>
                    <td><a href="{{ route('admin.source-assets.show', $a) }}" class="btn" style="min-height:32px;padding:0 12px;">Xem</a></td>
                </tr>
            @empty
                <tr><td colspan="6" style="text-align:center;color:var(--ink-faint);padding:30px;">Chưa có nguồn nào.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
<div style="margin-top:18px;">{{ $assets->links() }}</div>
@endsection
