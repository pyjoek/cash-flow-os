<?php

namespace App\Modules\Transactions\Models;

use App\Models\User;
use App\Modules\Accounts\Models\Account;
use App\Modules\Businesses\Models\Business;
use App\Modules\Shared\Concerns\HasUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = [
        'business_id', 'account_id', 'category_id', 'type',
        'amount', 'description', 'reference', 'transaction_date',
        'created_by', 'status',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'transaction_date' => 'date',
        ];
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}