<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Sale;
use Illuminate\Http\Request;
use App\Models\Plan;
use App\Models\User;

class SubscriptionController extends Controller
{
    public function index()
    {
        $users = User::with('plans')->get();

        $formattedUsers = $users->map(function ($user) {
            $userPlans = $user->plans->map(function ($plan) {
                return [
                    'id' => $plan->id,
                    'title' => $plan->title,
                    'price' => $plan->price,
                ];
            });

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created' => $user->updated_at,
                'plans' => $userPlans,
            ];
        });

        return response()->json($formattedUsers);
    }

    public function accept(Request $request)
    {

        $userid = $request->input('user_id');
        $user= User::find($userid);
        $planId = $request->input('plan_id');
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $plan = Plan::findOrFail($planId);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }

        $notificationMessage = 'You are subscribed to ' . $plan->title;
        $notification = new Notification([
            'message' => $notificationMessage,
        ]);

        $user->notifications()->save($notification);

        $sale = new Sale([
            'user_id' => $userid,
            'plan_id' => $planId,
            'price' => $plan->price,
        ]);
        $sale->save();

        $user->plans()->detach($planId);
        return response()->json(['succcess'=>true,'message'=>'accepted request']);
    }

    public function reject(Request $request)
    {

        $userid = $request->input('user_id');
        $user= User::find($userid);
        $planId = $request->input('plan_id');
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $plan = Plan::findOrFail($planId);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }

        $notificationMessage = 'You request has been rejected' . $plan->title;
        $notification = new Notification([
            'message' => $notificationMessage,
        ]);

        $user->notifications()->save($notification);

        $sale = new Sale([
            'user_id' => $userid,
            'plan_id' => $planId,
            'price' => $plan->price,
        ]);
        $sale->save();
        $user->plans()->detach($planId);
        return response()->json(['succcess'=>true,'message'=>'accepted request']);
    }
    public function subscribe(Request $request, $planId)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $plan = Plan::findOrFail($planId);
        if (!$plan) {
            return response()->json(['message' => 'Plan not found'], 404);
        }
        $user->plans()->attach($planId);

        return response()->json(['message' => 'Subscribed successfully']);
    }


    public function deleteSubscription(Request $request, $planId)
    {
        $user = $request->user();
        $user->plans()->detach($planId);

        return response()->json(['message' => 'Subscription deleted successfully']);
    }

    public function showSubscriptions(Request $request)
    {
        $user = $request->user();
        $subscriptions = $user->plans()->get();

        return response()->json($subscriptions);
    }

}
