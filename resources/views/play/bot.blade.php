@extends('layouts.app')
@section('title', 'Chơi Cờ Tướng, Cờ Úp Với Máy Online Miễn Phí | Học Cờ Tướng')
@section('description', 'Chơi cờ tướng và cờ úp với máy online miễn phí, không cần cài đặt: 4 cấp độ từ Tập sự đến Khó, có gợi ý, đi lại, lưu ván đang chơi. Thắng máy để nhận XP.')

@push('head')
@php
    $faqs = [
        ['Chơi cờ tướng với máy có mất phí không?', 'Hoàn toàn miễn phí và không cần cài đặt. Máy chạy ngay trên trình duyệt của bạn, kể cả trên điện thoại.'],
        ['Máy chơi mạnh cỡ nào?', 'Có 4 cấp: Tập sự (thỉnh thoảng đi bừa, hợp người mới), Dễ, Vừa và Khó (tính trước nhiều nước). Thắng cấp thấp rồi hãy thử cấp cao hơn.'],
        ['Có được đi lại hoặc xin gợi ý không?', 'Có. Nút "Đi lại" lùi lại nước vừa đi, nút "Gợi ý" chỉ nước máy cho là tốt nhất. Dùng trợ giúp thì ván thắng chỉ được nửa XP.'],
        ['Khi nào ván cờ hoà?', 'Khi cùng một thế cờ lặp lại 3 lần, hoặc ván kéo dài quá 150 nước mỗi bên. Cờ tướng: hết nước đi hợp lệ là thua. Cờ úp: hết nước mà không bị chiếu là hoà.'],
        ['Có chơi cờ úp với máy được không?', 'Có. Chọn biến thể "Cờ úp": 30 quân được úp và tráo ngẫu nhiên, lật mặt khi đi. Máy cũng không biết quân úp là gì — nó chỉ biết mỗi bên còn những quân nào chưa lộ, giống hệt bạn.'],
    ];
