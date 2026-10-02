@extends('layouts.app')
@section('title', 'Giao diện bàn cờ & âm thanh — Học Cờ Tướng')
@section('robots', 'noindex, follow')

@section('content')
<div class="max-w-2xl mx-auto">
    <h1 class="page-title">Giao diện bàn cờ &amp; âm thanh</h1>
    <p class="page-lede">Chọn màu bàn, chữ trên quân, kiểu quân, số cột và âm thanh — lưu trên thiết bị này, dùng cho mọi bàn cờ trên trang.</p>
    <div class="grid gap-4 mt-4">
        @include('partials.display-settings')
    </div>
    <p class="mt-4"><a href="{{ url()->previous() !== url()->current() ? url()->previous() : route('home') }}" class="btn btn--ghost"><x-icon name="chev-left" /> Quay lại</a></p>
</div>
@endsection
