<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

// Ván đấu bạn bè qua link. Đỏ luôn đi trước; lượt đi suy từ số nước đã đi.
class Game extends Model
{
    public const START_FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';

    /** Cờ úp: 30 quân úp (X Đỏ / x Đen) trên ô xuất phát, hai Tướng ngửa. */
    public const COUP_FEN = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';

    public const COUP_SET = ['A', 'A', 'B', 'B', 'N', 'N', 'R', 'R', 'C', 'C', 'P', 'P', 'P', 'P', 'P'];

    public const VARIANTS = ['co-tuong' => 'Cờ tướng', 'co-up' => 'Cờ úp'];

    public const TIME_CONTROLS = [0 => 'Không giới hạn', 300 => '5 phút', 600 => '10 phút', 900 => '15 phút'];

    protected $fillable = [
        'code', 'variant', 'creator_id', 'red_user_id', 'black_user_id', 'status', 'fen', 'moves', 'time_control',
        'red_ms', 'black_ms', 'turn_started_at', 'result', 'reason', 'draw_offer', 'version',
        'secret', 'reveals', 'captured',
    ];

    // `secret` (danh tính quân úp) KHÔNG được đưa vào state()/JSON — chỉ GameService đọc.
    protected $hidden = ['secret'];

    protected $casts = ['moves' => 'array', 'secret' => 'array', 'reveals' => 'array', 'captured' => 'array', 'turn_started_at' => 'datetime'];

    public function isCoup(): bool
    {
        return $this->variant === 'co-up';
    }

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

    /**
     * Cờ úp: ăn quân đang ÚP thì chỉ bên ăn biết đó là quân gì — bên kia (và người xem) chỉ thấy 'X'/'x' (nắp chưa rõ)
     * cho tới khi hết ván. Quân bị ăn khi đã lật thì ai cũng thấy.
     */
    public function capturedFor(?string $viewerSide): array
    {
        $cap = $this->captured ?? [];
        if (! $this->isCoup() || $this->status !== 'playing' || ! $cap) return $cap;
        $b = \App\Support\Xiangqi\Rules::loadFen(self::COUP_FEN);
        $rev = $this->reveals ?? [];
        $ci = 0;
        foreach ($this->moves ?? [] as $i => $m) {
            $sq = \App\Support\Xiangqi\Rules::iccs($m);
            $target = $b[$sq[1]];
            if ($target !== null) {
                $capturer = $i % 2 === 0 ? 'do' : 'den';
                if (($target === 'X' || $target === 'x') && $viewerSide !== $capturer && isset($cap[$ci])) {
                    $cap[$ci] = $target;      // giữ màu, giấu binh chủng
                }
                $ci++;
            }
            $b = \App\Support\Xiangqi\Rules::apply($b, $sq[0], $sq[1]);
            if (! empty($rev[$i])) $b[$sq[1]] = $rev[$i];
        }

        return $cap;
    }

    public function state(?User $viewer): array
    {
        return [
            'code' => $this->code,
            'variant' => $this->variant,
            'status' => $this->status,
            'fen' => $this->fen,
            'moves' => $this->moves ?? [],
            'reveals' => $this->reveals ?? [],
            'captured' => $this->capturedFor($this->sideOf($viewer)),
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
            // Báo trước luật lặp nước (thế đã lặp 2 lần).
            'notice' => $this->status === 'playing' ? \App\Support\Xiangqi\Repetition::notice(\App\Support\Xiangqi\Repetition::history($this), $this->sideOf($viewer)) : null,
        ];
    }
}
