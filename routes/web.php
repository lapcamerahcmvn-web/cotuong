<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LessonController as AdminLessonController;
use App\Http\Controllers\Admin\SourceAssetController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/tim-kiem', [SearchController::class, 'index'])->name('search');

// ---- Đăng nhập thống nhất (Google cho người học + email/mật khẩu cho admin) ----
Route::get('/dang-nhap', [AuthController::class, 'showLogin'])->name('login');
Route::post('/dang-nhap', [AuthController::class, 'loginPassword'])->middleware('throttle:10,1');
Route::get('/dang-nhap/google', [AuthController::class, 'googleRedirect'])->name('login.google');
Route::get('/dang-nhap/google/callback', [AuthController::class, 'googleCallback']);
Route::post('/dang-xuat', [AuthController::class, 'logout'])->name('logout');

// ---- Tài khoản người học ----
Route::middleware('auth')->group(function () {
    Route::get('/tai-khoan', [AccountController::class, 'index'])->name('account.index');
    Route::post('/tien-do/{lesson:id}', [ProgressController::class, 'store'])->name('progress.store');
});

// ---- Admin ----
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('lessons', [AdminLessonController::class, 'index'])->name('lessons.index');
    Route::get('lessons/{lesson:id}/edit', [AdminLessonController::class, 'edit'])->name('lessons.edit');
    Route::put('lessons/{lesson:id}', [AdminLessonController::class, 'update'])->name('lessons.update');
    Route::post('lessons/{lesson:id}/toggle', [AdminLessonController::class, 'togglePublish'])->name('lessons.toggle');
    Route::post('lessons/{lesson:id}/generate', [AdminLessonController::class, 'generate'])->name('lessons.generate');
    Route::delete('lessons/{lesson:id}', [AdminLessonController::class, 'destroy'])->name('lessons.destroy');

    // Quản lý người dùng + nguồn tài liệu bản quyền — CHỈ admin.
    Route::middleware('admin')->group(function () {
        Route::get('users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('users/{user}', [AdminUserController::class, 'show'])->name('users.show');
        Route::get('nguon', [SourceAssetController::class, 'index'])->name('source-assets.index');
        Route::get('nguon/{sourceAsset}', [SourceAssetController::class, 'show'])->name('source-assets.show');
    });
});

// Chuỗi bài (Course) + bài học — prefix rõ ràng để KHÔNG đụng route giai đoạn /{phase}.
Route::get('/chuong-trinh/{series:slug}', [LessonController::class, 'series'])->name('series');
Route::get('/bai-hoc/{lesson:slug}', [LessonController::class, 'show'])->name('lessons.show');

// Trang giai đoạn: /{phase} — ĐẶT CUỐI CÙNG + ràng buộc whitelist để tránh nuốt route khác.
Route::get('/{phase}', [LessonController::class, 'phase'])
    ->where('phase', 'khai-cuoc|trung-cuoc|tan-cuoc|nhap-mon|co-up')
    ->name('phase');
