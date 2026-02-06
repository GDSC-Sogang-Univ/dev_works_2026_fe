/**
 * 서버 에러 응답 헬퍼
 * ────────────────────
 * Route Handler에서 일관된 에러 포맷을 보장합니다.
 */

/** 에러 코드 유니온 타입 */
export type ErrorCode =
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_CREDENTIALS"
  | "USER_NOT_FOUND"
  | "EMAIL_NOT_VERIFIED"
  | "INVALID_OR_EXPIRED_CODE"
  | "MISSING_FIELDS"
  | "UNKNOWN_ERROR";

/** 에러 응답 객체 생성 */
export function error(code: ErrorCode, message?: string) {
  const messages: Record<ErrorCode, string> = {
    EMAIL_ALREADY_EXISTS: "이미 가입된 이메일입니다.",
    INVALID_CREDENTIALS: "이메일 또는 비밀번호가 올바르지 않습니다.",
    USER_NOT_FOUND: "존재하지 않는 사용자입니다.",
    EMAIL_NOT_VERIFIED: "이메일 인증이 완료되지 않았습니다.",
    INVALID_OR_EXPIRED_CODE: "인증 코드가 올바르지 않거나 만료되었습니다.",
    MISSING_FIELDS: "필수 항목이 누락되었습니다.",
    UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다.",
  };

  return {
    success: false as const,
    errorCode: code,
    message: message ?? messages[code],
  };
}

/** 성공 응답 객체 생성 */
export function success<T>(data?: T) {
  return {
    success: true as const,
    ...(data !== undefined && { data }),
  };
}
