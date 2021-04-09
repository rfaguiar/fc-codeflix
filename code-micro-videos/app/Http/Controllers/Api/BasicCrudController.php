<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class BasicCrudController extends Controller
{
    protected abstract function model();

    protected abstract function ruleStore();

    public function index()
    {
        return $this->model()::all();
    }

    public function store(Request $request)
    {
        $validatedData = $this->validate($request, $this->ruleStore());
        $obj = $this->model()::create($validatedData);
        $obj->refresh();
        return $obj;
    }

//    public function store(Request $request)
//    {
//        $this->validate($request, $this->rules);
//        /** @var Category $category */
//        $category =  Category::create($request->all());
//        $category->refresh();
//        return $category;
//    }
//
//    public function show(Category $category)
//    {
//        return $category;
//    }
//
//    public function update(Request $request, Category $category)
//    {
//        $this->validate($request, $this->rules);
//        $category->update($request->all());
//        return $category;
//    }
//
//    public function destroy(Category $category)
//    {
//        $category->delete();
//        return response()->noContent();
//    }
}
