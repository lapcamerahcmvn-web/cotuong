<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonSeries;
use App\Models\SourceAsset;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'published' => Lesson::where('status', 'published')->count(),
            'review'    => Lesson::where('status', 'review')->count(),
            'draft'     => Lesson::where('status', 'draft')->count(),
            'total'     => Lesson::count(),
            'series'    => LessonSeries::count(),
            'assets'    => SourceAsset::count(),
            'low_conf'  => Lesson::where('decode_confidence', 'low')->count(),
        ];

        $recent = Lesson::latest('updated_at')->take(8)->get();

        return view('admin.dashboard', compact('stats', 'recent'));
    }
}
