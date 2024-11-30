<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Get the authenticated user's information
    public function user(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
            'status' => 200
        ], 200);
    }

    public function users()
    {
        $users = User::with('orders')
            ->where('is_admin', false)
            ->get()
            ->map(function ($user) {
                $user->orders_made = $user->orders->count();
                $user->has_stripe = $user->orders->contains(function($order) {
                    return $order->payment_method === 'stripe';
                });
                unset($user->orders);
                return $user;
            });
        return response()->json([
            'data' => $users,
            'status' => 200
        ], 200);
    }

    public function getUserByID(Request $request, $id)
    {

        try {
            $user = User::with(relations: 'orders')->findOrFail($id);

            return response()->json([
                'message' => '',
                'data' => $user,
                'status' => 200
            ]);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err->getMessage(),
                'message' => "We couldn't find a user with this ID.",
                'status' => 404,
            ], 404);
        }
    }
}
