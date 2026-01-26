<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamUser extends Model
{
    /** @use HasFactory<\Database\Factories\TeamUserFactory> */
    use HasFactory;

    protected $fillable = [
        'team_id',
        'user_id',
        'role',
    ];
}
