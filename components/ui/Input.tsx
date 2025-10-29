import { cn } from "@/lib/cn";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "flex min-h-[44px] w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-3 text-[16px] transition-all duration-200 text-white placeholder:text-white/50",
            "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:bg-white/15 focus:scale-[1.01]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-400 focus:ring-red-400",
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-300" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
