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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id'); // int unsigned, primary, auto increment

            $table->unsignedInteger('profile_id');
            $table->unsignedInteger('organisations_id')->nullable();
            $table->unsignedInteger('roles_id')->nullable();

            $table->string('official_user_id', 255)->nullable();
            $table->integer('type')->nullable();

            $table->boolean('active')->default(0);
            $table->boolean('verified')->default(0);

            $table->timestamp('date_created')->useCurrent();

            $table->boolean('is_case_manager')->default(0);

            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate(); 

            $table->string('email_token', 255)->nullable();

            $table->dateTime('invite_accepted')->nullable();
            $table->dateTime('invite_pending')->nullable();

            $table->unsignedInteger('employment_type_id')->nullable();

            $table->dateTime('start_at')->nullable();
            $table->dateTime('end_at')->nullable();

            $table->timestamp('created_at')->useCurrent();

            $table->boolean('is_hidden')->default(0);

            $table->unsignedInteger('language_id')->nullable();

            $table->boolean('is_new_user')->default(1);

            $table->timestamp('date_enabled')->nullable();
            $table->timestamp('date_disabled')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
