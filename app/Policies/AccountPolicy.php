<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\User;

class AccountPolicy
{
    public function view(User $user, Account $account): bool
    {
        return $user->business_id === $account->business_id;
    }

    public function update(User $user, Account $account): bool
    {
        return $user->business_id === $account->business_id;
    }

    public function delete(User $user, Account $account): bool
    {
        return $user->business_id === $account->business_id && $user->isOwner();
    }
}