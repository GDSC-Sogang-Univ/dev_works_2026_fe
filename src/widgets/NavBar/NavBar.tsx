"use client";

import Link from "next/link";
import { Search, User } from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/button/Button";
import { cn } from "@/shared/lib/utils";

/**
 * NavBar — 전역 내비게이션 바
 * ───────────────────────────
 * 로그인 상태에 따라 표시 링크가 달라집니다.
 */
export function NavBar() {
  const { isAuthed, logout } = useAuth();
  const pathname = usePathname();

  const linkClass = (href: string) =>
    cn(
      "text-sm font-medium transition-colors hover:text-sogang-700",
      pathname === href ? "text-sogang-700" : "text-gray-700 dark:text-gray-300",
    );

  return (
    <nav className="flex items-center justify-between border-b border-gray-300 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-900">
      {/* 로고 */}
      <Link href="/" className="text-xl font-black text-sogang-700">
        서강마켓
      </Link>

      {/* 링크 */}
      <div className="flex items-center gap-5">
        {isAuthed ? (
          <>
            <Link href="/main" className={linkClass("/main")}>
              Main
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="ghost" iconPosition="only">
                <Search size={20} color="#555D6D" />
              </Button>
              <Button variant="ghost" iconPosition="only">
                <User size={20} color="#555D6D" />
              </Button>
              <Button variant="main" size="sm">
                상품등록
              </Button>
            </div>
            <button
              onClick={logout}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-sogang-700 dark:text-gray-300">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={linkClass("/login")}>
              Login
            </Link>
            <Link href="/signup" className={linkClass("/signup")}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
