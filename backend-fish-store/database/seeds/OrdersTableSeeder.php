<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orders')->insert([
            "product_id" => 2,
            "user_id" => 2,
            "quantity" => 3,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "is_delivered" => false,
            "created_at" => now(),
        ]);
        DB::table('orders')->insert([
            "product_id" => 5,
            "user_id" => 1,
            "quantity" => 11,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
        ]);

    }
}
