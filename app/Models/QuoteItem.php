<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class QuoteItem extends Model
{
    protected $table    = 'quote_items';
    protected $fillable = [
        'quote_id','type','section','subsection',
        'name','qty','unit_price','price','sort_order'
    ];
    protected $casts = [
        'qty'        => 'float',
        'unit_price' => 'float',
        'price'      => 'float',
    ];
}