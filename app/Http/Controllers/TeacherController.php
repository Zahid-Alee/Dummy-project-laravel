<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\Section;
use App\Models\StudentClass;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class TeacherController extends Controller
{

    public function index()
    {
        $users = User::where('role', 'teacher')->get();
        $teachers = [];
        foreach ($users as $user) {
            $teacher = Teacher::where('user_id', $user->id)->first();
            if ($teacher) {
                $classes = StudentClass::where('id', $teacher->class_id)->get(['id', 'name', 'grade']);
                $schools = School::where('id', $teacher->school_id)->get(['id', 'name']);
                $sections = Section::where('id', $teacher->section_id)->get(['id', 'name']);
                $teachers[] = [
                    'user_id' => $user->id,
                    'id' => $teacher->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'school_id' => $teacher->school_id,
                    'classes' => $classes,
                    'schools' => $schools,
                    'sections' => $sections,
                ];
            }
        }
        return response()->json($teachers);
    }

    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'school_id' => 'required|integer',
            'class_id' => 'required|integer',
            'section_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'user_id' => 'required|integer',
        ]);

        $teacher = Teacher::create([
            'school_id' => $validatedData['school_id'],
            'name' => $validatedData['name'],
            'user_id' => $validatedData['user_id'],
            'class_id' => $validatedData['class_id'],
            'section_id' => $validatedData['section_id'],
        ]);

        return response()->json($teacher);
    }


    public function show($id)
    {
        $teacher = Teacher::findOrFail($id);
        return response()->json($teacher);
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);
        $validatedData = $request->validate([
            'school_id' => 'required|integer',
            'class_id' => 'required|integer',
        ]);
        $teacher->update($validatedData);
        return response()->json($teacher);
    }

    public function destroy($id)
    {
        // Find the teacher by ID
        $teacher = Teacher::findOrFail($id);

        // Soft delete the teacher
        $teacher->delete();

        // Return a success message as JSON
        return response()->json(['message' => 'Teacher deleted successfully']);
    }
}
