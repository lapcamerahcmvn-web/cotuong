@extends('layouts.app')

@section('title', $post->seo_title ?: (mb_strlen($post->title) <= 55 ? $post->title . ' — Học Cờ Tướng' : \Illuminate\Support\Str::limit($post->title, 60, '…')))
@section('description', \Illuminate\Support\Str::limit(strip_tags($post->seo_description ?: $post->excerpt ?: \App\Support\PostContent::autoExcerpt($post->content)), 155))
@section('og_title', $post->title)
@section('og_type', 'article')
@section('og_image', $post->thumbnail ? \Illuminate\Support\Facades\Storage::url($post->thumbnail) : \App\Support\Seo::ogImage())

@push('head')
<meta property="article:published_time" content="{{ $post->published_at?->toIso8601String() }}">
<meta property="article:modified_time" content="{{ $post->updated_at?->toIso8601String() }}">
@if($post->category)<meta property="article:section" content="{{ $post->category->name }}">@endif
@php
    $_ogImage = $post->thumbnail ? \Illuminate\Support\Facades\Storage::url($post->thumbnail) : \App\Support\Seo::ogImage();

    $ldArticle = array_filter([
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => $post->title,
        'description' => \Illuminate\Support\Str::limit(strip_tags($post->excerpt ?: ''), 300),
        'inLanguage' => 'vi-VN',
        'image' => $_ogImage,
        'author' => ['@id' => url('/#org')],
        'publisher' => ['@id' => url('/#org')],
        'datePublished' => $post->published_at?->toIso8601String(),
        'dateModified' => $post->updated_at?->toIso8601String(),
        'mainEntityOfPage' => url()->current(),
    ]);

    $crumbs = [
        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Trang chủ', 'item' => route('home')],
        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Tin tức', 'item' => route('posts.index')],
    ];
    if ($post->category) {
        $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $post->category->name, 'item' => route('posts.category', $post->category->slug)];
    }
    $crumbs[] = ['@type' => 'ListItem', 'position' => count($crumbs) + 1, 'name' => $post->title];
    $ldCrumb = ['@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $crumbs];
@endphp
<script type="application/ld+json">{!! json_encode($ldArticle, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
<script type="application/ld+json">{!! json_encode($ldCrumb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@endpush

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" />
    <a href="{{ route('posts.index') }}">Tin tức</a><x-icon name="chev-right" />
    @if($post->category)<a href="{{ route('posts.category', $post->category->slug) }}">{{ $post->category->name }}</a><x-icon name="chev-right" />@endif
    <span>{{ \Illuminate\Support\Str::limit($post->title, 40) }}</span>
</nav>

<article class="max-w-[780px] mx-auto">
    <header class="lesson-head">
        @if($post->category)<span class="eyebrow">{{ $post->category->name }}</span>@endif
        <h1 class="title mt-2">{{ $post->title }}</h1>
        <div class="meta-row">
            <span class="tag"><x-icon name="calendar" /> {{ $post->published_at?->format('d/m/Y') }}</span>
            <span class="tag"><x-icon name="eye" /> {{ $post->view_count }} lượt xem</span>
        </div>
    </header>

    @if($post->thumbnail)
        <img src="{{ \Illuminate\Support\Facades\Storage::url($post->thumbnail) }}" alt="{{ $post->title }}" class="w-full rounded-[18px] my-5">
    @endif

    <div class="prose !max-w-none">{!! \App\Support\PostContent::render($post->content) !!}</div>

    <div class="mt-8">
        <x-share-buttons :url="url()->current()" :title="$post->title" :image="$_ogImage" />
    </div>
</article>

@if($related->isNotEmpty())
<section class="section">
    <div class="section-head"><div><h2>Bài liên quan</h2></div></div>
    <div class="news-grid">
        @foreach($related as $r) @include('posts._card', ['p' => $r]) @endforeach
    </div>
</section>
@endif
@endsection