@endphp
{!! \App\Support\Seo::ld(['@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => collect($faqs)->map(fn ($f) => ['@type' => 'Question', 'name' => $f[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f[1]]])->all()]) !!}
@endpush

@section('content')
<div data-bot data-needs-board data-default-variant="{{ request('bien-the') === 'co-up' ? 'co-up' : 'co-tuong' }}">
    <section data-bot-setup>
        <div class="grid gap-6 lg:grid-cols-[1fr_420px] items-start">
            <div>
                <div class="eyebrow"><x-icon name="sword" /> Chơi</div>
                <h1 class="page-title mt-1">Chơi cờ tướng & cờ úp với máy</h1>
                <p class="page-lede">Luyện thực chiến với máy ngay trên trình duyệt — không cần cài đặt. Chọn biến thể, cấp độ, bên và bắt đầu.
                    @auth Mọi ván được tự lưu vào <a href="{{ route('history.index') }}">lịch sử ván đấu</a> để xem lại. @endauth</p>

                <div class="card card--pad mt-5" data-bot-resume hidden>
                    <div class="flex items-center justify-between gap-3 flex-wrap">
                        <span><span class="font-bold block" data-resume-label>Bạn có ván đang chơi dở</span><span class="text-[13.5px] text-ink-soft">Tiếp tục đúng thế cờ lần trước.</span></span>
                        <button type="button" class="btn btn--primary"><x-icon name="play" /> Chơi tiếp</button>
                    </div>
                </div>

                <h2 class="text-lg font-extrabold mt-6 mb-3">Biến thể</h2>
                <div class="grid gap-2 sm:grid-cols-2">
                    <button type="button" class="choice" data-pick-variant="co-tuong"><span class="choice__glyph">帥</span><span><b>Cờ tướng</b><small>Luật cờ tướng chuẩn</small></span></button>
                    <button type="button" class="choice" data-pick-variant="co-up"><span class="choice__glyph" style="background:var(--xq-red);color:var(--xq-disc);box-shadow:none">?</span><span><b>Cờ úp</b><small>Quân úp, lật mặt khi đi — mỗi ván một khác</small></span></button>
                </div>
                <div class="card card--pad mt-4 text-[14px]" data-coup-only>
                    <div class="font-bold mb-1 flex items-center gap-2"><span class="variant-badge">Cờ úp</span> Luật nhanh</div>
                    <ul class="list-disc pl-5 m-0 text-ink-soft grid gap-1">
                        <li>Hai Tướng để ngửa; 15 quân còn lại mỗi bên úp và tráo ngẫu nhiên trên ô xuất phát.</li>
                        <li>Quân úp đi theo binh chủng của ô đang đứng, lật lộ mặt ngay nước đầu.</li>
                        <li>Sĩ, Tượng đã lật được ra khỏi cung và qua sông.</li>
                        <li>Chiếu bí thắng; hết nước mà không bị chiếu là hoà.</li>
                    </ul>
                    <p class="text-[12.5px] text-ink-faint mt-2 mb-0">Máy không nhìn trộm quân úp — nó chỉ biết mỗi bên còn những quân gì chưa lộ.</p>
                </div>

                <h2 class="text-lg font-extrabold mt-6 mb-3">Cấp độ</h2>
                <div class="grid gap-2 sm:grid-cols-2">
                    @foreach([1 => ['Tập sự', 'Hay đi bừa — hợp người mới làm quen', '兵'], 2 => ['Dễ', 'Tính trước 2 nước, đôi khi sơ hở', '馬'], 3 => ['Vừa', 'Tính trước 3 nước, không cho không quân', '炮'], 4 => ['Khó', 'Tính sâu, phản công sắc bén', '車']] as $lv => [$name, $desc, $glyph])
                        <button type="button" class="choice {{ $lv === 2 ? 'is-on' : '' }}" data-pick-level="{{ $lv }}">
                            <span class="choice__glyph">{{ $glyph }}</span>
                            <span><b>{{ $name }}</b><small>{{ $desc }} · thắng +{{ config('gamification.xp.bot_win.'.$lv) }} XP</small></span>
                        </button>
                    @endforeach
                </div>

                <h2 class="text-lg font-extrabold mt-6 mb-3">Bạn cầm quân</h2>
                <div class="flex flex-wrap gap-2">
                    <button type="button" class="chip is-on" data-pick-side="do"><span class="side-dot do"></span> Đỏ (đi trước)</button>
                    <button type="button" class="chip" data-pick-side="den"><span class="side-dot den"></span> Đen</button>
                    <button type="button" class="chip" data-pick-side="random"><x-icon name="repeat" /> Ngẫu nhiên</button>
                </div>

                <button type="button" class="btn btn--primary btn--lg mt-6" data-bot-start><x-icon name="play" /> Bắt đầu ván mới</button>
                @guest<p class="text-[13.5px] text-ink-soft mt-3"><a href="{{ route('login') }}" class="font-bold">Đăng nhập</a> để nhận XP khi thắng máy (tối đa {{ config('gamification.caps.bot_wins_daily') }} ván/ngày).</p>@endguest
            </div>
            <div class="hero__board hidden lg:block" data-fen-thumb="rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR">
                <div class="board-holder"></div>
            </div>
        </div>

        <section class="section">
            <div class="grid gap-6 lg:grid-cols-2">
                <div class="prose">
                    <h2>Vì sao nên chơi cờ tướng với máy?</h2>
                    <p>Đọc lý thuyết và giải thế cờ giúp bạn biết <strong>nên đi gì</strong>, nhưng chỉ khi chơi trọn một ván bạn mới học được cách <strong>giữ thế, đổi quân và kết thúc ván</strong>. Máy luôn sẵn sàng, không ngại bạn đi lại và có thể gợi ý khi bạn bí.</p>
                    <p>Hãy bắt đầu ở cấp <strong>Tập sự</strong>, thắng liên tiếp rồi tăng cấp. Gặp thế khó, mở lại bài học <a href="{{ route('phase', 'khai-cuoc') }}">khai cuộc</a> hoặc <a href="{{ route('practice.hub') }}">luyện thế cờ sát pháp</a> để bổ sung.</p>
                </div>
                <div class="faq-list">
                    @foreach($faqs as $f)
                        <details class="faq-item card"><summary>{{ $f[0] }}</summary><div class="faq-answer">{{ $f[1] }}</div></details>
                    @endforeach
                </div>
            </div>
        </section>
    </section>

    <section data-bot-play hidden>
        <div class="practice">
            <div class="min-w-0">
                <div class="board-card card">
                    <div class="board-bar">
                        <span class="flex items-center gap-2 min-w-0"><span class="variant-badge" data-bot-variant hidden>Cờ úp</span><span class="step-pill">Máy · cấp <b class="ml-1" data-bot-level></b></span></span>
                        <span class="tag" data-bot-status>Đang tải…</span>
                    </div>
                    <div class="board-stage" data-bot-board></div>
                    <div class="controls flex-wrap">
                        <button type="button" class="btn" data-bot-undo><x-icon name="undo" /> Đi lại</button>
                        <button type="button" class="btn" data-bot-hint><x-icon name="bulb" /> Gợi ý</button>
                        <button type="button" class="btn btn--ghost" data-bot-flip><x-icon name="flip" /> Lật bàn</button>
                    </div>
                </div>
            </div>
            <div class="grid gap-3 content-start">
                <div class="card card--pad !py-3" data-bot-captured></div>
                <div class="card overflow-hidden">
                    <div class="side-head"><span>Biên bản ván cờ</span></div>
                    <div class="px-4 py-2 max-h-[40vh] overflow-y-auto" data-bot-moves></div>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button type="button" class="btn btn--ghost btn--danger" data-bot-resign><x-icon name="x-circle" /> Xin thua</button>
                    <button type="button" class="btn" data-bot-new><x-icon name="repeat" /> Ván mới</button>
                </div>
                <p class="text-[13px] text-ink-faint m-0">Dùng "Đi lại" hoặc "Gợi ý" thì ván thắng chỉ được nửa XP. Ván đang chơi được lưu trên thiết bị này.</p>
            </div>
        </div>
    </section>
</div>
@endsection
