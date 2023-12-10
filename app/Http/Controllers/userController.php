<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class userController extends Controller
{
    //use

    public function allUsers()
    {
        $users = User::all();
        
        return $users;
    }

    public function getUsersRegisteredPerMonth()
{
    $userRegistrationData = User::select(DB::raw('YEAR(created_at) as year, MONTH(created_at) as month, COUNT(*) as user_count'))
        ->groupBy(DB::raw('YEAR(created_at)'), DB::raw('MONTH(created_at)'))
        ->get();

    return response()->json($userRegistrationData);
}
}
