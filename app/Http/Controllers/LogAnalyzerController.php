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

    function loadDashBoard(int $id){
        $board = dashboard::find($id);
        $dashboards = dashboard::all();
        return view("main", ["dashboards" => $dashboards, "board" => $board]);
    }

    function addLogFile(Request $request, int $id){
        $filename = $request -> file("logFile") -> store("logFiles");
        $dashboard = dashboard::find($id);
        if($request -> input("LogType") === "Apache"){
            $dashboard -> apacheLogFile = $filename;
        }elseif($request -> input("LogType") === "Auth"){
            $dashboard -> authLogFile = $filename;
        }elseif($request -> input("LogType") === "MySQL"){
            $dashboard -> mysqlLogFile = $filename;
        }else{
            return redirect() -> back()->withErrors(['msg', 'Invalid FileType']);
        }
        $dashboard -> save();
        return redirect() -> back();
    }
}
