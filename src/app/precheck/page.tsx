"use client";

import React, { useState } from "react";
import { AuthButton } from "@/shared/ui/auth-button/AuthButton";
import { Alert } from "@/shared/ui/alert/Alert";

/**
 * Precheck 페이지
 * ───────────────
 * API 연결이 제대로 되는지 빠르게 확인하는 디버깅 페이지입니다.
 * 행사 당일 "API 안 돼요" 문의를 1분 내로 해결할 수 있습니다.
 */

interface TestResult {
  endpoint: string;
  status: "idle" | "loading" | "success" | "error";
  response?: string;
}

export default function PrecheckPage() {
  const [results, setResults] = useState<TestResult[]>([
    { endpoint: "POST /api/auth/signup", status: "idle" },
    { endpoint: "POST /api/auth/login", status: "idle" },
    { endpoint: "POST /api/auth/email/send-code", status: "idle" },
    { endpoint: "POST /api/auth/email/verify", status: "idle" },
  ]);

  const updateResult = (index: number, update: Partial<TestResult>) => {
    setResults((prev) => prev.map((r, i) => (i === index ? { ...r, ...update } : r)));
  };

  // ── 테스트: 회원가입 ─────────────────────────────
  const testSignup = async () => {
    updateResult(0, { status: "loading", response: undefined });
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: `test-${Date.now()}@sogang.ac.kr`,
          password: "testpassword123",
        }),
      });
      const data = await res.json();
      updateResult(0, {
        status: data.success ? "success" : "error",
        response: JSON.stringify(data, null, 2),
      });
    } catch (err) {
      updateResult(0, {
        status: "error",
        response: String(err),
      });
    }
  };

  // ── 테스트: 로그인 ───────────────────────────────
  const testLogin = async () => {
    updateResult(1, { status: "loading", response: undefined });
    try {
      // 먼저 유저 생성
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "precheck@sogang.ac.kr",
          password: "testpassword123",
        }),
      });
      // 로그인 시도
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "precheck@sogang.ac.kr",
          password: "testpassword123",
        }),
      });
      const data = await res.json();
      updateResult(1, {
        status: data.success ? "success" : "error",
        response: JSON.stringify(data, null, 2),
      });
    } catch (err) {
      updateResult(1, {
        status: "error",
        response: String(err),
      });
    }
  };

  // ── 테스트: 이메일 코드 발송 ─────────────────────
  const testSendCode = async () => {
    updateResult(2, { status: "loading", response: undefined });
    try {
      const res = await fetch("/api/auth/email/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "precheck@sogang.ac.kr" }),
      });
      const data = await res.json();
      updateResult(2, {
        status: data.success ? "success" : "error",
        response: JSON.stringify(data, null, 2),
      });
    } catch (err) {
      updateResult(2, {
        status: "error",
        response: String(err),
      });
    }
  };

  // ── 테스트: 이메일 코드 검증 ─────────────────────
  const testVerifyCode = async () => {
    updateResult(3, { status: "loading", response: undefined });
    try {
      const res = await fetch("/api/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "precheck@sogang.ac.kr", code: "123456" }),
      });
      const data = await res.json();
      updateResult(3, {
        status: data.success ? "success" : "error",
        response: JSON.stringify(data, null, 2),
      });
    } catch (err) {
      updateResult(3, {
        status: "error",
        response: String(err),
      });
    }
  };

  const handlers = [testSignup, testLogin, testSendCode, testVerifyCode];

  const runAll = async () => {
    for (let i = 0; i < handlers.length; i++) {
      await handlers[i]();
    }
  };

  const statusEmoji = (s: TestResult["status"]) => {
    switch (s) {
      case "idle":
        return "⏸️";
      case "loading":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 dark:bg-gray-1000">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🔍 API Precheck</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            버튼을 클릭하여 각 API가 정상 작동하는지 확인하세요.
          </p>
        </div>

        <Alert
          message="이 페이지는 디버깅 전용입니다. 각 API 엔드포인트의 응답을 확인할 수 있습니다."
          variant="info"
        />

        {/* 전체 실행 */}
        <AuthButton onClick={runAll}>🚀 전체 테스트 실행</AuthButton>

        {/* 결과 카드 */}
        {results.map((r, i) => (
          <div
            key={r.endpoint}
            className="rounded-lg border border-gray-300 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{statusEmoji(r.status)}</span>
                <code className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {r.endpoint}
                </code>
              </div>
              <button
                onClick={handlers[i]}
                className="rounded-md bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                테스트
              </button>
            </div>
            {r.response && (
              <pre className="mt-3 max-h-40 overflow-auto rounded-md bg-gray-100 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {r.response}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
