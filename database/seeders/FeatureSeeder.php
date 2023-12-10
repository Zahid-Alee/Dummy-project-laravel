<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Feature;

class FeatureSeeder extends Seeder
{
    public function run()
    {
        $features = [
            'Seat Washing',
            'Vacuum Cleaning',
            'Exterior Cleaning',
            'Interior Wet Cleaning',
            'Window Wiping',
            'Clay Bar Treatment',
            'Polishing',
            'Ceramic Coating',
            'Wheel Cleaning',
            'Undercarriage Wash',
            'Hand Waxing',
            'Headlight Restoration',
            'Interior Detailing',
            'Odor Removal',
            'Engine Bay Cleaning',
        ];

        foreach ($features as $feature) {
            Feature::create([
                'name' => $feature,
            ]);
        }
    }
}

