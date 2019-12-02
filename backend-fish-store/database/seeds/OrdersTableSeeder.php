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
            "id" => 5,
            "user_id" => 2,
            "description" => "Payments for Online FishStore",
            "quantity" => 6,
            "amount" => '923.30',
            "weight" => 16.10,
            "city" => "Aiken",
            "country" => "us",
            "state" => "South Carolina",
            "postal_code" => 3300,
            "address" => "South Carolina, Aiken, 916  Java Lane",
            "phone" => "8036499293",
            "email" => "user2@email.com",
            "charge_id" => "card_d24#sd23d",
            "payment_method" => "card",
            "last4" => "4242",
            "receipt_url" => "https://pay.stripe.com/receipts/acct_1FaCh8FMP9jxAkhP/ch_1Fl2MuFMP9jxAkhP05uvt1oS/rcpt_GHbaQLflcEE3c6UqYKv2GVkj4jdeBlF",
            "paid" => true,
            "is_delivered" => false,
            "created_at" => "2019-11-02 00:02:25",
        ]);
        DB::table('orders')->insert([
            "id" => 7,
            "user_id" => 1,
            "description" => "Payments for Online FishStore",
            "quantity" => 19,
            "amount" => '4189.50',
            "weight" => 34.75,
            "city" => "Tokyo",
            "country" => "jp",
            "state" => "Minato",
            "postal_code" => 3300,
            "address" => "304-1296, Toranomon Shiroyamatorasuawatot(13-kai), Minato-ku, Tokyo",
            "phone" => '+8164-938-4896',
            "email" => "user1@email.com",
            "charge_id" => "card_d24#sd23d",
            "payment_method" => "card",
            "last4" => "2443",
            "receipt_url" => "https://pay.stripe.com/receipts/acct_1FaCh8FMP9jxAkhP/ch_1Fl2YqFMP9jxAkhPmaJl986X/rcpt_GHbmxauwQJ43eIl6MkNzR5ds8TlsQlm",
            "paid" => true,
            "is_delivered" => true,
            "created_at" => "2019-11-13 00:00:00",
            "delivered_at" => "2019-11-23 00:00:00",
        ]);
        DB::table('orders')->insert([
            "id" => 8,
            "user_id" => 1,
            "description" => "Payments for Online FishStore",
            "quantity" => 4,
            "amount" => '682.00',
            "weight" => 8.90,
            "city" => "Tokyo",
            "country" => "jp",
            "state" => "Minato",
            "postal_code" => 22333,
            "address" => "304-1296, Toranomon Shiroyamatorasuawatot(13-kai), Minato-ku, Tokyo",
            "phone" => '094332345',
            "email" => "fake@email.com",
            "payment_method" => "cod",
            "paid" => false,
            "is_delivered" => false,
            "created_at" => "2019-11-13 00:00:00"
        ]);
        DB::table('orders')->insert([
            "id" => 10,
            "user_id" => 4,
            "description" => "Payments for Online FishStore",
            "quantity" => 2,
            "amount" => '341.00',
            "weight" => 5.40,
            "city" => "Tokyo",
            "country" => "jp",
            "state" => "Taito-ku",
            "postal_code" => 3300,
            "address" => "16-5, Taito 3-chome, Taito-ku, Tokyo",
            "phone" => '+8185-799-3118',
            "email" => "fake@email.com",
            "charge_id" => "card_d24#sd23d",
            "payment_method" => "card",
            "last4" => "2443",
            "receipt_url" => "https://pay.stripe.com/receipts/acct_1FaCh8FMP9jxAkhP/ch_1Fl2dJFMP9jxAkhPzCw7XLN9/rcpt_GHbrPVQPxEXPLmqP8e8vokFTuFPBwqW",
            "paid" => true,
            "is_delivered" => false,
            "created_at" => "2019-11-13 00:00:00",
        ]);

    }
}
