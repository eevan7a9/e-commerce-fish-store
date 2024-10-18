<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prodcts = [
            // Culinary
            [
                'name' => 'Atlantic Salmon (Salmo salar)',
                'description' => 'Atlantic salmon is versatile in cooking and can be grilled, baked, or pan-seared. It’s also popular in sushi and sashimi.',
                'price' => 5.00,
                'weight' => 12,
                'units' => 100,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Barramundi (Lates calcarifer)',
                'description' => 'Barramundi can be grilled, steamed, or pan-fried, and is popular in dishes like fish curry, tacos, or served with sauces.',
                'price' => 10.00,
                'weight' => 2,
                'units' => 33,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Mackerel (Scomberomorus spp.)',
                'description' => ' Mackerel is often grilled, smoked, or canned and is popular in dishes like mackerel salad, fish tacos, or served with rice.',
                'price' => 10.00,
                'weight' => 2,
                'units' => 33,
                'category_id' => 1,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Ornamental Types
            [
                'name' => 'Clownfish (Amphiprioninae)',
                'description' => 'Clownfish are striking saltwater fish famous for their bright orange color with white bands. They are often associated with sea anemones, which provide protection for the clownfish while the clownfish helps the anemone by keeping it clean and defending it from predators.',
                'price' => 10.00,
                'weight' => 2,
                'units' => 15,
                'category_id' => 2,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Betta Fish (Betta splendens)',
                'description' => 'Betta fish, also known as Siamese fighting fish, are popular freshwater aquarium fish known for their vibrant colors and flowing fins.',
                'price' => 14.00,
                'weight' => 2,
                'units' => 12,
                'category_id' => 2,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Farming
            [
                'name' => 'Nile Tilapia (Oreochromis niloticus)',
                'description' => 'This is the most widely farmed species globally and is known for its rapid growth and adaptability to various farming conditions.',
                'price' => 10.00,
                'weight' => 2,
                'units' => 15,
                'category_id' => 3,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Channel Catfish (Ictalurus punctatus)',
                'description' => 'This is the most commonly farmed catfish species in the U.S. and is known for its mild flavor and firm texture.',
                'price' => 14.00,
                'weight' => 2,
                'units' => 12,
                'category_id' => 4,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Baites
            [
                'name' => 'Minnows',
                'description' => 'Minnows are effective bait because they are a natural food source for larger predatory fish, such as bass, pike, and trout.',
                'price' => 10.00,
                'weight' => 2,
                'units' => 15,
                'category_id' => 4,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Shad',
                'description' => 'Shad are often used for targeting larger game fish, such as striped bass and catfish. They can be used live, cut, or as part of a chum mixture.',
                'price' => 14.00,
                'weight' => 2,
                'units' => 12,
                'category_id' => 4,
                'images' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];
        Product::insert($prodcts);
    }
}
