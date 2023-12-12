<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Dummy district data
        $districts = [
            ['name' => 'District 1', 'city' => 'City A'],
            ['name' => 'District 2', 'city' => 'City B'],
            // Add more dummy data as needed
        ];

        // Insert data into the 'districts' table
        foreach ($districts as $district) {
            DB::table('districts')->insert($district);
        }
    }
}
