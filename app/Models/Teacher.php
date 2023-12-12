<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = ['class_id','school_id','user_id','section_id'];
    public function school()
    {
        return $this->hasOne(School::class);
    }
    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    public function classes()
    {
        return $this->belongsToMany(StudentClass::class);
    } 
    
    public function user()
    {
        return $this->hasOne(User::class);
    }
}
