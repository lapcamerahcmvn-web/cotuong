<?php

namespace App\Services;

use App\Models\Game;
use App\Models\User;
use App\Models\XpTransaction;
use App\Services\Gamification\GamificationService;
use App\Services\GameRecordService;
use App\Support\Vn;
use App\Support\Xiangqi\Repetition;
use App\Support\Xiangqi\Rules;
use Illuminate\Support\Facades\DB;

// Luật ván đấu bạn bè: thẩm định từng nước bằng Rules (PHP), đồng hồ, hoà/thua/thắng, XP.
class GameService
{
    public const MAX_PLIES = 300;

    public function __construct(private GamificationService $gami) {}

    public function create(User $u, string $side, int $time, string $variant = 'co-tuong'): Game
    {
        $side = $side === 'random' ? (random_int(0, 1) ? 'do' : 'den') : $side;
        $coup = $variant === 'co-up';

        return Game::create([
            'code' => Game::newCode(),
            'variant' => $coup ? 'co-up' : 'co-tuong',
            'creator_id' => $u->id,
            'red_user_id' => $side === 'do' ? $u->id : null,
            'black_user_id' => $side === 'den' ? $u->id : null,
            'fen' => $coup ? Game::COUP_FEN : Game::START_FEN,
            'secret' => $coup ? $this->shuffleSecret() : null,
            'reveals' => [],
            'captured' => [],
            'moves' => [],
            'time_control' => $time,
            'red_ms' => $time * 1000,
            'black_ms' => $time * 1000,
        ]);
    }

    public function join(Game $g, User $u): Game
    {
        return DB::transaction(function () use ($g, $u) {
            $g = Game::whereKey($g->id)->lockForUpdate()->first();
            if ($g->status !== 'waiting' || $g->sideOf($u)) {
                return $g;
            }
            $g->red_user_id ? $g->black_user_id = $u->id : $g->red_user_id = $u->id;
            $g->status = 'playing';
            $g->turn_started_at = now();
            $g->version++;
            $g->save();

            return $g;
        });
    }

