<?php

use App\Http\Controllers\FeedBackController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WashingPointController;
use App\Models\Notification;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dash', function () {
    return Inertia::render('');
});

Route::post('/subscribe/{planId}', [SubscriptionController::class, 'subscribe']);

Route::get('/get-all-data', [SaleController::class, 'index'])->name('user.getall');
Route::get('/feedbacks', [FeedBackController::class, 'index'])->name('user.getall');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/users', [userController::class, 'index'])->name('user.getall');
Route::post('/users', [UserController::class, 'register'])->name('user.store');
Route::get('/users/{id}', [userController::class, 'show'])->name('user.show');
Route::put('/users/{id}', [userController::class, 'update'])->name('user.update');
Route::delete('/users/{id}', [userController::class, 'destroy'])->name('user.delete');


Route::get('/points', [WashingPointController::class, 'index'])->name('user.getall');
Route::post('/points', [WashingPointController::class, 'store'])->name('user.store');
Route::get('/points/{id}', [WashingPointController::class, 'show'])->name('user.show');
Route::put('/points/{id}', [WashingPointController::class, 'update'])->name('user.update');
Route::delete('/points/{id}', [WashingPointController::class, 'destroy'])->name('user.delete');


Route::post('/feedbacks', [FeedBackController::class, 'store'])->name('user.getall');

Route::prefix('notifications')->group(function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::post('/', [NotificationController::class, 'store']);
    Route::delete('/{plan}', [NotificationController::class, 'destroy']);
    Route::get('/{plan}', [NotificationController::class, 'show']);
    Route::put('/{plan}', [NotificationController::class, 'update']);

});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';

