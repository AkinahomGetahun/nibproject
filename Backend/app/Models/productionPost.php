<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class productionPost extends Model
{
    protected $fillable = [

        'branchcode',
        'processingdate',
        'policynumber',
        'clientname',
        'agentname',
        'effectivedate',
        'enddate',
        'suminsured',
        'totpremium',
        'totcommission',
        'netpremium',
        'totvat',
        'salesperson',
        'naicom',
        'transactiontype',
        'channel',
        'policytype',
        'currency',
    ];
}
