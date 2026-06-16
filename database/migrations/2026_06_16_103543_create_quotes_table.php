<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quotes', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique();
            $table->unsignedBigInteger('client_id')->nullable();
            $table->string('client_name')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('venue')->nullable();
            $table->string('no_of_guests', 50)->nullable();
            $table->date('quote_date')->nullable();
            $table->date('valid_until')->nullable();
            $table->string('status', 20)->default('pending');
            $table->decimal('subtotal', 14, 2)->default(0);
            $table->decimal('vat_rate', 5, 2)->default(16);
            $table->decimal('vat_amount', 14, 2)->default(0);
            $table->decimal('total', 14, 2)->default(0);
            $table->text('notes')->nullable();
            $table->string('created_by')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quotes');
    }
};