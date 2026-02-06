"use client";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "sm", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-gray-300 bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sogang-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus-visible:ring-sogang-700",
          size === "sm" && "h-9 py-2",
          size === "md" && "h-10 py-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
