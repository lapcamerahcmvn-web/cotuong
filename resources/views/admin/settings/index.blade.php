@extends('admin.layout')
@section('title', 'Cài đặt web & SEO')
@section('heading', 'Cài đặt web & SEO')

@section('content')
@php $v = fn ($k) => old($k, $saved[$k] ?? ''); @endphp
<form method="POST" action="{{ route('admin.settings.update') }}">
    @csrf
    <div class="panel card">
        <h3>Thông tin website</h3>
        <p class="muted" style="font-size:13px;margin-top:-6px;">Để trống = dùng giá trị mặc định (file .env / config/site.php). Lưu xong có hiệu lực ngay.</p>
        <div class="split-2">
            <div class="field"><label class="label">Tên website (og:site_name, JSON-LD)</label><input class="input" name="name" maxlength="60" value="{{ $v('name') }}" placeholder="{{ $defaults['name'] }}"></div>
            <div class="field"><label class="label">Email liên hệ (Điều khoản, Chính sách bảo mật)</label><input class="input" type="email" name="contact_email" value="{{ $v('contact_email') }}" placeholder="{{ $defaults['contact_email'] }}"></div>
        </div>
        <div class="field"><label class="label">Mô tả website (JSON-LD Organization, mô tả mặc định)</label><textarea class="input" name="description" rows="2" maxlength="300">{{ $v('description') }}</textarea></div>
    </div>

    <div class="panel card">
        <h3>SEO trang chủ</h3>
        <div class="field"><label class="label">Tiêu đề trang chủ (≤ 60–70 ký tự) <span class="muted" data-count="home_title"></span></label><input class="input" name="home_title" maxlength="70" value="{{ $v('home_title') }}" placeholder="Học Cờ Tướng — Bàn Cờ Tương Tác, Diễn Giải Từng Nước"></div>
        <div class="field"><label class="label">Mô tả trang chủ (150–160 ký tự) <span class="muted" data-count="home_description"></span></label><textarea class="input" name="home_description" rows="2" maxlength="170" placeholder="Học cờ tướng bài bản từ khai cuộc đến tàn cuộc và cờ úp…">{{ $v('home_description') }}</textarea></div>
        <div style="border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--surface);max-width:640px;">
            <div class="muted" style="font-size:12px;">Xem trước trên Google</div>
            <div style="color:#1a0dab;font-size:18px;line-height:1.3;" data-prev="home_title">{{ $v('home_title') ?: 'Học Cờ Tướng — Bàn Cờ Tương Tác, Diễn Giải Từng Nước' }}</div>
            <div style="color:#006621;font-size:13px;">{{ url('/') }}</div>
            <div style="font-size:13.5px;color:var(--ink-soft);" data-prev="home_description">{{ $v('home_description') ?: 'Học cờ tướng bài bản từ khai cuộc đến tàn cuộc và cờ úp. Bàn cờ tương tác đi từng nước có diễn giải, dễ hiểu cho người mới lẫn kỳ thủ.' }}</div>
        </div>
    </div>

    <div class="panel card">
        <h3>Google Analytics &amp; Search Console</h3>
        <div class="split-2">
            <div class="field"><label class="label">Mã đo lường GA4 (G-XXXXXXXXXX)</label><input class="input" name="ga4_id" value="{{ $v('ga4_id') }}" placeholder="{{ $defaults['ga4_id'] ?: 'Chưa gắn' }}"><small class="muted">Có mã thì tự chèn gtag.js trên mọi trang + các sự kiện học/chơi.</small></div>
            <div class="field"><label class="label">Xác minh Search Console (phần content của thẻ meta)</label><input class="input" name="gsc_verification" value="{{ $v('gsc_verification') }}" placeholder="{{ $defaults['gsc_verification'] ?: 'Chưa gắn' }}"><small class="muted">GSC → Cài đặt → Quyền sở hữu → Thẻ HTML → chép phần content="…".</small></div>
        </div>
        <p class="muted" style="font-size:13px;">Sitemap: <a href="{{ route('sitemap') }}" target="_blank">{{ route('sitemap') }}</a> · Robots: <a href="{{ route('robots') }}" target="_blank">{{ route('robots') }}</a> · Cho AI: <a href="{{ url('/llms.txt') }}" target="_blank">{{ url('/llms.txt') }}</a></p>
    </div>

    <div class="panel card">
        <h3>Mạng xã hội (JSON-LD sameAs, thẻ chia sẻ)</h3>
        <div class="split-2">
            <div class="field"><label class="label">Facebook</label><input class="input" name="social_facebook" value="{{ $v('social_facebook') }}" placeholder="https://facebook.com/..."></div>
            <div class="field"><label class="label">YouTube</label><input class="input" name="social_youtube" value="{{ $v('social_youtube') }}" placeholder="https://youtube.com/@..."></div>
            <div class="field"><label class="label">TikTok</label><input class="input" name="social_tiktok" value="{{ $v('social_tiktok') }}" placeholder="https://tiktok.com/@..."></div>
            <div class="field"><label class="label">Zalo OA</label><input class="input" name="social_zalo" value="{{ $v('social_zalo') }}" placeholder="https://zalo.me/..."></div>
            <div class="field"><label class="label">Twitter / X</label><input class="input" name="twitter" value="{{ $v('twitter') }}" placeholder="@hoccotuong"></div>
        </div>
    </div>
    <div style="margin-bottom:24px;"><button class="btn primary">Lưu cài đặt</button></div>
