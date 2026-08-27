@extends('admin.layout')
@section('title', 'Soạn bài bằng bàn cờ')
@section('heading', 'Soạn bài bằng bàn cờ')

@section('content')
<form method="POST" action="{{ route('admin.board-editor.store') }}" id="lesson-form">
    @csrf
    <div class="form-grid">
        {{-- Cột chính --}}
        <div>
            <div class="panel card">
                <div class="field">
                    <label for="title">Tiêu đề <span style="color:var(--red)">*</span></label>
                    <input class="input" id="title" name="title" value="{{ old('title') }}" required maxlength="200">
                </div>
                <div class="field">
                    <label for="summary">Tóm tắt (meta description nguồn)</label>
                    <textarea class="input" id="summary" name="summary" rows="2" maxlength="255">{{ old('summary') }}</textarea>
                </div>
                <div class="field">
                    <label for="content">Nội dung bài học</label>
                    <textarea class="input editor-full" id="content" name="content">{{ old('content') }}</textarea>
                </div>
            </div>

            <div class="panel card">
                <h3>SEO</h3>
                <div class="field">
                    <label for="seo_title">SEO title <span class="hint">≤ 60 ký tự</span></label>
                    <input class="input" id="seo_title" name="seo_title" maxlength="255" value="{{ old('seo_title') }}">
                </div>
                <div class="field">
                    <label for="seo_description">SEO description <span class="hint">150–160 ký tự</span></label>
                    <textarea class="input" id="seo_description" name="seo_description" rows="2" maxlength="255">{{ old('seo_description') }}</textarea>
                </div>
            </div>
        </div>

        {{-- Cột phải --}}
        <div>
            <div class="panel card">
                <button class="btn primary" type="submit" style="width:100%;margin-bottom:12px;">Tạo bài học</button>
                <div class="field">
                    <label for="status">Trạng thái</label>
                    <select class="input" id="status" name="status">
                        @foreach(['draft'=>'Nháp','review'=>'Chờ duyệt','needs_fix'=>'Cần sửa','published'=>'Xuất bản'] as $k=>$v)
                            <option value="{{ $k }}" @selected(old('status','draft')===$k)>{{ $v }}</option>
                        @endforeach
                    </select>
                </div>
                <label class="check"><input type="checkbox" name="is_featured" value="1" @checked(old('is_featured'))> Bài nổi bật (hiện trang chủ)</label>
            </div>

            <div class="panel card">
                <h3>Phân loại</h3>
                <div class="field">
                    <label for="series_id">Chuỗi bài</label>
                    <select class="input" id="series_id" name="series_id">
                        <option value="">— Không —</option>
                        @foreach($series as $s)
                            <option value="{{ $s->id }}" @selected(old('series_id')==$s->id)>{{ $s->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="row-2">
                    <div class="field">
                        <label for="order_in_series">Thứ tự</label>
                        <input class="input" type="number" id="order_in_series" name="order_in_series" value="{{ old('order_in_series') }}">
                    </div>
                    <div class="field">
                        <label for="be-gamemode">Loại cờ</label>
                        <select class="input" id="be-gamemode" name="game_mode">
                            <option value="co-tuong" @selected(old('game_mode')==='co-tuong')>Cờ Tướng</option>
                            <option value="co-up" @selected(old('game_mode')==='co-up')>Cờ Úp</option>
                        </select>
                    </div>
                </div>
                <div class="row-2">
                    <div class="field">
                        <label for="phase">Giai đoạn</label>
                        <select class="input" id="phase" name="phase">
                            <option value="">— Không —</option>
                            @foreach(\App\Models\Lesson::PHASES as $k=>$v)
                                <option value="{{ $k }}" @selected(old('phase')===$k)>{{ $v }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="field">
                        <label for="level">Cấp độ</label>
                        <select class="input" id="level" name="level">
                            @foreach(\App\Models\Lesson::LEVELS as $k=>$v)
                                <option value="{{ $k }}" @selected(old('level')===$k)>{{ $v }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <p class="hint" style="margin-top:8px;">Đường dẫn (slug) tạo tự động từ tiêu đề.</p>
            </div>
        </div>
    </div>

    {{-- Trình soạn bàn cờ (dùng chung với trang Sửa) --}}
    <div class="panel card" style="margin-top:6px;">
        <h3>Bàn cờ — soạn nước đi &amp; biến</h3>
        <p class="hint" style="margin:-6px 0 14px;">Bấm <strong>quân → ô đích</strong> để ghi nước (đúng luật, tự sinh ký hiệu); nút <strong>+ Biến</strong> để thêm nhánh; lời giảng nhập ngay dưới mỗi nước. Cờ Úp: chọn “Loại cờ = Cờ Úp” rồi xếp quân + Đậy nắp.</p>
        @include('admin.lessons._board-panel')
    </div>
</form>
@endsection

@push('scripts')
<script src="{{ asset('tinymce/tinymce.min.js') }}"></script>
<script>
function initEditors() {
    if (typeof tinymce === 'undefined') return;
    tinymce.remove('.editor-full');
    tinymce.init({
        selector: '.editor-full',
        license_key: 'gpl',
        promotion: false, branding: false, height: 420, menubar: false,
        plugins: 'lists link autolink',
        toolbar: 'undo redo | h2 h3 | bold italic | bullist numlist | link | removeformat',
        block_formats: 'Đoạn=p; Tiêu đề H2=h2; Tiêu đề H3=h3',
        content_style: "body{font-family:'Be Vietnam Pro',sans-serif;font-size:15px;}",
        skin: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oxide-dark' : 'oxide',
        content_css: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'default',
    });
}
document.addEventListener('DOMContentLoaded', initEditors);
document.getElementById('lesson-form').addEventListener('submit', function () {
    if (typeof tinymce !== 'undefined') tinymce.triggerSave();
});
</script>
@endpush
