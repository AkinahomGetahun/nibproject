<!-- 
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): View
    {
        $user = Auth::User();

        if ($user->role === 'admin') {
            $users = User::all();
        } else {
            $users = User::where('id', $user->id)->get();
        }

        return view('user.index', ['users' => $users]);
    }
    public function update(Request $request, $id)
    {
        $user = Auth::User();
        $targetUser = User::findOrFail($id);

        if ($user->role !== 'admin' && $user->id !== $targetUser->id) {
            abort(403, 'Unauthorized');
        }

        $targetUser->update($request->all());

        return redirect()->route('user.index')->with('success', 'User updated successfully');
    }
}  -->
