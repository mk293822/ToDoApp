import { type ReactNode } from 'react';
import { AuthContext } from './Contexts';
import { useAuth } from '@/hooks/use-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
