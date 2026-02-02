<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrganizationResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TeamResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $organization = $user->organizations()->with('owner', 'members')->get();
        $projects = $user->projects()->with('owner', 'tasks')->paginate(10);
        $teams = $user->teams()->with('owner', 'members')->get();

        return response()->json([
            'user' => new UserResource($user),
            'projects' => ProjectResource::collection($projects)->toArray($request),
            'teams' => TeamResource::collection($teams)->toArray($request),
            'organizations' => OrganizationResource::collection($organization)->toArray($request),
        ]);
    }
}
