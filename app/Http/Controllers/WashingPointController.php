<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\WashingPoint;
use Illuminate\Http\Request;

class WashingPointController extends Controller
{

    public function index()
    {
        $washingPoints = WashingPoint::with('plans.features')->get();
        return response()->json($washingPoints);
    }

    public function store(Request $request)
    {
        $washingPoint = new WashingPoint();
        $washingPoint->name = $request->input('name');
        $washingPoint->city = $request->input('city');
        $washingPoint->location = $request->input('location');
        $washingPoint->contact = $request->input('contact');
        $washingPoint->save();

        return response()->json(['message' => 'Washing Point created successfully']);
    }

    public function show($id)
    {
        $washingPoint = WashingPoint::findOrFail($id);
        return response()->json($washingPoint);
    }

    public function update(Request $request, $id)
    {
        $washingPoint = WashingPoint::findOrFail($id);
        $washingPoint->name = $request->input('name');
        $washingPoint->city = $request->input('city');
        $washingPoint->location = $request->input('location');
        $washingPoint->contact = $request->input('contact');
        $washingPoint->save();

        return response()->json(['message' => 'Washing Point updated successfully']);
    }

    public function destroy($id)
    {
        $washingPoint = WashingPoint::findOrFail($id);
        $washingPoint->delete();

        return response()->json(['message' => 'Washing Point deleted successfully']);
    }
}
