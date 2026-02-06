"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TextField } from "@/shared/ui/text-field/TextField";
import { AuthButton } from "@/shared/ui/auth-button/AuthButton";
import { Alert } from "@/shared/ui/alert/Alert";
import { sendEmailCode, verifyEmailCode } from "@/lib/api";

/**
 * 이메일 인증 페이지 (선택 기능)
 * ──────────────────────────────
 * 회원가입 후 이메일 인증 코드를 입력하는 페이지입니다.
 * URL: /verify-email?email=user@example.com
 *
 * (행사용) 인증 코드는 항상 "123456" 입니다.
 */
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      }>
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? "";

  // ── 상태 ────────────────────────────────────────
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  // ── 인증 코드 발송 ────────────────────────────────
  const handleSendCode = async () => {
    setError(null);
    setSuccess(null);

    // ─────────────────────────────────────────────────
    // TODO 1: 코드 발송 로직
    //   - setLoading(true)
    //   - sendEmailCode(email) 호출
    //   - 성공 시: setCodeSent(true), setSuccess("인증 코드가 발송되었습니다.")
    //   - 실패 시: setError(에러 메시지)
    //   - finally: setLoading(false)
    // ─────────────────────────────────────────────────

    // ─────────────────────────────────────────────────
    // TODO 2 (선택): 재발송 타이머 UX
    //   - 코드 발송 후 60초 카운트다운
    //   - 카운트다운 중에는 "재발송" 버튼 비활성화
    //   - 남은 시간 표시: "재발송 (45초)"
    // ─────────────────────────────────────────────────
  };

  // ── 인증 코드 검증 ────────────────────────────────
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // ─────────────────────────────────────────────────
    // TODO 3: 코드 검증 로직
    //   - 코드가 비어있으면 "인증 코드를 입력해주세요." 에러
    //   - setLoading(true)
    //   - verifyEmailCode(email, code) 호출
    //   - 성공 시: setSuccess("이메일 인증이 완료되었습니다!") → 잠시 후 router.push("/login")
    //   - 실패 시: 에러코드에 따른 메시지 표시
    //     예) "INVALID_OR_EXPIRED_CODE" → "인증 코드가 만료되었거나 올바르지 않습니다."
    //   - finally: setLoading(false)
    // ─────────────────────────────────────────────────
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-1000">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-900">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">이메일 인증</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-sogang-700">{email}</span>
            <br />
            으로 발송된 인증 코드를 입력해주세요
          </p>
          <p className="mt-1 text-xs text-gray-500">
            (행사용 힌트: 인증 코드는 <strong>123456</strong> 입니다)
          </p>
        </div>

        {/* 알림 */}
        <Alert message={error} variant="error" />
        <Alert message={success} variant="success" />

        {/* 코드 발송 버튼 */}
        {!codeSent && (
          <AuthButton onClick={handleSendCode} loading={loading}>
            인증 코드 발송
          </AuthButton>
        )}

        {/* 코드 입력 폼 */}
        {codeSent && (
          <form onSubmit={handleVerify} className="space-y-5">
            <TextField
              label="인증 코드"
              type="text"
              placeholder="6자리 코드 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <AuthButton type="submit" loading={loading}>
              인증 확인
            </AuthButton>

            <button
              type="button"
              onClick={handleSendCode}
              className="w-full text-center text-sm text-gray-600 hover:text-sogang-700 dark:text-gray-400">
              코드 재발송
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
