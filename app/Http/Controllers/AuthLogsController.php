<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthLogsController extends Controller
{
    function index() {
        return view("authlogs");
    }
}
