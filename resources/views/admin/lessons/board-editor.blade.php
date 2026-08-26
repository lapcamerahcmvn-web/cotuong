@extends('admin.layout')
@section('title', 'Soạn bài bằng bàn cờ')
@section('heading', 'Soạn bài bằng bàn cờ')

@section('content')
<form method="POST" action="{{ route('admin.board-editor.store') }}">
    @csrf

    <div class="card" style="padding:18px 20px;margin-bottom:18px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;">
            <div>
                <label class="be-label">Tiêu đề bài <span style="color:var(--red)">*</span></label>
                <input class="be-input" name="title" required maxlength="200" value="{{ old('title') }}">
            </div>
            <div>
                <label class="be-label">Chuỗi bài</label>
                <select class="be-input" name="series_id">
                    <option value="">— Không thuộc chuỗi —</option>
                    @foreach($series as $s)
                        <option value="{{ $s->id }}" @selected(old('series_id')==$s->id)>{{ $s->name }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label class="be-label">Loại cờ</label>
                <select class="be-input" name="game_mode" id="be-gamemode">
                    <option value="co-tuong">Cờ Tướng</option>
                    <option value="co-up">Cờ Úp</option>
                </select>
            </div>
            <div>
                <label class="be-label">Giai đoạn (cờ tướng)</label>
                <select class="be-input" name="phase">
                    <option value="">— Không —</option>
                    <option value="nhap-mon">Nhập môn</option>
                    <option value="khai-cuoc">Khai cuộc</option>
                    <option value="trung-cuoc">Trung cuộc</option>
                    <option value="tan-cuoc">Tàn cuộc</option>
                </select>
            </div>
            <div>
                <label class="be-label">Cấp độ</label>
                <select class="be-input" name="level">
                    <option value="co-ban">Cơ bản</option>
                    <option value="trung-cap">Trung cấp</option>
                    <option value="nang-cao">Nâng cao</option>
                </select>
            </div>
            <div>
                <label class="be-label">Tóm tắt (summary)</label>
                <input class="be-input" name="summary" maxlength="255" value="{{ old('summary') }}">
            </div>
        </div>
        <div style="margin-top:14px;">
            <label class="be-label">Nội dung bài (HTML, có thể để trống rồi bổ sung sau)</label>
            <textarea class="be-input" name="content" rows="3">{{ old('content') }}</textarea>
        </div>
    </div>

    {{-- Trình soạn bàn cờ --}}
    <div class="card" style="padding:18px 20px;margin-bottom:18px;" data-board-editor data-init="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR">
        <div class="be-modes">
            <button type="button" class="be-mode on" data-be-mode="setup">1 · Xếp quân (tạo thế)</button>
            <button type="button" class="be-mode" data-be-mode="move">2 · Soạn nước đi</button>
        </div>
        <div data-be-msg style="min-height:20px;font-size:13px;font-weight:600;margin-bottom:8px;"></div>

        <div class="be-tools" data-be-setup-tools>
            <div class="be-palette" data-be-palette></div>
            <div class="be-tool-row">
                <button type="button" class="btn" data-be-start-normal>Thế mở Cờ Tướng</button>
                <button type="button" class="btn" data-be-start-up>Thế mở Cờ Úp</button>
                <button type="button" class="btn danger" data-be-clear>Xoá hết</button>
                <span class="muted" style="font-size:13px;">Chọn quân ở bảng rồi bấm lên bàn cờ để đặt.</span>
            </div>
        </div>

        <div class="be-tools" data-be-move-tools style="display:none;">
            <div class="be-tool-row">
                <button type="button" class="btn" data-be-undo>↶ Bỏ nước cuối</button>
                <span class="muted" style="font-size:13px;">Bấm vào <strong>quân</strong> rồi bấm <strong>ô đích</strong> để ghi một nước. Quân úp sẽ hỏi binh chủng lật ra.</span>
            </div>
        </div>

        <div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:14px;">
            <div data-be-board style="flex:0 0 auto;"></div>
            <div style="flex:1;min-width:260px;">
                <h3 style="margin:0 0 10px;font-size:15px;font-weight:800;">Danh sách nước đi</h3>
                <div data-be-moves></div>
            </div>
        </div>

        <input type="hidden" name="initial_fen">
        <input type="hidden" name="steps_json">
    </div>

    <div style="display:flex;gap:10px;">
        <button type="submit" class="btn primary lg">Tạo bài học (nháp)</button>
        <a href="{{ route('admin.lessons.index') }}" class="btn lg">Huỷ</a>
    </div>
</form>

@push('scripts')
<script src="{{ asset('js/board-editor.js') }}?v={{ @filemtime(public_path('js/board-editor.js')) }}" defer></script>
<script>
// đổi thế mở gợi ý theo loại cờ (chỉ gợi ý, admin vẫn tự xếp)
document.getElementById('be-gamemode').addEventListener('change', function(){
    var btn = document.querySelector(this.value==='co-up' ? '[data-be-start-up]' : '[data-be-start-normal]');
    if (btn) btn.click();
});
</script>
@endpush
@endsection
