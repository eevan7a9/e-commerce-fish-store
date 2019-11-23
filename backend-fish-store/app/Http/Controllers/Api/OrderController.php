<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use App\Product;
use App\User;
use Cartalyst\Stripe\Exception\CardErrorException;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display All the lists of Orders
     */

    public function index()
    {
        $user = Auth::user();
        if ($user->role === 'admin') {
            $orders = Order::all();
        } else {
            $orders = Order::where('user_id', '=', $user->id)->get();
        }
        foreach ($orders as $key => $order) {
            $order->products;
        }

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
        // validate request credentials
        $request->validate([
            'address' => 'required',
            'country' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postal_code' => 'required|numeric',
            'phone' => 'required|numeric',
            'email' => 'required',
            'payment_method' => 'required',
        ]);

        if ($request->payment_method === 'card') {

            $request->validate([
                'token' => 'required',
                'last4' => 'required',
            ]);
        }else{
            // if payment is not using card 
            // we check if the user is authenticated
            $user = Auth::guard('api')->user();

            if (!$user) {
                return response()->json([
                    "message" => "COD is for authenticated users only"
                ], 403);
            }
        }

        // we get the cart item equivalent product from database;
        $cart = $this->getCartItems($request->items);
        // we check if error exists in cart
        if ($cart['error']) {

            return response()->json([
                "message" => "Sorry we cant satisfy this order",
            ], 400);
        }

        // we send payment action to Stripe
        try {
            
            if ($request->payment_method === "card") {
                $charge = Stripe::charges()->create([
                    'amount' => $cart['amount'],
                    'currency' => 'USD',
                    'source' => $request->token, // token
                    'description' => 'Online Fish store payments',
                    'receipt_email' => $request->email,
                    'metadata' => [
                        'Items' => $cart['items'],
                        'Total Quantity' => $cart['quantity'],
                        'Total Price' => $cart['amount'],
                        'Total Weight' => $cart['weight'],
                    ],
                ]);
            }
            // we get user if its authetticated
            $user = Auth::guard('api')->user();

            $order = new Order();
            // if user is authenticated assign user 'id'...
            $order->user_id = $user ? $user->id : null;
            $order->description = 'Online Fish store payments';

            $order->quantity = $cart['quantity'];
            $order->amount = $cart['amount'];
            $order->weight = $cart['weight'];

            $order->address = $request->address;
            $order->country = $request->country;
            $order->city = $request->city;
            $order->state = $request->state;
            $order->postal_code = $request->postal_code;

            $order->phone = $request->phone;
            $order->email = $request->email;

            if ($request->payment_method === "card") {
                $order->charge_id = $charge['id'];
                $order->last4 = $request->last4;
                $order->payment_method = $request->payment_method;
                $order->receipt_url = $charge['receipt_url'];
                $order->paid = $charge['paid'];
            }

            $order->save();

            foreach ($request->items as $key => $item) {
                $product = Product::find($item['id']);
                if ($product) {
                    $order->products()->syncWithoutDetaching([
                        $item['id'] => [
                            "quantity" => $item['quantity'],
                            "amount" => $product->price * $item['quantity'],
                            "weight" => $product->weight * $item['quantity'],
                        ],
                    ]);
                }
            }

            $message = "";
            if ($request->payment_method === "card") {
                $message = 'Thank you! Your payment has been accepted.';
            }else{
                $message = 'Thank you! Your order is now being processed';
            }

            return response()->json([
                'order' => $order,
                'message' => $message 
            ], 201);

        } catch (CardErrorException $e) {
            // save info to database for failed
            // return back()->withErrors('Error! ' . $e->getMessage());
            return response()->json($e->getMessage());
        }

    }
    /**
     * we get Products according to carts item id
     */
    public function getCartItems($items)
    {
        $cart_items = "";
        $amount = 0.00;
        $weight = 0.00;
        $quantity = 0;

        $error = false;

        $len = count($items);
        foreach ($items as $index => $item) {
            // we check and get  the item from database
            $product = Product::find($item["id"]);

            if ($product) {
                // we check if there is enough available products
                if ($product->units >= $item['quantity']) {

                    if ($index === $len - 1) {
                        // if item is the last iteration
                        $cart_items .= $item["name"] . " : " . $item["quantity"];
                    } else {
                        // regular iteration
                        $cart_items .= $item["name"] . " : " . $item["quantity"] . ", | ";
                    }
                    $amount += ($product->price * $item["quantity"]);
                    $weight += ($product->weight * $item["quantity"]);
                    $quantity += $item['quantity'];
                } else {

                    $error = true;
                    break;
                }
            } else {

                $error = true;
                break;
            }
        }
        $cart = [
            "items" => $cart_items,
            "quantity" => $quantity,
            "amount" => $amount,
            "weight" => $weight,
            "error" => $error,
        ];
        return $cart;
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
