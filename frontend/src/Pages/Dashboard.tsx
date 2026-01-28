import { useAuthContext } from '@/hooks/use-auth-context';
import type { UseAuthInterface } from '@/interfaces/auth';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Dashboard = () => {
  const { user, logout }: UseAuthInterface = useAuthContext();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <AuthenticatedLayout title="Dashboard">
      <a href="/login">Login</a>
      <button onClick={handleLogout}>logout</button>
      <div className="flex flex-col items-center justify-center">
        <p>{user?.id}</p>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
