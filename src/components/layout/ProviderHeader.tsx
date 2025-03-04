
import React from 'react';
import AppHeader from './AppHeader';

const ProviderHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};

export default ProviderHeader;
