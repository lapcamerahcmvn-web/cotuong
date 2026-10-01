@php $u = auth()->user(); @endphp
<section id="binh-luan" class="comments">
    <h2 class="comments-title">Bình luận @if($commentCount)<span class="muted">({{ $commentCount }})</span>@endif</h2>

    @if(session('comment_ok'))
        <div class="alert alert--ok mb-4"><x-icon name="check-circle" />{{ session('comment_ok') }}</div>
    @endif

    @auth
        <form method="POST" action="{{ route('comment.store', $lesson->slug) }}" class="comment-form">
            @csrf
            <div class="comment-ava">
                @if($u->avatar)<img src="{{ $u->avatar }}" alt="" referrerpolicy="no-referrer">@else<span>{{ mb_strtoupper(mb_substr($u->name, 0, 1)) }}</span>@endif
            </div>
            <div class="comment-form__main">
                <textarea name="body" rows="2" required maxlength="2000" class="comment-input" placeholder="Chia sẻ ý kiến của bạn…">{{ old('body') }}</textarea>
                @error('body')<p class="field-error mt-1">{{ $message }}</p>@enderror
                <div class="comment-form__actions"><button class="btn btn--primary" type="submit">Gửi bình luận</button></div>
            </div>
        </form>
    @else
        <div class="notice mb-6">
            <a href="{{ route('login') }}" class="font-bold">Đăng nhập</a> để bình luận, thích và trả lời.
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
                    <form method="POST" action="{{ route('comment.store', $lesson->slug) }}" class="reply-form" id="reply-{{ $c->id }}" hidden>
                        @csrf<input type="hidden" name="parent_id" value="{{ $c->id }}">
                        <textarea name="body" rows="2" required maxlength="2000" class="comment-input" placeholder="Trả lời {{ $c->user->name ?? '' }}…"></textarea>
                        <div class="comment-form__actions">
                            <button class="btn btn--ghost btn--sm" type="button" onclick="this.closest('form').hidden=true">Hủy</button>
                            <button class="btn btn--primary btn--sm" type="submit">Trả lời</button>
                        </div>
                    </form>
                @endauth
            </div>
        @empty
            <p class="muted py-2">Chưa có bình luận. Hãy là người đầu tiên chia sẻ ý kiến!</p>
        @endforelse
    </div>
</section>

@push('scripts')
<script>
window.xqReply = function (id) {
    var f = document.getElementById('reply-' + id);
    if (!f) return;
    f.hidden = !f.hidden;
    if (!f.hidden) { var t = f.querySelector('textarea'); if (t) t.focus(); }
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
