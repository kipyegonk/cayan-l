<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'user_id','user_name','user_email',
        'action','module','target','description',
        'ip_address','user_agent',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    // Static helper to log from anywhere
    public static function record(
        string $action,
        ?string $module = null,
        ?string $target = null,
        ?string $description = null,
        $request = null
    ): void {
        try {
            $user = $request ? $request->user() : auth()->user();
            static::create([
                'user_id'    => $user?->id,
                'user_name'  => $user?->name,
                'user_email' => $user?->email,
                'action'     => $action,
                'module'     => $module,
                'target'     => $target,
                'description'=> $description,
                'ip_address' => $request?->ip(),
                'user_agent' => $request?->userAgent(),
            ]);
        } catch (\Exception $e) {
            \Log::warning('Audit log failed: ' . $e->getMessage());
        }
    }
}
