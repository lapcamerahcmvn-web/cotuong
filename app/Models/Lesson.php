<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Lesson extends Model
{
    use HasSlug;

    protected $fillable = [
        'series_id', 'order_in_series', 'game_mode', 'phase', 'title', 'slug',
        'level', 'source_type', 'source_xqf_path', 'source_pgn_path',
        'initial_fen', 'variation_tree', 'puzzle_side', 'move_count', 'summary', 'content', 'status',
        'decode_confidence', 'decode_warnings', 'thumbnail',
        'seo_title', 'seo_description', 'is_featured', 'view_count', 'published_at',
        'submitted_by_user_id',
    ];

    protected $casts = [
        'decode_warnings' => 'array',
        'variation_tree' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    public const PHASES = [
        'nhap-mon' => 'Nhập môn',
        'khai-cuoc' => 'Khai cuộc',
        'trung-cuoc' => 'Trung cuộc',
        'tan-cuoc' => 'Tàn cuộc',
    ];

    public const LEVELS = [
        'co-ban' => 'Cơ bản',
        'trung-cap' => 'Trung cấp',
        'nang-cao' => 'Nâng cao',
    ];

    public const GAME_MODES = [
        'co-tuong' => 'Cờ Tướng',
        'co-up' => 'Cờ Úp',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->slugsShouldBeNoLongerThan(191)
            // Không regenerate slug khi update — tránh vỡ canonical/URL khi increment view_count.
            ->doNotGenerateSlugsOnUpdate();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function series(): BelongsTo
    {
        return $this->belongsTo(LessonSeries::class, 'series_id');
    }

    public function steps(): HasMany
    {
        return $this->hasMany(LessonStep::class)->orderBy('step_order');
    }

    // Người dùng đã "Gửi cho Admin duyệt" từ Thư viện — null nghĩa là Admin tự soạn (như trước giờ).
    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by_user_id');
    }

    public function scopePublished(Builder $q): Builder
    {
        return $q->where('status', 'published')->whereNotNull('published_at');
    }

    public function scopeFeatured(Builder $q): Builder
    {
        return $q->where('is_featured', true)->where('status', 'published');
    }

    public function scopeMode(Builder $q, string $mode): Builder
    {
        return $q->where('game_mode', $mode);
    }

    public function getPhaseLabelAttribute(): string
    {
        return self::PHASES[$this->phase] ?? 'Bài học';
    }

    public function getLevelLabelAttribute(): string
    {
        return self::LEVELS[$this->level] ?? 'Cơ bản';
    }

    public function getGameModeLabelAttribute(): string
    {
        return self::GAME_MODES[$this->game_mode] ?? 'Cờ Tướng';
    }

    // "X nước đi" chỉ khi thật sự có nước — tránh nhãn gây hiểu lầm "0 nước đi" ở bài lý thuyết
    // (chủ yếu bài Cờ úp nhập môn chưa có ván minh hoạ).
    public function getMoveCountLabelAttribute(): string
    {
        return $this->move_count > 0 ? $this->move_count.' nước đi' : 'Bài lý thuyết';
    }

    public function getMoveCountBadgeAttribute(): string
    {
        return $this->move_count > 0 ? $this->move_count.' nước' : 'Lý thuyết';
    }

    // ISO 8601 duration cho schema.org timeRequired — ước lượng theo số nước (đọc + suy nghĩ mỗi nước ~12s),
    // tối thiểu 2 phút cho bài lý thuyết không có nước đi.
    public function getTimeRequiredIsoAttribute(): string
    {
        $minutes = $this->move_count > 0 ? max(2, (int) ceil($this->move_count * 12 / 60)) : 3;

        return 'PT'.$minutes.'M';
    }

    public function getSeoTitleFormattedAttribute(): string
    {
        return $this->seo_title ?: ($this->title.' — Học Cờ Tướng');
    }

    // Nguồn sự thật index/noindex: chỉ bài published mới cho index.
    public function isIndexable(): bool
    {
        return $this->status === 'published' && $this->published_at !== null;
    }
}
