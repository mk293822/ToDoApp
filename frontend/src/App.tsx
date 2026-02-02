import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loading from '@/components/Loading';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from './hooks/use-auth-context';
import { ROUTES } from './routes';
import { toast } from 'sonner';
import { eventBus } from './lib/event-bus';
import { EVENT_NAMES } from './event-names';

const Register = lazy(() => import('./Pages/Auth/Register'));
const Login = lazy(() => import('./Pages/Auth/Login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Projects = lazy(() => import('./Pages/Projects'));

function App() {
    const { authLoading } = useAuthContext();

    useEffect(() => {
        const offSuccess = eventBus.on(
            EVENT_NAMES.SUCCESS_NOTIFICATION,
            (data) => {
                toast.success(data?.message, {
                    description: data?.description,
                    duration: 3000,
                    position: 'top-right',
                });
            },
        );

        const offError = eventBus.on(EVENT_NAMES.ERROR_NOTIFICATION, (data) => {
            toast.error(data?.message || 'An error occurred!', {
                description:
                    data?.description ||
                    'There was a problem completing your task.',
                duration: 3000,
                position: 'top-right',
            });
        });

        return () => {
            offSuccess();
            offError();
        };
    }, []);

    if (authLoading) return <Loading />;

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.PROJECTS} element={<Projects />} />
                    <Route path={ROUTES.REGISTER} element={<Register />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
}

export default App;
