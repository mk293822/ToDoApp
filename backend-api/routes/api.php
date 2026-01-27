<?php

use App\Http\Controllers\Api\Auth\AuthenticatedController;
use App\Http\Controllers\Api\Auth\RegisteredUserController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Authenticated User Routes
    Route::post('/logout', [AuthenticatedController::class, 'logout']);

    // Dashboard Routes
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
