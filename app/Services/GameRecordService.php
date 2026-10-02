<?php

namespace App\Services;

use App\Models\Game;
use App\Models\GameRecord;
use App\Models\User;
use App\Support\Xiangqi\Rules;

// Lịch sử ván đấu: kiểm tra lại luật từng nước, dựng các bước (FEN sau mỗi nước + ký hiệu Việt + ghi chú
// lật quân / ăn nắp) để xem lại bằng bàn cờ tương tác và chép sang thư viện.
class GameRecordService
{
    private const NAMES = ['R' => 'Xe', 'N' => 'Mã', 'B' => 'Tượng', 'A' => 'Sĩ', 'K' => 'Tướng', 'C' => 'Pháo', 'P' => 'Tốt'];

    /**
     * Dựng các bước của ván. Trả null nếu có nước sai luật hoặc dữ liệu lật quân không khớp.
     * @return list<array{fen:string, move_notation_iccs:string, move_notation_wxf:string, move_side:string, caption:string}>|null
     */
    public function steps(string $startFen, array $moves, array $reveals = [], array $captured = []): ?array
    {
        $b = Rules::loadFen($startFen);
        $coup = str_contains($startFen, 'X') || str_contains($startFen, 'x');
        $out = [];
        $ci = 0;
        foreach (array_values($moves) as $i => $mv) {
            $sq = is_string($mv) ? Rules::iccs($mv) : null;
            if (! $sq) return null;
            [$f, $t] = $sq;
            $p = $b[$f];
            $red = $i % 2 === 0;
            if ($p === null || Rules::isRed($p) !== $red || ! Rules::legalNoSelfCheck($b, $f, $t, $coup)) return null;

            $note = Rules::notation($b, $f, $t);
            $extra = [];
            $cap = null;
            $mover = $p;
            if ($p === 'X' || $p === 'x') {
                $rev = $reveals[$i] ?? null;
                if (! is_string($rev) || ! preg_match('/^[RNBACP]$/i', $rev) || Rules::isRed($rev) !== $red) return null;
                $mover = $rev;
                $extra[] = 'lật ' . self::NAMES[strtoupper($rev)];
            }
            if ($b[$t] !== null) {
                $hidden = $b[$t] === 'X' || $b[$t] === 'x';
                $victim = $captured[$ci++] ?? $b[$t];
                $name = self::NAMES[strtoupper($victim)] ?? null;
                $cap = ['p' => $victim, 'hidden' => $hidden];
                $extra[] = $hidden ? 'ăn nắp' . ($name ? ': ' . $name : '') : ($name ? 'ăn ' . $name : 'ăn quân');
            }
            $b[$t] = $mover;
            $b[$f] = null;
            $side = $red ? 'do' : 'den';
            $out[] = [
                'fen' => Rules::toFen($b),
                'move_notation_iccs' => $mv,
                'move_notation_wxf' => $note,
                'move_side' => $side,
                'caption' => ($red ? 'Đỏ' : 'Đen') . ': ' . $note . ($extra ? ' — ' . implode(' · ', $extra) : '') . '.',
                'cap' => $cap,
            ];
        }

        return $out;
    }

    /** Lưu ván với máy (đã kiểm tra luật). Trả null nếu ván không hợp lệ / quá ngắn. */
    public function storeBot(User $u, array $d): ?GameRecord
    {
        $coup = ($d['variant'] ?? 'co-tuong') === 'co-up';
        $start = $coup ? Game::COUP_FEN : Game::START_FEN;
        $moves = array_values($d['moves'] ?? []);
        if (count($moves) < 2 || $this->steps($start, $moves, $d['reveals'] ?? [], $d['captured'] ?? []) === null) {
            return null;
        }
        $levels = [1 => 'Tập sự', 2 => 'Dễ', 3 => 'Vừa', 4 => 'Khó'];

        return GameRecord::create([
            'user_id' => $u->id, 'mode' => 'bot', 'variant' => $coup ? 'co-up' : 'co-tuong',
            'level' => $d['level'], 'side' => $d['side'] ?? 'do',
            'opponent' => 'Máy · ' . ($levels[$d['level']] ?? ''),
            'result' => $d['result'], 'reason' => mb_substr((string) ($d['reason'] ?? ''), 0, 60),
            'start_fen' => $start, 'moves' => $moves,
            'reveals' => $coup ? array_values($d['reveals'] ?? []) : null,
            'captured' => $coup ? array_values($d['captured'] ?? []) : null,
            'plies' => count($moves),
        ]);
    }

    /** Ván đấu bạn kết thúc → 1 bản ghi cho mỗi người chơi. */
    public function storePvp(Game $g): void
    {
        if (count($g->moves ?? []) < 1) return;
        foreach (['do' => [$g->red_user_id, $g->black], 'den' => [$g->black_user_id, $g->red]] as $side => [$uid, $opp]) {
            if (! $uid) continue;
            $result = $g->result === 'hoa' ? 'draw' : ($g->result === $side ? 'win' : 'loss');
            GameRecord::updateOrCreate(['user_id' => $uid, 'game_id' => $g->id], [
                'mode' => 'pvp', 'variant' => $g->variant ?? 'co-tuong', 'side' => $side,
                'opponent' => $opp?->name ?? 'Bạn chơi',
                'result' => $result, 'reason' => mb_substr((string) $g->reason, 0, 60),
                'start_fen' => $g->isCoup() ? Game::COUP_FEN : Game::START_FEN,
                'moves' => $g->moves, 'reveals' => $g->reveals, 'captured' => $g->captured,
                'plies' => count($g->moves),
            ]);
        }
    }
}
