import React from 'react';
import { useAuthContext } from '@/hooks/use-auth-context';
import Sidebar from '@/components/Sidebar';
import { Navigate } from 'react-router-dom';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const AuthenticatedLayout = ({ children, title }: AuthenticatedLayoutProps) => {
    const { isAuthenticated } = useAuthContext();
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return (
        <div>
            <title>{title}</title>
            {/* Sidebar */}
            <div className="flex h-screen bg-gray-50 overflow-hidden text-sm">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default AuthenticatedLayout;
