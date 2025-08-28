<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
      /* Dummy Data Insert - Temporary*/

        // 1. Create Profile
        $profile = Profile::create([
            'title' => 'Mr',
            'fullname' => 'Admin User',
            'email' => 'newuser@company.com',
            'login_id' => 'newuser',
            'corporate_email' => 'newuser@company.com',
            'phone_number' => '9876543210',
            'password' => Hash::make('password123'), 
            'active' => true,
            'is_sso_active' => false,
            'reg_number' => 'REG001',
            'is_blocked' => false,
            'changed_image' => false,
            'is_synced_assessment' => false,
            'is_corporate_login' => false,
        ]);

        // 2. Create User linked to Profile
        User::create([
            'profile_id' => $profile->id,
            'organisations_id' => 1, 
            'roles_id' => 1,       
            'official_user_id' => 'admin001',
            'type' => 1,
            'active' => 1,
            'verified' => 1,
            'date_created' => now(),
            'is_case_manager' => 0,
            'email_token' => null,
            'employment_type_id' => 1, 
        ]);

    }
}
