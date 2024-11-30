<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\TagController;
use App\Http\Controllers\api\UserController;
use App\Http\Middleware\DeleteExpiredSanctumToken;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
Route::apiResource('products', ProductController::class)->only(['index', 'show']);
Route::apiResource('tags', TagController::class)->only(['index']);
Route::apiResource('orders', controller: OrderController::class)->only('store');

// AUTHENTICATED ONLY
Route::middleware(["auth:sanctum"])->group(function () {
    // ADMIN ONLY
    Route::middleware([IsAdmin::class])->group(function () {
        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('products', ProductController::class)->except(['index', 'show']);
        Route::apiResource('tags', TagController::class)->except(['index']);

        // ORDERS
        Route::get('/orders/customers', [OrderController::class, 'customers']);
        Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
        Route::patch('/orders/{order}/payment-status', [OrderController::class, 'updatePaymentStatus']);
        Route::apiResource('orders', OrderController::class)->only('destroy', 'update');

        // USER
        Route::get('/users', [UserController::class, 'users']);
        Route::get('/user/{id}', [UserController::class, 'getUserByID']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    Route::get('/user', [UserController::class, 'user']);

    Route::get('/orders/{id}/products', [OrderController::class, 'orderProducts']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancelOrder']);
    Route::apiResource('orders', OrderController::class)->only('index', 'show');
});
