<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "price" => $this->price,
            "weight" => $this->weight,
            "units" => $this->units,
            "description" => $this->description,
            "images" => $this->images,
            "category_id" => $this->category_id,
            "category_name" => $this->category->name,
            "tags" => $this->tags->pluck('name'),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
