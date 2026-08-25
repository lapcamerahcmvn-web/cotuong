@php $liked = in_array($c->id, $likedCommentIds ?? []); @endphp
<div class="comment-item{{ $isReply ? ' is-reply' : '' }}" id="c{{ $c->id }}">
    <div class="comment-ava">
        @if($c->user && $c->user->avatar)
            <img src="{{ $c->user->avatar }}" alt="" referrerpolicy="no-referrer">
        @else
            <span>{{ mb_strtoupper(mb_substr($c->user->name ?? '?', 0, 1)) }}</span>
        @endif
    </div>
    <div class="comment-main">
        <div class="comment-head">
            <span class="comment-name">{{ $c->user->name ?? 'Ẩn danh' }}</span>
            <span class="comment-time">{{ $c->created_at->locale('vi')->diffForHumans() }}</span>
        </div>
        <div class="comment-text">{{ $c->body }}</div>
        <div class="comment-actions">
            @auth
                <button type="button" class="cm-btn cm-like{{ $liked ? ' is-liked' : '' }}"
                        data-like="{{ route('comment.like', $c->id) }}" onclick="xqLike(this)">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11M2 13v6a2 2 0 0 0 2 2h13.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 20 10h-6l1-4a2 2 0 0 0-2-2.5L7 10"/></svg>
                    <span>Thích</span>
                    <span class="cm-count">{{ $c->likes_count ?: '' }}</span>
                </button>
            @else
                <a href="{{ route('login') }}" class="cm-btn cm-like">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11M2 13v6a2 2 0 0 0 2 2h13.5a2 2 0 0 0 2-1.6l1.4-7A2 2 0 0 0 20 10h-6l1-4a2 2 0 0 0-2-2.5L7 10"/></svg>
                    <span>Thích</span>
                    <span class="cm-count">{{ $c->likes_count ?: '' }}</span>
                </a>
            @endauth
            @if(! $isReply)
                @auth
                    <button type="button" class="cm-btn cm-reply" onclick="xqReply({{ $c->id }})">Trả lời</button>
                @else
                    <a href="{{ route('login') }}" class="cm-btn cm-reply">Trả lời</a>
                @endauth
            @endif
        </div>
    </div>
</div>
