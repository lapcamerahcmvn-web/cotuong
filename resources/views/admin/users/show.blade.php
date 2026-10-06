@extends('admin.layout')
@section('title', 'Người dùng: ' . $user->name)
@section('heading', 'Người dùng: ' . $user->name)

@section('top-actions')
    <a href="{{ route('admin.users.index') }}" class="btn">← Danh sách</a>
@endsection

@section('content')
@php
    $methods = \App\Models\LoginEvent::METHODS;
    $res = ['win' => 'Thắng', 'loss' => 'Thua', 'draw' => 'Hoà'];
    $modes = ['daily' => 'Thế hôm nay', 'rush' => '60 giây', 'survival' => '3 mạng', 'topic' => 'Chủ đề', 'review' => 'Ôn lỗi', 'lesson' => 'Trong bài học', 'placement' => 'Kiểm tra trình độ'];
    $ua = function ($s) {
        $s = (string) $s;
        $os = str_contains($s, 'Android') ? 'Android' : (str_contains($s, 'iPhone') || str_contains($s, 'iPad') ? 'iOS' : (str_contains($s, 'Windows') ? 'Windows' : (str_contains($s, 'Mac OS') ? 'macOS' : (str_contains($s, 'Linux') ? 'Linux' : '?'))));
        $br = str_contains($s, 'Edg/') ? 'Edge' : (str_contains($s, 'CriOS') || str_contains($s, 'Chrome') ? 'Chrome' : (str_contains($s, 'Firefox') ? 'Firefox' : (str_contains($s, 'Safari') ? 'Safari' : '?')));
        return $br . ' · ' . $os;
    };
@endphp

<nav class="tabs-nav">
    <a href="#tong-quan">Tổng quan</a><a href="#dang-nhap">Đăng nhập ({{ $logins->count() }})</a><a href="#hoc-tap">Học tập</a>
    <a href="#luyen-tap">Luyện tập</a><a href="#van-dau">Ván đấu</a><a href="#binh-luan">Bình luận ({{ $counts['comments'] }})</a>
    <a href="#truy-cap">Truy cập</a>@if(auth()->user()->isAdmin())<a href="#thao-tac">Thao tác</a>@endif
</nav>

<div class="panel card" id="tong-quan">
    <h3>Tổng quan @if($user->banned_at)<span class="badge low">Bị khoá từ {{ $user->banned_at->format('d/m/Y') }}{{ $user->ban_reason ? ' — ' . $user->ban_reason : '' }}</span>@endif</h3>
    <div class="mini-stats">
        <div><b>{{ $user->level }}</b><span>Cấp · {{ $levelTitle }}</span></div>
        <div><b>{{ number_format($user->xp_total) }}</b><span>XP</span></div>
        <div><b>{{ $user->streak_current }}</b><span>Chuỗi ngày (kỷ lục {{ $user->streak_best }})</span></div>
        <div><b>{{ $progress->where('status', 'completed')->count() }}</b><span>Bài hoàn thành</span></div>
        <div><b>{{ $user->puzzle_rating }}</b><span>Rating thế cờ</span></div>
        <div><b>{{ $user->rush_best }} · {{ $user->survival_best }}</b><span>Kỷ lục 60s · 3 mạng</span></div>
        <div><b>{{ $counts['achievements'] }}</b><span>Huy hiệu</span></div>
        <div><b>{{ $counts['followers'] }} · {{ $counts['following'] }}</b><span>Người theo dõi · đang theo dõi</span></div>
    </div>
    <div class="kv">
        <div><span class="muted">Email:</span> {{ $user->email }}</div>
        <div><span class="muted">Vai trò:</span> {{ $roles[$user->role] ?? $user->role }}</div>
        <div><span class="muted">Đăng nhập Google:</span> {{ $user->google_id ? 'Có' : 'Không' }}</div>
        <div><span class="muted">Đăng ký:</span> {{ $user->created_at?->format('d/m/Y H:i') }}</div>
        <div><span class="muted">Đăng nhập gần nhất:</span> {{ optional($user->last_login_at)->format('d/m/Y H:i') ?: '—' }}</div>
        <div><span class="muted">Mục tiêu ngày:</span> {{ $user->daily_goal_xp }} XP</div>
        <div><span class="muted">Ẩn khỏi xếp hạng:</span> {{ $user->leaderboard_opt_out ? 'Có' : 'Không' }}</div>
        <div><span class="muted">Thư viện thế cờ:</span> {{ $counts['saved'] }}</div>
    </div>
    <div style="margin-top:14px;">
        <div class="muted" style="font-size:13px;margin-bottom:6px;">Hoạt động 28 ngày (XP mỗi ngày)</div>
        <div class="heat">
            @for($i = 27; $i >= 0; $i--)
                @php $d = now()->subDays($i)->toDateString(); $x = (int) ($activity[$d]->xp ?? 0); @endphp
                <span class="{{ $x >= 100 ? 'l3' : ($x >= 40 ? 'l2' : ($x > 0 ? 'l1' : '')) }}" title="{{ \Illuminate\Support\Carbon::parse($d)->format('d/m') }}: {{ $x }} XP"></span>
            @endfor
        </div>
    </div>
