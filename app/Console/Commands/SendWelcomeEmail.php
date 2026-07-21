<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class SendWelcomeEmail extends Command
{
    protected $signature = 'mail:send-welcome {userId} {password}';
    protected $description = 'Send welcome email to new user';

    public function handle()
    {
        $user = User::find($this->argument('userId'));
        if (!$user) return;

        $password = $this->argument('password');
        $appName  = config('app.name', 'Cayan Events');
        $appUrl   = config('app.url', 'https://cayan-l.vercel.app');

        $body = "Hello {$user->name},\n\n"
            . "Your account on {$appName} has been created.\n\n"
            . "Login URL : {$appUrl}\n"
            . "Email     : {$user->email}\n"
            . "Password  : {$password}\n\n"
            . "Please log in and change your password immediately.\n\n"
            . "Role       : " . strtoupper($user->role) . "\n"
            . "Department : " . ($user->department ?: 'N/A') . "\n"
            . "Job Title  : " . ($user->job_title  ?: 'N/A') . "\n\n"
            . "— {$appName} Team";

        Mail::raw($body, function($msg) use ($user, $appName) {
            $msg->to($user->email, $user->name)
                ->subject("Your {$appName} Account Credentials");
        });

        $this->info("Email sent to {$user->email}");
    }
}
