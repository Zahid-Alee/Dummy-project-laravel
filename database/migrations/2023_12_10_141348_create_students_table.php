<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('school_id'); 
            $table->unsignedBigInteger('class_id'); 
            $table->unsignedBigInteger('section_id');
            $table->string('name', 100);
            $table->date('birthdate');
            $table->string('parent_name', 100);
            $table->string('address')->nullable();
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade'); 
            $table->foreign('class_id')->references('id')->on('student_classes')->onDelete('cascade');
            $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
