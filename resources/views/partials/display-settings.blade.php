{{-- Giao diện bàn cờ + âm thanh (lưu trên thiết bị này — localStorage). Dùng ở Cài đặt tài khoản và /giao-dien-ban-co.
     JS: resources/js/display-settings.js (nạp khi trang có [data-display-settings]). --}}
<section class="card card--pad" data-display-settings data-needs-board id="giao-dien">
    <h2 class="text-lg font-extrabold mb-1">Bàn cờ &amp; quân cờ</h2>
    <p class="text-[14px] text-ink-soft mb-4">Lưu trên thiết bị này, có hiệu lực ngay — xem trước bên dưới.</p>

    <div class="ds-grid">
        <div class="ds-preview">
            <div class="board-holder" data-ds-preview></div>
            <button type="button" class="btn btn--sm mt-2 w-full" data-ds-demo><x-icon name="play" /> Đi thử 1 nước</button>
        </div>
        <div class="grid gap-4 content-start">
            <div>
                <div class="label mb-2">Màu bàn cờ</div>
                <div class="ds-swatches">
                    @foreach(['' => 'Gỗ', 'walnut' => 'Gỗ đậm', 'classic' => 'Cổ điển', 'paper' => 'Giấy', 'jade' => 'Ngọc bích', 'marble' => 'Cẩm thạch', 'night' => 'Bàn đêm', 'contrast' => 'Tương phản cao'] as $k => $label)
                        <button type="button" class="ds-swatch" data-board-theme-opt="{{ $k }}" data-board-theme="{{ $k ?: 'wood' }}">
                            <span class="ds-swatch__wood"><span class="ds-swatch__pc"></span></span><span class="ds-swatch__name">{{ $label }}</span>
                        </button>
                    @endforeach
                </div>
                @php
                    $_owned = app(\App\Services\ShopService::class)->ownedBoardThemes(auth()->user());
                    $_premium = collect(config('shop.items'))->where('type', 'board');
                @endphp
                <div class="label mt-3 mb-2 flex items-center justify-between">Màu cao cấp <a href="{{ route('shop') }}#board" class="text-[12.5px] font-bold">Đổi bằng xu →</a></div>
                <div class="ds-swatches">
                    @foreach($_premium as $_it)
                        @if(in_array($_it['theme'], $_owned, true))
                            <button type="button" class="ds-swatch" data-board-theme-opt="{{ $_it['theme'] }}" data-board-theme="{{ $_it['theme'] }}">
                                <span class="ds-swatch__wood"><span class="ds-swatch__pc"></span></span><span class="ds-swatch__name">{{ $_it['name'] }}</span>
                            </button>
                        @else
                            <a href="{{ route('shop') }}#board" class="ds-swatch is-locked" data-board-theme="{{ $_it['theme'] }}" title="Đổi {{ number_format($_it['price'], 0, ',', '.') }} xu để dùng">
                                <span class="ds-swatch__wood"><span class="ds-swatch__pc"></span></span><span class="ds-swatch__name">{{ $_it['name'] }}</span>
                                <span class="ds-swatch__lock"><x-icon name="lock" /></span>
                            </a>
                        @endif
                    @endforeach
                </div>
            </div>
            <div>
                <div class="label mb-2">Chữ trên quân</div>
                <div class="flex flex-wrap gap-2">
                    <button type="button" class="chip" data-pref="piece_set" data-val="han"><span class="font-piece text-[17px]">炮</span> Chữ Hán</button>
                    <button type="button" class="chip" data-pref="piece_set" data-val="vi"><b>Pháo</b> Chữ Việt — dễ cho người mới</button>
                </div>
            </div>
            <div>
                <div class="label mb-2">Kiểu quân</div>
                <div class="flex flex-wrap gap-2">
                    <button type="button" class="chip" data-pref="piece_style" data-val="flat">Phẳng</button>
                    <button type="button" class="chip" data-pref="piece_style" data-val="3d">Nổi (3D)</button>
                </div>
            </div>
            <div>
                <div class="label mb-2">Đánh dấu nước vừa đi</div>
                <div class="flex flex-wrap gap-2">
                    <button type="button" class="chip" data-pref="last_fx" data-val="pulse">Loé sáng</button>
                    <button type="button" class="chip" data-pref="last_fx" data-val="spin">Vòng xoay</button>
                    <button type="button" class="chip" data-pref="last_fx" data-val="none">Chỉ tô ô</button>
                </div>
            </div>
            <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" class="mt-1 w-5 h-5 accent-[var(--primary)]" data-pref-check="last_arrow">
                <span><span class="font-semibold block">Mũi tên nước vừa đi</span><span class="text-[13px] text-ink-soft">Mũi tên mờ từ ô cũ tới ô mới — dễ theo dõi khi xem bài, chơi nhanh.</span></span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" class="mt-1 w-5 h-5 accent-[var(--primary)]" data-pref-check="board_coords">
                <span><span class="font-semibold block">Hiện số cột 1–9 quanh bàn</span><span class="text-[13px] text-ink-soft">Giúp đọc ký hiệu kiểu “Pháo 2 bình 5”: mỗi bên đếm cột từ phải sang trái theo hướng ngồi của mình.</span></span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="w-5 h-5 accent-[var(--primary)]" data-reduce-fx>
                <span class="font-semibold">Giảm hiệu ứng (tắt pháo giấy, nhấp nháy)</span>
            </label>
        </div>
    </div>
