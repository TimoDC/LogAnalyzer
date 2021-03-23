<?php

namespace App\Http\Controllers;

use App\Models\apacheLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class apacheLogController extends Controller
{
    function index()
    {
        return view("apacheLog");
    }

    function processForm(Request $request)
    {
        $filename = $request->file("file")->store("logFiles");
        $content = Storage::get($filename);
        return view("apacheLog", ["content" => $content]);
    }
}
