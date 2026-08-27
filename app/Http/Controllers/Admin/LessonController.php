<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonSeries;
use App\Models\LessonStep;
use App\Services\CotuongContentService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LessonController extends Controller
{
    public function index(Request $request)
    {
        $q = Lesson::query()->with('series')->latest('updated_at');

        if ($s = $request->get('status')) {
            $q->where('status', $s);
        }
        if ($p = $request->get('phase')) {
            $q->where('phase', $p);
        }
        if ($kw = $request->get('q')) {
            $q->where('title', 'like', "%{$kw}%");
        }

        $lessons = $q->paginate(20)->withQueryString();

        return view('admin.lessons.index', compact('lessons'));
    }

    public function edit(Lesson $lesson)
    {
        $lesson->load('steps');
        $seriesList = LessonSeries::orderBy('name')->get();
        return view('admin.lessons.edit', compact('lesson', 'seriesList'));
    }

    public function update(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'title'           => ['required', 'string', 'max:255'],
            'series_id'       => ['nullable', 'exists:lesson_series,id'],
            'order_in_series' => ['nullable', 'integer', 'min:0'],
            'phase'           => ['nullable', 'in:nhap-mon,khai-cuoc,trung-cuoc,tan-cuoc'],
            'level'           => ['required', 'in:co-ban,trung-cap,nang-cao'],
            'game_mode'       => ['required', 'in:co-tuong,co-up'],
            'summary'         => ['nullable', 'string'],
            'content'         => ['nullable', 'string'],
            'seo_title'       => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:255'],
            'is_featured'     => ['nullable', 'boolean'],
            'status'          => ['required', 'in:draft,review,needs_fix,published'],
            'reslug'          => ['nullable', 'boolean'],
            'captions'        => ['nullable', 'array'],
            'initial_fen'     => ['nullable', 'string', 'max:120'],
            'steps_json'      => ['nullable', 'string'],
            'variation_tree'  => ['nullable', 'string'],
        ]);

        $wasPublished = $lesson->status === 'published';
        $lesson->fill([
            'title'           => $data['title'],
            'series_id'       => $data['series_id'] ?? null,
            'order_in_series' => $data['order_in_series'] ?? null,
            'phase'           => $data['phase'] ?? null,
            'level'           => $data['level'],
            'game_mode'       => $data['game_mode'],
            'summary'         => $data['summary'] ?? null,
            'content'         => $data['content'] ?? null,
            'seo_title'       => $data['seo_title'] ?? null,
            'seo_description' => $data['seo_description'] ?? null,
            'is_featured'     => $request->boolean('is_featured'),
            'status'          => $data['status'],
        ]);

        // Đặt published_at khi lần đầu publish.
        if ($lesson->status === 'published' && ! $lesson->published_at) {
            $lesson->published_at = now();
        }

        // Tùy chọn tạo lại slug từ tiêu đề mới (chỉ nên dùng TRƯỚC khi launch — đổi slug làm
        // vỡ URL cũ nếu đã được index).
        if ($request->boolean('reslug')) {
            $lesson->slug = Str::slug($data['title']);
        }

        $lesson->save();

        // Nước đi + cây biến từ trình soạn bàn cờ. CHỈ dựng lại khi board editor có chạy
        // (initial_fen được JS đồng bộ) — tránh xoá nhầm nước đi nếu JS lỗi/không tải.
        if ($request->filled('initial_fen')) {
            $steps = json_decode($request->input('steps_json') ?: '[]', true) ?: [];
            $tree  = json_decode($request->input('variation_tree') ?: '[]', true) ?: [];
            // Chỉ giữ variation_tree khi có NHÁNH thật (một node >1 con) — bài tuyến tính → null.
            $hasBranch = function ($nodes) use (&$hasBranch) {
                foreach ($nodes as $n) {
                    if (count($n['children'] ?? []) > 1) {
                        return true;
                    }
                    if (! empty($n['children']) && $hasBranch($n['children'])) {
                        return true;
                    }
                }
                return false;
            };
            $lesson->update([
                'initial_fen'    => $request->input('initial_fen'),
                'variation_tree' => ($tree && $hasBranch($tree)) ? $tree : null,
                'move_count'     => count($steps),
            ]);
            $lesson->steps()->delete();
            foreach ($steps as $i => $s) {
                LessonStep::create([
                    'lesson_id'          => $lesson->id,
                    'step_order'         => $i + 1,
                    'fen'                => $s['fen'] ?? $lesson->initial_fen,
                    'move_notation_iccs' => $s['iccs'] ?? null,
                    'move_notation_wxf'  => $s['wxf'] ?? null,
                    'move_side'          => in_array($s['side'] ?? null, ['do', 'den'], true) ? $s['side'] : 'do',
                    'caption'            => $s['caption'] ?? null,
                ]);
            }
        } elseif (! empty($data['captions'])) {
            // Tương thích ngược: sửa caption theo id nếu form cũ còn gửi captions[].
            foreach ($lesson->steps as $step) {
                if (array_key_exists($step->id, $data['captions'])) {
                    $step->update(['caption' => $data['captions'][$step->id] ?: null]);
                }
            }
        }

        return redirect()->route('admin.lessons.edit', $lesson)->with('ok', 'Đã lưu bài học.');
    }

    public function togglePublish(Lesson $lesson)
    {
        if ($lesson->status === 'published') {
            $lesson->update(['status' => 'draft']);
            $msg = 'Đã ẩn bài (chuyển về nháp).';
        } else {
            $lesson->update([
                'status'       => 'published',
                'published_at' => $lesson->published_at ?? now(),
            ]);
            $msg = 'Đã xuất bản bài học.';
        }
        return back()->with('ok', $msg);
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return redirect()->route('admin.lessons.index')->with('ok', 'Đã xóa bài học.');
    }

    // Gọi Agent sinh nội dung + caption (cần ANTHROPIC_API_KEY). Dùng annotation gốc trong
    // source_asset làm ngữ cảnh tham khảo (nội bộ).
    public function generate(Lesson $lesson, CotuongContentService $ai)
    {
        if (! $ai->isConfigured()) {
            return back()->with('err', 'Chưa cấu hình ANTHROPIC_API_KEY trong .env — không thể sinh nội dung AI.');
        }

        $refs = [];
        $asset = \App\Models\SourceAsset::where('linked_lesson_id', $lesson->id)->first();
        if ($asset && $decoded = $asset->decodedMoves()) {
            foreach (($decoded['annotations'] ?? []) as $a) {
                $refs[$a['step_order']] = $a['text'];
            }
        }

        try {
            $ai->generateLesson($lesson, $refs);
            return back()->with('ok', 'Đã sinh nội dung + caption bằng AI. Bài chuyển sang trạng thái "review" — hãy đọc lại trước khi publish.');
        } catch (\Throwable $e) {
            return back()->with('err', 'Lỗi khi gọi AI: ' . $e->getMessage());
        }
    }
}
