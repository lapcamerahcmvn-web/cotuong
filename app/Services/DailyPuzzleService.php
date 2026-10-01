<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\Puzzle;
use App\Models\PuzzleAttempt;
use App\Support\Vn;
use Illuminate\Support\Facades\Cache;

// "Thế cờ hôm nay": 1 thế cho mọi người theo ngày giờ VN, chọn tất định từ kho thế cờ vừa sức
// (rating ≤ 1500, 1–4 nước giải). Chưa dựng kho puzzles thì rơi về cách cũ (bài học có puzzle_side).
class DailyPuzzleService
{
    public function forDate(?string $date = null): ?Puzzle
    {
        $date ??= Vn::today();

        $id = Cache::remember('daily-puzzle:' . $date, 3600, function () use ($date) {
            $pool = Puzzle::published()->where('rating', '<=', 1500)
                ->whereBetween('solver_moves', [1, 4])->orderBy('id')->pluck('id');
            if ($pool->isEmpty()) {
                $pool = Puzzle::published()->orderBy('id')->pluck('id');
            }

            return $pool->isEmpty() ? null : $pool[crc32('daily:' . $date) % $pool->count()];
        });

        return $id ? Puzzle::with('lesson')->find($id) : null;
    }

    /** Bài học dự phòng khi kho puzzles chưa được dựng (giữ hành vi trang chủ cũ). */
    public function fallbackLesson(): ?Lesson
    {
        $pool = Lesson::published()->whereNotNull('puzzle_side')->where('move_count', '<=', 12)->orderBy('id')->pluck('id');

        return $pool->isEmpty() ? null : Lesson::find($pool[crc32(Vn::today()) % $pool->count()]);
    }

    /** % người giải đúng hôm nay (≥ 5 lượt mới hiển thị). */
    public function solveRate(Puzzle $p): ?int
    {
        $q = PuzzleAttempt::where('puzzle_id', $p->id)->where('mode', 'daily')->where('created_at', '>=', Vn::now()->startOfDay()->utc());
        $n = (clone $q)->count();

        return $n >= 5 ? (int) round(100 * (clone $q)->where('result', 'solved')->count() / $n) : null;
    }
}
