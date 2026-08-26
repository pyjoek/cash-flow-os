<?php

namespace App\Services;

use App\Models\Account;
use App\Repositories\AccountRepository;
use Illuminate\Database\Eloquent\Collection;

class AccountService
{
    public function __construct(private readonly AccountRepository $accounts) {}

    public function listForBusiness(string $businessId): Collection
    {
        return $this->accounts->allForBusiness($businessId);
    }

    public function create(string $businessId, array $data): Account
    {
        return $this->accounts->create([
            'business_id' => $businessId,
            'name' => $data['name'],
            'type' => $data['type'],
            'balance' => $data['balance'] ?? 0,
            'currency' => $data['currency'],
        ]);
    }

    public function update(Account $account, array $data): Account
    {
        return $this->accounts->update($account, $data);
    }

    public function delete(Account $account): void
    {
        $this->accounts->delete($account);
    }
}