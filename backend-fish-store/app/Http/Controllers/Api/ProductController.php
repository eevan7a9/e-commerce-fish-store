<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(["index", "show"]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return response()->json(["products" => $products], 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required",
            "description" => "required",
            "price" => "required|numeric|between:0.00,99999.99",
            "weight" => "required|numeric|between:0.00,99999.99",
        ]);
        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->weight = $request->weight;
        $product->units = $request->units > 0 ? $request->units : 1;
        // we check if there is an image file
        if ($request->image) {
            // we validate the image
            request()->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            $product->image_location = URL::asset('images').'/'.time().'.'.$request->image->getClientOriginalExtension();
            $product->image = time().'.'.$request->image->getClientOriginalExtension();
            $request->image->move(public_path('images'), $product->image);
        }
        $product->save();
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->name = $request->name ? $request->name : $product->name;
        $product->description = $request->description ? $request->description : $product->description;
        $product->price = $request->price ? $request->price : $product->price;
        $product->weight = $request->weight ? $request->weight : $product->weight;
        $product->units = $request->units ? $request->units : $product->units;
        // we check if there is an image file
        if ($request->image) {
            // we validate the image
            request()->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            // If validation is correct we delete the old image
            if(file_exists(public_path('images/'. $product->image))){
                File::delete(public_path('images/' . $product->image));
                // unlink(public_path('images/' . $product->image));
            }
            // we added the new image
            $product->image_location = URL::asset('images').'/'.time().'.'.$request->image->getClientOriginalExtension();
            $product->image = time().'.'.$request->image->getClientOriginalExtension();
            $request->image->move(public_path('images'), $product->image);
        }
        $product->update();
        return response()->json($product, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        // we check if item has an image and remove the image
        if(file_exists(public_path('images/'. $product->image))){
            unlink(public_path('images/' . $product->image));
        }
        $product->delete();
        return response()->json($product, 200);
    }
}
