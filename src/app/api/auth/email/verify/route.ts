import { NextRequest, NextResponse } from "next/server";
import { verifyCode } from "@/server/mockDb";
import { error, success } from "@/server/errors";

/**
 * POST /api/auth/email/verify
 * ───────────────────────────
 * 요청 바디: { email: string; code: string }
 * 성공 응답: { success: true }
 * 실패 응답: { success: false, errorCode: "INVALID_OR_EXPIRED_CODE" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(error("MISSING_FIELDS"), { status: 400 });
    }

    const ok = verifyCode(email, code);
    if (!ok) {
      return NextResponse.json(error("INVALID_OR_EXPIRED_CODE"), {
        status: 400,
      });
    }

    return NextResponse.json(success(), { status: 200 });
  } catch {
    return NextResponse.json(error("UNKNOWN_ERROR"), { status: 500 });
  }
}
