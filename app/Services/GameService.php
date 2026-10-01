<?php

namespace App\Services;

use App\Models\Game;
use App\Models\User;
use App\Models\XpTransaction;
use App\Services\Gamification\GamificationService;
use App\Support\Vn;
use App\Support\Xiangqi\Rules;
use Illuminate\Support\Facades\DB;

// Luật ván đấu bạn bè: thẩm định từng nước bằng Rules (PHP), đồng hồ, hoà/thua/thắng, XP.
class GameService
{
    public const MAX_PLIES = 300;

    public function __construct(private GamificationService $gami) {}

    public function create(User $u, string $side, int $time): Game
    {
        $side = $side === 'random' ? (random_int(0, 1) ? 'do' : 'den') : $side;

        return Game::create([
            'code' => Game::newCode(),
            'creator_id' => $u->id,
            'red_user_id' => $side === 'do' ? $u->id : null,
            'black_user_id' => $side === 'den' ? $u->id : null,
            'fen' => Game::START_FEN,
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
    public function move(Game $g, User $u, string $iccs): array
    {
        return DB::transaction(function () use ($g, $u, $iccs) {
            $g = Game::whereKey($g->id)->lockForUpdate()->first();
            $this->checkTimeout($g);
            if ($g->status !== 'playing') return ['ok' => false, 'error' => 'Ván đã kết thúc.', 'game' => $g];
            $side = $g->sideOf($u);
            if (! $side || $side !== $g->turn()) return ['ok' => false, 'error' => 'Chưa tới lượt bạn.', 'game' => $g];

            $sq = Rules::iccs($iccs);
            $b = Rules::loadFen($g->fen);
            if (! $sq || $b[$sq[0]] === null || Rules::isRed($b[$sq[0]]) !== ($side === 'do') || ! Rules::legalNoSelfCheck($b, $sq[0], $sq[1])) {
                return ['ok' => false, 'error' => 'Nước đi không hợp lệ.', 'game' => $g];
            }
            $b = Rules::apply($b, $sq[0], $sq[1]);

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
            $g->version++;

            $opp = $side === 'do' ? 'den' : 'do';
            if (! Rules::hasLegalMove($b, $opp === 'do')) {
                $this->finish($g, $side, Rules::inCheck($b, $opp === 'do') ? 'chiếu hết' : 'hết nước đi');
            } elseif ($this->repeated($moves)) {
                $this->finish($g, 'hoa', 'lặp lại thế cờ 3 lần');
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

    private function repeated(array $moves): bool
    {
        $b = Rules::loadFen(Game::START_FEN);
        $seen = [Rules::toFen($b) . 'r' => 1];
        foreach ($moves as $i => $m) {
            $sq = Rules::iccs($m);
            $b = Rules::apply($b, $sq[0], $sq[1]);
            $k = Rules::toFen($b) . ($i % 2 ? 'r' : 'b');
            if (($seen[$k] = ($seen[$k] ?? 0) + 1) >= 3) return true;
        }

        return false;
    }

    /** $result: do | den | hoa. Ghi kết quả + XP (sau commit). Không tự save. */
    private function finish(Game $g, string $result, string $reason): void
    {
        $g->status = 'finished';
        $g->result = $result;
        $g->reason = $reason;
        $g->draw_offer = null;
        $g->version++;
        if (count($g->moves ?? []) < 10) {
            return;   // ván quá ngắn không tính XP (chặn tạo ván ảo để cày)
        }
        $gid = $g->id;
        DB::afterCommit(function () use ($gid, $result) {
            $g = Game::find($gid);
            foreach (['do' => $g->red_user_id, 'den' => $g->black_user_id] as $side => $uid) {
                $u = $uid ? User::find($uid) : null;
                if (! $u) continue;
                $n = XpTransaction::where('user_id', $u->id)->whereIn('reason', ['pvp_win', 'pvp_draw', 'pvp_play'])->where('local_date', Vn::today())->count();
                if ($n >= (int) config('gamification.caps.pvp_games_daily')) continue;
                [$reason, $amount] = $result === 'hoa' ? ['pvp_draw', config('gamification.xp.pvp_draw')]
                    : ($result === $side ? ['pvp_win', config('gamification.xp.pvp_win')] : ['pvp_play', 5]);
                $this->gami->record($u, $reason, ['key' => 'pvp:' . $gid, 'amount' => (int) $amount]);
            }
        });
    }
}
