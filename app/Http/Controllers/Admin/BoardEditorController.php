<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LessonSeries;
use App\Support\LessonComposer;
use Illuminate\Http\Request;

// Trình soạn bàn cờ: xếp quân tạo thế + ghi nước đi bằng cách bấm quân/ô, rồi lưu thành bài (nháp).
class BoardEditorController extends Controller
{
    public function create()
    {
        $series = LessonSeries::orderBy('sort_order')->orderBy('id')->get();

        return view('admin.lessons.board-editor', compact('series'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'series_id' => ['nullable', 'integer', 'exists:lesson_series,id'],
            'order_in_series' => ['nullable', 'integer', 'min:0'],
            'game_mode' => ['required', 'in:co-tuong,co-up'],
            'phase' => ['nullable', 'in:nhap-mon,khai-cuoc,trung-cuoc,tan-cuoc'],
            'level' => ['required', 'in:co-ban,trung-cap,nang-cao'],
            'status' => ['nullable', 'in:draft,review,needs_fix,published'],
            'is_featured' => ['nullable', 'boolean'],
            'summary' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:255'],
            'initial_fen' => ['required', 'string', 'max:120'],
            'steps_json' => ['nullable', 'string'],       // mạch chính (tuyến tính) → lesson_steps
            'variation_tree' => ['nullable', 'string'],    // cây biến đầy đủ (JSON lồng nhau)
        ]);

        $steps = json_decode($data['steps_json'] ?? '[]', true) ?: [];
        $tree = json_decode($data['variation_tree'] ?? '[]', true) ?: [];
        $data['is_featured'] = $request->boolean('is_featured');

        $lesson = LessonComposer::create($data, $steps, $tree);

        return redirect()->route('admin.lessons.edit', $lesson)
            ->with('ok', 'Đã tạo bài học từ bàn cờ. Có thể chỉnh tiếp nước đi, biến và nội dung ở đây.');
    }
}
