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
            "user_id" => 2,
            "quantity" => 5,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => "123234564",
            "is_delivered" => false,
            "created_at" => now(),
        ]);
        DB::table('orders')->insert([
            "user_id" => 1,
            "quantity" => 10,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => '0932182345',
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
        ]);
        DB::table('orders')->insert([
            "user_id" => 3,
            "quantity" => 10,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => '094332345',
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
        ]);
        DB::table('orders')->insert([
            "user_id" => 1,
            "quantity" => 10,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => '098112345',
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
        ]);

    }
}
