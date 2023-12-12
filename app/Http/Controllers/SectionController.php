<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{



    public function index()
    {
        // Retrieve all sections
        $sections = Section::with('class')->get();

        // Return the sections as JSON
        return response()->json($sections);
    }
    public function getSections($id)
    {
        // Retrieve all sections agi
        $sections = Section::with('class')->where('class_id', $id)->get();

        // Return the sections as JSON
        return response()->json($sections);
    }

    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'class_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer',
        ]);

        // Create a new section
        $section = Section::create($validatedData);

        // Return the newly created section as JSON
        return response()->json($section);
    }

    public function update(Request $request, $id)
    {
        // Find the section by ID
        $section = Section::findOrFail($id);

        // Validate incoming request data
        $validatedData = $request->validate([
            'class_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'capacity' => 'required|integer',
        ]);

        // Update the section with the validated data
        $section->update($validatedData);

        // Return the updated section as JSON
        return response()->json($section);
    }

    public function destroy($id)
    {
        // Find the section by ID
        $section = Section::findOrFail($id);

        // Soft delete the section
        $section->delete();

        // Return a success message as JSON
        return response()->json(['message' => 'Section deleted successfully']);
    }
}
