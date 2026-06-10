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
    Schema::create('quote_items', function (Blueprint $table) {
        $table->id();
        $table->foreignId('quote_id')
              ->constrained('quotes')
              ->onDelete('cascade');
        $table->string('type', 20)->default('item');
        $table->string('section')->nullable();
        $table->string('subsection')->nullable();
        $table->string('name')->nullable();
        $table->decimal('qty', 10, 2)->default(0);
        $table->decimal('unit_price', 12, 2)->default(0);
        $table->decimal('price', 14, 2)->default(0);
        $table->integer('sort_order')->default(0);
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('quote_items');
}
};
