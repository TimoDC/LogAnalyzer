<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\dashboard;

class AuthLogsController extends Controller
{
    function index(int $id) {
        $dashboard = dashboard::find($id);
        $dashboards = dashboard::all();
        $authlog = $dashboard -> authLogFile;
        return view("authlogs", ["authlog" => $authlog, "dashboards" => $dashboards, "board" => $dashboard]);
    }
}
