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

Route::post("apache", "apacheLogController@processForm") -> middleware("auth");

Auth::routes(["register" => false]);

Route::get("/home", [App\Http\Controllers\HomeController::class, 'index'])->name('home');
