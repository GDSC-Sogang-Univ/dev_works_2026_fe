"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";

type AlertVariant = "error" | "success" | "info";

interface AlertProps {
  /** 표시 여부 — message가 없으면 자동으로 숨김 */
  message?: string | null;
  /** 스타일 종류 */
  variant?: AlertVariant;
  /** 추가 className */
  className?: string;
}

const variantStyles: Record<AlertVariant, string> = {
  error:
    "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400",
  success:
    "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400",
  info: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400",
};

/**
 * Alert — 에러/성공/안내 메시지 표시 컴포넌트
 */
export function Alert({ message, variant = "error", className }: AlertProps) {
  if (!message) return null;

  return (
    <div
      className={cn("rounded-md border px-4 py-3 text-sm", variantStyles[variant], className)}
      role="alert">
      {message}
    </div>
  );
}
