@foreach($nodes as $i => $n)
    @php
        $num = $prefix . ($i + 1);
        $leaf = empty($n['c']);
        $leaves = $leaf ? 1 : \App\Support\Mindmap::leafCount($n['c']);
        $hasBody = ! empty($n['k']) || ! empty($n['note']) || ! empty($n['l']);
    @endphp
    <li class="mm-node {{ $leaf ? 'mm-leaf' : 'mm-branch' }} mm-d{{ min($depth, 4) }}" @if($leaf) data-mm-key="{{ $n['l'] ?? $num }}" @endif>
        <details @if($depth === 1 && ! $leaf) open @endif>
            <summary>
                <span class="mm-num">{{ $num }}</span>
                <span class="mm-title">{{ $n['t'] }}</span>
                @if($leaf)
                    <span class="mm-tick" aria-hidden="true"><x-icon name="check" /></span>
                @else
                    <span class="mm-meta"><span data-mm-branch-done></span>{{ $leaves }} thế</span>
                @endif
            </summary>
            @if($hasBody)
                <div class="mm-card">
                    @if(! empty($n['fen']))
                        <a class="mm-thumb" href="{{ route('lessons.show', $n['l']) }}" data-mm-fen="{{ $n['fen'] }}" @if(($n['side'] ?? 'do') === 'den') data-flip="1" @endif tabindex="-1" aria-hidden="true"></a>
                    @endif
                    <div class="mm-body">
                        @if(! empty($n['k']))
                            <ol class="mm-verse">
                                @foreach($n['k'] as $k)<li>{{ $k }}</li>@endforeach
                            </ol>
                        @endif
                        @if(! empty($n['note']))<p class="mm-note">{{ $n['note'] }}</p>@endif
                        @if(! empty($n['l']))
                            <div class="mm-actions">
                                <a class="btn btn--sm btn--primary" href="{{ route('lessons.show', $n['l']) }}"><x-icon name="book" /> Xem ví dụ trên bàn cờ</a>
                                @if(! empty($n['fen']))
                                    <a class="btn btn--sm" rel="nofollow" href="{{ route('play.bot', ['tu-the' => $n['fen'], 'luot' => $n['side'] ?? 'do', 'cam' => $play, 'cap' => 4]) }}"
                                       title="{{ $play === 'den' ? 'Bạn cầm Đen giữ hòa, máy cầm Đỏ tấn công' : 'Bạn cầm Đỏ, máy cầm Đen phòng thủ' }}"><x-icon name="shield" /> Tự đánh kiểm chứng</a>
                                @endif
                            </div>
                        @endif
                        @if($leaf)
                            <label class="mm-check"><input type="checkbox" data-mm-done> Tôi đã thuộc khẩu quyết này</label>
                        @endif
                    </div>
                </div>
            @endif
            @unless($leaf)
                <ol>@include('partials.mindmap-nodes', ['nodes' => $n['c'], 'prefix' => $num . '.', 'depth' => $depth + 1, 'play' => $play])</ol>
            @endunless
        </details>
    </li>
@endforeach
