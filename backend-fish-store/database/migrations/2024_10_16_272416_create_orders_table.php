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
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('email');
            $table->string('phone', length: 15);
            $table->text('line1');
            $table->text('line2')->nullable();
            $table->string('city');
            $table->string('state');
            $table->string('postal_code');
            $table->string('country');
            $table->decimal('total_weight', 10, 2)->nullable();
            $table->decimal('total_amount', 10, 2);
            $table->string('payment_method_id')->nullable();           
            $table->enum('payment_method', ['stripe', 'cod']);
            $table->enum('payment_status', ['unpaid', 'paid', 'refunded']);
            $table->enum('status', ['pending', 'approved', 'shipped', 'received', 'cancelled']);
 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
