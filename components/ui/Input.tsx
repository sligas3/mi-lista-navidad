import { cn } from "@/lib/cn";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "flex min-h-[44px] sm:min-h-[48px] w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm py-2.5 sm:py-3 text-touch-safe transition-all duration-200 ease-out text-white placeholder:text-white/50",
              "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:bg-white/15",
              "motion-safe:focus:scale-[1.01]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "touch-manipulation",
              error && "border-red-400 focus:ring-red-400",
              leftIcon ? "pl-10 pr-4" : "px-4",
              className
            )}
            aria-invalid={!!error}
            inputMode={props.type === 'url' ? 'url' : props.type === 'email' ? 'email' : 'text'}
            {...props}
          />
        </div>
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
