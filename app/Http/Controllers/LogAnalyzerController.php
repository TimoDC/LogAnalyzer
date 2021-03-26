<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\dashboard;

class LogAnalyzerController extends Controller
{
    function index()
    {
        $dashboards = dashboard::all();
        return view("main", ["dashboards" => $dashboards]);
    }

    function createDashBoard(Request $request)
    {
        $name = $request->input("name");
        $discription = $request->input("discription");
        $dashboard = new dashboard();
        $dashboard->name = $name;
        $dashboard->description = $discription;
        $dashboard->save();
        return redirect()->back();
    }

    function loadDashBoard(int $id)
    {
        $board = dashboard::find($id);
        $dashboards = dashboard::all();
        return view("main", ["dashboards" => $dashboards, "board" => $board]);
    }

    function addLogFile(Request $request, int $id)
    {
        if ($request->input("OSFile") !== "on") {
            $filename = $request->file("logFile")->store("logFiles");
        }
        $dashboard = dashboard::find($id);
        if ($request->input("LogType") === "Apache") {
            if ($request->input("OSFile") === "on") {
                $dashboard->apacheLogFile = "/var/log/apache2/access.log";
            } else {
                $dashboard->apacheLogFile = $filename;
            }
        } elseif ($request->input("LogType") === "Auth") {
            if ($request->input("OSFile") === "on") {
                $dashboard->authLogFile = "/var/log/auth.log";
            } else {
                $dashboard->authLogFile = $filename;
            }
        } elseif ($request->input("LogType") === "MySQL") {
            if ($request->input("OSFile") === "on") {
                $dashboard->mysqlLogFile = "/var/log/mysql-general.log";
            } else {
                $dashboard->mysqlLogFile = $filename;
            }
        } elseif ($request->input("LogType") === "Apache2") {
            if ($request->input("OSFile") === "on") {
                $dashboard->apacheErrorLogFile = "/var/log/apache2/error.log";
            } else {
                $dashboard->apacheErrorLogFile = $filename;
            }
        } else {
            return redirect()->back()->withErrors(['msg', 'Invalid FileType']);
        }
        $dashboard->save();
        return redirect()->back();
    }

    function deleteDashBoard(int $id){
        dashboard::find($id) -> delete();
        $dashboards = dashboard::all();
        return view("main", ["dashboards" => $dashboards]);
    }
}
