<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'user_id',
        'plan_id',
        'message',
        'read_at'
    ];


    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function plans(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }
}
