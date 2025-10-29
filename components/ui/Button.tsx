import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

const button = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none active:scale-95 hover:scale-[1.02]",
  {
    variants: {
      variant: {
        primary: "bg-green-600 text-white hover:bg-green-500 hover:shadow-xl hover:shadow-green-900/60 active:bg-green-700",
        secondary: "bg-rose-600 text-white hover:bg-rose-500 hover:shadow-xl hover:shadow-rose-900/60 active:bg-rose-700",
        ghost: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm active:bg-white/30",
        outline: "border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 active:bg-white/20",
        destructive: "bg-red-600 text-white hover:bg-red-500 hover:shadow-xl hover:shadow-red-900/60 active:bg-red-700",
      },
      size: {
        sm: "min-h-[40px] px-3 py-2.5 text-sm",
        md: "min-h-[44px] px-4 py-3 text-base",
        lg: "min-h-[48px] px-6 py-3.5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, isLoading, children, disabled, as = 'button', ...props }, ref) => {
    const Component = as as any;
    return (
      <Component
        ref={ref}
        className={cn(button({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = "Button";