</form>

<div class="panel card" id="chuyen-huong">
    <h3>Chuyển hướng 301 ({{ $redirects->total() }})</h3>
    <p class="muted" style="font-size:13px;margin-top:-6px;">Khi đường dẫn cũ bị 404, web tự chuyển 301 sang đích (giữ thứ hạng SEO khi đổi slug). Đổi slug bài học trong Admin đã tự thêm.</p>
    <form method="POST" action="{{ route('admin.settings.redirects.store') }}" class="form-row" style="margin-bottom:12px;">
        @csrf
        <input class="input" name="from_path" placeholder="/duong-dan-cu" style="max-width:300px;" required>
        <span>→</span>
        <input class="input" name="to_path" placeholder="/duong-dan-moi" style="max-width:300px;" required>
        <button class="btn primary">Thêm</button>
    </form>
    <form method="GET" class="form-row" style="margin-bottom:12px;">
        <input class="input" type="search" name="q" value="{{ request('q') }}" placeholder="Tìm đường dẫn…" style="max-width:300px;">
        <button class="btn">Tìm</button>
    </form>
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Đường dẫn cũ</th><th>Đích</th><th>Cập nhật</th><th></th></tr></thead>
            <tbody>
            @forelse($redirects as $r)
                <tr>
                    <td style="font-size:13px;">{{ $r->from_path }}</td>
                    <td style="font-size:13px;"><a href="{{ $r->to_path }}" target="_blank">{{ $r->to_path }}</a></td>
                    <td style="font-size:13px;color:var(--ink-soft);white-space:nowrap;">{{ $r->updated_at?->format('d/m/Y') }}</td>
                    <td><form method="POST" action="{{ route('admin.settings.redirects.destroy', $r) }}" onsubmit="return confirm('Xoá chuyển hướng này?')">@csrf @method('DELETE')<button class="btn danger" style="min-height:30px;padding:0 10px;">Xoá</button></form></td>
                </tr>
            @empty
                <tr><td colspan="4" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa có chuyển hướng.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
    <div style="margin-top:12px;">{{ $redirects->links() }}</div>
</div>
@endsection

@push('scripts')
<script>
document.querySelectorAll('[name="home_title"],[name="home_description"]').forEach(function (el) {
    var c = document.querySelector('[data-count="' + el.name + '"]'), p = document.querySelector('[data-prev="' + el.name + '"]');
    function up() { if (c) c.textContent = '(' + el.value.length + ' ký tự)'; if (p && el.value) p.textContent = el.value; }
    el.addEventListener('input', up); up();
});
</script>
@endpush
