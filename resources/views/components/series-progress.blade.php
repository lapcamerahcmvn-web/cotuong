@props(['series'])
@auth
    @php
        $done = auth()->user()->completedCountBySeries()[$series->id] ?? 0;
        $total = $series->published_lessons_count ?? $series->publishedLessons()->count();
    @endphp
    @if($total > 0)
        <span class="series-prog {{ $done >= $total ? 'is-done' : '' }}">
            @if($done >= $total)✓ Đã hoàn thành@else Đã học {{ $done }}/{{ $total }} @endif
        </span>
    @endif
@endauth
