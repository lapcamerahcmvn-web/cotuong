@props([
    'initialFen' => 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR',
    'steps' => [],       // collection LessonStep hoặc mảng (mạch chính tuyến tính)
    'tree' => null,      // cây biến (variation_tree) — nếu có → bàn cờ hiện mũi tên chọn biến
    'showList' => true,  // hiện cột danh sách nước bên phải
    'caption' => null,   // chú thích tĩnh (bài minh hoạ không có nước đi)
    'mode' => 'view',    // 'view' (mặc định) | 'puzzle' (giải đố — tự đi quân, máy đáp trả)
    'puzzleSide' => null, // 'do' | 'den' — bên người dùng tự giải (bắt buộc khi mode=puzzle)
    'sourceLessonId' => null, // id bài học (nếu có) — gắn kèm khi lưu FEN vào thư viện cá nhân
    'compact' => false,  // ẩn hàng nút phụ (dùng cho bàn cờ minh hoạ nhỏ ở trang chủ)
])

@php
    $payload = collect($steps)->map(fn ($s) => [
        'fen'     => is_array($s) ? ($s['fen'] ?? null) : $s->fen,
        'iccs'    => is_array($s) ? ($s['move_notation_iccs'] ?? null) : $s->move_notation_iccs,
        'wxf'     => is_array($s) ? ($s['move_notation_wxf'] ?? null) : $s->move_notation_wxf,
        'side'    => is_array($s) ? ($s['move_side'] ?? null) : $s->move_side,
        'caption' => is_array($s) ? ($s['caption'] ?? null) : $s->caption,
    ])->values();
    $isPuzzle = $mode === 'puzzle' && $puzzleSide && $payload->count() > 0;
    $hasList = $showList && $payload->count() > 0 && !$isPuzzle;
    $isStatic = $payload->count() === 0;   // bàn cờ minh hoạ tĩnh (không có nước đi)
    $jsonConfig = [
        'initialFen' => $initialFen,
        'steps'      => $payload,
        'tree'       => $isPuzzle ? null : ($tree ?: null),
        'mode'       => $isPuzzle ? 'puzzle' : 'view',
        'puzzleSide' => $puzzleSide,
    ];
@endphp

