<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\District;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    public function index()
    {
        // Retrieve all districts
        $districts = District::all();
        return response()->json($districts);
    }
}
