<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Vật phẩm đổi bằng xu (config/shop.php). Mỗi lần đổi 1 dòng — xem App\Services\ShopService.
class UserItem extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = ['user_id', 'item', 'price', 'created_at'];
}
