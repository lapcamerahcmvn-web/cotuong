{{-- Thân 1 chương trình trên lộ trình: các phần (unit) + nút bài. Phần đang học in sẵn, phần khác để trong <template>
     (trình duyệt không dựng cho tới khi bấm mở). Dùng ở path.blade.php và route path.series (nạp khi mở chương trình). --}}
@foreach($s['units'] as $ui => $unit)
    @php $unitActive = collect($unit['nodes'])->contains('state', 'next') || (! $seriesActive && $ui === 0); $multi = count($s['units']) > 1; @endphp
    @if($multi)
        <details class="mt-2" @if($unitActive) open @else data-unit-tpl @endif>
            <summary class="cursor-pointer text-[13.5px] font-bold text-ink-soft py-2 list-none flex items-center gap-2">
                <x-icon name="chev-right" class="w-4 h-4" /> Phần {{ $unit['index'] }} · bài {{ $unit['nodes'][0]['n'] }}–{{ end($unit['nodes'])['n'] }}
                @if($u)<span class="text-ink-faint font-semibold">({{ $unit['done'] }}/{{ count($unit['nodes']) }})</span>@endif
            </summary>
    @endif
    @if($multi && ! $unitActive)<template>@endif
    <div class="nodes pb-1">
        @foreach($unit['nodes'] as $n)<a href="{{ route('lessons.show', $n['slug']) }}" title="{{ $n['n'] }}. {{ $n['title'] }}" class="node is-{{ $n['state'] }}" data-lesson-node="{{ $n['id'] }}">@if($n['state'] === 'done')<x-icon name="check" />@else{{ $n['n'] }}@endif</a>@endforeach
    </div>
    @if($multi && ! $unitActive)</template>@endif
    @if($multi)</details>@endif
@endforeach
<a href="{{ route('series', $s['slug']) }}" class="inline-flex items-center gap-1 text-[13px] font-bold mt-3">Xem danh sách bài <x-icon name="arrow-right" class="w-4 h-4" /></a>
