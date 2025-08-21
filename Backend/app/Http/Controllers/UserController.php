<!-- // use Illuminate\Support\Facades\Auth;
// use Illuminate\Http\Request;
// use App\Http\Controllers\Controller;
// use App\Models\User;

// class userController extends Controller
// {
//     public function user(Request $request)
//     {
// {
//     $user = Auth::user();

//     if ($user->role === 'adminstartor') {
//         $data = User::all(); // admin sees everything
//     } else {
//         $data = User::where('user_id', $user->id)->get(); // regular users only see their own
//     }

//     return view('user.index', compact('data'));
//     }
// }

//     public function update(Request $request, $id)
//     {
//         $user = User::findOrFail($id);
//         $user->update($request->all());

//         return redirect()->route('user.index')->with('success', 'User updated successfully');
//     }

// }