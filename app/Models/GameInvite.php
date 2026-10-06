<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Lời mời đấu bạn bè đang online. Người nhận đồng ý → tự tạo phòng và vào ván ngay.
class GameInvite extends Model
{
    /** Lời mời hết hạn nếu không trả lời trong N giây. */
    public const TTL = 120;

    /** Tối đa N lời mời mỗi WINDOW phút cho 1 người gửi. */
    public const LIMIT = 3;

    public const WINDOW = 10;

    protected $fillable = ['from_user_id', 'to_user_id', 'variant', 'time_control', 'from_side', 'status', 'game_id', 'sender_seen', 'responded_at'];

    protected $casts = ['sender_seen' => 'boolean', 'responded_at' => 'datetime'];

    public function from(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function to(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to_user_id');
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }

    public function expired(): bool
    {
        return $this->status === 'pending' && $this->created_at->lt(now()->subSeconds(self::TTL));
    }

    /** Số lời mời còn được gửi trong cửa sổ 10 phút hiện tại. */
    public static function left(User $u): int
    {
        return max(0, self::LIMIT - self::where('from_user_id', $u->id)->where('created_at', '>=', now()->subMinutes(self::WINDOW))->count());
    }
}
