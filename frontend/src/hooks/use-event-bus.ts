// useEventBus.ts
import { useContext } from 'react';
import type { EventBusContextType } from '@/types/context';
import { createEventBusContext } from '@/contexts/Contexts';

// You need to use the same context as in your provider
const EventBusContext =
  createEventBusContext<EventBusContextType<Record<string, unknown>>>();

export const useEventBus = <T extends Record<string, unknown>>() => {
  const context = useContext(EventBusContext) as EventBusContextType<T> | null;

  if (!context) {
    throw new Error('useEventBus must be used within an EventBusProvider');
  }

  return context;
};
