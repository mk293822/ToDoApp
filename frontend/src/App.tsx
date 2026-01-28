import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from './hooks/use-auth-context';

const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Register = lazy(() => import('./Pages/Auth/Register'));
const Login = lazy(() => import('./Pages/Auth/Login'));

function App() {
  const { loading } = useAuthContext();
  if (loading) return <Loading />;

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
