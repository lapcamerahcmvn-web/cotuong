<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

/**
 * Cài đặt web & SEO sửa trong Admin (Admin › Cài đặt web & SEO). Khoá trùng tên config('site.*') → ghi đè giá trị
 * từ .env khi khởi động (AppServiceProvider). Giá trị rỗng = dùng mặc định (.env / config/site.php).
 */
class SiteSetting extends Model
{
    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['key', 'value'];

    /** Các khoá được sửa trong Admin. */
    public const KEYS = [
        'name', 'description', 'contact_email', 'home_title', 'home_description',
        'ga4_id', 'gsc_verification', 'twitter',
        'social_facebook', 'social_youtube', 'social_tiktok', 'social_zalo',
    ];

    public static function allCached(): array
    {
        return Cache::remember('site_settings', 600, function () {
            try {
                if (! Schema::hasTable('site_settings')) return [];
                return static::query()->pluck('value', 'key')->filter(fn ($v) => $v !== null && $v !== '')->all();
            } catch (\Throwable $e) {
                return [];
            }
        });
    }

    /** Ghi đè config('site.*') bằng giá trị đã lưu (gọi khi khởi động — AppServiceProvider). */
    public static function applyToConfig(): void
    {
        $ss = static::allCached();
        foreach (['name', 'description', 'contact_email', 'home_title', 'home_description', 'ga4_id', 'gsc_verification', 'twitter'] as $k) {
            if (isset($ss[$k])) config(['site.' . $k => $ss[$k]]);
        }
        $social = array_values(array_filter([$ss['social_facebook'] ?? null, $ss['social_youtube'] ?? null, $ss['social_tiktok'] ?? null, $ss['social_zalo'] ?? null]));
        if ($social) config(['site.social' => $social]);
    }

    public static function put(array $values): void
    {
        foreach ($values as $k => $v) {
            if (! in_array($k, self::KEYS, true)) continue;
            static::updateOrCreate(['key' => $k], ['value' => is_string($v) ? trim($v) : $v]);
        }
        Cache::forget('site_settings');
    }
}
