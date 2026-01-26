<?php

use App\Enums\PriorityEnums;
use App\Enums\ProjectEnums;
use App\Enums\VisibilityEnums;
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
        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();           // Unique project ID (UUID preferred)
            $table->string('name');                            // Project name
            $table->text('description')->nullable();          // Optional description
            $table->enum('status', ProjectEnums::cases())
                ->default(ProjectEnums::PENDING->value);    // Status: pending, active, completed, archived
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete(); // Project owner
            $table->string('type')->default('internal');      // Type: internal, client, personal, etc.
            $table->date('start_date')->nullable();            // Project start date
            $table->date('due_date')->nullable();              // Project deadline
            $table->enum('priority', PriorityEnums::cases())->default(PriorityEnums::MEDIUM->value);           // Priority: 1-high, 2-medium, 3-low
            $table->decimal('budget', 12, 2)->nullable();
            $table->decimal('spent', 12, 2)->default(0);
            $table->enum('visibility', VisibilityEnums::cases())->default(VisibilityEnums::PRIVATE->value);
            $table->timestamps();                              // created_at, updated_at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
