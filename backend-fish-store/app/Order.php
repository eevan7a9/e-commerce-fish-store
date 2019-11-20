<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    public function products()
    {
        return $this->belongsToMany(Product::class)
            ->withPivot(['quantity', 'amount', 'weight'])->withTimestamps();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
