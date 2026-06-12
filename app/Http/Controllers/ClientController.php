<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        return response()->json(Client::orderBy('name')->get());
    }

    public function show($id)
    {
        return response()->json(Client::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string']);
        $client = Client::create($request->only([
            'name','email','phone',
            'contact_person','location','address'
        ]));
        return response()->json(['success' => true, 'id' => $client->id], 201);
    }

    public function update(Request $request, $id)
    {
        Client::findOrFail($id)->update($request->only([
            'name','email','phone',
            'contact_person','location','address'
        ]));
        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        Client::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}