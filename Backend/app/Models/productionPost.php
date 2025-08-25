<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;




class productionPost extends Model
{

    protected $fillable = [

        'branchcode',
        'policynumber',
        'nameofinsured',
        'effectivedate',
        'enddate',
        'suminsured',
        'premiumamount',
        'commissionamount',
        'netpremium',
        'retainedpremium',
        'naicom',
        'transactiontype',
        'reciept',
        'rate',
        'source',
        'name',

        // 'currency',
    ];
    protected static function booted()
    {
        static::saving(function ($model) {
            $model->commissionamount = $model->premiumamount * $model->rate;
        });
        static::saving(function ($model) {
            $model->netpremium = $model->premiumamount - $model->commissionamount;
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
    public function index()
    {
        $user = Auth::user();

        $productions = productionPost::forUser($user)->get();

        Log::info('Productions fetched for user ' . $user->id, [
            'record_ids' => $productions->pluck('id')->toArray()
        ]);

        return response()->json($productions);
    }
}
