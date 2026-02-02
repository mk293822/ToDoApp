import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import type { User } from '@/types/main';
import { getCsrfCookie } from '@/lib/csrf';
import type { UseAuthInterface } from '@/interfaces/auth';

export function useAuth(): UseAuthInterface {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const fetchUser = useCallback(
        async ({ fetchCsrf = false }: { fetchCsrf?: boolean } = {}) => {
            setAuthLoading(true);
            try {
                if (fetchCsrf) await getCsrfCookie();
                const { data } = await api.get<User>('/user');
                setUser(data);
                return data;
            } catch {
                setUser(null);
                return null;
            } finally {
                setAuthLoading(false);
            }
        },
        [],
    );

    const login = useCallback(
        async (email: string, password: string) => {
            await getCsrfCookie();
            await api.post('/login', { email, password });
            // fetch user AFTER login
            return fetchUser();
        },
        [fetchUser],
    );

    const register = useCallback(
        async (
            name: string,
            email: string,
            password: string,
            password_confirmation: string,
        ) => {
            await getCsrfCookie();
            await api.post('/register', {
                name,
                email,
                password,
                password_confirmation,
            });
            return fetchUser();
        },
        [fetchUser],
    );

    const logout = useCallback(async () => {
        await api.post('/logout');
        setUser(null);
    }, []);

    // On mount: refresh user (if already logged in)
    useEffect(() => {
        fetchUser({ fetchCsrf: true });
    }, [fetchUser]);

    const isAuthenticated = !!user;

    return {
        user,
        authLoading,
        isAuthenticated,
        login,
        register,
        logout,
        fetchUser,
    };
}
