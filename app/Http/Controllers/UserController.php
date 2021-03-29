<?php

namespace App\Http\Controllers;

use App\User;
use Validator;
use Carbon\Carbon;
use App\OauthAccessToken;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Transformers\UserTransformer;
use App\Transformers\CekTokenTransformer;

class UserController extends Controller
{
	public function test()
	{
		return 'hallo guys';
	}

	public function register(Request $request)
	{
		$message = [
			"required"         => ":attribute wajib diisi",
			"email.regex"      => "Email harus mengandung karakter '@'",
			"password.min"     => "Password minimal :min karakter",
			"password.regex"   => "Password harus mengandung setidaknya 1 karakter khusus.",
		];

		$validator = Validator::make($request->all(), [
				'nama'      => 'required',
				'email'     => 'required|regex:/^.+@.+$/i',
				'password'  => 'required|min:8|regex:/^(?=.*?[#?!@$%^&*-]).{6,}$/',
		], $message);

		if ($validator->fails()){
				return responder()->error(422, $validator->errors())->respond(422);
		}

		$cek_email = User::where('email',$request->email)
		->get();

		if(count($cek_email) > 0){
				return responder()->error(422, 'email telah digunakan')->respond(422);
		}

		$user = new User();
		$user->nama = strtolower($request->nama);
		$user->email     = strtolower($request->email);
		$user->password  = bcrypt($request->password);
		$user->save();

		$tokenResult = $user->createToken('Personal Access Token');

		return responder()->success($user, new UserTransformer(), 'customer')
		->meta(['message'=>'Pendaftaran berhasil, silahkan masuk dengan email dan password yang telah di daftarkan'])->respond(201);
	}

	public function login(Request $request)
	{
		$message = [
				"required"    => ":attribute wajib diisi",
				"email.regex" => "Email harus mengandung karakter '@'",
		];

		$validator = Validator::make($request->all(), [
				'email'     => 'required|regex:/^.+@.+$/i',
				'password'  => 'required',
		], $message);

		if ($validator->fails()){
				return responder()->error(422, $validator->errors())->respond(422);
		}

		$credentials = request(['email', 'password']);

		// return Auth::attempt($credentials);

		// return $request->password;

		if (!Auth::attempt($credentials)){
			return responder()->error(422, 'email atau password salah')->respond(422);
		}

		$user = User::where('email',$request->email)->first();

		if (empty($user)) {
				return responder()->error()->respond(404, ['message' => 'gagal']);
		}
		$user->save();

		//revoke previous token
		//  ada di oauthAccessTOken
		foreach ($user->tokens as $token){
			// $token->revoke();
			$token->delete();
		}

		$tokenResult = $user->createToken('Personal Access Token');

		$now = Carbon::now()->format('H');

		return responder()
				->success($user, new UserTransformer())
				->meta([
					'message'=> 'berhasil masuk',
					'access_token' => $tokenResult->accessToken,
					'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
				])
				->respond(200);
	}

	public function cektoken(Request $request)
	{
		// return Auth::user();
		$cek = OauthAccessToken::where('user_id',Auth::user()->id)->first();

		if ($cek) {
			return responder()->success($cek, new CekTokenTransformer(), 'cektoken')
			->meta(['message'=>'belum expired'])->respond(201);
		} else {
			return $cek;
		}
	}

	public function logout(Request $request)
	{
		$cek = $request->user()->token()->delete();
		if ($cek) {
			return responder()->success(null, null, null)->respond(201);
		} else {
			return $cek;
		}
	}

	public function show () {
		return Auth::user();
	}
}
