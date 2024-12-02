<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminCount = User::where('is_admin', true)->count();
        switch ($adminCount) {
            case 0:
                User::create([
                    'name' => 'Default Admin Name',
                    'email' => env('SEEDER_ADMIN_EMAIL', 'admin@email.com'),
                    'password' => bcrypt(env('SEEDER_ADMIN_PASSWORD', 'password')),
                    'profile_img' => 'https://placehold.co/200x200/EEE/31343C',
                    'is_admin' => true
                ]);
                $this->command->info('Admin user created.');
                break;
            
            default:
                $this->command->info('Admin user already exists.');
                break;
        }
    }
}
