<?php

namespace App\Http\Controllers;

use App\Models\productionPost;
use Illuminate\Http\Request;

class ProductionController extends Controller
{
    public function createproductiondata(Request $request)
    {
        $request->validate([
            'branchcode' => 'required',
            "policynumber" => 'required',
            "nameofinsured" => 'required',
            "salesagent" => 'required',
            "effectivedate" => 'required',
            'enddate' => 'required',
            "suminsured" => 'required',
            "premiumamount" => 'required',
            'commissionamount' => 'required',
            // "netpremium" => 'required',
            "retainedpremium" => 'required',
            'broker' => 'required',
            "naicom" => 'required',
            "transactiontype" => 'required',
            'reciept' => 'required',
            'rate' => 'required',
            // 'currency' => 'required',

        ]);
        $productionmodel = new productionPost;
        $productionmodel->branchcode = $request->branchcode;
        $productionmodel->policynumber = $request->policynumber;
        $productionmodel->nameofinsured = $request->nameofinsured;
        $productionmodel->salesagent = $request->salesagent;
        $productionmodel->effectivedate = $request->effectivedate;
        $productionmodel->enddate = $request->enddate;
        $productionmodel->suminsured = $request->suminsured;
        $productionmodel->premiumamount = $request->premiumamount;
        $productionmodel->commissionamount = $request->commissionamount;
        // $productionmodel->netpremium = $request->netpremium;
        $productionmodel->retainedpremium = $request->retainedpremium;
        $productionmodel->broker = $request->broker;
        $productionmodel->naicom = $request->naicom;
        $productionmodel->transactiontype = $request->transactiontype;
        $productionmodel->reciept = $request->reciept;
        $productionmodel->rate = $request->rate;
        // $productionmodel->currency = $request->currency;

        $productionmodel->save();


        return response()->json(['status' => 200, 'msg' => 'Production data saved successfully']);
    }
    // Remove model event logic from controller; move to productionPost model.

    public function editproductiondata(Request $request)
    {
        $request->validate([
            'branchcode' => 'required',
            "policynumber" => 'required',
            "nameofinsured" => 'required',
            "salesagent" => 'required',
            "effectivedate" => 'required',
            'enddate' => 'required',
            "suminsured" => 'required',
            "premiumamount" => 'required',
            'commissionamount' => 'required',
            // "netpremium" => 'required',
            "retainedpremium" => 'required',
            'broker' => 'required',
            "naicom" => 'required',
            "transactiontype" => 'required',
            'reciept' => 'required',
            'rate' => 'required',

        ]);
        $productionmodel = productionPost::find($request->id);
        $productionmodel->branchcode = $request->branchcode;
        $productionmodel->policynumber = $request->policynumber;
        $productionmodel->nameofinsured = $request->nameofinsured;
        $productionmodel->salesagent = $request->salesagent;
        $productionmodel->effectivedate = $request->effectivedate;
        $productionmodel->enddate = $request->enddate;
        $productionmodel->suminsured = $request->suminsured;
        $productionmodel->premiumamount = $request->premiumamount;
        $productionmodel->commissionamount = $request->commissionamount;
        // $productionmodel->netpremium = $request->netpremium;
        $productionmodel->retainedpremium = $request->retainedpremium;
        $productionmodel->broker = $request->broker;
        $productionmodel->naicom = $request->naicom;
        $productionmodel->transactiontype = $request->transactiontype;
        $productionmodel->reciept = $request->reciept;
        $productionmodel->rate = $request->rate;
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
}
