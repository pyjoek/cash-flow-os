<?php

namespace App\Actions;

use App\DTOs\TransactionData;
use App\Events\TransactionCreated;
use App\Models\Transaction;
use App\Repositories\TransactionRepository;
use Illuminate\Support\Facades\DB;

class CreateTransactionAction
{
    public function __construct(private readonly TransactionRepository $transactions) {}

    public function execute(TransactionData $data): Transaction
    {
        return DB::transaction(function () use ($data) {
            $transaction = $this->transactions->create($data->toArray());

            event(new TransactionCreated($transaction));

            return $transaction->fresh(['account', 'category']);
        });
    }
}