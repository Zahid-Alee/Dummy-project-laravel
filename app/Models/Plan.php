<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use HasFactory;
    use SoftDeletes;


    protected $fillable = [
        'title',
        'price',
    ];


    public function features()
    {
        return $this->belongsToMany(Feature::class);
    }  

    public function users()
    {
        return $this->belongsToMany(User::class, 'plan_user')->withTimestamps();
    }

    public function notifications():HasMany{

        return $this->hasMany(Notification::class);
    }
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class, 'plan_id');
    }
}
