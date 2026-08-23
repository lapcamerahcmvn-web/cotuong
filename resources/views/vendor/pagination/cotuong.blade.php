@if ($paginator->hasPages())
    <nav class="pager" role="navigation" aria-label="Phân trang">
        @if ($paginator->onFirstPage())
            <span class="pager-btn disabled">‹</span>
        @else
            <a class="pager-btn" href="{{ $paginator->previousPageUrl() }}" rel="prev" aria-label="Trang trước">‹</a>
        @endif

        @foreach ($elements as $element)
            @if (is_string($element))
                <span class="pager-gap">{{ $element }}</span>
            @endif
            @if (is_array($element))
                @foreach ($element as $page => $url)
                    @if ($page == $paginator->currentPage())
                        <span class="pager-btn active" aria-current="page">{{ $page }}</span>
                    @else
                        <a class="pager-btn" href="{{ $url }}">{{ $page }}</a>
                    @endif
                @endforeach
            @endif
        @endforeach

        @if ($paginator->hasMorePages())
            <a class="pager-btn" href="{{ $paginator->nextPageUrl() }}" rel="next" aria-label="Trang sau">›</a>
        @else
            <span class="pager-btn disabled">›</span>
        @endif
    </nav>
@endif
