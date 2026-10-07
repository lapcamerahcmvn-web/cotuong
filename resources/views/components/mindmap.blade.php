{{-- Sơ đồ tư duy (App\Support\Mindmap::render). HTML đầy đủ ngay từ server: không có JS vẫn bấm mở nhánh được
     (<details>), Google đọc được khẩu quyết. resources/js/mindmap.js thêm: mở/thu tất cả, tìm, che khẩu quyết để tự nhẩm,
     đánh dấu "Đã thuộc" (lưu trên máy), ôn ngẫu nhiên, vẽ bàn cờ thu nhỏ khi mở nhánh. --}}
<div class="mindmap" data-mindmap="{{ $id }}" data-total="{{ $total }}">
    <div class="mm-head">
        <div class="mm-root">
            <span class="mm-root__glyph" aria-hidden="true">將</span>
            <span class="min-w-0"><b class="mm-root__title">{{ $title }}</b>
                <small>{{ $total }} thế · bấm từng nhánh để xổ khẩu quyết, bấm "Xem ví dụ" để kiểm chứng trên bàn cờ</small></span>
        </div>
        <div class="mm-progress" data-mm-progress hidden>
            <span class="progress progress--sm flex-1"><span class="progress__bar" data-mm-bar style="width:0%"></span></span>
            <span class="text-[13px] font-bold whitespace-nowrap">Đã thuộc <b data-mm-done-n>0</b>/{{ $total }}</span>
        </div>
        <div class="mm-tools" data-mm-tools hidden>
            <button type="button" class="btn btn--sm" data-mm-expand><x-icon name="chev-down" /> Mở hết</button>
            <button type="button" class="btn btn--sm" data-mm-collapse><x-icon name="chev-right" /> Thu gọn</button>
            <button type="button" class="btn btn--sm" data-mm-hide aria-pressed="false"><x-icon name="eye" /> Che khẩu quyết</button>
            <button type="button" class="btn btn--sm btn--primary" data-mm-quiz><x-icon name="repeat" /> Ôn ngẫu nhiên</button>
            <input type="search" class="input mm-search" data-mm-search placeholder="Tìm thế cờ, khẩu quyết…" aria-label="Tìm trong sơ đồ">
        </div>
    </div>
    @if($intro)<p class="mm-intro">{{ $intro }}</p>@endif
    <ol class="mm-tree">
        @include('partials.mindmap-nodes', ['nodes' => $tree, 'prefix' => '', 'depth' => 1, 'play' => $play ?? 'do'])
    </ol>
    <p class="mm-empty" data-mm-empty hidden>Không có thế nào khớp — thử từ khác (VD: "Tướng", "kẹp nách", "trung lộ").</p>
</div>
