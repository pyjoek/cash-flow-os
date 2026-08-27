<?php

namespace App\Models;

use App\Models\Business;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'business_id', 'name', 'type',
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }
}