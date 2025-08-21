<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            // 'role' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::check()) {
            return response()->json(['message' => 'User already logged in'], 200);
        } {
            $credentials = $request->validate([
                // 'role' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('bearer_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        }
    }

    public function user(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        return response()->json([
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out']);
        }

        return response()->json(['message' => 'Already logged out or invalid token'], 200);
    }
}

    // public function changepassword(Request $request)
    // {
    //     $request->validate([
    //         'current_password' => 'required',
    //         'new_password' => 'required|min:8|confirmed',
    //     ]);

    //     $user = Auth::user();

    //     if (!Auth::attempt(['email' => $user->email, 'password' => $request->current_password])) {
    //         return response()->json(['message' => 'Current password is incorrect'], 403);
    //     }

    //     $user->password = bcrypt($request->new_password);
    //     $user->save();

    //     return response()->json(['message' => 'Password changed successfully']);
    // }
