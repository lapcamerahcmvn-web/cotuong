<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// 1 nước sai của người chơi trong ván của họ → thế cờ luyện lại (xem MistakeService).
class GameMistake extends Model
{
    protected $fillable = [
        'user_id', 'game_record_id', 'ply', 'fen', 'side', 'played', 'best', 'alts', 'loss', 'class',
        'box', 'due_on', 'tries', 'solved', 'mastered_at',
    ];

    protected $casts = ['alts' => 'array', 'mastered_at' => 'datetime'];

    public function record(): BelongsTo
    {
        return $this->belongsTo(GameRecord::class, 'game_record_id');
    }
}
