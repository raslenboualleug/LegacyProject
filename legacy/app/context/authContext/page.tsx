"use client";

import { AuthProvider } from './authContext';

export default function AuthContextPage({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
