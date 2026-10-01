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
}
