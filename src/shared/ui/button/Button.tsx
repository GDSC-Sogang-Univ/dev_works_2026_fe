"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sogang-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-900 dark:focus-visible:ring-sogang-700",
  {
    variants: {
      variant: {
        main: "bg-sogang-700 text-white hover:bg-sogang-800 disabled:bg-gray-200 disabled:text-gray-600 dark:bg-sogang-700 dark:hover:bg-sogang-800 dark:disabled:bg-gray-700 dark:disabled:text-gray-500",
        destructive:
          "bg-sogang-900 text-white hover:bg-sogang-800 dark:bg-sogang-900 dark:hover:bg-sogang-800",
        outline:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-transparent dark:border-gray-600 dark:hover:bg-gray-800 dark:data-[state=selected]:border-gray-500",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:data-[state=selected]:bg-gray-700 dark:data-[state=selected]:text-white",
        dark: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 dark:data-[state=selected]:bg-gray-700 dark:data-[state=selected]:text-white dark:data-[state=selected]:font-semibold dark:data-[state=selected]:border dark:data-[state=selected]:border-gray-600",
        ghost: "bg-transparent hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
        link: "bg-transparent underline-offset-4 hover:underline !p-0 !h-fit dark:text-gray-400 dark:hover:text-white dark:underline dark:disabled:underline-none dark:disabled:text-gray-600",
      },
      size: {
        "default": "h-10 text-base rounded-[6px]",
        "xs": "h-7 text-xs rounded-[5px]",
        "sm": "h-8 text-sm rounded-[6px]",
        "md": "h-9 text-sm rounded-[6px]",
        "lg": "h-10 text-base rounded-[6px]",
        "xl": "h-12 text-lg rounded-[7px]",
        "2xl": "h-14 text-lg rounded-[8px]",
        "icon": "h-10 w-10 rounded-md p-2",
        "iconSm": "h-9 w-9 rounded-md p-2",
        "iconXs": "h-7 w-7 rounded-[5px] p-1",
      },
      iconPosition: {
        none: "",
        left: "inline-flex items-center",
        right: "inline-flex items-center",
        only: "justify-center shrink-0",
      },
    },
    compoundVariants: [
      // --- XS ---
      { size: "xs", iconPosition: "none", class: "px-3" }, // 12px
      { size: "xs", iconPosition: "left", class: "pl-2 pr-3 gap-0.5" }, // 8px + 12px, gap=2px
      { size: "xs", iconPosition: "right", class: "pl-3 pr-2 gap-0.5" },
      { size: "xs", iconPosition: "only", class: "w-7 p-0" }, // icon 20px, container 28px

      // --- SM ---
      { size: "sm", iconPosition: "none", class: "px-3" }, // 12px
      { size: "sm", iconPosition: "left", class: "pl-2 pr-3 gap-0.5" }, // 8px + 12px, gap=2px
      { size: "sm", iconPosition: "right", class: "pl-3 pr-2 gap-0.5" },
      { size: "sm", iconPosition: "only", class: "w-8 p-0" }, // icon 20px, container 32px

      // --- MD ---
      { size: "md", iconPosition: "none", class: "px-[14px]" },
      { size: "md", iconPosition: "left", class: "pl-3 pr-[14px] gap-1" }, // gap=4px
      { size: "md", iconPosition: "right", class: "pl-[14px] pr-3 gap-1" },
      { size: "md", iconPosition: "only", class: "w-9 p-0" }, // icon 24px, container 36px

      // --- LG ---
      { size: "lg", iconPosition: "none", class: "px-4" }, // 16px
      { size: "lg", iconPosition: "left", class: "pl-3 pr-4 gap-1" }, // gap=4px
      { size: "lg", iconPosition: "right", class: "pl-4 pr-3 gap-1" },
      { size: "lg", iconPosition: "only", class: "w-10 p-0" }, // icon 32px

      // --- XL ---
      { size: "xl", iconPosition: "none", class: "px-5" }, // 20px
      { size: "xl", iconPosition: "left", class: "pl-[14px] pr-5 gap-1.5" }, // gap=6px
      { size: "xl", iconPosition: "right", class: "pl-5 pr-[14px] gap-1.5" },
      { size: "xl", iconPosition: "only", class: "w-12 p-0" }, // icon 40px

      // --- 2XL ---
      { size: "2xl", iconPosition: "none", class: "px-6" }, // 24px
      { size: "2xl", iconPosition: "left", class: "pl-4 pr-6 gap-1.5" }, // left=16px → pl-4
      { size: "2xl", iconPosition: "right", class: "pl-6 pr-4 gap-1.5" }, // right=16px → pr-4
      { size: "2xl", iconPosition: "only", class: "w-14 p-0" }, // icon 48px
    ],
    defaultVariants: {
      variant: "main",
      size: "lg",
      iconPosition: "none",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

interface FullStoryProps {
  fullStoryClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & FullStoryProps>(
  (
    { className, variant, size, iconPosition, asChild = false, fullStoryClassName = "", ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          fullStoryClassName,
          buttonVariants({ variant, size, iconPosition }),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
