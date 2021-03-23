<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MySQLController extends Controller
{
    function index() {
        return view("mysql");
    }

    function processForm(Request $request)
    {   
        $filename = $request->input("filename");
        if(Storage::exists("logFiles/" . $filename)){
            $filename = $this -> changeName($filename, 1);
        }
        $filename = $request->file("file")->storeAs("logFiles", $filename);
        $content = Storage::get($filename);
        return view("mysql", ["content" => $content]);
    }

    function changeName(String $filename, int $num){
        while (Storage::exists("logFiles/" . $filename . $num)){
            $num +=1;
        }
        echo "File Already exists, Filename is changed to " . $filename . $num;
        return $filename . $num;
    }
}
