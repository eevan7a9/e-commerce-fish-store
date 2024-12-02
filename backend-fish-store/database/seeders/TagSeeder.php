<?php

namespace Database\Seeders;

use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            [
                'name' => 'tuna',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'farm raised',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'clothing',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
            ],
            [
                'name' => 'crustaceans',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'rivers',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'sea',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'tropical',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
            [
                'name' => 'mussel',
                'created_at' => Carbon::create(2024, 1, 1, 10, 0, 0),
                'updated_at' => Carbon::create(2024, 1, 1, 10, 0, 0)
            ],
        ];

        Tag::insert($tags);
    }
}
