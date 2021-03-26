<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use \App\Models\dashboard;

class MySQLController extends Controller
{
    function index(int $id) {
        $dashboards = dashboard::all();
        $dashboard = dashboard::find($id);
        $filename = $dashboard -> mysqlLogFile;
        $content = "<script>
        let promise = fetch('/" . $filename . " ')
            .then(response => response.text())
        </script>
        ";

        return view("mysql", ["content" => $content, "dashboards" => $dashboards, "board" => $dashboard]);
    }
}
