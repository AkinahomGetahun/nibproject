<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;


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
        $user = Auth::user();
        \Log::info('Authenticated user:', [
            'id' => $user->id ?? 'null',
            'role' => $user->role ?? 'null',
            'email' => $user->email ?? 'null',
        ]);
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $users = User::forUser(Auth::user())->get();

        return response()->json(['users' => $users]);
    }

    public function scopeForUser($query, $user)
    {
        $user = Auth::user();
        Log::info('User role: ' . $user->role);
        Log::info('User ID: ' . $user->id);

        if ($user->role === 'Administrator') {
            Log::info('Admin user detected, returning full query');
            return $query;
        }

        Log::info('Filtering by id = ' . $user->id);
        return $query->where('id', $user->id);
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

    public function changepassword(Request $request)
    {
        $authUser = Auth::user();

        if (!$authUser) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::find($authUser->id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'temporarypassword' => 'required',
            'newpassword' => 'required|min:8|confirmed',
        ]);

        if (!Hash::check($request->temporarypassword, $user->password)) {
            return response()->json(['message' => 'Temporary password is incorrect'], 403);
        }

        $user->password = bcrypt($request->newpassword);
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
    }
}


 //  public function index(): View
    // {
    //     $users = DB::table('users')->get();

    //     return view('user.index', ['users' => $users]);
    // }

    // public function update(Request $request, $id)
    // {
    //     $user = User::findOrFail($id);
    //     $user->update($request->all());

    //     return redirect()->route('user.index')->with('success', 'User updated successfully');
    // }
