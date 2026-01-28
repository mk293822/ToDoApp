import Loading from '@/components/Loading';
import { useAuthContext } from '@/hooks/use-auth-context';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface GuestLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const GuestLayout = ({ children, title }: GuestLayoutProps) => {
  const { loading, isAuthenticated } = useAuthContext();
  if (loading) return <Loading />;
  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen">
      <title>{title}</title>
      <main className="flex justify-center items-center h-screen px-4">
        {children}
      </main>
    </div>
  );
};

export default GuestLayout;
