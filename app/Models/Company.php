<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table    = 'company';
    protected $fillable = [
        'name','phone','email','address',
        'currency','terms','logo','signature'
    ];

    public static function getSingleton(): self
    {
        return self::firstOrCreate(['id' => 1], [
            'name'     => 'Cayan Events Ke.',
            'phone'    => '0737 611 658',
            'email'    => 'cayaneventsanddecor@gmail.com',
            'address'  => 'Mokoyeti West Road, Karen',
            'currency' => 'KES',
        ]);
    }
}