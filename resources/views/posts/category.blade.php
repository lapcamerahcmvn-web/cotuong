@extends('layouts.app')

@section('title', $category->name . ' — Tin tức Học Cờ Tướng' . ($posts->currentPage() > 1 ? ' — Trang '.$posts->currentPage() : ''))
@section('description', $category->description ?: ($category->name . ' — tin tức, video và phân tích cờ tướng.'))
@section('og_image', \App\Support\Seo::ogImage())

@push('head')
{!! \App\Support\Seo::ld([
    '@context' => 'https://schema.org',
    '@type' => 'BreadcrumbList',
    'itemListElement' => [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Trang chủ', 'item' => route('home')],
        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Tin tức', 'item' => route('posts.index')],
        ['@type' => 'ListItem', 'position' => 3, 'name' => $category->name],
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
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('posts.index') }}">Tin tức</a><x-icon name="chev-right" />
    <span>{{ $category->name }}</span>
</nav>
<h1 class="page-title">{{ $category->name }}</h1>
@if($category->description)<p class="page-lede mb-5">{{ $category->description }}</p>@endif

@include('posts._cats', ['current' => $category->id])

@if($posts->isEmpty())
    <div class="notice">Chuyên mục này chưa có bài viết nào.</div>
@else
    <div class="news-grid">
        @foreach($posts as $p) @include('posts._card', ['p' => $p, 'catSlug' => $category->slug]) @endforeach
    </div>
    {{ $posts->links() }}
@endif
@endsection
