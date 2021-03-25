<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;   
use \App\Models\dashboard;

class MemoryController extends Controller
{
    function index(){
        $dashboards = dashboard::all();
        //return view("memory");
        //"main", ["dashboards" => $dashboards]
        return view("memory", ["dashboards" => $dashboards]);
    }
}
