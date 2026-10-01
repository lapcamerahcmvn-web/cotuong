<?php

namespace App\Support\Xiangqi;

/**
 * Luật cờ tướng tối thiểu (bản PHP của public/js/xiangqi-rules.js) — dùng để thẩm định lời giải
 * thế cờ phía server và khi dựng kho thế cờ. Bàn = mảng 90 ô, index = rank*9+file, rank 0 = trên
 * (bên Đen), giá trị là 1 ký tự quân (chữ HOA = Đỏ) hoặc null. Không hỗ trợ quân úp (cờ úp).
 */
final class Rules
{
    public static function isRed(string $p): bool
    {
        return $p === strtoupper($p);
    }

    /** @return array<int, string|null> */
    public static function loadFen(string $fen): array
    {
        $b = array_fill(0, 90, null);
        $rows = explode('/', explode(' ', trim($fen))[0]);
        for ($r = 0; $r < 10; $r++) {
            $f = 0;
            $row = $rows[$r] ?? '';
            for ($i = 0, $n = strlen($row); $i < $n; $i++) {
                $ch = $row[$i];
                if ($ch >= '1' && $ch <= '9') {
                    $f += (int) $ch;
                } elseif ($f < 9) {
                    $b[$r * 9 + $f] = $ch;
                    $f++;
                }
            }
        }

        return $b;
    }

    public static function toFen(array $b): string
    {
        $out = [];
        for ($r = 0; $r < 10; $r++) {
            $e = 0;
            $s = '';
            for ($c = 0; $c < 9; $c++) {
                $p = $b[$r * 9 + $c];
                if ($p === null) {
                    $e++;
                } else {
                    if ($e) {
                        $s .= $e;
                        $e = 0;
                    }
                    $s .= $p;
                }
            }
            $out[] = $s . ($e ?: '');
        }

        return implode('/', $out);
    }

    /** "h2e2" → [from, to] (index ô) hoặc null. */
    public static function iccs(string $mv): ?array
    {
        if (! preg_match('/^([a-i])(\d)([a-i])(\d)$/', $mv, $m)) {
            return null;
        }
        $idx = fn (string $f, string $r) => (9 - (int) $r) * 9 + (ord($f) - 97);

        return [$idx($m[1], $m[2]), $idx($m[3], $m[4])];
    }

    public static function toIccs(int $from, int $to): string
    {
        $sq = fn (int $i) => chr(97 + $i % 9) . (9 - intdiv($i, 9));

        return $sq($from) . $sq($to);
    }

    public static function legalMove(array $b, int $from, int $to): bool
    {
        $p = $b[$from] ?? null;
        if ($p === null || $from === $to || $to < 0 || $to > 89) {
            return false;
        }
        $tgt = $b[$to];
        if ($tgt !== null && self::isRed($tgt) === self::isRed($p)) {
            return false;
        }
        $red = self::isRed($p);
        $t = strtoupper($p);
        $fr = intdiv($from, 9); $fc = $from % 9; $tr = intdiv($to, 9); $tc = $to % 9;
        $dr = $tr - $fr; $dc = $tc - $fc; $adr = abs($dr); $adc = abs($dc);

        $between = function () use ($b, $fr, $fc, $tr, $tc, $dr, $dc): int {
            $n = 0;
            if ($dr === 0) {
                $s = $fc < $tc ? 1 : -1;
                for ($c = $fc + $s; $c !== $tc; $c += $s) {
                    if ($b[$fr * 9 + $c] !== null) $n++;
                }

                return $n;
            }
            if ($dc === 0) {
                $s = $fr < $tr ? 1 : -1;
                for ($r = $fr + $s; $r !== $tr; $r += $s) {
                    if ($b[$r * 9 + $fc] !== null) $n++;
                }

                return $n;
            }

            return -1;
        };

        switch ($t) {
            case 'R':
                return ($dr === 0 || $dc === 0) && $between() === 0;
            case 'C':
                if ($dr !== 0 && $dc !== 0) return false;
                $n = $between();

                return $tgt !== null ? $n === 1 : $n === 0;
            case 'N':
                if (! (($adr === 1 && $adc === 2) || ($adr === 2 && $adc === 1))) return false;
                $lr = $fr + ($adr === 2 ? intdiv($dr, 2) : 0);
                $lc = $fc + ($adc === 2 ? intdiv($dc, 2) : 0);

                return $b[$lr * 9 + $lc] === null;
            case 'B':
                if ($adr !== 2 || $adc !== 2) return false;
                if ($b[($fr + intdiv($dr, 2)) * 9 + ($fc + intdiv($dc, 2))] !== null) return false;

                return $red ? $tr >= 5 : $tr <= 4;
            case 'A':
                if ($adr !== 1 || $adc !== 1 || $tc < 3 || $tc > 5) return false;

                return $red ? $tr >= 7 : $tr <= 2;
            case 'K':
                if ($tgt !== null && strtoupper($tgt) === 'K' && $dc === 0) {
                    return $between() === 0;   // lộ mặt tướng
                }
                if ($adr + $adc !== 1 || $tc < 3 || $tc > 5) return false;

                return $red ? $tr >= 7 : $tr <= 2;
            case 'P':
                if ($red) {
                    return ($dr === -1 && $dc === 0) || ($fr <= 4 && $dr === 0 && $adc === 1);
                }

                return ($dr === 1 && $dc === 0) || ($fr >= 5 && $dr === 0 && $adc === 1);
        }

        return false;
    }

    public static function findKing(array $b, bool $red): int
    {
        $k = $red ? 'K' : 'k';
        foreach ($b as $i => $p) {
            if ($p === $k) return $i;
        }

        return -1;
    }

    public static function inCheck(array $b, bool $red): bool
    {
        $ki = self::findKing($b, $red);
        if ($ki < 0) return false;
        foreach ($b as $i => $p) {
            if ($p === null || self::isRed($p) === $red) continue;
            if (self::legalMove($b, $i, $ki)) return true;
        }

        return false;
    }

    public static function apply(array $b, int $from, int $to): array
    {
        $b[$to] = $b[$from];
        $b[$from] = null;

        return $b;
    }

    public static function legalNoSelfCheck(array $b, int $from, int $to): bool
    {
        if (! self::legalMove($b, $from, $to)) return false;

        return ! self::inCheck(self::apply($b, $from, $to), self::isRed($b[$from]));
    }

    public static function hasLegalMove(array $b, bool $red): bool
    {
        foreach ($b as $from => $p) {
            if ($p === null || self::isRed($p) !== $red) continue;
            for ($to = 0; $to < 90; $to++) {
                if (self::legalNoSelfCheck($b, $from, $to)) return true;
            }
        }

        return false;
    }

    /** Bên $red bị chiếu hết (hoặc hết nước đi — cờ tướng tính là thua). */
    public static function isMated(array $b, bool $red): bool
    {
        return ! self::hasLegalMove($b, $red);
    }

    /** @return list<array{0:int,1:int}> mọi nước hợp lệ của 1 bên */
    public static function legalMoves(array $b, bool $red): array
    {
        $out = [];
        foreach ($b as $from => $p) {
            if ($p === null || self::isRed($p) !== $red) continue;
            for ($to = 0; $to < 90; $to++) {
                if (self::legalNoSelfCheck($b, $from, $to)) $out[] = [$from, $to];
            }
        }

        return $out;
    }
}
