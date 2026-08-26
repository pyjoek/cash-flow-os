<?php

namespace App\Providers;

use App\Events\TransactionCreated;
use App\Listeners\UpdateAccountBalance;
use App\Models\Account;
use App\Models\Transaction;
use App\Policies\AccountPolicy;
use App\Policies\TransactionPolicy;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Gate::policy(Account::class, AccountPolicy::class);
        Gate::policy(Transaction::class, TransactionPolicy::class);

        Event::listen(TransactionCreated::class, UpdateAccountBalance::class);
    }
}