@if($categories->isNotEmpty())
    @php $_catIcons = ['video-huong-dan' => 'play', 'phan-tich-van-co' => 'chart', 'tin-cong-dong-giai-dau' => 'trophy', 'kien-thuc-co-tuong' => 'book']; @endphp
    <nav class="news-cat-nav" aria-label="Chuyên mục Tin tức">
        <a href="{{ route('posts.index') }}" @class(['news-cat-item', 'on' => empty($current)])><x-icon name="news" class="w-4 h-4" /> Tất cả</a>
        @foreach($categories as $c)
            <a href="{{ route('posts.category', $c->slug) }}" @class(['news-cat-item', 'on' => ($current ?? null) === $c->id])>
                <x-icon :name="$_catIcons[$c->slug] ?? 'news'" class="w-4 h-4" />
                <span class="nc-name">{{ $c->name }}</span>
                <span class="nc-count">{{ $c->posts_count }}</span>
            </a>
        @endforeach
    </nav>
@endif