<div data-xqboard tabindex="0" aria-label="Bàn cờ tương tác"
     class="xqboard-root {{ $hasList ? 'xqboard-split' : '' }}">
    <div class="board-col">
        <div class="board-card card" data-xq-boardcard>
            <div class="board-stage">
                <div class="board-bar">
                    @if(!$isStatic)
                        <span class="step-pill" data-xq-pill>{{ $isPuzzle ? 'Đang giải…' : 'Thế mở · '.$payload->count().' nước' }}</span>
                    @else
                        <span class="step-pill">Thế cờ minh hoạ</span>
                    @endif
                    <span class="board-fab-group" @if($sourceLessonId) data-xq-source-lesson="{{ $sourceLessonId }}" @endif>
                        @if(!$isStatic)
                            <button type="button" class="board-fab" data-xq-sound title="Bật/tắt âm thanh">🔊</button>
                        @endif
                        <button type="button" class="board-fab" data-xq-menu-toggle aria-haspopup="true" aria-expanded="false" title="Thêm thao tác" aria-label="Thêm thao tác">⋯</button>
                        <div class="board-menu" data-xq-menu hidden>
                            <button type="button" data-xq-copyfen data-xq-icon="copy" data-xq-label="Sao chép FEN">📋 Sao chép FEN</button>
                            @auth
                                <button type="button" data-xq-savefen data-xq-icon="bookmark" data-xq-label="Lưu vào thư viện">🔖 Lưu vào thư viện</button>
                            @endauth
                        </div>
                        <button type="button" class="board-fab" data-xq-fs title="Phóng to toàn màn hình" aria-label="Phóng to toàn màn hình">⛶</button>
                    </span>
                </div>
                <div class="board-holder" data-xq-holder></div>
            </div>

            @if($isPuzzle)
                <div class="controls">
                    <button type="button" class="btn btn--ghost" data-xq-hint data-xq-icon="bulb" data-xq-label="Gợi ý">Gợi ý</button>
                    <button type="button" class="btn" data-xq-reset data-xq-icon="reset" data-xq-label="Làm lại" aria-label="Làm lại từ đầu">↺ Làm lại</button>
                    <button type="button" class="btn" data-xq-solution data-xq-icon="eye" data-xq-label="Lời giải" aria-label="Xem lời giải">Xem lời giải</button>
                </div>
            @elseif(!$isStatic)
                <div class="progress progress--sm mt-3" aria-hidden="true"><div class="progress__bar" data-xq-progress style="width:0"></div></div>
                <div class="controls controls--main">
                    <button type="button" class="btn btn--icon" data-xq-first data-xq-icon="first" aria-label="Về thế mở">⏮</button>
                    <button type="button" class="btn" data-xq-prev data-xq-icon="chev-left" data-xq-label="Lùi" aria-label="Lùi một nước">‹ Lùi</button>
                    <button type="button" class="btn primary" data-xq-next aria-label="Tiến một nước"><span>Tiến</span> ›</button>
                    <button type="button" class="btn btn--icon" data-xq-last data-xq-icon="last" aria-label="Đến nước cuối">⏭</button>
                </div>
                @unless($compact)
                <div class="controls controls--sub">
                    <button type="button" class="btn btn--ghost" data-xq-flip data-xq-icon="flip" data-xq-label="Lật bàn" aria-label="Lật bàn cờ">⟲ Lật bàn</button>
                    <button type="button" class="btn btn--ghost" data-xq-autoplay aria-label="Tự chạy các nước">▶ Tự chạy</button>
                </div>
                @endunless
            @endif

            @if($isPuzzle)
            <div class="caption-box" aria-live="polite">
                <div class="cap-step" data-xq-capstep>Đang giải…</div>
                <div class="cap-text" data-xq-captext>Bấm hoặc kéo quân của bạn để đi.</div>
            </div>
            @elseif(!$isStatic)
            <div class="caption-box" aria-live="polite">
                <div class="cap-step" data-xq-capstep>Thế cờ mở đầu</div>
                <div class="cap-text" data-xq-captext>Bấm “Tiến”, dùng phím ←/→ hoặc vuốt trên bàn cờ.</div>
            </div>
            @elseif($caption)
            <p class="board-note">{{ $caption }}</p>
            @endif
            <div class="branch-box" data-xq-branches style="display:none;"></div>
        </div>
    </div>

    @if($hasList)
        <div class="side-card card">
            <div class="side-head"><span>Diễn giải từng nước</span><span class="muted">{{ $payload->count() }} nước</span></div>
            {{-- Render sẵn trong HTML (không đợi JS) để Google/trình đọc thấy được lời bình từng
                 nước ngay từ view-source. board.js sẽ xoá và dựng lại y hệt (kèm sự kiện bấm) khi chạy. --}}
            <div class="move-list move-list--full" data-xq-list>
                @foreach($payload as $i => $step)
                    @php $_side = $step['side'] === 'den' ? 'Đen' : 'Đỏ'; @endphp
                    <button type="button" class="move-row">
                        <span class="num">{{ $i + 1 }}.</span>
                        <span class="mv">
                            <span class="side-dot {{ $step['side'] === 'den' ? 'den' : 'do' }}"></span>
                            <span class="mv-label">{{ $step['wxf'] ?: $_side }}</span>
                            @if($step['caption'] && trim($step['caption']) !== trim((string) $step['wxf']))<span class="cap-inline">{{ $step['caption'] }}</span>@endif
                        </span>
                    </button>
                @endforeach
            </div>
        </div>
    @endif

    <script type="application/json">@json($jsonConfig, JSON_UNESCAPED_UNICODE)</script>
</div>
