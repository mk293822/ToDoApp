import { useEffect, useState, type ReactNode } from 'react';
import { AuthContext } from './Contexts';
import type { User } from '@/types/User';
import { fetchUser } from '@/helpers/fetch-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser({ setUser, setLoading, fetchCsrf: true });
  }, []);

  const isAuthenticated = user !== null;

  const auth = { user, isAuthenticated, loading, setUser, setLoading };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
