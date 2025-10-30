import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

const button = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 ease-out focus-ring disabled:opacity-50 disabled:pointer-events-none hover:brightness-110",
  {
    variants: {
      variant: {
        primary: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700",
        secondary: "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700",
        ghost: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm active:bg-white/30",
        outline: "border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50 active:bg-white/20",
        destructive: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
      },
      size: {
        sm: "min-h-[40px] px-3 py-2 text-sm sm:min-h-[44px] sm:px-4 sm:py-2.5 sm:text-base",
        md: "min-h-[44px] px-4 py-2.5 text-sm sm:min-h-[48px] sm:px-5 sm:py-3 sm:text-base",
        lg: "min-h-[48px] px-5 py-3 text-base sm:min-h-[52px] sm:px-6 sm:py-3.5 sm:text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface AnimatedButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'>, VariantProps<typeof button> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, isLoading, children, disabled, onClick, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(button({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : leftIcon ? (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
