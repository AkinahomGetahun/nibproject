<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\ClaimsController;
use App\Http\Controllers\ProductionController;

Route::get('/test', function () {
    return 'API works';
});
//authentication
Route::post('/signup', [SignupController::class, 'signup']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
// Route::post('/changepassword', [L::class, 'changepassword']);

//claims
Route::post('/create-claims-data', [ClaimsController::class, 'createclaimsdata']);
Route::post('/get-claims-data', [ClaimsController::class, 'getclaimsdata']);
Route::post('/edit-claims-data', [ClaimsController::class, 'editclaimsdata']);
Route::post('/claims-by-id/{id}', [ClaimsController::class, 'claimsbyid']);
Route::post('/delete-claims-data/{id}', [ClaimsController::class, 'deleteclaimsdata']);

//production
Route::post('/create-production-data', [ProductionController::class, 'createproductiondata']);
Route::post('/get-production-data', [ProductionController::class, 'getproductiondata']);
Route::post('/edit-production-data', [ProductionController::class, 'editproductiondata']);
Route::post('/production-by-id/{id}', [ProductionController::class, 'productionbyid']);
Route::post('/delete-production-data/{id}', [ProductionController::class, 'deleteproductiondata']);















// Route::get('/db-test', function () {
//     try {
//         DB::connection()->getPdo();
//         return ' Connected to database: ' . DB::connection()->getDatabaseName();
//     } catch (\Exception $e) {
//         return ' Could not connect: ' . $e->getMessage();
//     }
// });