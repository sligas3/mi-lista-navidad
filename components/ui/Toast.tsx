'use client'

import { cn } from "@/lib/cn";
import { useEffect } from "react";

export interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  duration?: number;
}

const variantStyles = {
  success: "bg-green-500/95 text-white border-green-400/50",
  error: "bg-red-500/95 text-white border-red-400/50",
  info: "bg-blue-500/95 text-white border-blue-400/50",
  warning: "bg-yellow-500/95 text-white border-yellow-400/50",
};

const icons = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  warning: "⚠️",
};

export function Toast({ message, variant = 'success', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 animate-scale-in flex items-center gap-3 rounded-lg border px-5 py-3.5 shadow-2xl max-w-md backdrop-blur-sm",
        variantStyles[variant]
      )}
      role="alert"
      aria-live="polite"
    >
      <span className="text-xl">{icons[variant]}</span>
      <p className="text-sm font-semibold flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white transition-colors ml-2"
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>
  );
}
