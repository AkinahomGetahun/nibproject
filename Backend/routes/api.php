<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SignupController;

Route::get('/test', function () {
    return 'API works';
});
Route::post('/signup', [SignupController::class, 'signup']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

// Route::get('/db-test', function () {
//     try {
//         DB::connection()->getPdo();
//         return ' Connected to database: ' . DB::connection()->getDatabaseName();
//     } catch (\Exception $e) {
//         return ' Could not connect: ' . $e->getMessage();
//     }
// });