<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!$request->user() || !$request->user()->is_admin) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Unauthorized. Admin access only.',
                'status' => 403
            ], 403);
        }
        return $next($request);
    }
}
