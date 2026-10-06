<?php

namespace App\Support\Xiangqi;

use App\Models\Game;

/**
 * Luật LẶP NƯỚC (đấu bạn — bản JS tương ứng: resources/js/repetition.js cho chơi với máy):
 *  - Thế cờ (bàn + lượt) lặp lại lần 3: bên nào trong vòng lặp MỌI nước đều CHIẾU hoặc ĐUỔI BẮT quân (dọa ăn quân
 *    không được bảo vệ, hoặc Mã/Pháo dọa ăn Xe) mà bên kia không → bên đó THUA ("chiếu dai" / "đuổi bắt dai");
 *    cả hai cùng như vậy hoặc không bên nào → HOÀ.
 *  - Chiếu dai thuần (mọi nước đều chiếu) vẫn bị CẤM đi nước chiếu lần 3 (GameService::forbiddenCheck) — phải đổi nước.
 *  - Lặp lần 2 → báo trước (notice); sắp lặp lần 3 → hỏi xác nhận (GameService::move trả 'confirm').
 */
class Repetition
{
    /**
     * Lịch sử thế sau mỗi nước: ['key' => bàn+lượt, 'check' => nước vừa đi chiếu, 'side' => bên vừa đi,
     * 'before','after','from','to' => để tính "đuổi bắt" khi cần (chỉ trong vòng lặp).
     */
    public static function history(Game $g): array
    {
        $coup = $g->isCoup();
        $b = Rules::loadFen($coup ? Game::COUP_FEN : Game::START_FEN);
        $out = [['key' => Rules::toFen($b) . 'r', 'check' => false, 'side' => null]];
        $rev = $g->reveals ?? [];
        foreach ($g->moves ?? [] as $i => $m) {
            $sq = Rules::iccs($m);
            $before = $b;
            $b = Rules::apply($b, $sq[0], $sq[1]);
            if (! empty($rev[$i])) $b[$sq[1]] = $rev[$i];
            $moverRed = $i % 2 === 0;
            $out[] = ['key' => Rules::toFen($b) . ($moverRed ? 'b' : 'r'), 'check' => Rules::inCheck($b, ! $moverRed, $coup),
                'side' => $moverRed ? 'do' : 'den', 'before' => $before, 'after' => $b, 'from' => $sq[0], 'to' => $sq[1], 'coup' => $coup];
        }

        return $out;
    }

    /** Nước from→to của bên $moverRed có "đuổi bắt" quân đối phương không (đe doạ ăn MỚI tạo ra). */
    public static function chase(array $before, array $after, int $from, int $to, bool $moverRed, bool $coup): bool
    {
        $p = $after[$to] ?? null;
        if ($p === null) return false;
        $t = strtoupper($p);
        foreach ($after as $s => $q) {
            if ($q === null || Rules::isRed($q) === $moverRed) continue;
            $qt = strtoupper($q);
            if ($qt === 'K' || $qt === 'P') continue;                     // chiếu tính riêng; đuổi Tốt không tính
            if (! Rules::legalMove($after, $to, $s, $coup)) continue;
            if (($before[$from] ?? null) !== null && $s !== $from && Rules::legalMove($before, $from, $s, $coup)) continue;   // đã dọa từ trước
            $b2 = $after;
            $b2[$s] = $p;
            $b2[$to] = null;
            if (Rules::inCheck($b2, $moverRed, $coup)) continue;            // ăn thì tự bị chiếu → không phải dọa thật
            $protected = false;
            foreach ($b2 as $d => $r) {
                if ($r === null || Rules::isRed($r) === $moverRed) continue;
                if (Rules::legalNoSelfCheck($b2, $d, $s, $coup)) { $protected = true; break; }
            }
            if (! $protected || ($qt === 'R' && in_array($t, ['N', 'C'], true))) return true;
        }

        return false;
    }

    /** Mỗi bên: mọi nước trong đoạn đều chiếu/đuổi bắt (offense), mọi nước đều chiếu (check). */
    private static function offense(array $span): array
    {
        $out = [];
        foreach (['do', 'den'] as $side) {
            $mine = array_values(array_filter($span, fn ($x) => ($x['side'] ?? null) === $side));
            $chk = $mine && count(array_filter($mine, fn ($x) => $x['check'])) === count($mine);
            $off = $mine && count(array_filter($mine, fn ($x) => $x['check']
                || self::chase($x['before'], $x['after'], $x['from'], $x['to'], $side === 'do', $x['coup']))) === count($mine);
            $out[$side] = ['off' => $off, 'check' => $chk];
        }

        return $out;
    }

    private static function span(array $h): ?array
    {
        $last = end($h)['key'];
        $idx = array_keys(array_filter($h, fn ($x) => $x['key'] === $last));

        return [count($idx), array_slice($h, $idx[0] + 1)];
    }

    /** Lặp lần 3 → ['result' => do|den|hoa, 'reason' => …]; chưa → null. */
    public static function verdict(array $h): ?array
    {
        [$n, $span] = self::span($h);
        if ($n < 3) return null;
        $o = self::offense($span);
        foreach (['do' => 'den', 'den' => 'do'] as $side => $opp) {
            if ($o[$side]['off'] && ! $o[$opp]['off']) {
                return ['result' => $opp, 'reason' => $o[$side]['check'] ? 'chiếu dai (lặp 3 lần)' : 'đuổi bắt quân dai (lặp 3 lần)'];
            }
        }

        return ['result' => 'hoa', 'reason' => 'lặp lại thế cờ 3 lần'];
    }

    /** Thế hiện tại đã lặp 2 lần → câu báo trước cho người xem $viewer (do|den|null). */
    public static function notice(array $h, ?string $viewer): ?string
    {
        [$n, $span] = self::span($h);
        if ($n !== 2) return null;
        $o = self::offense($span);
        $opp = $viewer === 'do' ? 'den' : 'do';
        if ($viewer && $o[$viewer]['off'] && ! $o[$opp]['off']) {
            return 'Thế cờ đã lặp lại 2 lần và bạn đang ' . ($o[$viewer]['check'] ? 'chiếu' : 'đuổi bắt quân') . ' liên tục — nếu lặp lần 3 bạn sẽ bị XỬ THUA. Hãy đổi nước.';
        }
        if ($viewer && $o[$opp]['off'] && ! $o[$viewer]['off']) {
            return 'Thế cờ đã lặp lại 2 lần — đối phương đang ' . ($o[$opp]['check'] ? 'chiếu' : 'đuổi bắt quân') . ' liên tục; nếu họ lặp thêm lần nữa sẽ bị xử thua.';
        }

        return 'Thế cờ đã lặp lại 2 lần — nếu lặp lần 3 ván sẽ xử HOÀ.';
    }
}
