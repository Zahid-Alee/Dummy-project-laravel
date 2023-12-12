<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SchoolController extends Controller
{
    public function index()
    {


        $schools = School::with('district')->get();
        return $schools;
    }

    public function show($id)
    {
        $school = School::with('district')->find($id);
        return $school;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'address' => 'nullable|string|max:255',
            'district_id' => 'required|exists:districts,id',
        ]);
        $school = School::create($validatedData);
        return response()->json($school);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'address' => 'nullable|string|max:255',
            'district_id' => 'required|exists:districts,id',
        ]);

        $school = School::findOrFail($id);
        $school->update($validatedData);

        return response()->json($school);
    }

    public function destroy($id)
    {
        $school = School::findOrFail($id);
        $school->delete();
        return response()->json(['message' => 'School deleted successfully']);
    }

}
