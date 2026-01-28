import { AuthContext } from '@/contexts/Contexts';
import { useContext } from 'react';

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuthContext must be used inside AuthProvider');
  return context;
}
