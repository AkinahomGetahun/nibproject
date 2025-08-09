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
        Schema::create('claims_posts', function (Blueprint $table) {
            $table->id();
            $table->string('branch');
            $table->string('claimnumber');
            $table->string('policyclass');
            $table->integer('policynumber');
            $table->decimal('totalclaimspaid');
            $table->string('coinsurerrecovery');
            $table->string('treatyrecovery');
            $table->string('facrecovery');
            $table->string('salvage');
            $table->date('insured');
            $table->integer('totalrecovery');
            $table->date('dateofloss');
            $table->date('notificationdate');
            $table->date('regdate');
            $table->date('dateclaimpaid');
            $table->longtext('descriptionofloss');
            $table->string('risktype');
            $table->string('agency');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims_posts');
    }
};
