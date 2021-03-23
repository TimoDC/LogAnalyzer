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

Auth::routes(["register" => false]);

Route::get("/home", [App\Http\Controllers\HomeController::class, 'index'])->name('home');
