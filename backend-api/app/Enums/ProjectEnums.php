<?php

namespace App\Enums;

enum ProjectEnums: string
{
    case PENDING = 'pending';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
    case ARCHIVED = 'archived';

    public static function label(): array
    {
        return [
            self::PENDING->value => 'Pending',
            self::IN_PROGRESS->value => 'In Progress',
            self::COMPLETED->value => 'Completed',
            self::ARCHIVED->value => 'Archived',
        ];
    }
}
