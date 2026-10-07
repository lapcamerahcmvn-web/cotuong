<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LessonSeries;
use App\Models\Mindmap;
use App\Support\Mindmap as MindmapSupport;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

// Công cụ Sơ đồ tư duy (Admin): soạn dàn ý chữ, xem trước đúng giao diện người học, tự sinh từ chuyên đề có khẩu quyết,
// rồi chép shortcode [so-do-tu-duy slug="…"] dán vào bài viết.
class MindmapController extends Controller
{
    public function index()
    {
        return view('admin.mindmaps.index', ['maps' => Mindmap::latest('updated_at')->get()]);
    }

    public function create()
    {
        return $this->form(new Mindmap(['outline' => "# Nhánh lớn 1\n## Ý nhỏ 1.1 @slug-bai-hoc-vi-du\n- Khẩu quyết thứ nhất\n- Khẩu quyết thứ hai\n> Ghi chú thêm (tuỳ chọn)\n\n# Nhánh lớn 2\n## Ý nhỏ 2.1\n- …\n"]));
    }

    public function edit(Mindmap $mindmap)
    {
        return $this->form($mindmap);
    }

    public function store(Request $request)
    {
        $m = Mindmap::create($this->validated($request));

        return redirect()->route('admin.mindmaps.edit', $m)->with('ok', 'Đã tạo sơ đồ. Chép shortcode để nhúng vào bài viết.');
    }

    public function update(Request $request, Mindmap $mindmap)
    {
        $mindmap->update($this->validated($request, $mindmap));

        return back()->with('ok', 'Đã lưu sơ đồ.');
    }

    public function destroy(Mindmap $mindmap)
    {
        $mindmap->delete();

        return redirect()->route('admin.mindmaps.index')->with('ok', 'Đã xoá sơ đồ.');
    }

    /** Xem trước: dàn ý → HTML đúng như trên bài viết. */
    public function preview(Request $request): JsonResponse
    {
        $data = $request->validate(['outline' => ['nullable', 'string', 'max:300000'], 'title' => ['nullable', 'string', 'max:191']]);
        $tree = MindmapSupport::parseOutline((string) ($data['outline'] ?? ''));

        return response()->json(['html' => MindmapSupport::render($tree, $data['title'] ?: 'Sơ đồ tư duy', 'preview'), 'leaves' => MindmapSupport::leafCount($tree)]);
    }

    /** Tự sinh dàn ý từ chuyên đề (bài có "Kết quả" + "Khẩu quyết"), lọc theo kết quả. */
    public function generate(Request $request): JsonResponse
    {
        $data = $request->validate(['series' => ['required', 'exists:lesson_series,slug'], 'result' => ['required', Rule::in(array_keys(MindmapSupport::RESULTS))]]);
        $tree = MindmapSupport::fromSeries($data['series'], $data['result']);

        return response()->json(['outline' => MindmapSupport::toOutline($tree), 'leaves' => MindmapSupport::leafCount($tree)]);
    }

    private function form(Mindmap $m)
    {
        return view('admin.mindmaps.form', [
            'map' => $m,
            'series' => LessonSeries::has('publishedLessons')->orderBy('sort_order')->get(['slug', 'name']),
            'results' => MindmapSupport::RESULTS,
        ]);
    }

    private function validated(Request $request, ?Mindmap $m = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:191'],
            'slug' => ['nullable', 'string', 'max:191', 'regex:/^[a-z0-9-]+$/', Rule::unique('mindmaps', 'slug')->ignore($m?->id)],
            'description' => ['nullable', 'string', 'max:500'],
            'outline' => ['required', 'string', 'max:300000'],
        ], ['slug.regex' => 'Slug chỉ gồm chữ thường không dấu, số và dấu gạch.']);
        $data['slug'] = ($data['slug'] ?? null) ?: Str::slug($data['title']);
        if (Mindmap::where('slug', $data['slug'])->when($m, fn ($q) => $q->whereKeyNot($m->id))->exists()) {
            $data['slug'] .= '-' . Str::lower(Str::random(4));
        }

        return $data;
    }
}
