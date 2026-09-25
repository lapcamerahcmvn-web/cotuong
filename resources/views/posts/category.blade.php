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
    <a href="{{ route('home') }}">Trang chủ</a> ›
    <a href="{{ route('posts.index') }}">Tin tức</a> ›
    <span>{{ $category->name }}</span>
</nav>

<section class="section page-head">
    <h1>{{ $category->name }}</h1>
    @if($category->description)
        <p class="sub">{{ $category->description }}</p>
    @endif

    @if($categories->isNotEmpty())
        <nav class="news-cat-nav mt-3" aria-label="Chuyên mục Tin tức">
            @php $_catIcons = ['video-huong-dan' => '🎥', 'phan-tich-van-co' => '♟️', 'tin-cong-dong-giai-dau' => '🏆', 'kien-thuc-co-tuong' => '📖']; @endphp
            @foreach($categories as $c)
                <a href="{{ route('posts.category', $c->slug) }}" @class(['news-cat-item', 'on' => $c->id === $category->id])>
                    <span class="nc-icon">{{ $_catIcons[$c->slug] ?? '📰' }}</span>
                    <span class="nc-name">{{ $c->name }}</span>
                    <span class="nc-count">{{ $c->posts_count }}</span>
                </a>
            @endforeach
        </nav>
    @endif

    @if($posts->isEmpty())
        <div class="notice">Chuyên mục này chưa có bài viết nào.</div>
    @else
        <div class="lesson-list">
            @foreach($posts as $p)
                <a href="{{ route('posts.show', [$category->slug, $p->slug]) }}" class="lesson-item card has-thumb">
                    <span class="li-thumb">
                        <img src="{{ $p->thumbnail ? \Illuminate\Support\Facades\Storage::url($p->thumbnail) : \App\Support\Seo::ogImage() }}" alt="{{ $p->title }}" loading="lazy">
                    </span>
                    <span>
                        <span class="li-title">{{ $p->title }}</span>
                        <span class="li-sub">{{ $p->published_at?->format('d/m/Y') }} · {{ $p->view_count }} lượt xem</span>
                    </span>
                    <span class="li-meta">→</span>
                </a>
            @endforeach
        </div>
        <div class="mt-5">{{ $posts->links() }}</div>
    @endif
</section>
@endsection
