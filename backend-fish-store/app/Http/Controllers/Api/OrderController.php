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

        $order = new Order();
        $order->product_id = $request->product_id;
        $order->user_id = $request->user_id;
        $order->quantity = $request->quantity;
        $order->address = $request->address;
        $order->save();
        return response()->json($order, 201);
    }
    /**
     *  Update Order base on 'id'
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => "numeric",
            'is_delivered' => "boolean",
        ]);
        $order = Order::findOrFail($id);
        $order->quantity = $request->quantity ? $request->quantity : $order->quantity;
        $order->address = $request->address ? $request->address : $order->address;
        $order->is_delivered = $request->is_delivered ? $request->is_delivered : $order->is_delivered;
        $order->update();

        return response()->json($order, 201);
    }
    /**
     *  Delete a Order base on 'id'
     */
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(["message" => "Order deleted successfuly"], 200);
    }
}
