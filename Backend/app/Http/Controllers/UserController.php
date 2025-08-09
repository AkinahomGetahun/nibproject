<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class UserController extends Controller
{
      public function index()
    {
         $users = DB::connection('remote_mysql')
               ->table('users')
               ->get();

    return response()->json(['users' => $users]);
    }
}
