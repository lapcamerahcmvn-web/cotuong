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
        'initial_fen', 'move_count', 'summary', 'content', 'status',
        'decode_confidence', 'decode_warnings', 'thumbnail',
        'seo_title', 'seo_description', 'is_featured', 'view_count', 'published_at',
    ];

    protected $casts = [
        'decode_warnings' => 'array',
        'is_featured'     => 'boolean',
        'published_at'    => 'datetime',
    ];

    public const PHASES = [
        'nhap-mon'   => 'Nhập môn',
        'khai-cuoc'  => 'Khai cuộc',
        'trung-cuoc' => 'Trung cuộc',
        'tan-cuoc'   => 'Tàn cuộc',
    ];

    public const LEVELS = [
        'co-ban'    => 'Cơ bản',
        'trung-cap' => 'Trung cấp',
        'nang-cao'  => 'Nâng cao',
    ];

    public const GAME_MODES = [
        'co-tuong' => 'Cờ Tướng',
        'co-up'    => 'Cờ Úp',
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

    public function getSeoTitleFormattedAttribute(): string
    {
        return $this->seo_title ?: ($this->title . ' — Học Cờ Tướng');
    }

    // Nguồn sự thật index/noindex: chỉ bài published mới cho index.
    public function isIndexable(): bool
    {
        return $this->status === 'published' && $this->published_at !== null;
    }
}
