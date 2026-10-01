{{-- Khung bàn cờ giải đố dùng cho khu Luyện tập — board.js mountPuzzle() gắn vào [data-board]. --}}
<div class="board-card card" data-board data-needs-board>
    <div class="board-stage">
        <div class="board-bar">
            <span class="step-pill" data-xq-pill>Đang tải…</span>
            <span class="tag" data-p-side></span>
        </div>
        <div class="board-holder" data-xq-holder></div>
    </div>
    <div class="caption-box" aria-live="polite">
        <div class="cap-step" data-xq-capstep>Chuẩn bị</div>
        <div class="cap-text" data-xq-captext>Bàn cờ đang được tải…</div>
    </div>
</div>
