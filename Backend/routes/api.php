<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\ClaimsController;
use App\Http\Controllers\ProductionController;

use Illuminate\Http\Request;

Route::get('/test', function () {
    return 'API works';
});
//authentication
Route::post('/signup', [SignupController::class, 'signup']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json(['user' => $request->user()]);
});
// Route::post('/changepassword', [LoginController::class, 'changepassword']);
// Route::middleware(['auth:sanctum'])->group(
//     function () {

//claims
Route::post('/create-claims-data', [ClaimsController::class, 'createclaimsdata'])->middleware('auth:sanctum');
Route::post('/get-claims-data', [ClaimsController::class, 'getclaimsdata'])->middleware('auth:sanctum');
Route::post('/edit-claims-data', [ClaimsController::class, 'editclaimsdata'])->middleware('auth:sanctum');
Route::post('/claims-by-id/{id}', [ClaimsController::class, 'claimsbyid'])->middleware('auth:sanctum');
Route::post('/delete-claims-data/{id}', [ClaimsController::class, 'deleteclaimsdata'])->middleware('auth:sanctum');

//production
Route::post('/create-production-data', [ProductionController::class, 'createproductiondata'])->middleware('auth:sanctum');
Route::post('/get-production-data', [ProductionController::class, 'getproductiondata'])->middleware('auth:sanctum');
Route::post('/edit-production-data', [ProductionController::class, 'editproductiondata'])->middleware('auth:sanctum');
Route::post('/production-by-id/{id}', [ProductionController::class, 'productionbyid'])->middleware('auth:sanctum');
Route::post('/delete-production-data/{id}', [ProductionController::class, 'deleteproductiondata'])->middleware('auth:sanctum');
    // }
// ->middleware('auth:sanctum')













// Route::get('/db-test', function () {
//     try {
//         DB::connection()->getPdo();
//         return ' Connected to database: ' . DB::connection()->getDatabaseName();
//     } catch (\Exception $e) {
//         return ' Could not connect: ' . $e->getMessage();
//     }
// });