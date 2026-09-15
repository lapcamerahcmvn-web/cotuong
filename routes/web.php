<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\BoardEditorController;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LessonController as AdminLessonController;
use App\Http\Controllers\Admin\LessonSeriesController;
use App\Http\Controllers\Admin\PostCategoryController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\SourceAssetController;
use App\Http\Controllers\Admin\StatsController as AdminStatsController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\LogAccess;
use App\Http\Middleware\TrackVisit;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Middleware\ShareErrorsFromSession;

Route::get('/', [HomeController::class, 'index'])->name('home');
// SEO files — bỏ session/cookie/CSRF: đây là tài nguyên công khai cho bot, không cần state.
// Giữ nguyên sẽ khiến StartSession gắn Set-Cookie + Cache-Control: private → GSC báo "không thể tìm nạp".
Route::withoutMiddleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    ShareErrorsFromSession::class,
    ValidateCsrfToken::class,
    PreventRequestForgery::class,
    VerifyCsrfToken::class,
    LogAccess::class,
    TrackVisit::class,
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

    // Thư viện thế cờ cá nhân.
    Route::get('/tai-khoan/thu-vien', [LibraryController::class, 'index'])->name('account.library');
    Route::post('/thu-vien', [LibraryController::class, 'store'])->name('library.store')->middleware('throttle:20,1');
    Route::post('/thu-vien/gui-admin', [LibraryController::class, 'submit'])->name('library.submit')->middleware('throttle:10,1');
    Route::delete('/thu-vien/{position}', [LibraryController::class, 'destroy'])->name('library.destroy');
});

// ---- Admin ---- (chỉ nhân sự: admin/biên tập — học viên bị chặn 403)
Route::middleware(['auth', 'staff'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('lessons', [AdminLessonController::class, 'index'])->name('lessons.index');
    Route::get('lessons/board-editor', [BoardEditorController::class, 'create'])->name('board-editor.create');
    Route::post('lessons/board-editor', [BoardEditorController::class, 'store'])->name('board-editor.store');
    Route::get('lessons/{lesson:id}/edit', [AdminLessonController::class, 'edit'])->name('lessons.edit');
    Route::put('lessons/{lesson:id}', [AdminLessonController::class, 'update'])->name('lessons.update');
    Route::post('lessons/{lesson:id}/toggle', [AdminLessonController::class, 'togglePublish'])->name('lessons.toggle');
    Route::post('lessons/{lesson:id}/generate', [AdminLessonController::class, 'generate'])->name('lessons.generate');
    Route::delete('lessons/{lesson:id}', [AdminLessonController::class, 'destroy'])->name('lessons.destroy');

    // Quản lý chuỗi bài học (thêm/sửa/xoá) — nhân sự (admin + biên tập).
    Route::get('series', [LessonSeriesController::class, 'index'])->name('series.index');
    Route::get('series/create', [LessonSeriesController::class, 'create'])->name('series.create');
    Route::post('series', [LessonSeriesController::class, 'store'])->name('series.store');
    Route::get('series/{series}/edit', [LessonSeriesController::class, 'edit'])->name('series.edit');
    Route::put('series/{series}', [LessonSeriesController::class, 'update'])->name('series.update');
    Route::delete('series/{series}', [LessonSeriesController::class, 'destroy'])->name('series.destroy');

    // Tin tức: bài viết + chuyên mục (thêm/sửa/xoá) — nhân sự (admin + biên tập).
    Route::get('tin-tuc', [AdminPostController::class, 'index'])->name('posts.index');
    Route::get('tin-tuc/tao', [AdminPostController::class, 'create'])->name('posts.create');
    Route::post('tin-tuc', [AdminPostController::class, 'store'])->name('posts.store');
    Route::post('tin-tuc/tai-anh', [AdminPostController::class, 'uploadImage'])->name('posts.upload-image');
    Route::get('tin-tuc/{post}/sua', [AdminPostController::class, 'edit'])->name('posts.edit');
    Route::put('tin-tuc/{post}', [AdminPostController::class, 'update'])->name('posts.update');
    Route::post('tin-tuc/{post}/toggle', [AdminPostController::class, 'togglePublish'])->name('posts.toggle');
    Route::delete('tin-tuc/{post}', [AdminPostController::class, 'destroy'])->name('posts.destroy');

    Route::get('tin-tuc-danh-muc', [PostCategoryController::class, 'index'])->name('post-categories.index');
    Route::get('tin-tuc-danh-muc/tao', [PostCategoryController::class, 'create'])->name('post-categories.create');
    Route::post('tin-tuc-danh-muc', [PostCategoryController::class, 'store'])->name('post-categories.store');
    Route::get('tin-tuc-danh-muc/{category}/sua', [PostCategoryController::class, 'edit'])->name('post-categories.edit');
    Route::put('tin-tuc-danh-muc/{category}', [PostCategoryController::class, 'update'])->name('post-categories.update');
    Route::delete('tin-tuc-danh-muc/{category}', [PostCategoryController::class, 'destroy'])->name('post-categories.destroy');

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

// Tin tức: bài viết có thể nhúng video + bàn cờ tương tác.
Route::get('/tin-tuc', [PostController::class, 'index'])->name('posts.index');
Route::get('/tin-tuc/{categorySlug}/{postSlug}', [PostController::class, 'show'])->name('posts.show');
Route::get('/tin-tuc/{categorySlug}', [PostController::class, 'category'])->name('posts.category');

// Trang giai đoạn: /{phase} — ĐẶT CUỐI CÙNG + ràng buộc whitelist để tránh nuốt route khác.
Route::get('/{phase}', [LessonController::class, 'phase'])
    ->where('phase', 'khai-cuoc|trung-cuoc|tan-cuoc|nhap-mon|co-up')
    ->name('phase');
