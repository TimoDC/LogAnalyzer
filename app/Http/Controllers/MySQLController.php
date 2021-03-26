<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use \App\Models\dashboard;
use Illuminate\Support\Str;

class MySQLController extends Controller
{
    function index(int $id) {
        $dashboards = dashboard::all();
        $dashboard = dashboard::find($id);
        $filename = $dashboard -> mysqlLogFile;

        if(Str::startsWith($filename,"/var/log/")){
            $file = fopen($filename, "r");
            $data = fread($file,filesize($filename));
            fclose($file);

        }else{
            $data = Storage::get($filename);
        }

        return view("mysql", ["content" => $data, "dashboards" => $dashboards, "board" => $dashboard]);
    }
}
