{{-- Bảng soạn nước đi bằng bàn cờ (dùng chung cho TẠO và SỬA bài).
     Params (qua @include): $initFen, $initTree (variation_tree|null), $initSteps ([{iccs,caption}]). --}}
@php
    $_fen = $initFen ?? 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
@endphp
<div class="card" style="padding:18px 20px;margin-bottom:18px;" data-board-editor data-init="{{ $_fen }}">
    <script type="application/json" data-be-init>@json(['fen' => $_fen, 'tree' => $initTree ?? null, 'steps' => $initSteps ?? []], JSON_UNESCAPED_UNICODE)</script>

    <div class="be-modes">
        <button type="button" class="be-mode" data-be-mode="setup">1 · Xếp quân (tạo thế)</button>
        <button type="button" class="be-mode on" data-be-mode="move">2 · Soạn nước đi</button>
    </div>
    <div data-be-msg style="min-height:20px;font-size:13px;font-weight:600;margin-bottom:8px;"></div>

    <div class="be-tools" data-be-setup-tools style="display:none;">
        <div class="be-palette" data-be-palette></div>
        <div class="be-tool-row">
            <button type="button" class="btn" data-be-start-normal>Thế mở Cờ Tướng</button>
            <button type="button" class="btn" data-be-start-up>Thế mở Cờ Úp</button>
            <button type="button" class="btn" data-be-cover title="Chuyển các quân sáng (trừ 2 Tướng) thành quân úp">🁢 Đậy nắp quân (Cờ Úp)</button>
            <button type="button" class="btn danger" data-be-clear>Xoá hết</button>
        </div>
        <span class="muted" style="font-size:13px;display:block;margin-top:6px;">Chọn quân ở bảng rồi bấm lên bàn cờ để đặt. Cờ Úp: xếp quân sáng đúng vị trí mỗi bên rồi bấm <strong>Đậy nắp quân</strong>.</span>
    </div>

    <div class="be-tools" data-be-move-tools>
        <div class="be-tool-row">
            <button type="button" class="btn" data-be-undo>↶ Xoá nước đang chọn</button>
            <span class="muted" style="font-size:13px;">Bấm <strong>quân</strong> → <strong>ô đích</strong> để ghi nước (đúng luật, tự sinh ký hiệu). Tạo <strong>biến</strong>: bấm nút <strong>+ Biến</strong> trên một nước rồi đi nước khác. Quân úp tự lật đúng binh chủng.</span>
        </div>
    </div>

    <div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:14px;">
        <div data-be-board style="flex:0 0 auto;"></div>
        <div style="flex:1;min-width:260px;">
            <h3 style="margin:0 0 10px;font-size:15px;font-weight:800;">Danh sách nước đi <span class="muted" style="font-weight:600;font-size:12px;">(có phân nhánh biến)</span></h3>
            <div data-be-moves></div>
        </div>
    </div>

    <input type="hidden" name="initial_fen">
    <input type="hidden" name="steps_json">
    <input type="hidden" name="variation_tree">
</div>

@once
    @push('scripts')
    <script src="{{ asset('js/board-editor.js') }}?v={{ @filemtime(public_path('js/board-editor.js')) }}" defer></script>
    @endpush
@endonce
