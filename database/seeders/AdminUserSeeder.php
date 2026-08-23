<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@cotuong.test'],
            [
                'name'     => 'Quản trị viên',
                'password' => Hash::make('cotuong@2026'),
                'role'     => 'admin',
            ]
        );
    }
}
