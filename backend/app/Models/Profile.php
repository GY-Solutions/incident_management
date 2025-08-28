<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;

class Profile extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $table = 'profiles';

    protected $fillable = [
        'title',
        'fullname',
        'email',
        'login_id',
        'corporate_email',
        'phone_number',
        'password',
        'password_expiry',
        'remember_token',
        'email_token',
        'image',
        'login_failures',
        'active',
        'is_sso_active',
        'reg_number',
        'is_blocked',
        'changed_image',
        'date_enabled',
        'date_disabled',
        'is_synced_assessment',
        'is_corporate_login',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'email_token',
    ];

    protected $casts = [
        'active' => 'boolean',
        'is_sso_active' => 'boolean',
        'is_blocked' => 'boolean',
        'changed_image' => 'boolean',
        'is_synced_assessment' => 'boolean',
        'is_corporate_login' => 'boolean',
        'date_enabled' => 'datetime',
        'date_disabled' => 'datetime',
    ];

    /** 
     * Relationships 
     */
    public function users()
    {
        return $this->hasMany(User::class, 'profile_id');
    }

    // Custom method used by Auth
    public function findForAuthentication($identifier)
    {
        return $this->where('email', $identifier)
                    ->orWhere('login_id', $identifier)
                    ->first();
    }
}
