@extends('layouts.app')

@section('title', 'Tin tức — Học Cờ Tướng' . ($posts->currentPage() > 1 ? ' — Trang '.$posts->currentPage() : ''))
@section('description', 'Tin tức cờ tướng: video hướng dẫn, phân tích ván cờ có bàn cờ tương tác, tin cộng đồng và giải đấu, kiến thức cờ tướng.')
@section('og_image', \App\Support\Seo::ogImage())

@push('head')
{!! \App\Support\Seo::ld([
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Trang chủ', 'item' => route('home')],
        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Tin tức'],
    ],
]) !!}
@if($posts->currentPage() > 1)
<link rel="prev" href="{{ $posts->previousPageUrl() }}">
@endif
@if($posts->hasMorePages())
<link rel="next" href="{{ $posts->nextPageUrl() }}">
@endif
@endpush

@section('content')
<nav class="crumbs" aria-label="breadcrumb"><a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>Tin tức</span></nav>
<h1 class="page-title">Tin tức cờ tướng</h1>
<p class="page-lede mb-5">Video hướng dẫn, phân tích ván cờ có bàn cờ tương tác, tin cộng đồng và kiến thức cờ tướng.</p>

@include('posts._cats', ['current' => null])

@if($featured->isNotEmpty())
    <div class="section-head"><div><h2>Nổi bật</h2></div></div>
    <div class="news-grid mb-10">
        @foreach($featured as $p) @include('posts._card', ['p' => $p]) @endforeach
    </div>
@endif

<div class="section-head"><div><h2>Tất cả bài viết</h2></div></div>
@if($posts->isEmpty())
    <div class="notice">Chưa có bài viết nào — quay lại sau nhé.</div>
@else
    <div class="news-grid">
        @foreach($posts as $p) @include('posts._card', ['p' => $p]) @endforeach
    </div>
    {{ $posts->links() }}
@endif
@endsection
