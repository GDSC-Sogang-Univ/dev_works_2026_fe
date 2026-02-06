"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";

interface TextFieldProps {
  /** 라벨 텍스트 */
  label?: string;
  /** input 타입 (text, email, password 등) */
  type?: React.HTMLInputTypeAttribute;
  /** 값 */
  value: string;
  /** 값 변경 핸들러 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 에러 메시지 — 있으면 빨간색으로 표시 */
  error?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 className */
  className?: string;
}

/**
 * TextField — 라벨 + 인풋 + 에러 메시지가 합쳐진 편의 컴포넌트
 * 참가자가 매번 인풋을 만들지 않도록 제공합니다.
 */
export function TextField({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  disabled,
  className,
}: TextFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors",
          "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
          "dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-sogang-700 dark:border-gray-600",
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
