<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SchoolAdmin;
use App\Models\Student;
use App\Models\Teacher;
use Auth;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // use App\Models\Student;



    public function sections(Request $request, $id)
    {
        $students = Student::with('attendances', 'school', 'section', 'classModel')->where('section_id', $id)->get();
        return response()->json($students);
    }
    public function index(Request $request)
    {

        $user = Auth::user();
        $role = $user->role;

        if ($role === 'teacher') {
            $teacher = Teacher::where('user_id', $user->id)->first();
            if ($teacher) {

                $section_id = $teacher->section_id;
                $students = Student::with('school', 'section', 'classModel')->where('section_id', $section_id)->get();
                return response()->json($students);

            }

        } elseif ($role === 'admin') {
            $students = Student::with('school', 'section', 'classModel')->get();
            return response()->json($students);
        } elseif ($role === 'school_admin') {
            $schoolAdmin = SchoolAdmin::where('user_id', $user->id)->first();

            if ($schoolAdmin) {
                $school_id = $schoolAdmin->school_id;
                $students = Student::with('school', 'section', 'classModel')->where('school_id', $school_id)->get();
                return response()->json($students);

            }

        } else {
            $students = [];
        }
    }





    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'class_id' => 'required|integer',
            'section_id' => 'required|integer',
            'name' => 'required|string|max:100',
            'birthdate' => 'required|date',
            'parent_name' => 'required|string|max:100',
            'address' => 'nullable|string',
        ]);
        $user_id = $request->user()->id;
        $schoolAdmin = SchoolAdmin::where('user_id', $user_id)->first();
        if ($schoolAdmin) {

            $school_id = $schoolAdmin->school_id;
            $validatedData['school_id'] = $school_id;

            $student = Student::create($validatedData);

            return response()->json($student);
        }

    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $validatedData = $request->validate([
            'school_id' => 'required|integer',
            'class_id' => 'required|integer',
            'section_id' => 'required|integer',
            'name' => 'required|string|max:100',
            'birthdate' => 'required|date',
            'parent_name' => 'required|string|max:100',
            'address' => 'nullable|string',
        ]);
        $student->update($validatedData);
        return response()->json($student);
    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        $student->delete();
        return response()->json(['message' => 'Student deleted successfully']);
    }
}
