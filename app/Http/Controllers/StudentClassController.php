<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SchoolAdmin;
use App\Models\StudentClass;
use App\Models\Teacher;
use Illuminate\Http\Request;

class StudentClassController extends Controller
{


    // Index - Get all classes
    public function index(Request $request)
    {

        $user_id = $request->user()->id;
        $schoolAdmin = SchoolAdmin::where('user_id', $user_id)->first();
        $teacher = Teacher::where('user_id', $user_id)->first();
        if ($schoolAdmin) {
            $school_id = $schoolAdmin->school_id;
            $classes = StudentClass::with('school')->where('school_id', $school_id)->get();
            return response()->json($classes);
        } elseif ($teacher) {
            $classes = StudentClass::with('school')->where('id', $teacher->class_id)->get();
            return response()->json($classes);
        } else {
            $classes = StudentClass::with('school')->get();
            return response()->json($classes);
        }

    }
    public function getClasses($id)
    {


        $classes = StudentClass::with('school')->where('school_id', $id)->get();
        return response()->json($classes);
    }

    // Store - Add new class
    public function store(Request $request)
    {
        $user_id = $request->user()->id;
        $schoolAdmin = SchoolAdmin::where('user_id', $user_id)->first();

        if ($schoolAdmin) {
            $school_id = $schoolAdmin->school_id;

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'grade' => 'required|string|max:10',
            ]);

            // Add the school_id to the validated data before creating the class
            $validatedData['school_id'] = $school_id;

            $class = StudentClass::create($validatedData);
            return response()->json($class);
        } else {
            return response()->json(['error' => 'SchoolAdmin not found'], 404);
        }
    }



    public function show($id)
    {
        $class = StudentClass::find($id);
        return response()->json($class);
    }

    public function update(Request $request, $id)
    {
        $class = StudentClass::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'grade' => 'required|string|max:10',
        ]);

        $class->update($validatedData);
        return response()->json($class);
    }

    // Destroy - Delete a specific class
    public function destroy($id)
    {
        $class = StudentClass::findOrFail($id);
        $class->delete();

        return response()->json(['message' => 'Class deleted successfully']);
    }
}
