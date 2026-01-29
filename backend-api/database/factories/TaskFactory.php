<?php

namespace Database\Factories;

use App\Enums\PriorityEnums;
use App\Enums\ProjectEnums;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(ProjectEnums::cases())->value,
            'priority' => $this->faker->randomElement(PriorityEnums::cases())->value,
            'start_date' => $this->faker->date(),
            'due_date' => $this->faker->date(),
            'order' => $this->faker->numberBetween(1, 100),
        ];
    }
}
