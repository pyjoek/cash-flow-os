<?php

namespace App\Actions;

use App\DTOs\TransactionData;
use App\Events\TransactionCreated;
use App\Models\Account;
use App\Models\Transaction;
use App\Repositories\TransactionRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CreateTransactionAction
{
    public function __construct(private readonly TransactionRepository $transactions) {}

    public function execute(TransactionData $data): Transaction
    {
        return DB::transaction(function () use ($data) {
            $account = Account::whereKey($data->accountId)->lockForUpdate()->first();

            if (! $account) {
                throw ValidationException::withMessages([
                    'account_id' => 'Account not found.',
                ]);
            }

            if ($data->type === 'expense' && (float) $account->balance < $data->amount) {
                throw ValidationException::withMessages([
                    'amount' => 'Not enough balance.',
                ]);
            }

            $transaction = $this->transactions->create($data->toArray());

            event(new TransactionCreated($transaction));

            return $transaction->fresh(['account', 'category']);
        });
    }
}