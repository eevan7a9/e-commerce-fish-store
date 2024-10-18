<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generating our main test user
        User::create([
            'name' => 'Test user 1',
            'email' => 'test1@email.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
        ]);
        // Generating Random User
        $faker = fake();
        for ($i = 0; $i < 3; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'),
                'is_admin' => false,
            ]);
        }
    }
}
