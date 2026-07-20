<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->string('type')->nullable()->after('name');
            $table->string('whatsapp', 50)->nullable()->after('phone');
            $table->string('kra_pin', 50)->nullable()->after('location');
            $table->text('notes')->nullable()->after('address');
        });
    }

    public function down(): void
    {
        Schema::table('clients', function (Blueprint $table) {
            $table->dropColumn(['type', 'whatsapp', 'kra_pin', 'notes']);
        });
    }
};
