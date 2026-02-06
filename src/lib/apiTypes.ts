/**
 * API 응답 타입 정의
 * ──────────────────
 * 모든 API 응답은 이 포맷을 따릅니다.
 */

/** 성공 응답 */
export interface ApiSuccess<T = undefined> {
  success: true;
  data?: T;
}

/** 에러 응답 */
export interface ApiError {
  success: false;
  errorCode: string;
  message?: string;
}

/** 통합 응답 타입 */
export type ApiResponse<T = undefined> = ApiSuccess<T> | ApiError;

/** 로그인 성공 시 추가 필드 */
export interface LoginSuccessResponse {
  success: true;
  accessToken: string;
}

/** 에러 코드 목록 (자동완성용) */
export type ErrorCode =
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_CREDENTIALS"
  | "USER_NOT_FOUND"
  | "EMAIL_NOT_VERIFIED"
  | "INVALID_OR_EXPIRED_CODE"
  | "MISSING_FIELDS"
  | "UNKNOWN_ERROR";
