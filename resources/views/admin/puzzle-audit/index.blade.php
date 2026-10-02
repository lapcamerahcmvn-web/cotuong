@extends('admin.layout')
@section('title', 'Kiểm định thế cờ')
@section('heading', 'Kiểm định thế cờ')

@push('head')
<style>
    .pa-filters { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
    .pa-filters a { padding:6px 12px; border-radius:999px; border:1px solid var(--line); font-size:13px; font-weight:600; color:var(--ink-soft); text-decoration:none; }
    .pa-filters a.on { background:var(--red); color:#fff; border-color:var(--red); }
    .pa-item { display:grid; grid-template-columns:200px 1fr; gap:18px; padding:16px; border-bottom:1px solid var(--line); }
    .pa-item:last-child { border-bottom:0; }
    .pa-board { width:200px; aspect-ratio:468/520; }
    .pa-board svg { width:100%; height:auto; display:block; }
    .pa-item h4 { margin:0 0 4px; font-size:15px; }
    .pa-moves { font-size:13px; color:var(--ink-soft); margin:6px 0; }
    .pa-row { margin:6px 0; font-size:14px; }
    .pa-tag { display:inline-block; font-size:12px; font-weight:600; padding:2px 8px; border-radius:6px; margin:2px 4px 2px 0; }
    .pa-book { background:#fde2dc; color:#9a3416; }
    .pa-esc { background:#dcefe9; color:#1f5246; }
    .pa-long { background:#fef3c7; color:#92400e; }
    .pa-form { display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-top:10px; }
    .pa-form input[type=text] { flex:1 1 220px; min-height:34px; padding:0 10px; border:1px solid var(--line); border-radius:8px; }
    .pa-form .btn { min-height:34px; padding:0 12px; }
    @media (max-width: 720px) { .pa-item { grid-template-columns:1fr; } .pa-board { width:min(260px, 100%); } }
</style>
@endpush

@section('content')
<div class="panel card">
    <p style="margin:0 0 8px;">
        Bộ giải chiếu hết đã thử <b>mọi cách đỡ</b> ở từng nước của bên thua trong {{ number_format($checked) }} thế luyện tập kết thúc bằng
        chiếu hết{{ $generated ? ' (ngày ' . \Illuminate\Support\Carbon::parse($generated)->format('d/m/Y') . ')' : '' }}.
        Dưới đây là chỗ nước đỡ trong sách <b>chưa phải cách đỡ tốt nhất</b>:
    </p>
    <ul style="margin:0 0 6px 18px;font-size:14px;">
        <li><span class="pa-tag pa-esc">Thoát</span> có cách đỡ khiến bên thắng <b>không chiếu hết được trong số nước còn lại của bài</b> (đã xét mọi nước — chắc chắn).</li>
        <li><span class="pa-tag pa-long">Kéo dài</span> vẫn bị chiếu hết nhưng phải thêm nước so với nước đỡ trong sách.</li>
    </ul>
    <p class="muted" style="margin:0;font-size:13px;">Mũi tên đỏ = nước đỡ trong sách · xanh = cách đỡ tốt hơn. Sửa bài xong (hoặc quyết định giữ nguyên vì bài cố ý minh hoạ) thì đánh dấu để theo dõi.
    Khi luyện tập, người giải đi đường khác vẫn được máy kiểm chứng — mục này chỉ để nâng chất lượng nội dung.</p>
</div>

<div class="pa-filters">
    @php $q = fn ($a) => route('admin.puzzle-audit.index', array_filter($a + ['loc' => $filter, 'loai' => $kind])); @endphp
    <a href="{{ $q(['loc' => 'open']) }}" class="{{ $filter === 'open' ? 'on' : '' }}">Chưa duyệt ({{ $counts['open'] }})</a>
    <a href="{{ $q(['loc' => 'done']) }}" class="{{ $filter === 'done' ? 'on' : '' }}">Đã xử lý ({{ $counts['done'] }})</a>
    <a href="{{ $q(['loc' => 'all']) }}" class="{{ $filter === 'all' ? 'on' : '' }}">Tất cả ({{ $counts['all'] }})</a>
    <span style="width:12px"></span>
    <a href="{{ route('admin.puzzle-audit.index', array_filter(['loc' => $filter])) }}" class="{{ ! $kind ? 'on' : '' }}">Mọi loại</a>
    <a href="{{ $q(['loai' => 'escape']) }}" class="{{ $kind === 'escape' ? 'on' : '' }}">Thoát ({{ $counts['escape'] }})</a>
    <a href="{{ $q(['loai' => 'longer']) }}" class="{{ $kind === 'longer' ? 'on' : '' }}">Chỉ kéo dài ({{ $counts['all'] - $counts['escape'] }})</a>
</div>

<div class="panel card" style="padding:0;">
@forelse($items as $it)
    @php $is = $it['issue']; @endphp
    <div class="pa-item">
        <div class="pa-board" data-pa-fen="{{ $it['fen'] }}" data-pa-book="{{ $is['book'] }}"
             data-pa-alt="{{ implode(',', array_slice(array_column($it['escape_notes'] ?: $it['longer_notes'], 'iccs'), 0, 3)) }}"
             data-pa-flip="{{ $it['puzzle']->side === 'den' ? 1 : 0 }}"></div>
        <div>
            <h4>{{ $it['lesson']?->title ?? $it['puzzle']->title }}</h4>
            <div class="muted" style="font-size:12.5px;">
                Thế luyện tập #{{ implode(', #', array_unique($it['puzzle_ids'])) }} · {{ $it['puzzle']->side === 'do' ? 'Đỏ' : 'Đen' }} giải
                @if($it['lesson'])
                    · <a href="{{ route('lessons.show', $it['lesson']->slug) }}" target="_blank">Xem bài ↗</a>
                    · <a href="{{ route('admin.lessons.edit', $it['lesson_id']) }}">Sửa bài</a>
                @endif
            </div>
            @if($it['before'])
                <div class="pa-moves">Trước đó: {{ implode(' · ', $it['before']) }}</div>
            @endif
            @php $others = array_values(array_filter($it['escape_notes'], fn ($e) => $e['iccs'] !== $is['book'])); @endphp
            <div class="pa-row">
                Nước đỡ trong sách của {{ $it['defender'] }}: <span class="pa-tag pa-book">{{ $it['book_note'] }}</span>
                @if(is_numeric($is['bookK']))
                    → bị chiếu hết sau {{ $is['bookK'] }} nước
                @else
                    → <b>chính nước này cũng không bị ép chiếu hết</b> trong {{ $is['left'] }} nước còn lại — lời giải dựa vào nước đỡ yếu ở phía sau
                @endif
            </div>
            @if($others)
                <div class="pa-row"><b>Thoát</b> (không bị chiếu hết trong {{ $is['left'] }} nước còn lại):
                    @foreach($others as $e)<span class="pa-tag pa-esc">{{ $e['note'] }}</span>@endforeach
                </div>
            @endif
            @if($it['longer_notes'])
                <div class="pa-row"><b>Kéo dài</b>:
                    @foreach($it['longer_notes'] as $e)<span class="pa-tag pa-long">{{ $e['note'] }} → {{ $e['k'] }} nước</span>@endforeach
                </div>
            @endif
            <form method="POST" action="{{ route('admin.puzzle-audit.mark') }}" class="pa-form">
                @csrf
                <input type="hidden" name="lesson_id" value="{{ $it['lesson_id'] }}">
                <input type="hidden" name="ply" value="{{ $it['ply'] }}">
                <input type="text" name="note" maxlength="500" placeholder="Ghi chú (tuỳ chọn)" value="{{ $it['mark']?->note }}">
                <button class="btn primary" name="status" value="fixed">Đã sửa bài</button>
                <button class="btn" name="status" value="keep">Giữ nguyên</button>
                @if($it['mark'])
                    <button class="btn" name="status" value="open">Bỏ đánh dấu</button>
                    <span class="badge {{ $it['mark']->status === 'fixed' ? 'published' : 'draft' }}">
                        {{ \App\Models\PuzzleAuditMark::STATUSES[$it['mark']->status] ?? $it['mark']->status }}
                        · {{ $it['mark']->user?->name }} {{ $it['mark']->updated_at?->format('d/m') }}
                    </span>
                @endif
            </form>
        </div>
    </div>
@empty
    <div style="text-align:center;color:var(--ink-faint);padding:30px;">Không có mục nào.</div>
@endforelse
</div>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function () {
    if (!window.XiangqiBoard) return;
    var idx = function (s, k) { return (9 - +s[k + 1]) * 9 + (s.charCodeAt(k) - 97); };
    var arrow = function (mv, color) { return { from: idx(mv, 0), to: idx(mv, 2), color: color }; };
    document.querySelectorAll('[data-pa-fen]').forEach(function (el) {
        var arrows = [arrow(el.dataset.paBook, '#c8451f')];
        (el.dataset.paAlt || '').split(',').filter(Boolean).forEach(function (m) { arrows.push(arrow(m, '#2f6b5e')); });
        el.innerHTML = window.XiangqiBoard.render(el.dataset.paFen, null, arrows, -1, el.dataset.paFlip === '1');
    });
});
</script>
@endpush
