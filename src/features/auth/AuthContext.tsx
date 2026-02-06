"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { getToken, setToken, clearToken } from "./authStorage";

// ── Context 타입 ───────────────────────────────────────
interface AuthContextValue {
  /** 현재 인증 여부 */
  isAuthed: boolean;
  /** 저장된 토큰 (null 이면 미인증) */
  token: string | null;
  /** 로그인 처리 — 토큰을 저장하고 상태를 갱신 */
  login: (token: string) => void;
  /** 로그아웃 처리 — 토큰 삭제 및 상태 초기화 */
  logout: () => void;
}

// ── Context 생성 ───────────────────────────────────────
export const AuthContext = createContext<AuthContextValue>({
  isAuthed: false,
  token: null,
  login: () => {},
  logout: () => {},
});

// ── Provider ───────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  // 마운트 시 localStorage에서 토큰 복원
  useEffect(() => {
    const saved = getToken();
    if (saved) setTokenState(saved);
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    setTokenState(newToken);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthed: token !== null,
        token,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
