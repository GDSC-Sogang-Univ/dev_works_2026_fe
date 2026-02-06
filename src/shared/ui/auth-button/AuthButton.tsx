"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 로딩 중이면 스피너 표시 & 비활성화 */
  loading?: boolean;
  /** 추가 className */
  className?: string;
  children: React.ReactNode;
}

/**
 * AuthButton — 로딩 상태를 지원하는 간단한 버튼
 * 기존 shared/ui/button/Button.tsx 와 별개로,
 * 인증 폼 전용 심플 버튼을 제공합니다.
 */
export function AuthButton({
  loading = false,
  disabled,
  className,
  children,
  ...props
}: AuthButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors",
        "bg-sogang-700 hover:bg-sogang-800",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus:outline-none focus:ring-2 focus:ring-sogang-700 focus:ring-offset-2",
        className,
      )}
      {...props}>
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
