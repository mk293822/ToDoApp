import React from 'react';
import { useAuthContext } from '@/hooks/use-auth-context';
import Loading from '@/components/Loading';
import { Navigate } from 'react-router-dom';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AuthenticatedLayout = ({ children, title }: AuthenticatedLayoutProps) => {
  const { loading, isAuthenticated } = useAuthContext();
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div>
      <title>{title}</title>
      <main>{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
