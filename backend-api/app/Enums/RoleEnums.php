<?php

namespace App\Enums;

enum RoleEnums: string
{
    case OWNER = 'owner';
    case ADMIN = 'admin';
    case MEMBER = 'member';

    public static function label(): array
    {
        return [
            self::OWNER->value => 'Owner',
            self::ADMIN->value => 'Admin',
            self::MEMBER->value => 'Member',
        ];
    }
}
