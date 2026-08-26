<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Services\AccountService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function __construct(private readonly AccountService $accounts) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Accounts/Index', [
            'accounts' => $this->accounts->listForBusiness($request->user()->business_id),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', 'in:cash,bank,mpesa,airtel_money,visa,paypal'],
            'balance' => ['nullable', 'numeric'],
            'currency' => ['required', 'string', 'size:3'],
        ]);

        $this->accounts->create($request->user()->business_id, $data);

        return back();
    }

    public function update(Request $request, Account $account): RedirectResponse
    {
        $this->authorize('update', $account);

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'type' => ['sometimes', 'in:cash,bank,mpesa,airtel_money,visa,paypal'],
            'currency' => ['sometimes', 'string', 'size:3'],
        ]);

        $this->accounts->update($account, $data);

        return back();
    }

    public function destroy(Account $account): RedirectResponse
    {
        $this->authorize('delete', $account);

        $this->accounts->delete($account);

        return back();
    }
}