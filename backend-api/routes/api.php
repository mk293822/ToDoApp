<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::middleware('web')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    });

    // Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthenticatedSessionController::class, 'user']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    // Dashboard Routes
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
