<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Cartalyst\Stripe\Exception\CardErrorException;

class CheckoutController extends Controller
{
    public function checkoutCard(Request $request)
    {
    	try {
	        $charge = Stripe::charges()->create([
	            'amount' => 10,
	            'currency' => 'USD',
	            'source' => $request->stripe["token"]['id'], // token
	            'description' => 'Description goes here',
	            'receipt_email' => 'email@email.com',
	            'metadata' => [
	                'data1' => 'metadata 1',
	                'data2' => 'metadata 2',
	                'data3' => 'metadata 3',
	            ],
	        ]);
	        // save this info to your database
	        // SUCCESSFUL
	        return response()->json($charge);
	        // return back()->with('success_message', 'Thank you! Your payment has been accepted.');
	    } catch (CardErrorException $e) {
	        // save info to database for failed
	        // return back()->withErrors('Error! ' . $e->getMessage());
	        return response()->json($e->getMessage());
	    }
    	
    }
}
