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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id(); // unsigned big int auto increment
            $table->string('title', 255)->nullable();
            $table->string('fullname', 255)->nullable();
            $table->string('email', 255)->unique();
            $table->string('login_id', 255)->unique();
            $table->string('corporate_email', 255)->nullable();
            $table->string('phone_number', 255)->nullable();
            $table->string('password', 255);
            $table->string('password_expiry', 255)->nullable();
            $table->string('remember_token', 255)->nullable();
            $table->string('email_token', 255)->nullable();
            $table->string('image', 255)->nullable();
            $table->integer('login_failures')->default(0);
            $table->boolean('active')->default(1);
            $table->boolean('is_sso_active')->default(0);
            $table->timestamps(); // created_at & updated_at
            $table->string('reg_number', 255)->nullable();
            $table->boolean('is_blocked')->default(0);
            $table->boolean('changed_image')->default(0);
            $table->timestamp('date_enabled')->nullable();
            $table->timestamp('date_disabled')->nullable();
            $table->boolean('is_synced_assessment')->default(0);
            $table->boolean('is_corporate_login')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
