<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('production_posts', function (Blueprint $table) {
            $table->id();
            $table->string('branchcode');
            $table->integer('policynumber');
            $table->string('nameofinsured');
            $table->date('effectivedate');
            $table->date('enddate');
            $table->decimal('suminsured');
            $table->decimal('premiumamount');
            $table->decimal('commissionamount');
            $table->string('retainedpremium');
            $table->string('naicom');
            $table->string('transactiontype');
            $table->string('reciept');
            $table->unsignedBigInteger('user_id');
            // $table->string('name')->nullable()->change();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_posts');
    }
};
