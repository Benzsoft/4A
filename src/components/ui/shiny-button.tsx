import * as React from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 font-bold text-white transition-all duration-300 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          className
        )}
        {...props}
      >
        <span className="relative flex items-center space-x-2 rounded-lg bg-black/10 px-6 py-3 transition-all duration-300 group-hover:bg-black/20">
          {children}
        </span>
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
      </button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";