<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTeam extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectTeamFactory> */
    use HasFactory;

    protected $fillable = [
        'project_id',
        'team_id',
    ];
}
