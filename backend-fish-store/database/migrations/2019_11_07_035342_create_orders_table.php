<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('total_price', 9, 2);
            $table->decimal('total_weight', 5, 2);
            $table->string('address');
            $table->string('country');
            $table->string('city');
            $table->string('state');
            $table->integer('postal_code')->nullable();
            $table->string('phone');
            $table->string('charge_id')->nullable();
            $table->integer('last4')->nullable();
            $table->string('receipt_url')->nullable();
            $table->boolean('paid')->default(false);
            $table->string('payment_method')->default('cod');
            $table->boolean('is_delivered')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
