<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Puzzle;
use App\Models\PuzzleAttempt;
use App\Services\Gamification\GamificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// API tiến độ học (JS gọi khi user đọc bài). Đánh dấu "completed" khi đã đọc đủ lâu + xem hết
// các nước. Chỉ cho user đăng nhập. Lần đầu hoàn thành → cộng XP (idempotent theo bài).
class ProgressController extends Controller
{
    public function store(Request $request, Lesson $lesson, GamificationService $gami)
    {
        $data = $request->validate([
            'read_seconds'     => ['nullable', 'integer', 'min:0', 'max:100000'],
            'viewed_all_moves' => ['nullable', 'boolean'],
            'finished_reading' => ['nullable', 'boolean'],
            'solved_puzzle'    => ['nullable', 'boolean'],
        ]);

        $p = LessonProgress::firstOrNew([
            'user_id'   => Auth::id(),
            'lesson_id' => $lesson->id,
        ]);

        // Số giây do trình duyệt báo không được vượt thời gian thực kể từ lần ghi nhận đầu tiên
        // (+15s dung sai cho lượt heartbeat đầu) — chặn gửi tay read_seconds lớn để "hoàn thành" ngay.
        $elapsed = $p->exists ? (int) $p->created_at->diffInSeconds(now(), true) + 15 : 15;
        $claimed = min((int) ($data['read_seconds'] ?? 0), $elapsed);
        $p->read_seconds = max($p->read_seconds ?? 0, $claimed);
        if ($request->boolean('viewed_all_moves')) {
            $p->viewed_all_moves = true;
        }

        // Điều kiện "đã học" — đơn giản, thân thiện:
        // - Bài CÓ nước đi: đã xem hết các nước (dù tua nhanh) + ở lại ≥ minSeconds() (bài 1 nước 5 giây … tối đa 20 giây),
        //   HOẶC đã tự giải đúng thế cờ của bài ("Thử tự giải") — kiểm bằng lượt giải đã được server thẩm định.
        // - Bài KHÔNG có nước đi (lý thuyết): đã cuộn hết bài + ở lại ≥ 15 giây, HOẶC đọc ≥ 90 giây.
        $solved = $request->boolean('solved_puzzle') && PuzzleAttempt::where('user_id', Auth::id())->where('result', 'solved')
            ->where('created_at', '>=', now()->subHours(6))
            ->whereIn('puzzle_id', Puzzle::where('lesson_id', $lesson->id)->select('id'))->exists();
        $completed = $lesson->move_count > 0
            ? (($p->viewed_all_moves && $p->read_seconds >= self::minSeconds($lesson)) || $solved)
            : (($request->boolean('finished_reading') && $p->read_seconds >= 15) || $p->read_seconds >= 90);

        $justCompleted = false;
        if ($completed && $p->status !== 'completed') {
            $p->status = 'completed';
            $p->completed_at = now();
            $justCompleted = true;
        }

        $p->save();

        return response()->json([
            'status'       => $p->status,
            'read_seconds' => $p->read_seconds,
            'completed'    => $p->status === 'completed',
            'gamification' => $justCompleted ? $gami->lessonCompleted(Auth::user(), $lesson) : null,
        ]);
    }

    /** Thời gian tối thiểu (giây) ở lại bài có nước đi: 3 + 2 giây/nước, tối đa 20 — bài 1 nước chỉ cần 5 giây. */
    public static function minSeconds(\App\Models\Lesson $lesson): int
    {
        return (int) min(20, 3 + 2 * max(1, (int) $lesson->move_count));
    }

    /**
     * Gộp tiến độ khách (localStorage) vào tài khoản ngay sau khi đăng nhập/đăng ký: chỉ đánh dấu
     * "đã xem" (reading) cho các bài khách đã xem — KHÔNG tự hoàn thành, không cộng XP hồi tố.
     */
    public function merge(Request $request)
    {
        $ids = collect($request->validate([
            'lessons' => ['array', 'max:200'], 'lessons.*' => ['integer'],
        ])['lessons'] ?? [])->unique()->take(200);

        $valid = Lesson::published()->whereIn('id', $ids)->pluck('id');
        $have = LessonProgress::where('user_id', Auth::id())->whereIn('lesson_id', $valid)->pluck('lesson_id');
        $n = 0;
        foreach ($valid->diff($have) as $id) {
            LessonProgress::create(['user_id' => Auth::id(), 'lesson_id' => $id, 'status' => 'reading', 'read_seconds' => 0]);
            $n++;
        }

        return response()->json(['merged' => $n]);
    }
}
