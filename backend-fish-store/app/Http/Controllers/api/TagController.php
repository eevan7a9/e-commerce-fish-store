<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::get();
        return response()->json([
            'data' => $tags,
            'status' => 200
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $tag = Tag::create(array_filter($validated));
        return response()->json([
            'data' => $tag,
            'status' => 200
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $tag = Tag::with('products')->findOrFail($id);
            $tag->products->makeHidden('pivot');
            return response()->json([
                'data' => $tag,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Tag not Found!!!',
                'status' => 404
            ], 404);
        } 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->delete();
            return response()->json([
                'data' => $tag,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Tag not Found!!!',
                'status' => 404
            ], 404);
        }
    }
}
