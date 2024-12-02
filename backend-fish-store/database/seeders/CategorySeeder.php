<?php

namespace Database\Seeders;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'culinary',
                'description' => 'Culinary fish are species specifically valued for their taste, texture, and versatility in cooking. These fish are commonly used in various culinary applications, including grilling, baking, frying, and poaching.',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'ornamental',
                'description' => 'Fish kept primarily for decorative purposes in aquariums or ponds. This includes freshwater and saltwater aquarium fish, as well as ornamental species like koi.',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'farming',
                'description' => 'Fish that are raised for aquaculture purposes, including species commonly farmed for food or breeding stock.',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'bait',
                'description' => 'Smaller fish used for fishing, often sold live or frozen.',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ]
        ];
        
        Category::insert($categories);
    }
}
