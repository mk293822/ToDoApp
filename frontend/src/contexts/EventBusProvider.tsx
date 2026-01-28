// EventBusProvider.tsx
import { type ReactNode, useRef, useCallback } from 'react';
import type { EventBusContextType, EventMap } from '@/types/context';
import { createEventBusContext } from './Contexts';

interface EventBusProviderProps {
  children: ReactNode;
}

export const EventBusProvider = <T extends Record<string, unknown>>({
  children,
}: EventBusProviderProps & { children: ReactNode }) => {
  const eventsRef = useRef<EventMap<T>>({});

  const emit = useCallback(<K extends keyof T>(name: K, data: T[K]) => {
    eventsRef.current[name]?.forEach((cb) => cb(data));
  }, []);

  const on = useCallback(
    <K extends keyof T>(name: K, cb: (data: T[K]) => void) => {
      const listeners = eventsRef.current[name] ?? [];
      eventsRef.current[name] = [...listeners, cb];

      return () => {
        eventsRef.current[name] = eventsRef.current[name]?.filter(
          (l) => l !== cb,
        );
      };
    },
    [],
  );

  const value: EventBusContextType<T> = { emit, on };

  const EventBusContext = createEventBusContext<T>();

  return (
    <EventBusContext.Provider value={value}>
      {children}
    </EventBusContext.Provider>
  );
};
