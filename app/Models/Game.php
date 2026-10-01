<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

// Ván đấu bạn bè qua link. Đỏ luôn đi trước; lượt đi suy từ số nước đã đi.
class Game extends Model
{
    public const START_FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';

    public const TIME_CONTROLS = [0 => 'Không giới hạn', 300 => '5 phút', 600 => '10 phút', 900 => '15 phút'];

    protected $fillable = [
        'code', 'creator_id', 'red_user_id', 'black_user_id', 'status', 'fen', 'moves', 'time_control',
        'red_ms', 'black_ms', 'turn_started_at', 'result', 'reason', 'draw_offer', 'version',
    ];

    protected $casts = ['moves' => 'array', 'turn_started_at' => 'datetime'];

    public static function newCode(): string
    {
        do {
            $code = Str::upper(Str::random(6));
            $code = strtr($code, ['0' => 'X', 'O' => 'Y', '1' => 'Z', 'I' => 'W', 'L' => 'Q']);
        } while (self::where('code', $code)->exists());

        return $code;
    }

    public function red(): BelongsTo
    {
        return $this->belongsTo(User::class, 'red_user_id');
    }

    public function black(): BelongsTo
    {
        return $this->belongsTo(User::class, 'black_user_id');
    }

    public function sideOf(?User $u): ?string
    {
        if (! $u) return null;
        if ($this->red_user_id === $u->id) return 'do';
        if ($this->black_user_id === $u->id) return 'den';

        return null;
    }

    public function turn(): string
    {
        return count($this->moves ?? []) % 2 === 0 ? 'do' : 'den';
    }

    /** Thời gian còn lại (ms) của mỗi bên tính tới lúc này. */
    public function clocks(): array
    {
        $red = (int) $this->red_ms;
        $black = (int) $this->black_ms;
        if ($this->time_control && $this->status === 'playing' && $this->turn_started_at) {
            $used = (int) $this->turn_started_at->diffInMilliseconds(now(), true);
            $this->turn() === 'do' ? $red -= $used : $black -= $used;
        }

        return ['do' => max(0, $red), 'den' => max(0, $black)];
    }

    public function state(?User $viewer): array
    {
        return [
            'code' => $this->code,
            'status' => $this->status,
            'fen' => $this->fen,
            'moves' => $this->moves ?? [],
            'turn' => $this->turn(),
            'you' => $this->sideOf($viewer),
            'red' => $this->red ? ['name' => $this->red->name, 'level' => $this->red->level, 'avatar' => $this->red->avatar] : null,
            'black' => $this->black ? ['name' => $this->black->name, 'level' => $this->black->level, 'avatar' => $this->black->avatar] : null,
            'time_control' => $this->time_control,
            'clocks' => $this->time_control ? $this->clocks() : null,
            'result' => $this->result,
            'reason' => $this->reason,
            'draw_offer' => $this->draw_offer,
            'version' => $this->version,
        ];
    }
}
