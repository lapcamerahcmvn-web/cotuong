@props([
    'initialFen' => 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR',
    'steps' => [],       // collection LessonStep hoặc mảng
    'showList' => true,  // hiện cột danh sách nước bên phải
])

@php
    $payload = collect($steps)->map(fn ($s) => [
        'fen'     => is_array($s) ? ($s['fen'] ?? null) : $s->fen,
        'iccs'    => is_array($s) ? ($s['move_notation_iccs'] ?? null) : $s->move_notation_iccs,
        'wxf'     => is_array($s) ? ($s['move_notation_wxf'] ?? null) : $s->move_notation_wxf,
        'side'    => is_array($s) ? ($s['move_side'] ?? null) : $s->move_side,
        'caption' => is_array($s) ? ($s['caption'] ?? null) : $s->caption,
    ])->values();
    $hasList = $showList && $payload->count() > 0;
@endphp

<div data-xqboard tabindex="0" aria-label="Bàn cờ tương tác"
     class="xqboard-root {{ $hasList ? 'xqboard-split' : '' }}">
    <div class="board-col">
        <div class="board-card card" data-xq-boardcard>
            <div class="board-holder" data-xq-holder></div>
            <div class="controls">
                <button type="button" class="btn" data-xq-first title="Về đầu" aria-label="Về thế mở">⏮</button>
                <button type="button" class="btn" data-xq-prev aria-label="Lùi một nước">‹ Lùi</button>
                <span class="step-pill" data-xq-pill>Thế mở</span>
                <button type="button" class="btn primary" data-xq-next aria-label="Tiến một nước">Tiến ›</button>
                <button type="button" class="btn" data-xq-last title="Đến cuối" aria-label="Đến nước cuối">⏭</button>
                <button type="button" class="btn" data-xq-fs title="Phóng to toàn màn hình" aria-label="Phóng to toàn màn hình">⛶</button>
            </div>
            <div class="caption-box">
                <div class="cap-step" data-xq-capstep>Thế cờ mở đầu</div>
                <div class="cap-text" data-xq-captext>Bấm “Tiến” để đi từng nước.</div>
            </div>
        </div>
    </div>

    @if($hasList)
        <div class="side-card card">
            <div class="side-head"><span>Diễn giải từng nước</span><span class="muted" style="font-weight:600;">{{ $payload->count() }} nước</span></div>
            <div class="move-list move-list--full" data-xq-list></div>
        </div>
    @endif

    <script type="application/json">@json(['initialFen' => $initialFen, 'steps' => $payload], JSON_UNESCAPED_UNICODE)</script>
</div>
