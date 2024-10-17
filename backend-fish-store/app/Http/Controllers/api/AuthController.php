<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'message' => 'User registered successfully', 
            'data' => $user,
            'status' => 201
        ], 201);
    }

    // Login a user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid',
                'message' => 'Invalid Credentials',
                'status' => 401
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'Signin successful',
            'data' => $user,
            'token' => $token,
            'status' => 200
        ], 200);
    }

    // Logout a user (Revoke token)
    public function logout(Request $request)
    {
        // Revoke the user's current token
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logout successful',
            'status' => 200
        ], 200);
    }

    // Get the authenticated user's information
    public function user(Request $request)
    {
        return response()->json([
            'data' => $request->user(),
            'status' => 200
        ], 200);
    }

    public function changePassword(Request $request) {
        $validated = $request->validate([
            'password' => 'required|string',
            'new_password' => 'required|string|confirmed'
        ]);

        $user = $request->user();
        $password = $validated['password'];

        if(!Hash::check($password, $user->password)) {
            return response()->json([
                'message' => 'Invalid password',
                'status' => 403
            ], 403);
        }
    
        $user->password = Hash::make($validated['new_password']);
        $user->save();

        return response()->json([
            'message' => 'Password Changed',
            'data' => $user,
            'status' => 200
        ], 200);
    }
}
