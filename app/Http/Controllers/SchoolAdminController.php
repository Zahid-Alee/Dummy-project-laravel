<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\SchoolAdmin;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SchoolAdminController extends Controller
{



    public function chartsData(Request $request)
    {

        $user_id = $request->user()->id;
        $schoolAdmin = SchoolAdmin::where('user_id', $user_id)->first();

        if ($schoolAdmin) {
            $school_id = $schoolAdmin->school_id;
            $classCounts = StudentClass::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
                ->groupBy(DB::raw('MONTH(created_at)'))->where('school_id', $school_id)
                ->get();

            $barChartData = [
                'labels' => [],
                'data' => []
            ];

            foreach ($classCounts as $classCount) {
                $monthNumber = $classCount->month;
                $monthName = date("F", mktime(0, 0, 0, $monthNumber, 1));
                $barChartData['labels'][] = $monthName;
                $barChartData['data'][] = $classCount->count;
            }

            $studentCounts = Student::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))->where('school_id', $school_id)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->get();

            $pieChartData = [];

            foreach ($studentCounts as $studentCount) {
                $monthNumber = $studentCount->month;
                $monthName = date("F", mktime(0, 0, 0, $monthNumber, 1));
                $pieChartData[$monthName] = $studentCount->count;
            }

            return response()->json([
                'bar_chart_data' => $barChartData,
                'pie_chart_data' => $pieChartData
            ]);
        }
    }
    public function getDash(Request $request)
    {
        $user_id = $request->user()->id;
        $schoolAdmin = SchoolAdmin::where('user_id', $user_id)->first();

        if ($schoolAdmin) {

            $school_id = $schoolAdmin->school_id;
            $teachersCount = Teacher::where('school_id', $school_id)->count();
            $studentsCount = Student::where('school_id', $school_id)->count();
            $classesCount = StudentClass::where('school_id', $school_id)->count();

            return response()->json([
                'teachers_count' => $teachersCount,
                'students_count' => $studentsCount,
                'classes_count' => $classesCount
            ]);

        } else {

            $teachersCount = Teacher::count();
            $studentsCount = Student::count();
            $classesCount = StudentClass::count();

            return response()->json([
                'teachers_count' => $teachersCount,
                'students_count' => $studentsCount,
                'classes_count' => $classesCount
            ]);
        }

    }

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
