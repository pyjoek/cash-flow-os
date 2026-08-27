<?php

namespace App\Http\Controllers;

use App\Models\Business;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Businesses/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'currency' => ['required', 'string', 'size:3'],
            'country' => ['nullable', 'string', 'max:100'],
            'timezone' => ['required', 'string', 'max:64'],
        ]);

        $business = Business::create($data);

        $user = $request->user();
        $user->role = 'owner';
        $user->save();

        return redirect()->route('/dashboard');
    }
}