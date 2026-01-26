<?php

use App\Enums\PriorityEnums;
use App\Enums\ProjectEnums;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('project_id');
            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->cascadeOnDelete();

            $table->string('title');
            $table->text('description')->nullable();

            $table->enum('status', ProjectEnums::cases())
                ->default(ProjectEnums::PENDING->value);

            $table->enum('priority', PriorityEnums::cases())
                ->default(PriorityEnums::MEDIUM->value);

            $table->foreignId('assigned_to')->nullable()->constrained('users');

            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->integer('order')->default(0);

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
