<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StatsController;

// Public
Route::post('auth/login',    [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

// Authenticated
Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/verify',           [AuthController::class, 'verify']);
    Route::post('auth/change-password', [AuthController::class, 'changePassword']);

    Route::get('company',  [CompanyController::class, 'show']);
    Route::post('company', [CompanyController::class, 'save']);

    Route::apiResource('catalog', CatalogController::class);
    Route::apiResource('clients', ClientController::class);
    Route::apiResource('quotes',  QuoteController::class);

    Route::get('stats', [StatsController::class, 'index']);

    Route::middleware('admin')->group(function () {
        Route::get('users',           [UserController::class, 'index']);
        Route::post('users',          [UserController::class, 'store']);
        Route::put('users/{user}',    [UserController::class, 'update']);
        Route::delete('users/{user}', [UserController::class, 'destroy']);
    });
});
