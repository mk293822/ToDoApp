// useAuth.ts
import api from '@/lib/api';
import type { User } from '@/types/User';
import axios from 'axios';
import { getCsrfCookie } from '@/lib/csrf';
import type { FetchUserParams } from '@/interfaces/auth';

export async function fetchUser({
  setUser,
  setLoading,
  fetchCsrf = false,
}: FetchUserParams): Promise<User | null> {
  setLoading(true);

  try {
    if (fetchCsrf) await getCsrfCookie();
    const { data } = await api.get<User>('/user');
    setUser(data);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(
        'Failed to fetch user:',
        err.response?.data?.message || err.message,
      );
    } else {
      console.error('An unexpected error occurred:', err);
    }
    setUser(null);
    return null;
  } finally {
    setLoading(false);
  }
}
