<?php
namespace App\Http\Controllers;
use App\Models\Quote;
use App\Models\Client;
use App\Models\CatalogItem;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'total_quotes'  => Quote::count(),
            'total_value'   => (float) Quote::sum('total'),
            'pending'       => Quote::where('status','pending')->count(),
            'accepted'      => Quote::where('status','accepted')->count(),
            'clients'       => Client::count(),
            'catalog_items' => CatalogItem::count(),
        ]);
    }
}