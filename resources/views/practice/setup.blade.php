@extends('layouts.app')
@section('title', 'Xếp Cờ Để Thẩm — Tự Xếp Thế Cờ Tướng, Cờ Úp Cho Máy Giải')
@section('description', 'Tự xếp thế cờ tướng hoặc cờ úp trên bàn cờ, cho máy giải, đánh thử với máy và đổi bên bất cứ lúc nào. Lưu thế cờ vào thư viện cá nhân. Miễn phí.')

@push('head')
{!! \App\Support\Seo::ld(\App\Support\Seo::appLd('Xếp cờ để thẩm', 'Bàn xếp thế cờ tướng, cờ úp: cho máy giải, đánh thử với máy, đổi bên, lưu thư viện.', 'GameApplication')) !!}
@endpush

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('practice.hub') }}">Luyện tập</a><x-icon name="chev-right" /><span>Xếp cờ để thẩm</span>
</nav>

<div data-setup data-needs-board data-auth="{{ auth()->check() ? 1 : 0 }}">
    <div class="eyebrow"><x-icon name="grid" /> Luyện tập</div>
    <h1 class="page-title mt-1">Xếp cờ để thẩm</h1>
    <p class="page-lede">Xếp một thế cờ bất kỳ — thế trong sách, thế bạn gặp khi chơi — rồi cho máy giải hoặc tự đánh với máy. Trong ván có thể <b>đổi bên</b> với máy hay bật <b>máy tự giải</b> cả hai bên.</p>

    <div class="practice mt-5">
        <div class="min-w-0">
            <div class="board-card card">
                <div class="board-bar">
                    <span class="font-bold" data-setup-title>Bàn xếp quân</span>
                    <span class="tag" data-setup-turn-tag>Đỏ đi trước</span>
                </div>
                <div class="board-stage"><div class="board-holder setup-holder" data-setup-board></div></div>
                <div class="setup-palette" data-setup-palette aria-label="Chọn quân để đặt"></div>
                <p class="text-[13px] text-ink-faint mt-2 mb-0 px-1">Chọn quân ở bảng trên rồi bấm vào ô để đặt · chọn <b>Xoá</b> rồi bấm quân để bỏ · không chọn gì: bấm 1 quân rồi bấm ô khác để di chuyển.</p>
            </div>
        </div>

        <div class="grid gap-3 content-start">
            <div class="card card--pad">
                <h2 class="text-base font-extrabold mb-3">1 · Xếp quân</h2>
                <div class="label mb-2">Loại cờ</div>
                <div class="flex flex-wrap gap-2 mb-3">
                    <button type="button" class="chip is-on" data-setup-variant="co-tuong">Cờ tướng</button>
                    <button type="button" class="chip" data-setup-variant="co-up">Cờ úp</button>
                </div>
                <div class="label mb-2">Bên đi trước</div>
                <div class="flex flex-wrap gap-2 mb-3">
                    <button type="button" class="chip is-on" data-setup-turn="do"><span class="side-dot do"></span> Đỏ</button>
                    <button type="button" class="chip" data-setup-turn="den"><span class="side-dot den"></span> Đen</button>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button type="button" class="btn btn--sm" data-setup-start><x-icon name="reset" /> Thế mở</button>
                    <button type="button" class="btn btn--sm" data-setup-clear><x-icon name="x" /> Xoá bàn</button>
                    <button type="button" class="btn btn--sm btn--ghost" data-setup-flip><x-icon name="flip" /> Lật bàn</button>
                </div>
                <div class="flex gap-2 mt-3">
                    <input class="input flex-1 min-w-0 !text-[13px]" data-setup-fen aria-label="Chuỗi FEN" placeholder="Dán chuỗi FEN…">
                    <button type="button" class="btn btn--sm" data-setup-fen-apply>Dán</button>
                    <button type="button" class="btn btn--sm btn--ghost" data-setup-fen-copy title="Sao chép FEN"><x-icon name="copy" /></button>
                </div>
            </div>

            <div class="card card--pad" data-setup-msg>Đang tải bàn cờ…</div>

            <div class="card card--pad">
                <h2 class="text-base font-extrabold mb-3">2 · Thẩm thế cờ</h2>
                <div class="label mb-2">Sức máy</div>
                <div class="flex flex-wrap gap-2 mb-3">
                    @foreach([1 => 'Tập sự', 2 => 'Dễ', 3 => 'Vừa', 4 => 'Khó'] as $lv => $name)
                        <button type="button" class="chip {{ $lv === 4 ? 'is-on' : '' }}" data-setup-level="{{ $lv }}">{{ $name }}</button>
                    @endforeach
                </div>
                <div class="grid gap-2">
                    <button type="button" class="btn btn--primary" data-setup-go="may"><x-icon name="cpu" /> Máy tự giải (máy đi cả hai bên)</button>
                    <div class="grid grid-cols-2 gap-2">
                        <button type="button" class="btn" data-setup-go="do"><span class="side-dot do"></span> Tôi cầm Đỏ</button>
                        <button type="button" class="btn" data-setup-go="den"><span class="side-dot den"></span> Tôi cầm Đen</button>
                    </div>
                </div>
                <p class="text-[13px] text-ink-soft mt-3 mb-0">Trong ván: nút <b>Đổi bên</b> để bạn và máy đổi quân, <b>Máy tự giải</b> để máy đi tiếp cả hai bên, <b>Gợi ý</b> và <b>Đi lại</b> vẫn dùng được. Ván từ thế tự xếp không tính XP.</p>
            </div>

            <div class="card card--pad">
                <h2 class="text-base font-extrabold mb-3">3 · Lưu vào thư viện</h2>
                @auth
                    <div class="flex gap-2">
                        <input class="input flex-1 min-w-0" data-setup-name maxlength="120" placeholder="Tên thế cờ (tuỳ chọn)">
                        <button type="button" class="btn" data-setup-save><x-icon name="bookmark" /> Lưu</button>
                    </div>
                    <p class="text-[13px] text-ink-soft mt-2 mb-0">Xem lại trong <a href="{{ route('account.library') }}">Thư viện thế cờ</a> — từ đó soạn thêm nước đi, biến hoặc gửi Admin.</p>
                @else
                    <p class="text-[14px] text-ink-soft m-0"><a href="{{ route('login') }}" class="font-bold">Đăng nhập</a> để lưu thế cờ vào thư viện cá nhân.</p>
                @endauth
            </div>
        </div>
    </div>

    <section class="section prose max-w-3xl">
        <h2>Xếp cờ để thẩm là gì?</h2>
        <p>"Thẩm cờ" là bày lại một thế cờ để nghiên cứu: tìm nước hay nhất, xem thế đó thắng hay hoà, thử các phương án khác nhau. Công cụ này cho bạn tự xếp quân như trên bàn cờ thật, rồi nhờ máy đi thử cả hai bên để kiểm tra kết luận của mình.</p>
        <ul>
            <li><strong>Cờ tướng:</strong> quân được đặt đúng vị trí theo luật (Sĩ, Tướng trong cung; Tượng không qua sông; Tốt không lùi về sau vị trí xuất phát).</li>
            <li><strong>Cờ úp:</strong> đặt quân úp lên ô xuất phát của bên đó; máy tự tráo binh chủng cho các quân úp từ số quân chưa lộ, đúng luật cờ úp.</li>
            <li>Thế cờ hợp lệ khi mỗi bên có đúng một Tướng, bên vừa đi không còn bị chiếu và bên tới lượt còn nước đi.</li>
        </ul>
        <p>Muốn học cách giải các thế cờ kinh điển, xem <a href="{{ route('practice.hub') }}">luyện tập thế cờ</a> hoặc các bài <a href="{{ route('phase', 'tan-cuoc') }}">tàn cuộc</a>.</p>
    </section>
</div>
@endsection
