<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LessonController as AdminLessonController;
use App\Http\Controllers\Admin\StatsController as AdminStatsController;
use App\Http\Controllers\Admin\SourceAssetController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
// SEO files — bỏ session/cookie/CSRF: đây là tài nguyên công khai cho bot, không cần state.
// Giữ nguyên sẽ khiến StartSession gắn Set-Cookie + Cache-Control: private → GSC báo "không thể tìm nạp".
Route::withoutMiddleware([
    \Illuminate\Cookie\Middleware\EncryptCookies::class,
    \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    \Illuminate\Session\Middleware\StartSession::class,
    \Illuminate\View\Middleware\ShareErrorsFromSession::class,
    \Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
    \Illuminate\Foundation\Http\Middleware\PreventRequestForgery::class,
    \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
    \App\Http\Middleware\LogAccess::class,
    \App\Http\Middleware\TrackVisit::class,
])->group(function () {
    Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
    Route::get('/sitemap-{section}.xml', [SitemapController::class, 'section'])
        ->where('section', 'pages|nhap-mon|khai-cuoc|trung-cuoc|tan-cuoc|co-up')->name('sitemap.section');
    Route::get('/robots.txt', [SitemapController::class, 'robots'])->name('robots');
});

Route::get('/so-do-trang', [SitemapController::class, 'page'])->name('sitemap.page');
Route::get('/tim-kiem', [SearchController::class, 'index'])->name('search');

// ---- Đăng nhập thống nhất (Google cho người học + email/mật khẩu cho admin) ----
Route::get('/dang-nhap', [AuthController::class, 'showLogin'])->name('login');
Route::post('/dang-nhap', [AuthController::class, 'loginPassword'])->middleware('throttle:10,1');
Route::get('/dang-ky', [AuthController::class, 'showRegister'])->name('register');
Route::post('/dang-ky', [AuthController::class, 'register'])->middleware('throttle:5,1');
Route::get('/dang-nhap/google', [AuthController::class, 'googleRedirect'])->name('login.google');
Route::get('/dang-nhap/google/callback', [AuthController::class, 'googleCallback']);
Route::post('/dang-xuat', [AuthController::class, 'logout'])->name('logout');

// ---- Tài khoản người học ----
Route::middleware('auth')->group(function () {
    Route::get('/tai-khoan', [AccountController::class, 'index'])->name('account.index');
    Route::post('/tien-do/{lesson:id}', [ProgressController::class, 'store'])->name('progress.store');
    Route::post('/bai-hoc/{lesson:slug}/binh-luan', [CommentController::class, 'store'])->name('comment.store')->middleware('throttle:15,1');
    Route::post('/binh-luan/{comment}/thich', [CommentController::class, 'like'])->name('comment.like')->middleware('throttle:60,1');
});

// ---- Admin ---- (chỉ nhân sự: admin/biên tập — học viên bị chặn 403)
Route::middleware(['auth', 'staff'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('lessons', [AdminLessonController::class, 'index'])->name('lessons.index');
    Route::get('lessons/board-editor', [\App\Http\Controllers\Admin\BoardEditorController::class, 'create'])->name('board-editor.create');
    Route::post('lessons/board-editor', [\App\Http\Controllers\Admin\BoardEditorController::class, 'store'])->name('board-editor.store');
    Route::get('lessons/{lesson:id}/edit', [AdminLessonController::class, 'edit'])->name('lessons.edit');
    Route::put('lessons/{lesson:id}', [AdminLessonController::class, 'update'])->name('lessons.update');
    Route::post('lessons/{lesson:id}/toggle', [AdminLessonController::class, 'togglePublish'])->name('lessons.toggle');
    Route::post('lessons/{lesson:id}/generate', [AdminLessonController::class, 'generate'])->name('lessons.generate');
    Route::delete('lessons/{lesson:id}', [AdminLessonController::class, 'destroy'])->name('lessons.destroy');

    // Duyệt bình luận + thống kê + quản lý người dùng/nguồn — CHỈ admin.
    Route::middleware('admin')->group(function () {
        Route::get('binh-luan', [AdminCommentController::class, 'index'])->name('comments.index');
        Route::post('binh-luan/duyet-tat-ca', [AdminCommentController::class, 'approveAll'])->name('comments.approve-all');
        Route::post('binh-luan/{comment}/duyet', [AdminCommentController::class, 'approve'])->name('comments.approve');
        Route::delete('binh-luan/{comment}', [AdminCommentController::class, 'destroy'])->name('comments.destroy');

        Route::get('thong-ke', [AdminStatsController::class, 'index'])->name('stats.index');

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
