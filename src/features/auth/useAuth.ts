"use client";

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * 인증 상태를 사용하는 훅
 * ─────────────────────────
 * 컴포넌트 안에서 `const { isAuthed, login, logout } = useAuth();` 로 사용
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth는 <AuthProvider> 안에서 사용해야 합니다.");
  }
  return ctx;
}
