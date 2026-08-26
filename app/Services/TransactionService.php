<?php

namespace App\Services;

use App\Repositories\TransactionRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class TransactionService
{
    public function __construct(private readonly TransactionRepository $transactions) {}

    public function listForBusiness(string $businessId, int $perPage = 25): LengthAwarePaginator
    {
        return $this->transactions->paginateForBusiness($businessId, $perPage);
    }
}