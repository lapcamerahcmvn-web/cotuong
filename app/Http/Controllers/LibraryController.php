<?php

namespace App\Http\Controllers;

use App\Models\SavedPosition;
use App\Support\LessonComposer;
use Illuminate\Http\Request;

// "Thư viện của tôi": lưu/xem/xoá thế cờ (FEN + nước đi/nhánh) cá nhân — sao chép từ bài học
// hoặc tự soạn ở /tai-khoan/thu-vien; có thể gửi bản soạn cho Admin duyệt thành bài học thật.
class LibraryController extends Controller
{
    // GET /tai-khoan/thu-vien — danh sách + khối soạn thế cờ mới (xem account/library.blade.php).
    public function index()
    {
        $items = auth()->user()->library()->with('sourceLesson')->latest()->paginate(12);

        return view('account.library', compact('items'));
    }

    // POST /thu-vien (AJAX, JSON) — dùng chung cho nút "Lưu vào thư viện" trên bàn cờ công khai
    // (chỉ gửi `fen`) VÀ khối soạn thế cờ trong /tai-khoan/thu-vien (có thể kèm `steps`/`variation_tree`
    // nếu người dùng đã ghi nước đi/nhánh, không chỉ 1 thế cờ tĩnh).
    public function store(Request $request)
    {
        $data = $request->validate([
            'fen' => ['required', 'string', 'max:120', 'regex:/^[0-9a-zA-Z\/]+$/'],
            'title' => ['nullable', 'string', 'max:120'],
            'note' => ['nullable', 'string', 'max:2000'],
            'source_lesson_id' => ['nullable', 'integer', 'exists:lessons,id'],
            'steps' => ['nullable', 'array'],
            'variation_tree' => ['nullable', 'array'],
        ]);

        $item = $request->user()->library()->create([
            'fen' => $data['fen'],
            'title' => $data['title'] ?? null,
            'note' => $data['note'] ?? null,
            'source_lesson_id' => $data['source_lesson_id'] ?? null,
            'steps_json' => $data['steps'] ?? null,
            'variation_tree' => $data['variation_tree'] ?? null,
        ]);

        return response()->json(['ok' => true, 'id' => $item->id]);
    }

    // POST /thu-vien/gui-admin (AJAX, JSON) — tạo 1 Lesson nháp (status=draft) từ thế cờ soạn tay,
    // y hệt cách Admin\BoardEditorController tạo bài, nhưng đánh dấu submitted_by_user_id để Admin
    // biết đây là bài người dùng gửi lên, không phải Admin tự soạn.
    public function submit(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'initial_fen' => ['required', 'string', 'max:120'],
            'steps' => ['nullable', 'array'],
            'variation_tree' => ['nullable', 'array'],
            'summary' => ['nullable', 'string', 'max:2000'],
        ]);

        // Không có field chọn Cờ Tướng/Cờ Úp trong công cụ công khai — suy ra từ FEN (quân úp
        // luôn ký hiệu X/x, không trùng với bất kỳ quân thật nào khác).
        $data['game_mode'] = str_contains($data['initial_fen'], 'X') || str_contains($data['initial_fen'], 'x')
            ? 'co-up' : 'co-tuong';

        $lesson = LessonComposer::create($data, $data['steps'] ?? [], $data['variation_tree'] ?? [], $request->user()->id);

        return response()->json(['ok' => true, 'lesson_id' => $lesson->id]);
    }

    // PUT /thu-vien/{position} (AJAX, JSON) — sửa lại thế cờ đã lưu (cả Cờ Tướng lẫn Cờ Úp, vì
    // FEN đã tự mang ký hiệu X/x cho quân úp — không cần phân biệt riêng). Chỉ chủ sở hữu được sửa.
    public function update(Request $request, SavedPosition $position)
    {
        abort_unless($position->user_id === auth()->id(), 403);

        $data = $request->validate([
            'fen' => ['required', 'string', 'max:120', 'regex:/^[0-9a-zA-Z\/]+$/'],
            'title' => ['nullable', 'string', 'max:120'],
            'note' => ['nullable', 'string', 'max:2000'],
            'steps' => ['nullable', 'array'],
            'variation_tree' => ['nullable', 'array'],
        ]);

        $position->update([
            'fen' => $data['fen'],
            'title' => $data['title'] ?? null,
            'note' => $data['note'] ?? null,
            'steps_json' => $data['steps'] ?? null,
            'variation_tree' => $data['variation_tree'] ?? null,
        ]);

        return response()->json(['ok' => true, 'id' => $position->id]);
    }

    // DELETE /thu-vien/{position} — form POST thường (không AJAX), chỉ chủ sở hữu được xoá.
    public function destroy(SavedPosition $position)
    {
        abort_unless($position->user_id === auth()->id(), 403);
        $position->delete();

        return redirect()->route('account.library')->with('success', 'Đã xoá thế cờ khỏi thư viện.');
    }
}
