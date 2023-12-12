<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    public function district()
    {
        return $this->belongsTo(District::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function classes()
    {
        return $this->hasMany(StudentClass::class);
    }

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }
    protected $fillable=['district_id','name','location','address'];
}
