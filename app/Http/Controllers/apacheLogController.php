<?php

namespace App\Http\Controllers;

use App\Models\apacheLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Type\Integer;

class apacheLogController extends Controller
{
    function index()
    {
        return view("apacheLog");
    }

    function processForm(Request $request)
    {   
        $filename = $request->input("filename");
        if(Storage::exists("logFiles/" . $filename)){
            $filename = $this -> changeName($filename, 1);
        }
        $filename = $request->file("file")->storeAs("logFiles", $filename);

        $content = "<script>
        let promise = fetch('" . $filename . " ')
            .then(response => response.text())
        </script>
        ";

        return view("apacheLog", ["content" => $content]);
    }

    function changeName(String $filename, int $num){
        while (Storage::exists("logFiles/" . $filename . $num)){
            $num +=1;
        }
        echo "File Already exists, Filename is changed to " . $filename . $num;
        return $filename . $num;
    }

}
