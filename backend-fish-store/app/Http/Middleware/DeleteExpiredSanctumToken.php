<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

// Used in bootstrap/app.php
class DeleteExpiredSanctumToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $bearerToken = $request->bearerToken();

        if ($bearerToken) {
            $accessToken = PersonalAccessToken::findToken($bearerToken);
            // If the token exists, check if it is expired
            if ($accessToken && $accessToken->expires_at && Carbon::parse($accessToken->expires_at)->isPast()) {
                $user = $accessToken->tokenable;
                // Delete all tokens for the user
                if (config('sanctum.delete_all_tokens_on_expired') && $user) {
                    $user->tokens()->delete();
                } else {
                    // Delete only the current expired token
                    $accessToken->delete();
                }
                // Return a 401 Unauthorized response
                return response()->json([
                    'message' => 'Your session has expired. Please log in again.',
                ], 401);
            }
        }

        return $next($request);
    }
}
