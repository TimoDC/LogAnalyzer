<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\dashboard;

class LogAnalyzerController extends Controller
{
    function index(){
        $dashboards = dashboard::all();
        return view("main", ["dashboards" => $dashboards]);
    }

    function createDashBoard(Request $request){
        $name = $request -> input("name");
        $discription = $request -> input("discription");

        $dashboard = new dashboard();

        $dashboard -> name = $name;
        $dashboard -> description = $discription;

        $dashboard -> save();

        return redirect() -> back();
    }

    function loadDashBoard(Request $request, int $id){
        $dashboard = dashboard::find($id);
        $dashboards = dashboard::all();
        return view("main", ["dashboards" => $dashboards, "dashboard" => $dashboard]);
    }

}
