<?php

namespace App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use App\OauthAccessToken;
use Carbon\Carbon;

class CekTokenTransformer extends Transformer
{
    public function transform(OauthAccessToken $oauth)
    {
        return['expires_at' => $oauth->expires_at];
    }
}
