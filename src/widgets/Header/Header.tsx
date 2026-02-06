"use client";
import React from "react";
import { Button } from "@/shared/ui/button/Button";
import { Search, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "p-4 flex justify-between items-center bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700",
        className,
      )}>
      <span className="text-[24px] font-black text-sogang-700">서강마켓</span>
      <div className="flex gap-3 items-center">
        {/* 검색 아이콘 */}
        <button className="p-2">
          <Search size={24} color="#555D6D" />
        </button>

        {/* 프로필 아이콘 */}
        <button className="p-2">
          <User size={24} color="#555D6D" />
        </button>

        {/* 상품 등록 버튼 */}
        <Button variant="main" size="sm">
          상품등록
        </Button>
      </div>
    </div>
  );
};

export default Header;
