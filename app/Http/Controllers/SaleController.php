<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use App\Models\FeedBack;
use App\Models\Plan;
use App\Models\Sale;
use App\Models\User;
use App\Models\WashingPoint;
use Illuminate\Http\Request;

class SaleController extends Controller
{

    public function index()
    {
        $plansCount = Plan::count();
        $featuresCount = Feature::count();
        $usersCount = User::count();
        $soldPlansCount = Sale::count();
        $washingPointsCount = WashingPoint::count();
        $reviewsCount = FeedBack::count();

        $data = [
            'plans_count' => $plansCount,
            'features_count' => $featuresCount,
            'users_count' => $usersCount,
            'sold_plans_count' => $soldPlansCount,
            'washing_points_count' => $washingPointsCount,
            'reviews_count' => $reviewsCount,
        ];

        return response()->json($data);
    }

    public function getSalesData(Request $request)
    {
        // Retrieve sales data with plans including trashed plans
        $salesData = Sale::with(['plan' => function ($query) {
            $query->withTrashed(); // Retrieve both regular and trashed plans
        }])->get();

        return response()->json($salesData);
    }
}