</section>

<section class="card card--pad" data-sound-settings>
    <h2 class="text-lg font-extrabold mb-1">Âm thanh</h2>
    <p class="text-[14px] text-ink-soft mb-4">Áp dụng cho bài học, luyện tập, chơi với máy và đấu bạn.</p>
    <label class="flex items-center gap-3 cursor-pointer mb-4">
        <input type="checkbox" class="w-5 h-5 accent-[var(--primary)]" data-snd="on">
        <span class="font-bold">Bật âm thanh</span>
    </label>
    <div class="grid gap-4" data-snd-body>
        <div>
            <div class="label mb-2 flex items-center justify-between">Âm lượng <span class="text-ink-soft font-semibold" data-snd-vol-label></span></div>
            <input type="range" min="0" max="100" step="5" class="w-full accent-[var(--primary)]" data-snd="vol" aria-label="Âm lượng">
        </div>
        <div>
            <div class="label mb-2">Tiếng đặt quân</div>
            <div class="flex flex-wrap gap-2">
                <button type="button" class="chip" data-snd-pack="wood">Gỗ (trầm)</button>
                <button type="button" class="chip" data-snd-pack="stone">Đá / ngọc (giòn)</button>
                <button type="button" class="chip" data-snd-pack="soft">Nhẹ nhàng</button>
                <button type="button" class="btn btn--sm btn--ghost" data-snd-test><x-icon name="volume" /> Nghe thử</button>
            </div>
        </div>
        <div class="grid gap-3">
            <label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" class="w-5 h-5 accent-[var(--primary)]" data-snd="check"><span><b>Báo “chiếu tướng”</b> <button type="button" class="text-[13px] font-semibold text-primary" data-snd-try="check">nghe thử</button></span></label>
            <label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" class="w-5 h-5 accent-[var(--primary)]" data-snd="tick"><span><b>Tích tắc khi sắp hết giờ</b> <span class="text-[13px] text-ink-soft">(dưới 10 giây)</span></span></label>
            <label class="flex items-center gap-3 cursor-pointer"><input type="checkbox" class="w-5 h-5 accent-[var(--primary)]" data-snd="end"><span><b>Âm báo kết thúc ván</b> <button type="button" class="text-[13px] font-semibold text-primary" data-snd-try="end">nghe thử</button></span></label>
            <label class="flex items-start gap-3 cursor-pointer"><input type="checkbox" class="mt-1 w-5 h-5 accent-[var(--primary)]" data-snd="voice">
                <span><b>Giọng đọc nước đi</b> <button type="button" class="text-[13px] font-semibold text-primary" data-snd-try="voice">nghe thử</button>
                    <span class="block text-[13px] text-ink-soft" data-snd-voice-note>Đọc to nước vừa đi (VD “Pháo 2 bình 5”) — hợp luyện nghe ký hiệu, xem bài khi bận tay.</span></span></label>
        </div>
    </div>
</section>
