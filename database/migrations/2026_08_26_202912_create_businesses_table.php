<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('businesses', function ($table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->char('currency', 3)->default('TZS');
            $table->string('country')->nullable();
            $table->string('timezone', 64)->default('Africa/Dar_es_Salaam');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        DB::unprepared('DROP TABLE IF EXISTS businesses');
    }
};