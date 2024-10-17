<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Middleware\IsAdmin;
use App\Models\Order;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controllers\Middleware;

class OrderController extends Controller implements HasMiddleware
{

    public static function middleware(): array
    {

        return [
            // Only Authenticated can view their Orders
            new Middleware(['auth:sanctum'], only: ['show', 'index']),
            // Only Admin can delete or update
            new Middleware([
                'auth:sanctum',
                IsAdmin::class
            ], only: ['destroy', 'update']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $orders = $user->is_admin ?
            Order::get() :
            Order::where('user_id', $user->id)->get();

        return response()->json([
            'data' => $orders,
            'status' => 200
        ], 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|max:255',
            'shipping_address_line1' => 'required|string|max:1000',
            'shipping_address_line2' => 'nullable|string|max:1000',
            'shipping_city' => 'required|string|max:255',
            'shipping_state' => 'required|string|max:255',
            'shipping_zip_code' => 'required|string|max:255',
            'shipping_country' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'order_items' => 'required|array|min:1', // expects array of items(product_id, price, quantity)
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric|min:0',
        ]);

        // If Customer is authenticated user.
        if ($user = Auth::guard('sanctum')->user()) {
            $validated['user_id'] = $user->id;
            $validated['email'] = $user->email;
        }

        $order = Order::create($validated);

        $orderItems = $order->orderItems()->createMany(array_map(function ($item) {
            return [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $item['price']
            ];
        }, $validated['order_items']));

        // append order_items to $order before we return to client
        $order->orderItems = $orderItems;

        return response()->json([
            'message' => 'Order has been created.',
            'data' => $order,
            'status' => 201
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $order = Order::with('orderItems')->findOrFail($id);
            return response()->json([
                'data' => $order,
                'status' => 200
            ]);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Order not Found!!!',
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
            $order = Order::findOrFail($id);
            $order->delete();

            return response()->json([
                'message' => 'Order is Deleted.',
                'data' => $order,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => 'Order not Found!!!',
                'status' => 404
            ], 404);
        }
    }
}
