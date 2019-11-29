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
            "description" => "Payments for Online FishStore",
            "quantity" => 5,
            "amount" => '1400.30',
            "weight" => 234.5,
            "city" => "fake City",
            "country" => "us",
            "state" => "fake state",
            "postal_code" => 3300,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => "123234564",
            "email" => "fake@email.com",
            "charge_id" => "card_d24#sd23d",
            "payment_method" => "card",
            "last4" => "2443",
            "receipt_url" => "https://placeholder.com/",
            "paid" => true,
            "is_delivered" => false,
            "created_at" => now(),
        ]);
        DB::table('orders')->insert([
            "user_id" => null,
            "description" => "Payments for Online FishStore",
            "quantity" => 10,
            "amount" => '1400.30',
            "weight" => 234.5,
            "city" => "fake City",
            "country" => "us",
            "state" => "fake state",
            "postal_code" => 3300,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => '0932182345',
            "email" => "fake@email.com",
            "charge_id" => "card_d24#sd23d",
            "payment_method" => "card",
            "last4" => "2443",
            "receipt_url" => "https://placeholder.com/",
            "paid" => true,
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
            "delivered_at" => "2019-11-23 00:00:00",
        ]);
        DB::table('orders')->insert([
            "user_id" => 3,
            "description" => "Payments for Online FishStore",
            "quantity" => 10,
            "amount" => '1400.30',
            "weight" => 234.5,
            "city" => "fake City",
            "country" => "us",
            "state" => "fake state",
            "postal_code" => 3300,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => '094332345',
            "email" => "fake@email.com",
            "charge_id" => "card_d24#sd23d",
            "payment_method" => "card",
            "last4" => "2443",
            "receipt_url" => "https://placeholder.com/",
            "paid" => true,
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
            "delivered_at" => "2019-11-23 00:00:00",
        ]);
        DB::table('orders')->insert([
            "user_id" => 1,
            "description" => "Payments for Online FishStore",
            "quantity" => 10,
            "amount" => '1400.30',
            "weight" => 234.5,
            "city" => "fake City",
            "country" => "us",
            "state" => "fake state",
            "postal_code" => 3300,
            "address" => "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
            "phone" => '098112345',
            "email" => "fake@email.com",
            "charge_id" => "card_d24#sd23d",
            "payment_method" => "card",
            "last4" => "2443",
            "receipt_url" => "https://placeholder.com/",
            "paid" => true,
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
            "delivered_at" => "2019-11-23 00:00:00",
        ]);

    }
}
