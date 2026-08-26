<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LessonComment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $filter = in_array($request->get('filter'), ['all', 'approved', 'pending']) ? $request->get('filter') : 'pending';

        $q = LessonComment::with(['user', 'lesson', 'parent']);
        if ($filter === 'pending') {
            $q->where('approved', false);
        } elseif ($filter === 'approved') {
            $q->where('approved', true);
        }
        $comments = $q->latest()->paginate(25)->withQueryString();

        $pendingCount = LessonComment::where('approved', false)->count();

        return view('admin.comments.index', compact('comments', 'filter', 'pendingCount'));
    }

    public function approve(LessonComment $comment)
    {
        $comment->update(['approved' => true]);
        return back()->with('ok', 'Đã duyệt bình luận.');
    }

    public function approveAll()
    {
        $n = LessonComment::where('approved', false)->update(['approved' => true]);
        return back()->with('ok', "Đã duyệt {$n} bình luận.");
    }

    public function destroy(LessonComment $comment)
    {
        $comment->delete(); // trả lời con tự xóa theo khóa ngoại
        return back()->with('ok', 'Đã xóa bình luận.');
    }
}
