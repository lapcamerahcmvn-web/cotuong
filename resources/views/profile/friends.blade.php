@extends('layouts.app')
@section('title', 'Bạn bè — Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@php
    $avatar = fn ($u) => $u->avatar ? '<img src="' . e($u->avatar) . '" alt="" referrerpolicy="no-referrer" loading="lazy">' : e(mb_strtoupper(mb_substr($u->name, 0, 1)));
@endphp

@section('content')
<div class="text-center mb-6">
    <div class="eyebrow justify-center"><x-icon name="user" /> Bạn bè</div>
    <h1 class="page-title mt-1">Học cùng bạn bè</h1>
    <p class="page-lede mx-auto">Theo dõi kỳ thủ khác để thi đua XP mỗi tuần và xem họ vừa đạt được gì. Bấm tên ai đó trên <a href="{{ route('leaderboard') }}">bảng xếp hạng</a> để theo dõi.</p>
    <div class="cluster justify-center mt-3">
        <button type="button" class="btn btn--primary" data-share-text="Kết bạn với mình trên Học Cờ Tướng — cùng học, giải thế cờ và thi đua bảng xếp hạng tuần!" data-share-url="{{ $me->profileUrl() }}"><x-icon name="share" /> Mời bạn bè</button>
        <a href="{{ $me->profileUrl() }}" class="btn"><x-icon name="user" /> Hồ sơ công khai của tôi</a>
    </div>
</div>

<div class="practice">
    <div class="grid gap-4 content-start min-w-0">
        <section class="card overflow-hidden">
            <div class="side-head"><span>XP tuần này · bạn bè</span><a href="{{ route('weekly') }}" class="text-[13px]">Thử thách tuần</a></div>
            @if(count($board) <= 1)
                <div class="empty"><div class="empty__glyph">兵</div><h3>Chưa theo dõi ai</h3><p>Mở bảng xếp hạng, bấm vào tên một kỳ thủ rồi chọn “Theo dõi” — hoặc gửi link hồ sơ của bạn cho bạn bè.</p>
                    <a href="{{ route('leaderboard') }}" class="btn btn--primary mt-2">Tìm kỳ thủ trên bảng xếp hạng</a></div>
            @else
                @foreach($board as $i => $r)
                    <a href="{{ $r['url'] }}" class="lb-row {{ $r['me'] ? 'is-me' : '' }} text-ink hover:no-underline">
                        <span class="lb-rank lb-rank--{{ $i + 1 }}">{{ $i + 1 }}</span>
                        <x-avatar :name="$r['name']" :src="$r['avatar']" :frame="$r['frame'] ?? null" lazy />
                        <span class="lb-name">{{ $r['me'] ? 'Bạn' : $r['name'] }}<small>Cấp {{ $r['level'] }}</small></span>
                        <span class="lb-score">{{ number_format($r['score'], 0, ',', '.') }} <span class="text-[12px] text-ink-faint font-semibold">XP</span></span>
                    </a>
                @endforeach
            @endif
        </section>

        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-3">Hoạt động gần đây</h2>
            @forelse($feed as $e)
                <div class="feed-item">
                    <a href="{{ $e['user']->profileUrl() }}" class="shrink-0"><x-avatar :name="$e['user']->name" :src="$e['user']->avatar" :frame="$e['user']->avatar_frame" size="sm" lazy /></a>
                    <span class="flex-1 min-w-0 text-[14px]"><a href="{{ $e['user']->profileUrl() }}" class="font-bold text-ink">{{ $e['user']->name }}</a> {{ $e['text'] }}
                        <small class="block text-ink-faint">{{ $e['at']->locale('vi')->diffForHumans() }}</small></span>
                    @if($e['url'])<a href="{{ $e['url'] }}" class="btn btn--sm btn--ghost shrink-0"><x-icon :name="$e['icon']" /> Xem</a>@else<span class="feed-item__icon"><x-icon :name="$e['icon']" /></span>@endif
                </div>
            @empty
                <p class="text-[14px] text-ink-soft m-0">Chưa có hoạt động nào trong 14 ngày qua từ những người bạn theo dõi.</p>
            @endforelse
        </section>
    </div>

    <div class="grid gap-4 content-start">
        @foreach([['Đang theo dõi', $following], ['Người theo dõi bạn', $followers]] as [$title, $list])
            <section class="card overflow-hidden">
                <div class="side-head"><span>{{ $title }}</span><span class="text-[12px] text-ink-faint">{{ $list->count() }}</span></div>
                @forelse($list as $u)
                    <div class="flex items-center gap-3 px-4 py-2.5 border-b border-line">
                        <a href="{{ $u->profileUrl() }}"><x-avatar :name="$u->name" :src="$u->avatar" :frame="$u->avatar_frame" size="sm" lazy /></a>
                        <a href="{{ $u->profileUrl() }}" class="flex-1 min-w-0 font-bold text-ink truncate">{{ $u->name }}<small class="block text-[12px] text-ink-faint font-semibold">Cấp {{ $u->level }}</small></a>
                        @unless(in_array($u->id, $followingIds, true))
                            <button type="button" class="btn btn--sm btn--primary" data-follow="{{ route('profile.follow', $u->id) }}" data-following="0"><x-icon name="user" /> <span>Theo dõi lại</span></button>
                        @endunless
                    </div>
                @empty
                    <p class="px-4 py-3 text-[14px] text-ink-soft m-0">Chưa có ai.</p>
                @endforelse
            </section>
        @endforeach
    </div>
</div>
@endsection
