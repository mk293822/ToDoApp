<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TeamResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $projects = $user->projects()->with('owner', 'tasks')->paginate(10);
        $teams = $user->teams()->with('owner', 'members')->get();

        return response()->json([
            'projects' => ProjectResource::collection($projects)->toArray($request),
            'teams' => TeamResource::collection($teams)->toArray($request),
        ]);
    }
}
