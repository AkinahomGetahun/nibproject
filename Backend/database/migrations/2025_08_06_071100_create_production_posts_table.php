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
            $table->dateTime('processingdate');
            $table->integer('policynumber');
            $table->string('clientname');
            $table->string('agentname');
            $table->date('effectivedate');
            $table->date('enddate');
            $table->decimal('suminsured');
            $table->decimal('totpremium');
            $table->decimal('totcommission');
            $table->decimal('netpremium');
            $table->string('totvat');
            $table->string('salesperson');
            $table->string('naicom');
            $table->string('transactiontype');
            $table->string('channel');
            $table->string('policytype');
            $table->string('currency');

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
