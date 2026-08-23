@extends('layouts.app')
@section('title', 'Tài khoản — Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@section('content')
<section class="section" style="padding-top:20px;">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap;">
        @if($user->avatar)
            <img src="{{ $user->avatar }}" alt="" style="width:56px;height:56px;border-radius:999px;">
        @else
            <div style="width:56px;height:56px;border-radius:999px;background:var(--red);color:#fff;display:grid;place-items:center;font-size:24px;font-weight:800;">{{ mb_substr($user->name,0,1) }}</div>
        @endif
        <div style="flex:1;min-width:0;">
            <h1 style="font-size:24px;font-weight:800;margin:0;">{{ $user->name }}</h1>
            <div class="muted" style="font-size:14px;">{{ $user->email }}</div>
        </div>
        <form method="POST" action="{{ route('logout') }}">@csrf<button class="btn">Đăng xuất</button></form>
    </div>

    <div class="stat-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:30px;">
        <div class="card" style="padding:16px 18px;"><div style="font-size:28px;font-weight:800;color:var(--jade);font-family:'Bricolage Grotesque',sans-serif;">{{ $completed->count() }}</div><div class="muted" style="font-size:13px;">Bài đã học</div></div>
        <div class="card" style="padding:16px 18px;"><div style="font-size:28px;font-weight:800;font-family:'Bricolage Grotesque',sans-serif;">{{ $reading->count() }}</div><div class="muted" style="font-size:13px;">Đang học dở</div></div>
        <div class="card" style="padding:16px 18px;"><div style="font-size:28px;font-weight:800;font-family:'Bricolage Grotesque',sans-serif;">{{ \App\Models\Lesson::published()->count() }}</div><div class="muted" style="font-size:13px;">Tổng bài học</div></div>
    </div>

    @if($completed->isNotEmpty())
        <h2 style="font-size:20px;font-weight:800;margin:0 0 12px;">✓ Bài đã học</h2>
        <div class="lesson-list" style="margin-bottom:30px;">
            @foreach($completed as $p)
                @if($p->lesson)
                <a href="{{ route('lessons.show', $p->lesson->slug) }}" class="lesson-item card">
                    <span class="li-num" style="color:var(--jade);">✓</span>
                    <span><span class="li-title">{{ $p->lesson->title }}</span><span class="li-sub">Hoàn thành {{ optional($p->completed_at)->format('d/m/Y') }}</span></span>
                    <span class="li-meta">→</span>
                </a>
                @endif
            @endforeach
        </div>
    @endif

    @if($reading->isNotEmpty())
        <h2 style="font-size:20px;font-weight:800;margin:0 0 12px;">Đang học dở</h2>
        <div class="lesson-list" style="margin-bottom:30px;">
            @foreach($reading as $p)
                @if($p->lesson)
                <a href="{{ route('lessons.show', $p->lesson->slug) }}" class="lesson-item card">
                    <span class="li-num">◐</span>
                    <span><span class="li-title">{{ $p->lesson->title }}</span><span class="li-sub">Đã đọc {{ floor($p->read_seconds/60) }} phút{{ $p->viewed_all_moves ? ' · đã xem hết nước' : '' }}</span></span>
                    <span class="li-meta">→</span>
                </a>
                @endif
            @endforeach
        </div>
    @endif

    @if($completed->isEmpty() && $reading->isEmpty())
        <div class="notice" style="margin-bottom:30px;">Bạn chưa học bài nào. Đọc một bài (khoảng 5 phút) và xem hết các nước đi để được đánh dấu <strong>đã học</strong>.</div>
    @endif

    @if($suggested->isNotEmpty())
        <h2 style="font-size:20px;font-weight:800;margin:0 0 12px;">Gợi ý học tiếp</h2>
        <div class="lesson-list">
            @foreach($suggested as $lesson)
                <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card">
                    <span class="li-num">{{ $lesson->order_in_series ?? '•' }}</span>
                    <span><span class="li-title">{{ $lesson->title }}</span><span class="li-sub">{{ $lesson->phase_label }} · {{ $lesson->move_count }} nước đi</span></span>
                    <span class="li-meta">→</span>
                </a>
            @endforeach
        </div>
    @endif
</section>
@endsection
