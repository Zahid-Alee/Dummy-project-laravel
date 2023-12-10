<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminRole
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated and has the 'admin' role
        if ($request->user() && $request->user()->role !== 'admin') {
            // Redirect or return an error response as needed
            return redirect()->route('home')->with('error', 'Unauthorized access');
        }

        return $next($request);
    }
}
