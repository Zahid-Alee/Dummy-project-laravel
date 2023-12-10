<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{

    public function store(Request $request)
    {
        $selectedFeatures = $request->input('features', []);

        // Assuming Feature model exists
        foreach ($selectedFeatures as $feature) {
            Feature::create([
                'name' => $feature,
            ]);
        }
    }

    public function allFeatures()
    {
        return Feature::all();

    }
    //
}
