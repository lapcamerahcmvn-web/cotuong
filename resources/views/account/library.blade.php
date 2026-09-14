@extends('layouts.app')
@section('title', 'Thư viện của tôi — Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> ›
    <a href="{{ route('account.index') }}">Tài khoản</a> ›
    <span>Thư viện của tôi</span>
</nav>

<section class="section page-head">
    <h1>Thư viện của tôi</h1>
    <p class="sub">Thế cờ bạn đã sao chép từ bài học, hoặc tự soạn — lưu lại để xem hay chia sẻ sau.</p>

    @if(session('success'))
        <div class="notice" style="border-color:var(--jade);color:var(--jade);margin-top:16px;">{{ session('success') }}</div>
    @endif

    <details class="card mt-5" style="padding:18px 20px;">
        <summary style="cursor:pointer;font-weight:800;font-size:16px;">✚ Soạn thế cờ mới</summary>
        <div class="mt-5" data-fen-composer>
            <p class="muted" style="font-size:13.5px;margin:0 0 12px;">Chọn quân ở bảng rồi bấm lên bàn cờ để đặt, hoặc dán sẵn 1 chuỗi FEN.</p>
            <div data-fc-palette class="fc-palette"></div>
            <div class="fc-fen-row">
                <input type="text" data-fc-fen-input placeholder="Chuỗi FEN (phần xếp quân)…">
                <button type="button" class="btn btn--ghost" data-fc-fen-apply>Dán FEN vào bàn</button>
                <button type="button" class="btn btn--ghost" data-fc-fen-copy>Copy FEN</button>
            </div>
            <div class="cluster mt-3" style="margin-bottom:6px;">
                <button type="button" class="btn" data-fc-start>Thế mở Cờ Tướng</button>
                <button type="button" class="btn" data-fc-clear>Xoá hết</button>
                <button type="button" class="btn primary" data-fc-save>💾 Lưu vào thư viện</button>
            </div>
            <div data-fc-msg class="fc-msg"></div>
            <div class="fc-board-wrap">
                <div data-fc-board></div>
            </div>
        </div>
    </details>

    <h2 class="phase-sec-title">Đã lưu ({{ $items->total() }})</h2>

    @if($items->isEmpty())
        <div class="notice">Chưa lưu thế cờ nào — soạn thế cờ mới ở trên, hoặc bấm 🔖 trên bàn cờ ở bất kỳ bài học nào.</div>
    @else
        <div class="lesson-list">
            @foreach($items as $item)
                <div class="card" style="padding:0;">
                    <details>
                        <summary class="lesson-item has-thumb" style="cursor:pointer;list-style:none;border:none;border-radius:var(--radius);">
                            <span class="li-thumb" data-fen-thumb="{{ $item->fen }}"></span>
                            <span>
                                <span class="li-title">{{ $item->title ?: 'Thế cờ đã lưu' }}</span>
                                <span class="li-sub">
                                    Lưu {{ $item->created_at->format('d/m/Y') }}
                                    @if($item->sourceLesson)
                                        · từ bài <a href="{{ route('lessons.show', $item->sourceLesson->slug) }}">{{ \Illuminate\Support\Str::limit($item->sourceLesson->title, 30) }}</a>
                                    @endif
                                </span>
                            </span>
                            <span class="li-meta muted" style="font-size:13px;">Xem ▾</span>
                        </summary>
                        <div style="padding:0 18px 18px;">
                            <x-chess-board :initial-fen="$item->fen" :steps="[]" :show-list="false" />
                            <form method="POST" action="{{ route('library.destroy', $item) }}" onsubmit="return confirm('Xoá thế cờ này khỏi thư viện?');" class="mt-3">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn--ghost" style="color:var(--red);">🗑 Xoá khỏi thư viện</button>
                            </form>
                        </div>
                    </details>
                </div>
            @endforeach
        </div>
        <div class="mt-5">{{ $items->links() }}</div>
    @endif
</section>

@push('scripts')
<script src="{{ asset('js/fen-composer.js') }}?v={{ @filemtime(public_path('js/fen-composer.js')) }}" defer></script>
<script>
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-fen-thumb]').forEach(function (el) {
        if (window.XiangqiBoard) el.innerHTML = window.XiangqiBoard.render(el.getAttribute('data-fen-thumb'));
    });
});
</script>
@endpush
@endsection
