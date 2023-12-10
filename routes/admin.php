<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/admin/dash', function () {
    return Inertia::render('Admin/main');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin/dash/{any}', function ($any) {
    return Inertia::render('Admin/main');
})->where('any', '.*');

