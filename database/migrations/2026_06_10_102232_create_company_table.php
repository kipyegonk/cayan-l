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
    Schema::create('company', function (Blueprint $table) {
        $table->id();
        $table->string('name')->default('Cayan Events Ke.');
        $table->string('phone', 50)->nullable();
        $table->string('email')->nullable();
        $table->text('address')->nullable();
        $table->string('currency', 10)->default('KES');
        $table->text('terms')->nullable();
        $table->longText('logo')->nullable();
        $table->longText('signature')->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('company');
}
};
