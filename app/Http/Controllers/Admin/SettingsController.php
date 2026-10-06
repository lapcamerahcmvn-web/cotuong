<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\UrlRedirect;
use Illuminate\Http\Request;

// Cài đặt web & SEO (admin): thông tin site, SEO trang chủ, GA4 / Search Console, mạng xã hội, chuyển hướng 301.
// Giá trị lưu bảng site_settings, ghi đè .env khi khởi động (AppServiceProvider). Để trống = dùng mặc định.
class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $saved = SiteSetting::query()->pluck('value', 'key')->all();
        $kw = trim((string) $request->get('q'));
        $redirects = UrlRedirect::query()
            ->when($kw, fn ($q) => $q->where(fn ($w) => $w->where('from_path', 'like', "%{$kw}%")->orWhere('to_path', 'like', "%{$kw}%")))
            ->latest('updated_at')->paginate(30)->withQueryString();

        return view('admin.settings.index', [
            'saved' => $saved,
            'defaults' => [
                'name' => env('SITE_NAME') ?: 'Học Cờ Tướng',
                'contact_email' => env('SITE_CONTACT_EMAIL', 'lapcamerahcm.vn@gmail.com'),
                'ga4_id' => env('SITE_GA4_ID'),
                'gsc_verification' => env('SITE_GSC_VERIFICATION'),
            ],
            'redirects' => $redirects,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:60'],
            'description' => ['nullable', 'string', 'max:300'],
            'contact_email' => ['nullable', 'email', 'max:191'],
            'home_title' => ['nullable', 'string', 'max:70'],
            'home_description' => ['nullable', 'string', 'max:170'],
            'ga4_id' => ['nullable', 'regex:/^G-[A-Z0-9]{4,20}$/'],
            'gsc_verification' => ['nullable', 'string', 'max:120', 'regex:/^[A-Za-z0-9_\-]+$/'],
            'twitter' => ['nullable', 'string', 'max:40', 'regex:/^@?[A-Za-z0-9_]+$/'],
            'social_facebook' => ['nullable', 'url', 'max:255'],
            'social_youtube' => ['nullable', 'url', 'max:255'],
            'social_tiktok' => ['nullable', 'url', 'max:255'],
            'social_zalo' => ['nullable', 'url', 'max:255'],
        ], [
            'ga4_id.regex' => 'Mã GA4 có dạng G-XXXXXXXXXX.',
            'gsc_verification.regex' => 'Chỉ dán phần content của thẻ meta google-site-verification (chữ, số, - _).',
        ]);
        SiteSetting::put(array_map(fn ($v) => $v ?? '', $data));

        return back()->with('ok', 'Đã lưu cài đặt web & SEO (có hiệu lực ngay).');
    }

    public function storeRedirect(Request $request)
    {
        $data = $request->validate([
            'from_path' => ['required', 'string', 'max:255', 'regex:/^\/[^\s]*$/'],
            'to_path' => ['required', 'string', 'max:255', 'regex:/^(\/|https?:\/\/)[^\s]*$/'],
        ], [
            'from_path.regex' => 'Đường dẫn cũ phải bắt đầu bằng / (VD /bai-hoc/ten-cu).',
            'to_path.regex' => 'Đích phải là đường dẫn bắt đầu bằng / hoặc URL đầy đủ.',
        ]);
        if (rtrim($data['from_path'], '/') === rtrim($data['to_path'], '/')) {
            return back()->with('err', 'Đường dẫn cũ và đích trùng nhau.');
        }
        UrlRedirect::record($data['from_path'], $data['to_path']);

        return back()->with('ok', "Đã thêm chuyển hướng 301: {$data['from_path']} → {$data['to_path']}");
    }

    public function destroyRedirect(UrlRedirect $redirect)
    {
        $redirect->delete();

        return back()->with('ok', 'Đã xoá chuyển hướng.');
    }
}
