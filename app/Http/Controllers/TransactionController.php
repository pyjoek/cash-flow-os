<?php

namespace App\Http\Controllers;

use App\Actions\CreateTransactionAction;
use App\DTOs\TransactionData;
use App\Models\Account;
use App\Repositories\AccountRepository;
use App\Models\Category;
use App\Models\Transaction;
use App\Services\TransactionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function updateCategory(Request $request, Transaction $transaction): RedirectResponse
    {
        $this->authorize('update', $transaction);

        $data = $request->validate([
            'category_id' => ['required', 'integer', 'exists:categories,id'],
        ]);

        $transaction->update($data);

        return back();
    }
    
    public function __construct(
        private readonly TransactionService $transactions,
        private readonly CreateTransactionAction $createTransaction,
        private readonly AccountRepository $accounts,
    ) {}

    public function index(Request $request): Response
    {
        $businessId = $request->user()->business_id;

        return Inertia::render('Transactions/Index', [
            'transactions' => $this->transactions->listForBusiness($businessId),
            'categories' => Category::where('business_id', $businessId)->get(),
            'accounts' => Account::where('business_id', $businessId)->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'account_id' => ['required', 'integer', 'exists:accounts,id'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'type' => ['required', 'in:income,expense,transfer'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string', 'max:500'],
            'reference' => ['nullable', 'string', 'max:100'],
            'transaction_date' => ['required', 'date'],
        ]);

        $data['business_id'] = $request->user()->business_id;
        $data['created_by'] = $request->user()->id;

        $this->createTransaction->execute(TransactionData::fromArray($data));

        return back();
    }

    public function destroy(Transaction $transaction): RedirectResponse
    {
        $this->authorize('delete', $transaction);

        $account = $transaction->account;

        if ($account) {
            // Reverse whatever UpdateAccountBalance applied when this was created.
            $delta = match ($transaction->type) {
                'income' => -1 * (float) $transaction->amount,
                'expense' => (float) $transaction->amount,
                default => 0,
            };

            if ($delta !== 0.0) {
                $this->accounts->adjustBalance($account, $delta);
            }
        }

        $transaction->delete();

        return back();
    }
}