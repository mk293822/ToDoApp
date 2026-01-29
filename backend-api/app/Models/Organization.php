<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    /** @use HasFactory<\Database\Factories\OrganizationFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'visibility',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function members()
    {
        return $this->belongsToMany(User::class, 'organization_users')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
