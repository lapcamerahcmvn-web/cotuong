@extends('admin.layout')
@section('title', 'Soạn bài bằng bàn cờ')
@section('heading', 'Soạn bài bằng bàn cờ')

@section('content')
<form id="board-editor-form" method="POST" action="{{ route('admin.board-editor.store') }}">
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
            <label class="be-label">Nội dung bài (có thể để trống rồi bổ sung sau)</label>
            <textarea id="content" class="be-input editor-full" name="content" rows="6">{{ old('content') }}</textarea>
        </div>
    </div>

    {{-- Trình soạn bàn cờ (dùng chung với trang Sửa) --}}
    @include('admin.lessons._board-panel')

    <div style="display:flex;gap:10px;">
        <button type="submit" class="btn primary lg">Tạo bài học (nháp)</button>
        <a href="{{ route('admin.lessons.index') }}" class="btn lg">Huỷ</a>
    </div>
</form>

@push('scripts')
<script src="{{ asset('tinymce/tinymce.min.js') }}"></script>
<script>
function initEditors() {
    if (typeof tinymce === 'undefined') return;
    tinymce.remove('.editor-full');
    tinymce.init({
        selector: '.editor-full',
        license_key: 'gpl',
        promotion: false, branding: false, height: 320, menubar: false,
        plugins: 'lists link autolink',
        toolbar: 'undo redo | h2 h3 | bold italic | bullist numlist | link | removeformat',
        block_formats: 'Đoạn=p; Tiêu đề H2=h2; Tiêu đề H3=h3',
        content_style: "body{font-family:'Be Vietnam Pro',sans-serif;font-size:15px;}",
        skin: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oxide-dark' : 'oxide',
        content_css: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'default',
    });
}
document.addEventListener('DOMContentLoaded', initEditors);
// Đồng bộ TinyMCE về textarea trước khi submit (nếu không content sẽ rỗng).
document.getElementById('board-editor-form').addEventListener('submit', function () {
    if (typeof tinymce !== 'undefined') tinymce.triggerSave();
});
</script>
@endpush
@endsection
