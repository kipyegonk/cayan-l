<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\AuditLog;
use App\Models\CatalogItem;

class CatalogController extends Controller
{
    public function index()
    {
        return response()->json(
            CatalogItem::orderBy('category')->orderBy('name')->get()
        );
    }

    public function show($id)
    {
        return response()->json(CatalogItem::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string']);
        $item = CatalogItem::create($request->only([
            'name','category','unit','description',
            'cost_price','margin','unit_price'
        ]));
        return response()->json(['success' => true, 'id' => $item->id], 201);
    }

    public function update(Request $request, $id)
    {
        CatalogItem::findOrFail($id)->update($request->only([
            'name','category','unit','description',
            'cost_price','margin','unit_price'
        ]));
        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        CatalogItem::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}