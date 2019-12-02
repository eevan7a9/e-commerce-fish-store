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
            "id" => 8,
            "order_id" => 5,
            "product_id" => 5,
            "quantity" => 4,
            "amount" => 482.00,
            "weight" => 12.60
        ]);
        DB::table('order_product')->insert([
            "id" => 9,
            "order_id" => 5,
            "product_id" => 3,
            "quantity" => 1,
            "amount" => 220.50,
            "weight" => 1.25
        ]);
        DB::table('order_product')->insert([
            "id" => 10,
            "order_id" => 5,
            "product_id" => 2,
            "quantity" => 1,
            "amount" => 220.50,
            "weight" => 2.25
        ]);
        DB::table('order_product')->insert([
            "id" => 13,
            "order_id" => 7,
            "product_id" => 3,
            "quantity" => 8,
            "amount" => 1764.00,
            "weight" => 10.00
        ]);
        DB::table('order_product')->insert([
            "id" => 14,
            "order_id" => 7,
            "product_id" => 2,
            "quantity" => 11,
            "amount" => 2425.50,
            "weight" => 24.75
        ]);
        DB::table('order_product')->insert([
            "id" => 15,
            "order_id" => 8,
            "product_id" => 3,
            "quantity" => 1,
            "amount" => 220.50,
            "weight" => 1.25
        ]);
        DB::table('order_product')->insert([
            "id" => 16,
            "order_id" => 8,
            "product_id" => 2,
            "quantity" => 1,
            "amount" => 220.50,
            "weight" => 2.25
        ]);
        DB::table('order_product')->insert([
            "id" => 17,
            "order_id" => 8,
            "product_id" => 5,
            "quantity" => 1,
            "amount" => 120.50,
            "weight" => 3.15
        ]);
        DB::table('order_product')->insert([
            "id" => 18,
            "order_id" => 8,
            "product_id" => 4,
            "quantity" => 1,
            "amount" => 120.50,
            "weight" => 2.25
        ]);
        DB::table('order_product')->insert([
            "id" => 20,
            "order_id" => 10,
            "product_id" => 5,
            "quantity" => 1,
            "amount" => 120.50,
            "weight" => 3.15
        ]);
        DB::table('order_product')->insert([
            "id" => 21,
            "order_id" => 10,
            "product_id" => 2,
            "quantity" => 1,
            "amount" => 220.50,
            "weight" => 2.15
        ]);

    }
}
