<?php

namespace App\Repositories;

use App\Models\Transaction;
use Illuminate\Pagination\LengthAwarePaginator;

class TransactionRepository
{
    public function paginateForBusiness(string $businessId, int $perPage = 25): LengthAwarePaginator
    {
        return Transaction::where('business_id', $businessId)
            ->with(['account', 'category'])
            ->latest('transaction_date')
            ->paginate($perPage);
    }

    public function create(array $data): Transaction
    {
        return Transaction::create($data);
    }

    public function find(string $transactionId): ?Transaction
    {
        return Transaction::find($transactionId);
    }

    public function delete(Transaction $transaction): void
    {
        $transaction->delete();
    }
}