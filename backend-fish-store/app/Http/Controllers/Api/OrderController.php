<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display All the lists of Orders
     */

    public function index()
    {
        $orders = Order::all();
        return response()->json($orders, 200);
    }
    /**
     * show single order base on 'id'
     */
    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order, 200);
    }
    /**
     * Save New order to the database
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'quantity' => 'required|numeric',
            'address' => 'required',
        ]);
        return response()->json($validated, 201);
    }
    /**
     *  Update Order base on 'id'
     */
    public function update(Request $request, $id)
    {
        return response()->json("update");
    }
    /**
     *  Delete a Order base on 'id'
     */
    public function destroy($id)
    {
        return response()->json(["delete" => $id], 200);
    }
}
