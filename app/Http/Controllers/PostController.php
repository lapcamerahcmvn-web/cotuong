<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;

class PostController extends Controller
{
    // /tin-tuc
    public function index()
    {
        $featured = Post::featured()->with('category')->latest('published_at')->take(3)->get();
        $posts = Post::published()->with('category')->latest('published_at')->paginate(12);
        $categories = PostCategory::withCount(['posts' => fn ($q) => $q->published()])
            ->orderBy('sort_order')->get();

        return view('posts.index', compact('featured', 'posts', 'categories'));
    }

    // /tin-tuc/{categorySlug}
    public function category(string $categorySlug)
    {
        $category = PostCategory::where('slug', $categorySlug)->firstOrFail();
        $posts = $category->posts()->published()->latest('published_at')->paginate(12);
        $categories = PostCategory::withCount(['posts' => fn ($q) => $q->published()])
            ->orderBy('sort_order')->get();

        return view('posts.category', compact('category', 'posts', 'categories'));
    }

    // /tin-tuc/{categorySlug}/{postSlug}
    public function show(string $categorySlug, string $postSlug)
    {
        $post = Post::published()->with('category')->where('slug', $postSlug)->firstOrFail();

        // URL chuẩn hoá theo chuyên mục thật của bài — nếu lệch (bài đổi chuyên mục) thì 301 sang đúng.
        $realCategorySlug = $post->category?->slug ?? 'tin-tuc';
        if ($realCategorySlug !== $categorySlug) {
            return redirect()->route('posts.show', [$realCategorySlug, $post->slug], 301);
        }

        $post->increment('view_count');

        $related = Post::published()->with('category')->where('id', '!=', $post->id)
            ->where('post_category_id', $post->post_category_id)
            ->latest('published_at')->take(4)->get();

        return view('posts.show', compact('post', 'related'));
    }
}
