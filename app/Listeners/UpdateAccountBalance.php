<?php

namespace App\Listeners;

use App\Events\TransactionCreated;
use App\Repositories\AccountRepository;

class UpdateAccountBalance
{
    public function __construct(private readonly AccountRepository $accounts) {}

    public function handle(TransactionCreated $event): void
    {
        $transaction = $event->transaction;
        $account = $transaction->account;

        if (! $account) {
            return;
        }

        $delta = match ($transaction->type) {
            'income' => (float) $transaction->amount,
            'expense' => -1 * (float) $transaction->amount,
            default => 0,
        };

        if ($delta !== 0.0) {
            $this->accounts->adjustBalance($account, $delta);
        }
    }
}