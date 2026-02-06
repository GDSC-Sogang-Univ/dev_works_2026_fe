import { NextRequest, NextResponse } from "next/server";
import { findUser, issueCode } from "@/server/mockDb";
import { error, success } from "@/server/errors";

/**
 * POST /api/auth/email/send-code
 * ──────────────────────────────
 * 요청 바디: { email: string }
 * 성공 응답: { success: true }
 *
 * (행사용) 인증 코드는 항상 "123456" 입니다.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(error("MISSING_FIELDS"), { status: 400 });
    }

    // 가입된 유저에게만 코드 발송(정책에 따라 변경 가능)
    if (!findUser(email)) {
      return NextResponse.json(error("USER_NOT_FOUND"), { status: 404 });
    }

    issueCode(email);

    // 실제로는 이메일 전송 — 여기서는 콘솔 출력
    console.log(`[Mock] 인증 코드 발송: ${email} → 123456`);

    return NextResponse.json(success(), { status: 200 });
  } catch {
    return NextResponse.json(error("UNKNOWN_ERROR"), { status: 500 });
  }
}
