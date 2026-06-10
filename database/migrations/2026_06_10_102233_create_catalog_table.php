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
    Schema::create('catalog', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('category', 100)->nullable();
        $table->string('unit', 50)->nullable();
        $table->text('description')->nullable();
        $table->decimal('cost_price', 12, 2)->default(0);
        $table->decimal('margin', 6, 2)->default(0);
        $table->decimal('unit_price', 12, 2)->default(0);
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('catalog');
}
};
