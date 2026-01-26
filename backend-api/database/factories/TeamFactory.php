<?php

namespace Database\Factories;

use App\Enums\VisibilityEnums;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'description' => $this->faker->paragraph(),
            'owner_id' => \App\Models\User::factory(),
            'visibility' => $this->faker->randomElement(VisibilityEnums::cases())->value,
        ];
    }
}
