import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import type { EmptyCard } from '@/interfaces/empty-card';
import { IconFolderCode } from '@tabler/icons-react';

export function EmptyCard({
    title,
    description,
    create = true,
    createTitle,
}: EmptyCard) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode />
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
            {create && (
                <EmptyContent className="flex-row justify-center gap-2">
                    <Button>{createTitle}</Button>
                </EmptyContent>
            )}
        </Empty>
    );
}
