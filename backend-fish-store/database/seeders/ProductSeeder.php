<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            // Culinary
            [
                'name' => 'Atlantic Salmon (Salmo salar)',
                'description' => 'Atlantic salmon is versatile in cooking and can be grilled, baked, or pan-seared. It’s also popular in sushi and sashimi.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 12,
                'units' => 100,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 1, 2, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 2, 10, 0, 0),
            ],
            [
                'name' => 'Barramundi (Lates calcarifer)',
                'description' => 'Barramundi can be grilled, steamed, or pan-fried, and is popular in dishes like fish curry, tacos, or served with sauces.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 33,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 2, 8, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 2, 8, 10, 0, 0),
            ],
            [
                'name' => 'Mackerel (Scomberomorus spp.)',
                'description' => ' Mackerel is often grilled, smoked, or canned and is popular in dishes like mackerel salad, fish tacos, or served with rice.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 33,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 3, 13, 5, 0, 0),
                'updated_at' => Carbon::create(2024, 3, 13, 5, 0, 0),
            ],
            [
                'name' => 'Pacific Halibut (Hippoglossus stenolepis)',
                'description' => 'Pacific halibut has a mild, sweet flavor with a firm texture, perfect for grilling, roasting, and baking.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 15,
                'units' => 80,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 1, 6, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 6, 10, 0, 0),
            ],
            [
                'name' => 'Yellowfin Tuna (Thunnus albacares)',
                'description' => 'Yellowfin tuna is a favorite for sushi and sashimi, and it’s excellent grilled or seared due to its firm, meaty texture.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 10,
                'units' => 50,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 3, 15, 12, 0, 0),
                'updated_at' => Carbon::create(2024, 3, 15, 12, 0, 0),
            ],
            // Ornamental Types
            [
                'name' => 'Clownfish (Amphiprioninae)',
                'description' => 'Clownfish are striking saltwater fish famous for their bright orange color with white bands. They are often associated with sea anemones, which provide protection for the clownfish while the clownfish helps the anemone by keeping it clean and defending it from predators.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 15,
                'category_id' => 2,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 2, 23, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 2, 23, 10, 0, 0),
            ],
            [
                'name' => 'Betta Fish (Betta splendens)',
                'description' => 'Betta fish, also known as Siamese fighting fish, are popular freshwater aquarium fish known for their vibrant colors and flowing fins.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 12,
                'category_id' => 2,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 1, 5, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 5, 10, 0, 0),
            ],
            // Farming
            [
                'name' => 'Nile Tilapia (Oreochromis niloticus)',
                'description' => 'This is the most widely farmed species globally and is known for its rapid growth and adaptability to various farming conditions.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 15,
                'category_id' => 3,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 1, 2, 8, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 2, 8, 0, 0),
            ],
            [
                'name' => 'Channel Catfish (Ictalurus punctatus)',
                'description' => 'This is the most commonly farmed catfish species in the U.S. and is known for its mild flavor and firm texture.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 12,
                'category_id' => 4,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 2, 5, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 2, 5, 10, 0, 0),
            ],
            // Baites
            [
                'name' => 'Minnows',
                'description' => 'Minnows are effective bait because they are a natural food source for larger predatory fish, such as bass, pike, and trout.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 15,
                'category_id' => 4,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
            ],
            [
                'name' => 'Shad',
                'description' => 'Shad are often used for targeting larger game fish, such as striped bass and catfish. They can be used live, cut, or as part of a chum mixture.',
                'price' => mt_rand(500, 9999) / 100,
                'weight' => 2,
                'units' => 12,
                'category_id' => 4,
                'images' => json_encode([]),
                'created_at' => Carbon::create(2024, 1, 2, 11, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 2, 11, 0, 0),
            ]
        ];
        Product::insert($products);

        // Retrieve the products
        $insertedProducts = Product::all();  // Or use a more specific query if needed

        // Assuming you already have some tags in the database, get all tags
        $tags = Tag::all();

        // Loop through each product and attach some tags
        foreach ($insertedProducts as $product) {
            // Attach 2 random tags to each product (adjust this as needed)
            $product->tags()->attach($tags->random(2));
        }
    }
}
