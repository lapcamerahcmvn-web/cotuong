<?php

namespace App\Http\Controllers;

use App\Models\SavedPosition;
use Illuminate\Http\Request;

// "Thư viện của tôi": lưu/xem/xoá thế cờ (FEN) cá nhân — sao chép từ bài học hoặc tự soạn.
class LibraryController extends Controller
{
    // GET /tai-khoan/thu-vien — danh sách + khối soạn thế cờ mới (xem account/library.blade.php).
    public function index()
    {
        $items = auth()->user()->library()->with('sourceLesson')->latest()->paginate(12);

        return view('account.library', compact('items'));
    }

    // POST /thu-vien (AJAX, JSON) — dùng chung cho nút "Lưu vào thư viện" trên bàn cờ công khai
    // VÀ khối soạn thế cờ trong /tai-khoan/thu-vien.
    public function store(Request $request)
    {
        $data = $request->validate([
            'fen' => ['required', 'string', 'max:120', 'regex:/^[0-9a-zA-Z\/]+$/'],
            'title' => ['nullable', 'string', 'max:120'],
            'note' => ['nullable', 'string', 'max:2000'],
            'source_lesson_id' => ['nullable', 'integer', 'exists:lessons,id'],
        ]);

        $item = $request->user()->library()->create($data);

        return response()->json(['ok' => true, 'id' => $item->id]);
    }

    // DELETE /thu-vien/{position} — form POST thường (không AJAX), chỉ chủ sở hữu được xoá.
    public function destroy(SavedPosition $position)
    {
        abort_unless($position->user_id === auth()->id(), 403);
        $position->delete();

        return redirect()->route('account.library')->with('success', 'Đã xoá thế cờ khỏi thư viện.');
    }
}
