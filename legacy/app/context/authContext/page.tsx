"use client";

import { AuthProvider } from './authContext';

export default function AuthContextPage({ children }: { children: React.ReactNode }) {
  console.log('testttt');
  
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
