<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PuzzleAttempt extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = [
        'user_id', 'puzzle_id', 'mode', 'session_id', 'result', 'wrong_ply', 'user_move',
        'expected_move', 'ms', 'rating_before', 'rating_after',
    ];

    public function puzzle(): BelongsTo
    {
        return $this->belongsTo(Puzzle::class);
    }
}
