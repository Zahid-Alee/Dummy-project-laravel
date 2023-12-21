<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SchoolAdminController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\userController;
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


Route::group(['middleware' => 'auth'], function () {


    Route::get('/schools', [SchoolController::class, 'index']);
    Route::get('/classes', [StudentClassController::class, 'index']);
    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::get('/sections', [SectionController::class, 'index']);
    Route::get('/students', [StudentController::class, 'index'])->name('user.getall');
    Route::get('/check_role/{id}', [userController::class, 'checkRole']);
    Route::get('/getclasses/{id}', [StudentClassController::class, 'getClasses']);
    Route::get('/get-by-section/{id}', [StudentController::class, 'sections']);
    Route::get('/getsections/{id}', [SectionController::class, 'getSections']);
    Route::get('/classes/{id}', [StudentClassController::class, 'show']);
    Route::get('/schools/{id}', [SchoolController::class, 'show']);
    Route::get('/sections/{id}', [SectionController::class, 'show']);
    Route::get('/students/{id}', [StudentController::class, 'show'])->name('user.show');
    Route::get('/get-dash-data',[SchoolAdminController::class,'getDash']);
    Route::get('/school-charts',[SchoolAdminController::class,'chartsData']);



    Route::prefix('admin')->group(function () {
        Route::get('/dash', function () {
            return Inertia::render('Admin/main');
        })->name('admin.dashboard');

        Route::get('/{any}', function () {
            return Inertia::render('Admin/main');
        })->where('any', '.*');
    });

    Route::prefix('school-admin')->group(function () {
        Route::get('/classes', function () {
            return Inertia::render('Admin/school_admin');
        })->name('school.admin.dashboard');

        Route::get('/{any}', function () {
            return Inertia::render('Admin/school_admin');
        })->where('any', '.*');
    });


    Route::prefix('teacher')->group(function () {
        Route::get('/classes', function () {
            return Inertia::render('Admin/teacher_main');
        })->name('teacher.dashboard');

        Route::get('/{any}', function () {
            return Inertia::render('Admin/teacher_main');
        })->where('any', '.*');
    });

    Route::group(['middleware' => 'admin'], function () {

        Route::get('/reports', 'ReportController@index');

        Route::post('/teachers', [TeacherController::class, 'store']);
        Route::get('/teachers/{id}', [TeacherController::class, 'show']);
        Route::put('/teachers/{id}', [TeacherController::class, 'update']);
        Route::delete('/teachers/{id}', [TeacherController::class, 'destroy']);
        Route::get('/districts', [DistrictController::class, 'index']);

        Route::post('/districts', 'DistrictController@store')->name('');
        Route::get('/districts/{id}', 'DistrictController@show');
        Route::put('/districts/{id}', 'DistrictController@update');
        Route::delete('/districts/{id}', 'DistrictController@destroy');

        Route::get('/users', [userController::class, 'index'])->name('user.getall');
        Route::post('/users', [userController::class, 'register'])->name('user.store');
        Route::get('/users/{id}', [userController::class, 'show'])->name('user.show');
        Route::put('/users/{id}', [userController::class, 'update'])->name('user.update');
        Route::delete('/users/{id}', [userController::class, 'destroy'])->name('user.delete');

        Route::post('/schools', [SchoolController::class, 'store']);
        Route::put('/schools/{id}', [SchoolController::class, 'update']);
        Route::delete('/schools/{id}', [SchoolController::class, 'destroy']);

        Route::get('/admins', [SchoolAdminController::class, 'index'])->name('admins.getall');
        Route::post('/admins', [SchoolAdminController::class, 'store'])->name('admins.store');
        Route::get('/admins/{id}', [SchoolAdminController::class, 'show'])->name('admins.show');
        Route::put('/admins/{id}', [SchoolAdminController::class, 'update'])->name('admins.update');
        Route::delete('/admins/{id}', [SchoolAdminController::class, 'destroy'])->name('admins.delete');

    });

    Route::group(['middleware' => 'school_admin'], function () {

        Route::post('/sections', [SectionController::class, 'store']);
        Route::put('/sections/{id}', [SectionController::class, 'update']);
        Route::delete('/sections/{id}', [SectionController::class, 'destroy']);

        Route::post('/classes', [StudentClassController::class, 'store']);
        Route::put('/classes/{id}', [StudentClassController::class, 'update']);
        Route::delete('/classes/{id}', [StudentClassController::class, 'destroy']);

        Route::get('/enrollments', 'EnrollmentController@index');
        Route::post('/enrollments', 'EnrollmentController@store');
        Route::get('/enrollments/{id}', 'EnrollmentController@show');
        Route::put('/enrollments/{id}', 'EnrollmentController@update');
        Route::delete('/enrollments/{id}', 'EnrollmentController@destroy');

        Route::post('/students', [StudentController::class, 'store'])->name('user.store');
        Route::put('/students/{id}', [StudentController::class, 'update'])->name('user.update');
        Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('user.delete');
    });


    Route::group(['middleware' => 'teacher'], function () {

        Route::get('/attendance', [AttendanceController::class,'index']);
        Route::post('/attendance',[ AttendanceController::class,'store']);
        Route::get('/attendance/{id}',[AttendanceController::class,'show']);
        Route::put('/attendance/{id}', [AttendanceController::class,'update']);
        Route::delete('/attendance/{id}', [AttendanceController::class,'destroy']);
    });

    Route::group(['middleware' => 'admin'], function () {
        Route::get('/staff', 'StaffController@index');
        Route::post('/staff', 'StaffController@store');
        Route::get('/staff/{id}', 'StaffController@show');
        Route::put('/staff/{id}', 'StaffController@update');
        Route::delete('/staff/{id}', 'StaffController@destroy');
    });

});


require __DIR__ . '/auth.php';
require __DIR__ . '/user.php';