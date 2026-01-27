<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TeamResource;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $projects = $user->projects()->with('owner', 'tasks')->paginate(10);
        $teams = $user->teams()->with('owner', 'members')->get();

        return response()->json([
            'projects' => ProjectResource::collection($projects)->response()->getData(true),
            'teams' => TeamResource::collection($teams)->response()->getData(true),
        ]);
    }
}
