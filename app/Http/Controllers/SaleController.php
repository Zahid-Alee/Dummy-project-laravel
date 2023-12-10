<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function getSalesData(Request $request)
    {
        // Retrieve sales data with plans including trashed plans
        $salesData = Sale::with(['plan' => function ($query) {
            $query->withTrashed(); // Retrieve both regular and trashed plans
        }])->get();

        return response()->json($salesData);
    }
}
