<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Company;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        if (!User::where('email','admin@company.com')->exists()) {
            User::create([
                'name'     => 'Admin',
                'email'    => 'admin@company.com',
                'password' => Hash::make('********'),
                'role'     => 'admin',
                'verified' => true,
            ]);
        }
        Company::getSingleton();
        $this->command->info('Done! Login: admin@company.com / ********');
    }
}