<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\dashboard;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthLogsController extends Controller
{
    function index(int $id) {
        $dashboard = dashboard::find($id);
        $dashboards = dashboard::all();
        $authlog = $dashboard -> authLogFile;

        if(Str::startsWith($authlog, "/var/log")) {
            $file = fopen($authlog, "r");
            $data = fread($file, filesize($authlog));
            fclose($file);
        } else {
            $data = $authlog;
        }

        return view("authlogs", ["authlog" => $data, "dashboards" => $dashboards, "board" => $dashboard]);
    }
}
