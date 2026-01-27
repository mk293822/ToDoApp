<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectTeam;
use App\Models\Task;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'), // Only for local/dev
        ]);

        // Create 10 additional users
        $users = User::factory(10)->create();

        // Combine all users
        $allUsers = $users->push($admin);

        // Loop through all users to create projects and teams
        $allUsers->each(function ($user) use ($allUsers) {
            // Each user gets 1-3 projects
            Project::factory(rand(1, 3))->create(['owner_id' => $user->id])
                ->each(function ($project) use ($user, $allUsers) {
                    // Create 5-10 tasks per project
                    Task::factory(rand(5, 10))->create(['project_id' => $project->id]);

                    // Create 1-3 teams per project
                    Team::factory(rand(1, 3))->create(['owner_id' => $user->id])
                        ->each(function ($team) use ($project, $user, $allUsers) {
                            // Attach project owner to team as admin
                            TeamUser::create([
                                'team_id' => $team->id,
                                'user_id' => $user->id,
                                'role' => 'admin',
                            ]);

                            // Attach 1-4 random other users as members
                            $randomUsers = $allUsers->where('id', '!=', $user->id)
                                ->random(rand(1, min(4, $allUsers->count() - 1)));

                            foreach ($randomUsers as $us) {
                                TeamUser::create([
                                    'team_id' => $team->id,
                                    'user_id' => $us->id,
                                    'role' => 'member',
                                ]);
                            }

                            // Attach this team to the current project
                            ProjectTeam::create([
                                'team_id' => $team->id,
                                'project_id' => $project->id,
                            ]);

                            // Optionally attach team to 1-2 other random projects
                            $otherProjects = Project::where('id', '!=', $project->id)
                                ->inRandomOrder()
                                ->take(rand(1, 2))
                                ->get();

                            foreach ($otherProjects as $proj) {
                                ProjectTeam::create([
                                    'team_id' => $team->id,
                                    'project_id' => $proj->id,
                                ]);
                            }
                        });
                });
        });
    }
}
