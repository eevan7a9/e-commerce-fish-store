<?php

namespace Database\Seeders;

use App\Models\Tag;
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
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'farm raised',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'clothing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'crustaceans',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'rivers',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'sea',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'tropical',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'mussel',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        Tag::insert($tags);
    }
}
