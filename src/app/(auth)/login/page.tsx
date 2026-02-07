"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/shared/ui/text-field/TextField";
import { AuthButton } from "@/shared/ui/auth-button/AuthButton";
import { Alert } from "@/shared/ui/alert/Alert";
import { login as loginApi } from "@/lib/api";
import { useAuth } from "@/features/auth/useAuth";

/**
 * 로그인 페이지
 * ─────────────
 * 이메일과 비밀번호로 로그인합니다.
 * 이메일 인증이 필수입니다.
 */
export default function LoginPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  // ── UI 상태 ────────────────────────────────────────
  const [error, setError] = useState<string | null>(null);
  const loginSchema = z.object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다."),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);

    try {
      const result = await loginApi(data.email, data.password);

      if (!result.success) {
        if (result.errorCode === "EMAIL_NOT_VERIFIED") {
          router.push(`/signup?step=verify&email=${encodeURIComponent(data.email)}`);
          return;
        }

        // 3. 에러 응답 처리
        const errorMessages: Record<string, string> = {
          INVALID_CREDENTIALS: "이메일 또는 비밀번호가 올바르지 않습니다.",
          MISSING_FIELDS: "모든 항목을 입력해주세요.",
          UNKNOWN_ERROR: "로그인 중 오류가 발생했습니다.",
        };

        const message =
          errorMessages[result.errorCode] || result.message || "알 수 없는 오류가 발생했습니다.";
        setError(message);
        return;
      }

      // 4. 로그인 성공 처리
      if ("accessToken" in result) {
        authLogin(result.accessToken);
        router.push("/main");
      }
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-1000">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-900">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">로그인</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            서강마켓에 오신 것을 환영합니다
          </p>
        </div>

        {/* 에러 알림 */}
        <Alert message={error} variant="error" />

        {/* 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label="이메일"
            type="email"
            placeholder="you@sogang.ac.kr"
            error={errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력"
            error={errors.password?.message}
            {...register("password")}
          />

          <AuthButton type="submit" loading={isSubmitting}>
            로그인
          </AuthButton>
        </form>

        {/* 하단 링크 */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="font-medium text-sogang-700 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
