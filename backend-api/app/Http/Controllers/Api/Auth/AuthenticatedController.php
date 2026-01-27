<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

class AuthenticatedController extends Controller
{
    public function login(LoginRequest $request)
    {
        $request->authenticate();
        $data = $request->validated();
        $user = User::where('email', $data['email'])->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        event(new Registered($user));

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }
}
