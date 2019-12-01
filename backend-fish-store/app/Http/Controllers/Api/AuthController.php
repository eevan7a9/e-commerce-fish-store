<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use App\Order;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),
            [
                'name' => 'required|min:4|max:55',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed',
            ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        } else {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();
            $access_token = $user->createToken('fishstore')->accessToken;
            $user->makeHidden('id');
            return response()->json(['user' => $user, 'access_token' => $access_token], 200);
        }
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $access_token = $user->createToken('AppName')->accessToken;

            return response()->json(['user' => $user, 'access_token' => $access_token], 200);
        } else {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }
    }

    public function userInfo()
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }

    public function logout()
    {
        // we get the authenticated user
        $user = Auth::user()->token();
        // we set revoked to 1
        $user->revoke();
        return response()->json(["message" => "successfully loged out!!!"]);

        /** if you want to logout the user from all devices
         *
         * DB::table('oauth_access_tokens')
         *   ->where('user_id', Auth::user()->id)
         *   ->update([
         *       'revoked' => true
         *     ]);
         */
    }
    public function usersList()
    {
        $users = User::where('role', '=', 'buyer')->with('orders')->get();
        return response()->json($users, 200);
    }
    public function destroy(Request $request)
    {
        $user = Auth::user();
        if ($user->role === 'admin') {
            $delete_user = User::findOrFail($request->id);
            $delete_user->delete();
            return response()->json($delete_user, 200);
        }else{
            return response()->json(['message' => 'not allowed'], 403);
        }
    }
}
