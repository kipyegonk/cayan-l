<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
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
                'password' => 'admin123', // hashed automatically by model cast
                'role'     => 'admin',
                'verified' => true,
            ]);
        } else {
            // Reset password in case of double-hash issue
            $user = User::where('email','admin@company.com')->first();
            $user->password = 'admin123';
            $user->save();
        }
        Company::getSingleton();
        $this->command->info('Done! Login: admin@company.com / admin123');
    }
}