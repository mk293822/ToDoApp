import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import axios from 'axios';
import GuestLayout from '@/Layouts/GuestLayout';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Link, useNavigate } from 'react-router-dom';
import { getCsrfCookie } from '@/lib/csrf';
import { useAuthContext } from '@/hooks/use-auth-context';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await getCsrfCookie();

      // 2️⃣ Call login API
      const { data } = await api.post('/login', { email, password });

      // 3️⃣ Fetch current user
      setUser(data);
      // const { data } = await api.get('/user');
      navigate('/', { replace: true });
      // setSuccess(`Logged in as ${data.name}`);
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        if (err.response?.status === 422) {
          setFieldErrors(err.response.data.errors);
        } else {
          setError(err.response?.data?.message || 'Login failed');
        }
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const firstError = (field: string) => fieldErrors?.[field]?.[0] || '';

  return (
    <GuestLayout title="Login">
      <form
        onSubmit={handleLogin}
        className="max-w-md w-full mx-auto mt-10 p-6 border rounded shadow space-y-4"
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-center">Login</FieldLegend>
            {error && <p className="text-red-500">{error}</p>}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
              />
              {firstError('email') && (
                <FieldDescription className="text-red-500">
                  {firstError('email')}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {firstError('password') && (
                <FieldDescription className="text-red-500">
                  {firstError('password')}
                </FieldDescription>
              )}
            </Field>

            <Button type="submit" className="w-full">
              Login
            </Button>
            <FieldContent>
              <FieldDescription className="flex flex-row gap-2 justify-end items-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </FieldDescription>
            </FieldContent>
          </FieldSet>
        </FieldGroup>
      </form>
    </GuestLayout>
  );
};

export default Login;
