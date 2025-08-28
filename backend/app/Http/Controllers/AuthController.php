<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class AuthController extends Controller
{
  
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required',
            'password' => 'required',
        ]);

        $loginValue = $request->input('email'); 
        $password   = $request->input('password');

        // Try login with email
        if (Auth::attempt(['email' => $loginValue, 'password' => $password])) {
            return $this->sendLoginResponse(Auth::user());
        }

        // Try login with login_id
        if (Auth::attempt(['login_id' => $loginValue, 'password' => $password])) {
            return $this->sendLoginResponse(Auth::user());
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    protected function sendLoginResponse($profile)
    {
        $users = $profile->users ?? null;
        $token = $profile->createToken('authToken')->plainTextToken;

        return response()->json([
            'success' => true,
            'token'   => $token,
            'message' => 'Login successful',
            'profile' => $profile,
            'users'   => $users,
        ]);
    }

}
