import React, { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
