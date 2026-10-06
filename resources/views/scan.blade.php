@extends('layouts.app')
@section('title', 'Nhận Diện Bàn Cờ Tướng Từ Ảnh — Chụp Ảnh Ra Thế Cờ | Học Cờ Tướng')
@section('description', 'Chụp ảnh bàn cờ tướng thật hoặc ảnh chụp màn hình phần mềm cờ khác, máy tự nhận diện thế cờ (cả cờ úp) để kiểm tra, cho máy đánh giá nước đi và lưu vào thư viện. Miễn phí, chạy ngay trên trình duyệt.')

@php
    $cfg = [
        'auth' => auth()->check(),
        'loginUrl' => route('login'),
        'saveUrl' => route('library.store'),
        'libraryUrl' => route('account.library'),
        'playUrl' => route('play.bot'),
        'aiUrl' => $aiEnabled ? route('scan.ai') : null,
    ];
@endphp

@push('head')
{!! \App\Support\Seo::ld(\App\Support\Seo::appLd('Nhận diện bàn cờ tướng từ ảnh', 'Chụp ảnh bàn cờ thật hoặc ảnh màn hình phần mềm cờ, web tự dựng lại thế cờ để máy đánh giá, chơi tiếp, lưu thư viện.', 'UtilitiesApplication')) !!}
{!! \App\Support\Seo::ld(['@context' => 'https://schema.org', '@type' => 'HowTo', 'name' => 'Nhận diện thế cờ tướng từ ảnh',
    'step' => [
        ['@type' => 'HowToStep', 'name' => 'Chọn ảnh', 'text' => 'Chụp ảnh bàn cờ thật, chọn ảnh có sẵn hoặc dán ảnh chụp màn hình phần mềm cờ khác.'],
        ['@type' => 'HowToStep', 'name' => 'Căn lưới', 'text' => 'Máy tự tìm lưới 9×10; với ảnh chụp nghiêng, kéo 4 chấm vào 4 góc lưới.'],
        ['@type' => 'HowToStep', 'name' => 'Thẩm và lưu', 'text' => 'Kiểm tra từng quân (bấm ô để sửa), chọn bên đi, rồi lưu vào thư viện hoặc cho máy đánh giá.'],
    ]]) !!}
@endpush

