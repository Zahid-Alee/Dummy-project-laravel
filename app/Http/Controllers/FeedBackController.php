<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FeedBack;
use App\Models\User;
use Illuminate\Http\Request;

class FeedBackController extends Controller
{


    public function index()
    {
        $feedbacks = Feedback::with('users')->get();
        $data = [];
        foreach ($feedbacks as $feedback) {
            $userData = [
                'user' => User::find($feedback->user_id)->first(),
            ];
            $feedbackData = [
                'message' => $feedback->message,
                'created'=>$feedback->created_at,
            ];
            $data[] = array_merge($userData, $feedbackData);
        }
        return response()->json($data);
    }
    public function store(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'message' => 'required',
        ]);

        $feedback = Feedback::create([
            'user_id' => $user->id,
            'message' => $request->input('message'),
        ]);

        return response()->json(['message' => 'Feedback created successfully', 'data' => $feedback], 201);
    }

    // Get a specific feedback by ID
    public function show($id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        return response()->json(['data' => $feedback]);
    }

    // Update a specific feedback by ID
    public function update(Request $request, $id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required',
        ]);

        $feedback->user_id = $request->input('user_id');
        $feedback->message = $request->input('message');
        $feedback->save();

        return response()->json(['message' => 'Feedback updated successfully', 'data' => $feedback]);
    }

    // Delete a specific feedback by ID
    public function destroy($id)
    {
        $feedback = FeedBack::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        $feedback->delete();

        return response()->json(['message' => 'Feedback deleted successfully']);
    }

}
