<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::all();
        return view('attendances.index', compact('attendances'));
    }

    public function store(Request $request)
    {
        $attendanceData = $request->validate([
            'attendanceData' => 'required|array',
            'attendanceData.*.student_id' => 'required|exists:students,id',
            'attendanceData.*.section_id' => 'required|exists:sections,id',
            'attendanceData.*.attendances' => 'required|array',
            'attendanceData.*.attendances.*.date' => 'required|date_format:Y-m-d',
            'attendanceData.*.attendances.*.status' => 'required|string|in:Present,Absent',
            'attendanceData.*.attendances.*.id' => 'required|exists:attendances,id',

        ]);

        try {
            foreach ($attendanceData['attendanceData'] as $data) {

                $studentId = $data['student_id'];
                $sectionId = $data['section_id'];

                foreach ($data['attendances'] as $attendance) {

                    $date = $attendance['date'];
                    $status = $attendance['status'];
                    $recordId = $attendance['id'];

                    Attendance::updateOrCreate(
                        ['id' => $recordId,
                            'student_id' => $studentId,
                            'section_id' => $sectionId,
                            'date' => $date,
                        ],
                        [
                            'status' => $status,
                        ]
                    );
                }
            }

            return response()->json(['message' => 'Attendance updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update attendance', 'error' => $e->getMessage()], 500);
        }
    }







    public function update(Request $request, Attendance $attendance)
    {
        $validatedData = $request->validate([
            'student_id' => 'required|exists:students,id',
            'section_id' => 'required|exists:sections,id',
            'date' => 'required|date',
            'status' => 'required',
        ]);

        $attendance->update($validatedData);

        return new JsonResponse([
            'message' => 'Attendance updated successfully',
            'data' => $attendance
        ], 200);
    }

    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return new JsonResponse(['message' => 'Attendance deleted successfully'], 200);
    }
    public function show($id)
    {
        return new JsonResponse(Attendance::with('section', 'student')->where('section_id', $id)->get(), 200);
    }
}
