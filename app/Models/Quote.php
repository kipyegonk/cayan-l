<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $table    = 'quotes';
    protected $fillable = [
        'number','client_id','client_name','contact_person',
        'venue','no_of_guests','quote_date','valid_until',
        'status','subtotal','vat_rate','vat_amount',
        'total','notes','created_by',
    ];
    protected $casts = [
        'quote_date'  => 'date',
        'valid_until' => 'date',
        'subtotal'    => 'float',
        'vat_rate'    => 'float',
        'vat_amount'  => 'float',
        'total'       => 'float',
    ];

    public function items()
    {
        return $this->hasMany(QuoteItem::class)
                    ->orderBy('sort_order');
    }

    public static function nextNumber(): string
    {
        $last = self::orderBy('id', 'desc')->value('number');
        if (!$last) return 'SN 001';
        preg_match('/(\d+)$/', $last, $m);
        $n = isset($m[1]) ? intval($m[1]) + 1 : 1;
        return 'SN ' . str_pad($n, 3, '0', STR_PAD_LEFT);
    }
}