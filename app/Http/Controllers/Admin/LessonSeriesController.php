<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LessonSeries;
use Illuminate\Http\Request;

// Quản lý chuỗi bài học (thêm/sửa/xoá). Xoá chuỗi KHÔNG xoá bài — FK nullOnDelete gỡ series_id.
class LessonSeriesController extends Controller
{
    public function index()
    {
        $series = LessonSeries::withCount('lessons')->orderBy('sort_order')->orderBy('id')->get();
        return view('admin.series.index', compact('series'));
    }

    public function create()
    {
        return view('admin.series.form', ['series' => new LessonSeries]);
    }

    public function store(Request $request)
    {
        LessonSeries::create($this->validated($request));
        return redirect()->route('admin.series.index')->with('ok', 'Đã tạo chuỗi bài học.');
    }

    public function edit(LessonSeries $series)
    {
        return view('admin.series.form', compact('series'));
    }

    public function update(Request $request, LessonSeries $series)
    {
        $series->update($this->validated($request));
        return redirect()->route('admin.series.index')->with('ok', 'Đã cập nhật chuỗi bài học.');
    }

    public function destroy(LessonSeries $series)
    {
        $n = $series->lessons()->count();
        $series->delete();
        return redirect()->route('admin.series.index')->with('ok',
            $n ? "Đã xoá chuỗi. {$n} bài được gỡ khỏi chuỗi (không bị xoá)." : 'Đã xoá chuỗi bài học.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'game_mode'     => ['required', 'in:co-tuong,co-up'],
            'phase'         => ['nullable', 'in:nhap-mon,khai-cuoc,trung-cuoc,tan-cuoc'],
            'description'   => ['nullable', 'string'],
            'planned_total' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'sort_order'    => ['nullable', 'integer', 'min:0', 'max:9999'],
        ]);
    }
}
