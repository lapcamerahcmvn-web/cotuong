@extends('admin.layout')
@section('title', $series->exists ? 'Sửa chuỗi' : 'Thêm chuỗi')
@section('heading', $series->exists ? 'Sửa chuỗi bài học' : 'Thêm chuỗi bài học')

@section('content')
<form method="POST"
      action="{{ $series->exists ? route('admin.series.update', $series) : route('admin.series.store') }}"
      style="max-width:760px;">
    @csrf
    @if($series->exists) @method('PUT') @endif

    <div class="card" style="padding:20px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
            <div style="grid-column:1/-1;">
                <label for="name">Tên chuỗi <span style="color:var(--red)">*</span></label>
                <input class="input" id="name" name="name" required maxlength="255" value="{{ old('name', $series->name) }}">
            </div>
            <div>
                <label for="game_mode">Loại cờ</label>
                <select class="input" id="game_mode" name="game_mode">
                    <option value="co-tuong" @selected(old('game_mode', $series->game_mode ?? 'co-tuong')==='co-tuong')>Cờ Tướng</option>
                    <option value="co-up" @selected(old('game_mode', $series->game_mode)==='co-up')>Cờ Úp</option>
                </select>
            </div>
            <div>
                <label for="phase">Giai đoạn</label>
                <select class="input" id="phase" name="phase">
                    <option value="">— Không —</option>
                    @foreach(\App\Models\Lesson::PHASES as $k => $v)
                        <option value="{{ $k }}" @selected(old('phase', $series->phase)===$k)>{{ $v }}</option>
                    @endforeach
                </select>
            </div>
            <div>
                <label for="planned_total">Số bài dự kiến</label>
                <input class="input" id="planned_total" type="number" min="0" name="planned_total" value="{{ old('planned_total', $series->planned_total) }}" placeholder="VD 48">
            </div>
            <div>
                <label for="sort_order">Thứ tự hiển thị</label>
                <input class="input" id="sort_order" type="number" min="0" name="sort_order" value="{{ old('sort_order', $series->sort_order ?? 0) }}">
            </div>
            <div style="grid-column:1/-1;">
                <label for="description">Mô tả (hiển thị đầu trang chuỗi, tốt cho SEO)</label>
                <textarea class="input" id="description" name="description" rows="4">{{ old('description', $series->description) }}</textarea>
            </div>
        </div>

        <div style="margin-top:18px;display:flex;gap:10px;">
            <button class="btn primary" type="submit">{{ $series->exists ? 'Lưu thay đổi' : 'Tạo chuỗi' }}</button>
            <a href="{{ route('admin.series.index') }}" class="btn">Huỷ</a>
        </div>
        @if($series->exists)
            <p class="muted" style="font-size:12.5px;margin-top:12px;">Đường dẫn (slug) giữ nguyên khi sửa để không hỏng liên kết: <code>/{{ $series->slug }}</code></p>
        @endif
    </div>
</form>
@endsection
