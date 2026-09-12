<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Category;
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
        $request->user()->forceFill([
            'business_id' => $business->id,
        ])->save();

        $user = $request->user();
        $user->role = 'owner';
        $user->save();

        $this->seedDefaultCategories($business->id);

        return redirect()->route('dashboard');
    }

    private function seedDefaultCategories(int $businessId): void
    {
        $defaults = [
            ['type' => 'income', 'name' => 'Shop / walk-in sales'],
            ['type' => 'income', 'name' => 'Services rendered'],
            ['type' => 'income', 'name' => 'Customer paid via M-Pesa / Airtel'],
            ['type' => 'income', 'name' => 'Bank deposit from a customer'],
            ['type' => 'income', 'name' => 'Loan or capital in'],
            ['type' => 'income', 'name' => 'Other money in'],
            ['type' => 'expense', 'name' => 'Stock & supplies'],
            ['type' => 'expense', 'name' => 'Transport, boda, fuel'],
            ['type' => 'expense', 'name' => 'Rent & premises'],
            ['type' => 'expense', 'name' => 'Staff wages'],
            ['type' => 'expense', 'name' => 'Power, water, airtime'],
            ['type' => 'expense', 'name' => 'Food & meals'],
            ['type' => 'expense', 'name' => 'Mobile money / bank fees'],
            ['type' => 'expense', 'name' => 'TRA, license, tax'],
            ['type' => 'expense', 'name' => 'Marketing & promotions'],
            ['type' => 'expense', 'name' => 'Equipment & repairs'],
            ['type' => 'expense', 'name' => 'Owner drawings'],
            ['type' => 'expense', 'name' => 'Other money out'],
        ];

        foreach ($defaults as $category) {
            Category::firstOrCreate(
                [
                    'business_id' => $businessId,
                    'name' => $category['name'],
                    'type' => $category['type'],
                ],
                $category + ['business_id' => $businessId],
            );
        }
    }
}