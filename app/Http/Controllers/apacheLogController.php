<?php

namespace App\Http\Controllers;

use App\Models\apacheLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use \App\Models\dashboard;
use Ramsey\Uuid\Type\Integer;
use Illuminate\Support\Str;

class apacheLogController extends Controller
{
    function index(int $id)
    {
        $dashboard = dashboard::find($id);
        $dashboards = dashboard::all();
        $filename = $dashboard -> apacheLogFile;
        if(Str::startsWith($filename,"/var/log/")){
            $file = fopen($filename, "r");
            $data = fread($file,filesize($filename));
            fclose($file);

        }else{
            $data = Storage::get($filename);
        }
        return view("apacheLog", ["content" => $data, "dashboards" => $dashboards, "board" => $dashboard]);
    }

    function index2(int $id)
    {
        $dashboard = dashboard::find($id);
        $dashboards = dashboard::all();
        $filename = $dashboard -> apacheErrorLogFile;
        $content = "";
        if(Str::startsWith($filename,"/var/log/")){
            $file = fopen($filename, "r");
            $data = fread($file,filesize($filename));
            fclose($file);

        }else{
            $data = Storage::get($filename);
        }
        return view("apache2", ["content" => $data, "dashboards" => $dashboards, "board" => $dashboard]);
    }
}
