"use client";

import { ProfileProvider } from './profileContext';

export default function ProfileContextPage({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      {children}
    </ProfileProvider>
  );
}
