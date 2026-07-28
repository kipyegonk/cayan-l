<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\AuditLog;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid email or password'], 401);
        }
        if (!$user->verified) {
            return response()->json(['error' => 'Account not verified'], 403);
        }
        $token = $user->createToken('api-token')->plainTextToken;
        AuditLog::record('login', null, null, "Logged in successfully", $request);
        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => $this->userArray($user),
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:150',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'user',
            'verified' => false,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Registration submitted. Admin will verify your account.',
        ], 201);
    }

    public function verify(Request $request)
    {
        return response()->json([
            'valid' => true,
            'user'  => $this->userArray($request->user()),
        ]);
    }

    public function logout(Request $request)
    {
        AuditLog::record('logout', null, null, "Logged out", $request);
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password'     => 'required|min:6',
        ]);
        if (!Hash::check($request->current_password, $request->user()->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }
        $request->user()->update([
            'password' => Hash::make($request->new_password)
        ]);
        return response()->json(['success' => true]);
    }

    private function userArray(User $user): array
    {
        // Default permissions for admin
        $defaultAdminPerms = [
            'catalog'  => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
            'clients'  => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
            'quotes'   => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
            'users'    => ['view'=>true,'add'=>true,'edit'=>true,'delete'=>true],
            'settings' => ['view'=>true,'edit'=>true],
            'stats'    => ['view'=>true],
        ];

        return [
            'id'          => $user->id,
            'name'        => $user->name,
            'email'       => $user->email,
            'role'        => $user->role,
            'verified'    => $user->verified,
            'permissions' => $user->role === 'admin'
                ? $defaultAdminPerms
                : ($user->permissions ?? []),
        ];
    }
}