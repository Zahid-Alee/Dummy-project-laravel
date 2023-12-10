<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Feature;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::with('features')->get();
        return response()->json($plans);
    }

    public function store(Request $request)
    {

        $planData = $request->only(['title', 'price']);
        $selectedFeatureIds = $request->input('feature_ids', []);

        $plan = Plan::create($planData);
        $plan->features()->attach($selectedFeatureIds);
        return response()->json($plan);
    }

    public function show($id)
    {
        $plan = Plan::with('features')->find($id);

        if (!$plan) {
            return response()->json(['error' => 'Plan not found'], 404);
        }

        return response()->json($plan);
    }

    public function update(Request $request, $id)
    {
        $plan = Plan::find($id);

        if (!$plan) {
            return response()->json(['error' => 'Plan not found'], 404);
        }

        $plan->update($request->only(['title', 'price']));
        $selectedFeatureIds = $request->input('feature_ids', []);
        $plan->features()->sync($selectedFeatureIds);

        return response()->json($plan);
    }

    public function destroy($id)
    {
        $plan = Plan::find($id);

        if (!$plan) {
            return response()->json(['error' => 'Plan not found'], 404);
        }

        $plan->features()->detach();
        $plan->delete();

        return response()->json(['message' => 'Plan deleted successfully']);
    }
}

