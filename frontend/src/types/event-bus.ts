import type { EVENT_NAMES } from '@/lib/event-names';

export type NotificationEvents = {
  [EVENT_NAMES.SUCCESS_NOTIFICATION]: {
    message: string;
    description?: string;
  };
  [EVENT_NAMES.ERROR_NOTIFICATION]: {
    message?: string;
    description?: string;
  };
};
