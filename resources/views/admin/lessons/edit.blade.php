@extends('admin.layout')
@section('title', 'Sửa bài học')
@section('heading', 'Sửa bài học')

@section('top-actions')
<div style="display:flex;gap:8px;">
    <a href="{{ route('lessons.show', $lesson->slug) }}" target="_blank" class="btn">Xem trước ↗</a>
    <form method="POST" action="{{ route('admin.lessons.generate', $lesson) }}" onsubmit="return confirm('Gọi AI sinh nội dung + caption? Bài sẽ chuyển sang trạng thái review.')">
        @csrf<button class="btn" type="submit">✦ Sinh nội dung AI</button>
    </form>
</div>
@endsection

@section('content')
<form method="POST" action="{{ route('admin.lessons.update', $lesson) }}" id="lesson-form">
    @csrf @method('PUT')
    <div class="form-grid">
        {{-- Cột chính --}}
        <div>
            <div class="panel card">
                <div class="field">
                    <label for="title">Tiêu đề</label>
                    <input class="input" id="title" name="title" value="{{ old('title', $lesson->title) }}" required>
                </div>
                <div class="field">
                    <label for="summary">Tóm tắt (meta description nguồn)</label>
                    <textarea class="input" id="summary" name="summary" rows="2">{{ old('summary', $lesson->summary) }}</textarea>
                </div>
                <div class="field">
                    <label for="content">Nội dung bài học</label>
                    <textarea class="input editor-full" id="content" name="content">{{ old('content', $lesson->content) }}</textarea>
                </div>
            </div>

            <div class="panel card">
                <h3>SEO</h3>
                <div class="field">
                    <label for="seo_title">SEO title <span class="hint">≤ 60 ký tự</span></label>
                    <input class="input" id="seo_title" name="seo_title" maxlength="255" value="{{ old('seo_title', $lesson->seo_title) }}">
                </div>
                <div class="field">
                    <label for="seo_description">SEO description <span class="hint">150–160 ký tự</span></label>
                    <textarea class="input" id="seo_description" name="seo_description" rows="2" maxlength="255">{{ old('seo_description', $lesson->seo_description) }}</textarea>
                </div>
            </div>

        </div>

        {{-- Cột phải --}}
        <div>
            <div class="panel card">
                <button class="btn primary" type="submit" style="width:100%;margin-bottom:12px;">Lưu bài học</button>
                <div class="field">
                    <label for="status">Trạng thái</label>
                    <select class="input" id="status" name="status">
                        @foreach(['draft'=>'Nháp','review'=>'Chờ duyệt','needs_fix'=>'Cần sửa','published'=>'Xuất bản'] as $k=>$v)
                            <option value="{{ $k }}" @selected(old('status',$lesson->status)===$k)>{{ $v }}</option>
                        @endforeach
                    </select>
                </div>
                <label class="check"><input type="checkbox" name="is_featured" value="1" @checked(old('is_featured',$lesson->is_featured))> Bài nổi bật (hiện trang chủ)</label>
            </div>

            <div class="panel card">
                <h3>Phân loại</h3>
                <div class="field">
                    <label for="series_id">Chuỗi bài</label>
                    <select class="input" id="series_id" name="series_id">
                        <option value="">— Không —</option>
                        @foreach($seriesList as $s)
                            <option value="{{ $s->id }}" @selected(old('series_id',$lesson->series_id)==$s->id)>{{ $s->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="row-2">
                    <div class="field">
                        <label for="order_in_series">Thứ tự</label>
                        <input class="input" type="number" id="order_in_series" name="order_in_series" value="{{ old('order_in_series',$lesson->order_in_series) }}">
                    </div>
                    <div class="field">
                        <label for="game_mode">Loại cờ</label>
                        <select class="input" id="game_mode" name="game_mode">
                            @foreach(\App\Models\Lesson::GAME_MODES as $k=>$v)
                                <option value="{{ $k }}" @selected(old('game_mode',$lesson->game_mode)===$k)>{{ $v }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="row-2">
                    <div class="field">
                        <label for="phase">Giai đoạn</label>
                        <select class="input" id="phase" name="phase">
                            <option value="">— Không —</option>
                            @foreach(\App\Models\Lesson::PHASES as $k=>$v)
                                <option value="{{ $k }}" @selected(old('phase',$lesson->phase)===$k)>{{ $v }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="field">
                        <label for="level">Cấp độ</label>
                        <select class="input" id="level" name="level">
                            @foreach(\App\Models\Lesson::LEVELS as $k=>$v)
                                <option value="{{ $k }}" @selected(old('level',$lesson->level)===$k)>{{ $v }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <label class="check" style="margin-top:4px;"><input type="checkbox" name="reslug" value="1"> Tạo lại đường dẫn (slug) từ tiêu đề <span class="hint">— chỉ khi chưa launch</span></label>
                <p class="hint" style="margin-top:8px;">Slug hiện tại: <code>{{ $lesson->slug }}</code></p>
            </div>

            @if($lesson->decode_confidence === 'low' || !empty($lesson->decode_warnings))
            <div class="panel card">
                <h3 style="color:var(--red)">Cảnh báo giải mã</h3>
                <p class="hint">Độ tin cậy: <span class="badge {{ $lesson->decode_confidence }}">{{ $lesson->decode_confidence }}</span> — soi kỹ bàn cờ trước khi publish.</p>
                @if(!empty($lesson->decode_warnings))
                    <ul style="font-size:12.5px;color:var(--ink-soft);padding-left:18px;margin:8px 0 0;">
                        @foreach(array_slice($lesson->decode_warnings,0,6) as $w)<li>{{ $w }}</li>@endforeach
                    </ul>
                @endif
            </div>
            @endif
        </div>
    </div>

    {{-- Trình soạn bàn cờ: sửa nước đi + thêm biến (dùng chung với trang Tạo) --}}
    <div class="panel card" style="margin-top:6px;">
        <h3>Bàn cờ — soạn nước đi &amp; biến</h3>
        <p class="hint" style="margin:-6px 0 14px;">Bấm <strong>quân → ô đích</strong> để sửa/thêm nước; nút <strong>+ Biến</strong> để thêm nhánh; lời giảng nhập ngay dưới mỗi nước. Bấm <strong>Lưu bài học</strong> để lưu (cả nước đi, biến và lời giảng).</p>
        @include('admin.lessons._board-panel', [
            'initFen'   => $lesson->initial_fen,
            'initTree'  => $lesson->variation_tree,
            'initSteps' => $lesson->steps->map(fn ($s) => ['iccs' => $s->move_notation_iccs, 'caption' => $s->caption])->values(),
        ])
    </div>
</form>

<form method="POST" action="{{ route('admin.lessons.destroy', $lesson) }}" onsubmit="return confirm('Xóa vĩnh viễn bài học này?')" style="margin-top:20px;">
    @csrf @method('DELETE')
    <button type="submit" class="btn" style="color:var(--red);border-color:var(--red);">Xóa bài học</button>
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
        license_key: 'gpl',   // TinyMCE 8 self-hosted GPL — bắt buộc, nếu không editor bị disable
        promotion: false,
        branding: false,
        height: 420,
        menubar: false,
        plugins: 'lists link autolink',
        toolbar: 'undo redo | h2 h3 | bold italic | bullist numlist | link | removeformat',
        block_formats: 'Đoạn=p; Tiêu đề H2=h2; Tiêu đề H3=h3',
        content_style: "body{font-family:'Be Vietnam Pro',sans-serif;font-size:15px;}",
        skin: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oxide-dark' : 'oxide',
        content_css: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'default',
    });
}
document.addEventListener('DOMContentLoaded', initEditors);
// Đồng bộ TinyMCE về textarea trước khi submit.
document.getElementById('lesson-form').addEventListener('submit', function () {
    if (typeof tinymce !== 'undefined') tinymce.triggerSave();
});
</script>
@endpush
