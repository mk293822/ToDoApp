<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, HasUuids;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name', 'description', 'status',
        'owner_id', 'type', 'start_date',
        'due_date', 'priority', 'budget',
        'spent', 'visibility'];


    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'project_teams')->withTimestamps();
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
