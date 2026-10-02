<?php

namespace App\Services;

use App\Models\Game;
use App\Models\GameRecord;
use App\Models\User;
use App\Support\Xiangqi\Rules;

// Lịch sử ván đấu: kiểm tra lại luật từng nước, dựng các bước (FEN sau mỗi nước + ký hiệu Việt + ghi chú
// lật quân / ăn nắp) để xem lại, phân tích bằng máy và chép sang thư viện.
class GameRecordService
{
    private const NAMES = ['R' => 'Xe', 'N' => 'Mã', 'B' => 'Tượng', 'A' => 'Sĩ', 'K' => 'Tướng', 'C' => 'Pháo', 'P' => 'Tốt'];

    /**
     * Dựng các bước của ván. Trả null nếu có nước sai luật hoặc dữ liệu lật quân không khớp.
     * @return list<array{fen:string, move_notation_iccs:string, move_notation_wxf:string, move_side:string, caption:string, cap:?array, reveal:?string}>|null
     */
    public function steps(string $startFen, array $moves, array $reveals = [], array $captured = [], bool $redFirst = true): ?array
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
            $red = ($i % 2 === 0) === $redFirst;
            if ($p === null || Rules::isRed($p) !== $red || ! Rules::legalNoSelfCheck($b, $f, $t, $coup)) return null;

            $note = Rules::notation($b, $f, $t);
            $extra = [];
            $cap = null;
            $rev = null;
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
            $out[] = [
                'fen' => Rules::toFen($b),
                'move_notation_iccs' => $mv,
                'move_notation_wxf' => $note,
                'move_side' => $red ? 'do' : 'den',
                'caption' => ($red ? 'Đỏ' : 'Đen') . ': ' . $note . ($extra ? ' — ' . implode(' · ', $extra) : '') . '.',
                'cap' => $cap,
                'reveal' => $rev,
            ];
        }

        return $out;
    }

    public function stepsFor(GameRecord $r): ?array
    {
        return $this->steps($r->start_fen, $r->moves ?? [], $r->reveals ?? [], $r->captured ?? [], $r->redFirst());
    }

    /**
     * Thế bắt đầu tuỳ chọn có dùng được không: đủ 2 Tướng, quân úp chỉ nằm ở ô có binh chủng xuất phát
     * của đúng bên, bên không đi không đang bị chiếu và bên đi trước còn nước đi.
     */
    public function validStart(string $fen, bool $redFirst): bool
    {
        if (! preg_match('/^[0-9RNBAKCPXrnbakcpx\/]{8,100}$/', $fen) || substr_count($fen, '/') !== 9) return false;
        $b = Rules::loadFen($fen);
        if (Rules::toFen($b) !== $fen) return false;
        $count = array_count_values(array_filter($b, fn ($p) => $p !== null));
        if (($count['K'] ?? 0) !== 1 || ($count['k'] ?? 0) !== 1) return false;
        $coup = ($count['X'] ?? 0) + ($count['x'] ?? 0) > 0;
        foreach ($b as $i => $p) {
            if ($p !== 'X' && $p !== 'x') continue;
            if (Rules::role($i) === null || ($p === 'X') !== (intdiv($i, 9) >= 5)) return false;
        }
        if (Rules::inCheck($b, ! $redFirst, $coup)) return false;

        return Rules::hasLegalMove($b, $redFirst, $coup);
    }

    /** Lưu ván với máy (đã kiểm tra luật). Trả null nếu ván không hợp lệ / quá ngắn. */
    public function storeBot(User $u, array $d): ?GameRecord
    {
        $coup = ($d['variant'] ?? 'co-tuong') === 'co-up';
        $start = $coup ? Game::COUP_FEN : Game::START_FEN;
        $redFirst = true;
        if (! empty($d['start_fen'])) {
            $redFirst = ($d['first_side'] ?? 'do') === 'do';
            if (! $this->validStart($d['start_fen'], $redFirst)) return null;
            $start = $d['start_fen'];
            $coup = str_contains($start, 'X') || str_contains($start, 'x');
        }
        $moves = array_values($d['moves'] ?? []);
        if (count($moves) < 2 || $this->steps($start, $moves, $d['reveals'] ?? [], $d['captured'] ?? [], $redFirst) === null) {
            return null;
        }
        $levels = [1 => 'Tập sự', 2 => 'Dễ', 3 => 'Vừa', 4 => 'Khó'];

        return GameRecord::create([
            'user_id' => $u->id, 'mode' => 'bot', 'variant' => $coup ? 'co-up' : 'co-tuong',
            'level' => $d['level'], 'side' => $d['side'] ?? 'do',
            'opponent' => 'Máy · ' . ($levels[$d['level']] ?? ''),
            'result' => $d['result'], 'reason' => mb_substr((string) ($d['reason'] ?? ''), 0, 60),
            'start_fen' => $start, 'first_side' => $redFirst ? 'do' : 'den', 'moves' => $moves,
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
                'start_fen' => $g->isCoup() ? Game::COUP_FEN : Game::START_FEN, 'first_side' => 'do',
                'moves' => $g->moves, 'reveals' => $g->reveals, 'captured' => $g->captured,
                'plies' => count($g->moves),
            ]);
        }
    }

    /**
     * Làm sạch kết quả phân tích client gửi lên (chỉ ảnh hưởng ván của chính người đó):
     * { evals:[điểm phía Đỏ của mỗi thế], moves:[{b: nước tốt nhất, l: điểm mất, c: loại}], acc:{do,den},
     *   alts:{ply:{iccs:điểm}} — điểm mọi nước ở các thế có sai lầm, dùng cho "thử lại nước này" }.
     */
    public function cleanAnalysis(array $a, int $plies): ?array
    {
        $evals = array_values((array) ($a['evals'] ?? []));
        $moves = array_values((array) ($a['moves'] ?? []));
        if (count($evals) !== $plies + 1 || count($moves) !== $plies) return null;
        $classes = ['best', 'good', 'inacc', 'mistake', 'blunder'];
        $clip = fn ($v) => max(-100000, min(100000, (int) $v));
        $out = ['v' => 1, 'evals' => array_map($clip, $evals), 'moves' => [], 'acc' => [], 'alts' => []];
        foreach ($moves as $m) {
            $m = (array) $m;
            $best = $m['b'] ?? null;
            $out['moves'][] = [
                'b' => is_string($best) && preg_match('/^[a-i]\d[a-i]\d$/', $best) ? $best : null,
                'l' => max(0, min(100000, (int) ($m['l'] ?? 0))),
                'c' => in_array($m['c'] ?? null, $classes, true) ? $m['c'] : 'good',
            ];
        }
        foreach (['do', 'den'] as $s) {
            if (isset($a['acc'][$s]) && is_numeric($a['acc'][$s])) $out['acc'][$s] = round(max(0, min(100, (float) $a['acc'][$s])), 1);
        }
        foreach (array_slice((array) ($a['alts'] ?? []), 0, 80, true) as $ply => $alt) {
            if (! is_numeric($ply) || $ply < 0 || $ply >= $plies || ! is_array($alt)) continue;
            $clean = [];
            foreach (array_slice($alt, 0, 80, true) as $mv => $sc) {
                if (preg_match('/^[a-i]\d[a-i]\d$/', (string) $mv)) $clean[$mv] = $clip($sc);
            }
            $out['alts'][(int) $ply] = $clean;
        }

        return $out;
    }
}
