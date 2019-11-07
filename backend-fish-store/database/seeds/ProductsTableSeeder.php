<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'TAISHO SANKE',
            'description' => 'Taisho Sanke, or Sanke for short, are koi with a solid white base overlaid by patterns of both red and black. It is commonly said that a high quality Sanke pattern begins with a great Kohaku pattern, to which the black is a welcome complement.',
            'price' => '120.50',
            'weight' => '3.25',
            'units' => 20,
            'created_at' => "2019-11-09 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'KOHAKU',
            'description' => 'Kokaku, the oldest and most well known variety of koi, have a solid white base with patterns of red overlaid on top of the white. Top quality Kohaku display a bright, blemish-free white combined with deep, vibrant red tones. The even distribution of the pattern along the body is also very important.',
            'price' => '220.50',
            'weight' => '2.25',
            'units' => 30,
            'created_at' => "2019-11-07 01:26:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'TANCHO',
            'description' => 'Tancho is a hugely popular variation of Kohaku, in which the only red pattern appears as a single red dot on the head. The symmetry and placement of the Tancho mark are main factors in determining the quality of any particular koi.',
            'price' => '220.50',
            'weight' => '1.25',
            'units' => 30,
            'created_at' => "2019-11-06 04:16:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'SHIRO UTSURI',
            'description' => 'Shiro Utsuri are koi with a black base overlain by areas of white. A high quality Shiro Utsuri will combine clean white patterns with a deep, lacquer-like black.',
            'price' => '120.50',
            'weight' => '2.25',
            'units' => 15,
            'created_at' => "2019-11-07 02:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'HI UTSURI',
            'description' => 'Hi Utsuri combine the lacquer-black base color with patterns of deep red or orange. Red Hi Utsuri are superior to orange. Many Hi Utsuri will display a dull orange pattern at a young age, which may develop into a brighter and more desirable red pattern as the koi grows and matures.',
            'price' => '120.50',
            'weight' => '3.15',
            'units' => 32,
            'created_at' => "2019-11-07 01:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'HARIWAKE',
            'description' => 'Hariwake display a solid metallic-white base coupled with bright, vibrant patterns of yellow or orange. The bright, luminous white of Hariwake differs from the softer, matte-white of Kohaku and Sanke. Hariwake with a bright yellow pattern are commonly referred to as Lemon Hariwake.',
            'price' => '320.50',
            'weight' => '2.50',
            'units' => 50,
            'created_at' => "2019-11-08 03:36:56",
            'updated_at' => now(),
        ]);
    }
}
