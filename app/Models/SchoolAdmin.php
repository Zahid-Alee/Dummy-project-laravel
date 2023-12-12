<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolAdmin extends Model
{
    use HasFactory;
    protected $fillable = ['school_id', 'user_id'];
    public function school()
    {
        return $this->hasOne(School::class);
    }
}
