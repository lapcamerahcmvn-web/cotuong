@extends('admin.layout')
@section('title', 'Chuỗi bài học')
@section('heading', 'Chuỗi bài học')

@section('top-actions')
    <a href="{{ route('admin.series.create') }}" class="btn primary">+ Thêm chuỗi</a>
@endsection

@section('content')
<div class="panel card" style="padding:0;">
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Tên chuỗi</th><th>Loại</th><th>Giai đoạn</th><th>Số bài</th><th>Dự kiến</th><th>Thứ tự</th><th></th></tr></thead>
            <tbody>
            @forelse($series as $s)
                <tr>
                    <td class="t-title">
                        <a href="{{ route('admin.series.edit', $s) }}">{{ $s->name }}</a>
                        <div class="muted" style="font-size:12px;">/{{ $s->slug }}</div>
                    </td>
                    <td>{{ $s->game_mode === 'co-up' ? 'Cờ Úp' : 'Cờ Tướng' }}</td>
                    <td>{{ \App\Models\Lesson::PHASES[$s->phase] ?? '—' }}</td>
                    <td>{{ $s->lessons_count }}</td>
                    <td>{{ $s->planned_total ?? '—' }}</td>
                    <td>{{ $s->sort_order }}</td>
                    <td style="white-space:nowrap;">
                        <a href="{{ route('admin.series.edit', $s) }}" class="btn" style="min-height:32px;padding:0 12px;">Sửa</a>
                        <form method="POST" action="{{ route('admin.series.destroy', $s) }}" style="display:inline;"
                              onsubmit="return confirm('Xoá chuỗi &quot;{{ $s->name }}&quot;? Các bài trong chuỗi sẽ được gỡ khỏi chuỗi (KHÔNG bị xoá).')">
                            @csrf @method('DELETE')
                            <button class="btn danger" style="min-height:32px;padding:0 12px;">Xoá</button>
                        </form>
                    </td>
                </tr>
            @empty
                <tr><td colspan="7" style="text-align:center;color:var(--ink-faint);padding:30px;">Chưa có chuỗi bài học nào. Bấm “+ Thêm chuỗi”.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection
