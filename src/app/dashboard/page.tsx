"use client";

import React from "react";
import { useAuth } from "@/features/auth/useAuth";
import { RequireAuth } from "@/features/auth/RequireAuth";

/**
 * 대시보드 페이지
 * ──────────────
 * 로그인 성공 후 진입하는 페이지입니다.
 * RequireAuth 래퍼가 미인증 사용자를 /login 으로 보냅니다.
 */
export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}

function DashboardContent() {
  const { token, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-1000">
      <div className="w-full max-w-lg space-y-6 rounded-xl bg-white p-8 text-center shadow-sm dark:bg-gray-900">
        <div className="text-5xl">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">로그인 성공!</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          서강마켓 대시보드에 오신 것을 환영합니다.
        </p>

        {/* 토큰 정보 (디버그용) */}
        <div className="rounded-md bg-gray-100 p-4 text-left dark:bg-gray-800">
          <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">Access Token:</p>
          <p className="break-all text-xs font-mono text-gray-700 dark:text-gray-300">{token}</p>
        </div>

        <button
          onClick={logout}
          className="rounded-md bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
          로그아웃
        </button>
      </div>
    </div>
  );
}
