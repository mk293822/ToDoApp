<?php

namespace Database\Factories;

use App\Enums\PriorityEnums;
use App\Enums\ProjectEnums;
use App\Enums\VisibilityEnums;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(ProjectEnums::cases())->value,
            'owner_id' => \App\Models\User::factory(),
            'type' => $this->faker->randomElement(['internal', 'external']),
            'start_date' => $this->faker->date(),
            'due_date' => $this->faker->date(),
            'priority' => $this->faker->randomElement(PriorityEnums::cases())->value,
            'budget' => $this->faker->randomFloat(2, 1000, 10000),
            'spent' => $this->faker->randomFloat(2, 0, 10000),
            'visibility' => $this->faker->randomElement(VisibilityEnums::cases())->value,
        ];
    }
}
