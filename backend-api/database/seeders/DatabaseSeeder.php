<?php

namespace Database\Seeders;

use App\Enums\RoleEnums;
use App\Models\Organization;
use App\Models\OrganizationUser;
use App\Models\Project;
use App\Models\ProjectTeam;
use App\Models\Task;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create admins
        $admins = User::factory()->count(4)->create();

        // 2. Create user pool
        $users = User::factory()->count(200)->create();

        foreach ($admins as $admin) {

            // 3. Create organization
            $organization = Organization::factory()->create([
                'owner_id' => $admin->id,
            ]);

            /**
             * 4. Pick EXACTLY 50 UNIQUE members
             *    - admin + 49 unique users
             */
            $orgMembers = $users
                ->where('id', '!=', $admin->id)
                ->shuffle()
                ->take(50)
                ->push($admin)
                ->values();

            // 5. Attach org members (NO DUPLICATES)
            foreach ($orgMembers as $user) {
                OrganizationUser::create([
                    'organization_id' => $organization->id,
                    'user_id' => $user->id,
                    'role' => $user->id === $admin->id
                        ? RoleEnums::OWNER->value
                        : fake()->randomElement([
                            RoleEnums::ADMIN->value,
                            RoleEnums::MEMBER->value,
                        ]),
                ]);
            }

            // 6. Get admin IDs (OWNER + ADMIN)
            $orgAdminIds = OrganizationUser::where('organization_id', $organization->id)
                ->whereIn('role', [
                    RoleEnums::OWNER->value,
                    RoleEnums::ADMIN->value,
                ])
                ->pluck('user_id')
                ->unique()
                ->values();

            /**
             * 7. Create teams
             *    - one team per org admin
             */
            $teams = collect();

            foreach ($orgAdminIds as $adminId) {
                $teams->push(
                    Team::factory()->create([
                        'organization_id' => $organization->id,
                        'owner_id' => $adminId,
                    ])
                );
            }

            /**
             * 8. Attach UNIQUE members per team
             */
            foreach ($teams as $team) {

                $teamMembers = $orgMembers
                    ->shuffle()
                    ->take(rand(3, 6));

                foreach ($teamMembers as $member) {
                    TeamUser::firstOrCreate([
                        'team_id' => $team->id,
                        'user_id' => $member->id,
                    ], [
                        'role' => fake()->randomElement([
                            RoleEnums::ADMIN->value,
                            RoleEnums::MEMBER->value,
                        ]),
                    ]);
                }
            }

            /**
             * 9. Create projects (unique owners)
             */
            $projects = collect();

            foreach ($orgAdminIds as $adminId) {
                $projects = $projects->merge(
                    Project::factory()->count(3)->create([
                        'organization_id' => $organization->id,
                        'owner_id' => $adminId,
                    ])
                );
            }

            /**
             * 10. Tasks + team assignment (no duplicates)
             */
            foreach ($projects as $project) {

                Task::factory()->count(rand(5, 10))->create([
                    'project_id' => $project->id,
                ]);

                $assignedTeams = $teams
                    ->shuffle()
                    ->take(rand(1, min(3, $teams->count())))
                    ->unique('id');

                foreach ($assignedTeams as $team) {
                    ProjectTeam::firstOrCreate([
                        'project_id' => $project->id,
                        'team_id' => $team->id,
                    ]);
                }
            }
        }
    }
}
