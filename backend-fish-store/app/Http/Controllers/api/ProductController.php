<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('tags')->with('category')->orderBy('created_at', 'desc')->get();
        $products = $products->map(function ($product) {
            return [
                "id" => $product->id,
                "name" => $product->name,
                "price" => $product->price,
                "weight" => $product->weight,
                "units" => $product->units,
                "description" => $product->description,
                "images" => $product->images,
                "category_id" => $product->category_id,
                // get and include category name
                "category_name" => $product->category()->value('name'),
                // get and include array of tags by name
                "tags" => $product->tags()->pluck('name'),
                "created_at" => $product->created_at,
                "updated_at" => $product->updated_at,
            ];
        });
        return response()->json([
            'data' => $products,
            'status' => 200
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|between:0.00,999999.99',
            'weight' => 'required|numeric|between:0.00,9999.99',
            'units' => 'nullable|numeric',
            'description' => 'nullable|string|max:1000',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'category_id' => 'required|numeric',
            'tag_id' => 'nullable|array',
            'tag_id.*' => 'exists:tags,id'
        ]);
        $product = Product::create($validated);
        // Attach tags if they exist in the request
        if (isset($validated['tag_id'])) {
            $product->tags()->attach($validated['tag_id']);
        }
        return response()->json([
            'message' => 'Product has been created.',
            'data' => $product,
            'status' => 200
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $product = Product::with('category')
                ->with('tags')->findOrFail($id);

            // Hide pivot from tags
            $product->tags->makeHidden('pivot');

            return response()->json([
                'data' => [
                    "id" => $product->id,
                    "name" => $product->name,
                    "price" => $product->price,
                    "weight" => $product->weight,
                    "units" => $product->units,
                    "description" => $product->description,
                    "images" => $product->images,
                    "category_id" => $product->category_id,                    // get and include array of tags by name
                    "tags" => $product->tags()->pluck('name'),
                    "created_at" => $product->created_at,
                    "updated_at" => $product->updated_at,
                ],
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Product not Found!!!',
                'status' => 404
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
            'price' => 'nullable|numeric|between:0.00,999999.99',
            'weight' => 'nullable|numeric|between:0.00,9999.99',
            'units' => 'nullable|numeric',
            'description' => 'nullable|string|max:1000',
            'phone_number' => [
                'nullable',
                'string',
                'regex:/^\+?[0-9\s\-]+$/',
                'max:15' // Adjust the max length as needed
            ],
            'images' => 'nullable|array',
            'images.*' => 'string',
            'category_id' => 'nullable|numeric',
            'tag_id' => 'nullable|array',
            'tag_id.*' => 'exists:tags,id'
        ]);

        try {
            $product = Product::findOrFail($id);
            $product->update(array_filter($validated));
            if (isset($validated['tag_id'])) {
                $product->tags()->sync($validated['tag_id']);
            }
            return response()->json([
                'message' => 'Product has been updated.',
                'data' => $product,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Product is not found!!!',
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
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json([
                'message' => 'Product is Deleted.',
                'data' => $product,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Product not Found!!!',
                'status' => 404
            ], 404);
        }
    }
}
