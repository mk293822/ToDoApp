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
import { fetchUser } from '@/helpers/fetch-user';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();
  const { setUser, setLoading } = useAuthContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await getCsrfCookie();

      // 2️⃣ Call register API
      await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      // 3️⃣ Fetch current user
      await api.get('/user');

      await fetchUser({ setUser, setLoading, fetchCsrf: false });

      setSuccess(`Registered and logged in`);

      navigate('/', { replace: true });
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
    <GuestLayout title="Register">
      <form
        onSubmit={handleRegister}
        className="max-w-md w-full mx-auto mt-10 p-6 border rounded shadow space-y-4"
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-center">Register</FieldLegend>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
              {firstError('name') && (
                <FieldDescription className="text-red-500">
                  {firstError('name')}
                </FieldDescription>
              )}
            </Field>

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

            <Field>
              <FieldLabel htmlFor="passwordConfirmation">
                Confirm Password
              </FieldLabel>
              <Input
                id="passwordConfirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirm password"
              />
            </Field>

            <Button type="submit" className="w-full">
              Register
            </Button>

            <FieldContent>
              <FieldDescription className="flex flex-row gap-2 justify-end items-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </FieldDescription>
            </FieldContent>
          </FieldSet>
        </FieldGroup>
      </form>
    </GuestLayout>
  );
};

export default Register;
