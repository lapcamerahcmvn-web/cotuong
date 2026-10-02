<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// 1 ván đã chơi xong của 1 người (với máy hoặc đấu bạn) — xem lại, chép vào thư viện để sửa/thêm biến.
class GameRecord extends Model
{
    public const RESULTS = ['win' => 'Thắng', 'loss' => 'Thua', 'draw' => 'Hoà'];

    protected $fillable = [
        'user_id', 'mode', 'variant', 'level', 'game_id', 'side', 'opponent', 'result', 'reason',
        'start_fen', 'moves', 'reveals', 'captured', 'plies',
    ];

    protected $casts = ['moves' => 'array', 'reveals' => 'array', 'captured' => 'array'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isCoup(): bool
    {
        return $this->variant === 'co-up';
    }

    public function title(): string
    {
        return ($this->isCoup() ? 'Cờ úp' : 'Cờ tướng') . ' · ' . ($this->side === 'do' ? 'Đỏ' : 'Đen') . ' vs ' . $this->opponent;
    }
}
