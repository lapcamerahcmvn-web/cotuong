<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PostCategory;
use Illuminate\Http\Request;

// Quản lý chuyên mục Tin tức (thêm/sửa/xoá). Xoá chuyên mục KHÔNG xoá bài — FK nullOnDelete gỡ post_category_id.
class PostCategoryController extends Controller
{
    public function index()
    {
        $categories = PostCategory::withCount('posts')->orderBy('sort_order')->orderBy('id')->get();

        return view('admin.post-categories.index', compact('categories'));
    }

    public function create()
    {
        return view('admin.post-categories.form', ['category' => new PostCategory]);
    }

    public function store(Request $request)
    {
        PostCategory::create($this->validated($request));

        return redirect()->route('admin.post-categories.index')->with('ok', 'Đã tạo chuyên mục.');
    }

    public function edit(PostCategory $category)
    {
        return view('admin.post-categories.form', compact('category'));
    }

    public function update(Request $request, PostCategory $category)
    {
        $category->update($this->validated($request));

        return redirect()->route('admin.post-categories.index')->with('ok', 'Đã cập nhật chuyên mục.');
    }

    public function destroy(PostCategory $category)
    {
        $n = $category->posts()->count();
        $category->delete();

        return redirect()->route('admin.post-categories.index')->with('ok',
            $n ? "Đã xoá chuyên mục. {$n} bài được gỡ khỏi chuyên mục (không bị xoá)." : 'Đã xoá chuyên mục.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ]);
    }
}