    /** @return array{ok:bool, error?:string, game:Game} */
    public function move(Game $g, User $u, string $iccs, bool $confirm = false): array
    {
        return DB::transaction(function () use ($g, $u, $iccs, $confirm) {
            $g = Game::whereKey($g->id)->lockForUpdate()->first();
            $this->checkTimeout($g);
            if ($g->status !== 'playing') return ['ok' => false, 'error' => 'Ván đã kết thúc.', 'game' => $g];
            $side = $g->sideOf($u);
            if (! $side || $side !== $g->turn()) return ['ok' => false, 'error' => 'Chưa tới lượt bạn.', 'game' => $g];

            $coup = $g->isCoup();
            $sq = Rules::iccs($iccs);
            $b = Rules::loadFen($g->fen);
            if (! $sq || $b[$sq[0]] === null || Rules::isRed($b[$sq[0]]) !== ($side === 'do') || ! Rules::legalNoSelfCheck($b, $sq[0], $sq[1], $coup)) {
                return ['ok' => false, 'error' => 'Nước đi không hợp lệ.', 'game' => $g];
            }
            [$from, $to] = $sq;
            $secret = $g->secret ?? [];
            $mover = $b[$from];
            $revealed = null;
            if ($mover === 'X' || $mover === 'x') {          // lật quân úp
                $mover = $revealed = $secret[$from];
                unset($secret[$from]);
            }
            $victim = $b[$to];
            if ($victim === 'X' || $victim === 'x') {        // ăn quân úp → lộ mặt
                $victim = $secret[$to];
                unset($secret[$to]);
            }
            $b[$to] = $mover;
            $b[$from] = null;
            if ($this->forbiddenCheck($g, $b, $side === 'do')) {
                return ['ok' => false, 'error' => 'Luật chiếu dai: không được chiếu lặp lại thế cờ lần thứ 3 — hãy đi nước khác.', 'game' => $g];
            }
            // Nước này làm thế cờ lặp lần 3 → báo trước, chỉ đi khi người chơi xác nhận (chịu hoà / chấp nhận bị xử thua).
            if (! $confirm) {
                $hist = Repetition::history($g);
                $key = Rules::toFen($b) . ($side === 'do' ? 'b' : 'r');
                if (count(array_filter($hist, fn ($x) => $x['key'] === $key)) >= 2) {
                    $hist[] = ['key' => $key, 'check' => Rules::inCheck($b, $side !== 'do', $coup), 'side' => $side,
                        'before' => Rules::loadFen($g->fen), 'after' => $b, 'from' => $from, 'to' => $to, 'coup' => $coup];
                    $v = Repetition::verdict($hist);
                    if ($v && $v['result'] !== $side) {
                        $msg = $v['result'] === 'hoa'
                            ? 'Nước này làm thế cờ lặp lại lần thứ 3 — ván sẽ xử HOÀ. Bạn đồng ý hoà? (Bấm Huỷ để đi nước khác.)'
                            : 'Nước này là lần thứ 3 lặp lại khi bạn ' . (str_starts_with($v['reason'], 'chiếu') ? 'chiếu' : 'đuổi bắt quân') . ' liên tục — theo luật bạn sẽ bị XỬ THUA. Vẫn đi?';
                        return ['ok' => false, 'confirm' => $msg, 'error' => $msg, 'game' => $g];
                    }
                }
            }
            if ($coup) {
                $g->secret = $secret;
                $g->reveals = array_merge($g->reveals ?? [], [$revealed]);
                if ($victim) $g->captured = array_merge($g->captured ?? [], [$victim]);
            }

            if ($g->time_control) {
                $used = (int) $g->turn_started_at->diffInMilliseconds(now(), true);
                $col = $side === 'do' ? 'red_ms' : 'black_ms';
                $g->{$col} = max(0, $g->{$col} - $used);
            }
            $moves = $g->moves ?? [];
            $moves[] = $iccs;
            $g->moves = $moves;
            $g->fen = Rules::toFen($b);
            $g->turn_started_at = now();
            $g->draw_offer = null;
            $g->takeback_offer = null;      // đi nước mới = bỏ qua lời xin đi lại đang chờ
            $g->version++;

            $opp = $side === 'do' ? 'den' : 'do';
            if (! Rules::hasLegalMove($b, $opp === 'do', $coup)) {
                $mated = Rules::inCheck($b, $opp === 'do', $coup);
                // Hết nước đi = thua (cờ tướng lẫn cờ úp).
                $this->finish($g, $side, $mated ? 'chiếu hết' : 'hết nước đi');
            } elseif ($v = Repetition::verdict(Repetition::history($g))) {
                $this->finish($g, $v['result'], $v['reason']);
            } elseif (count($moves) >= self::MAX_PLIES) {
                $this->finish($g, 'hoa', 'quá ' . (self::MAX_PLIES / 2) . ' nước');
            }
            $g->save();

            return ['ok' => true, 'game' => $g];
        });
    }

    public function resign(Game $g, User $u): Game
    {
        return $this->locked($g, function (Game $g) use ($u) {
            $side = $g->sideOf($u);
            if ($g->status === 'playing' && $side) {
                $this->finish($g, $side === 'do' ? 'den' : 'do', 'xin thua');
            } elseif ($g->status === 'waiting' && $g->creator_id === $u->id) {
                $g->status = 'aborted';
                $g->reason = 'đã huỷ';
                $g->version++;
            }
        });
    }

    public function offerDraw(Game $g, User $u): Game
    {
        return $this->locked($g, function (Game $g) use ($u) {
            $side = $g->sideOf($u);
            if ($g->status !== 'playing' || ! $side) return;
            if ($g->draw_offer && $g->draw_offer !== $side) {
                $this->finish($g, 'hoa', 'hai bên đồng ý hoà');      // đối phương đã đề nghị → đồng ý
            } else {
                $g->draw_offer = $side;
                $g->version++;
            }
        });
    }

    public function declineDraw(Game $g, User $u): Game
    {
        return $this->locked($g, function (Game $g) use ($u) {
            $side = $g->sideOf($u);
            if ($g->status === 'playing' && $side && $g->draw_offer && $g->draw_offer !== $side) {
                $g->draw_offer = null;
                $g->version++;
            }
        });
    }

