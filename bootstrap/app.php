<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureAdmin::class,
            'staff' => \App\Http\Middleware\EnsureStaff::class,
        ]);
        $middleware->web(append: [
            \App\Http\Middleware\EnsureNotBanned::class,
            \App\Http\Middleware\TouchLastSeen::class,
            \App\Http\Middleware\LogAccess::class,
            \App\Http\Middleware\TrackVisit::class,
        ]);
        $middleware->redirectGuestsTo(fn () => route('login'));
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
        // 404 → tra bảng chuyển hướng 301 (Admin › Cài đặt web & SEO › Chuyển hướng) trước khi báo không tìm thấy.
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, Request $request) {
            if (! $request->isMethod('GET')) return null;
            try {
                $to = \App\Models\UrlRedirect::lookup('/' . ltrim($request->path(), '/'));
            } catch (\Throwable $x) {
                $to = null;
            }
            return $to ? redirect($to, 301) : null;
        });
    })->create();
