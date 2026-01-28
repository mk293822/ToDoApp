// AuthContext.tsx
import type { UseAuthInterface } from '@/interfaces/auth';
import type { EventBusContextType } from '@/types/context';
import { createContext } from 'react';

export const AuthContext = createContext<UseAuthInterface | undefined>(
  undefined,
);

export const createEventBusContext = <T extends Record<string, unknown>>() =>
  createContext<EventBusContextType<T> | null>(null);
