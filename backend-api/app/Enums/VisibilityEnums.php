<?php

namespace App\Enums;

enum VisibilityEnums: string
{
    case PRIVATE = 'private';
    case PUBLIC = 'public';

    public static function label(): array
    {
        return [
            self::PRIVATE->value => 'Private',
            self::PUBLIC->value => 'Public',
        ];
    }
}
