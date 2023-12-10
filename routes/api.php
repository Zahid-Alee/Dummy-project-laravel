<?php

use App\Http\Controllers\FeatureController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('users',[userController::class,'allUsers']);

Route::get('features',[FeatureController::class,'allFeatures']);

Route::get('get-sales-data',[SaleController::class,'getSalesData']);
Route::get('get-users-registered',[userController::class,'getUsersRegisteredPerMonth']);