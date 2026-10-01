@php $_cat = $catSlug ?? ($p->category?->slug ?: 'tin-tuc'); @endphp
<a href="{{ route('posts.show', [$_cat, $p->slug]) }}" class="card news-card">
    <span class="news-card__img"><img src="{{ $p->thumbnail ? \Illuminate\Support\Facades\Storage::url($p->thumbnail) : \App\Support\Seo::ogImage() }}" alt="{{ $p->title }}" loading="lazy"></span>
    <span class="news-card__body">
        @if(empty($catSlug) && $p->category)<span class="eyebrow">{{ $p->category->name }}</span>@endif
        <span class="news-card__title">{{ $p->title }}</span>
        <span class="news-card__meta">{{ $p->published_at?->format('d/m/Y') }} · {{ $p->view_count }} lượt xem</span>
    </span>
</a>
