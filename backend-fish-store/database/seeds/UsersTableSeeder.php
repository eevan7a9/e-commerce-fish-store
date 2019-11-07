<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'user1',
            'email' => 'user1@email.com',
            'password' => bcrypt('password'),
            'created_at' => "2019-11-07 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'user2',
            'email' => 'user2@email.com',
            'password' => bcrypt('password'),
            'created_at' => "2019-11-07 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'user3',
            'email' => 'user3@email.com',
            'password' => bcrypt('password'),
            'created_at' => "2019-11-07 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'user4',
            'email' => 'user4@email.com',
            'password' => bcrypt('password'),
            'created_at' => "2019-11-07 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@email.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'created_at' => "2019-11-07 04:36:56",
            'updated_at' => now(),
        ]);
    }
}
