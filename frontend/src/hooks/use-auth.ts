// useAuth.ts
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { User } from '@/types/User';
import axios from 'axios';
import { getCsrfCookie } from '@/lib/csrf';
import type { UseAuthInterface } from '@/interfaces/auth';

export function useAuth(): UseAuthInterface {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        await getCsrfCookie();
        const response = await api.get('/user'); // make sure your route is correct
        console.log('Fetched user:', response.data);
        setUser(response.data);
      } catch (err) {
        if (err instanceof axios.AxiosError) {
          console.error(
            'Failed to fetch user:',
            err.response?.data?.message || err.message,
          );
        } else {
          console.error('An unexpected error occurred:', err);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const isAuthenticated = user !== null;

  return { user, isAuthenticated, loading, setUser };
}