@section('content')
<div data-scan='@json($cfg)' class="scan">
    <div class="text-center mb-6">
        <div class="eyebrow justify-center"><x-icon name="eye" /> Công cụ</div>
        <h1 class="page-title mt-1">Nhận diện bàn cờ từ ảnh</h1>
        <p class="page-lede mx-auto">Chụp bàn cờ thật hoặc chụp màn hình phần mềm cờ khác — máy tự xếp lại thế cờ (cả <b>cờ úp</b>) để bạn thẩm lại, cho máy đánh giá, chơi tiếp hoặc lưu vào thư viện. Ảnh được xử lý ngay trên máy bạn, không tải lên đâu.</p>
    </div>

    {{-- Bước 1 --}}
    <section data-step="pick">
        <label class="scan-drop card" data-drop>
            <input type="file" accept="image/*" class="sr-only">
            <span class="scan-drop__icon"><x-icon name="layers" /></span>
            <b class="text-lg">Kéo thả ảnh vào đây hoặc bấm để chọn</b>
            <span class="text-[14px] text-ink-soft">Ảnh chụp màn hình phần mềm cờ, ảnh chụp bàn cờ thật (chụp càng thẳng càng chính xác). Máy tính: có thể <b>Ctrl+V</b> để dán ảnh.</span>
        </label>
        <div class="cluster justify-center mt-4">
            <label class="btn btn--primary btn--lg"><x-icon name="eye" /> Chụp ảnh<input type="file" accept="image/*" capture="environment" class="sr-only"></label>
            <label class="btn btn--lg"><x-icon name="layers" /> Chọn ảnh có sẵn<input type="file" accept="image/*" class="sr-only"></label>
        </div>
        <div class="text-center mt-5">
            <span class="text-[13.5px] text-ink-soft">Chưa có ảnh? Thử ngay với ảnh mẫu:</span>
            <div class="cluster justify-center mt-2">
                <button type="button" class="chip" data-sample="{{ asset('images/scan-mau/phan-mem.jpg') }}">Ảnh màn hình phần mềm</button>
                <button type="button" class="chip" data-sample="{{ asset('images/scan-mau/co-up.jpg') }}">Ván cờ úp</button>
                <button type="button" class="chip" data-sample="{{ asset('images/scan-mau/ban-that.jpg') }}">Ván cờ thật (chụp nghiêng)</button>
                <button type="button" class="chip" data-sample="{{ asset('images/scan-mau/co-up-that.jpg') }}">Cờ úp chụp thật</button>
            </div>
        </div>
        <div class="grid sm:grid-cols-3 gap-3 mt-8">
            <div class="card card--pad"><b class="block mb-1">1 · Chọn ảnh</b><span class="text-[13.5px] text-ink-soft">Chụp càng thẳng từ trên xuống càng tốt, đủ sáng, tránh bóng tay/đèn chói, thấy rõ 4 góc lưới. Quân đặt lệch, chữ quay ngang dọc vẫn nhận được.</span></div>
            <div class="card card--pad"><b class="block mb-1">2 · Căn lưới</b><span class="text-[13.5px] text-ink-soft">Ảnh màn hình được căn tự động; ảnh chụp nghiêng thì kéo 4 chấm vào 4 góc lưới.</span></div>
            <div class="card card--pad"><b class="block mb-1">3 · Thẩm &amp; dùng</b><span class="text-[13.5px] text-ink-soft">Bấm ô để sửa quân nhận sai, rồi lưu thư viện, cho máy đánh giá hoặc chơi tiếp.</span></div>
        </div>
    </section>

    {{-- Bước 2 --}}
    <section data-step="align" hidden>
        <div class="card card--pad">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h2 class="text-lg font-extrabold m-0">Căn lưới bàn cờ</h2>
                <div class="cluster">
                    <button type="button" class="btn btn--sm" data-auto-grid><x-icon name="target" /> Tự căn lưới</button>
                    <button type="button" class="btn btn--sm" data-rotate><x-icon name="repeat" /> Xoay ảnh 90°</button>
                    <button type="button" class="btn btn--sm btn--ghost" data-repick><x-icon name="x" /> Chọn ảnh khác</button>
                </div>
            </div>
            <p class="scan-hint" data-align-hint></p>
            <label class="flex items-center gap-2 text-[14px] mb-3 cursor-pointer"><input type="checkbox" data-photo-mode class="w-5 h-5 accent-[var(--primary)]">
                <span><b>Ảnh chụp bàn cờ thật</b> <span class="text-ink-soft">— quân đặt lệch, chữ quay nhiều hướng (máy tự bật khi phải kéo góc tay)</span></span></label>
            <div class="scan-stage"><canvas data-align-canvas></canvas></div>
            <div class="text-center mt-4"><button type="button" class="btn btn--primary btn--lg" data-recognize><x-icon name="sparkles" /> Nhận dạng</button></div>
        </div>
    </section>

    {{-- Bước 3 --}}
    <section data-step="result" hidden class="mt-5">
        <div class="practice">
            <div class="grid gap-3 content-start min-w-0">
                <div class="board-card card">
                    <div class="board-bar"><span class="step-pill">Thế cờ nhận được · bấm ô để sửa</span>
                        <button type="button" class="btn btn--sm btn--ghost" data-flip-result title="Đảo chiều (nếu Đỏ/Đen bị ngược)"><x-icon name="flip" /> Đảo chiều</button></div>
                    <div class="board-stage scan-board" data-result-board></div>
                </div>
                <div class="card card--pad" data-palette></div>
            </div>
            <div class="grid gap-3 content-start">
                <div class="card card--pad">
                    <div class="flex flex-wrap gap-2" data-result-info></div>
                    <div class="mt-3 flex items-center gap-2 flex-wrap"><span class="text-[13.5px] font-bold">Bên đi:</span>
                        <span class="seg" data-turn><button type="button" class="seg__btn" data-side="do"><span class="side-dot do"></span> Đỏ</button><button type="button" class="seg__btn" data-side="den"><span class="side-dot den"></span> Đen</button></span></div>
                    <div class="flex gap-2 mt-3"><input class="input !min-h-[38px] text-[13px] font-mono" data-fen-out readonly><button type="button" class="btn btn--sm" data-copy-fen><x-icon name="copy" /> FEN</button></div>
                </div>
                <div class="card card--pad">
                    <h2 class="text-[15px] font-extrabold mb-2">Đối chiếu ảnh đã nắn thẳng</h2>
                    <canvas class="scan-preview" data-rect-preview></canvas>
                    <div class="cluster mt-2">
                        <button type="button" class="btn btn--sm btn--ghost" data-realign><x-icon name="target" /> Căn lại lưới</button>
                        @if($aiEnabled)<button type="button" class="btn btn--sm" data-ai><x-icon name="sparkles" /> Nhận dạng lại bằng AI</button>@endif
                    </div>
                </div>
                <div class="card card--pad">
                    <h2 class="text-[15px] font-extrabold mb-2">Dùng thế cờ này</h2>
                    <div class="grid gap-2">
                        <button type="button" class="btn" data-evaluate><x-icon name="chart" /> Máy đánh giá · gợi ý nước tốt nhất</button>
                        <div class="text-[14px]" data-eval-out></div>
                        <button type="button" class="btn" data-play><x-icon name="play" /> Chơi tiếp với máy từ thế này</button>
                        <button type="button" class="btn" data-compose><x-icon name="book" /> Mở trình soạn (ghi nước đi, thêm biến)</button>
                    </div>
                    <div class="border-t border-line mt-4 pt-4 grid gap-2">
                        <input class="input" data-title maxlength="120" placeholder="Tên thế cờ (vd: Ván với anh Tư, nước 20)">
                        <textarea class="textarea !min-h-[64px]" data-note maxlength="2000" placeholder="Ghi chú (tuỳ chọn)"></textarea>
                        <button type="button" class="btn btn--primary" data-save><x-icon name="bookmark" /> {{ auth()->check() ? 'Lưu vào thư viện' : 'Đăng nhập để lưu vào thư viện' }}</button>
                        <div class="text-[13.5px] text-jade-ink" data-saved></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
