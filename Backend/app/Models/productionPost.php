<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class productionPost extends Model
{

    protected $fillable = [

        'branchcode',
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
        'rate',
        // 'policytype',
        // 'currency',
    ];
    protected static function booted()
    {
        static::saving(function ($model) {
            $model->netpremium = $model->premiumamount - $model->commissionamount;
        });
        static::saving(function ($model) {
            $model->rate = $model->premiumamount * $model->rate;
        });
    }
     public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d M Y, h:i A'); 
       
    }

   
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d M Y, h:i A');
    }
}
