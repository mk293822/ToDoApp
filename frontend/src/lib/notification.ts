import { useEventBus } from '@/hooks/use-event-bus';
import { type NotificationEvents } from '@/types/event-bus';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { EVENT_NAMES } from './event-names';

const Notification = () => {
  const { on } = useEventBus<NotificationEvents>();

  useEffect(() => {
    on(EVENT_NAMES.SUCCESS_NOTIFICATION, (data) => {
      toast.success(data?.message, {
        description: data?.description,
        duration: 4000,
        position: 'top-right',
      });
    });

    on(EVENT_NAMES.ERROR_NOTIFICATION, (data) => {
      toast.error(data?.message || 'An error occurred!', {
        description:
          data?.description || 'There was a problem completing your task.',
        duration: 4000,
        position: 'top-right',
      });
    });
  }, [on]);
};

export default Notification;
