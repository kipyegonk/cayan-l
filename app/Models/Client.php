<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table    = 'clients';
    protected $fillable = [
        'name','email','phone',
        'contact_person','location','address'
    ];
}