<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Hashids\Hashids;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'nama', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function encodeId(){
      $hashids = new Hashids('Pr0J3cT1',6);
      return $hashids->encode($this->id);
    }

    public function OauthAccessToken(){
      return $this->hasMany('OauthAccessToken');
   }
}
