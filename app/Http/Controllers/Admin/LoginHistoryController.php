<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LoginEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Lịch sử đăng nhập của MỌI người dùng (Admin › Lịch sử đăng nhập). Từng người: Admin › Người dùng › Xem.
// Nguồn: login_events — form đăng nhập / đăng ký / Google (AuthController) + tự đăng nhập lại bằng "Ghi nhớ" (AppServiceProvider).
class LoginHistoryController extends Controller
{
    public function index(Request $request)
    {
        $q = LoginEvent::query()->with('user:id,name,email,role,avatar')->latest('created_at');
        if ($kw = trim((string) $request->get('q'))) {
            $q->where(fn ($w) => $w->where('email', 'like', "%{$kw}%")->orWhere('ip', 'like', "%{$kw}%")
                ->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%{$kw}%")));
        }
        if (array_key_exists($m = (string) $request->get('method'), LoginEvent::METHODS)) $q->where('method', $m);
        match ($request->get('kq')) {
            'ok' => $q->where('success', true),
            'fail' => $q->where('success', false),
            default => null,
        };
        if ($request->get('vai-tro') === 'staff') $q->whereHas('user', fn ($u) => $u->whereIn('role', ['admin', 'bien_tap']));
        $days = (int) $request->get('ngay', 30);
        if ($days > 0) $q->where('created_at', '>=', now()->subDays($days));

        $since7 = now()->subDays(7);
        $stats = [
            'ok7' => LoginEvent::where('created_at', '>=', $since7)->where('success', true)->count(),
            'fail7' => LoginEvent::where('created_at', '>=', $since7)->where('success', false)->count(),
            'users24' => LoginEvent::where('created_at', '>=', now()->subDay())->where('success', true)->distinct('user_id')->count('user_id'),
            'byMethod' => LoginEvent::where('created_at', '>=', $since7)->where('success', true)
                ->selectRaw('method, count(*) c')->groupBy('method')->pluck('c', 'method'),
            // IP sai mật khẩu nhiều lần (7 ngày) — dấu hiệu dò mật khẩu.
            'suspect' => LoginEvent::where('created_at', '>=', $since7)->where('success', false)
                ->selectRaw('ip, count(*) c, max(created_at) last')->groupBy('ip')->having('c', '>=', 5)->orderByDesc('c')->limit(5)->get(),
        ];

        return view('admin.logins.index', [
            'events' => $q->paginate(50)->withQueryString(),
            'stats' => $stats, 'methods' => LoginEvent::METHODS,
        ]);
    }

    /** Thiết bị đọc gọn từ user agent (đủ để Admin nhận ra điện thoại / máy tính, trình duyệt). */
    public static function device(?string $ua): string
    {
        $ua = (string) $ua;
        $os = match (true) {
            str_contains($ua, 'iPhone') || str_contains($ua, 'iPad') => 'iOS',
            str_contains($ua, 'Android') => 'Android',
            str_contains($ua, 'Windows') => 'Windows',
            str_contains($ua, 'Mac OS') => 'macOS',
            str_contains($ua, 'Linux') => 'Linux',
            default => '',
        };
        $br = match (true) {
            str_contains($ua, 'Zalo') => 'Zalo',
            str_contains($ua, 'FBAN') || str_contains($ua, 'FBAV') => 'Facebook',
            str_contains($ua, 'Edg/') => 'Edge',
            str_contains($ua, 'CocCoc') || str_contains($ua, 'coc_coc') => 'Cốc Cốc',
            str_contains($ua, 'Chrome/') => 'Chrome',
            str_contains($ua, 'Firefox/') => 'Firefox',
            str_contains($ua, 'Safari/') => 'Safari',
            default => '',
        };

        return trim($br . ($br && $os ? ' · ' : '') . $os) ?: '—';
    }
}
