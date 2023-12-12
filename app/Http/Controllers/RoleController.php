<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index(Request $request,$id){
    
        $role = $request->user()->role;
        return $role->name;
       
    }
}
