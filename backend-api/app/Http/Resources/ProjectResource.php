<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'owner' => new UserResource($this->whenLoaded('owner')),
            'tasks_count' => $this->tasks->count(),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'type' => $this->type,
            'start_date' => $this->start_date,
            'due_date' => $this->due_date,
            'priority' => $this->priority,
            'budget' => $this->budget,
            'spent' => $this->spent,
            'visibility' => $this->visibility,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
