import { NextRequest, NextResponse } from "next/server";
import { createUser, findUser } from "@/server/mockDb";
import { error, success } from "@/server/errors";

/**
 * POST /api/auth/signup
 * ─────────────────────
 * 요청 바디: { email: string; password: string }
 * 성공 응답: { success: true }
 * 실패 응답: { success: false, errorCode: string, message: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. 필수 필드 확인
    if (!email || !password) {
      return NextResponse.json(error("MISSING_FIELDS"), { status: 400 });
    }

    // 2. 이미 가입된 이메일인지 확인
    if (findUser(email)) {
      return NextResponse.json(error("EMAIL_ALREADY_EXISTS"), { status: 409 });
    }

    // 3. 유저 생성
    createUser(email, password);

    return NextResponse.json(success(), { status: 201 });
  } catch {
    return NextResponse.json(error("UNKNOWN_ERROR"), { status: 500 });
  }
}
