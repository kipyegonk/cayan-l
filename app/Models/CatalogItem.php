<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CatalogItem extends Model
{
    protected $table    = 'catalog';
    protected $fillable = [
        'name','category','unit','description',
        'cost_price','margin','unit_price'
    ];
    protected $casts = [
        'cost_price' => 'float',
        'margin'     => 'float',
        'unit_price' => 'float',
    ];
}