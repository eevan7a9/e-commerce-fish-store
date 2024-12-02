<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::get();
        return response()->json([
            'data' => $categories,
            'status' => 200
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $name = $request->input('name');
        // $description = $request->input('description');
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000'
        ]);

        $category = Category::create($validated);

        return response()->json([
            'message' => 'Category has been created.',
            'data' => $category,
            'status' => 201
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $category = Category::find($id);
            return response()->json([
                'data' => $category,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Category is not found!!!',
                'status' => 404,
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000'
        ]);
        try {
            $category = Category::findOrFail($id);
            $category->update(array_filter($validated));
            return response()->json([
                'message' => 'Category has been updated.',
                'data' => $category,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Category is not found!!!',
                'status' => 404
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();
            return response()->json([
                'message' => 'Category is deleted!',
                'data' => $category,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'message' => 'Category is not found!!!',
                'error' => $err,
                'status' => 404
            ], 404);
        }
    }
}
