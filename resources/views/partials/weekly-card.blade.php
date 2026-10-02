{{-- Thẻ thử thách tuần — $progress = WeeklyService::progress(); $compact = ẩn mô tả dài (trang chủ). --}}
@php $compact = $compact ?? false; $tones = ['hoc' => 'tone-jade', 'luyen' => 'tone-gold', 'choi' => 'tone-primary']; @endphp
<section class="card wk-card" data-weekly>
    <div class="wk-card__head">
        <span class="flex items-center gap-2 min-w-0">
            <span class="stat__icon tone-gold !w-9 !h-9"><x-icon name="target" /></span>
            <span class="min-w-0"><b class="block">Thử thách tuần</b>
                <small class="text-ink-faint font-semibold">Còn <span data-weekly-countdown="{{ $progress['seconds_left'] }}"></span> · đã xong <b data-weekly-done>{{ $progress['done'] }}/{{ $progress['total'] }}</b></small></span>
        </span>
        @if($compact)<a href="{{ route('weekly') }}" class="text-[13.5px] font-bold whitespace-nowrap">Xem giải thưởng <x-icon name="chev-right" class="w-4 h-4 inline" /></a>@endif
    </div>
    <div class="wk-list">
        @foreach($progress['quests'] as $q)
            <div class="wk-quest {{ $q['claimed'] ? 'is-claimed' : ($q['done'] ? 'is-done' : '') }}">
                <span class="stat__icon {{ $tones[$q['group']] ?? 'tone-ink' }} !w-10 !h-10"><x-icon :name="$q['icon']" /></span>
                <span class="flex-1 min-w-0">
                    <span class="wk-quest__title">{{ $q['title'] }} <span class="wk-quest__group">{{ config('weekly.groups.' . $q['group']) }}</span></span>
                    @unless($compact)<span class="block text-[12.5px] text-ink-soft">{{ $q['desc'] }}</span>@endunless
                    <span class="flex items-center gap-2 mt-1.5">
                        <span class="progress progress--sm {{ $q['done'] ? 'progress--jade' : 'progress--gold' }} flex-1"><span class="progress__bar" style="width: {{ $q['pct'] }}%"></span></span>
                        <span class="text-[12px] font-bold text-ink-soft tabular-nums">{{ $q['value'] }}/{{ $q['target'] }}</span>
                    </span>
                </span>
                <span class="wk-quest__act">
                    @if($q['claimed'])
                        <span class="wk-claimed"><x-icon name="check" /> Đã nhận</span>
                    @elseif($q['done'])
                        <button type="button" class="btn btn--sm btn--primary" data-weekly-claim="{{ $q['key'] }}"><x-icon name="star" /> +{{ $q['xp'] }}</button>
                    @else
                        <span class="tag tag--xp">+{{ $q['xp'] }} XP</span>
                    @endif
                </span>
            </div>
        @endforeach
    </div>
    <div class="wk-chest {{ $progress['chest']['claimed'] ? 'is-open' : ($progress['chest']['ready'] ? 'is-ready' : '') }}" data-weekly-chest>
        <span class="wk-chest__icon"><x-icon name="gift" /></span>
        <span class="flex-1 min-w-0"><b class="block text-[14px]">Rương tuần</b>
            <small class="text-ink-soft">Xong cả {{ $progress['total'] }} thử thách: +{{ $progress['chest']['xp'] }} XP{{ $progress['chest']['freezes'] ? ' + ' . $progress['chest']['freezes'] . ' thẻ giữ chuỗi' : '' }}</small></span>
        @if($progress['chest']['claimed'])
            <span class="wk-claimed"><x-icon name="check" /> Đã mở</span>
        @else
            <button type="button" class="btn btn--sm {{ $progress['chest']['ready'] ? 'btn--primary' : '' }}" data-weekly-claim="chest" @disabled(! $progress['chest']['ready'])>Mở rương</button>
        @endif
    </div>
</section>
