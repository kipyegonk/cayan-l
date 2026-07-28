<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\AuditLog;
use App\Models\Quote;
use App\Models\QuoteItem;

class QuoteController extends Controller
{
    public function index()
    {
        return response()->json(Quote::orderBy('id','desc')->get());
    }

    public function show($id)
    {
        return response()->json(Quote::with('items')->findOrFail($id));
    }

    public function store(Request $request)
    {
        $data               = $request->except('items');
        $data['number']     = Quote::nextNumber();
        $data['created_by'] = $request->user()->name;
        $quote = Quote::create($data);
        $this->saveItems($quote, $request->input('items', []));
        AuditLog::record('create','quotes','Quote #'.($quote->number ?? $quote->id),'Created new quote',$request);
        return response()->json([
            'success' => true,
            'id'      => $quote->id,
            'number'  => $quote->number,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $quote = Quote::findOrFail($id);
        $quote->update($request->except('items'));
        QuoteItem::where('quote_id', $id)->delete();
        $this->saveItems($quote, $request->input('items', []));
        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        Quote::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    private function saveItems(Quote $quote, array $items): void
    {
        foreach ($items as $i => $item) {
            if (isset($item['section'])) {
                QuoteItem::create([
                    'quote_id'   => $quote->id,
                    'type'       => 'section',
                    'section'    => $item['section'],
                    'sort_order' => $i,
                ]);
            } elseif (isset($item['subsection'])) {
                QuoteItem::create([
                    'quote_id'   => $quote->id,
                    'type'       => 'subsection',
                    'subsection' => $item['subsection'],
                    'sort_order' => $i,
                ]);
            } else {
                QuoteItem::create([
                    'quote_id'   => $quote->id,
                    'type'       => 'item',
                    'name'       => $item['name']       ?? '',
                    'qty'        => $item['qty']        ?? 0,
                    'unit_price' => $item['unit_price'] ?? 0,
                    'price'      => $item['price']      ?? 0,
                    'sort_order' => $i,
                ]);
            }
        }
    }
}