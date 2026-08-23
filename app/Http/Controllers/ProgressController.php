<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// API tiến độ học (JS gọi khi user đọc bài). Đánh dấu "completed" khi đã đọc đủ lâu + xem hết
// các nước. Chỉ cho user đăng nhập.
class ProgressController extends Controller
{
    public function store(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'read_seconds'     => ['nullable', 'integer', 'min:0', 'max:100000'],
            'viewed_all_moves' => ['nullable', 'boolean'],
        ]);

        $p = LessonProgress::firstOrNew([
            'user_id'   => Auth::id(),
            'lesson_id' => $lesson->id,
        ]);

        $p->read_seconds = max($p->read_seconds ?? 0, (int) ($data['read_seconds'] ?? 0));
        if ($request->boolean('viewed_all_moves')) {
            $p->viewed_all_moves = true;
        }

        // Điều kiện "đã học": đọc ≥ 5 phút (300s) VÀ đã xem hết các nước.
        // (Bài không có nước đi: chỉ cần đọc đủ lâu.)
        $enoughRead = $p->read_seconds >= 300;
        $movesOk = $lesson->move_count === 0 ? true : $p->viewed_all_moves;
        if ($enoughRead && $movesOk && $p->status !== 'completed') {
            $p->status = 'completed';
            $p->completed_at = now();
        }

        $p->save();

        return response()->json([
            'status'       => $p->status,
            'read_seconds' => $p->read_seconds,
            'completed'    => $p->status === 'completed',
        ]);
    }
}
