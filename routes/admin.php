<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\SubscriptionController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Routes accessible to authenticated users
    
    Route::get('/admin/dash', function () {
        return Inertia::render('Admin/main');
    })->middleware(['admin.role'])->name('dashboard');

    Route::get('/admin/dash/{any}', function ($any) {
        return Inertia::render('Admin/main');
    })->middleware(['admin.role'])->where('any', '.*');

    // Other routes accessible to authenticated users...

    Route::prefix('plans')->middleware(['admin.role'])->group(function () {
        Route::get('/', [PlanController::class, 'index']); 
        Route::post('/', [PlanController::class, 'store']); 
        Route::delete('/{plan}', [PlanController::class, 'destroy']); 
        Route::get('/{plan}', [PlanController::class, 'show']); 
        Route::put('/{plan}', [PlanController::class, 'update']); 
    });

    // Other admin-only routes...
});
Route::prefix('plans')->group(function () {
    Route::get('/', [PlanController::class, 'index']); 
    Route::post('/', [PlanController::class, 'store']); 
    Route::delete('/{plan}', [PlanController::class, 'destroy']); 
    Route::get('/{plan}', [PlanController::class, 'show']); 
    Route::put('/{plan}', [PlanController::class, 'update']); 
});

Route::middleware('auth:sanctum')->group(function () {
    // Routes accessible to authenticated users but not limited to 'admin' role
    
    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    
    // Other routes accessible to authenticated users...

    Route::middleware(['admin.role'])->group(function () {
        // Additional admin-specific routes under 'auth:sanctum'
        Route::delete('/unsubscribe/{planId}', [SubscriptionController::class, 'deleteSubscription']);
        Route::get('/show-subscriptions', [SubscriptionController::class, 'showSubscriptions']);
        Route::post('/accept-req', [SubscriptionController::class, 'accept']);
        Route::post('/rej-req', [SubscriptionController::class, 'reject']);

        // Other admin-only routes...
    });
});