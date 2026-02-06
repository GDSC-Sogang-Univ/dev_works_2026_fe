"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/shared/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // 전체 아래 얇은 라인 + 왼쪽 정렬
      "flex w-full items-center gap-6 border-b border-gray-300 text-sm text-gray-700 " +
        "dark:border-gray-600 dark:text-gray-400",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      [
        // 텍스트만 보이게 / 아래 보더로만 상태 구분
        "relative inline-flex items-center justify-center",
        "px-0 pb-2 text-sm font-medium",
        // 기본 상태
        "border-b-2 border-transparent text-gray-700 dark:text-gray-400",
        // hover 시 살짝 강조
        "hover:text-gray-900 dark:hover:text-gray-300",
        // 활성 탭 (서강 레드 색상 사용)
        "data-[state=active]:text-sogang-700 data-[state=active]:dark:text-sogang-700",
        "data-[state=active]:border-sogang-700 data-[state=active]:dark:border-sogang-700",
        // 접근성 포커스
        "focus-visible:outline-none focus-visible:ring-0",
        "disabled:pointer-events-none disabled:opacity-50",
      ].join(" "),
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-white focus-visible:outline-none focus-visible:ring-2 " +
        "focus-visible:ring-gray-900 focus-visible:ring-offset-2 " +
        "dark:ring-offset-gray-900 dark:focus-visible:ring-gray-300",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
