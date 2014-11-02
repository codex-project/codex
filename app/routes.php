<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', 'CodexController@index');
Route::get('search/{manual}/{version}', 'SearchController@show');
Route::get('{manual}/{version?}/{page?}', 'CodexController@show')->where('page', '(.*)');
