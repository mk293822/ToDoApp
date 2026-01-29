// AuthContext.tsx
import type { UseAuthInterface } from '@/interfaces/auth';
import { createContext } from 'react';

export const AuthContext = createContext<UseAuthInterface | undefined>(
  undefined,
);
