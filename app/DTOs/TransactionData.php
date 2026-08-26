<?php

namespace App\DTOs;

class TransactionData
{
    public function __construct(
        public readonly string $businessId,
        public readonly string $accountId,
        public readonly ?int $categoryId,
        public readonly string $type,
        public readonly float $amount,
        public readonly ?string $description,
        public readonly ?string $reference,
        public readonly string $transactionDate,
        public readonly ?int $createdBy,
        public readonly string $status = 'cleared',
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            businessId: $data['business_id'],
            accountId: $data['account_id'],
            categoryId: $data['category_id'] ?? null,
            type: $data['type'],
            amount: (float) $data['amount'],
            description: $data['description'] ?? null,
            reference: $data['reference'] ?? null,
            transactionDate: $data['transaction_date'],
            createdBy: $data['created_by'] ?? null,
            status: $data['status'] ?? 'cleared',
        );
    }

    public function toArray(): array
    {
        return [
            'business_id' => $this->businessId,
            'account_id' => $this->accountId,
            'category_id' => $this->categoryId,
            'type' => $this->type,
            'amount' => $this->amount,
            'description' => $this->description,
            'reference' => $this->reference,
            'transaction_date' => $this->transactionDate,
            'created_by' => $this->createdBy,
            'status' => $this->status,
        ];
    }
}