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
            CREATE TABLE accounts (
                id CHAR(36) PRIMARY KEY,
                business_id CHAR(36) NOT NULL,
                name VARCHAR(255) NOT NULL,
                type ENUM('cash','bank','mpesa','airtel_money','visa','paypal') NOT NULL,
                balance DECIMAL(15,2) NOT NULL DEFAULT 0,
                currency CHAR(3) NOT NULL DEFAULT 'TZS',
                created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
            ) ENGINE=InnoDB;
        SQL);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
