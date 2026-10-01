<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Hàng đợi "Luyện lỗi sai" (Leitner): box 0..4, due_at = ngày cần ôn lại.
class UserPuzzleReview extends Model
{
    public const INTERVALS = [1, 3, 7, 14, 30];

    protected $fillable = ['user_id', 'puzzle_id', 'box', 'due_at', 'lapses', 'last_result'];


    public function puzzle(): BelongsTo
    {
        return $this->belongsTo(Puzzle::class);
    }
}
