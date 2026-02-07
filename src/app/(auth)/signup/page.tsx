"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/shared/ui/text-field/TextField";
import { AuthButton } from "@/shared/ui/auth-button/AuthButton";
import { Alert } from "@/shared/ui/alert/Alert";
import { signup as signupApi, sendEmailCode, verifyEmailCode } from "@/lib/api";

/**
 * 회원가입 페이지 + 이메일 인증
 * ──────────────────────────────
 * 회원가입 폼과 이메일 인증을 한 화면에서 처리합니다.
 * 1. 이메일, 비밀번호 입력 & 유효성 검증
 * 2. 회원가입 완료
 * 3. 이메일 인증 코드 발송 & 검증 (필수)
 * 4. 로그인 페이지로 이동
 */
export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── UI 상태 ────────────────────────────────────────
  const [error, setError] = useState<string | null>(null);

  // ── 이메일 인증 상태 ────────────────────────────────
  const [step, setStep] = useState<"signup" | "verify">("signup"); // signup → verify
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);

  const signupSchema = z
    .object({
      email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
      password: z
        .string()
        .min(1, "비밀번호를 입력해주세요.")
        .min(8, "비밀번호는 8자 이상이어야 합니다."),
      confirmPassword: z.string().min(1, "비밀번호를 다시 입력해주세요."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    });

  const verifySchema = z.object({
    verificationCode: z.string().min(1, "인증 코드를 입력해주세요."),
  });

  type SignupFormValues = z.infer<typeof signupSchema>;
  type VerifyFormValues = z.infer<typeof verifySchema>;

  const {
    register,
    handleSubmit: handleSignupSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const {
    register: registerVerify,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors },
    reset: resetVerify,
  } = useForm<VerifyFormValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verificationCode: "",
    },
    mode: "onSubmit",
  });

  const emailValue = watch("email");

  useEffect(() => {
    const stepParam = searchParams.get("step");
    const emailParam = searchParams.get("email");

    if (stepParam === "verify" && emailParam) {
      setValue("email", emailParam, { shouldValidate: true });
      setStep("verify");
      setIsCodeSent(false);
      resetVerify();
      setCodeError(null);
    }
  }, [resetVerify, searchParams, setValue]);

  // ── 회원가입 제출 핸들러 ──────────────────────────
  const onSignupSubmit = async (data: SignupFormValues) => {
    setError(null);

    try {
      const result = await signupApi(data.email, data.password);

      if (!result.success) {
        // 3. 에러 응답 처리
        const errorMessages: Record<string, string> = {
          EMAIL_ALREADY_EXISTS: "이미 가입된 이메일입니다.",
          MISSING_FIELDS: "모든 항목을 입력해주세요.",
          UNKNOWN_ERROR: "회원가입 중 오류가 발생했습니다.",
        };

        const message =
          errorMessages[result.errorCode] || result.message || "알 수 없는 오류가 발생했습니다.";
        setError(message);
        return;
      }

      // 4. 회원가입 성공 → 이메일 인증 단계로 전환
      setStep("verify");
      setIsCodeSent(false);
      resetVerify();
      setError(null);
    } catch {
      setError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // ── 인증 코드 발송 핸들러 ──────────────────────────
  const handleSendCode = async () => {
    setCodeError(null);
    setIsVerifying(true);

    const emailValidation = signupSchema.shape.email.safeParse(emailValue);
    if (!emailValidation.success) {
      setCodeError(emailValidation.error.issues[0]?.message ?? "올바른 이메일 형식이 아닙니다.");
      setIsVerifying(false);
      return;
    }

    try {
      const result = await sendEmailCode(emailValue);

      if (!result.success) {
        setCodeError("인증 코드 발송에 실패했습니다. 다시 시도해주세요.");
        return;
      }

      setIsCodeSent(true);
    } catch {
      setCodeError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsVerifying(false);
    }
  };

  // ── 인증 코드 검증 핸들러 ──────────────────────────
  const onVerifySubmit = async (data: VerifyFormValues) => {
    setCodeError(null);

    if (!emailValue) {
      setCodeError("이메일을 입력해주세요.");
      return;
    }

    setIsVerifying(true);

    try {
      const result = await verifyEmailCode(emailValue, data.verificationCode);

      if (!result.success) {
        const errorMessages: Record<string, string> = {
          INVALID_OR_EXPIRED_CODE: "인증 코드가 올바르지 않거나 만료되었습니다.",
          MISSING_FIELDS: "모든 항목을 입력해주세요.",
          UNKNOWN_ERROR: "인증 중 오류가 발생했습니다.",
        };

        const message =
          errorMessages[result.errorCode] || result.message || "알 수 없는 오류가 발생했습니다.";
        setCodeError(message);
        return;
      }

      // 인증 성공 → 로그인 페이지로 이동
      router.push("/login");
    } catch {
      setCodeError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-1000">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-900">
        {step === "signup" ? (
          <>
            {/* 헤더 */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">회원가입</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                서강마켓에 가입하고 거래를 시작하세요
              </p>
            </div>

            {/* 에러 알림 */}
            <Alert message={error} variant="error" />

            {/* 폼 */}
            <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="space-y-5">
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

              <TextField
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 입력"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <AuthButton type="submit" loading={isSubmitting}>
                회원가입
              </AuthButton>
            </form>

            {/* 하단 링크 */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="font-medium text-sogang-700 hover:underline">
                로그인
              </Link>
            </p>
          </>
        ) : (
          <>
            {/* 이메일 인증 헤더 */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">이메일 인증</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {emailValue}로 발송된 인증 코드를 입력해주세요
              </p>
            </div>

            {/* 인증 에러 알림 */}
            <Alert message={codeError} variant="error" />

            {/* 이메일 인증 폼 */}
            <form onSubmit={handleVerifySubmit(onVerifySubmit)} className="space-y-5">
              {!isCodeSent ? (
                <AuthButton
                  type="button"
                  onClick={handleSendCode}
                  loading={isVerifying}
                  className="w-full">
                  인증 코드 발송
                </AuthButton>
              ) : (
                <>
                  <TextField
                    label="인증 코드"
                    type="text"
                    placeholder="123456"
                    error={verifyErrors.verificationCode?.message}
                    {...registerVerify("verificationCode")}
                  />

                  <AuthButton type="submit" loading={isVerifying}>
                    인증 완료
                  </AuthButton>

                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={isVerifying}
                    className="w-full text-sm text-sogang-700 hover:underline disabled:text-gray-400">
                    코드 재발송
                  </button>
                </>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
