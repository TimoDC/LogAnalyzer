<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", "LogAnalyzerController@index") -> middleware("auth");

Route::get("/apache", "apacheLogController@index") -> middleware("auth");

Route::get('/memory', "MemoryController@index")->name('memory');

Route::post("/createDashBoard", "LogAnalyzerController@createDashBoard");

Route::post("apache", "apacheLogController@processForm") -> middleware("auth");

Route::get("/dashboard/{x}", "LogAnalyzerController@loadDashBoard") -> name("id");

Route::post("/addLogFile/{x}", "LogAnalyzerController@addLogFile") -> name("id") -> middleware("auth");

Route::get("/dashboard/{x}/apache", "apacheLogController@index") -> name("id");

Route::get("/dashboard/{x}/apache2", "apacheLogController@index2") -> name("id");

Route::get('/dashboard/{x}/auth', 'AuthLogsController@index') -> name('authlogs');

Auth::routes(["register" => false]);

Route::get("/home", [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/dashboard/{x}/mysql', "MySQLController@index") -> name("id");
