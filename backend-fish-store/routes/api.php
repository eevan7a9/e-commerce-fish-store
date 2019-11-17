<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () { // domain/api/v1/

    Route::post('/register', 'Api\AuthController@register');
    Route::post('/login', 'Api\AuthController@login');

    Route::post('product/{id}', 'Api\ProductController@update')->name("product_update");
    Route::resource('product', 'Api\ProductController');

    Route::post('/checkout', 'Api\CheckoutController@checkoutCard')->name("checkout");

    Route::post('/order', 'Api\OrderController@store')->name("order.store");    
    
    Route::group(['middleware' => ['auth:api']], function () { // Authenticated Users Only
        Route::get('/user', 'Api\AuthController@userInfo');
        Route::get('/logout', 'Api\AuthController@logout');

        Route::get('/order', 'Api\OrderController@index')->name("order.index");
        Route::get('/order/{id}', 'Api\OrderController@show')->name("order.show");
        // Route::post('/order', 'Api\OrderController@store')->name("order.store");
        Route::post('/order/{id}', 'Api\OrderController@update')->name("order.update");
        Route::delete('/order/{id}', 'Api\OrderController@destroy')->name("order.destroy");

    });
});
