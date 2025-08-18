<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class productionPost extends Model
{
    protected $fillable = [

        'branchcode',
        'processingdate',
        'policynumber',
        'nameofinsured',
        'salesagent',
        'effectivedate',
        'enddate',
        'suminsured',
        'premiumamount',
        'commissionamount',
        'netpremium',
        'retainedpremium',
        'salesperson',
        'naicom',
        'transactiontype',
        'reciept',
        'broker',
        // 'policytype',
        // 'currency',
    ];
}
