"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextField } from "@/shared/ui/text-field/TextField";
import { AuthButton } from "@/shared/ui/auth-button/AuthButton";
import { Alert } from "@/shared/ui/alert/Alert";
import { login as loginApi } from "@/lib/api";
import { useAuth } from "@/features/auth/useAuth";

/**
 * 로그인 페이지
 * ─────────────
 * 기본 폼 UI가 갖춰져 있습니다.
 * 아래 TODO 들을 완성해 주세요!
 */
export default function LoginPage() {
  const router = useRouter();
  const { login: authLogin } = useAuth();

  // ── 폼 상태 ────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ── UI 상태 ────────────────────────────────────────
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ── 폼 제출 핸들러 ────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ─────────────────────────────────────────────────
    // TODO 1: 이메일·비밀번호 validation
    //   - 이메일이 비어있으면 "이메일을 입력해주세요."
    //   - 이메일 형식이 올바르지 않으면 "올바른 이메일 형식이 아닙니다."
    //   - 비밀번호가 비어있으면 "비밀번호를 입력해주세요."
    //   - 비밀번호 8자 미만이면 "비밀번호는 8자 이상이어야 합니다."
    // ─────────────────────────────────────────────────

    // ─────────────────────────────────────────────────
    // TODO 2: 로딩 상태 처리
    //   - API 호출 전 setLoading(true)
    //   - API 호출 후 (성공/실패 모두) setLoading(false)
    // ─────────────────────────────────────────────────

    try {
      const result = await loginApi(email, password);

      // ───────────────────────────────────────────────
      // TODO 3: 에러 응답 처리
      //   - result.success === false 이면 에러코드에 따라
      //     사용자 친화적 메시지를 setError로 보여주세요.
      //   예) "INVALID_CREDENTIALS" → "이메일 또는 비밀번호가 올바르지 않습니다."
      //       "EMAIL_NOT_VERIFIED"  → "이메일 인증을 완료해주세요."
      // ───────────────────────────────────────────────

      // ───────────────────────────────────────────────
      // TODO 4: 로그인 성공 처리
      //   - result.success === true && "accessToken" in result 이면
      //     1) authLogin(result.accessToken)  → 토큰 저장
      //     2) router.push("/dashboard")      → 대시보드로 이동
      // ───────────────────────────────────────────────
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <TextField
            label="이메일"
            type="email"
            placeholder="you@sogang.ac.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="비밀번호"
            type="password"
            placeholder="8자 이상 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AuthButton type="submit" loading={loading}>
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
