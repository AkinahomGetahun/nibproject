<?php

namespace App\Http\Controllers;

use App\Models\productionPost;
use Illuminate\Http\Request;
use App\Models\Source;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class ProductionController extends Controller
{
    public function createproductiondata(Request $request)
    {
        $request->validate([
            'branchcode' => 'required',
            "policynumber" => 'required',
            "nameofinsured" => 'required',
            "effectivedate" => 'required',
            'enddate' => 'required',
            "suminsured" => 'required',
            "premiumamount" => 'required',
            // 'commissionamount' => 'required',
            // "netpremium" => 'required',
            "retainedpremium" => 'required',
            "naicom" => 'required',
            "transactiontype" => 'required',
            'reciept' => 'required',
            // 'rate' => 'required',
            // 'name' =>'required',



        ]);

        $productionmodel = new productionPost;
        $productionmodel->branchcode = $request->branchcode;
        $productionmodel->policynumber = $request->policynumber;
        $productionmodel->nameofinsured = $request->nameofinsured;
        $productionmodel->effectivedate = $request->effectivedate;
        $productionmodel->enddate = $request->enddate;
        $productionmodel->suminsured = $request->suminsured;
        $productionmodel->premiumamount = $request->premiumamount;
        // $productionmodel->commissionamount = $request->commissionamount;
        // $productionmodel->netpremium = $request->netpremium;
        $productionmodel->retainedpremium = $request->retainedpremium;
        $productionmodel->naicom = $request->naicom;
        $productionmodel->transactiontype = $request->transactiontype;
        $productionmodel->reciept = $request->reciept;
        $productionmodel->rate = $request->rate;
        $productionmodel->sourceofbusiness = $request->sourceofbusiness;
        $productionmodel->name = $request->name;
        $productionmodel->source = $request->source;
        $productionmodel->user_id = Auth::id();
        $productionmodel->save();
        return response()->json(['status' => 200, 'msg' => 'Production data saved successfully']);
    }

    public function editproductiondata(Request $request)
    {
        $request->validate([
            'branchcode' => 'required',
            "policynumber" => 'required',
            "nameofinsured" => 'required',
            "effectivedate" => 'required',
            'enddate' => 'required',
            "suminsured" => 'required',
            "premiumamount" => 'required',
            // 'commissionamount' => 'required',
            // "netpremium" => 'required',
            "retainedpremium" => 'required',
            "naicom" => 'required',
            "transactiontype" => 'required',
            'reciept' => 'required',
            // 'rate' => 'required',
            // 'name' =>'required',
        ]);
        $productionmodel = productionPost::find($request->id);
        $productionmodel->branchcode = $request->branchcode;
        $productionmodel->policynumber = $request->policynumber;
        $productionmodel->nameofinsured = $request->nameofinsured;
        $productionmodel->effectivedate = $request->effectivedate;
        $productionmodel->enddate = $request->enddate;
        $productionmodel->suminsured = $request->suminsured;
        $productionmodel->premiumamount = $request->premiumamount;
        // $productionmodel->commissionamount = $request->commissionamount;
        // $productionmodel->netpremium = $request->netpremium;
        $productionmodel->retainedpremium = $request->retainedpremium;
        $productionmodel->naicom = $request->naicom;
        $productionmodel->transactiontype = $request->transactiontype;
        $productionmodel->reciept = $request->reciept;
        $productionmodel->rate = $request->rate;
        $productionmodel->sourceofbusiness = $request->sourceofbusiness;
        $productionmodel->name = $request->name;
        $productionmodel->source = $request->source;


        $productionmodel->update();


        return response()->json(['status' => 200, 'msg' => 'Production data updated successfully']);
    }

    public function getproductiondata()
    {
        $data = productionPost::all();
        return response()->json(['allproductiondata' => $data]);
    }

    public function productionbyid($id)
    {
        $data = productionPost::find($id);
        return $data;
    }

    public function deleteproductiondata(Request $request)
    {
        productionPost::where(['id' => $request->id])->delete();
        return response()->json(['status' => 200, 'msg' => 'Row deleted!']);
    }
    public function scopeForUser($query, $user)
    {
        if ($user->role === 'Administrator') {
            return $query; 
        }
        return $query->where('user_id', $user->id);
    }

    public function groupByTime()
    {
        $today = \Carbon\Carbon::today();
        $startOfWeek = \Carbon\Carbon::now()->startOfWeek();
        $endOfWeek = \Carbon\Carbon::now()->endOfWeek();
        $startOfMonth = \Carbon\Carbon::now()->startOfMonth();
        $endOfMonth = \Carbon\Carbon::now()->endOfMonth();

        $todayPosts = productionPost::whereDate('created_at', $today)
            ->orderBy('created_at')
            ->get();

        $weekPosts = productionPost::whereBetween('created_at', [$startOfWeek, $endOfWeek])
            ->orderBy('created_at')
            ->get();

        $monthPosts = productionPost::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->orderBy('created_at')
            ->get();
        $all = productionPost::orderBy('created_at')->get();
        return response()->json([
            'all' => $all,
            'today' => $todayPosts,
            'thisWeek' => $weekPosts,
            'thisMonth' => $monthPosts,
        ]);
    }
}
