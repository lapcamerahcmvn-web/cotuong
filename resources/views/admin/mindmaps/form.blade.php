@extends('admin.layout')
@section('title', $map->exists ? 'Sửa sơ đồ tư duy' : 'Tạo sơ đồ tư duy')
@section('heading', $map->exists ? 'Sửa sơ đồ: ' . $map->title : 'Tạo sơ đồ tư duy')

@section('top-actions')
    <a href="{{ route('admin.mindmaps.index') }}" class="btn">← Danh sách</a>
@endsection

@section('content')
<form method="POST" action="{{ $map->exists ? route('admin.mindmaps.update', $map) : route('admin.mindmaps.store') }}" id="mm-form">
    @csrf
    @if($map->exists) @method('PUT') @endif
    <div class="form-grid">
        <div>
            <div class="panel card">
                <div class="field"><label for="title">Tiêu đề sơ đồ <span style="color:var(--red)">*</span></label>
                    <input class="input" id="title" name="title" value="{{ old('title', $map->title) }}" maxlength="191" required></div>
                <div class="field"><label for="description">Dòng giới thiệu (hiện dưới tiêu đề, tuỳ chọn)</label>
                    <input class="input" id="description" name="description" value="{{ old('description', $map->description) }}" maxlength="500"></div>
                <div class="field">
                    <label for="outline">Dàn ý</label>
                    <textarea class="input" id="outline" name="outline" rows="22" style="font-family:ui-monospace,Consolas,monospace;font-size:13.5px;line-height:1.55;" spellcheck="false" required>{{ old('outline', $map->outline) }}</textarea>
                    <div class="hint"><code>#</code> nhánh lớn · <code>##</code>/<code>###</code> nhánh con · <code>- </code> khẩu quyết (tự đánh số 1, 2, 3…) · <code>&gt; </code> ghi chú · thêm <code>@slug-bai-hoc</code> cuối dòng tiêu đề để gắn ví dụ (hiện bàn cờ thu nhỏ + nút xem / tự đánh kiểm chứng).</div>
                </div>
            </div>
            <div class="panel card">
                <h3>Xem trước <span class="muted" style="font-weight:500;font-size:13px;" data-mm-leaves></span></h3>
                <iframe id="mm-preview" title="Xem trước sơ đồ" style="width:100%;height:640px;border:1px solid var(--line);border-radius:12px;background:#fff;"></iframe>
            </div>
        </div>
        <div>
            <div class="panel card">
                <button class="btn primary" type="submit" style="width:100%;margin-bottom:12px;">{{ $map->exists ? 'Lưu sơ đồ' : 'Tạo sơ đồ' }}</button>
                <div class="field"><label for="slug">Slug (để trống = tự tạo)</label>
                    <input class="input" id="slug" name="slug" value="{{ old('slug', $map->slug) }}" maxlength="191" pattern="[a-z0-9-]+"></div>
                @if($map->exists)
                    <div class="field"><label>Shortcode nhúng vào bài viết</label>
                        <div style="display:flex;gap:6px;"><input class="input" readonly value="{{ $map->shortcode() }}" id="mm-sc" style="font-family:monospace;font-size:13px;">
                            <button type="button" class="btn" onclick="navigator.clipboard.writeText(document.getElementById('mm-sc').value);this.textContent='Đã chép';">Chép</button></div></div>
                @endif
            </div>
            <div class="panel card">
                <h3>Tạo từ chuyên đề</h3>
                <p class="muted" style="font-size:13px;margin-top:-6px;">Lấy các bài có mục “Kết quả” và “Khẩu quyết” (VD Cờ Tàn Có Khẩu Quyết), nhóm theo chương → lực lượng tấn công. Dàn ý hiện tại sẽ bị thay.</p>
                <div class="field"><label for="g-series">Chuyên đề</label>
                    <select class="input" id="g-series">@foreach($series as $s)<option value="{{ $s->slug }}" @selected($s->slug === 'co-tan-co-khau-quyet')>{{ $s->name }}</option>@endforeach</select></div>
                <div class="field"><label for="g-result">Loại thế</label>
                    <select class="input" id="g-result">@foreach($results as $k => $v)<option value="{{ $k }}">{{ $v }}</option>@endforeach</select></div>
                <button type="button" class="btn" id="g-run" style="width:100%;">Tạo dàn ý</button>
                <p class="muted" style="font-size:12.5px;margin:8px 0 0;" id="g-msg"></p>
            </div>
            @if($map->exists)
                <button class="btn danger" type="submit" form="mm-delete">Xoá sơ đồ</button>
            @endif
        </div>
    </div>
</form>
@if($map->exists)
    <form method="POST" action="{{ route('admin.mindmaps.destroy', $map) }}" id="mm-delete" onsubmit="return confirm('Xoá sơ đồ này? Bài viết đang nhúng sẽ hiện thông báo không tìm thấy.')">
        @csrf @method('DELETE')
    </form>
@endif
@endsection

@push('scripts')
@php
    // Khung xem trước dùng đúng CSS/JS của trang người học (admin dùng bộ CSS khác).
    $previewHead = '<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<link rel="stylesheet" href="' . \Illuminate\Support\Facades\Vite::asset('resources/css/app.css') . '">'
        . '<script>window.__xq={auth:false};</script>'
        . '<script type="module" src="' . \Illuminate\Support\Facades\Vite::asset('resources/js/app.js') . '"></script>';
    $icons = view('partials.icons')->render();
@endphp
<script>
(function () {
    var form = document.getElementById('mm-form'), ta = document.getElementById('outline'), title = document.getElementById('title');
    var frame = document.getElementById('mm-preview'), leaves = document.querySelector('[data-mm-leaves]');
    var head = @json($previewHead), icons = @json($icons), token = form.querySelector('[name=_token]').value, timer = null;
    function preview() {
        fetch(@json(route('admin.mindmaps.preview')), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-TOKEN': token },
            body: JSON.stringify({ outline: ta.value, title: title.value }) })
            .then(function (r) { return r.json(); })
            .then(function (d) {
                leaves.textContent = '· ' + d.leaves + ' ý cuối';
                frame.srcdoc = '<!doctype html><html lang="vi" data-theme="light"><head>' + head + '</head><body style="padding:16px;background:var(--bg)">' + icons + '<div data-toasts></div>' + d.html + '</body></html>';
            });
    }
    function later() { clearTimeout(timer); timer = setTimeout(preview, 700); }
    ta.addEventListener('input', later); title.addEventListener('input', later);
    preview();

    document.getElementById('g-run').addEventListener('click', function () {
        var msg = document.getElementById('g-msg');
        if (ta.value.trim().length > 40 && !confirm('Thay toàn bộ dàn ý hiện tại bằng dàn ý tạo từ chuyên đề?')) return;
        msg.textContent = 'Đang tạo…';
        var q = new URLSearchParams({ series: document.getElementById('g-series').value, result: document.getElementById('g-result').value });
        fetch(@json(route('admin.mindmaps.generate')) + '?' + q, { headers: { 'Accept': 'application/json' } })
            .then(function (r) { return r.json(); })
            .then(function (d) {
                if (!d.leaves) { msg.textContent = 'Chuyên đề này không có bài nào có “Kết quả” + “Khẩu quyết” khớp loại thế đã chọn.'; return; }
                ta.value = d.outline;
                if (!title.value) title.value = document.getElementById('g-result').selectedOptions[0].text + ' — ' + document.getElementById('g-series').selectedOptions[0].text;
                msg.textContent = 'Đã tạo ' + d.leaves + ' ý. Có thể sửa tay rồi lưu.';
                preview();
            });
    });
})();
</script>
@endpush
