@extends('admin.layout')
@section('title', 'Chi tiết nguồn')
@section('heading', 'Chi tiết nguồn (nội bộ)')

@section('content')
<div class="flash" style="background:var(--surface-2);color:var(--ink-soft);border:1px dashed var(--line);">
    ⚠️ Nội dung dưới đây là tài liệu gốc có bản quyền — tham khảo để viết lại bằng lời riêng, KHÔNG chép nguyên văn.
</div>

<div class="panel card">
    <h3>{{ $sourceAsset->original_filename }}</h3>
    <p class="hint">Loại: {{ $sourceAsset->type }} · Version: {{ $sourceAsset->decode_version }} · Bản quyền: {{ $sourceAsset->verified_authorship }}</p>
    <p class="hint" style="word-break:break-all;">Đường dẫn nội bộ: <code>{{ $sourceAsset->external_ref }}</code></p>
    @if($sourceAsset->lesson)
        <a href="{{ route('admin.lessons.edit', $sourceAsset->lesson) }}" class="btn">Tới bài học liên kết →</a>
    @endif
</div>

@if($decoded)
<div class="panel card">
    <h3>Thông tin giải mã</h3>
    <p class="hint">Thế mở: <code style="word-break:break-all;">{{ $decoded['fen_initial'] ?? '—' }}</code></p>
    <p class="hint">Số nước (main line): {{ count($decoded['moves'] ?? []) }} · Số chú giải: {{ count($decoded['annotations'] ?? []) }}</p>
    @if(!empty($decoded['file_level_comment']))
        <div class="field"><label>Lời giảng tổng quan (gốc — viết lại, đừng chép)</label>
        <div class="input" style="white-space:pre-wrap;max-height:200px;overflow:auto;background:var(--surface-2);">{{ $decoded['file_level_comment'] }}</div></div>
    @endif
</div>

@if(!empty($decoded['annotations']))
<div class="panel card">
    <h3>Chú giải từng nước (gốc)</h3>
    <div class="cap-editor">
        @foreach($decoded['annotations'] as $an)
            <div class="cap-item">
                <div class="cap-n">Nước {{ $an['step_order'] }}</div>
                <div class="input" style="white-space:pre-wrap;background:var(--surface-2);">{{ $an['text'] }}</div>
            </div>
        @endforeach
    </div>
</div>
@endif
@endif
@endsection
