<?php

namespace App\Http\Controllers;

use App\Services\LearningPathService;
use Illuminate\Support\Facades\Auth;

class LearningPathController extends Controller
{
    public function index(LearningPathService $paths)
    {
        $data = $paths->forUser(Auth::user());

        return view('path', $data);
    }

    /** Thân 1 chương trình trên lộ trình (nút bài theo phần) — nạp khi người dùng mở chương trình đang đóng. */
    public function series(LearningPathService $paths, string $slug)
    {
        foreach ($paths->forUser(Auth::user())['courses'] as $c) {
            foreach ($c['series_list'] as $s) {
                if ($s['slug'] !== $slug) continue;
                $active = collect($s['units'])->flatMap(fn ($un) => $un['nodes'])->contains('state', 'next');

                return response()->view('partials.path-series-body', ['s' => $s, 'u' => Auth::user(), 'seriesActive' => $active])
                    ->header('X-Robots-Tag', 'noindex');
            }
        }
        abort(404);
    }
}