    /**
     * Xin đi lại: mỗi người tối đa Game::MAX_TAKEBACKS lần/ván (chỉ tính lần được đồng ý). Bị từ chối thì phải chờ có
     * nước mới mới xin lại được. @return array{ok:bool, error?:string, game:Game}
     */
    public function requestTakeback(Game $g, User $u): array
    {
        $err = null;
        $g = $this->locked($g, function (Game $g) use ($u, &$err) {
            $this->checkTimeout($g);
            $side = $g->sideOf($u);
            $n = count($g->moves ?? []);
            $mine = $side === 'do' ? intdiv($n + 1, 2) : intdiv($n, 2);
            $err = match (true) {
                $g->status !== 'playing' || ! $side => 'Ván không còn diễn ra.',
                $mine === 0 => 'Bạn chưa đi nước nào để xin đi lại.',
                $g->takebacksLeft($side) === 0 => 'Bạn đã dùng hết ' . Game::MAX_TAKEBACKS . ' lần xin đi lại trong ván này.',
                $g->takeback_offer === $side => 'Bạn đã xin đi lại — chờ đối thủ trả lời.',
                $g->takeback_block !== null && (int) $g->takeback_block === $n => 'Đối thủ vừa từ chối — chờ có nước mới rồi xin lại.',
                default => null,
            };
            if ($err) return;
            $g->takeback_offer = $side;
            $g->version++;
        });

        return $err ? ['ok' => false, 'error' => $err, 'game' => $g] : ['ok' => true, 'game' => $g];
    }

    /** Đối thủ trả lời lời xin đi lại. Đồng ý: lùi nước của người xin (kèm nước đáp của mình nếu đã đi). */
    public function answerTakeback(Game $g, User $u, bool $accept): Game
    {
        return $this->locked($g, function (Game $g) use ($u, $accept) {
            $this->checkTimeout($g);
            $side = $g->sideOf($u);
            $offer = $g->takeback_offer;
            if ($g->status !== 'playing' || ! $side || ! $offer || $offer === $side) return;
            $g->takeback_offer = null;
            $g->version++;
            if (! $accept) {
                $g->takeback_block = count($g->moves ?? []);
                return;
            }
            $plies = $g->turn() === $offer ? 2 : 1;       // tới lượt người xin = đối thủ đã đáp → lùi 2 nước
            if (count($g->moves ?? []) < $plies) return;
            if ($g->time_control) {                        // trừ giờ bên đang tới lượt tới thời điểm này
                $col = $g->turn() === 'do' ? 'red_ms' : 'black_ms';
                $g->{$col} = max(0, $g->{$col} - (int) $g->turn_started_at->diffInMilliseconds(now(), true));
            }
            $this->undo($g, $plies);
            $tb = $g->takebacks ?? [];
            $tb[$offer] = (int) ($tb[$offer] ?? 0) + 1;
            $g->takebacks = $tb;
            $g->takeback_block = null;
            $g->draw_offer = null;
            $g->turn_started_at = now();
        });
    }

    /**
     * Lùi $n nước cuối. Cờ úp: quân vừa lật được úp lại đúng danh tính (trả về `secret`), nắp bị ăn đặt lại chỗ cũ.
     * Không tự save.
     */
    private function undo(Game $g, int $n): void
    {
        $moves = $g->moves ?? [];
        $reveals = $g->reveals ?? [];
        $captured = $g->captured ?? [];
        $secret = $g->secret ?? [];
        $coup = $g->isCoup();
        $keep = count($moves) - $n;
        $b = $before = Rules::loadFen($coup ? Game::COUP_FEN : Game::START_FEN);
        $caps = $capsKeep = 0;
        foreach ($moves as $i => $m) {
            if ($i === $keep) { $before = $b; $capsKeep = $caps; }
            [$f, $t] = Rules::iccs($m);
            if ($coup && $i >= $keep) {
                if ($b[$f] === 'X' || $b[$f] === 'x') $secret[$f] = $reveals[$i] ?? null;
                if ($b[$t] === 'X' || $b[$t] === 'x') $secret[$t] = $captured[$caps] ?? null;
            }
            if ($b[$t] !== null) $caps++;
            $b = Rules::apply($b, $f, $t);
            if (! empty($reveals[$i])) $b[$t] = $reveals[$i];
        }
        $g->moves = array_slice($moves, 0, $keep);
        $g->fen = Rules::toFen($before);
        if ($coup) {
            $g->reveals = array_slice($reveals, 0, $keep);
            $g->captured = array_slice($captured, 0, $capsKeep);
            $g->secret = $secret;
        }
    }