</div>

<div class="panel card" id="dang-nhap">
    <h3>Lịch sử đăng nhập (50 gần nhất)</h3>
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Thời gian</th><th>Cách</th><th>Kết quả</th><th>IP</th><th>Thiết bị</th></tr></thead>
            <tbody>
            @forelse($logins as $l)
                <tr>
                    <td style="white-space:nowrap;font-size:13px;">{{ $l->created_at?->format('d/m/Y H:i') }}</td>
                    <td>{{ $methods[$l->method] ?? $l->method }}</td>
                    <td><span class="badge {{ $l->success ? 'published' : 'low' }}">{{ $l->success ? 'Thành công' : 'Thất bại' }}</span></td>
                    <td style="font-size:13px;">{{ $l->ip }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);" title="{{ $l->user_agent }}">{{ $ua($l->user_agent) }}</td>
                </tr>
            @empty
                <tr><td colspan="5" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa có (lịch sử đăng nhập ghi từ 10/2026).</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>

<div class="panel card" id="hoc-tap">
    <h3>Học tập — {{ $progress->where('status', 'completed')->count() }} bài hoàn thành / {{ $progress->count() }} bài đã mở</h3>
    <div class="split-2">
        <div class="tbl-wrap">
            <table class="admin-table">
                <thead><tr><th>Bài học</th><th>Trạng thái</th><th>Đọc</th><th>Cập nhật</th></tr></thead>
                <tbody>
                @forelse($progress->take(40) as $p)
                    <tr>
                        <td class="t-title">@if($p->lesson)<a href="{{ route('lessons.show', $p->lesson->slug) }}" target="_blank">{{ \Illuminate\Support\Str::limit($p->lesson->title, 60) }}</a>@else — @endif</td>
                        <td><span class="badge {{ $p->status === 'completed' ? 'published' : 'draft' }}">{{ $p->status === 'completed' ? 'Đã học' : 'Đang đọc' }}</span></td>
                        <td style="font-size:13px;">{{ floor($p->read_seconds / 60) }}p</td>
                        <td style="font-size:13px;color:var(--ink-soft);white-space:nowrap;">{{ $p->updated_at?->format('d/m/Y') }}</td>
                    </tr>
                @empty
                    <tr><td colspan="4" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa học bài nào.</td></tr>
                @endforelse
                </tbody>
            </table>
        </div>
        <div class="tbl-wrap">
            <table class="admin-table">
                <thead><tr><th>XP gần đây</th><th>Lý do</th><th>Ngày</th></tr></thead>
                <tbody>
                @forelse($xp as $t)
                    <tr><td>+{{ $t->amount }}</td><td style="font-size:13px;">{{ $t->reason }}</td><td style="font-size:13px;color:var(--ink-soft);">{{ $t->created_at?->format('d/m H:i') }}</td></tr>
                @empty
                    <tr><td colspan="3" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa có XP.</td></tr>
                @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="panel card" id="luyen-tap">
    <h3>Luyện tập thế cờ</h3>
    @if($puzzle->isEmpty())
        <p class="muted">Chưa giải thế cờ nào.</p>
    @else
        <div class="mini-stats">
            @foreach($puzzle as $mode => $r)
                @php $tot = $r->sum(); $ok = (int) ($r['solved'] ?? 0); @endphp
                <div><b>{{ $ok }}/{{ $tot }}</b><span>{{ $modes[$mode] ?? $mode }} · {{ $tot ? round(100 * $ok / $tot) : 0 }}% đúng</span></div>
            @endforeach
        </div>
    @endif
</div>

