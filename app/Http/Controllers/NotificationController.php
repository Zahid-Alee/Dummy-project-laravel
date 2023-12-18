<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    
    public function index(Request $request)
    {

        $notifications = Notification::where('user_id',$request->user()->id)->get();
        return $notifications;
    }

   
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        
        $user_id= $request->input('user_id');
        $plan_id= $request->input('plan_id');

        $user = User::find($user_id);
        $plan = Plan::find($plan_id);
        
        $notification = new Notification([
            'message'=>'you are subscribed to ', $plan->title,
        ]);

        $user->notifications()->save($notification);
        $plan->notifications()->save($notification);

    }

    
    public function show(string $id)
    {
        //
    }

    
    public function edit(string $id)
    {
        //
    }

    
    public function update(Request $request, string $id)
    {
        //
    }

  
    public function destroy(string $id)
    {
        //
    }
}
