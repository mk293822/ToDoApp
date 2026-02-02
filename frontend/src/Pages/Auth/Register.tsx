import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useAuthContext } from '@/hooks/use-auth-context';
import { EVENT_NAMES } from '@/event-names';
import { eventBus } from '@/lib/event-bus';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
        {},
    );
    const navigate = useNavigate();
    const { register } = useAuthContext();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await register(name, email, password, passwordConfirmation);

            eventBus.emit(EVENT_NAMES.SUCCESS_NOTIFICATION, {
                message: 'Registration successful',
                description: 'Your account has been created successfully.',
            });

            navigate('/', { replace: true });
        } catch (err) {
            if (axios.isCancel(err)) return;
            if (err instanceof axios.AxiosError) {
                if (err.response?.status === 422) {
                    setFieldErrors(err.response.data.errors);
                } else {
                    eventBus.emit(EVENT_NAMES.ERROR_NOTIFICATION, {
                        message:
                            err.response?.data?.message ||
                            'Registration failed',
                        description:
                            'There was a problem creating your account. Please try again.',
                    });
                }
            } else {
                eventBus.emit(EVENT_NAMES.ERROR_NOTIFICATION, {
                    message: 'Registration failed',
                    description:
                        'There was a problem creating your account. Please try again.',
                });
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
                        <FieldLegend className="text-center">
                            Register
                        </FieldLegend>

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
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                placeholder="Confirm password"
                            />
                        </Field>

                        <Button type="submit" className="w-full">
                            Register
                        </Button>

                        <FieldContent>
                            <FieldDescription className="flex flex-row gap-2 justify-end items-center">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-blue-500 hover:underline"
                                >
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
