@extends('admin.layout')
@section('title', $post->exists ? 'Sửa bài viết' : 'Viết bài mới')
@section('heading', $post->exists ? 'Sửa bài viết' : 'Viết bài mới')

@section('top-actions')
    @if($post->exists)
        <a href="{{ route('posts.show', [$post->category?->slug ?: 'tin-tuc', $post->slug]) }}" target="_blank" class="btn">Xem trước ↗</a>
    @endif
@endsection

@section('content')
<form method="POST" action="{{ $post->exists ? route('admin.posts.update', $post) : route('admin.posts.store') }}"
      enctype="multipart/form-data" id="post-form">
    @csrf
    @if($post->exists) @method('PUT') @endif

    <div class="form-grid">
        {{-- Cột chính --}}
        <div>
            <div class="panel card">
                <div class="field">
                    <label for="title">Tiêu đề</label>
                    <input class="input" id="title" name="title" value="{{ old('title', $post->title) }}" required>
                </div>
                <div class="field">
                    <label for="excerpt">Tóm tắt (hiện ở danh sách + meta description mặc định)</label>
                    <textarea class="input" id="excerpt" name="excerpt" rows="2" maxlength="500">{{ old('excerpt', $post->excerpt) }}</textarea>
                </div>
                <div class="field">
                    <label for="content">Nội dung bài viết</label>
                    <textarea class="input editor-full-post" id="content" name="content">{{ old('content', $post->content) }}</textarea>
                    <p class="hint" style="margin-top:6px;">Dán URL YouTube để nhúng video. Bấm nút "♟ Bàn cờ" trên thanh công cụ để nhúng 1 thế cờ (FEN) hoặc nguyên bàn cờ + nước đi của 1 bài học có sẵn (nhập slug bài học).</p>
                </div>
            </div>

            <div class="panel card">
                <h3>SEO</h3>
                <div class="field">
                    <label for="seo_title">SEO title <span class="hint">≤ 60 ký tự</span></label>
                    <input class="input" id="seo_title" name="seo_title" maxlength="255" value="{{ old('seo_title', $post->seo_title) }}">
                </div>
                <div class="field">
                    <label for="seo_description">SEO description <span class="hint">150–160 ký tự</span></label>
                    <textarea class="input" id="seo_description" name="seo_description" rows="2" maxlength="255">{{ old('seo_description', $post->seo_description) }}</textarea>
                </div>
            </div>
        </div>

        {{-- Cột phải --}}
        <div>
            <div class="panel card">
                <button class="btn primary" type="submit" style="width:100%;margin-bottom:12px;">{{ $post->exists ? 'Lưu bài viết' : 'Tạo bài viết' }}</button>
                <div class="field">
                    <label for="status">Trạng thái</label>
                    <select class="input" id="status" name="status">
                        <option value="draft" @selected(old('status', $post->status ?? 'draft')==='draft')>Nháp</option>
                        <option value="published" @selected(old('status', $post->status)==='published')>Xuất bản</option>
                    </select>
                </div>
                <div class="field">
                    <label for="post_category_id">Chuyên mục</label>
                    <select class="input" id="post_category_id" name="post_category_id">
                        <option value="">— Không —</option>
                        @foreach($categories as $c)
                            <option value="{{ $c->id }}" @selected((string) old('post_category_id', $post->post_category_id)===(string) $c->id)>{{ $c->name }}</option>
                        @endforeach
                    </select>
                </div>
                <label class="check" style="margin-top:10px;"><input type="checkbox" name="is_featured" value="1" @checked(old('is_featured', $post->is_featured))> Bài nổi bật (hiện đầu trang Tin tức)</label>
            </div>

            <div class="panel card">
                <h3>Ảnh đại diện</h3>
                @if($post->thumbnail)
                    <img src="{{ Illuminate\Support\Facades\Storage::url($post->thumbnail) }}" alt="" style="width:100%;border-radius:10px;margin-bottom:10px;">
                @endif
                <input type="file" name="thumbnail" accept="image/*">
                <p class="hint" style="margin-top:6px;">Dùng cho ảnh trong danh sách + khi chia sẻ link (og:image). Bỏ trống nếu sửa mà không muốn đổi ảnh.</p>
            </div>
        </div>
    </div>
</form>
@endsection

@push('scripts')
<script src="{{ asset('tinymce/tinymce.min.js') }}"></script>
<script>
function initPostEditor() {
    if (typeof tinymce === 'undefined') return;
    tinymce.remove('.editor-full-post');
    var uploadUrl = '{{ route('admin.posts.upload-image') }}';
    var csrfToken = document.querySelector('#post-form input[name=_token]').value;
    tinymce.init({
        selector: '.editor-full-post',
        license_key: 'gpl',
        promotion: false,
        branding: false,
        height: 480,
        menubar: false,
        plugins: 'lists link autolink image media code table',
        toolbar: 'undo redo | h2 h3 | bold italic | bullist numlist | link image media chessboard | table | code | removeformat',
        block_formats: 'Đoạn=p; Tiêu đề H2=h2; Tiêu đề H3=h3',
        content_style: "body{font-family:'Be Vietnam Pro',sans-serif;font-size:15px;}",
        skin: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oxide-dark' : 'oxide',
        content_css: (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'default',
        images_upload_handler: function (blobInfo) {
            return new Promise(function (resolve, reject) {
                var fd = new FormData();
                fd.append('file', blobInfo.blob(), blobInfo.filename());
                fetch(uploadUrl, { method: 'POST', headers: { 'X-CSRF-TOKEN': csrfToken, 'Accept': 'application/json' }, body: fd })
                    .then(function (r) { return r.json(); })
                    .then(function (d) { d && d.location ? resolve(d.location) : reject('Lỗi tải ảnh'); })
                    .catch(function () { reject('Lỗi tải ảnh'); });
            });
        },
        setup: function (editor) {
            editor.ui.registry.addButton('chessboard', {
                text: '♟ Bàn cờ',
                tooltip: 'Nhúng bàn cờ (FEN hoặc bài học có sẵn)',
                onAction: function () {
                    var fen = window.prompt('Dán FEN để nhúng 1 thế cờ tĩnh (để trống nếu muốn nhúng bài học có sẵn):', '');
                    if (fen) { editor.insertContent('[co-tuong fen="' + fen + '"]'); return; }
                    var slug = window.prompt('Nhập slug bài học có sẵn để nhúng nguyên bàn cờ + nước đi (vd: cach-di-quan-xe):', '');
                    if (slug) editor.insertContent('[co-tuong lesson="' + slug + '"]');
                }
            });
        }
    });
}
document.addEventListener('DOMContentLoaded', initPostEditor);
document.getElementById('post-form').addEventListener('submit', function () {
    if (typeof tinymce !== 'undefined') tinymce.triggerSave();
});
</script>
@endpush
