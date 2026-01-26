<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectTeam;
use App\Models\Task;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::factory(10)->create();

        Project::factory(10)->create()->each(function ($project) {
            // Create between 5 to 10 tasks for each project
            Task::factory(rand(5, 10))->create([
                'project_id' => $project->id,
            ]);
        });

        Team::factory(5)->create()->each(function ($team) {
            // Assign between 3 to 7 users to each team
            $users = User::inRandomOrder()->take(rand(3, 7))->get();
            foreach ($users as $user) {
                TeamUser::create([
                    'team_id' => $team->id,
                    'user_id' => $user->id,
                ]);
            }

            $projects = Project::inRandomOrder()->take(rand(2, 5))->get();
            foreach ($projects as $project) {
                ProjectTeam::create([
                    'team_id' => $team->id,
                    'project_id' => $project->id,
                ]);
            }
        });

    }
}
