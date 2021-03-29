<?php

namespace App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use App\User;
use Carbon\Carbon;

class UserTransformer extends Transformer
{
    public function transform(User $user)
    {
        $now = Carbon::now('Asia/Jakarta')->format('H');
        return [
            'id'    => $user->encodeId(),
            'nama'  => $user->nama,
            'email' => $user->email,
        ];
    }
}
