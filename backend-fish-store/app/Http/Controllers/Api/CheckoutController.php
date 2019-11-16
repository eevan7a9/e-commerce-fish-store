<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Product;
use Cartalyst\Stripe\Exception\CardErrorException;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function checkoutCard(Request $request)
    {
    	// we get the cart data from database to validate it
    	$cart = $this->getCartItems($request->items);
    	try {
	        $charge = Stripe::charges()->create([
	            'amount' => $cart['amount'],
	            'currency' => 'USD',
	            'source' => $request->stripe["token"]['id'], // token
	            'description' => 'Online Fish store payments',
	            'receipt_email' => $request->email,
	            'metadata' => [
	                'Items' => $cart['items'],
        			'Total Quantity' => $cart['quantity'],
	                'Total Price' => $cart['amount'],
	                'Total Weight' => $cart['weight'],
	            ],
	        ]);
	        // save this info to your database
	        // SUCCESSFUL
	        return response()->json([
	        	"message" => "Success,Payment submited",
	        	"charge" => $charge
	        ]);

	        // return back()->with('success_message', 'Thank you! Your payment has been accepted.');
	    } catch (CardErrorException $e) {
	        // save info to database for failed
	        // return back()->withErrors('Error! ' . $e->getMessage());
	        return response()->json($e->getMessage());
	    }
    	
    }
    public function getCartItems($items)
    {
    	$cart_items = "";
    	$amount = 0.00;
    	$weight = 0.00;
    	$quantity = 0;

    	$len = count($items);
    	foreach ($items as $index => $item) {
    		// we check and get  the item from database
    		$product = Product::find($item["id"]);
    		
    		if ($product) {

			    if ($index === $len - 1) { 
			    	// if item is the last iteration
			        $cart_items .= $item["name"] . " : " . $item["quantity"];
			    }else{ 
			    	// regular iteration
			    	$cart_items .= $item["name"] . " : " . $item["quantity"] .", | ";
			    }
    			$amount += ($product->price * $item["quantity"]);
    			$weight += ($product->weight * $item["quantity"]);
    			$quantity += $item['quantity'];
    		}
    	}
    	$cart = [
    		"items" => $cart_items,
    		"quantity" => $quantity,
    		"amount" => $amount,
    		"weight" => $weight
    	];
    	return $cart;
    }
}
