
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import UserHome from '@/components/screens/UserHome';
import { AuthProvider } from '@/context/AuthContext';

const UserDashboard = () => {
  const { user, isAuthenticated, userType } = useAuth();
  
  // Redirect if not logged in or not a customer
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  if (userType === 'provider') {
    return <Navigate to="/provider" />;
  }

  return (
    <AuthProvider>
      <UserHome />
    </AuthProvider>
  );
};

export default UserDashboard;
