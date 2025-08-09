<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\claimsPost;

class ClaimsController extends Controller
{
    public function createclaimsdata(Request $request)
    {
        $request->validate([
            'branch' => 'required',
            'claimnumber' => 'required',
            "policyclass" => 'required',
            "policynumber" => 'required',
            "totalclaimspaid" => 'required',
            "coinsurerrecovery" => 'required',
            'treatyrecovery' => 'required',
            "facrecovery" => 'required',
            "salvage" => 'required',
            'insured' => 'required',
            'totalrecovery' => 'required',
            "dateofloss" => 'required',
            "notificationdate" => 'required',
            'regdate' => 'required',
            "dateclaimpaid" => 'required',
            "descriptionofloss" => 'required',
            'risktype' => 'required',
            'agency' => 'required',

        ]);
        $claimsmodel = new claimsPost;
        $claimsmodel->branch = $request->branch;
        $claimsmodel->claimnumber = $request->claimnumber;
        $claimsmodel->policyclass = $request->policyclass;
        $claimsmodel->policynumber = $request->policynumber;
        $claimsmodel->totalclaimspaid = $request->totalclaimspaid;
        $claimsmodel->coinsurerrecovery = $request->coinsurerrecovery;
        $claimsmodel->treatyrecovery = $request->treatyrecovery;
        $claimsmodel->facrecovery = $request->facrecovery;
        $claimsmodel->salvage = $request->salvage;
        $claimsmodel->totalrecovery = $request->totalrecovery;
        $claimsmodel->insured = $request->insured;
        $claimsmodel->dateofloss = $request->dateofloss;
        $claimsmodel->notificationdate = $request->notificationdate;
        $claimsmodel->regdate = $request->regdate;
        $claimsmodel->dateclaimpaid = $request->dateclaimpaid;
        $claimsmodel->descriptionofloss = $request->descriptionofloss;
        $claimsmodel->risktype = $request->risktype;
        $claimsmodel->agency = $request->agency;
        $claimsmodel->save();


        return response()->json(['status' => 200, 'message' => 'Claims data saved successfully']);
    }

     public function editclaimsdata(Request $request)
    {
        $request->validate([
            'branch' => 'required',
            'claimnumber' => 'required',
            "policyclass" => 'required',
            "policynumber" => 'required',
            "totalclaimspaid" => 'required',
            "coinsurerrecovery" => 'required',
            'treatyrecovery' => 'required',
            "facrecovery" => 'required',
            "salvage" => 'required',
            'insured' => 'required',
            'totalrecovery' => 'required',
            "dateofloss" => 'required',
            "notificationdate" => 'required',
            'regdate' => 'required',
            "dateclaimpaid" => 'required',
            "descriptionofloss" => 'required',
            'risktype' => 'required',
            'agency' => 'required',

        ]);
        $claimsmodel = claimsPost::find($request->id);
        $claimsmodel->branch = $request->branch;
        $claimsmodel->claimnumber = $request->claimnumber;
        $claimsmodel->policyclass = $request->policyclass;
        $claimsmodel->policynumber = $request->policynumber;
        $claimsmodel->totalclaimspaid = $request->totalclaimspaid;
        $claimsmodel->coinsurerrecovery = $request->coinsurerrecovery;
        $claimsmodel->treatyrecovery = $request->treatyrecovery;
        $claimsmodel->facrecovery = $request->facrecovery;
        $claimsmodel->salvage = $request->salvage;
        $claimsmodel->totalrecovery = $request->totalrecovery;
        $claimsmodel->insured = $request->insured;
        $claimsmodel->dateofloss = $request->dateofloss;
        $claimsmodel->notificationdate = $request->notificationdate;
        $claimsmodel->regdate = $request->regdate;
        $claimsmodel->dateclaimpaid = $request->dateclaimpaid;
        $claimsmodel->descriptionofloss = $request->descriptionofloss;
        $claimsmodel->risktype = $request->risktype;
        $claimsmodel->agency = $request->agency;
        $claimsmodel->update();


        return response()->json(['status' => 200, 'message' => 'Claims data updated successfully']);
    }

    public function getclaimsdata()
    {
        $data = claimsPost::all();
        return response()->json(['allclaimsdata' => $data]);
    }
    public function deleteclaimsdata(Request $request)
    {
        claimsPost::where(['id' => $request->id])->delete();
        return response()->json(['status' => 200, 'msg' => 'Row deleted!']);
    }
    public function claimsbyid($id)
    {
        $data = claimsPost::find($id);
        return $data;
    }
    
}
