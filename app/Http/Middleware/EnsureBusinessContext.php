<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureBusinessContext
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && ! $user->business_id && ! $request->routeIs('businesses.*', 'logout')) {
            return redirect()->route('businesses.create');
        }

        return $next($request);
    }
}