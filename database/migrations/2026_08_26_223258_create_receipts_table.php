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
            CREATE TABLE receipts (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                transaction_id CHAR(36) NOT NULL,
                path VARCHAR(500) NOT NULL,
                ocr_json JSON,
                ai_summary TEXT,
                created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE
            ) ENGINE=InnoDB;
        SQL);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reciepts');
    }
};
