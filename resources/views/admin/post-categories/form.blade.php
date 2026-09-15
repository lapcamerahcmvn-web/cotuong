@extends('admin.layout')
@section('title', $category->exists ? 'Sửa chuyên mục' : 'Thêm chuyên mục')
@section('heading', $category->exists ? 'Sửa chuyên mục Tin tức' : 'Thêm chuyên mục Tin tức')

@section('content')
<form method="POST"
      action="{{ $category->exists ? route('admin.post-categories.update', $category) : route('admin.post-categories.store') }}"
      style="max-width:640px;">
    @csrf
    @if($category->exists) @method('PUT') @endif

    <div class="card" style="padding:20px;">
        <div class="field">
            <label for="name">Tên chuyên mục <span style="color:var(--red)">*</span></label>
            <input class="input" id="name" name="name" required maxlength="255" value="{{ old('name', $category->name) }}">
        </div>
        <div class="field">
            <label for="sort_order">Thứ tự hiển thị</label>
            <input class="input" id="sort_order" type="number" min="0" name="sort_order" value="{{ old('sort_order', $category->sort_order ?? 0) }}">
        </div>
        <div class="field">
            <label for="description">Mô tả ngắn (hiển thị đầu trang chuyên mục)</label>
            <textarea class="input" id="description" name="description" rows="3">{{ old('description', $category->description) }}</textarea>
        </div>

        <div style="margin-top:18px;display:flex;gap:10px;">
            <button class="btn primary" type="submit">{{ $category->exists ? 'Lưu thay đổi' : 'Tạo chuyên mục' }}</button>
            <a href="{{ route('admin.post-categories.index') }}" class="btn">Huỷ</a>
        </div>
        @if($category->exists)
            <p class="muted" style="font-size:12.5px;margin-top:12px;">Đường dẫn (slug) giữ nguyên khi sửa: <code>/tin-tuc/{{ $category->slug }}</code></p>
        @endif
    </div>
</form>
@endsection
