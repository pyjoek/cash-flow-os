<?php

namespace App\Services;

class CategorySuggestionService
{
    /**
     * Keyword => category name. Matched case-insensitively against
     * the transaction description. First match wins.
     */
    protected array $keywordMap = [
        'uber' => 'Transport',
        'bolt' => 'Transport',
        'fuel' => 'Transport',
        'petrol' => 'Transport',
        'crdb' => 'Sales',
        'deposit' => 'Sales',
        'nmb' => 'Sales',
        'electricity' => 'Utilities',
        'tanesco' => 'Utilities',
        'water bill' => 'Utilities',
        'salary' => 'Payroll',
        'wages' => 'Payroll',
        'vodacom' => 'Mobile Money',
        'm-pesa' => 'Mobile Money',
        'mpesa' => 'Mobile Money',
        'airtel' => 'Mobile Money',
        'rent' => 'Rent',
        'tra' => 'Tax',
        'tax' => 'Tax',
        'insurance' => 'Tax',
        'stock' => 'Inventory',
        'supplier' => 'Inventory',
        'equipment' => 'Equipment',
        'marketing' => 'Marketing',
        'ads' => 'Marketing',
    ];

    public function suggestCategoryName(?string $description): ?string
    {
        if (! $description) {
            return null;
        }

        $haystack = strtolower($description);

        foreach ($this->keywordMap as $keyword => $categoryName) {
            if (str_contains($haystack, $keyword)) {
                return $categoryName;
            }
        }

        return null;
    }
}