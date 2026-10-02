@extends('layouts.app')
@section('title', 'Thách Đấu Cờ Tướng, Cờ Úp Với Bạn Bè Qua Link — Học Cờ Tướng')
@section('description', 'Tạo phòng cờ tướng hoặc cờ úp, gửi link qua Zalo/Facebook để thách đấu bạn bè. Đồng hồ 5–15 phút, đề nghị hoà, luật kiểm tra tự động, quân úp được giữ bí mật.')

@section('content')
@php $u = auth()->user(); @endphp
<div class="grid gap-6 lg:grid-cols-[1fr_400px] items-start">
    <div>
        <div class="eyebrow"><x-icon name="sword" /> Chơi</div>
        <h1 class="page-title mt-1">Thách đấu bạn bè</h1>
        <p class="page-lede">Tạo phòng, gửi link cho bạn qua Zalo hoặc Messenger. Bạn bấm vào là vào ván — luật được kiểm tra tự động từng nước.</p>

        @if($errors->any())<div class="alert alert--err mt-4"><x-icon name="x-circle" />{{ $errors->first() }}</div>@endif

        @auth
        <form method="POST" action="{{ route('pvp.store') }}" class="card card--pad mt-5">
            @csrf
            <h2 class="text-lg font-extrabold mb-3">Tạo phòng mới</h2>
            <div class="label mb-2">Biến thể</div>
            <div class="choice-grid sm:grid-cols-2 mb-4" data-choice-group>
                <input type="hidden" name="variant" value="{{ request('bien-the') === 'co-up' ? 'co-up' : 'co-tuong' }}">
                <button type="button" class="choice {{ request('bien-the') === 'co-up' ? '' : 'is-on' }}" data-choice="co-tuong"><span class="choice__glyph">帥</span><span><b>Cờ tướng</b><small>Luật chuẩn</small></span></button>
                <button type="button" class="choice {{ request('bien-the') === 'co-up' ? 'is-on' : '' }}" data-choice="co-up"><span class="choice__glyph" style="background:var(--xq-red);color:var(--xq-disc);box-shadow:none">?</span><span><b>Cờ úp</b><small>Quân úp, lật mặt khi đi</small></span></button>
            </div>
            <div class="label mb-2">Bạn cầm quân</div>
            <div class="choice-grid sm:grid-cols-3 mb-4" data-choice-group>
                <input type="hidden" name="side" value="do">
                <button type="button" class="choice is-on" data-choice="do"><span class="choice__glyph">帥</span><span><b>Đỏ</b><small>Đi trước</small></span></button>
                <button type="button" class="choice" data-choice="den"><span class="choice__glyph" style="color:var(--xq-black);box-shadow:inset 0 0 0 2px var(--xq-black)">將</span><span><b>Đen</b><small>Đi sau</small></span></button>
                <button type="button" class="choice" data-choice="random"><span class="choice__glyph"><x-icon name="repeat" class="w-6 h-6" /></span><span><b>Ngẫu nhiên</b><small>Bốc thăm</small></span></button>
            </div>
            <div class="label mb-2">Thời gian mỗi bên</div>
            <div class="flex flex-wrap gap-2 mb-5" data-choice-group>
                <input type="hidden" name="time" value="600">
                @foreach(\App\Models\Game::TIME_CONTROLS as $s => $label)
                    <button type="button" class="chip {{ $s === 600 ? 'is-on' : '' }}" data-choice="{{ $s }}"><x-icon name="clock" /> {{ $label }}</button>
                @endforeach
            </div>
            <button class="btn btn--primary btn--lg" type="submit"><x-icon name="sword" /> Tạo phòng & lấy link</button>
        </form>

        <form method="POST" action="{{ route('pvp.join') }}" class="card card--pad mt-4 flex flex-wrap gap-2 items-end">
            @csrf
            <div class="field !mb-0 flex-1 min-w-[180px]">
                <label class="label" for="code">Đã có mã phòng?</label>
                <input class="input uppercase tracking-[.2em] font-bold" id="code" name="code" maxlength="8" placeholder="VD: K7QH2M" required>
            </div>
            <button class="btn" type="submit">Vào phòng</button>
        </form>
        @else
        <div class="card card--pad card--hero mt-5">
            <div class="font-bold text-lg">Đăng nhập để tạo phòng thách đấu</div>
            <p class="text-ink-soft text-[14.5px] mt-1 mb-4">Hai người chơi cần có tài khoản (miễn phí) để lưu kết quả và nhận XP.</p>
            <a href="{{ route('login') }}" class="btn btn--primary">Đăng nhập</a>
            <a href="{{ route('play.bot') }}" class="btn btn--ghost">Hoặc chơi với máy</a>
        </div>
        @endauth
    </div>

    <aside class="grid gap-4 content-start">
        <a href="{{ route('play.bot') }}" class="card mode-card">
            <span class="mode-card__icon tone-primary"><x-icon name="shield" /></span>
            <span><h3>Chơi với máy</h3><p>4 cấp độ, có gợi ý — luyện tay trước khi thách đấu.</p></span>
        </a>
        @if($u && $mine->isNotEmpty())
            <section class="card overflow-hidden">
                <div class="side-head"><span>Ván của tôi</span></div>
                @foreach($mine as $g)
                    @php
                        $side = $g->sideOf($u); $opp = $side === 'do' ? $g->black : $g->red;
                        $label = match ($g->status) {
                            'waiting' => 'Đang chờ bạn vào', 'playing' => ($g->turn() === $side ? 'Tới lượt bạn' : 'Chờ đối thủ'),
                            'aborted' => 'Đã huỷ',
                            default => $g->result === 'hoa' ? 'Hoà' : ($g->result === $side ? 'Thắng' : 'Thua'),
                        };
                    @endphp
                    <a href="{{ route('pvp.show', $g->code) }}" class="flex items-center gap-3 px-4 py-3 border-b border-line text-ink hover:bg-surface-2 hover:no-underline">
                        <span class="side-dot {{ $side }}"></span>
                        <span class="flex-1 min-w-0"><span class="block font-bold truncate">{{ $opp?->name ?? 'Chưa có đối thủ' }}</span>
                            <span class="block text-[12.5px] text-ink-faint">#{{ $g->code }} · {{ \App\Models\Game::VARIANTS[$g->variant] ?? '' }} · {{ \App\Models\Game::TIME_CONTROLS[$g->time_control] ?? '' }} · {{ $g->updated_at->locale('vi')->diffForHumans() }}</span></span>
                        <span class="tag {{ $label === 'Tới lượt bạn' || $label === 'Thắng' ? 'tag--done' : '' }}">{{ $label }}</span>
                    </a>
                @endforeach
            </section>
        @endif
        @if($u)
            <a href="{{ route('history.index') }}" class="card mode-card">
                <span class="mode-card__icon tone-gold"><x-icon name="clock" /></span>
                <span><h3>Lịch sử ván đấu</h3><p>Xem lại từng nước các ván đã chơi, chép vào thư viện để sửa và thêm biến.</p></span>
            </a>
        @endif
    </aside>
</div>
@endsection
