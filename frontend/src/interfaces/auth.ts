import type { User } from '@/types/User';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UseAuthInterface {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<User | null>;
  logout: () => Promise<void>;
  fetchUser: (options?: { fetchCsrf?: boolean }) => Promise<User | null>;
}
