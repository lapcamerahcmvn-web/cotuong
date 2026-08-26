<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    // Gửi bình luận / trả lời (yêu cầu đăng nhập).
    public function store(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'body'      => 'required|string|max:2000',
            'parent_id' => 'nullable|integer|exists:lesson_comments,id',
        ]);

        // parent phải thuộc cùng bài + là bình luận gốc (chỉ cho phép trả lời 1 cấp).
        if (! empty($data['parent_id'])) {
            $parent = LessonComment::find($data['parent_id']);
            if (! $parent || $parent->lesson_id !== $lesson->id) {
                unset($data['parent_id']);
            } elseif ($parent->parent_id) {
                $data['parent_id'] = $parent->parent_id; // gộp về gốc, không lồng sâu
            }
        }

        LessonComment::create([
            'lesson_id' => $lesson->id,
            'user_id'   => $request->user()->id,
            'parent_id' => $data['parent_id'] ?? null,
            'body'      => trim($data['body']),
            'approved'  => false, // chờ admin duyệt mới hiện
        ]);

        return back()->with('comment_ok', 'Đã gửi bình luận! Bình luận sẽ hiển thị sau khi được duyệt.')->withFragment('binh-luan');
    }

    // Thích / bỏ thích (toggle) — trả JSON cho JS cập nhật không tải lại trang.
    public function like(Request $request, LessonComment $comment)
    {
        $userId = $request->user()->id;
        $row = DB::table('comment_likes')->where('comment_id', $comment->id)->where('user_id', $userId);

        if ($row->exists()) {
            $row->delete();
            $comment->decrement('likes_count');
            $liked = false;
        } else {
            DB::table('comment_likes')->insert([
                'comment_id' => $comment->id,
                'user_id'    => $userId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $comment->increment('likes_count');
            $liked = true;
        }

        return response()->json(['liked' => $liked, 'count' => max(0, (int) $comment->fresh()->likes_count)]);
    }
}
