<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LessonStep extends Model
{
    protected $fillable = [
        'lesson_id', 'step_order', 'fen', 'move_notation_wxf', 'move_notation_iccs',
        'move_side', 'moved_piece', 'captured_piece', 'caption',
        'is_flip_reveal', 'highlight_squares', 'raw_source_move',
    ];

    protected $casts = [
        'is_flip_reveal'    => 'boolean',
        'highlight_squares' => 'array',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
