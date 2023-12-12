<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\SchoolAdmin;
use Illuminate\Http\Request;
use App\Models\User;

class SchoolAdminController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'school_admin')->get();
        $admins = [];
        foreach ($users as $user) {
            $admin = SchoolAdmin::where('user_id', $user->id)->first();
            if ($admin) {
                $schools = School::where('id', $admin->school_id)->get(['id', 'name']);
                $admins[] = [
                    'user_id' => $user->id,
                    'id' => $admin->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'school_id' => $admin->school_id,
                    'schools' => $schools,
                ];
            }
        }
        return response()->json($admins);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'school_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'user_id' => 'required|integer',
        ]);

        $admin = SchoolAdmin::create([
            'school_id' => $validatedData['school_id'],
            'name' => $validatedData['name'],
            'user_id' => $validatedData['user_id'],
        ]);

        return response()->json($admin);
    }


    public function show($id)
    {
        $admin = SchoolAdmin::findOrFail($id);
        return response()->json($admin);
    }

    public function update(Request $request, $id)
    {
        $admin = SchoolAdmin::findOrFail($id);
        $validatedData = $request->validate([
            'school_id' => 'required|integer',
        ]);
        $admin->update($validatedData);
        return response()->json($admin);
    }

    public function destroy($id)
    {
        $admin = User::findOrFail($id);
        $admin->delete();

        return response()->json(['message' => 'SchoolAdmin deleted successfully']);
    }

}
