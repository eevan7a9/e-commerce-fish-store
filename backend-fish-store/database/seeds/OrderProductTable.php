<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderProductTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('order_product')->insert([
            "order_id" => 1,
            "product_id" => 1,
            "quantity" => 2,
            "amount" => 466.80,
            "weight" => 13.50
        ]);
        DB::table('order_product')->insert([
            "order_id" => 1,
            "product_id" => 2,
            "quantity" => 2,
            "amount" => 466.80,
            "weight" => 13.50
        ]);
        DB::table('order_product')->insert([
            "order_id" => 1,
            "product_id" => 3,
            "quantity" => 1,
            "amount" => 466.80,
            "weight" => 13.50
        ]);
        DB::table('order_product')->insert([
            "order_id" => 2,
            "product_id" => 3,
            "quantity" => 10,
            "amount" => 1400.30,
            "weight" => 13.50
        ]);
        DB::table('order_product')->insert([
            "order_id" => 3,
            "product_id" => 2,
            "quantity" => 5,
            "amount" => 700.25,
            "weight" => 13.50
        ]);
        DB::table('order_product')->insert([
            "order_id" => 3,
            "product_id" => 1,
            "quantity" => 5,
            "amount" => 700.25,
            "weight" => 13.50
        ]);

        DB::table('order_product')->insert([
            "order_id" => 4,
            "product_id" => 5,
            "quantity" => 10,
            "amount" => 1400.50,
            "weight" => 13.50
        ]);

    }
}
