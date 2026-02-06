/**
 * API 클라이언트 (프론트엔드)
 * ──────────────────────────
 * 참가자는 이 함수들을 import해서 바로 사용하면 됩니다.
 * fetch를 직접 쓸 필요 없이, 함수 호출 한 번으로 API 통신 완료!
 */

import type { ApiResponse, LoginSuccessResponse } from "./apiTypes";

const BASE_URL = "/api/auth";

/** 공통 POST 요청 헬퍼 */
async function post<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

// ── 회원가입 ───────────────────────────────────────────

/**
 * 회원가입 API
 * @param email 이메일 주소
 * @param password 비밀번호
 */
export async function signup(
  email: string,
  password: string,
): Promise<ApiResponse> {
  return post<ApiResponse>("/signup", { email, password });
}

// ── 로그인 ─────────────────────────────────────────────

/**
 * 로그인 API
 * @param email 이메일 주소
 * @param password 비밀번호
 * @returns 성공 시 accessToken 포함
 */
export async function login(
  email: string,
  password: string,
): Promise<LoginSuccessResponse | ApiResponse> {
  return post<LoginSuccessResponse | ApiResponse>("/login", { email, password });
}

// ── 이메일 인증 코드 발송 (선택) ───────────────────────

/**
 * 이메일 인증 코드 발송
 * @param email 이메일 주소
 */
export async function sendEmailCode(email: string): Promise<ApiResponse> {
  return post<ApiResponse>("/email/send-code", { email });
}

// ── 이메일 인증 코드 검증 (선택) ───────────────────────

/**
 * 이메일 인증 코드 검증
 * @param email 이메일 주소
 * @param code 인증 코드 (6자리)
 */
export async function verifyEmailCode(
  email: string,
  code: string,
): Promise<ApiResponse> {
  return post<ApiResponse>("/email/verify", { email, code });
}
