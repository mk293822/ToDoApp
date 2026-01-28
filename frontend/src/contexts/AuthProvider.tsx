import { type ReactNode } from 'react';
import { useAuth as useAuthHook } from '@/hooks/use-auth';
import { AuthContext } from './Contexts';

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthHook(); // fetches user only once
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
