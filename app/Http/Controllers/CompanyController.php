<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function show()
    {
        return response()->json(Company::getSingleton());
    }

    public function save(Request $request)
    {
        $company = Company::getSingleton();
        $company->update($request->only([
            'name','phone','email','address',
            'currency','terms','logo','signature'
        ]));
        return response()->json(['success' => true]);
    }
}