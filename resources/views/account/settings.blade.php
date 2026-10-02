@extends('layouts.app')
@section('title', 'Cài đặt — Học Cờ Tướng')
@section('robots', 'noindex, nofollow')

@section('content')
<div class="max-w-2xl mx-auto">
    <nav class="crumbs" aria-label="breadcrumb"><a href="{{ route('account.index') }}">Hồ sơ</a><x-icon name="chev-right" /><span>Cài đặt</span></nav>
    <h1 class="page-title">Cài đặt</h1>

    @if(session('ok'))<div class="alert alert--ok my-4"><x-icon name="check-circle" />{{ session('ok') }}</div>@endif
    @if($errors->any())<div class="alert alert--err my-4"><x-icon name="x-circle" />{{ $errors->first() }}</div>@endif

    <form method="POST" action="{{ route('account.settings.save') }}" class="grid gap-4 mt-4">
        @csrf
        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-3">Tài khoản</h2>
            <div class="field">
                <label class="label" for="name">Tên hiển thị</label>
                <input class="input" id="name" name="name" value="{{ old('name', $user->name) }}" maxlength="60" required>
            </div>
            <div class="text-[13.5px] text-ink-soft">Email: {{ $user->email }}</div>
        </section>

        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-1">Mục tiêu mỗi ngày</h2>
            <p class="text-[14px] text-ink-soft mb-3">Học một bài ≈ {{ config('gamification.xp.lesson_complete') }} XP, giải một thế cờ ≈ 10–25 XP.</p>
            <div class="choice-grid sm:grid-cols-2" data-choice-group>
                <input type="hidden" name="daily_goal_xp" value="{{ $user->daily_goal_xp }}">
                @foreach(config('gamification.daily_goals') as $xp => $label)
                    <button type="button" class="choice {{ (int) $user->daily_goal_xp === $xp ? 'is-on' : '' }}" data-choice="{{ $xp }}">
                        <span class="stat__icon tone-gold"><x-icon name="target" /></span>
                        <span><b>{{ $label }}</b><small>{{ $xp }} XP mỗi ngày</small></span>
                    </button>
                @endforeach
            </div>
        </section>

        <section class="card card--pad">
            <h2 class="text-lg font-extrabold mb-3">Bảng xếp hạng</h2>
            <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="leaderboard_opt_out" value="1" class="mt-1 w-5 h-5 accent-[var(--primary)]" @checked($user->leaderboard_opt_out)>
                <span><span class="font-bold block">Ẩn tôi khỏi bảng xếp hạng</span><span class="text-[13.5px] text-ink-soft">Bạn vẫn nhận XP, chuỗi ngày và huy hiệu như bình thường — chỉ không hiện tên công khai.</span></span>
            </label>
        </section>

        @include('partials.display-settings')

        <div class="flex justify-end gap-2">
            <a href="{{ route('account.index') }}" class="btn btn--ghost">Huỷ</a>
            <button type="submit" class="btn btn--primary">Lưu cài đặt</button>
        </div>
    </form>
</div>


@endsection
