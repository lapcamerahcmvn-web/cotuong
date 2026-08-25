@php $u = auth()->user(); @endphp
<section id="binh-luan" class="comments">
    <h2 class="comments-title">Bình luận @if($commentCount)<span class="muted">({{ $commentCount }})</span>@endif</h2>

    @if(session('comment_ok'))
        <div class="notice" style="border-left:3px solid var(--jade);margin-bottom:16px;">{{ session('comment_ok') }}</div>
    @endif

    @auth
        <form method="POST" action="{{ route('comment.store', $lesson->slug) }}" class="comment-form">
            @csrf
            <div class="comment-ava">
                @if($u->avatar)<img src="{{ $u->avatar }}" alt="" referrerpolicy="no-referrer">@else<span>{{ mb_strtoupper(mb_substr($u->name, 0, 1)) }}</span>@endif
            </div>
            <div style="flex:1;min-width:0;">
                <textarea name="body" rows="2" required maxlength="2000" class="comment-input" placeholder="Chia sẻ ý kiến của bạn…">{{ old('body') }}</textarea>
                @error('body')<p style="color:var(--red);font-size:13px;margin:4px 0 0;">{{ $message }}</p>@enderror
                <div style="text-align:right;margin-top:8px;"><button class="btn primary" type="submit">Gửi bình luận</button></div>
            </div>
        </form>
    @else
        <div class="notice" style="margin-bottom:24px;">
            <a href="{{ route('login') }}" style="font-weight:700;color:var(--red);">Đăng nhập</a> để bình luận, thích và trả lời.
        </div>
    @endauth

    <div class="comment-list">
        @forelse($comments as $c)
            <div class="comment-thread">
                @include('lessons._comment-item', ['c' => $c, 'isReply' => false])
                @if($c->replies->isNotEmpty())
                    <div class="comment-replies">
                        @foreach($c->replies as $r)
                            @include('lessons._comment-item', ['c' => $r, 'isReply' => true])
                        @endforeach
                    </div>
                @endif
                @auth
                    <form method="POST" action="{{ route('comment.store', $lesson->slug) }}" class="reply-form" id="reply-{{ $c->id }}" style="display:none;">
                        @csrf<input type="hidden" name="parent_id" value="{{ $c->id }}">
                        <textarea name="body" rows="2" required maxlength="2000" class="comment-input" placeholder="Trả lời {{ $c->user->name ?? '' }}…"></textarea>
                        <div style="text-align:right;margin-top:6px;display:flex;gap:8px;justify-content:flex-end;">
                            <button class="btn" type="button" onclick="this.closest('form').style.display='none'">Hủy</button>
                            <button class="btn primary" type="submit">Trả lời</button>
                        </div>
                    </form>
                @endauth
            </div>
        @empty
            <p class="muted" style="padding:8px 0;">Chưa có bình luận. Hãy là người đầu tiên chia sẻ ý kiến!</p>
        @endforelse
    </div>
</section>

@push('scripts')
<script>
window.xqReply = function (id) {
    var f = document.getElementById('reply-' + id);
    if (!f) return;
    f.style.display = f.style.display === 'none' ? 'block' : 'none';
    if (f.style.display === 'block') { var t = f.querySelector('textarea'); if (t) t.focus(); }
};
window.xqLike = function (btn) {
    if (btn.dataset.busy) return; btn.dataset.busy = '1';
    fetch(btn.getAttribute('data-like'), {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name=csrf-token]').content, 'Accept': 'application/json' }
    }).then(function (r) { return r.json(); }).then(function (d) {
        btn.classList.toggle('is-liked', d.liked);
        var c = btn.querySelector('.cm-count'); if (c) c.textContent = d.count ? d.count : '';
    }).catch(function () {}).finally(function () { delete btn.dataset.busy; });
};
</script>
@endpush
