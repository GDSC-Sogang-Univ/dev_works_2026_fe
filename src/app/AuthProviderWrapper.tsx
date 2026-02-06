"use client";

import { AuthProvider } from "@/features/auth/AuthContext";
import { NavBar } from "@/widgets/NavBar/NavBar";

/**
 * AuthProviderWrapper
 * ───────────────────
 * Server Component인 layout.tsx에서 Client Component(AuthProvider, NavBar)를
 * 사용하기 위한 래퍼입니다.
 */
export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NavBar />
      {children}
    </AuthProvider>
  );
}
