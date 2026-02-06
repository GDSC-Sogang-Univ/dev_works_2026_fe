/**
 * 토큰 저장소
 * ───────────
 * localStorage 기반 간단한 토큰 관리.
 * 참가자는 로그인 성공 시 setToken(token)만 호출하면 됩니다.
 */

const TOKEN_KEY = "auth_token";

/** 저장된 토큰 가져오기 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** 토큰 저장 */
export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

/** 토큰 삭제 (로그아웃) */
export function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}
