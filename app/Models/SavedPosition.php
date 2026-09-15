<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedPosition extends Model
{
    protected $fillable = ['user_id', 'source_lesson_id', 'fen', 'title', 'note', 'steps_json', 'variation_tree'];

    protected $casts = [
        'steps_json' => 'array',
        'variation_tree' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sourceLesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class, 'source_lesson_id');
    }
}