<div class="panel card" id="van-dau">
    <h3>Ván đấu</h3>
    <div class="mini-stats">
        @foreach(['bot' => 'Với máy', 'pvp' => 'Đấu bạn'] as $m => $label)
            @php $r = $gameStats[$m] ?? collect(); @endphp
            <div><b>{{ (int) ($r['win'] ?? 0) }}–{{ (int) ($r['loss'] ?? 0) }}–{{ (int) ($r['draw'] ?? 0) }}</b><span>{{ $label }} (thắng–thua–hoà)</span></div>
        @endforeach
    </div>
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Ngày</th><th>Loại</th><th>Đối thủ</th><th>Cầm</th><th>Kết quả</th><th>Lý do</th><th>Nước</th></tr></thead>
            <tbody>
            @forelse($games as $g)
                <tr>
                    <td style="white-space:nowrap;font-size:13px;">{{ $g->created_at?->format('d/m/Y H:i') }}</td>
                    <td>{{ $g->variant === 'co-up' ? 'Cờ úp' : 'Cờ tướng' }} · {{ $g->mode === 'bot' ? 'máy' : 'bạn' }}</td>
                    <td style="font-size:13px;">{{ $g->opponent }}</td>
                    <td>{{ $g->side === 'do' ? 'Đỏ' : 'Đen' }}</td>
                    <td><span class="badge {{ $g->result === 'win' ? 'published' : ($g->result === 'loss' ? 'low' : 'draft') }}">{{ $res[$g->result] ?? $g->result }}</span></td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ $g->reason }}</td>
                    <td>{{ ceil($g->plies / 2) }}</td>
                </tr>
            @empty
                <tr><td colspan="7" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa có ván nào.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>

<div class="panel card" id="binh-luan">
    <h3>Bình luận gần đây</h3>
    @forelse($comments as $c)
        <div style="padding:8px 0;border-bottom:1px solid var(--line);font-size:14px;">
            <span class="muted" style="font-size:12.5px;">{{ $c->created_at?->format('d/m/Y H:i') }} · @if($c->lesson)<a href="{{ route('lessons.show', $c->lesson->slug) }}" target="_blank">{{ \Illuminate\Support\Str::limit($c->lesson->title, 50) }}</a>@endif
                @unless($c->approved)<span class="badge needs_fix">Chờ duyệt</span>@endunless</span>
            <div>{{ \Illuminate\Support\Str::limit($c->body ?? $c->content ?? '', 300) }}</div>
        </div>
    @empty
        <p class="muted">Chưa bình luận.</p>
    @endforelse
</div>

<div class="panel card" id="truy-cap">
    <h3>Lịch sử truy cập (80 gần nhất · giữ 180 ngày)</h3>
    <div class="tbl-wrap">
        <table class="admin-table">
            <thead><tr><th>Thời gian</th><th>Đường dẫn</th><th>IP</th><th>Thiết bị</th></tr></thead>
            <tbody>
            @forelse($logs as $log)
                <tr>
                    <td style="white-space:nowrap;font-size:13px;">{{ $log->created_at?->format('d/m H:i:s') }}</td>
                    <td style="font-size:13px;">/{{ $log->url }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ $log->ip }}</td>
                    <td style="font-size:13px;color:var(--ink-soft);">{{ $ua($log->user_agent) }}</td>
                </tr>
            @empty
                <tr><td colspan="4" style="text-align:center;color:var(--ink-faint);padding:20px;">Chưa có lịch sử.</td></tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>

@if(auth()->user()->isAdmin())
<div class="panel card danger-zone" id="thao-tac">
    <h3>Thao tác</h3>
    <form method="POST" action="{{ route('admin.users.role', $user) }}" class="form-row" style="margin-bottom:14px;">
        @csrf @method('PUT')
        <label class="muted" style="font-size:14px;">Vai trò</label>
        <select class="input" name="role" style="max-width:180px;">
            @foreach($roles as $k => $v)<option value="{{ $k }}" @selected($user->role === $k)>{{ $v }}</option>@endforeach
        </select>
        <button class="btn primary">Lưu vai trò</button>
    </form>
    @unless($user->isAdmin())
        @if($user->banned_at)
            <form method="POST" action="{{ route('admin.users.unban', $user) }}" class="form-row" style="margin-bottom:14px;">
                @csrf <button class="btn">Mở khoá tài khoản</button>
            </form>
        @else
            <form method="POST" action="{{ route('admin.users.ban', $user) }}" class="form-row" style="margin-bottom:14px;" onsubmit="return confirm('Khoá tài khoản này? Người dùng sẽ bị đăng xuất và không đăng nhập được.')">
                @csrf
                <input class="input" name="reason" maxlength="255" placeholder="Lý do khoá (tuỳ chọn)" style="max-width:320px;">
                <button class="btn danger">Khoá tài khoản</button>
            </form>
        @endif
        <form method="POST" action="{{ route('admin.users.destroy', $user) }}" class="form-row" onsubmit="return confirm('XOÁ VĨNH VIỄN tài khoản và toàn bộ dữ liệu (tiến độ, ván đấu, bình luận…)? Không hoàn tác được.')">
            @csrf @method('DELETE')
            <input class="input" name="confirm_email" placeholder="Gõ email {{ $user->email }} để xác nhận" style="max-width:360px;" required>
            <button class="btn danger">Xoá vĩnh viễn</button>
            <span class="muted" style="font-size:12.5px;">Dùng khi người dùng yêu cầu xoá dữ liệu (Chính sách bảo mật).</span>
        </form>
    @endunless
</div>
@endif
@endsection
