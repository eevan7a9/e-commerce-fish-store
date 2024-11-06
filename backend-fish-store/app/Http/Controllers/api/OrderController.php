<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Middleware\IsAdmin;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controllers\Middleware;
use Ramsey\Uuid\Type\Decimal;
use Stripe\PaymentIntent;
use Stripe\Stripe;

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
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'line1' => 'required|string|max:1000',
            'line2' => 'nullable|string|max:1000',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            // 'status' => 'required|string|max:255',
            'payment_method' => 'required|string|in:stripe,cod',
            'payment_method_id' => 'required_if:payment_method,stripe|string',
            'order_items' => 'required|array|min:1', // expects array of items(product_id, quantity)
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
        ]);
        $validated['status'] = 'pending';
        $validated['payment_status'] = 'unpaid';

        // If Customer is authenticated user.
        if ($user = Auth::guard('sanctum')->user()) {
            $validated['user_id'] = $user->id;
            $validated['email'] = $user->email;
        }
        // We get the products to get proper price
        $productIds = array_column($validated['order_items'], 'product_id');
        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        $totalAmount = 0;
        $totalWeight = 0;
        foreach ($validated['order_items'] as $item) {
       
            $product = $products->get($item['product_id']);
            if ($product) {
                $totalAmount += $product->price * $item['quantity'];
                $totalWeight += $product->weight * $item['quantity'];
            }
        }
        $validated['total_amount'] = $totalAmount;
        $validated['total_weight'] = $totalWeight;

        if ($validated['payment_method'] === 'stripe') {
            $result = $this->handleStripePayment($validated['payment_method_id'], $totalAmount);
          
            if($result['error']) {
                return response()->json([
                    'error' => true,
                    'message' =>  $result['message'],
                    'data' => $result['data'],
                    'status' => 400
                ], 400);
            }
            // If Stripe payment is Success we update the method & status
            $validated['payment_status'] = 'paid';
            $validated['payment_method_id'] = $result->payment_method;
        }

        $order = Order::create($validated);
        $orderItems = $order->orderItems()->createMany(array_map(function ($item) use ($products) {
            return [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $products[$item['product_id']]->price,
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

    public function updateStatus(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,approved,shipped,received,cancelled',
            'payment_status' => 'required|string|in:unpaid,paid,refunded',
        ]);
        try {
            $order = Order::findOrFail($id);
            $order->status = $validated['status'];
            $order->payment_status = $validated['payment_status'];
            $order->save();

            return response()->json([
                'data' => $order,
                'status' => 200
            ], 200);
        } catch (ModelNotFoundException $err) {
            return response()->json([
                'error' => $err,
                'message' => $err->getMessage(),
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

    private function handleStripePayment(string $id, $amount)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            // Create a PaymentIntent with the order amount and currency
            $paymentIntent = PaymentIntent::create([
                'amount' => $amount * 100,
                'currency' => 'php',
                'payment_method' => $id,
                'confirm' => true,
                'automatic_payment_methods' => [
                    'enabled' => true,
                    'allow_redirects' => 'never', // Prevent redirects
                ],
            ]);
            return $paymentIntent;
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return [
                "error" => true,
                "message" =>$e->getMessage(),
                "data" => $e->getJsonBody()
            ];
        }
    }

    
}
