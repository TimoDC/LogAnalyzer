<?php

namespace App\Http\Controllers;

use App\Models\apacheLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use \App\Models\dashboard;
use Ramsey\Uuid\Type\Integer;

class apacheLogController extends Controller
{
    function index(int $id)
    {
        $dashboard = dashboard::find($id);
        $filename = $dashboard -> apacheLogFile;
        $content = "<script>
        let promise = fetch('/" . $filename . " ')
            .then(response => response.text())
        </script>
        ";
        return view("apacheLog", ["content" => $content]);
    }
}
