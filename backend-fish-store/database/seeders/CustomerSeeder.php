<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = fake();
        // Generating our main test user
        User::create([
            'name' => 'Test user 1',
            'email' => 'test1@email.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
            'address' => $faker->address,          // Generates a random address
            'phone' => $faker->regexify('\d{3}-\d{3}-\d{4}'),
            'profile_img' => 'https://placehold.co/150x150/EEE/31343C'
        ]);
        // Generating Random User
        for ($i = 0; $i < 3; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'),
                'is_admin' => false,
                'address' => $faker->address,          // Generates a random address
                'phone' => $faker->regexify('\d{3}-\d{3}-\d{4}')
            ]);
        }
    }
}
