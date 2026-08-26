@extends('admin.layout')
@section('title', 'Duyệt bình luận')
@section('heading', 'Bình luận')

@section('content')
<div class="admin-tabs">
    @php $tabs = ['pending' => 'Chờ duyệt' . ($pendingCount ? " ($pendingCount)" : ''), 'approved' => 'Đã duyệt', 'all' => 'Tất cả']; @endphp
    @foreach($tabs as $k => $label)
        <a href="{{ route('admin.comments.index', ['filter' => $k]) }}"
           class="admin-tab {{ $filter === $k ? 'on' : '' }}">{{ $label }}</a>
    @endforeach
    @if($pendingCount > 0)
        <form method="POST" action="{{ route('admin.comments.approve-all') }}" style="margin-left:auto;"
              onsubmit="return confirm('Duyệt tất cả {{ $pendingCount }} bình luận đang chờ?')">
            @csrf<button class="btn primary" type="submit">Duyệt tất cả ({{ $pendingCount }})</button>
        </form>
    @endif
</div>

@if($comments->isEmpty())
    <div class="card" style="padding:28px;text-align:center;color:var(--ink-faint);">Không có bình luận nào.</div>
@else
    <div class="cmt-admin-list">
        @foreach($comments as $c)
            <div class="card cmt-admin {{ $c->approved ? '' : 'is-pending' }}">
                <div class="cmt-admin-head">
                    <strong>{{ $c->user->name ?? 'Ẩn danh' }}</strong>
                    <span class="muted" style="font-size:12.5px;">{{ $c->created_at->locale('vi')->diffForHumans() }}</span>
                    @if($c->approved)<span class="badge badge-ok">Đã duyệt</span>@else<span class="badge badge-wait">Chờ duyệt</span>@endif
                    @if($c->parent_id)<span class="badge">Trả lời</span>@endif
                </div>
                <div class="cmt-admin-body">{{ $c->body }}</div>
                <div class="cmt-admin-foot">
                    @if($c->lesson)
                        <a href="{{ route('lessons.show', $c->lesson->slug) }}#c{{ $c->id }}" target="_blank" class="muted" style="font-size:13px;">
                            ↗ {{ \Illuminate\Support\Str::limit($c->lesson->title, 40) }}
                        </a>
                    @endif
                    <span style="flex:1;"></span>
                    @unless($c->approved)
                        <form method="POST" action="{{ route('admin.comments.approve', $c) }}" style="display:inline;">
                            @csrf<button class="btn primary" type="submit">Duyệt</button>
                        </form>
                    @endunless
                    <form method="POST" action="{{ route('admin.comments.destroy', $c) }}" style="display:inline;"
                          onsubmit="return confirm('Xóa bình luận này? (kèm các trả lời)')">
                        @csrf @method('DELETE')<button class="btn danger" type="submit">Xóa</button>
                    </form>
                </div>
            </div>
        @endforeach
    </div>
    <div style="margin-top:18px;">{{ $comments->links() }}</div>
@endif
@endsection
