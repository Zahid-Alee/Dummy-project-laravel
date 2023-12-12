<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{

    protected $fillable = ['name', 'school_id', 'class_id', 'section_id', 'birthdate', 'parent_name', 'address'];
    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function classModel()
    {
        return $this->belongsTo(StudentClass::class, 'class_id');
    }

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class);
    }
}
