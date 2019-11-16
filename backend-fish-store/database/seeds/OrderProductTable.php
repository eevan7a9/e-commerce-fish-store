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
        ]);
        DB::table('order_product')->insert([
            "order_id" => 1,
            "product_id" => 2,
            "quantity" => 2,
        ]);
        DB::table('order_product')->insert([
            "order_id" => 1,
            "product_id" => 3,
            "quantity" => 1,
        ]);
        DB::table('order_product')->insert([
            "order_id" => 2,
            "product_id" => 3,
            "quantity" => 10,
        ]);
        DB::table('order_product')->insert([
            "order_id" => 3,
            "product_id" => 2,
            "quantity" => 5,
        ]);
        DB::table('order_product')->insert([
            "order_id" => 3,
            "product_id" => 1,
            "quantity" => 5,
        ]);

        DB::table('order_product')->insert([
            "order_id" => 4,
            "product_id" => 5,
            "quantity" => 10,
        ]);

    }
}
