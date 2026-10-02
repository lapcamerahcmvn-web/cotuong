<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// 1 giải bảng xếp hạng XP tuần (hạng 1–10) của 1 người.
class WeeklyAward extends Model
{
    protected $fillable = ['week_start', 'user_id', 'rank', 'score', 'xp', 'seen_at'];

    protected $casts = ['seen_at' => 'datetime'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** Luôn lưu chuỗi Y-m-d (cast 'date' làm sqlite lưu kèm giờ → truy vấn theo ngày lệch). */
    protected function weekStart(): Attribute
    {
        return Attribute::make(
            get: fn ($v) => $v ? CarbonImmutable::parse($v) : null,
            set: fn ($v) => $v instanceof \DateTimeInterface ? $v->format('Y-m-d') : substr((string) $v, 0, 10),
        );
    }

    /** @return array{name:string, medal:string, xp:int, freezes:int} */
    public function prize(): array
    {
        $p = config('weekly.prizes');

        return $p[$this->rank] ?? $p[10];
    }
}
