"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

/**
 * RequireAuth — 인증 필요 페이지 래퍼
 * ────────────────────────────────────
 * 로그인되지 않은 사용자를 /login 으로 리다이렉트합니다.
 *
 * 사용법:
 * ```tsx
 * <RequireAuth>
 *   <DashboardContent />
 * </RequireAuth>
 * ```
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed) {
      router.replace("/login");
    }
  }, [isAuthed, router]);

  if (!isAuthed) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">로그인 페이지로 이동 중...</p>
      </div>
    );
  }

  return <>{children}</>;
}
