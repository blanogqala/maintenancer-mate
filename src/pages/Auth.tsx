
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import Login from "@/components/screens/Login";
import Register from "@/components/screens/Register";
import { AuthProvider } from "@/context/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            <Login onToggleForm={toggleForm} />
          ) : (
            <Register onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </AuthProvider>
  );
};

export default Auth;
