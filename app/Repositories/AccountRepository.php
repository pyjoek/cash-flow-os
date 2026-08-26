<?php

namespace App\Repositories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Collection;

class AccountRepository
{
    public function allForBusiness(string $businessId): Collection
    {
        return Account::where('business_id', $businessId)->orderBy('name')->get();
    }

    public function find(string $accountId): ?Account
    {
        return Account::find($accountId);
    }

    public function create(array $data): Account
    {
        return Account::create($data);
    }

    public function update(Account $account, array $data): Account
    {
        $account->update($data);

        return $account->fresh();
    }

    public function delete(Account $account): void
    {
        $account->delete();
    }

    public function adjustBalance(Account $account, float $delta): Account
    {
        $account->increment('balance', $delta);

        return $account->fresh();
    }
}