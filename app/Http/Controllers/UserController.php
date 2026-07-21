<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;

class UserController extends Controller
{
    // Default permission sets per role
    private function defaultPermissions(string $role): array
    {
        if ($role === 'admin') {
            return [
                'catalog'  => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
                'clients'  => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
                'quotes'   => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
                'users'    => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
                'settings' => ['view'=>true,'edit'=>true],
                'stats'    => ['view'=>true],
            ];
        }
        // Default staff: view + add only, no delete
        return [
            'catalog'  => ['view'=>true,'add'=>false,'edit'=>false,'delete'=>false],
            'clients'  => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>false],
            'quotes'   => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>false],
            'users'    => ['view'=>false,'add'=>false,'edit'=>false,'delete'=>false],
            'settings' => ['view'=>false,'edit'=>false],
            'stats'    => ['view'=>true],
        ];
    }

    public function index()
    {
        return response()->json(
            User::select('id','name','email','phone','job_title','department','role','permissions','verified','created_at')
                ->orderBy('id')->get()
                ->map(function($u) {
                    $u->permissions = $u->permissions ?? $this->defaultPermissions($u->role);
                    return $u;
                })
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string|max:255',
            'email'      => 'required|email|unique:users',
            'role'       => 'required|in:admin,user',
            'phone'      => 'nullable|string|max:50',
            'job_title'  => 'nullable|string|max:100',
            'department' => 'nullable|string|max:100',
        ]);

        // Auto-generate a strong password
        $plainPassword = Str::random(10);

        $permissions = $request->input('permissions', $this->defaultPermissions($request->role));

        $user = User::create([
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => Hash::make($plainPassword),
            'role'        => $request->role,
            'phone'       => $request->phone,
            'job_title'   => $request->job_title,
            'department'  => $request->department,
            'permissions' => $permissions,
            'verified'    => true,
        ]);

        // Send credentials email after response (non-blocking)
        $userId = $user->id;
        $password = $plainPassword;
        $u = $user;
        app()->terminating(function() use ($u, $password) {
            $this->sendWelcomeEmail($u, $password);
        });

        return response()->json(['success' => true, 'id' => $user->id], 201);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->only(['name','email','role','phone','job_title','department','verified']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }
        if ($request->has('permissions')) {
            $data['permissions'] = $request->permissions;
        }
        $user->update($data);
        return response()->json(['success' => true]);
    }

    public function destroy(Request $request, User $user)
    {
        if ($user->id === $request->user()->id) {
            return response()->json(['error' => 'Cannot delete yourself'], 400);
        }
        $user->delete();
        return response()->json(['success' => true]);
    }

    private function sendWelcomeEmail(User $user, string $password): void
    {
        try {
            $appName    = config('app.name', 'Cayan Events');
            $appUrl     = config('app.url', 'https://cayan-l.vercel.app');
            $emailBody  = "
Hello {$user->name},

Your account on {$appName} has been created. Here are your login credentials:

  Login URL : {$appUrl}
  Email     : {$user->email}
  Password  : {$password}

Please log in and change your password immediately.

Role       : " . strtoupper($user->role) . "
Department : " . ($user->department ?: 'N/A') . "
Job Title  : " . ($user->job_title  ?: 'N/A') . "

If you have any questions, contact your administrator.

— {$appName} Team
            ";

            Mail::raw($emailBody, function($msg) use ($user, $appName) {
                $msg->to($user->email, $user->name)
                    ->subject("Your {$appName} Account Credentials");
            });
        } catch (\Exception $e) {
            // Log but don't fail if email doesn't send
            \Log::warning('Welcome email failed: ' . $e->getMessage());
        }
    }
}