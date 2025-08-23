<?php

use App\Http\Middleware\CheckRole;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Register global middleware here if needed
        // $middleware->append(\App\Http\Middleware\CheckRole::class);

    })
    //   ->withRouteMiddleware([
    //         'role' => \App\Http\Middleware\CheckRole::class,
    //     ])
    // ->withMiddleware([
    //     // Global middleware (runs on every request)
    //     \App\Http\Middleware\CheckRole::class,
    // ])
    ->withExceptions(function (Exceptions $exceptions): void {
        // Exception handling
    })->create();