    /** Hết giờ → thua. Gọi khi đọc trạng thái hoặc trước khi đi nước. Không tự save. */
    public function checkTimeout(Game $g): bool
    {
        if ($g->status !== 'playing' || ! $g->time_control) return false;
        $c = $g->clocks();
        $turn = $g->turn();
        if ($c[$turn] > 0) return false;
        $g->{$turn === 'do' ? 'red_ms' : 'black_ms'} = 0;
        $this->finish($g, $turn === 'do' ? 'den' : 'do', 'hết giờ');

        return true;
    }

    public function refresh(Game $g): Game
    {
        if ($g->status === 'playing' && $g->time_control && min($g->clocks()) <= 0) {
            return $this->locked($g, fn (Game $g) => $this->checkTimeout($g));
        }

        return $g;
    }

    private function locked(Game $g, callable $fn): Game
    {
        return DB::transaction(function () use ($g, $fn) {
            $g = Game::whereKey($g->id)->lockForUpdate()->first();
            $fn($g);
            $g->save();

            return $g;
        });
    }

    /**
     * Lịch sử thế cờ công khai: [khoá thế (bàn + lượt đi), nước vừa đi có chiếu không, bên vừa đi] cho thế đầu và
     * sau từng nước (quân vừa lật thay 'X' bằng mặt thật theo `reveals`).
     * @return list<array{0:string,1:bool,2:?string}>
     */
    /** Nước chiếu đưa tới thế đã xuất hiện ≥ 2 lần (lần thứ 3) → cấm (luật chiếu dai). */
    private function forbiddenCheck(Game $g, array $after, bool $moverRed): bool
    {
        if (! Rules::inCheck($after, ! $moverRed, $g->isCoup())) return false;
        $key = Rules::toFen($after) . ($moverRed ? 'b' : 'r');

        return count(array_filter(Repetition::history($g), fn ($x) => $x['key'] === $key)) >= 2;
    }

    /** Tráo 15 quân mỗi bên lên 15 ô xuất phát (trừ Tướng). Khoá = chỉ số ô 0..89. */
    private function shuffleSecret(): array
    {
        $secret = [];
        $board = Rules::loadFen(Game::COUP_FEN);
        foreach ([true, false] as $red) {
            $set = Game::COUP_SET;
            shuffle($set);
            foreach ($board as $i => $p) {
                if ($p === ($red ? 'X' : 'x')) $secret[$i] = $red ? array_pop($set) : strtolower(array_pop($set));
            }
        }

        return $secret;
    }

    /** $result: do | den | hoa. Ghi kết quả + XP (sau commit). Không tự save. */
    private function finish(Game $g, string $result, string $reason): void
    {
        $g->status = 'finished';
        $g->result = $result;
        $g->reason = $reason;
        $g->draw_offer = null;
        $g->version++;
        $gid = $g->id;
        // Lưu lịch sử ván cho cả 2 người (sau commit để đọc đúng trạng thái cuối).
        DB::afterCommit(fn () => app(GameRecordService::class)->storePvp(Game::with(['red', 'black'])->find($gid)));
        if (count($g->moves ?? []) < 10) {
            return;   // ván quá ngắn không tính XP (chặn tạo ván ảo để cày)
        }
        DB::afterCommit(function () use ($gid, $result) {
            $g = Game::find($gid);
            foreach (['do' => $g->red_user_id, 'den' => $g->black_user_id] as $side => $uid) {
                $u = $uid ? User::find($uid) : null;
                if (! $u) continue;
                $n = XpTransaction::where('user_id', $u->id)->whereIn('reason', ['pvp_win', 'pvp_draw', 'pvp_play'])->where('local_date', Vn::today())->count();
                if ($n >= (int) config('gamification.caps.pvp_games_daily')) continue;
                [$reason, $amount] = $result === 'hoa' ? ['pvp_draw', config('gamification.xp.pvp_draw')]
                    : ($result === $side ? ['pvp_win', config('gamification.xp.pvp_win')] : ['pvp_play', 5]);
                $key = 'pvp:' . ($g->variant === 'co-up' ? 'co-up:' : '') . $gid;
                $this->gami->record($u, $reason, ['key' => $key, 'amount' => (int) $amount]);
            }
        });
    }
}
