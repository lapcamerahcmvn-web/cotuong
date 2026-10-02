<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// 1 ván đã chơi xong của 1 người (với máy hoặc đấu bạn) — xem lại, phân tích, chia sẻ,
// chép vào thư viện để sửa/thêm biến.
class GameRecord extends Model
{
    public const RESULTS = ['win' => 'Thắng', 'loss' => 'Thua', 'draw' => 'Hoà'];

    protected $fillable = [
        'user_id', 'mode', 'variant', 'level', 'game_id', 'side', 'opponent', 'result', 'reason',
        'start_fen', 'first_side', 'moves', 'reveals', 'captured', 'plies', 'analysis', 'share_token',
    ];

    protected $casts = ['moves' => 'array', 'reveals' => 'array', 'captured' => 'array', 'analysis' => 'array'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isCoup(): bool
    {
        return $this->variant === 'co-up';
    }

    public function redFirst(): bool
    {
        return ($this->first_side ?? 'do') === 'do';
    }

    /** Ván bắt đầu từ thế tuỳ chọn (chơi tiếp từ 1 thế cờ) thay vì thế mở chuẩn. */
    public function customStart(): bool
    {
        return ! in_array($this->start_fen, [Game::START_FEN, Game::COUP_FEN], true) || ! $this->redFirst();
    }

    /** Độ chính xác (%) của bên người chơi, nếu ván đã được phân tích. */
    public function accuracy(): ?int
    {
        $v = $this->analysis['acc'][$this->side] ?? null;

        return is_numeric($v) ? (int) round($v) : null;
    }

    public function title(): string
    {
        return ($this->isCoup() ? 'Cờ úp' : 'Cờ tướng') . ' · ' . ($this->side === 'do' ? 'Đỏ' : 'Đen') . ' vs ' . $this->opponent;
    }
}
