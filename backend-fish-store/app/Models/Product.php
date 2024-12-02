<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'weight',
        'units',
        'description',
        'images',
        'category_id'
    ];
    protected $attributes = [
        'images' => '[]', // Initialize as an empty JSON array
    ];
    protected $casts = [
        'images' => 'array'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
}
