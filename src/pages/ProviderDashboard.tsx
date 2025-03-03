
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProviderHome from '@/components/screens/ProviderHome';
import { AuthProvider } from '@/context/AuthContext';

const ProviderDashboard = () => {
  const { user, isAuthenticated, userType } = useAuth();
  
  // Redirect if not logged in or not a provider
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  if (userType === 'customer') {
    return <Navigate to="/user" />;
  }

  return (
    <AuthProvider>
      <ProviderHome />
    </AuthProvider>
  );
};

export default ProviderDashboard;
