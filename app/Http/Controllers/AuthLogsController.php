<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthLogsController extends Controller
{
    function index() {
        return view("authlogs");
    }

    function upload(Request $request) {
        $data = $this -> validation($request);

        $authlog = $data["authlog"] -> store("authlog");

        return view("authlog-uploaded");
    }

    function validation(Request $request) {
        $rules = [
            "authlog" => "required|mimes:log"
        ];

        return $request -> validate($rules);
    }
}
