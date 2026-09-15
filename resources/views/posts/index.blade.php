@extends('layouts.app')

@section('title', 'Tin tức — Học Cờ Tướng')
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
@endpush

@section('content')
<nav class="crumbs" aria-label="breadcrumb">
    <a href="{{ route('home') }}">Trang chủ</a> › <span>Tin tức</span>
</nav>

<section class="section page-head">
    <h1>Tin tức</h1>
    <p class="sub">Video hướng dẫn, phân tích ván cờ có bàn cờ tương tác, tin cộng đồng và kiến thức cờ tướng.</p>

    @if($categories->isNotEmpty())
        <div class="cluster mt-3" style="margin-bottom:28px;">
            @foreach($categories as $c)
                <a href="{{ route('posts.category', $c->slug) }}" class="tag" style="background:var(--surface-2);color:var(--ink-soft);border:1px solid var(--line);">{{ $c->name }} ({{ $c->posts_count }})</a>
            @endforeach
        </div>
    @endif

    @if($featured->isNotEmpty())
        <h2 class="phase-sec-title">Nổi bật</h2>
        <div class="lesson-list mt-3" style="margin-bottom:28px;">
            @foreach($featured as $p)
                <a href="{{ route('posts.show', [$p->category?->slug ?: 'tin-tuc', $p->slug]) }}" class="lesson-item card has-thumb">
                    <span class="li-thumb">
                        <img src="{{ $p->thumbnail ? \Illuminate\Support\Facades\Storage::url($p->thumbnail) : \App\Support\Seo::ogImage() }}" alt="{{ $p->title }}" loading="lazy">
                    </span>
                    <span>
                        <span class="li-title">{{ $p->title }}</span>
                        <span class="li-sub">{{ $p->category?->name ?? 'Tin tức' }} · {{ $p->published_at?->format('d/m/Y') }}</span>
                    </span>
                    <span class="li-meta"><span class="tag count">★ Nổi bật</span></span>
                </a>
            @endforeach
        </div>
    @endif

    <h2 class="phase-sec-title">Tất cả bài viết</h2>
    @if($posts->isEmpty())
        <div class="notice">Chưa có bài viết nào — quay lại sau nhé.</div>
    @else
        <div class="lesson-list">
            @foreach($posts as $p)
                <a href="{{ route('posts.show', [$p->category?->slug ?: 'tin-tuc', $p->slug]) }}" class="lesson-item card has-thumb">
                    <span class="li-thumb">
                        <img src="{{ $p->thumbnail ? \Illuminate\Support\Facades\Storage::url($p->thumbnail) : \App\Support\Seo::ogImage() }}" alt="{{ $p->title }}" loading="lazy">
                    </span>
                    <span>
                        <span class="li-title">{{ $p->title }}</span>
                        <span class="li-sub">{{ $p->category?->name ?? 'Tin tức' }} · {{ $p->published_at?->format('d/m/Y') }} · {{ $p->view_count }} lượt xem</span>
                    </span>
                    <span class="li-meta">→</span>
                </a>
            @endforeach
        </div>
        <div class="mt-5">{{ $posts->links() }}</div>
    @endif
</section>
@endsection
