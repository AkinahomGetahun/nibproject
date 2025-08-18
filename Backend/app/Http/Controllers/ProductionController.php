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
            // 'policytype' => 'required',
            // 'currency' => 'required',

        ]);
        $productionmodel = new productionPost;
        $productionmodel->branchcode = $request->branchcode;
        $productionmodel->policynumber = $request->policynumber;
        $productionmodel->nameofinsured = $request->nameofinsured;
        $productionmodel->salesagent = $request->salsagent;
        $productionmodel->effectivedate = $request->effectivedate;
        $productionmodel->enddate = $request->enddate;
        $productionmodel->suminsured = $request->suminsured;
        $productionmodel->premiumamount = $request->premiumamount;
        $productionmodel->commissionamount = $request->commissionamount;
        $productionmodel->netpremium = $request->netpremium;
        $productionmodel->retainedpremium = $request->retainedpremium;
        $productionmodel->broker = $request->broker;
        $productionmodel->naicom = $request->naicom;
        $productionmodel->transactiontype = $request->transactiontype;
        $productionmodel->reciept = $request->reciept;

        // $productionmodel->policytype = $request->policytype;
        // $productionmodel->currency = $request->currency;

        $productionmodel->save();


        return response()->json(['status' => 200, 'msg' => 'Production data saved successfully']);
    }

    public function editproductiondata(Request $request)
    {
        $request->validate([
            'branchcode' => 'required',
            'processingdate' => 'required',
            "policynumber" => 'required',
            "clientname" => 'required',
            "agentname" => 'required',
            "effectivedate" => 'required',
            'enddate' => 'required',
            "suminsured" => 'required',
            "totpremium" => 'required',
            'totcommission' => 'required',
            "netpremium" => 'required',
            "totvat" => 'required',
            'salesperson' => 'required',
            "naicom" => 'required',
            "transactiontype" => 'required',
            'policytype' => 'required',
            'currency' => 'required',

        ]);
        $productionmodel = productionPost::find($request->id);
        $productionmodel->branchcode = $request->branchcode;
        $productionmodel->processingdate = $request->processingdate;
        $productionmodel->policynumber = $request->policynumber;
        $productionmodel->clientname = $request->clientname;
        $productionmodel->agentname = $request->agentname;
        $productionmodel->effectivedate = $request->effectivedate;
        $productionmodel->enddate = $request->enddate;
        $productionmodel->suminsured = $request->suminsured;
        $productionmodel->totpremium = $request->totpremium;
        $productionmodel->totcommission = $request->totcommission;
        $productionmodel->netpremium = $request->netpremium;
        $productionmodel->totvat = $request->totvat;
        $productionmodel->salesperson = $request->salesperson;
        $productionmodel->naicom = $request->naicom;
        $productionmodel->transactiontype = $request->transactiontype;
        $productionmodel->policytype = $request->policytype;
        $productionmodel->channel = $request->channel;
        $productionmodel->currency = $request->currency;

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
