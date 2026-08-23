<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class LessonSeries extends Model
{
    use HasSlug;

    protected $table = 'lesson_series';

    protected $fillable = [
        'name', 'slug', 'game_mode', 'phase', 'description',
        'planned_total', 'sort_order', 'source_folder_ref',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->slugsShouldBeNoLongerThan(191)
            ->doNotGenerateSlugsOnUpdate();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class, 'series_id')->orderBy('order_in_series');
    }

    public function publishedLessons(): HasMany
    {
        return $this->lessons()->where('status', 'published');
    }
}
