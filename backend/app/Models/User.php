<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class User extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'profile_id',
        'organisations_id',
        'roles_id',
        'official_user_id',
        'type',
        'active',
        'verified',
        'date_created',
        'is_case_manager',
        'email_token',
        'invite_accepted',
        'invite_pending',
        'employment_type_id',
        'password',
    ];

    protected $hidden = [
       // 'password',
      //  'remember_token',
        'email_token',
    ];

    protected $casts = [
        'active' => 'boolean',
        'verified' => 'boolean',
        'is_case_manager' => 'boolean',
        'date_created' => 'datetime',
        'invite_accepted' => 'datetime',
        'invite_pending' => 'datetime',
    ];

    /** 
     * Relationships 
     */
    public function profile()
    {
        return $this->belongsTo(Profile::class, 'profiles_id');
    }
}
