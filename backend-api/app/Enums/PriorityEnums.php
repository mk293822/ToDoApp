<?php

namespace App\Enums;

enum PriorityEnums: string
{
    case HIGH = 'high';
    case MEDIUM = 'medium';
    case LOW = 'low';

    public static function label(): array
    {
        return [
            self::HIGH->value => 'High',
            self::MEDIUM->value => 'Medium',
            self::LOW->value => 'Low',
        ];
    }
}
