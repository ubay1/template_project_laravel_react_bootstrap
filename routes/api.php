<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->group(function () {
   Route::prefix('auth')->group(function () {
      Route::post('register','UserController@register');
      Route::post('login','UserController@login');
      Route::post('forgot_password', 'UserController@forgotPassword');
      
      Route::middleware(['auth:api'])->group(function(){
         Route::post('logout','UserController@logout');
         Route::post('cektoken', 'UserController@cektoken');
      });
   });
   
   Route::middleware(['auth:api'])->group(function(){
      Route::get('show', 'UserController@show');
    });
});

Route::get('test', 'UserController@test');
