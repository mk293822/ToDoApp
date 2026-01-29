import { useEffect } from 'react';
import { toast } from 'sonner';
import { EVENT_NAMES } from './event-names';
import { eventBus } from './event-bus';

const Notification = () => {
    useEffect(() => {
        const offSuccess = eventBus.on(
            EVENT_NAMES.SUCCESS_NOTIFICATION,
            (data) => {
                toast.success(data?.message, {
                    description: data?.description,
                    duration: 3000,
                    position: 'top-right',
                });
            },
        );

        const offError = eventBus.on(EVENT_NAMES.ERROR_NOTIFICATION, (data) => {
            toast.error(data?.message || 'An error occurred!', {
                description:
                    data?.description ||
                    'There was a problem completing your task.',
                duration: 3000,
                position: 'top-right',
            });
        });

        return () => {
            offSuccess();
            offError();
        };
    }, [eventBus.on]);

    return null;
};

export default Notification;
