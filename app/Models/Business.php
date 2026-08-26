<?php

namespace App\Modules\Businesses\Models;

use App\Models\User;
use App\Modules\Accounts\Models\Account;
use App\Modules\Shared\Concerns\HasUuid;
use App\Modules\Transactions\Models\Category;
use App\Modules\Transactions\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = [
        'name', 'email', 'phone', 'currency', 'country', 'timezone',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}