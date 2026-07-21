<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name','email','password','role','verified',
        'phone','job_title','department','permissions',
    ];
    protected $hidden = ['password','remember_token'];
    protected $casts  = [
        'verified'    => 'boolean',
        'password'    => 'hashed',
        'permissions' => 'array',
    ];

    public function isAdmin(): bool { return $this->role === 'admin'; }

    public function hasPermission(string $module, string $action): bool
    {
        if ($this->role === 'admin') return true;
        return (bool) ($this->permissions[$module][$action] ?? false);
    }
}