<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $q = Post::query()->with('category')->latest('updated_at');

        if ($s = $request->get('status')) {
            $q->where('status', $s);
        }
        if ($c = $request->get('post_category_id')) {
            $q->where('post_category_id', $c);
        }
        if ($kw = $request->get('q')) {
            $q->where('title', 'like', "%{$kw}%");
        }

        $posts = $q->paginate(20)->withQueryString();
        $categories = PostCategory::orderBy('sort_order')->get();

        return view('admin.posts.index', compact('posts', 'categories'));
    }

    public function create()
    {
        return view('admin.posts.form', [
            'post' => new Post,
            'categories' => PostCategory::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        unset($data['thumbnail']); // file object từ validate() — chỉ set lại nếu THẬT SỰ có upload
        $data['is_featured'] = $request->boolean('is_featured');
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('posts', 'public');
        }
        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        $post = Post::create($data);

        return redirect()->route('admin.posts.edit', $post)->with('ok', 'Đã tạo bài viết.');
    }

    public function edit(Post $post)
    {
        return view('admin.posts.form', [
            'post' => $post,
            'categories' => PostCategory::orderBy('sort_order')->get(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $data = $this->validated($request);
        unset($data['thumbnail']); // giữ nguyên ảnh cũ trừ khi có upload ảnh mới
        $data['is_featured'] = $request->boolean('is_featured');
        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('posts', 'public');
        }
        if ($data['status'] === 'published' && ! $post->published_at) {
            $data['published_at'] = now();
        }

        $post->update($data);

        return redirect()->route('admin.posts.edit', $post)->with('ok', 'Đã lưu bài viết.');
    }

    public function togglePublish(Post $post)
    {
        if ($post->status === 'published') {
            $post->update(['status' => 'draft']);
            $msg = 'Đã ẩn bài (chuyển về nháp).';
        } else {
            $post->update(['status' => 'published', 'published_at' => $post->published_at ?? now()]);
            $msg = 'Đã xuất bản bài viết.';
        }

        return back()->with('ok', $msg);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('ok', 'Đã xoá bài viết.');
    }

    // Endpoint cho TinyMCE images_upload_handler (đăng ảnh chèn trong nội dung bài viết).
    public function uploadImage(Request $request)
    {
        $request->validate(['file' => ['required', 'image', 'max:5120']]);
        $path = $request->file('file')->store('posts/editor', 'public');

        return response()->json(['location' => Storage::url($path)]);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'post_category_id' => ['nullable', 'exists:post_categories,id'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => ['nullable', 'string'],
            'thumbnail' => ['nullable', 'image', 'max:5120'],
            'is_featured' => ['nullable', 'boolean'],
            'status' => ['required', 'in:draft,published'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string', 'max:255'],
        ]);
    }
}
