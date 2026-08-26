<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared(<<<'SQL'
            CREATE TABLE transactions (
                id CHAR(36) PRIMARY KEY,
                business_id CHAR(36) NOT NULL,
                account_id CHAR(36) NOT NULL,
                category_id BIGINT UNSIGNED,
                type ENUM('income','expense','transfer') NOT NULL,
                amount DECIMAL(15,2) NOT NULL,
                description VARCHAR(500),
                reference VARCHAR(100),
                transaction_date DATE NOT NULL,
                created_by BIGINT UNSIGNED,
                status ENUM('pending','cleared','reconciled') NOT NULL DEFAULT 'cleared',
                created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
                FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
                FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
                INDEX idx_business_date (business_id, transaction_date)
            ) ENGINE=InnoDB;
        SQL);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
